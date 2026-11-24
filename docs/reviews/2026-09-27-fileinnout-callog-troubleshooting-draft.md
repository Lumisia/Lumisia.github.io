# File in & Out과 Callog 트러블슈팅 초안

## File in & Out 1. 실시간 문서 편집 기능에서 변경 내용이 누락되고 문서 전체가 깜빡이는 문제가 있었습니다.

### 전체 아키텍처

~~~mermaid
flowchart TB
  subgraph A["브라우저 A"]
    EA["Vue + Editor.js"] <--> BA["블록 변경 감지와 부분 반영"]
    BA <--> YA["Y.Doc / Y.Array / Y.Map"]
  end
  subgraph B["브라우저 B"]
    EB["Vue + Editor.js"] <--> BB["블록 변경 감지와 부분 반영"]
    BB <--> YB["Y.Doc / Y.Array / Y.Map"]
  end
  YA <-->|WebSocket 동기화| WS["협업 편집 전용 Yjs 서버"]
  YB <-->|WebSocket 동기화| WS
  EA <-->|문서 저장과 불러오기| API["Spring Boot 문서 API"]
  EB <-->|문서 저장과 불러오기| API
  API <--> DB[("MariaDB")]
~~~

### 문제 원인

1. 다른 사람과 기능 테스트를 할 때 문서의 변경 내용이 제대로 반영되지 못한 현상을 발견했고, 직접 두 브라우저로 추가 확인하면서 문서 전체가 깜빡이는 현상도 확인했습니다.
2. 문서 JSON 전체를 하나의 공유 값으로 매번 교체하다보니 원격 변경을 받을 때 에디터 전체를 다시 그렸습니다.
3. 다른 사용자의 편집 내용을 보존하면서 화면을 안정적으로 유지하려면 공유 데이터와 화면 갱신의 단위를 함께 줄여야 했습니다.

### 해결 과정

- 문서 JSON 전체를 공유하던 구조를 `Y.Array<Y.Map>` 기반의 블록 목록으로 변경했습니다.
- 블록 ID로 변경을 구분해 해당 블록만 화면에 반영하고, 마지막 동기화 값과 달라진 로컬 편집은 원격 변경으로 덮이지 않게 보호했습니다.
- 문자 또는 문장 단위 병합도 고려했지만, 노션처럼 블록 중심으로 편집하는 사용 경험과 당시 구현 여건에 맞춰 블록 단위를 선택했습니다.
- 기존 자동 테스트 파일을 실행해 서로 다른 블록의 동시 수정, 블록 추가와 삭제, 순서 변경, 전송 전 로컬 편집 보존을 확인했습니다.

**변경된 블록 탐지 → 기존 Y.Map 수정 → 해당 화면 블록 갱신**

먼저 블록 ID로 이전 내용과 비교해 수정할 블록을 찾습니다. 아래는 실제 `diffBlocks`에서 수정 연산을 만드는 부분이며, 추가와 삭제 및 순서 변경은 별도 분기에서 처리합니다.

~~~javascript
function blockChanged(o, n) {
  return o.type !== n.type || JSON.stringify(o.data) !== JSON.stringify(n.data)
}

const oldById = new Map(oldList.map((b) => [b.id, b]))

for (const n of newList) {
  const o = oldById.get(n.id)
  if (o && blockChanged(o, n)) {
    ops.push({ type: 'update', id: n.id, block: n })
  }
}
~~~

찾아낸 변경은 문서 전체를 교체하지 않고 해당 블록의 기존 `Y.Map`에 적용합니다. 서로 다른 블록을 수정하면 각각의 공유 객체에 변경이 기록됩니다.

~~~javascript
const m = yArray.get(i)
if (m.get('type') !== op.block.type) m.set('type', op.block.type)
m.set('data', op.block.data)
~~~

화면에도 같은 수정 연산을 적용해 해당 Editor.js 블록만 갱신합니다.

~~~javascript
await blocksApi.update(op.block.id, op.block.data)
~~~

### 결과

서로 다른 블록을 동시에 편집할 때 변경 내용이 누락되던 문제를 해결했습니다. 수정한 내용은 두 편집 화면에 함께 반영되고, 변경된 블록만 갱신하도록 하여 문서 전체를 다시 그리면서 발생하던 깜빡임을 개선했습니다.

![두 브라우저에서 문서 편집 내용이 함께 반영되는 시연](https://github.com/Lumisia/FileinNOut/raw/main/images/editor.gif)

<details>
<summary>실제 자동 테스트의 확인 코드</summary>

기존 통합 테스트에서 서로 다른 블록을 수정한 후 두 문서의 변경 내용과 최종 일치를 검사하는 부분입니다.

~~~js
edA._arr[0].data = { text: 'A1' }
await bindA.pushLocal()
edB._arr[1].data = { text: 'X1' }
await bindB.pushLocal()

exchange(docA, docB)
await tick()
await tick()

assert.equal(texts(edA._arr).a, 'A1', 'A 편집 보존')
assert.equal(texts(edA._arr).x, 'X1', 'B 편집 반영(무손실)')
assert.equal(texts(edB._arr).a, 'A1', 'A 편집 반영')
assert.equal(texts(edB._arr).x, 'X1', 'B 편집 보존')
assert.deepEqual(edA._arr, edB._arr, '수렴')
~~~

</details>

## File in & Out 2. 워크스페이스 목록에서 불필요한 반복 조회와 변경 반영 지연이 발생했습니다.

### 전체 아키텍처

~~~mermaid
flowchart TB
  U["사용자 브라우저"] -->|최초 목록 조회| LC["목록 API"]
  LC --> P["Projection + Pageable"]
  P <--> DB[("MariaDB")]
  LC -->|목록 응답| UI["워크스페이스 목록 화면"]
  U -->|문서 제목 변경| PC["문서 API / PostService"]
  PC -->|저장 및 관련 사용자 조회| DB
  PC --> SE["SseService"]
  SE -->|현재 서버의 연결| EM["사용자별 SSE 연결"]
  SE -->|다른 서버에 이벤트 전달| R[("Redis Pub/Sub")]
  R --> EM
  EM -->|title-updated| C["브라우저 공통 SSE 연결"]
  C -->|해당 문서의 제목 반영| UI
~~~

### 문제 원인

1. 처음에는 워크스페이스 목록을 30초마다 다시 조회했는데, 목록에 변경이 없는 사용자도 같은 요청을 반복한다는 문제를 확인했습니다.
2. 사용자 수에 따라 불필요한 조회가 늘어나는 한편, 실제 변경 사항은 다음 폴링까지 기다려야 화면에 반영됐습니다.
3. 변경 내용을 관련 사용자에게 바로 전달하고 목록 API의 조회 비용도 줄여, 갱신 지연과 반복 조회 부담을 함께 해결해야 했습니다.

### 해결 과정

- 문서 제목이 변경되면 해당 문서와 연결된 사용자에게 SSE 이벤트를 보내 목록의 제목을 갱신했습니다.
- 갱신 알림에는 서버에서 브라우저로 보내는 단방향 통신이면 충분해 WebSocket 대신 SSE를 선택했습니다.
- 목록 API는 엔티티 전체를 조회한 뒤 DTO로 변환하던 방식에서 필요한 컬럼만 가져오는 Projection 쿼리로 변경했습니다.
- `Pageable`을 적용해 기본 50건, 최대 100건으로 조회 범위를 제한했습니다.

**목록 화면에 필요한 컬럼만 조회하는 실제 쿼리**

엔티티 전체를 DTO로 변환하던 처리를 아래 Projection 조회로 바꾸고 `Pageable`로 반환 범위를 제한했습니다.

~~~java
@Query("""
    SELECT w.idx as postIdx, w.title as title, w.updatedAt as updatedAt,
           w.status as status, w.UUID as uuid, up.Level as level
    FROM UserPost up
    JOIN up.workspace w
    WHERE up.user.idx = :userIdx
    ORDER BY w.updatedAt DESC, w.createdAt DESC
    """)
List<WorkspaceListProjection> findWorkspaceListByUserIdx(
        @Param("userIdx") Long userIdx, Pageable pageable);
~~~

### 결과

제목 변경 시 다음 30초 폴링을 기다리던 문제를 해결하고, 관련 사용자에게 이벤트가 도착하면 해당 항목을 갱신하도록 했습니다. Projection과 페이지 처리를 적용한 개인 운영 당시 목록 API 측정에서는 TPS가 32.7에서 192.4로 증가했고, 평균 테스트 시간은 1,506.77ms에서 162.04ms로 약 89.2% 감소했습니다.

테스트 조건: 가상 사용자 100명, 실행 시간 각 2분, 워크스페이스 약 1,000건, 동일 계정으로 목록 API 반복 호출.

| 항목 | 개선 전 | 개선 후 |
|---|---:|---:|
| TPS | 32.7 | 192.4 |
| 평균 테스트 시간 | 1,506.77ms | 162.04ms |
| 오류 | 0 | 0 |

**개인 운영 측정 전**

![개인 운영 당시 목록 조회 개선 전](C:/Git/Lumisia.github.io/assets/images/projects/fileinnout/workspace-list-before.png)

**개인 운영 측정 후**

![개인 운영 당시 목록 조회 개선 후](C:/Git/Lumisia.github.io/assets/images/projects/fileinnout/workspace-list-after.png)

## File in & Out 3. 화면 진입 시 SSE 연결이 중복되어 끊김과 재연결이 반복됐습니다.

### 전체 아키텍처

~~~mermaid
flowchart TB
  subgraph Browser["사용자 브라우저"]
    AU["로그인 상태"] --> CM["공통 SSE 연결 관리자"]
    CM --> EV["화면별 이벤트 처리"]
    EV --> UI["목록과 알림 화면"]
  end
  CM -->|인증된 연결 요청| CT["Spring Boot SSE Controller"]
  CT --> ST["SseEmitterStore / 사용자 ID + 연결 ID"]
  H["15초 heartbeat"] --> ST
  BS["제목 변경과 알림 서비스"] --> SS["SseService"]
  SS --> ST
  SS --> RP[("Redis Pub/Sub")]
  RP -->|다른 서버 이벤트| ST
  ST -->|SSE 이벤트| CM
  CM -->|로그아웃과 연결 종료| CL["해당 연결만 정리"]
  CL --> ST
~~~

### 문제 원인

1. 화면에 들어갈 때 알림과 워크스페이스에서 SSE 연결을 각각 열어, 연결이 끊겼다가 다시 연결되는 동작이 반복되는 것을 확인했습니다.
2. 사용자 ID 하나로 emitter를 저장해 두 연결이 서로 덮어쓰였고, 사용자 단위 삭제와 라이브러리 및 화면의 중복 재연결이 정상 연결에도 영향을 주었습니다.
3. 화면 진입이나 연결 하나의 종료가 다른 알림 연결을 끊지 않도록 생성, 재연결, 정리의 책임을 모아야 했습니다.

### 해결 과정

- 프론트의 SSE 생성, 재사용, 종료를 공통 연결 관리로 모아 불필요한 중복 연결을 제거했습니다.
- 라이브러리가 재연결 중일 때 수동 재연결을 추가하지 않고, 연결이 완전히 종료된 경우에만 한 번 예약하도록 했습니다.
- 서버는 사용자 ID와 연결 ID로 emitter를 구분해 종료된 연결만 삭제하도록 변경했습니다.
- 15초 heartbeat를 추가하고 기존 SSE 자동 테스트를 실행해 재연결 중복 방지와 명시적 종료 후 재연결 차단을 확인했습니다.

**자동 재연결과 수동 재연결을 구분하는 실제 코드**

~~~javascript
export const shouldScheduleReconnect = ({ manuallyClosed, readyState, closedState }) => {
  if (manuallyClosed) return false
  return readyState === closedState
}
~~~

서버도 사용자 전체를 삭제하는 대신 연결 ID로 대상 emitter를 찾습니다. 아래는 연결 정리의 핵심 부분입니다.

~~~java
ConcurrentMap<String, SseEmitter> userEmitters = emitters.get(userId);
if (userEmitters == null) return;
userEmitters.remove(connectionId);
~~~

### 결과

같은 브라우저 실행 환경에서 화면마다 SSE를 만들던 중복 연결을 제거하고, 라이브러리 재연결에 수동 재연결이 겹치던 문제를 해결했습니다. 로그아웃 등으로 명시적으로 종료한 연결은 재연결하지 않으며, 서버는 종료된 연결 ID를 기준으로 정리하도록 변경했습니다. 기존 SSE 자동 테스트에서 재연결 예약의 중복 방지와 명시적 종료 후 재연결 차단을 확인했습니다.

## Callog 1. 대시보드에서 조회 지연으로 데이터가 표시되지 않거나 일부만 표시되는 문제가 있었습니다.

### 전체 아키텍처

~~~mermaid
flowchart TB
  UI["Vue 대시보드 화면"] -->|HTTP 요청| CT["Dashboard Controller"]
  CT --> AG["대시보드 통합 조회 서비스"]
  AG --> KEY["사용자와 기간을 구분한 캐시 키"]
  KEY --> CACHE[("Redis / Valkey")]
  CACHE -->|캐시 적중| DTO["대시보드 통합 응답"]
  KEY -->|캐시 미적중| QUERY["조건 조회와 COUNT / GROUP BY 집계"]
  QUERY <--> DB[("MariaDB")]
  QUERY --> DTO
  DTO -->|캐시 저장| CACHE
  DTO --> UI
  CHANGE["캠페인과 업무 데이터 변경"] --> VER["캐시 버전 갱신"]
  VER --> KEY
~~~

### 문제 원인

1. 기능을 기초 구현한 뒤 대시보드에 진입했을 때 데이터가 표시되지 않거나 일부 영역만 표시되는 현상을 발견했습니다.
2. 전체 데이터를 가져와 가공하는 비용과 캠페인별 반복 조회로 응답이 지연됐으며, 같은 객체 내부에서 집계 메서드를 호출해 Spring 프록시를 거치지 않으면서 `@Cacheable`도 적용되지 않았습니다.
3. 프론트 요청 제한 시간만 늘려서는 처리 비용이 줄어들지 않으므로, 조회 범위와 실제 캐시가 적용되는 호출 위치를 함께 바꿔야 했습니다.

### 해결 과정

- 전체 조회 후 Java에서 가공하던 처리를 조건에 맞는 `IN` 조회와 `COUNT`, `GROUP BY` 집계 쿼리로 변경했습니다.
- 외부에서 호출되는 `loadAll()`에 `@Cacheable`을 적용하고 사용자, 기간, 버전으로 키를 구성해 통합 응답을 재사용하며 데이터 변경 시 해당 사용자의 버전을 갱신했습니다.
- 프론트 대기 시간을 늘리는 방법보다 백엔드의 조회량과 반복 계산을 줄이는 방법을 선택했습니다.
- 쿼리와 캐시 개선 후 같은 애플리케이션 코드에서 접속 호스트를 바꿔 Valkey를 비교했으며, 해당 시나리오의 추가 개선과 간단한 전환 과정을 바탕으로 채택했습니다.

**실제 조건 조회와 집계 쿼리 발췌**

~~~java
List<CampaignKpi> kpis = visibleCampaignIds.isEmpty()
        ? List.of()
        : campaignKpiRepository.findAllByCampaign_IdxInOrderByIdxAsc(visibleCampaignIds);

@Query("SELECT COUNT(a) FROM MarketingAsset a " +
       "WHERE (a.campaign.idx IN :campaignIds) " +
       "   OR (:ownerOrgId IS NOT NULL AND a.organization.idx = :ownerOrgId)")
long countVisibleAssets(
        @Param("campaignIds") Collection<Long> campaignIds,
        @Param("ownerOrgId") Long ownerOrgId);
~~~

**통합 API가 호출하는 메서드에 캐시 적용**

같은 객체 내부의 하위 메서드 호출에 의존하던 구조를 바꿔, 통합 응답을 반환하는 진입 지점에 캐시를 적용했습니다. 다음은 해당 캐시 선언입니다.

~~~java
private static final String DASHBOARD_VERSION_KEY =
        " + ':v' + @dashboardCacheVersionService.getVersion(#callerIdx)";

@Cacheable(value = CacheNames.DASHBOARD_PAGE,
        key = "#callerIdx + ':' + (#periodCode == null ? '' : #periodCode)" + DASHBOARD_VERSION_KEY,
        sync = true)
~~~

### 결과

쿼리와 캐시를 개선한 뒤 평균 테스트 시간이 약 11초에서 787.35ms로 줄었고, 처리량은 7.0 TPS에서 117.4 TPS로 증가했습니다. 같은 대시보드 조회 시나리오의 최종 측정에서 오류가 44건에서 0건으로 줄어, 데이터 조회 실패와 긴 응답 대기를 개선했습니다.

7.0에서 97.3 TPS까지는 쿼리와 캐시를 함께 개선한 결과이며, 이후 Valkey 전환 측정에서 117.4 TPS를 기록했습니다. Valkey 선택은 이 반복 조회 시나리오의 결과와 전환 비용을 기준으로 판단했습니다.

테스트 조건: 최대 가상 사용자 100명, 실행 시간 약 2분, 관련 데이터 합계 약 1,000건, 동일 계정 반복 호출, 시작 전 캐시 초기화, Ramp-Up 적용.

| 항목 | 개선 전 | 쿼리 최적화 + Redis | 동일 코드 + Valkey |
|---|---:|---:|---:|
| TPS | 7.0 | 97.3 | 117.4 |
| 평균 테스트 시간 | 11,033.33ms | 995.14ms | 787.35ms |
| 오류 | 44 | 16 | 0 |

**개선 전**

![대시보드 조회 개선 전 성능 측정](C:/Git/Lumisia.github.io/assets/images/projects/callog/dashboard-before.png)

**Redis 적용 단계**

![대시보드 Redis 적용 후 성능 측정](C:/Git/Lumisia.github.io/assets/images/projects/callog/dashboard-redis.png)

**Valkey 적용 단계**

![대시보드 Valkey 적용 후 성능 측정](C:/Git/Lumisia.github.io/assets/images/projects/callog/dashboard-valkey.png)

## Callog 2. 캘린더에서 기간 일정이 반복 표시되고 다른 일정을 가리는 문제가 있었습니다.

### 전체 아키텍처

~~~mermaid
flowchart TB
  UI["캘린더 화면 / OverView"] -->|일정 조회| API["Spring Boot 캘린더 API"]
  API <--> DB[("MariaDB")]
  API --> DATA["캠페인과 마일스톤 등 일정 데이터"]
  DATA --> NORMAL["시작일과 종료일을 공통 형식으로 정리"]
  NORMAL --> CAL["MainCalendar"]
  CAL --> SEG["주차별 표시 구간 계산"]
  SEG --> LANE["겹치는 구간을 서로 다른 줄에 배치"]
  LANE --> BAR["최대 4줄의 기간 막대 표시"]
  LANE --> MORE["초과 일정 +N 표시"]
  MORE --> LIST["해당 날짜의 전체 일정 목록"]
  BAR --> DETAIL["일정 선택과 상세 보기"]
  LIST --> DETAIL
~~~

### 문제 원인

1. 여러 임시 더미 일정을 넣어 확인하면서, 기간 일정이 반복 표시되고 다른 1일 또는 3일 일정이 보이지 않는 현상을 발견했습니다.
2. 날짜 셀마다 일정을 독립적으로 표시해 옆 날짜까지 이어지는 일정의 점유 구간을 함께 계산하지 못했고, 표시 개수를 제한하면서 다른 일정이 가려졌습니다.
3. 일정이 같은 날짜에 몰려도 각각의 기간과 존재를 확인할 수 있도록 주 단위로 표시 구간과 겹침을 계산해야 했습니다.

### 해결 과정

- 시작일과 종료일을 기준으로 주차별 표시 구간을 계산해 긴 일정을 이어진 막대로 표시했습니다.
- 한 주에서 날짜 구간이 겹치는 일정은 서로 다른 줄에 배치했습니다.
- 화면에는 최대 4줄을 표시하고 초과 일정은 날짜별 `+N`과 상세 목록으로 확인할 수 있게 했습니다.
- 긴 일정과 같은 날짜의 짧은 일정이 모두 눈에 들어와야 한다는 요구에 맞춰, 기간 구간과 줄 배치를 함께 계산하는 방식을 선택했습니다.

**겹치지 않는 가장 낮은 줄을 찾는 실제 배치 코드**

주차별로 계산한 `[startCol, endCol]` 구간이 이미 배치된 일정과 겹치면 다음 줄을 검사합니다.

~~~javascript
const lanes = []
for (const it of inWeek) {
  let L = 0
  while (lanes[L] && lanes[L].some((seg) => !(it.endCol < seg[0] || it.startCol > seg[1]))) L++
  if (!lanes[L]) lanes[L] = []
  lanes[L].push([it.startCol, it.endCol])
  it.lane = L
}
~~~

### 결과

기간 일정이 날짜마다 중복 표시되던 문제를 주차별 막대 표시로 개선했습니다. 긴 일정과 짧은 일정이 같은 날짜에 있어도 줄을 나눠 구분할 수 있고, 표시 공간을 넘은 일정은 `+N`을 통해 전체 목록에서 확인할 수 있도록 했습니다.

![기간 막대와 일정 배치를 확인할 수 있는 Callog 캘린더](C:/Git/Lumisia.github.io/assets/images/projects/callog/calendar.png)

## Callog 3. 다중 Pod 환경에서 스케줄러가 같은 작업을 중복 실행할 수 있었습니다.

### 전체 아키텍처

~~~mermaid
flowchart TB
  subgraph PA["백엔드 Pod A"]
    SA["스케줄러"]
    EA["SSE 연결 관리"]
  end
  subgraph PB["백엔드 Pod B"]
    SB["스케줄러"]
    EB["SSE 연결 관리"]
  end
  subgraph Redis["공유 Redis"]
    LOCK["작업별 락 / UUID + TTL"]
    PUB["Pub/Sub 알림 채널"]
  end
  SA -->|락 획득 시도| LOCK
  SB -->|락 획득 시도| LOCK
  LOCK -->|획득한 실행만 진입| JOB["스냅샷 생성과 마감 알림 작업"]
  JOB --> DB[("MariaDB")]
  JOB -->|결과 알림 발행| PUB
  JOB -->|토큰 확인 후 락 해제| LOCK
  PUB --> EA
  PUB --> EB
  EA --> UA["Pod A에 연결된 사용자"]
  EB --> UB["Pod B에 연결된 사용자"]
~~~

### 문제 원인

1. 이전 File in & Out 프로젝트에서 백엔드 Pod마다 스케줄러가 독립적으로 실행되는 문제를 경험했고, 같은 문제가 생기지 않도록 Callog 설계에 반영했습니다.
2. 서버 내부 스케줄러는 다른 Pod의 작업 실행을 알 수 없고, 사용자 알림 연결도 각 Pod에 따로 존재했습니다.
3. 여러 서버가 같은 작업에 동시에 진입하는 것을 제어하면서, 작업 결과 알림은 사용자가 연결된 서버까지 전달해야 했습니다.

### 해결 과정

- Redis의 `setIfAbsent`와 TTL로 공유 락을 획득한 실행만 작업을 진행하고, 획득에 실패한 실행은 건너뛰도록 했습니다.
- TTL이 끝난 이전 작업이 새 작업의 락을 삭제하지 않도록, UUID 토큰을 저장하고 Lua에서 값이 일치할 때만 해제했습니다.
- 결과 알림은 Redis Pub/Sub으로 각 Pod에 전달하고, 각 Pod가 자신에게 연결된 SSE 사용자에게 전송하도록 구성했습니다.
- 이전 프로젝트의 문제 경험을 바탕으로 작업 실행 경쟁은 Redis 락으로 제어하고, 서버 간 알림 전달은 Pub/Sub으로 처리했습니다.

**실제 락 획득과 소유 토큰 확인 코드**

~~~java
public String tryLock(String key, Duration ttl) {
    String token = UUID.randomUUID().toString();
    Boolean isOk = redis.opsForValue().setIfAbsent(key, token, ttl);
    return Boolean.TRUE.equals(isOk) ? token : null;
}

private static final String UNLOCK_LUA =
        "if redis.call('get', KEYS[1]) == ARGV[1] " +
        "then return redis.call('del', KEYS[1]) else return 0 end";
~~~

토큰 비교와 삭제를 Lua 안에서 함께 수행해 비교 직후 락 소유자가 바뀌는 틈을 없앴습니다.

### 결과

여러 Pod가 같은 작업의 락을 동시에 획득하려 할 때, 락을 얻은 실행만 작업에 진입하고 나머지는 건너뛰도록 했습니다. 작업 결과는 Pub/Sub으로 각 Pod에 전달하여 다른 서버에 연결된 사용자에게도 알림을 보낼 수 있게 했습니다. 이 방식은 락이 유지되는 동안의 실행 경쟁을 제어합니다.

+++

title = "File in & Out"
date = 2026-04-01
weight = 1
slug = "fileinnout"
category = "Collaboration · 팀 프로젝트"
summary = "팀 프로젝트를 위한 통합 협업 플랫폼"
description = "팀 워크스페이스 관리, 실시간 협업 문서, 역할별 권한, 초대·알림, 실시간 사용자 제어를 제공하는 협업 플랫폼입니다. 파일들을 저장 및 공유할 수 있으며, 워크스페이스라는 문서 작업을 하며 Notion 스타일의 블럭 에디터를 사용합니다. Yjs Websocket + Editor.js를 사용했으며 백엔드는 Redis를 통해 배포할 때도 동시성 제어를 하게끔 했습니다."
cover = { image = "images/projects/fileinnout/FileinNout.png", fit = "cover" }
live_demo = "https://lumisia.fileinnout.com/"
repository = "https://github.com/Lumisia/FileinNOut"
architecture_image = "images/projects/fileinnout/fileinnout.system_architecture.png"
period = "2026.01 ~ 2026.04 (BEYOND SW 캠프 24기 3차 프로젝트)"
team = "팀원 4명"
responsibility = "웹소켓 및 백엔드 담당"

[[highlights]]
value = "수료 후 127 커밋"
label = "단독 운영·고도화"

[[highlights]]
value = "관측 6종"
label = "읽기 전용 실시간 공개"

features_intro = """
제가 설계하고 구현한 **워크스페이스**는 여러 사용자가 하나의 문서를 실시간으로 함께 편집하는 협업 공간입니다. 문서 작성, 첨부파일, 버전 이력, 권한·공유 설정까지 워크스페이스의 전 영역을 담당했습니다.
"""

monitoring_note = """
🔎 위 관측 버튼들은 캡처 이미지가 아니라, 수료 후 직접 구축해 운영 중인 **k3s 클러스터에 읽기 전용으로 연결**됩니다. 배포 상태 · 메트릭 · 분산 트레이싱을 방문 시점 기준 실시간으로 확인할 수 있습니다.
"""

[advancement]
title = "수료 후 단독 고도화 (2026.06 ~ )"
note = "팀 프로젝트 종료 후 개인 리포지토리로 이어받아 실제 운영 수준으로 끌어올리고 있습니다. **아래는 전부 수료 후 혼자 작업한 내용입니다.**"
items = [
  "**SSE 운영 안정화** — 프록시를 경유하는 실운영 HTTPS 환경으로 이전하며 새로 드러난 연결 끊김·재연결 반복을 단일 연결 통합 + 15초 heartbeat 구조로 해결 → 아래 트러블슈팅 3",
  "**OAuth 안정화** — 서브도메인 콜백 인증 실패를 상위 도메인 쿠키 공유로 해결, Tomcat RFC6265 쿠키 거부로 인한 500 오류 교정",
  "**보안·운영** — DB·MinIO 자격증명을 ConfigMap에서 Secret으로 분리하고 회전 시 재기동 checksum 적용, MinIO presigned URL 외부 HTTPS 서명",
  "**인프라** — GitHub Actions 멀티아치(amd64+arm64) buildx 빌드, OCI ARM64 노드 k3s에 Helm 배포",
  "**관측 스택 공개** — Prometheus·Grafana·Jaeger·Kiali 직접 구축, 위 모니터링 버튼에서 읽기 전용 실시간 확인",
  "**기능·품질** — 워크스페이스 버전 비교·복구, 파일 스트리밍 다운로드, 공개 데모 계정 + 저장 쿼터, SSE·OAuth·스토리지 회귀 테스트 작성",
]

[[monitoring_links]]
label = "Jaeger"
reason = "분산 트레이싱 — 요청이 게이트웨이·백엔드를 거치는 경로와 지연 구간을 실제 트래픽 기준으로 추적합니다. Istio 텔레메트리를 직접 연동했음을 보여줍니다."
url   = "https://jaeger.fileinnout.com/search?end=1781757710987000&limit=20&lookback=1h&maxDuration&minDuration&service=jaeger-all-in-one&start=1781754110987000"
icon  = "jaeger"

[[monitoring_links]]
label = "Dashboard"
reason = "Kubernetes 워크로드 현황 — 서비스가 실제 k3s 클러스터에서 돌아가고 있음을 Pod 단위로 확인할 수 있습니다 (읽기 전용 공개)."
url   = "https://dashboard.fileinnout.com/#/workloads?namespace=fileinnout"
icon  = "kubernetes"

[[monitoring_links]]
label = "Swagger"
reason = "백엔드 API 명세 — 문서 캡처가 아니라 실제 운영 서버에 바로 호출해볼 수 있도록 열어뒀습니다."
url   = "https://swagger.fileinnout.com/"
icon  = "swagger"

[[monitoring_links]]
label = "Kiali"
reason = "서비스 메시 토폴로지 — Istio 메시 안에서 서비스 간 트래픽 흐름을 시각적으로 확인할 수 있습니다."
url   = "https://kiali.fileinnout.com/kiali/console/mesh?duration=300&refresh=60000&meshLayout=dagre"
icon  = "kiali"

[[monitoring_links]]
label = "Prometheus"
reason = "메트릭 수집 파이프라인 — 어떤 대상을 어떻게 스크랩하는지 /targets 상태를 그대로 공개합니다."
url   = "https://prometheus.fileinnout.com/targets"
icon  = "prometheus"

[[monitoring_links]]
label = "Grafana"
reason = "운영 메트릭 대시보드 — 서버 노드의 CPU·메모리·네트워크를 실시간 그래프로 확인할 수 있습니다."
url   = "https://grafana.fileinnout.com/d/rYdddlPWk/node-exporter-full?orgId=1&from=now-5m&to=now&timezone=browser&var-ds_prometheus=PBFA97CFB590B2093&var-job=kubernetes-service-endpoints&var-nodename=instance20260526051902&var-node=10.0.0.164:9100&refresh=1m"
icon  = "grafana"

[[contributions]]
title = "Backend"
items = [
  "워크스페이스 CRUD API 설계 및 구현",
  "권한별 로직 검증",
  "워크스페이스 내부 에셋 저장 구조 설계",
  "워크스페이스 초대/반려 및 알림 구현 (SSE, STOMP WebSocket)",
]

[[contributions]]
title = "Frontend"
items = [
  "워크스페이스 화면 설계 (Vue 3 + Tailwind CSS)",
  "실시간 협업 문서 설계 및 구현 (Yjs WebSocket, Editor.js)",
  "소유자·편집자·읽기 허용 권한별 UI/UX 설계",
  "유저 권한 설정 모달",
  "SSE를 이용한 유저 실시간 강퇴 설계",
]

[[contributions]]
title = "DevOps/Infra"
items = [
  "Redis를 이용한 SSE 동시성 제어",
  "Argo Rollouts를 통한 블루/그린 배포",
]

[[features]]
heading = "워크스페이스 영역"
image = "images/projects/fileinnout/workspace-main.png"
body = """
- **좌측 사이드바** — 개인 페이지 / 협업 페이지로 나눠, 혼자 작업하거나 다른 사용자와 함께 협업할 수 있도록 구성했습니다.
- **메인 페이지** — 제목과 내용을 추가하고, 파일을 올리면 우측 첨부파일 영역에 첨부됩니다.
- **버전 이력** — 저장 버튼 우측에서 버전 이력을 조회하고, 원하는 버전으로 되돌릴 수 있습니다.
"""

[[features]]
heading = "워크스페이스 설정"
image = "images/projects/fileinnout/workspace-settings.png"
body = """
워크스페이스 우측의 설정에서 세 가지를 조절합니다.

- **공유** — 개인 / 공유 / 공개 중 공유 범위를 설정합니다.
- **권한 설정** — 공유한 사용자별로 권한을 부여합니다.
- **삭제** — 해당 워크스페이스를 삭제합니다.

권한은 관리자 / 편집자 / 뷰어로 나뉘며 역할이 다릅니다.

- **관리자** — 사용자 권한 조절, 공개 설정, 강제 추방이 가능합니다.
- **편집자** — 해당 워크스페이스의 편집을 허용합니다.
- **뷰어** — 편집할 수 없고 읽기만 가능합니다.
"""

[[features]]
heading = "워크스페이스 공유"
image = "images/projects/fileinnout/workspace-share.png"
body = """
공유 설정은 세 가지로 나뉩니다.

- **개인** — 워크스페이스를 가진 사용자만 볼 수 있고, 초대·공개 링크를 사용할 수 없습니다.
- **공유** — 그룹이나 이메일로 초대할 수 있지만 공개 링크는 사용할 수 없습니다.
- **공개** — 이메일 초대뿐 아니라 공개 링크를 가진 누구나 확인할 수 있습니다.
"""

[[troubleshooting]]
title = "1. 실시간 문서 편집 기능에서 변경 내용이 누락되고 문서 전체가 깜빡이는 문제가 있었습니다."
architecture_image = "images/projects/fileinnout/editor-architecture.svg"
architecture_alt = "실시간 문서 편집 기능에서 변경 내용이 누락되고 문서 전체가 깜빡이는 문제가 있었습니다. 기능 전체 흐름"
cause = '''
1. 다른 사람과 기능 테스트를 할 때 문서의 변경 내용이 제대로 반영되지 못한 현상을 발견했고, 직접 두 브라우저로 추가 확인하면서 문서 전체가 깜빡이는 현상도 확인했습니다.
2. 문서 JSON 전체를 하나의 공유 값으로 매번 교체하다보니 원격 변경을 받을 때 에디터 전체를 다시 그렸습니다.
3. 다른 사용자의 편집 내용을 보존하면서 화면을 안정적으로 유지하려면 공유 데이터와 화면 갱신의 단위를 함께 줄여야 했습니다.
'''
solution = '''
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
'''
result = '''
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
'''

[[troubleshooting]]
title = "2. 워크스페이스 목록에서 불필요한 반복 조회와 변경 반영 지연이 발생했습니다."
architecture_image = "images/projects/fileinnout/workspace-list-architecture.svg"
architecture_alt = "워크스페이스 목록에서 불필요한 반복 조회와 변경 반영 지연이 발생했습니다. 기능 전체 흐름"
cause = '''
1. 처음에는 워크스페이스 목록을 30초마다 다시 조회했는데, 목록에 변경이 없는 사용자도 같은 요청을 반복한다는 문제를 확인했습니다.
2. 사용자 수에 따라 불필요한 조회가 늘어나는 한편, 실제 변경 사항은 다음 폴링까지 기다려야 화면에 반영됐습니다.
3. 변경 내용을 관련 사용자에게 바로 전달하고 목록 API의 조회 비용도 줄여, 갱신 지연과 반복 조회 부담을 함께 해결해야 했습니다.
'''
solution = '''
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
'''
result = '''
제목 변경 시 다음 30초 폴링을 기다리던 문제를 해결하고, 관련 사용자에게 이벤트가 도착하면 해당 항목을 갱신하도록 했습니다. Projection과 페이지 처리를 적용한 개인 운영 당시 목록 API 측정에서는 TPS가 32.7에서 192.4로 증가했고, 평균 테스트 시간은 1,506.77ms에서 162.04ms로 약 89.2% 감소했습니다.

테스트 조건: 가상 사용자 100명, 실행 시간 각 2분, 워크스페이스 약 1,000건, 동일 계정으로 목록 API 반복 호출.

| 항목 | 개선 전 | 개선 후 |
|---|---:|---:|
| TPS | 32.7 | 192.4 |
| 평균 테스트 시간 | 1,506.77ms | 162.04ms |
| 오류 | 0 | 0 |

**개인 운영 측정 전**

![개인 운영 당시 목록 조회 개선 전](images/projects/fileinnout/workspace-list-before.png)

**개인 운영 측정 후**

![개인 운영 당시 목록 조회 개선 후](images/projects/fileinnout/workspace-list-after.png)
'''

[[troubleshooting]]
title = "3. 화면 진입 시 SSE 연결이 중복되어 끊김과 재연결이 반복됐습니다."
architecture_image = "images/projects/fileinnout/sse-architecture.svg"
architecture_alt = "화면 진입 시 SSE 연결이 중복되어 끊김과 재연결이 반복됐습니다. 기능 전체 흐름"
cause = '''
1. 화면에 들어갈 때 알림과 워크스페이스에서 SSE 연결을 각각 열어, 연결이 끊겼다가 다시 연결되는 동작이 반복되는 것을 확인했습니다.
2. 사용자 ID 하나로 emitter를 저장해 두 연결이 서로 덮어쓰였고, 사용자 단위 삭제와 라이브러리 및 화면의 중복 재연결이 정상 연결에도 영향을 주었습니다.
3. 화면 진입이나 연결 하나의 종료가 다른 알림 연결을 끊지 않도록 생성, 재연결, 정리의 책임을 모아야 했습니다.
'''
solution = '''
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
'''
result = '''
같은 브라우저 실행 환경에서 화면마다 SSE를 만들던 중복 연결을 제거하고, 라이브러리 재연결에 수동 재연결이 겹치던 문제를 해결했습니다. 로그아웃 등으로 명시적으로 종료한 연결은 재연결하지 않으며, 서버는 종료된 연결 ID를 기준으로 정리하도록 변경했습니다. 기존 SSE 자동 테스트에서 재연결 예약의 중복 방지와 명시적 종료 후 재연결 차단을 확인했습니다.
'''
+++

<section class="proj-tech-section">
<h2 class="proj-sec-h">기술 스택</h2>

<div class="proj-tech-group">
<p class="proj-tech-cat">Frontend</p>
<div class="proj-tech-grid">
<span class="stack"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg" alt="Vue 3 아이콘">Vue 3</span>
<span class="stack"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg" alt="Vite 아이콘">Vite</span>
<span class="stack"><span class="icon-badge ib-pinia">Pi</span>Pinia</span>
<span class="stack"><span class="icon-badge ib-axios">Ax</span>Axios</span>
<span class="stack"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" alt="Tailwind CSS 아이콘">Tailwind CSS</span>
<span class="stack"><span class="icon-badge ib-editorjs">Ed</span>Editor.js</span>
<span class="stack"><span class="icon-badge ib-yjs">Yj</span>Yjs</span>
</div>
</div>

<div class="proj-tech-group">
<p class="proj-tech-cat">Backend</p>
<div class="proj-tech-grid">
<span class="stack"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" alt="Java 아이콘">Java</span>
<span class="stack"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg" alt="Spring Boot 아이콘">Spring Boot</span>
<span class="stack"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg" alt="Spring Security 아이콘">Spring Security</span>
<span class="stack"><span class="icon-badge ib-jwt">JWT</span>JWT</span>
<span class="stack"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg" alt="Spring Data JPA 아이콘">Spring Data JPA</span>
</div>
</div>

<div class="proj-tech-group">
<p class="proj-tech-cat">DevOps / Infra</p>
<div class="proj-tech-grid">
<span class="stack"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" alt="Node.js 아이콘">Node.js</span>
<span class="stack"><span class="icon-badge ib-ws">WS</span>WebSockets</span>
<span class="stack"><span class="icon-badge ib-stomp">ST</span>STOMP</span>
<span class="stack"><span class="icon-badge ib-sse">SSE</span>SSE</span>
<span class="stack"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg" alt="Redis 아이콘">Redis (Pub/Sub)</span>
<span class="stack"><span class="icon-badge ib-argo">Ar</span>Argo Rollouts</span>
<span class="stack"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg" alt="AWS EC2 아이콘">AWS EC2</span>
<span class="stack"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg" alt="AWS RDS 아이콘">AWS RDS</span>
<span class="stack"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mariadb/mariadb-original.svg" alt="MariaDB 아이콘">MariaDB</span>
<span class="stack"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nginx/nginx-original.svg" alt="nginx 아이콘">nginx</span>
<span class="stack"><span class="icon-badge ib-minio">Mi</span>MinIO</span>
</div>
</div>

</section>

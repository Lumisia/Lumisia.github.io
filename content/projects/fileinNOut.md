+++
title = "File in & Out"
date = 2024-05-01
weight = 1
slug = "fileinnout"
category = "Collaboration · 팀 프로젝트"
summary = "팀 프로젝트를 위한 통합 협업 플랫폼"
description = "팀 워크스페이스 관리, 실시간 협업 문서, 역할별 권한, 초대·알림, 실시간 사용자 제어를 제공하는 협업 플랫폼입니다. 파일들을 저장 및 공유할 수 있으며, 워크스페이스라는 문서 작업을 하며 Notion 스타일의 블럭 에디터를 사용합니다. Yjs Websocket + Editor.js를 사용했으며 백엔드는 Redis를 통해 배포할 때도 동시성 제어를 하게끔 했습니다."
cover = { image = "images/projects/fileinnout/FileinNout.png" }
live_demo = "https://lumisia.fileinnout.com/"
repository = "https://github.com/Lumisia/FileinNOut"
architecture_image = "images/projects/fileinnout/fileinnout.system_architecture.png"
period = "2026.01 ~ 2026.04 (BEYOND SW 캠프 24기 3차 프로젝트)"
team = "팀원 4명"
responsibility = "웹소켓 및 백엔드 담당"

features_intro = """
제가 설계하고 구현한 **워크스페이스**는 여러 사용자가 하나의 문서를 실시간으로 함께 편집하는 협업 공간입니다. 문서 작성, 첨부파일, 버전 이력, 권한·공유 설정까지 워크스페이스의 전 영역을 담당했습니다.
"""

monitoring_note = """
🔎 위 관측 버튼들은 캡처 이미지가 아니라, 수료 후 직접 구축해 운영 중인 **k3s 클러스터에 읽기 전용으로 연결**됩니다. 배포 상태 · 메트릭 · 분산 트레이싱을 방문 시점 기준 실시간으로 확인할 수 있습니다.
"""

[[monitoring_links]]
label = "Jaeger"
desc  = "분산 트레이싱 — 요청이 거치는 서비스 경로와 지연 구간 확인"
url   = "https://jaeger.fileinnout.com/search?end=1781757710987000&limit=20&lookback=1h&maxDuration&minDuration&service=jaeger-all-in-one&start=1781754110987000"
icon  = "jaeger"

[[monitoring_links]]
label = "Dashboard"
desc  = "Kubernetes Dashboard — 운영 중인 Pod·워크로드 상태 (읽기 전용)"
url   = "https://dashboard.fileinnout.com/#/workloads?namespace=fileinnout"
icon  = "kubernetes"

[[monitoring_links]]
label = "Swagger"
desc  = "백엔드 API 명세 — 실제 서버 대상으로 호출 테스트 가능"
url   = "https://swagger.fileinnout.com/"
icon  = "swagger"

[[monitoring_links]]
label = "Kiali"
desc  = "Istio 서비스 메시 — 서비스 간 트래픽 토폴로지"
url   = "https://kiali.fileinnout.com/kiali/console/mesh?duration=300&refresh=60000&meshLayout=dagre"
icon  = "kiali"

[[monitoring_links]]
label = "Prometheus"
desc  = "메트릭 수집기 — 스크랩 대상과 수집 상태(/targets)"
url   = "https://prometheus.fileinnout.com/targets"
icon  = "prometheus"

[[monitoring_links]]
label = "Grafana"
desc  = "메트릭 대시보드 — 노드 CPU·메모리·네트워크 실시간"
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
title = "1. 데이터 일관성"
problem = """
![동시 편집 시 사용자별로 다르게 표시된 워크스페이스 화면](images/projects/fileinnout/workspace-concurrent-view.png "사용자별 워크스페이스 화면 불일치")

워크스페이스는 여러 사용자가 하나의 문서를 동시에 편집하는 기능입니다. 초기 구현은 Editor.js 문서 **전체를 하나의 String으로 DB에 저장**하는 방식이었습니다.

이 방식은 편집 도중 다른 사용자가 먼저 저장하거나 다른 블록을 수정하면, 최종적으로 **마지막에 저장한 사용자의 값으로 덮어써질** 뿐 아니라 사용자마다 보이는 값이 서로 달라지는 문제가 있었습니다.
"""
cause = """
핵심 원인은 CRDT 사용 여부와 별개로 **병합 단위를 문서 전체로 설정한 데이터 모델**이었습니다.

Yjs는 동일한 공유 타입에 들어온 변경을 결정론적으로 병합합니다. 그러나 문서 전체를 하나의 문자열로 저장하면 Yjs가 인식하는 변경 단위도 문서 전체가 됩니다. 또한 원격 변경을 받을 때마다 `editor.render()`로 문서 전체를 다시 렌더링해, 변경되지 않은 블록까지 교체되면서 입력 흐름과 커서가 흔들렸습니다.

| 방식 | 판단 |
|---|---|
| 편집 잠금 | 데이터 충돌은 막지만 한 명만 편집할 수 있어 실시간 협업 목적과 맞지 않음 |
| Last Write Wins | 구현은 간단하지만 늦게 도착한 전체 문서가 다른 사용자의 변경을 덮어씀 |
| OT | 중앙 서버에서 연산 순서와 변환 규칙을 관리해야 하며 블록 추가·삭제·이동까지 처리가 복잡함 |
| CRDT | 각 클라이언트가 독립적으로 수정해도 변경 연산을 병합하고 동일한 상태로 수렴 가능 |
"""
solution = """
**CRDT(Yjs)** 를 채택하고 병합 단위를 문서 전체가 아니라 **블록 단위**로 재설계했습니다.

```javascript
export function yMapToBlock(ymap) {
  return {
    id: ymap.get('id'),
    type: ymap.get('type'),
    data: ymap.get('data'),
  }
}

export function yArrayToBlocks(yArray) {
  const out = []

  for (let i = 0; i < yArray.length; i++) {
    out.push(yMapToBlock(yArray.get(i)))
  }

  return out
}

function blockToYMap(Y, block) {
  const m = new Y.Map()
  m.set('id', block.id)
  m.set('type', block.type)
  m.set('data', block.data)
  return m
}
```

![블록 단위로 이전 데이터와 현재 데이터를 추적하는 화면](images/projects/fileinnout/block-change-tracking.png "블록 변경 데이터 추적")

- 문서 전체를 하나의 JSON 문자열로 관리하지 않고, 각 EditorJS 블록을 id, type, data를 가진 독립적인 Y.Map으로 변환했습니다. 각 블록이 별도의 CRDT 객체가 되므로 서로 다른 블록에서 발생한 동시 변경을 독립적으로 병합할 수 있습니다.
하지만 블럭이 교체되는 상황, 즉 내용이 변경되는 점은 어떻게 판단하는가가 문제였습니다.

```javascript
function blockChanged(oldBlock, newBlock) {
  return (
    oldBlock.type !== newBlock.type ||
    JSON.stringify(oldBlock.data) !== JSON.stringify(newBlock.data)
  )
}

export function diffBlocks(oldList, newList) {
  const ops = []

  const oldById = new Map(
    oldList.map((block) => [block.id, block])
  )

  const newById = new Map(
    newList.map((block) => [block.id, block])
  )

  // 이전 목록에만 존재하면 삭제
  for (const oldBlock of oldList) {
    if (!newById.has(oldBlock.id)) {
      ops.push({
        type: 'remove',
        id: oldBlock.id,
      })
    }
  }

  // 양쪽에 존재하지만 내용이 바뀌었으면 수정
  for (const newBlock of newList) {
    const oldBlock = oldById.get(newBlock.id)

    if (oldBlock && blockChanged(oldBlock, newBlock)) {
      ops.push({
        type: 'update',
        id: newBlock.id,
        block: newBlock,
      })
    }
  }

  return ops
}
```

![Editor.js 블록의 id, type, data 구조](images/projects/fileinnout/editorjs-block-structure.png "Editor.js 블록 구조")

- EditorJS의 이전 블록 목록과 현재 블록 목록을 id 기준 Map으로 변환했습니다. 이전 목록에만 존재하면 remove, 양쪽에 존재하지만 type이나 data가 달라졌으면 update 연산을 생성합니다. 이를 통해 문서 전체가 아닌 실제로 변경된 블록만 찾을 수 있습니다.

그 결과 마지막 저장자가 다른 사용자의 편집을 덮어쓰던 문제와 사용자별 화면 불일치가 모두 해소되었습니다.
"""

result = """
![여러 사용자가 동시에 워크스페이스를 편집하는 테스트](images/projects/fileinnout/workspace-test.gif "워크스페이스 실시간 협업 테스트")

- 서로 다른 블록을 동시에 수정해도 두 변경사항 모두 보존
- 동시 블록 추가도 유실 없이 병합
- 클라이언트별 변경 수신 순서가 달라도 최종 상태 수렴
- 전송 전 로컬 편집이 원격 변경으로 덮이는 문제 방지
- 전체 문서 재렌더링 대신 변경된 블록만 반영
- Redis를 통해 다중 WebSocket 서버에서도 동일한 문서 상태 공유
"""

[[troubleshooting]]
title = "2. 워크스페이스 조회 개선 — 30초 폴링에서 SSE 기반 갱신으로"
problem = """
워크스페이스 리스트는 초대·생성·삭제·제목 변경이 즉시 반영되어야 하는 화면입니다. 기존 구조는 **30초 주기 폴링**으로 서버에 반복 요청해 데이터를 다시 가져왔습니다.

![30초 폴링과 전체 엔티티 조회를 사용하던 개선 전 nGrinder 결과](images/projects/fileinnout/workspace-list-before.png "워크스페이스 리스트 조회 개선 전")

이 방식은 변경이 없어도 계속 요청이 발생했고, 변경이 생겨도 다음 폴링 시점까지 최대 30초 지연될 수 있었습니다. 또한 워크스페이스 목록을 가져올 때 필요하지 않은 데이터까지 함께 조회해 리스트 응답 비용이 커졌습니다.

```js
// 개선 전: 일정 주기마다 리스트 재조회
setInterval(() => {
  fetchWorkspaceList()
}, 30000)
```

```java
public List<PostDto.ResList> list(Long userIdx) {
    List<UserPost> userPosts = upr.findByUserIdx(userIdx);

    return userPosts.stream()
            .map(userPost -> PostDto.ResList.builder()
                    .postIdx(userPost.getWorkspace().getIdx())
                    .title(userPost.getWorkspace().getTitle())
                    .updatedAt(userPost.getWorkspace().getUpdatedAt())
                    .level(userPost.getLevel())
                    .build())
            .toList();
}
```
"""
cause = """
핵심 원인은 갱신 책임과 조회 비용이 모두 클라이언트 폴링에 묶여 있었던 점입니다.

- 폴링은 서버 변경 여부와 관계없이 요청을 발생시켜 대부분의 요청이 낭비됩니다.
- 변경이 생겨도 클라이언트의 다음 30초 주기까지 화면 반영이 늦어집니다.
- 기존 리스트 조회는 사용자 워크스페이스 엔티티를 먼저 가져온 뒤 DTO로 변환해, 목록 화면에 필요 없는 필드까지 로딩할 수 있습니다.
- 목록 크기가 커질수록 매 폴링의 DB 조회·직렬화·렌더링 비용이 같이 커집니다.

| 항목 | 개선 전 | 개선 후 | 변화 |
|---|---:|---:|---:|
| Total Users | 100 | 100 | 동일 조건 |
| TPS | 32.7 | 192.4 | 약 5.88배 증가 |
| Peak TPS | 40.5 | 283.0 | 약 6.99배 증가 |
| Mean Test Time | 1,506.77ms | 162.04ms | 약 89.2% 감소 |
| Executed Tests | 3,530 | 20,410 | 약 5.78배 증가 |
| Errors | 0 | 0 | 오류 없음 |
"""
solution = """
갱신 방식은 **SSE(Server-Sent Events)** 로 바꾸고, 실제 목록 조회 API는 **Projection + 페이지네이션** 기반으로 줄였습니다. 서버가 변경 이벤트를 사용자에게 푸시하고, 클라이언트는 이벤트를 받았을 때만 필요한 화면을 갱신합니다.

![SSE와 Projection 기반 페이지 조회를 적용한 개선 후 nGrinder 결과](images/projects/fileinnout/workspace-list-after.png "워크스페이스 리스트 조회 개선 후")

```java
@GetMapping(value = "/connect", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
public SseEmitter connect(@AuthenticationPrincipal AuthUserDetails user) {
    SseEmitter emitter = new SseEmitter(60 * 1000L * 60);
    emitterStore.put(user.getUserIdx(), UUID.randomUUID().toString(), emitter);
    return emitter;
}
```

```js
eventSource.addEventListener('title-updated', (event) => {
  window.dispatchEvent(new CustomEvent('sse-title-updated', {
    detail: JSON.parse(event.data)
  }))
})
```

```java
@GetMapping("/workspace/list")
public ResponseEntity<List<PostDto.ResList>> list(
        @CurrentUser User user,
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "50") int size
) {
    return ResponseEntity.ok(postService.list(user.getIdx(), page, size));
}
```

```java
@Query(\"\"\"
    SELECT w.idx as postIdx, w.title as title, w.updatedAt as updatedAt,
           w.status as status, w.UUID as uuid, up.Level as level
    FROM UserPost up
    JOIN up.workspace w
    WHERE up.user.idx = :userIdx
    ORDER BY w.updatedAt DESC, w.createdAt DESC
\"\"\")
List<WorkspaceListProjection> findWorkspaceListByUserIdx(
        @Param("userIdx") Long userIdx,
        Pageable pageable
);
```
"""
result = """
100명의 가상 사용자를 기준으로 nGrinder 부하 테스트를 진행했습니다. 평균 응답시간은 **1,506.77ms에서 162.04ms로 약 89.2% 감소**했고, TPS는 **32.7에서 192.4로 약 5.88배 증가**했습니다. 두 테스트 모두 오류는 0건이었습니다.

즉, 워크스페이스 리스트는 변경 감지를 SSE로 실시간화하고, 조회 API는 Projection과 페이지네이션으로 가볍게 만들어 안정적으로 확장될 수 있도록 개선했습니다.
"""

[[troubleshooting]]
title = "트러블슈팅 3. Redis 기반 동시성 제어"
problem = """
SSE로 실시간 알림을 구현한 뒤, 배포·확장으로 백엔드 인스턴스가 여러 개(블루/그린, 스케일아웃)가 되자 문제가 드러났습니다. 한 인스턴스에서 발생한 이벤트가 **다른 인스턴스에 연결된 사용자에게는 전달되지 않았습니다.**
"""
cause = """
SSE 연결과 발행 이벤트가 **각 인스턴스의 메모리 안에만** 존재했기 때문입니다. 사용자 A가 1번 인스턴스에, B가 2번 인스턴스에 연결돼 있으면 A가 만든 이벤트는 B에게 닿지 못합니다.
"""
solution = """
**Redis Pub/Sub**을 이벤트 버스로 두어 인스턴스 간 이벤트를 전파했습니다.

- 각 인스턴스는 이벤트를 Redis 채널에 발행(publish)
- 모든 인스턴스가 같은 채널을 구독(subscribe)해, 자신에게 연결된 사용자에게 다시 전달

덕분에 어느 인스턴스에 연결돼 있든 동일하게 알림을 받아, 다중 인스턴스 환경에서도 SSE 동시성이 보장됩니다.
"""
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

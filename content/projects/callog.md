+++
title = "Callog"
date = 2026-05-29
weight = 2
slug = "callog"
category = "Campaign Management Platform"
summary = "캠페인 기획부터 일정·KPI·광고 검수·파트너 협업까지 연결하는 통합 워크스페이스"
description = "Callog는 캠페인 기획, 파트너 매칭, 일정과 업무, KPI, 광고 검수를 하나의 흐름으로 관리하는 캠페인 협업 플랫폼입니다. Vue 3와 Spring Boot 기반으로 구성했으며, 대시보드 집계 API와 JPA 쿼리를 최적화하고 Redis·Valkey 캐시를 적용해 조회 병목을 개선했습니다."
cover = { image = "images/projects/callog/callog.png", fit = "contain" }
live_demo = "https://www.magamcallog.kro.kr/"
repository = "https://github.com/Lumisia/Callog"
architecture_image = "images/projects/callog/callog-architecture.png"
period = "2026.04 ~ 2026.05 (BEYOND SW 캠프 24기 최종 프로젝트)"
team = "팀원 5명"
responsibility = "캠페인 · 대시보드 · 캘린더 · KPI · Redis 담당"

features_intro = """
캠페인의 생성부터 성과 확인까지 이어지는 핵심 흐름을 담당했습니다. 화면 구현에 그치지 않고 캠페인 권한, 업무·일정 데이터, KPI 집계, 대시보드 캐시까지 프론트엔드와 백엔드를 함께 연결했습니다.
"""

[[contributions]]
title = "Backend"
items = [
  "캠페인 CRUD, 참여자 초대, 멤버 역할과 권한 검증 API 설계",
  "대시보드 통합 집계 API와 사용자·조직 권한별 조회 범위 구현",
  "캠페인·조직 KPI CRUD, 상위 KPI 연계와 일·월 스냅샷 구성",
  "팀보드 Task·Milestone·Task Part와 통합 캘린더 API 구현",
]

[[contributions]]
title = "Frontend"
items = [
  "권한별 대시보드 UI와 ApexCharts 기반 KPI·성과 데이터 시각화",
  "캠페인 생성·상세·참여자·권한·KPI·팀보드 화면 및 API 연동",
  "주 단위 레인 배치 월간 캘린더, 빠른 일정 추가와 Drag & Drop 구현",
  "구글 캘린더 친화적 가져오기·내보내기 UI 구현",
]

[[contributions]]
title = "Data/Infra"
items = [
  "JPA 전수 조회·반복 쿼리를 IN·COUNT·GROUP BY 쿼리로 최적화",
  "Redis @Cacheable, 사용자별 버전 키, 선택적 캐시 무효화와 Stampede 방지",
  "Redis 분산 락으로 다중 Pod KPI 스냅샷 중복 실행 방지",
  "Redis Pub/Sub으로 다중 Pod SSE 이벤트 전달 경로 구성",
]

[[features]]
heading = "대시보드"
image = "images/projects/callog/dashboard.png"
image_alt = "Callog 본사 통합 대시보드 화면"
body = """
- 사용자와 조직 권한에 따라 접근 가능한 캠페인·KPI·업무 범위를 분리했습니다.
- 캠페인 진행률, 분기 목표, 협력사 현황, 자산 분포를 하나의 통합 API로 제공합니다.
- ApexCharts와 요약 카드로 집계 데이터를 시각화했습니다.
"""

[[features]]
heading = "캠페인 · 권한"
image = "images/projects/callog/campaign.png"
image_alt = "Callog 캠페인 오버뷰 화면"
body = """
- 캠페인 생성·수정·상태 변경과 참여자 초대 흐름을 구현했습니다.
- 캠페인 멤버 역할과 소속 조직을 기준으로 조회·수정 권한을 검증합니다.
- 캠페인별 팀보드, KPI, 일정, 광고 검수 화면을 하나의 상세 화면에 연결했습니다.
"""

[[features]]
heading = "캘린더 · 팀보드"
images = [
  { image = "images/projects/callog/calendar.png", alt = "Callog 운영 캘린더 주간 화면" },
  { image = "images/projects/callog/teamboard.png", alt = "Callog 전체 협업 팀보드 화면" },
]
body = """
- 개인 업무와 캠페인 업무, 마일스톤을 월·주·목록·타임라인 화면에서 함께 조회합니다.
- 다일정은 주 단위 막대로 연결하고 겹치는 일정은 레인으로 분리합니다.
- `.ics` 파일로 외부 캘린더 일정을 가져오거나 Callog 일정을 내보낼 수 있습니다.
"""

[[features]]
heading = "KPI"
image = "images/projects/callog/kpi.png"
image_alt = "Callog 분기 KPI 관리 화면"
body = """
- 조직 KPI를 캠페인 KPI로 가져오고 캠페인 실적이 상위 목표에 기여하도록 연결했습니다.
- KPI 템플릿, 목표·실적·달성률과 기간별 상태를 관리합니다.
- 일·월 스냅샷으로 과거 달성률을 보존하고 대시보드 추이를 계산합니다.
"""

[[features]]
heading = "Redis · Valkey"
image = "images/projects/callog/redis-valkey.svg"
image_alt = "Callog 대시보드 캐시 조회·버전 무효화와 Redis→Valkey 호환 전환 흐름"
body = """
- 대시보드 통합 응답을 사용자·분기·버전 단위로 캐시했습니다.
- 변경된 사용자 범위의 버전만 증가시켜 전체 캐시 삭제를 피했습니다.
- Redis 프로토콜 호환성을 이용해 같은 애플리케이션 코드로 Valkey를 비교 검증했습니다.
"""

[[troubleshooting]]
title = "1. 대시보드 조회 병목 - JPA 전수 조회와 캐시 미적용 개선"
problem = """
대시보드 한 화면에서 캠페인, KPI, 협력사, 업무, 자산 데이터를 함께 집계했습니다. 초기 구현은 테이블 전체를 조회한 뒤 Java Stream으로 권한 범위를 필터링했고, 캠페인별 참여자와 KPI를 반복 조회했습니다.

```java
// 적용 전: 전체 테이블 조회 후 JVM에서 필터링
List<CampaignKpi> kpis = campaignKpiRepository.findAll().stream()
    .filter(kpi -> visibleCampaignIds.contains(kpi.getCampaign().getIdx()))
    .toList();

for (Campaign campaign : visibleCampaigns) {
    participantRepository.findAllByCampaignIdx(campaign.getIdx());
}

long liveAssets = assetRepository.findAll().stream()
    .filter(asset -> isVisible(asset, scope))
    .count();
```

100 Vuser가 2분 동안 대시보드 통합 조회를 호출한 결과 TPS는 **7.0**, 평균 응답 시간은 **11,033.33ms**, 에러는 **44건**이었습니다.

![JPA 쿼리 최적화와 Redis 캐시 적용 전 nGrinder 결과](images/projects/callog/dashboard-before.png "대시보드 최적화 적용 전")
"""
cause = """
- `findAll()`은 사용자에게 필요하지 않은 행까지 애플리케이션 메모리로 가져왔습니다.
- 캠페인 반복문 안의 참여자·KPI 조회가 캠페인 수에 비례해 증가했습니다.
- 하위 집계 메서드에 `@Cacheable`이 있어도 같은 객체의 `loadAll()`에서 직접 호출하면 Spring AOP Proxy를 우회해 캐시가 적용되지 않았습니다.
- 동시에 Cold Cache가 열리면 같은 키를 여러 요청이 계산하는 Cache Stampede 가능성이 있었습니다.
"""
solution = """
**1. 조회 범위를 DB 쿼리로 이동**

```java
// 적용 후: 필요한 캠페인 범위만 IN 쿼리로 조회
List<CampaignKpi> kpis = campaignKpiRepository
    .findAllByCampaign_IdxInOrderByIdxAsc(visibleCampaignIds);

List<CampaignParticipant> participants = participantRepository
    .findAllByCampaignIdxInWithOrg(visibleCampaignIds);

long liveAssets = assetRepository
    .countVisibleAssets(visibleCampaignIds, scope.ownerOrgId());
```

전수 조회와 캠페인별 반복 쿼리를 `IN`, `COUNT`, `GROUP BY` 기반 Repository 쿼리로 변경했습니다.

**2. 통합 응답 자체를 캐시**

```java
private static final String DASHBOARD_VERSION_KEY =
    " + ':v' + @dashboardCacheVersionService.getVersion(#callerIdx)";

@Cacheable(
    value = CacheNames.DASHBOARD_PAGE,
    key = "#callerIdx + ':' + (#periodCode == null ? '' : #periodCode)"
          + DASHBOARD_VERSION_KEY,
    sync = true
)
public DashboardPageDto loadAll(Long callerIdx, String periodCode) {
    return new DashboardPageDto(
        summary(callerIdx), quarterGoals(callerIdx, periodCode),
        partnerProgress(callerIdx), assetCategories(callerIdx)
    );
}
```

사용자·분기·버전 단위 키로 `loadAll()` 결과를 Redis에 저장했습니다. 동일 키의 최초 계산은 한 스레드만 수행하고, 데이터 변경 시 해당 사용자의 버전만 증가시켰습니다.

![JPA 쿼리 최적화와 Redis 캐시 적용 후 nGrinder 결과](images/projects/callog/dashboard-redis.png "대시보드 Redis 적용 후")

**3. Redis에서 Valkey로 비교 전환**

```yaml
spring:
  data:
    redis:
      host: ${REDIS_HOST}
      port: 6379
```

Valkey가 Redis 프로토콜과 Lettuce 연결 방식을 호환하므로 애플리케이션 코드는 유지하고 ConfigMap의 접속 호스트만 교체했습니다.

![Redis에서 Valkey로 전환한 뒤 nGrinder 결과](images/projects/callog/dashboard-valkey.png "대시보드 Valkey 적용 후")
"""
result = """
| 구분 | 평균 TPS | 평균 응답 시간 | 에러 |
|---|---:|---:|---:|
| JPA·Redis 최적화 전 | 7.0 | 11,033.33ms | 44 |
| JPA 쿼리 최적화 + Redis | 97.3 | 995.14ms | 16 |
| 동일 코드 + Valkey | 117.4 | 787.35ms | 0 |

- JPA 쿼리 최적화와 Redis 적용 후 TPS가 **약 13.9배 증가**하고 평균 응답 시간이 **약 91.0% 감소**했습니다.
- Valkey 전환 후 기록에서는 TPS **117.4**, 평균 응답 **787.35ms**, 에러 **0건**을 확인했습니다.
- 첫 번째와 두 번째 결과는 JPA와 캐시를 함께 개선한 결과이므로 Redis만의 효과로 분리해 해석하지 않았습니다.
- Redis와 Valkey는 워밍업과 자원 경합 조건이 완전히 같지 않아 제품 간 우열이 아니라 **호환 전환과 운영 가능성 검증**으로 판단했습니다.
"""

[[troubleshooting]]
title = "2. 다일정 중복·겹침 - 주 단위 레인 배치로 캘린더 재설계"
problem = """
초기 월간 캘린더는 날짜 셀마다 해당 일자의 이벤트를 독립적으로 렌더링했습니다. 여러 날짜에 걸친 캠페인과 업무는 매일 별도 칩으로 반복되어 기간의 연속성이 보이지 않았고, 같은 날 일정이 몰리면 셀 높이가 불안정해졌습니다.

```javascript
// 적용 전: 날짜별 이벤트를 각 셀 안에 반복 렌더링
function visibleEventsOnDay(date) {
  const events = eventsByDay.value.get(date) ?? []
  return events.slice(0, MAX_ROWS_PER_DAY - 1)
}
```
"""
cause = """
날짜 셀을 렌더링 단위로 사용하면 시작일과 종료일을 가진 하나의 이벤트도 날짜마다 서로 다른 요소가 됩니다. 또한 각 셀은 옆 날짜의 이벤트 점유 영역을 알 수 없어 다일정의 연결과 겹침을 계산할 수 없었습니다.
"""
solution = """
렌더링 단위를 날짜에서 **주(7일)** 로 올리고, 이벤트를 `[startCol, endCol]` 구간으로 변환했습니다. 구간이 겹치지 않는 가장 낮은 레인을 찾아 배치하고 표시 한도를 넘는 일정은 날짜별 `+N`으로 집계했습니다.

```javascript
const inWeek = events.value
  .filter((event) => overlaps(event, weekStart, weekEnd))
  .map((event) => ({
    event,
    startCol: toWeekColumn(event.start, weekStart),
    endCol: toWeekColumn(event.end ?? event.start, weekStart),
  }))

const lanes = []
for (const item of inWeek) {
  let lane = 0
  while (lanes[lane]?.some(([start, end]) =>
    !(item.endCol < start || item.startCol > end))) lane++

  ;(lanes[lane] ??= []).push([item.startCol, item.endCol])
  item.lane = lane
}
```

```vue
<button
  v-for="item in week.items"
  :style="{
    top: itemTop(item) + 'px',
    left: 'calc(' + itemLeftPct(item) + '% + 4px)',
    width: 'calc(' + itemWidthPct(item) + '% - 8px)',
  }"
>
```

![날짜 셀별 반복 렌더와 주 단위 레인 배치 비교](images/projects/callog/calendar-lane.svg "캘린더 레인 배치 적용 전후")
"""
result = """
- 여러 날짜에 걸친 일정이 하나의 연속 막대로 표시됩니다.
- 겹치는 일정은 서로 다른 레인에 배치되어 가려지지 않습니다.
- 표시 가능한 레인을 초과하면 날짜별 `+N`으로 접어 셀 높이를 일정하게 유지합니다.
- 기존 클릭, Drag & Drop, Hover 상세 기능을 주 단위 오버레이에서도 그대로 유지했습니다.
"""

[[troubleshooting]]
title = "3. 다중 Pod 스케줄러 중복 실행과 SSE 전달 누락"
problem = """
Kubernetes에서 애플리케이션 Pod가 여러 개 실행되면 모든 Pod가 같은 `@Scheduled` 메서드를 수행합니다. KPI 스냅샷이 중복 생성될 수 있고, SSE 연결은 각 Pod 메모리에만 존재해 이벤트를 만든 Pod와 사용자가 연결된 Pod가 다르면 알림이 전달되지 않았습니다.

```java
// 적용 전: 모든 Pod가 같은 시간에 실행
@Scheduled(cron = "0 30 2 * * *")
public void rollupDaily() {
    saveDailySnapshots();
}

// 적용 전: 현재 Pod 메모리의 연결에만 전달
private final Map<Long, List<SseEmitter>> emitters = new ConcurrentHashMap<>();
```
"""
cause = """
- Spring Scheduler는 다른 Pod의 실행 상태를 알지 못합니다.
- `SseEmitter`는 프로세스 로컬 객체라 Pod 사이에서 공유할 수 없습니다.
- 단순 Redis `DEL`로 락을 해제하면 TTL 만료 후 다른 Pod가 획득한 락까지 이전 작업이 삭제할 수 있습니다.
"""
solution = """
**1. UUID 토큰을 검증하는 Redis 분산 락**

```java
public String tryLock(String key, Duration ttl) {
    String token = UUID.randomUUID().toString();
    Boolean acquired = redis.opsForValue().setIfAbsent(key, token, ttl);
    return Boolean.TRUE.equals(acquired) ? token : null;
}

private static final String UNLOCK_LUA =
    "if redis.call('get', KEYS[1]) == ARGV[1] " +
    "then return redis.call('del', KEYS[1]) else return 0 end";
```

```java
@Scheduled(cron = "0 30 2 * * *")
public void rollupDaily() {
    String token = redisLock.tryLock("lock:snapshot:daily", Duration.ofMinutes(10));
    if (token == null) return;
    try {
        saveDailySnapshots();
    } finally {
        redisLock.unLock("lock:snapshot:daily", token);
    }
}
```

**2. Redis Pub/Sub을 통한 SSE 중계**

```java
private void publish(SseMessage message) {
    redis.convertAndSend("sse:events", objectMapper.writeValueAsString(message));
}

public void deliverLocally(SseMessage message) {
    List<SseEmitter> localConnections = emitters.get(message.userIdx());
    if (localConnections == null) return;
    localConnections.forEach(emitter ->
        sendEvent(message.userIdx(), emitter, message.eventName(), message.data()));
}
```

각 Pod가 같은 채널을 구독하고 자신에게 연결된 사용자에게만 최종 전달하도록 구성했습니다.

![다중 Pod 분산 락과 Redis Pub/Sub 기반 SSE 중계 시퀀스](images/projects/callog/multipod-sequence.svg "다중 Pod 상태 조정 흐름")
"""
result = """
- 여러 Pod가 동시에 스케줄 시각을 맞아도 락을 획득한 한 Pod만 KPI 스냅샷을 생성합니다.
- Lua Script가 락 소유 토큰을 비교해 다른 Pod가 획득한 락을 잘못 해제하지 않습니다.
- 이벤트 발생 Pod와 사용자 연결 Pod가 달라도 Redis 채널을 거쳐 SSE 이벤트가 전달됩니다.
- Redis 발행에 실패하면 현재 Pod의 로컬 연결에는 직접 전달하는 fallback을 유지했습니다.
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
<span class="stack"><span class="icon-badge">Ap</span>ApexCharts</span>
</div>
</div>

<div class="proj-tech-group">
<p class="proj-tech-cat">Backend</p>
<div class="proj-tech-grid">
<span class="stack"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" alt="Java 아이콘">Java 17</span>
<span class="stack"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg" alt="Spring Boot 아이콘">Spring Boot 3</span>
<span class="stack"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg" alt="Spring Security 아이콘">Spring Security</span>
<span class="stack"><span class="icon-badge ib-jwt">JWT</span>JWT</span>
<span class="stack"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg" alt="Spring Data JPA 아이콘">Spring Data JPA</span>
<span class="stack"><span class="icon-badge">GW</span>Spring Gateway</span>
<span class="stack"><span class="icon-badge">Eu</span>Eureka</span>
<span class="stack"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apachekafka/apachekafka-original.svg" alt="Kafka 아이콘">Kafka</span>
</div>
</div>

<div class="proj-tech-group">
<p class="proj-tech-cat">Data · AI</p>
<div class="proj-tech-grid">
<span class="stack"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg" alt="Redis 아이콘">Redis</span>
<span class="stack"><span class="icon-badge">Vk</span>Valkey</span>
<span class="stack"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mariadb/mariadb-original.svg" alt="MariaDB 아이콘">MariaDB</span>
<span class="stack"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" alt="MongoDB 아이콘">MongoDB</span>
<span class="stack"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" alt="Python 아이콘">Python</span>
<span class="stack"><span class="icon-badge">n8n</span>n8n</span>
</div>
</div>

<div class="proj-tech-group">
<p class="proj-tech-cat">Infra · Observability</p>
<div class="proj-tech-grid">
<span class="stack"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" alt="Docker 아이콘">Docker</span>
<span class="stack"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg" alt="Kubernetes 아이콘">Kubernetes</span>
<span class="stack"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nginx/nginx-original.svg" alt="Nginx 아이콘">Nginx</span>
<span class="stack"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jenkins/jenkins-original.svg" alt="Jenkins 아이콘">Jenkins</span>
<span class="stack"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prometheus/prometheus-original.svg" alt="Prometheus 아이콘">Prometheus</span>
<span class="stack"><span class="icon-badge">Ja</span>Jaeger</span>
</div>
</div>

</section>

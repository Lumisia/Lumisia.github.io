+++

title = "Callog"
date = 2026-05-29
weight = 2
slug = "callog"
category = "Campaign Management Platform"
summary = "캠페인 기획부터 일정·KPI·광고 검수·파트너 협업까지 연결하는 통합 워크스페이스"
description = "Callog는 캠페인 기획, 파트너 매칭, 일정과 업무, KPI, 광고 검수를 하나의 흐름으로 관리하는 캠페인 협업 플랫폼입니다. Vue 3와 Spring Boot 기반으로 구성했으며, 대시보드 집계 API와 JPA 쿼리를 최적화하고 Redis·Valkey 캐시를 적용해 조회 병목을 개선했습니다."
cover = { image = "images/projects/callog/callog.png", fit = "cover", position = "right center" }
live_demo = "https://www.magamcallog.kro.kr/"
repository = "https://github.com/Lumisia/Callog"
architecture_image = "images/projects/callog/callog-architecture.png"
period = "2026.04 ~ 2026.05 (BEYOND SW 캠프 24기 최종 프로젝트)"
team = "팀원 5명"
responsibility = "캠페인 · 대시보드 · 캘린더 · KPI · Redis 담당"

[[highlights]]
value = "Redis vs Valkey"
label = "동일 코드 대안 비교"

[[highlights]]
value = "에러 44 → 0"
label = "100 VU 부하 기준"

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
title = "1. 대시보드에서 조회 지연으로 데이터가 표시되지 않거나 일부만 표시되는 문제가 있었습니다."
architecture_image = "images/projects/callog/dashboard-architecture.svg"
architecture_alt = "대시보드에서 조회 지연으로 데이터가 표시되지 않거나 일부만 표시되는 문제가 있었습니다. 기능 전체 흐름"
cause = '''
1. 기능을 기초 구현한 뒤 대시보드에 진입했을 때 데이터가 표시되지 않거나 일부 영역만 표시되는 현상을 발견했습니다.
2. 전체 데이터를 가져와 가공하는 비용과 캠페인별 반복 조회로 응답이 지연됐으며, 같은 객체 내부에서 집계 메서드를 호출해 Spring 프록시를 거치지 않으면서 `@Cacheable`도 적용되지 않았습니다.
3. 프론트 요청 제한 시간만 늘려서는 처리 비용이 줄어들지 않으므로, 조회 범위와 실제 캐시가 적용되는 호출 위치를 함께 바꿔야 했습니다.
'''
solution = '''
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
'''
result = '''
쿼리와 캐시를 개선한 뒤 평균 테스트 시간이 약 11초에서 787.35ms로 줄었고, 처리량은 7.0 TPS에서 117.4 TPS로 증가했습니다. 같은 대시보드 조회 시나리오의 최종 측정에서 오류가 44건에서 0건으로 줄어, 데이터 조회 실패와 긴 응답 대기를 개선했습니다.

7.0에서 97.3 TPS까지는 쿼리와 캐시를 함께 개선한 결과이며, 이후 Valkey 전환 측정에서 117.4 TPS를 기록했습니다. Valkey 선택은 이 반복 조회 시나리오의 결과와 전환 비용을 기준으로 판단했습니다.

테스트 조건: 최대 가상 사용자 100명, 실행 시간 약 2분, 관련 데이터 합계 약 1,000건, 동일 계정 반복 호출, 시작 전 캐시 초기화, Ramp-Up 적용.

| 항목 | 개선 전 | 쿼리 최적화 + Redis | 동일 코드 + Valkey |
|---|---:|---:|---:|
| TPS | 7.0 | 97.3 | 117.4 |
| 평균 테스트 시간 | 11,033.33ms | 995.14ms | 787.35ms |
| 오류 | 44 | 16 | 0 |

**개선 전**

![대시보드 조회 개선 전 성능 측정](images/projects/callog/dashboard-before.png)

**Redis 적용 단계**

![대시보드 Redis 적용 후 성능 측정](images/projects/callog/dashboard-redis.png)

**Valkey 적용 단계**

![대시보드 Valkey 적용 후 성능 측정](images/projects/callog/dashboard-valkey.png)
'''

[[troubleshooting]]
title = "2. 캘린더에서 기간 일정이 반복 표시되고 다른 일정을 가리는 문제가 있었습니다."
architecture_image = "images/projects/callog/calendar-architecture.svg"
architecture_alt = "캘린더에서 기간 일정이 반복 표시되고 다른 일정을 가리는 문제가 있었습니다. 기능 전체 흐름"
cause = '''
1. 여러 임시 더미 일정을 넣어 확인하면서, 기간 일정이 반복 표시되고 다른 1일 또는 3일 일정이 보이지 않는 현상을 발견했습니다.
2. 날짜 셀마다 일정을 독립적으로 표시해 옆 날짜까지 이어지는 일정의 점유 구간을 함께 계산하지 못했고, 표시 개수를 제한하면서 다른 일정이 가려졌습니다.
3. 일정이 같은 날짜에 몰려도 각각의 기간과 존재를 확인할 수 있도록 주 단위로 표시 구간과 겹침을 계산해야 했습니다.
'''
solution = '''
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
'''
result = '''
기간 일정이 날짜마다 중복 표시되던 문제를 주차별 막대 표시로 개선했습니다. 긴 일정과 짧은 일정이 같은 날짜에 있어도 줄을 나눠 구분할 수 있고, 표시 공간을 넘은 일정은 `+N`을 통해 전체 목록에서 확인할 수 있도록 했습니다.

![기간 막대와 일정 배치를 확인할 수 있는 Callog 캘린더](images/projects/callog/calendar.png)
'''

[[troubleshooting]]
title = "3. 다중 Pod 환경에서 스케줄러가 같은 작업을 중복 실행할 수 있었습니다."
architecture_image = "images/projects/callog/scheduler-architecture.svg"
architecture_alt = "다중 Pod 환경에서 스케줄러가 같은 작업을 중복 실행할 수 있었습니다. 기능 전체 흐름"
cause = '''
1. 이전 File in & Out 프로젝트에서 백엔드 Pod마다 스케줄러가 독립적으로 실행되는 문제를 경험했고, 같은 문제가 생기지 않도록 Callog 설계에 반영했습니다.
2. 서버 내부 스케줄러는 다른 Pod의 작업 실행을 알 수 없고, 사용자 알림 연결도 각 Pod에 따로 존재했습니다.
3. 여러 서버가 같은 작업에 동시에 진입하는 것을 제어하면서, 작업 결과 알림은 사용자가 연결된 서버까지 전달해야 했습니다.
'''
solution = '''
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
'''
result = '''
여러 Pod가 같은 작업의 락을 동시에 획득하려 할 때, 락을 얻은 실행만 작업에 진입하고 나머지는 건너뛰도록 했습니다. 작업 결과는 Pub/Sub으로 각 Pod에 전달하여 다른 서버에 연결된 사용자에게도 알림을 보낼 수 있게 했습니다. 이 방식은 락이 유지되는 동안의 실행 경쟁을 제어합니다.
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

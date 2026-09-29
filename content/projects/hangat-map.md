+++
title = "한갓지도"
draft = false
date = 2026-08-24
weight = 3
slug = "hangat-map"
category = "Travel Service / 팀 프로젝트"
summary = "한적한 제주 여행지를 탐색하고 여행 코스를 계획하는 서비스"
description = "한적한 제주 여행지를 탐색하고 여행 코스를 계획하는 서비스입니다. 회원 인증과 보안을 담당하며 일반 회원가입, 소셜 로그인, 이메일 인증, 비밀번호 재설정과 로그인 토큰 관리를 구현하고, 배포 파이프라인과 운영 환경을 구성했습니다."
cover = { image = "images/projects/hangat-map/hangat-map.png", fit = "cover" }
repository = "https://github.com/Lumisia/HanGat_Map"
live_demo = "https://hangatjeju.com/"
architecture_image = ""
period = "2026.08.24 ~ 2026.09.21"
team = "팀 프로젝트(4명)"
responsibility = "회원 인증 및 보안 담당, 배포 파이프라인 및 운영 담당"
features_intro = "이메일 소유권을 확인한 뒤 가입, 계정 연결, 비밀번호 변경을 허용하도록 구성했습니다. 비밀번호 찾기와 마이페이지는 동일한 재설정 API를 사용하고, 소셜 인증과는 코드 생성 및 해시 검증 컴포넌트를 공유합니다."

[[highlights]]
value = "회원 인증 설계"
label = "OAuth와 이메일 확인"

[[highlights]]
value = "공통 검증 재사용"
label = "비밀번호 재설정과 계정 연결"

[[contributions]]
title = "Backend"
items = [
  "일반 회원가입과 이메일 인증 링크를 통한 계정 활성화",
  "Spring Security 기반 Google과 Kakao 로그인, 이메일 확인 후 기존 계정 연결",
  "코드와 일회용 티켓을 이용한 비밀번호 재설정, 공통 생성기와 해시 검증기 활용",
  "Refresh Token 잠금 조회, 회전, 재사용 감지와 절대 만료 시각 유지",
]

[[contributions]]
title = "Frontend"
items = [
  "회원가입, 소셜 가입과 연결, 비밀번호 재설정 화면의 인증 API 연동",
  "마이페이지에 기존 비밀번호 재설정 API 재사용",
  "Access Token 메모리 관리와 진행 중인 토큰 재발급 요청 공유",
]

[[contributions]]
title = "DevOps/Infra"
items = [
  "Jenkins에서 백엔드 테스트, 프론트엔드 타입 검사와 테스트, Helm 검증을 거친 배포 파이프라인 구성",
  "프론트엔드와 백엔드 Docker 이미지 빌드, 커밋과 빌드 번호를 조합한 태그로 Docker Hub 업로드",
  "OCI의 k3s 환경에 Helm으로 배포하고 배포 상태 확인, 실패 시 자동 롤백과 진단 기록 수집",
  "Nginx Ingress의 웹과 API 도메인 분리, HTTPS 연결과 헬스 체크, ConfigMap과 Secret을 이용한 운영 설정 관리",
]

[[features]]
heading = "회원가입과 소셜 계정 연결"
image_layout = "compact"
image = "images/projects/hangat-map/login.png"
image_alt = "한갓지도 이메일 로그인, 회원가입 및 Google과 Kakao 로그인 화면"
body = """
- 일반 회원가입은 이메일 인증 링크를 통해 계정을 활성화합니다.
- 소셜 가입과 기존 계정 연결은 이메일 코드를 검증한 뒤 서버에서 처리합니다.
- 카카오는 이메일 확인 후 기존 계정을 조회하고 연결 동의를 받습니다.
"""

[[features]]
heading = "비밀번호 찾기와 마이페이지"
image_layout = "aligned"
images = [
  { image = "images/projects/hangat-map/password-reset.png", alt = "한갓지도 비밀번호 재설정 코드 발송 화면" },
  { image = "images/projects/hangat-map/mypage.png", alt = "한갓지도 마이페이지 프로필과 설정 화면" },
]
body = """
- 같은 화면에서 코드 발송, 코드 확인, 새 비밀번호 설정을 이어서 진행합니다.
- 비밀번호 찾기와 마이페이지에서 동일한 세 단계 API를 사용합니다.
- 이메일 확인 전에는 기존 비밀번호를 유지하고, 유효한 티켓으로만 변경합니다.
"""

[[features]]
heading = "로그인 유지와 토큰 관리"
image = ""
body = """
- Refresh Token은 HttpOnly 쿠키, Access Token은 프론트 메모리로 분리합니다.
- 서버에서 토큰 상태와 만료를 확인하고, 재발급할 때 기존 토큰을 폐기합니다.
- 같은 프론트 실행 환경의 동시 재발급 요청은 하나의 Promise를 공유합니다.
"""

[[implementation_methods]]
title = "공통 인증 코드와 기능별 권한 처리"
description = "코드 생성과 입력 정규화, HMAC 기반 해시 검증은 공통 컴포넌트를 사용하고, 가입과 연결 및 비밀번호 변경의 진행 상태는 각 서비스에서 관리했습니다."
items = [
  "인증 목적을 PASSWORD_RESET, OAUTH_SIGNUP, OAUTH_LINK로 구분",
  "인증 목적과 요청 식별자, 입력 코드를 함께 사용해 해시 검증",
  "코드 검증 후 비밀번호 재설정은 일회용 티켓, 소셜 인증은 가입 또는 연결 단계로 진행",
]

[[troubleshooting]]
title = "1. 소셜 로그인에서 제공자 인증만으로는 기존 한갓 계정 연결을 허용할 수 없었습니다."
architecture_image = "images/projects/hangat-map/oauth-architecture.svg"
architecture_alt = "1. 소셜 로그인에서 제공자 인증만으로는 기존 한갓 계정 연결을 허용할 수 없었습니다. 기능 전체 아키텍처"
cause = '''
1. Google과 Kakao 로그인을 일반 회원 계정과 연결하는 흐름을 설계하면서, 당시 카카오 연동 환경에서는 이메일을 제공받지 못해 별도 입력과 인증이 필요했습니다.
2. 입력한 이메일만으로 기존 한갓 계정의 소유권을 판단할 수 없고, 인증 전에 계정 정보를 안내하면 다른 사람의 가입 여부가 드러날 수 있었습니다.
3. 제공자 인증과 한갓 계정 연결의 판단을 서버에서 맡고, 이메일 소유권이 확인된 이후에 연결을 허용하도록 책임과 처리 순서를 정해야 했습니다.
'''
solution = '''
- Spring Security가 인가 코드 처리와 제공자 토큰 교환을 담당하도록 하고, Client Secret과 계정 연결 판단을 백엔드에서 관리했습니다.
- 카카오는 이메일 입력 → 코드 검증 → 기존 계정 조회 → 연결 동의 순서로 처리하고, 서버의 인증 진행 상태를 재사용해 동의 단계에서 코드를 다시 요구하지 않았습니다.
- OAuth 왕복에는 임시 세션을 사용하고 콜백 후 폐기했으며, 일반 API는 JWT 인증으로 분리했습니다.
- 계정 연결을 서버의 검증 결과로 결정하기 위해 이 구조를 선택했고, 완료 URL에는 화면 상태만 전달하며 Refresh Token은 HttpOnly 쿠키, Access Token은 프론트 메모리로 분리했습니다.

**실제 코드: 로그인 완료 URL에 화면 상태만 전달**

```java
private String callbackUrl(String result) {
    return frontendUrl + "/oauth/callback?result=" + result;
}
```

Refresh Token은 이 리다이렉트 전에 쿠키로 설정하며, 화면의 `result` 값 자체를 인증 근거로 사용하지 않습니다.
'''
result = '''
카카오 계정 연결은 이메일 소유권 확인과 연결 동의를 모두 거치도록 구성했습니다. 인증을 마친 사용자는 코드를 다시 받지 않고 연결을 완료할 수 있으며, 로그인 완료 URL에는 한갓 JWT나 제공자 토큰을 포함하지 않도록 했습니다. 제공자 인증 처리와 계정 연결 판단은 서버가 담당하고, 프론트는 입력과 연결 안내를 맡도록 책임을 나눴습니다.
'''

[[troubleshooting]]
title = "2. 비밀번호 찾기에서 임시 비밀번호 전달과 인증 로직의 중복을 피해야 했습니다."
architecture_image = "images/projects/hangat-map/reset-architecture.svg"
architecture_alt = "2. 비밀번호 찾기에서 임시 비밀번호 전달과 인증 로직의 중복을 피해야 했습니다. 기능 전체 아키텍처"
cause = '''
1. 기존 비밀번호 찾기 요구사항을 검토하면서, 임시 비밀번호를 메일로 받아 로그인한 뒤 다시 비밀번호를 변경해야 하는 흐름을 확인했습니다.
2. 비밀번호 찾기와 마이페이지의 변경 로직을 따로 구현하고 소셜 가입과 계정 연결에서도 코드 처리를 각각 만들면, 유사한 검증이 중복되고 관리할 분기가 늘어날 수 있었습니다.
3. 이메일 확인 후 사용자가 직접 새 비밀번호를 설정하도록 개선하면서, 여러 기능의 공통 인증 처리는 재사용하고 기능별로 허용되는 작업은 구분할 필요가 있었습니다.
'''
solution = '''
- 메일로 로그인용 비밀번호를 전달하지 않도록, 같은 화면에서 6자리 코드 확인 후 일회용 티켓으로 새 비밀번호를 설정하는 흐름을 선택했습니다.
- 비밀번호 찾기와 마이페이지가 동일한 발송, 검증, 재설정 API를 사용하게 해 별도의 비밀번호 변경 흐름을 중복 구현하지 않도록 했습니다.
- 소셜 가입과 계정 연결에서도 공통 코드 생성기와 해시 검증기를 사용하고, 인증 목적과 요청 식별자를 해시에 포함하면서 검증 후 처리는 각 서비스에서 관리했습니다.
- 코드와 티켓의 만료, 발송 횟수와 입력 실패 횟수를 제한하고, 검토 중 확인한 실패 횟수 롤백 문제는 잠금 조회와 `InvalidResetCodeException`의 롤백 제외로 보완했습니다.

적용 정책: 코드 유효시간 10분, 입력 실패 최대 5회, 티켓 유효시간 5분, 코드 발송은 서버 프로세스별로 10분 동안 이메일별 3회와 IP별 10회 제한.

코드 발송 단계에서는 기존 비밀번호를 유지하고, 유효한 티켓으로 변경을 요청해야 비밀번호가 바뀌도록 했습니다. 마이페이지에서도 이메일 확인을 거치도록 했으며, 발송 대상이 아닌 이메일에도 같은 형식의 정상 응답을 제공했습니다.

**실제 코드: 검증한 사용자에게만 재설정 티켓 발급**

```java
String ticket = TokenHasher.generateToken();
reset.markVerified(TokenHasher.hash(ticket));

return new AuthDto.VerifyResetCodeResponse(
        ticket,
        maskEmail(reset.getUser().getEmail()),
        PasswordResetRequest.TICKET_TTL.toMillis()
);
```

검증 성공 시 코드를 검증 완료 상태로 바꾸고, DB에는 티켓 해시를 저장합니다. 사용자가 받은 티켓은 새 비밀번호 설정 요청에 사용합니다.

**실제 코드: 실패 응답을 반환해도 입력 실패 횟수 보존**

검증 메서드에 `@Transactional(noRollbackFor = InvalidResetCodeException.class)`를 적용하고, 코드가 다를 때는 다음 처리를 수행합니다.

```java
if(!matched) {
    reset.addFailedAttempt();
    throw new InvalidResetCodeException();
}
```

재발송은 이전 미사용 요청을 무효화하고, 이미 검증한 코드와 사용 완료된 티켓은 다시 사용할 수 없도록 상태를 검사합니다.
'''
result = '''
기존 요구사항의 임시 비밀번호 발급을, 이메일 코드를 확인한 사용자가 같은 화면에서 직접 새 비밀번호를 정하는 흐름으로 바꿨습니다. 비밀번호 찾기와 마이페이지의 변경 처리는 하나의 API 흐름으로 관리하고, 소셜 가입 및 계정 연결과도 코드 생성과 해시 검증 로직을 공유하도록 구성했습니다. 실패 횟수는 누적해 5회 실패한 요청을 제한하고, 사용한 코드와 티켓은 재사용할 수 없게 했으며, 비밀번호 변경 후에는 기존 Refresh Token으로 재발급할 수 없도록 했습니다.
'''

[[troubleshooting]]
title = "3. 로그인 재발급에서 중복 요청과 토큰 만료 연장을 제어해야 했습니다."
architecture_image = "images/projects/hangat-map/refresh-architecture.svg"
architecture_alt = "3. 로그인 재발급에서 중복 요청과 토큰 만료 연장을 제어해야 했습니다. 기능 전체 아키텍처"
cause = '''
1. 로그인 재발급 흐름을 검토하면서, 같은 Refresh Token으로 요청이 겹치는 상황과 재사용 감지 후 처리, 재발급 시 만료 계산을 함께 확인했습니다.
2. 잠금 없이 처리하면 하나의 토큰이 중복 회전할 수 있고, 재사용 감지 후 폐기가 예외로 취소되거나 새 발급 시점마다 만료일이 연장될 수 있었습니다.
3. 재발급 이후에도 토큰의 일회성 사용과 정해진 로그인 수명을 유지하도록, 상태 변경과 만료 정책을 함께 관리해야 했습니다.
'''
solution = '''
- 프론트의 중복 요청 제어만으로 서버의 경쟁을 막을 수 없으므로, 사용자와 토큰을 순서대로 잠근 뒤 최신 상태를 확인하고 기존 토큰 폐기와 새 발급을 처리했습니다.
- 폐기된 토큰이 다시 들어오면 해당 사용자의 활성 Refresh Token을 폐기하고, 이 경로의 `BaseException`으로 폐기 처리가 롤백되지 않도록 설정했습니다.
- 재발급할 때 현재 시각으로 만료일을 다시 계산하는 대신 기존 `expiresAt`을 전달해, 최초 발급 기준의 절대 만료 시각을 유지했습니다.
- 프론트에서는 진행 중인 재발급 요청을 `refreshPromise`로 공유해, 같은 실행 환경에서 여러 API가 동시에 재발급을 요청하는 상황을 줄였습니다.

**실제 코드: 이전 토큰 폐기와 기존 만료 시각 유지**

```java
token.touch();
token.revoke(RefreshRevokeReason.ROTATED);
String rawRefresh = issueRefreshToken(user, token.getExpiresAt());
```

**실제 코드: 재사용을 감지하면 활성 토큰 폐기**

```java
if(token.isRevoked()) {
    revokeAll(token.getUser().getId(), RefreshRevokeReason.REUSE_DETECTED);
    throw new BaseException(BaseResponseStatus.JWT_INVALID);
}else if(!token.isUsable()) {
    throw new BaseException(BaseResponseStatus.JWT_EXPIRED);
}
```

위 처리가 포함된 재발급 메서드는 `@Transactional(noRollbackFor = BaseException.class)`를 사용합니다.
'''
result = '''
같은 토큰을 사용하는 재발급 요청을 잠금으로 순서대로 처리하고, 회전한 이전 토큰은 다시 사용할 수 없도록 했습니다. 재발급 때마다 로그인 가능 기간이 늘어나지 않도록 기존 만료 시각을 유지했으며, 같은 프론트 실행 환경의 중복 요청은 하나의 응답을 공유하도록 했습니다. 서로 다른 탭의 요청까지 공유하지는 않으므로, 이미 회전된 토큰을 다시 보내면 재사용 정책에 따라 재로그인이 필요할 수 있습니다.
'''
+++

<section class="proj-tech-section">
<h2 class="proj-sec-h">기술 스택</h2>
<div class="proj-tech-group">
<p class="proj-tech-cat">Backend</p>
<div class="proj-tech-grid">
<span class="stack"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" alt="Java 아이콘">Java 17</span>
<span class="stack"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg" alt="Spring Boot 아이콘">Spring Boot 3</span>
<span class="stack"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg" alt="Spring Security 아이콘">Spring Security</span>
<span class="stack"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg" alt="Spring Data JPA 아이콘">Spring Data JPA</span>
<span class="stack"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg" alt="Spring OAuth2 Client 아이콘">OAuth2 Client</span>
<span class="stack"><span class="icon-badge ib-jwt" aria-hidden="true">JWT</span>JWT</span>
<span class="stack"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mariadb/mariadb-original.svg" alt="MariaDB 아이콘">MariaDB</span>
</div></div>
<div class="proj-tech-group">
<p class="proj-tech-cat">Frontend</p>
<div class="proj-tech-grid">
<span class="stack"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg" alt="Vue 아이콘">Vue 3</span>
<span class="stack"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" alt="JavaScript 아이콘">JavaScript</span>
<span class="stack"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg" alt="Vite 아이콘">Vite</span>
<span class="stack"><img src="https://pinia.vuejs.org/logo.svg" alt="Pinia 아이콘">Pinia</span>
<span class="stack"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg" alt="Vue Router 아이콘">Vue Router</span>
</div></div>
<div class="proj-tech-group">
<p class="proj-tech-cat">DevOps/Infra</p>
<div class="proj-tech-grid">
<span class="stack"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jenkins/jenkins-original.svg" alt="Jenkins 아이콘">Jenkins</span>
<span class="stack"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" alt="Docker 아이콘">Docker</span>
<span class="stack"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" alt="Docker Hub 아이콘">Docker Hub</span>
<span class="stack"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg" alt="Kubernetes 아이콘">Kubernetes (k3s)</span>
<span class="stack"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/helm/helm-original.svg" alt="Helm 아이콘">Helm</span>
<span class="stack"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nginx/nginx-original.svg" alt="Nginx 아이콘">Nginx Ingress</span>
<span class="stack"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/oracle/oracle-original.svg" alt="Oracle Cloud 아이콘">OCI</span>
</div></div>
</section>

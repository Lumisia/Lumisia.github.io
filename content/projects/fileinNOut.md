+++
title = "File in & Out"
date = 2024-05-01
weight = 1
slug = "fileinnout"
category = "Collaboration · 팀 프로젝트"
summary = "팀 프로젝트를 위한 통합 협업 플랫폼"
description = "팀 워크스페이스 관리, 실시간 협업 문서, 역할별 권한, 초대·알림, 실시간 사용자 제어를 제공하는 협업 플랫폼입니다."
cover = { image = "images/projects/fileinnout/FileinNout.png" }
live_demo = "https://www.fileinnout.kro.kr/"
repository = "https://github.com/Lumisia/FileinNOut"
architecture_image = "images/projects/fileinnout/fileinnout.system_architecture.png"

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

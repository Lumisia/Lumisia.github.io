+++
title = "AI Handoff"
draft = true
date = 2026-06-19
weight = 3
slug = "ai-handoff"
category = "Developer Tools · 개인 프로젝트"
summary = "Claude Code와 Codex가 사용량 한도에 닿기 전에 작업 맥락을 서로 넘겨주는 로컬 우선 핸드오프 도구"
description = "AI Handoff는 한쪽 에이전트가 5시간 사용량 한도에 가까워지면 현재 목표·브랜치·변경 파일·메모·남은 작업을 로컬 캡슐로 저장하고, 다른 에이전트가 같은 맥락에서 이어받게 하는 도구입니다. Rust 워크스페이스로 CLI·TUI·데몬·IPC·사용량 집계를 나누고 Tauri 데스크톱 앱을 함께 제공하며, 캡슐과 훅 메시지는 전부 로컬 파일에 머무릅니다."
# TODO: 대표 이미지를 assets/images/projects/ai-handoff/ai-handoff.png 로 넣기
cover = { image = "images/projects/ai-handoff/ai-handoff.png", fit = "contain" }
repository = "https://github.com/Lumisia/aho__ai-handoff"
# TODO: 릴리스/문서 링크를 live_demo 로 쓸지 결정 (없으면 줄 삭제)
live_demo = "https://github.com/Lumisia/aho__ai-handoff/releases"
# TODO: 아키텍처 다이어그램 (crates ↔ daemon ↔ IPC ↔ hooks) 준비되면 경로 지정
architecture_image = "images/projects/ai-handoff/ai-handoff-architecture.png"
period = "2026.06 ~ (개인 프로젝트, 진행 중)"
team = "개인 1인"
responsibility = "설계 · 구현 · 배포 전담"

[[highlights]]
value = "Rust 크레이트 6종"
label = "CLI·TUI·데몬 단일 워크스페이스"

[[highlights]]
value = "설치 경로 3-OS"
label = "Homebrew · PowerShell · shell"

features_intro = """
에이전트 하나가 한도에 닿는 순간을 **작업 중단**이 아니라 **인수인계 시점**으로 바꾸는 것이 목표였습니다. 훅으로 사용량을 감지하고, 캡슐로 맥락을 직렬화하고, 반대편 에이전트가 그것을 소비하는 전 구간을 직접 설계했습니다.
"""

[[contributions]]
title = "Core / CLI"
items = [
  "핸드오프 캡슐 스키마 설계 (목표·브랜치·변경 파일·메모·잔여 작업) 및 무결성 검증",
  "`handoff` / `checkpoint` / `config` / `doctor` 서브커맨드 체계 구성 (clap)",
  "설치 상태·훅·데몬·IPC·캡슐 건강 상태를 한 번에 진단하는 doctor 파이프라인",
  "rust-i18n 기반 한국어·영어·일본어 로케일 분리",
]

[[contributions]]
title = "Daemon / IPC"
items = [
  "훅과 데몬 사이 로컬 메시지 큐(IPC) 설계 — 워크스페이스를 외부로 올리지 않음",
  "Claude Code / Codex 양쪽 훅 이벤트(session-start 등) 수신 경로 통합",
  "OS별 상태 디렉터리 분기 (%USERPROFILE%, Application Support, XDG_STATE_HOME)",
  "로컬 로그를 읽어 토큰·비용을 추정하는 usage 크레이트 구성",
]

[[contributions]]
title = "Distribution"
items = [
  "Homebrew tap(CLI·Cask), PowerShell, shell 설치 스크립트 3종 유지",
  "GitHub Releases 기반 버전 고정 설치와 .sha256 검증 안내",
  "Tauri 데스크톱 앱과 ratatui TUI를 같은 코어 위에 얹는 구조",
]

# ---------------------------------------------------------------------------
# TODO: 아래 features 는 스크린샷을 넣고 body 를 확정해야 합니다.
#       이미지 경로: assets/images/projects/ai-handoff/*.png
# ---------------------------------------------------------------------------

[[features]]
heading = "핸드오프 캡슐"
image = "images/projects/ai-handoff/capsule.png"
image_alt = "AI Handoff 캡슐 생성 화면"
body = """
- 한도에 가까워지면 현재 목표·브랜치·변경 파일·메모·잔여 작업을 하나의 캡슐로 저장합니다.
- 반대편 에이전트는 캡슐을 소비해 같은 맥락에서 작업을 이어받습니다.
- TODO: 실제 캡슐 구조와 소비 흐름을 화면 기준으로 보강.
"""

[[features]]
heading = "TUI · 데스크톱"
image = "images/projects/ai-handoff/tui.png"
image_alt = "AI Handoff TUI 대시보드"
body = """
- ratatui 기반 TUI와 Tauri 데스크톱 앱이 같은 코어 크레이트를 공유합니다.
- 계정 전환처럼 민감한 동작은 에이전트 스킬이 아니라 로컬 CLI/TUI/GUI에만 둡니다.
- TODO: 화면별로 무엇을 보여주는지 구체화.
"""

[[features]]
heading = "doctor · 사용량"
image = "images/projects/ai-handoff/doctor.png"
image_alt = "ai-handoff doctor 진단 결과"
body = """
- `ai-handoff doctor`가 설치 상태·훅 신뢰 여부·데몬·IPC·캡슐 건강을 한 번에 점검합니다.
- `ai-handoff usage`는 로컬 로그만 읽어 토큰·비용을 추정합니다(공식 청구서가 아님을 명시).
- TODO: 진단 실패 케이스와 복구 안내 흐름 추가.
"""

# ---------------------------------------------------------------------------
# TODO: 트러블 슈팅은 실제 겪은 문제로 채워야 합니다.
#       각 항목은 problem / cause / solution / result 4단 구조를 유지합니다.
#       (다른 프로젝트 페이지와 동일한 서술 순서)
# ---------------------------------------------------------------------------

[[troubleshooting]]
title = "1. TODO — 제목 (예: 훅 이벤트 유실 / 중복 캡슐 생성)"
problem = """
TODO: 어떤 상황에서 무엇이 잘못 동작했는지. 재현 조건과 관측된 증상을 먼저 씁니다.
(스크린샷·로그가 있으면 `![설명](images/projects/ai-handoff/xxx.png "캡션")` 형태로 삽입)
"""
cause = """
TODO: 왜 그랬는지. 대안을 비교했다면 아래 표 형식을 씁니다.

| 방식 | 판단 |
|---|---|
| A | ... |
| B | ... |
"""
solution = """
TODO: 어떻게 고쳤는지. 핵심 코드는 ```rust 블록으로 넣습니다.
"""
result = """
TODO: 무엇이 달라졌는지. 가능하면 수치 또는 회귀 테스트 이름으로 고정합니다.
"""

[[troubleshooting]]
title = "2. TODO — 제목 (예: OS별 상태 디렉터리·경로 분기)"
problem = """
TODO
"""
cause = """
TODO
"""
solution = """
TODO
"""
result = """
TODO
"""
+++

<section class="proj-tech-section">
<h2 class="proj-sec-h">기술 스택</h2>

<div class="proj-tech-group">
<p class="proj-tech-cat">Core</p>
<div class="proj-tech-grid">
<span class="stack"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rust/rust-original.svg" alt="Rust 아이콘">Rust 2021</span>
<span class="stack"><span class="icon-badge">Cl</span>clap</span>
<span class="stack"><span class="icon-badge">Sd</span>serde</span>
<span class="stack"><span class="icon-badge">To</span>tokio · tracing</span>
<span class="stack"><span class="icon-badge">i18</span>rust-i18n</span>
</div>
</div>

<div class="proj-tech-group">
<p class="proj-tech-cat">Interface</p>
<div class="proj-tech-grid">
<span class="stack"><span class="icon-badge">Ra</span>ratatui · crossterm</span>
<span class="stack"><span class="icon-badge">Ta</span>Tauri</span>
<span class="stack"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" alt="TypeScript 아이콘">TypeScript</span>
</div>
</div>

<div class="proj-tech-group">
<p class="proj-tech-cat">Distribution</p>
<div class="proj-tech-grid">
<span class="stack"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" alt="GitHub Actions 아이콘">GitHub Actions</span>
<span class="stack"><span class="icon-badge">Br</span>Homebrew Tap</span>
<span class="stack"><span class="icon-badge">Ps</span>PowerShell · NSIS</span>
<span class="stack"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bash/bash-original.svg" alt="Shell 아이콘">Shell Installer</span>
</div>
</div>

</section>

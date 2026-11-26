+++
title = "AI-handoff"
draft = false
date = 2026-06-19
weight = 4
slug = "ai-handoff"
project_group = "AI"
category = "Developer Tools · 개인 프로젝트"
summary = "Claude Code와 Codex 사이에서 작업 목표와 진행 상황을 로컬 캡슐로 넘겨주는 인계 도구"
description = "AI-handoff는 사용량 한도에 가까워지거나 작업 도구를 바꿀 때 목표·완료한 일·남은 작업을 로컬 캡슐로 저장하고, 다른 에이전트가 같은 프로젝트에서 이어받게 하는 도구입니다."
notice = "설계는 직접 했지만 AI(Claude Code · Codex)로 구현한 프로젝트입니다."
cover = { image = "images/projects/ai-handoff/cover.webp", fit = "cover" }
repository = "https://github.com/Lumisia/aho__ai-handoff"
live_demo = "https://github.com/Lumisia/aho__ai-handoff/releases"
live_demo_label = "Releases"
architecture_image = "images/projects/ai-handoff/ai-handoff-architecture.png"
period = "2026.06.19 ~ 진행 중 (최신 v2.3.0)"
team = "개인 프로젝트"
contributions_title = "내 역할"

[[highlights]]
value = "62.2초 → 4.8초"
label = "Windows 훅의 데몬 첫 기동"

[[highlights]]
value = "3 OS · x64 / ARM64"
label = "릴리스 패키지 8종"

features_intro = """
에이전트가 사용량 한도에 닿거나 작업 도구를 바꿀 때 목표와 진행 상황을 다시 설명하지 않도록, 저장(체크포인트)과 인계(handoff)를 나눈 로컬 인계 흐름을 만들었습니다. 구조와 동작 규칙은 직접 정했고, 구현은 Claude Code와 Codex에 맡긴 뒤 결과를 직접 검증해 배포했습니다.
"""

[[contributions]]
title = "설계"
items = [
  "저장(체크포인트)과 인계(handoff)를 나누고, 에이전트 훅 → 로컬 파일 IPC → 로컬 데몬 → 캡슐 저장으로 이어지는 구조 설계",
  "별도 서버 없이 내 컴퓨터 안에서만 동작하도록 범위를 정하고, 캡슐에 담을 항목(목표·완료한 일·남은 일·다음 작업 지시·Git 상태) 결정",
  "CLI·TUI·GUI가 같은 Rust 크레이트를 쓰도록 나누고, Windows·macOS·Linux × x64·ARM64 배포 범위 결정",
]

[[contributions]]
title = "동작 규칙 결정"
items = [
  "5시간 한도 질문은 네 / 아니오 / 기타만 보여 주고, 어떤 답을 골라도 한도가 초기화되기 전에는 다시 묻지 않도록 결정",
  "캡슐은 다른 세션에서 handoff로 받을 때만 가져가고, 캡슐을 저장한 세션이 다시 가져가지 않도록 결정",
  "handoff-checkpoint나 5시간 한도로 저장할 때 캡슐 위치를 프로젝트 단위로 정해 Claude와 Codex가 같은 캡슐을 확인하게 하고, 찾지 못하면 프로젝트 이름이 붙은 전체 캡슐 목록(최신순 색인)에서 어느 프로젝트에 무엇이 저장됐는지 바로 찾을 수 있게 함",
  "캡슐 내용을 직접 고칠 수 있게 하고, JSON과 MD 두 형식으로 저장하고 읽을 수 있게 함",
]

[[contributions]]
title = "문제 발견 · 검증 · 릴리스"
full = true
items = [
  "직접 쓰다가 훅 중복 등록, 비활성 계정 토큰 만료, 캡슐 질문 반복 같은 문제를 찾으면 에이전트에게 문제 검증과 원인 분석을 맡김",
  "수정 뒤 실제 Claude Code·Codex에서 직접 테스트해, 고친 문제가 사라졌는지와 다른 문제가 새로 생기지 않았는지 검수",
  "버전과 릴리스 범위를 정하고, 변경을 단계별 커밋으로 나눠 수정 내용을 확인하기 쉽게 한 뒤, CI·릴리스 빌드·배포 파일 체크섬을 확인하고 공개",
]

ai_usage_intro = "Claude Code와 Codex를 함께 쓰고, 한쪽 사용량이 한도에 가까워지면 이 도구로 만든 캡슐로 다른 쪽에 작업을 넘겨 이어서 진행했습니다."

[[ai_usage]]
title = "Claude Code에 지시한 일"
logo = "https://cdn.simpleicons.org/claude"
items = [
  "초기 구현: Node.js로 만든 v1을 Rust 워크스페이스로 다시 만드는 설계서와 테스트 단위 작업 계획을 쓰게 하고, 훅·IPC·데몬·CLI·설치기 구현과 테스트를 맡김",
  "원인 분석과 수정: 계정 전환 팝업 중복·토큰 만료(v2.2.5·v2.2.6), 다른 세션에서 캡슐을 못 받던 문제, 설정 재저장 후 훅 중복 등록(v2.2.7)",
  "수정이 끝나면 Codex 검수를 받게 하고, 지적 사항을 반영한 뒤 릴리스",
]

[[ai_usage]]
title = "Codex에 지시한 일"
logo = "https://cdn.jsdelivr.net/npm/simple-icons@15.10.0/icons/openai.svg"
items = [
  "검수: Claude가 만든 수정에서 반례와 빠진 경우 찾기 — 훅 판정 조건이 너무 넓다는 지적으로 조건을 좁혔고, 백업 정리에서 심볼릭 링크가 보존 자리를 차지하는 문제를 찾아 고침",
  "구현: 원인 분석 문서를 넘겨 남은 결함을 테스트부터 작성해 고치게 하고, 스킬 중복 수정과 리셋 크레딧 조회·캡슐 관리(v2.2.8), 캡슐 질문 반복 수정(v2.3.0)을 맡김",
  "검증: 테스트용 프로젝트와 가짜 사용량으로 검증 채팅을 만들어 네·아니오·기타 경로를 확인하고, 릴리스 배포 파일 체크섬 확인",
]

[[ai_usage]]
title = "두 도구 공통 규칙"
full = true
items = [
  "두 도구의 코드 스타일이 달라, 공통 지침(docs/agent-workflow.md) 하나를 두고 AGENTS.md와 CLAUDE.md가 같은 지침을 읽게 함",
  "역할을 나누지 않고 둘 다 구현과 검토를 하되, 버그는 재현 조건부터 확인하고 수정 전 실패하는 테스트로 남기도록 함",
  "캡슐 호환성·설정 보존·Windows 권한·인증 정보 처리 같은 주의사항과, 모델 의견만으로 커밋·배포를 막지 않는 검토 기준을 지침에 정리",
]

[[features]]
heading = "캡슐로 작업 넘기기"
image = "images/projects/ai-handoff/gui-capsules.png"
image_alt = "AI-handoff GUI 캡슐 화면 (가상 데이터)"
body = """
- 현재 에이전트에서 `handoff-checkpoint`로 목표·진행 상황·남은 일을 저장하고, 다음 에이전트는 같은 프로젝트에서 `handoff`로 받아 이어서 작업합니다.
- 캡슐은 에이전트와 프로젝트별로 저장되며, GUI·TUI의 캡슐 화면에서 내용을 확인하고 편집할 수 있습니다.
- 받는 에이전트에게 실제 브랜치와 변경 파일을 다시 확인하도록 안내해, 메모와 저장소 상태가 어긋나지 않게 했습니다.
"""

[[features]]
heading = "사용량 기준 체크포인트"
image = "images/projects/ai-handoff/gui-overview.png"
image_alt = "AI-handoff GUI 개요 화면 (가상 데이터)"
body = """
- 5시간 사용량이 기준(기본 80%)에 닿으면 현재 에이전트에서 캡슐을 저장할지 네 / 아니오 / 기타로 묻습니다. 기준과 자동 작성 방식은 설정에서 바꿀 수 있습니다.
- 로컬 로그에서 계산한 토큰·비용은 추정치로, 제공자에게 조회한 한도와 출처를 나눠 보여 줍니다.
"""

[[features]]
heading = "터미널 화면과 진단"
image = "images/projects/ai-handoff/tui-overview.png"
image_alt = "AI-handoff TUI 개요 화면 (가상 데이터)"
body = """
- 터미널에서 `ai-handoff`를 실행하면 개요·캡슐·사용량·계정·연동·설정 6개 탭의 TUI가 열립니다.
- `ai-handoff doctor`가 설치 상태, 훅 신뢰 여부, 데몬 연결, IPC 폴더 권한을 점검하고 복구 방법을 안내합니다.
"""

[[troubleshooting]]
title = "1. Node.js 플러그인을 Rust 네이티브 훅과 샌드박스 밖 데몬 구조로 다시 만들었습니다."
kind = "설계 판단 · 구조 전환"
architecture_image = "images/projects/ai-handoff/rust-transition-problem.png"
architecture_label = "문제 상황"
architecture_alt = "v1 Node.js 훅이 Codex 샌드박스에서 node 재실행과 작업 폴더 밖 저장 두 곳에서 EPERM으로 막힌 구조"
cause_label = "판단 배경"
solution_label = "검토한 선택지와 결정"
evidence = [
  { label = "수정 전 v1: 훅이 node를 한 번 더 실행", url = "https://github.com/Lumisia/aho__ai-handoff/blob/560440ef3bb79bf0f1f99aa5e50b89d3e579f32f/scripts/run-hook.mjs#L63-L73" },
  { label = "v2 설계서: 결정 요약", url = "https://github.com/Lumisia/aho__ai-handoff/blob/5c19dcf282a52feafe17cf409e85bcb61b852a65/docs/superpowers/specs/2026-06-25-ai-handoff-v2-rust-tauri-replatform-design.md#L9-L48" },
  { label = "v2 훅: IPC로 요청만 전달", url = "https://github.com/Lumisia/aho__ai-handoff/blob/5c19dcf282a52feafe17cf409e85bcb61b852a65/crates/ai-handoff-cli/src/commands/hook.rs#L18-L63" },
  { label = "1단계 완료 커밋", url = "https://github.com/Lumisia/aho__ai-handoff/commit/5c19dcf282a52feafe17cf409e85bcb61b852a65" },
  { label = "실제 설치 환경 검증 기록", url = "https://github.com/Lumisia/aho__ai-handoff/blob/2d45c4b2dbd14b1461ca751284ffd880ccaa45e2/docs/v2/mvp-acceptance.md" },
  { label = "로그인 자동 실행 기본 끄기", url = "https://github.com/Lumisia/aho__ai-handoff/commit/3929d6f10a57b2c9de978b877d6326f64f8b9746" },
  { label = "훅 호출 때만 데몬 시작 (v2.2.1)", url = "https://github.com/Lumisia/aho__ai-handoff/blob/bfba7efdda189f9685c3bfb98f18507ada0f2e9f/crates/ai-handoff-cli/src/daemon_supply.rs#L33-L62" },
  { label = "응답 없으면 데몬을 띄우고 다시 요청", url = "https://github.com/Lumisia/aho__ai-handoff/blob/bfba7efdda189f9685c3bfb98f18507ada0f2e9f/crates/ai-handoff-cli/src/daemon_supply.rs#L203-L222" },
  { label = "요청이 없으면 스스로 종료 (기본 60초)", url = "https://github.com/Lumisia/aho__ai-handoff/blob/2af952bc89e47132e1ec0559d3abbdae3b7e23ef/crates/ai-handoff-daemon/src/lib.rs#L57-L63" },
]
cause = '''
1. v1은 Node.js 플러그인으로 시작해서, Claude Code에서는 동작했지만 Codex의 경우 자동 훅에서 실패하는 문제가 생겼었습니다.
2. Codex 샌드박스가 두 겹으로 막고 있었습니다. 훅 래퍼(`run-hook.mjs`)가 `node`를 한 번 더 실행하는 순간 `EPERM`이 났고, 이를 넘어가도 Stop 훅이 작업 폴더 밖 저장소에 쓰다가 다시 `EPERM`으로 실패했습니다.
3. 저장소를 Codex 쓰기 허용 경로에 넣는 방법은 두 번째 문제만 풀었습니다. 다른 사용자도 설치만 하면 쓸 수 있는 범용 구조가 필요했습니다.
'''
solution = '''
- 먼저 원칙을 정했습니다. **훅은 저장소에 쓰지 않고, 샌드박스 밖 데몬이 씁니다.** 훅은 쓰기 허용 경로에 추가한 IPC 폴더에만 요청을 남깁니다.
- 선택지는 세 가지였습니다. ① v1 안에서 훅 래퍼와 저장 경로만 고치기, ② Node로 샌드박스 밖 데몬만 추가하기, ③ Rust로 전체를 다시 만들기. AI는 ②가 ③보다 훨씬 적은 노력(약 5%)으로 같은 구조를 얻는다고 제안했습니다.
- 다른 언어와 비교한 끝에 ③을 골랐습니다. Rust는 실행 파일이 가볍고 메모리 효율이 좋아, 훅처럼 자주 실행되는 프로그램과 계속 켜 두는 데몬에 맞았습니다. 단일 네이티브 실행 파일이라 훅이 `node`를 다시 띄울 일도 없고, 같은 Rust 코어를 CLI·TUI·데스크톱 GUI가 함께 쓸 수 있습니다.
- 순서는 "EPERM이 실제로 풀리는지"를 먼저 증명하도록 잡았습니다. 훅·IPC·데몬 최소 기능(1단계) → 설치기 → 기능 이전 → GUI 순으로 진행하고, 단계마다 Codex 검수를 받았습니다. 프로젝트 지문은 v1 테스트를 기준으로 같은 입력에 같은 결과가 나오는지 맞추며 옮겼습니다.

**실제 코드(발췌): v1 훅은 node를 다시 실행했습니다**

```js
const child = spawnSync(process.execPath, [
  join(invocation.pluginRoot, 'core', 'cli.mjs'), invocation.command, '--agent', invocation.agent,
], { input: raw, encoding: 'utf8', env });
```

**실제 코드(발췌): v2 훅은 IPC로 요청만 보내고 결과를 출력합니다**

```rust
let resp = send(&req, &ClientConfig::default());
for warning in &resp.warnings {
    eprintln!("[ai-handoff] {warning}");
}
let text = serde_json::to_string(&resp.hook_stdout).unwrap_or_else(|_| "{}".to_string());
let _ = writeln!(out, "{text}");
```
'''
followup_image = "images/projects/ai-handoff/rust-daemon-problem.png"
followup_image_label = "전환 직후 문제 상황"
followup_image_alt = "Rust 전환 직후 데몬이 꺼져 있으면 훅의 IPC 요청에 응답이 없어 캡슐이 저장되지 않던 구조"
followup_label = "바꾸면서 생긴 문제"
followup = '''
1. 전환 직후에는 데몬을 따로 켜 둬야 했습니다. 데몬이 꺼져 있으면 훅과 저장 명령이 `daemon_unavailable`로 끝나 캡슐이 저장되지 않았습니다.
2. Windows 로그인 때 데몬을 자동으로 켜 두는 방법도 있었지만, 늘 켜져 있는 프로그램이 되므로 기본값은 끄도록 했습니다.
'''
followup_solution_label = "해결 과정"
followup_solution = '''
- 훅이 호출될 때만 데몬을 띄우도록 바꿨습니다. 훅이 보낸 요청에 데몬이 응답하지 않으면 데몬을 띄운 뒤 같은 요청을 한 번 더 보냅니다. Windows에서는 작업 스케줄러에 등록한 호스트가 샌드박스 밖에서 데몬을 시작합니다(v2.2.1).
- 데몬은 요청이 없는 시간이 설정값(기본 60초)을 넘으면 스스로 종료합니다.
- 지금도 데몬이 꺼진 상태에서 저장을 요청하면 데몬이 바로 떠서 캡슐을 저장하고, 1분 동안 요청이 없으면 스스로 종료하는 것을 확인했습니다.

**실제 코드(발췌): 데몬이 응답하지 않으면 띄운 뒤 같은 요청을 다시 보냄**

```rust
let response = send_request(req);
if !autostart_daemon || !daemon_unavailable(&response) {
    return response;
}

let outcome = ensure();
if outcome.ready {
    return send_request(req);
}
supply_failure_response(req, outcome)
```

**실제 코드(발췌): 요청이 없으면 정해진 시간 뒤 스스로 종료**

```rust
let cfg = ai_handoff_core::config::load();
ai_handoff_ipc::server::serve_until_idle(
    &router,
    Duration::from_millis(25),
    Duration::from_secs(cfg.daemon.idle_timeout_seconds()),
);
log_daemon("daemon idle exit");
```
'''
result = '''
6월 25일 1단계를 마쳐, 훅 → 파일 IPC → 샌드박스 밖 데몬 → 저장으로 이어지는 경로에서 `EPERM` 없이 캡슐이 저장되고 다른 에이전트의 세션 시작에 전달되는 것을 확인했습니다. 다음 날 실제 설치 환경에서도 같은 경로를 재현했고, 6월 29일 v2.0.1에서 Node v1 코드를 모두 대체했습니다. 이후 남은 샌드박스 문제는 5번 항목에서 이어서 다뤘습니다.
'''

[[troubleshooting]]
title = "2. 5시간 한도 질문에 답했는데도 같은 세션에서 계속 다시 물었습니다."
kind = "문제 해결 · 실사용 버그"
architecture_image = "images/projects/ai-handoff/repeat-question.png"
architecture_label = "문제 상황"
architecture_alt = "아니오라고 답한 뒤에도 같은 캡슐 저장 질문이 다시 표시된 Claude Code 화면"
evidence = [
  { label = "질문 상태를 한도 구간 단위로 저장", url = "https://github.com/Lumisia/aho__ai-handoff/blob/c16d8f677add44a4fc58dca6ab8ce45d19c532ef/crates/ai-handoff-daemon/src/checkpoint_episode.rs#L123-L198" },
  { label = "같은 턴의 도구 이벤트 구분", url = "https://github.com/Lumisia/aho__ai-handoff/blob/c16d8f677add44a4fc58dca6ab8ce45d19c532ef/crates/ai-handoff-daemon/src/dedupe.rs#L7-L36" },
  { label = "재시작·초기화 시각 테스트", url = "https://github.com/Lumisia/aho__ai-handoff/blob/c16d8f677add44a4fc58dca6ab8ce45d19c532ef/crates/ai-handoff-daemon/src/checkpoint_episode.rs#L498-L543" },
  { label = "네·아니오·기타 응답 테스트", url = "https://github.com/Lumisia/aho__ai-handoff/blob/c16d8f677add44a4fc58dca6ab8ce45d19c532ef/crates/ai-handoff-daemon/src/router.rs#L3246-L3330" },
  { label = "수정 커밋 (v2.2.9)", url = "https://github.com/Lumisia/aho__ai-handoff/commit/c16d8f677add44a4fc58dca6ab8ce45d19c532ef" },
]
cause = '''
1. 5시간 사용량이 기준을 넘으면 훅이 "캡슐을 저장하시겠습니까?"를 묻는데, '아니오'로 답한 뒤에도 같은 세션에서 같은 질문이 다시 나왔습니다.
2. 데몬은 질문을 낸 뒤 30초 동안만 다시 묻지 않았습니다. 그 사이에 답을 기록하지 못하면, 한도가 그대로여도 30초 뒤 다음 훅에서 다시 물었습니다.
3. 답이 기록되지 않는 경로가 있었습니다. 한 턴에 도구가 여러 번 끝나면 같은 턴의 훅을 중복으로 보고 버려, 답이 담긴 질문 도구 이벤트가 사라질 수 있었습니다. Codex의 질문 도구 응답도 읽지 못했습니다.
4. 이미 초기화된 이전 5시간 구간의 사용량 기록도 다시 질문을 만들 수 있었습니다.
'''
solution = '''
- 질문을 보내기 전에 에이전트·프로젝트·세션·한도 초기화 시각 단위로 '질문함' 상태를 파일에 저장하고, 답했든 닫았든 응답이 없든 같은 구간에서는 다시 묻지 않게 했습니다. 데몬이 재시작돼도 유지됩니다.
- 제공자가 초기화 시각을 알려 주지 않으면 첫 질문부터 5시간으로 잡고, 나중에 실제 시각을 받으면 고칩니다.
- 같은 턴의 도구 이벤트는 도구 실행 ID로 구분해, 답이 담긴 이벤트를 버리지 않게 했습니다.
- Claude는 해당 질문 문구, Codex는 해당 질문 ID에 연결된 답만 읽어 관계없는 대화를 답으로 오인하지 않게 했고, 초기화가 지난 사용량 기록은 제외했습니다.

**실제 테스트(발췌): 30초가 지나고 데몬이 다시 떠도 초기화 전에는 묻지 않음**

```rust
let (first, fired) = offer(&store, 100, None);
assert!(fired);
let reopened = EpisodeStore::new(home.path());
let (same, fired) = offer(&reopened, 35_000, Some(50_000));
assert!(!fired);
assert_eq!(first.episode_id, same.episode_id);
assert!(!offer(&reopened, 49_999, None).1);
let (next, fired) = offer(&reopened, 50_000, Some(75_000));
assert!(fired);
```
'''
result = '''
실제 Claude Code·Codex 데스크톱에서 네·아니오·기타를 각각 골라 본 뒤 이어지는 작업에서 다시 묻지 않는 것을 확인했고, '네'를 고른 경우에만 캡슐이 저장됐습니다. 수정은 v2.2.9에 들어갔고, Codex 질문 표시를 두 줄로 줄인 후속 수정과 함께 v2.3.0으로 배포했습니다.
'''

[[troubleshooting]]
title = "3. Codex에서 AI-handoff 스킬이 모두 두 개씩 보였습니다."
kind = "문제 해결 · 설치 안정성"
architecture_image = "images/projects/ai-handoff/skill-duplicate-problem.png"
architecture_label = "문제 상황"
architecture_alt = "Codex 스킬 목록에서 Handoff·Handoff Config·Handoff Doctor·Handoff Checkpoint가 각각 두 개씩 표시된 화면 (옛 2.2.4 묶음 재현)"
evidence = [
  { label = "수정 전: 한 단계 아래만 확인하던 정리", url = "https://github.com/Lumisia/aho__ai-handoff/blob/a272543566b07425ade4e6dd6299daed4cd5dd1b/crates/ai-handoff-core/src/install/plugin.rs#L218-L234" },
  { label = "옛 스킬 묶음 판정", url = "https://github.com/Lumisia/aho__ai-handoff/blob/289104159a4b94e0bd0e7d9feecf00299e50825c/crates/ai-handoff-core/src/install/legacy_skills.rs#L58-L96" },
  { label = "검색 범위 밖으로 보관", url = "https://github.com/Lumisia/aho__ai-handoff/blob/289104159a4b94e0bd0e7d9feecf00299e50825c/crates/ai-handoff-core/src/install/legacy_skills.rs#L126-L152" },
  { label = "새 플러그인 등록 뒤 보관", url = "https://github.com/Lumisia/aho__ai-handoff/blob/289104159a4b94e0bd0e7d9feecf00299e50825c/crates/ai-handoff-core/src/install/mod.rs#L376-L397" },
  { label = "보관·보존 통합 테스트", url = "https://github.com/Lumisia/aho__ai-handoff/blob/289104159a4b94e0bd0e7d9feecf00299e50825c/crates/ai-handoff-core/tests/legacy_codex_skills.rs#L40-L80" },
  { label = "수정 커밋 (v2.2.8)", url = "https://github.com/Lumisia/aho__ai-handoff/commit/289104159a4b94e0bd0e7d9feecf00299e50825c" },
]
cause = '''
1. handoff, checkpoint, config, doctor 총 네 개의 스킬이 중복으로 두 개씩 보였습니다.
2. 예전 2.2.4 버전은 Codex 스킬을 `~/.agents/skills/ai-handoff/skills/<스킬>` 묶음으로 설치했고, 이후 버전은 Codex 플러그인(`~/.agents/plugins/ai-handoff`)으로 설치합니다. 업데이트해도 옛 묶음은 그대로 남았습니다.
3. 설치기의 옛 스킬 정리는 `~/.agents/skills/handoff`처럼 한 단계 아래만 확인해서, 두 단계 아래에 있는 옛 묶음을 놓쳤습니다. Codex는 이름이 같은 스킬을 합치지 않고 둘 다 보여 줍니다.
4. 옛 복사본에는 사용자가 고친 내용도 있어서, 찾았다고 바로 지울 수도 없었습니다.
'''
solution = '''
- 이름이 `ai-handoff`인 `plugin.json`과 알려진 스킬 파일이 함께 있을 때만 옛 묶음으로 인정하고, 그 밖의 폴더는 건드리지 않습니다.
- 새 플러그인 등록이 끝난 뒤에만 옛 묶음을 통째로 스킬 검색 범위 밖(`~/.agents/legacy-skill-backups/`)으로 옮깁니다. 사용자가 고친 파일과 추가 파일은 그대로 남습니다.
- 링크·정션은 따라가지 않고, 보관 위치가 막혀 있으면 설정을 쓰기 전에 설치를 멈춥니다. Claude 쪽 스킬 묶음은 옮기지 않고, `doctor`가 옛 묶음 상태를 알려 줍니다.

**실제 코드(발췌): 확인된 옛 묶음만 새 보관 폴더로 이동**

```rust
/// Move only the recognized Codex residue, keeping all modified/extra files.
/// The caller must install the replacement plugin successfully first.
pub fn archive(skills_root: &Path) -> io::Result<Option<PathBuf>> {
    let legacy = inspect(skills_root);
    if legacy.status != "recognized" {
        return Ok(None);
    }
    let root = skills_root.parent().unwrap().join("legacy-skill-backups");
    if !archive_root_exists(&root)? {
        fs::create_dir(&root)?;
    }
    // Reserve a unique container: rename never replaces an existing archive.
    let container = root.join(format!("ai-handoff-{}", uuid::Uuid::new_v4()));
    fs::create_dir(&container)?;
    let destination = container.join("ai-handoff");
```
'''
result = '''
옛 묶음을 치운 뒤 Codex 스킬 목록이 스킬마다 하나로 돌아온 것을 확인했고, 수정은 v2.2.8에 반영했습니다. 보관 후 재설치, 고친 내용 보존, 링크 거부, 보관 위치 충돌, Claude 묶음 보호 등 11개 경우를 통합 테스트로 고정했습니다.
'''

[[troubleshooting]]
title = "4. 설정 파일이 다시 저장되면서 훅이 중복 등록되던 문제를 고쳤습니다."
kind = "문제 해결 · 설치 안정성"
architecture_image = "images/projects/ai-handoff/hook-duplicate-problem.png"
architecture_label = "문제 상황"
architecture_alt = "수정 직전 실제 settings.json 백업: PostToolUse·SessionStart·Stop·UserPromptSubmit 이벤트마다 같은 훅이 3개씩 등록된 상태"
evidence = [
  { label = "실행 명령으로 훅 소유권 판정", url = "https://github.com/Lumisia/aho__ai-handoff/blob/dbe3e9049d7c90df0c0b7b8c83e43cdc0fb2da3b/crates/ai-handoff-core/src/install/managed_hook.rs#L78-L93" },
  { label = "소유권 판정 단위 테스트", url = "https://github.com/Lumisia/aho__ai-handoff/blob/dbe3e9049d7c90df0c0b7b8c83e43cdc0fb2da3b/crates/ai-handoff-core/src/install/managed_hook.rs#L133-L265" },
  { label = "수정 커밋", url = "https://github.com/Lumisia/aho__ai-handoff/commit/dbe3e9049d7c90df0c0b7b8c83e43cdc0fb2da3b" },
]
cause = '''
1. 새 버전을 설치할 때마다 Claude Code 훅이 1개 → 2개 → 3개씩 중복으로 늘어났습니다.
2. 설치기는 훅 항목에 붙인 `_aiHandoff` 표시로 자기 훅을 구분했는데, Claude Code가 settings.json을 다시 저장하면서 스키마에 없는 이 키를 지웠습니다.
3. 표시가 사라지자 설치는 자기 훅을 다른 훅으로 보고 복사본을 추가했고, 제거는 표시 없는 항목을 남겼으며, 진단은 훅이 살아 있는데도 없다고 표시해 재설치를 유도했습니다.
'''
solution = '''
- 소유권 판정을 한 곳(`managed_hook`)으로 모으고, 표시가 없어도 실행 명령으로 판정하도록 바꿨습니다.
- 실행 파일 이름이 정확히 `ai-handoff`이고, 첫 인자가 `hook`이며, `--agent <에이전트>`가 함께 있을 때만 자기 훅으로 인정했습니다. 사용자가 직접 등록한 훅이나 `ai-handoff-host.exe` 같은 다른 실행 파일은 건드리지 않습니다.
- Claude의 배열 형식과 Codex의 문자열 형식을 모두 처리하고, 설치·제거·진단·중복 탐지가 같은 판정을 쓰도록 바꿨습니다.

**실제 코드: 실행 명령으로 자기 훅 판정**

```rust
fn tokens_are_managed(tokens: &[String], agent: &str) -> bool {
    let Some(program) = tokens.first() else {
        return false;
    };
    if !is_ai_handoff_exe(program) {
        return false;
    }
    let rest = &tokens[1..];
    if rest.first().map(String::as_str) != Some("hook") {
        return false;
    }
    rest.windows(2)
        .any(|pair| pair[0] == "--agent" && pair[1] == agent)
}
```
'''
result = '''
표시가 지워진 설정에서도 재설치할 때 기존 훅을 자기 것으로 인식해 복사본이 늘지 않게 됐고, 2.2.7 릴리스에 설치 백업 누적 차단과 함께 반영했습니다. 표시가 없는 훅, 에이전트가 다른 훅, 다른 실행 파일, 경로·대소문자 차이를 단위 테스트로 고정했습니다.
'''

[[troubleshooting]]
title = "5. Codex 샌드박스 안의 훅이 작업 폴더 밖의 데몬과 저장소를 쓰지 못해, 데몬을 띄우는 방식까지 바꿨습니다."
kind = "문제 해결 · 운영체제 권한 · 실행 구조 변경"
architecture_image = "images/projects/ai-handoff/ipc-acl-problem.png"
architecture_label = "문제 상황"
architecture_alt = "데몬이 실행 중인데도 IPC requests·responses 폴더 쓰기가 액세스 거부로 실패한 Codex 실행 화면 (더미 데이터 재현)"
evidence = [
  { label = "IPC 하위 폴더 권한 상속 (v2.0.10)", url = "https://github.com/Lumisia/aho__ai-handoff/blob/6db01a7db7afbfc5ac5c27f6579a8d5c8def4dcd/crates/ai-handoff-core/src/secure_fs.rs#L24-L56" },
  { label = "권한 복구 테스트", url = "https://github.com/Lumisia/aho__ai-handoff/blob/6db01a7db7afbfc5ac5c27f6579a8d5c8def4dcd/crates/ai-handoff-core/tests/secure_fs.rs#L108-L153" },
  { label = "저장소 쓰기 사전 점검 (v2.1.7)", url = "https://github.com/Lumisia/aho__ai-handoff/blob/713f8a236007b2096dd273390fe72d55d32d8957/crates/ai-handoff-daemon/src/lib.rs#L27-L50" },
  { label = "작업 스케줄러 작업 등록 (v2.2.1)", url = "https://github.com/Lumisia/aho__ai-handoff/blob/bfba7efdda189f9685c3bfb98f18507ada0f2e9f/crates/ai-handoff-cli/src/host_launcher/windows.rs#L159-L240" },
  { label = "호스트 우선 · 직접 실행 대체", url = "https://github.com/Lumisia/aho__ai-handoff/blob/bfba7efdda189f9685c3bfb98f18507ada0f2e9f/crates/ai-handoff-cli/src/daemon_supply.rs#L142-L200" },
]
cause = '''
1. Codex는 작업 폴더 밖 쓰기를 막는 샌드박스에서 훅을 실행합니다. 데몬의 IPC 폴더와 캡슐 저장소는 작업 폴더 밖(사용자 홈)에 있어서, 설치기가 Codex 설정의 쓰기 허용 경로(`writable_roots`)에 IPC 폴더만 추가해 두었습니다.
2. **IPC 권한:** requests·responses 하위 폴더에 상속 차단(`/inheritance:r`)을 걸어 두어, IPC 루트에 받은 샌드박스 쓰기 권한이 하위 폴더로 내려가지 않았습니다. 데몬이 켜져 있어도 훅은 `daemon_unavailable`로 실패했습니다.
3. **샌드박스 안에서 뜬 데몬:** 데몬이 꺼져 있으면 훅이 데몬을 직접 띄웠는데, 이 데몬은 샌드박스 제한을 그대로 물려받아 캡슐 저장소에 쓰지 못했습니다. 그런데도 단일 실행 잠금은 먼저 잡아, 정상 데몬이 뜨지 못하게 막았습니다.
'''
solution = '''
- **v2.0.10:** IPC 루트만 비공개로 잠그고 하위 폴더와 파일은 루트 권한을 상속하게 바꿨습니다. 요청·응답 파일은 파일별 권한 없이 원자적으로 쓰고, `doctor`가 하위 폴더 상속과 실제 쓰기 가능 여부를 검사하게 했습니다.
- **v2.1.7:** 데몬이 시작할 때 저장소 쓰기를 먼저 확인하고, 실패하면 잠금을 잡기 전에 종료하게 했습니다. 쓰기 실패는 `store_permission_denied`로 따로 알리고, `doctor`에 데몬 쪽 쓰기 상태를 추가했습니다.
- **v2.2.1:** 훅이 데몬을 직접 띄우지 않도록 바꿨습니다. 설치할 때 Windows 작업 스케줄러에 작업(`\AIHandoff\Daemon`)을 등록하고, 훅은 이 작업만 실행합니다. 작업 스케줄러가 로그인한 사용자의 일반 권한으로 별도 호스트(`ai-handoff-host`)를 띄우므로 데몬이 샌드박스 밖에서 시작됩니다. 작업이 등록돼 있지 않거나 실행에 실패할 때만 직접 띄웁니다.

**실제 코드(발췌): 작업 스케줄러 호스트를 먼저 쓰고, 실패하면 직접 실행**

```rust
let mut errors = Vec::new();
if has_host_launcher {
    match launch_host() {
        Ok(()) if wait_healthy(SupplyStrategy::HostLauncher) => {
            return SupplyOutcome {
                ready: true,
                strategy: SupplyStrategy::HostLauncher,
                errors,
            };
        }
        Ok(()) => errors.push("host launcher started, but no healthy daemon answered".into()),
        Err(error) => errors.push(format!("host launcher: {error}")),
    }
}

match launch_direct() {
```
'''
result = '''
권한이 망가진 IPC 폴더에서 `doctor`가 경고를 표시하고 데몬을 한 번 실행하면 상속이 복구되는 것을 실제 Windows 환경에서 확인했고, 하위 폴더 생성·공유 파일 쓰기·손상된 폴더 복구는 `secure_fs` 통합 테스트로 고정했습니다. v2.2.1부터는 Windows에서 설치된 백그라운드 호스트가 샌드박스 밖에서 데몬을 시작하며, 이후 v2.3.0 검증 때 실제 Codex 데스크톱의 훅이 데몬을 호출해 캡슐을 저장하는 것까지 확인했습니다.
'''

+++

<section class="proj-tech-section">
<h2 class="proj-sec-h">기술 스택</h2>

<div class="proj-tech-group">
<p class="proj-tech-cat">Core</p>
<div class="proj-tech-grid">
<span class="stack"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rust/rust-original.svg" alt="Rust 아이콘">Rust</span>
<span class="stack"><img src="https://cdn.jsdelivr.net/gh/clap-rs/clap@master/assets/clap.png" alt="clap 아이콘">clap</span>
<span class="stack"><span class="icon-badge">Sd</span>serde</span>
<span class="stack"><span class="icon-badge">i18</span>rust-i18n</span>
</div>
</div>

<div class="proj-tech-group">
<p class="proj-tech-cat">Interface</p>
<div class="proj-tech-grid">
<span class="stack"><img src="https://cdn.jsdelivr.net/gh/ratatui/ratatui@main/assets/logo.svg" alt="Ratatui 아이콘">Ratatui · Crossterm</span>
<span class="stack"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tauri/tauri-original.svg" alt="Tauri 아이콘">Tauri 2</span>
<span class="stack"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" alt="React 아이콘">React 18</span>
<span class="stack"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" alt="TypeScript 아이콘">TypeScript</span>
<span class="stack"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg" alt="Vite 아이콘">Vite</span>
</div>
</div>

<div class="proj-tech-group">
<p class="proj-tech-cat">Distribution</p>
<div class="proj-tech-grid">
<span class="stack"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/githubactions/githubactions-original.svg" alt="GitHub Actions 아이콘">GitHub Actions</span>
<span class="stack"><img src="/images/tech/nsis.png" alt="NSIS 아이콘">NSIS 설치기</span>
<span class="stack"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/powershell/powershell-original.svg" alt="PowerShell 아이콘">PowerShell · sh 설치 스크립트</span>
</div>
</div>

</section>

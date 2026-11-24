# 포트폴리오 근거 자료 확인 및 추가로 필요한 정보

검토일: 2026-09-27

최신 작성 및 검증 변경: 사용자 요청으로 공개 초안에서 근거 링크, 검토 메모, 별도 테스트 조건 항목을 제거했다. 6개 그림은 기능별 전체 아키텍처로 교체하고 제목은 발생한 문제를 요약했다. 수치가 있는 결과에는 조건을 한 줄로 기재했으며 가운뎃점을 사용하지 않았다. 편집 GIF, 개인 목록 조회 이미지 2개, 팀 위키 목록 조회 이미지 2개, Callog 위키와 일치하는 성능 이미지 3개를 배치했다. 팀 자료와 개인 자료는 별도로 표시했다.

사용자 요청에 따라 이번에는 실제 기존 자동 테스트 파일을 실행했다. 협업 편집 16개와 프론트 SSE 10개가 모두 통과했다. 아래 초기 조사에 적힌 ‘재실행하지 않음’은 이번 실행 이전의 기록이다. 서비스 코드와 테스트 코드를 수정하거나 새 테스트를 추가하지 않았다.

| 실제 실행 파일 | 통과 | 실패 |
|---|---:|---:|
| `frontend/src/components/workspace/collab/yblocks.test.js` | 5 | 0 |
| `frontend/src/components/workspace/collab/reconcile.test.js` | 6 | 0 |
| `frontend/src/components/workspace/collab/editorBinding.test.js` | 2 | 0 |
| `frontend/src/components/workspace/collab/binding.integration.test.js` | 3 | 0 |
| `frontend/src/api/sseConnection.test.js` | 10 | 0 |

실행 위치는 `C:/Git/fullstack_project/frontend`다. 처음 `node --test`는 자식 프로세스 실행 제한인 `spawn EPERM`으로 시험 시작 전에 실패했고, 각 기존 파일을 `node <파일>`로 직접 실행해 Node의 내장 테스트를 정상 수행했다. 해당 시험은 실제 Yjs 모델과 블록 반영 로직, 가짜 에디터 및 EventSource를 사용한다. 브라우저 화면 측정이나 서버 SSE 통합 시험의 새 실행으로 확대하지 않는다. 제공된 GIF는 브라우저에서 열어 두 편집 화면을 확인했으며, 새로 촬영한 결과가 아니다. 본문에는 이 내부 검토 설명을 넣지 않는다.

최신 범위 변경: 사용자가 제공한 `HanGat_Map_회원보안_트러블슈팅_회고.md`와 담당 범위 정정에 따라 한갓지도는 **회원 인증 설계·인증 실패 횟수 보존·Refresh Token 정책**으로 작성한다. 기존 카페 후보·AI 코스·Gemini 진단 제안은 선정 대상에서 제외한다. 아래 해당 항목의 코드·테스트 조사는 이전 조사 기록이며 추가 자료 요청 대상이 아니다. 현재 선정 내용과 검증 범위는 [회원·보안 사례 검토](C:/Git/Lumisia.github.io/docs/reviews/2026-09-27-hangat-auth-portfolio-review.md)에 정리했다.

추가 확인: 같은 날 사용자가 제공한 두 GitHub 위키의 첨부 사진을 브라우저에서 직접 열어 확인했다. AWS·동일 계정 반복 요청·Callog 캐시 초기화는 사용자 설명으로 보강했고, 약 1,000건은 기억에 따른 추정치로 기록했다. 아래 정보는 최초 검토 후 이 확인을 반영한 상태다.

데이터 범위 추가 확인: 사용자는 File in & Out에서는 워크스페이스를 여러 개 생성했고, Callog의 약 1,000건은 관련 데이터 전체를 뜻한다고 설명했다. File in & Out은 워크스페이스 약 1,000건, Callog는 관련 데이터 합계 약 1,000건이라는 기억 기준으로 정리한다. Callog의 각 테이블이 각각 1,000건이거나, File in & Out에서 요청 계정에 모든 워크스페이스가 연결돼 있었다고 확대하지 않는다.

최종 작성 방침: 사용자 요청에 따라 공개 포트폴리오에는 당시 서버의 세부 사양 및 ‘사양 미기록’ 문구를 싣지 않는다. 해당 사양 복구는 남은 필수 작업에서 제외한다. 확인한 API·동일 계정 반복·VU·실행 시간·캐시 초기화 조건을 기재하고, 현재 OCI 운영 설명은 운영 환경 소개에서 다룬다. 아래 조사 경위와 근거의 한계는 내부 검토 기록이다.

발견 경위·선택 이유 추가 확인: 사용자가 File in & Out·Callog의 6개 사례를 직접 설명했다. 아래 미확인 목록을 갱신했으며, 이 설명을 반영한 [6개 사례 초안](C:/Git/Lumisia.github.io/docs/reviews/2026-09-27-fileinnout-callog-troubleshooting-draft.md)을 작성했다. 새로 실행한 시험 결과는 없다.

## 범위와 판정 기준

- 대상: File in & Out, Callog, 한갓지도. AI Handoff는 사용자 요청에 따라 작성 대상에서 제외한다.
- 사용자가 말한 1~4번은 직전 자료 수집 우선순위인 **수정 전후 코드 / 테스트 스크립트·원본 결과 / 측정 당시 환경 / 기술 선택 이유**로 해석했다.
- 코드와 Git 이력, 이미 저장된 테스트 결과를 읽었다. 이번 검토에서 서비스 테스트·부하 테스트·운영 배포는 실행하지 않았다.
- 현재 로컬 파일, 커밋된 코드, 과거 실행 결과, 사용자 확인을 구별한다. 현재 설정이 과거 측정에도 같았다고 가정하지 않는다.
- 서비스와 포트폴리오 소스는 수정하지 않았다. 검토 메모와 무시되는 `tests/evidence-20260927/` 아래의 공개 팀 저장소 검토 사본만 만들었다.

확인한 소스:

| 대상 | 위치 및 기준 |
|---|---|
| File in & Out 팀 저장소 | [사용자가 지정한 저장소](https://github.com/beyond-sw-camp/be24-3rd-ShakeShackFile-In-N-Out-File), 원격 main `dc728970343d65edb0c17a492572e4cb42236fbc` |
| File in & Out 개인 고도화 | `C:/Git/fullstack_project`, origin `Lumisia/FileinNOut`, 로컬 HEAD `667ff1228a364bcc08c5c8d35c1496e0e6d8c3bd` 및 기존 미커밋 변경 |
| Callog | `C:/Git/Callog`, origin `Lumisia/Callog`, 로컬 HEAD `fe768cb6742e7df684f4a3fb8a2444ee16e59fb2` 및 현재 파일 |
| 한갓지도 | `C:/Git/HanGat_Map`, origin `Jeju-Seonbi/HanGat_Map`, 로컬 HEAD `105675f74c1746480a2ed4cdd8f9cc38ff8a25ba` |

## 먼저 반영해야 할 사실

### 1. File in & Out의 두 성능 기록은 별도 측정이다

| 기록 | TPS | 평균 테스트 시간 | VUser | 실행 시간 |
|---|---|---|---|---|
| 팀 저장소 캡처 | 99.4 → 356.9 | 974.35 → 247.91ms | 전후 100 | 59초 → 22초 |
| 현재 포트폴리오 캡처 | 32.7 → 192.4 | 1,506.77 → 162.04ms | 전후 100 | 전후 2분 |

사용자는 두 번째 기록을 **단독 운영할 때 측정한 결과**라고 확인했다. 따라서 수치 충돌이나 잘못된 기록으로 판단하지 않는다. 포트폴리오에는 개인 운영 개선이라는 시점을 명시하고, 그때의 실행 환경·코드 버전을 연결하면 된다. 팀 기록으로 현재 수치를 대체하거나 두 결과의 조건을 합쳐 쓰지 않는다.

팀 기록은 [성능 문서](https://github.com/beyond-sw-camp/be24-3rd-ShakeShackFile-In-N-Out-File/blob/dc728970343d65edb0c17a492572e4cb42236fbc/ngrinder/Test_Resut/performance-test.md)와 해당 PNG 두 장을 직접 대조했다. 개인 기록과 같은 수치를 적은 [로컬 정리 문서](C:/Git/fullstack_project/portfolio-troubleshooting-workspace-list.md)도 찾았다. 이 문서는 과거 스크린샷 경로와 요약 수치를 제공하지만, 상세 실행 리포트는 아니다.

### 2. Projection·페이지네이션 코드는 있지만 아직 로컬 미커밋 변경이다

개인 저장소 HEAD는 엔티티 목록을 조회한 뒤 DTO로 변환한다. 현재 작업 파일은 Projection 쿼리, 페이지 번호·크기, 기본 50건·최대 100건 처리를 추가한 상태다. `git diff`로 전후 비교가 가능하다.

- [실제 쿼리 변경](C:/Git/fullstack_project/backend/src/main/java/com/example/WaffleBear/workspace/repository/UserPostRepository.java:28)
- [목록 서비스 변경](C:/Git/fullstack_project/backend/src/main/java/com/example/WaffleBear/workspace/service/PostService.java:458)
- [페이지 요청을 포함한 테스트 스크립트](C:/Git/fullstack_project/backend/ngrinder/workspace/list.groovy:257)

이 사실은 구현이 없다는 뜻도, 측정 당시 배포되지 않았다는 뜻도 아니다. 다만 현재 변경과 측정 당시 배포본이 같은지는 Git 커밋만으로 증명할 수 없다. 당시 이미지 태그·빌드 번호·보관한 소스 중 하나로 연결해야 한다. 앞서 초안에 있던 `findByUserIdx()` 예시보다 실제 이전 메서드 `findAllByUser_IdxOrderByWorkspaceUpdatedAtDesc()`를 사용하는 편이 정확하다.

### 3. 동시 편집의 해결 범위는 코드로 확인됐다

기존 구현은 이미 Yjs를 사용하면서 `workspace_data`의 `contents` 하나에 문서 JSON 전체를 넣고, 수신 시 `editor.render()`로 전체를 그렸다. 따라서 핵심은 **Yjs 신규 도입이 아니라 공유 데이터의 병합 단위 변경**이다.

개선 후에는 `Y.Array<Y.Map>`의 블록별 `data`를 갱신한다. 현재 [코드 주석](C:/Git/fullstack_project/frontend/src/components/workspace/editor.js:125)과 [같은 블록 충돌 테스트](C:/Git/fullstack_project/frontend/src/components/workspace/collab/yblocks.test.js:65)는 같은 블록의 `data`가 통째로 충돌 해결되는 경계를 명시한다. 같은 문장을 동시에 편집한 모든 글자가 보존된다고 쓰면 안 된다.

### 4. 한갓지도는 회원·보안 담당 경험으로 선정한다

커밋 작성자 정보만으로 실제 담당 범위를 확정하지 않는다. 사용자가 제출한 회고를 기준으로 이메일 소유권 확인·백엔드 OAuth 설계, 인증 실패 횟수 보존, Refresh Token 상태·만료 관리를 선정했다. 현재 구현과 일부 변경 이력은 확인했으나, 회고에 나온 최초 결함 상태 전체가 Git에 남아 있는 것은 아니다.

## 1번: 수정 전후 코드 확인 결과

| 사례 | 확보한 전후 근거 | 작성할 수 있는 내용 |
|---|---|---|
| File in & Out 동시 편집 | [c8ec5a4](https://github.com/Lumisia/FileinNOut/commit/c8ec5a42e9d276cfeccaf910facb16709b71e8e1)의 부모와 변경 후 `editor.js`, 새 `collab/` 모듈 | 문서 JSON 한 필드·전체 렌더링 → 블록별 공유 타입·부분 반영. 서로 다른 블록 수정 보존 |
| File in & Out 목록 조회 | 팀 저장소·개인 HEAD의 엔티티 조회와 개인 작업 폴더의 Projection·페이지네이션 diff | 필요 컬럼만 조회하고 반환 범위를 제한. 측정 당시 버전 연결은 추가 필요 |
| File in & Out SSE 안정화 | [2b6ec1b](https://github.com/Lumisia/FileinNOut/commit/2b6ec1b4788893f9de19722ee093975586f47492) | 화면별 연결 → 공통 소유, 사용자·연결별 emitter 관리, 중복 재연결 제거, 15초 heartbeat |
| Callog 대시보드 | [쿼리 개선 82c0529](https://github.com/Lumisia/Callog/commit/82c0529f9f73986a9db0bf859bdda2326da90dc3), 후속 `305294f`, `fb5c781`, `54b7144`, `8a63285` 이력 | 전체 조회·반복 조회 → IN·COUNT·GROUP BY, 통합 응답 캐시, 캐시 키·TTL 변경. 한 커밋에 모두 들어간 변경은 아님 |
| Callog 캘린더 | [004ae2e](https://github.com/Lumisia/Callog/commit/004ae2e69b037af6f00a7e1eac96879caeaf70f5)의 `MainCalendar.vue` diff | 날짜별 반복 칩 → 주간 구간 막대, 겹치지 않는 줄 배치, 초과 일정 `+N` |
| Callog 다중 Pod | [d5e491c](https://github.com/Lumisia/Callog/commit/d5e491c8b771d461e257171b8d3c0b0cf858639c) | 스케줄러 Redis 락, UUID+Lua 해제, Pod 간 Pub/Sub 알림 중계 |
| 한갓지도 후보 누락·대체 코스 | [549df16](https://github.com/Jeju-Seonbi/HanGat_Map/commit/549df1654175f2db92f4bba6fa2654a199d23dc4) | 일반 후보 상한보다 뒤에 있는 카페를 별도 후보 조회로 확보, 분류 SQL 보정, 대체 일정의 스타일·이동 시간·혼잡도 제약 처리 |
| 한갓지도 Gemini 오류 진단 | [13883d2](https://github.com/Jeju-Seonbi/HanGat_Map/commit/13883d2dd9a89c65b069188e062f52f4631f5731) | 허용된 오류 항목만 별도 트랜잭션에 저장, 원래 실패와 대체 생성 결과 연결, 원문·키 노출 방지 |

SSE Pub/Sub 코드는 팀 저장소에도 이미 존재한다. 6월 안정화 커밋에서 Pub/Sub까지 처음 도입했다고 한꺼번에 쓰지 않는다. 시기별 변경을 구분한다.

## 2번: 테스트 스크립트·결과 확인 결과

### File in & Out

- 팀 저장소에 [목록 조회 Groovy 스크립트](https://github.com/beyond-sw-camp/be24-3rd-ShakeShackFile-In-N-Out-File/blob/dc728970343d65edb0c17a492572e4cb42236fbc/ngrinder/workspace/list.groovy), 성능 정리 문서와 캡처가 있다.
- 개인 [현재 스크립트](C:/Git/fullstack_project/backend/ngrinder/workspace/list.groovy:244)는 스레드 초기화 때 로그인하고, 측정 요청은 `/workspace/list`에 `page=0`, `size=50`을 기본으로 보낸다. 로그인 요청과 측정 요청 객체도 분리돼 있다. 실행 당시 nGrinder가 이 파일과 같은 내용을 사용했는지는 별도 확인이 필요하다.
- [목록 서비스 테스트](C:/Git/fullstack_project/backend/src/test/java/com/example/WaffleBear/workspace/service/PostServiceWorkspaceListTest.java:48)와 [기존 XML 결과](C:/Git/fullstack_project/backend/build/test-results/test/TEST-com.example.WaffleBear.workspace.service.PostServiceWorkspaceListTest.xml)를 찾았다. 결과 파일에는 2026-07-06 실행, 테스트 1개, 실패·오류 0이 기록돼 있다. Mockito로 페이지 제한·매핑·Repository 호출을 검증하며 실제 DB 쿼리 성능을 검증한 것은 아니다.
- [협업 편집 통합 테스트](C:/Git/fullstack_project/frontend/src/components/workspace/collab/binding.integration.test.js:42)는 Y.Doc 두 개와 가짜 에디터 사이에서 서로 다른 블록 수정 및 최종 일치를 검사한다. 실제 브라우저·WebSocket·다중 서버를 통과하는 시험과는 범위가 다르다.
- [SseEmitterStoreTest](C:/Git/fullstack_project/backend/src/test/java/com/example/WaffleBear/config/sse/SseEmitterStoreTest.java), [SseHeartbeatTest](C:/Git/fullstack_project/backend/src/test/java/com/example/WaffleBear/config/sse/SseHeartbeatTest.java), [프런트 연결 테스트](C:/Git/fullstack_project/frontend/src/api/sseConnection.test.js)가 있다. 연결 분리·끊긴 연결 정리·재연결 분기를 검증한다. 커밋 메시지에는 당시 테스트 통과 기록도 있지만 이번에 재실행하지 않았다.
- 개인 부하 테스트의 캡처와 요약은 확보했지만, 실행별 상세 리포트·로그 ZIP·반복 측정 기록은 확인한 저장소에서 찾지 못했다. HTTP 목록 조회 수치만으로 SSE 전달 지연이나 프록시 연결 유지 시간까지 입증할 수는 없다.

### Callog

- 포트폴리오뿐 아니라 [Redis 활용 전략 위키](https://github.com/beyond-sw-camp/be24-fin-magamFairy-callog/wiki/Redis-%ED%99%9C%EC%9A%A9-%EC%A0%84%EB%9E%B5)의 9번 성능 테스트 결과에도 개선 전 / Redis / Valkey 캡처 세 장이 있다. 위키 첨부 이미지를 직접 열어 동일한 수치를 확인했다.
- 위키의 별도 **부하 테스트 조건** 사진에는 에이전트 2개, 에이전트별 50 VU(2프로세스 × 25스레드), 총 100 VU, 실행 기간 2분이 표시돼 있다. Ramp-Up은 스레드 기준 초기 5, 증가 단위 5, 초기 대기 0ms, 주기 3,000ms다. 따라서 최대 부하는 100 VU이고 시작부터 100명이 동시에 요청하는 설정은 아니다. 이 설정 사진 하나로 세 실행의 모든 설정이 같았다고 단정하지는 않는다.
- 설정 사진에 SVN 스크립트 `redis/redis_noCache.groovy`, revision `R46`이 표시돼 있다. **스크립트 식별자는 확보했지만 파일 내용은 아직 확보하지 못했다.** 로컬 Git 이력에서 해당 스크립트를 찾지 못했다는 기존 확인은 여전히 유효하다.
- 위키는 원본 위치로 `C:\Users\Playdata\Desktop\redis 성능 테스트`를 제시한다. 현재 컴퓨터에는 그 경로가 없다. 상세 리포트·오류 로그의 실제 내용은 아직 확인하지 못했다.
- [기능 테스트 안내서](C:/Git/Callog/docs/callog-feature-test-guide.md)는 확인 절차와 기대 결과를 제공하지만, 실행 완료·통과의 기록은 아니다.
- 캘린더·분산 락·대시보드에 해당하는 저장된 테스트 실행 결과는 확인하지 못했다. 이를 ‘테스트하지 않았다’고 단정하지 않는다.

### 한갓지도 — 선정에서 제외된 AI 사례의 이전 조사 기록

소스뿐 아니라 2026-09-20의 기존 JUnit XML 결과도 찾았다. 아래 5개 테스트 클래스에는 총 36개 테스트, 실패·오류·건너뜀 0이 기록돼 있다. 이번 검토에서 재실행한 결과는 아니다.

| 클래스 | 테스트 수 | 확인하는 범위 |
|---|---:|---|
| `CafeCategoryMigrationTest` | 1 | H2 MariaDB 모드에서 6개 장소 중 조건에 해당하는 카페만 보정, SQL 두 번 실행 시 결과 유지 |
| `CourseDbCandidateServiceTest` | 7 | 후보 상한 밖의 카페 포함, 저장 태그의 스타일 연결, 조회 범위·정렬 등 |
| `CourseCandidateShortlistServiceTest` | 10 | 최종 후보 목록에서도 카페·필수 장소 유지, 권역·제외 조건 등 |
| `CourseFallbackStyleTest` | 8 | 선택한 스타일·카페 보존, 불가능한 이동·자정 초과·혼잡도 조건 등 |
| `CourseAiDiagnosticPersistenceTest` | 10 | 대체 생성 성공·외부 트랜잭션 롤백 뒤에도 진단 보존, 원문 비노출, 기록 실패 시 처리 지속 등 |

결과 위치: [JUnit 결과 폴더](C:/Git/HanGat_Map/backend/build/test-results/test).

전체 결과 폴더의 합계는 테스트 903개, 건너뜀 5개, 실패·오류 0이다. `549df16` 커밋 메시지의 834개·건너뜀 5개는 다른 시점의 기록이다. 개별 사례에는 해당 테스트 조건과 결과를 우선 제시하고, 두 시점의 전체 개수를 혼용하지 않는다.

관련 자료:

- [카페 보정 SQL](C:/Git/HanGat_Map/backend/src/main/resources/db/migration/V16__repair_kto_cafe_categories.sql)
- [카페 보정 시험 조건](C:/Git/HanGat_Map/backend/src/test/java/com/example/hangat/course/CafeCategoryMigrationTest.java:12)
- [카페 후보 상한 경계 시험](C:/Git/HanGat_Map/backend/src/test/java/com/example/hangat/course/CourseDbCandidateServiceTest.java:78)
- [오류 진단 설계 문서](C:/Git/HanGat_Map/backend/docs/gemini-diagnostics.md)
- [진단 저장·롤백·실패 시험](C:/Git/HanGat_Map/backend/src/test/java/com/example/hangat/course/ai/CourseAiDiagnosticPersistenceTest.java)

## 3번: 아직 필요한 테스트 환경·결과 정보

CPU·메모리를 모든 사례에 기계적으로 붙일 필요는 없다. 성능 비교에는 자원·부하 조건, 기능 검증에는 입력·상태·기대 결과·관찰 결과가 필요하다.

| 사례 | 이미 확인한 조건 | 추가로 필요한 정보 |
|---|---|---|
| File in & Out 목록 성능 | 단독 운영 측정이라는 사용자 확인, 개인 캡처 100 VU·전후 2분. 추가 설명: AWS, 동일 계정으로 목록 API 반복 호출, 워크스페이스 약 1,000건으로 기억 | 측정 날짜·배포 버전, 요청 계정에 연결된 목록 수, 전후 반환 건수. 실행 반복 횟수·워밍업·상세 리포트는 확보 가능한 경우 보강 |
| Callog 대시보드 성능 | 결과 3종·100 VU·약 2분, 별도 설정 사진에 에이전트 2개·Ramp-Up. 추가 설명: AWS, 동일 계정으로 대시보드 통합 API 반복, 시작 전 캐시 전체 초기화, 관련 데이터 합계 약 1,000건으로 기억 | 조회 기간 등 나머지 캐시 키 입력. 스크립트 내용·실행 버전·당시 TTL·반복 횟수·44건/16건 오류 원인은 확보 가능한 경우 보강 |
| File in & Out 동시 편집 | 기초 구현 후 다른 사람의 시험에서 발견, 본인이 두 브라우저로 편집 반영 문제·전체 깜빡임 추가 확인. 2개 Y.Doc·가짜 에디터 자동 테스트 코드 | 수정 후 동일 조작의 화면 기록, 같은/다른 블록 구분·조작 순서·반복 횟수 등은 보강 가능 |
| File in & Out SSE | 사용자가 중복 SSE 두 연결과 진입 시 끊김·재연결을 확인했다고 설명. 15초 heartbeat·연결별 관리·정리 시험 코드 | 수정 후 연결 수·이벤트 수, 다중 탭 종료 시 다른 연결 유지 기록. 프록시 조건은 근거가 있으면 보강 |
| Callog 캘린더 | 임시 더미 일정에서 기간 일정 반복 표시와 1일·3일 일정이 보이지 않는 현상을 확인했다는 사용자 설명. 날짜별 칩→주간 막대 전후 코드 | 동일 일정으로 수정 전후 화면, 주/월 경계·종료일·초과 일정 표시의 실제 결과 |
| Callog 다중 Pod | File in & Out에서 Pod마다 스케줄러가 독립 실행되는 문제를 경험해 Callog에 반영했다는 사용자 설명. TTL 락·Pub/Sub 구현 | Callog 자체의 동시 실행 수·저장 건수·Pod 간 전달 검증. TTL 만료나 늦게 시작하는 실행까지 회차당 정확히 한 번을 보장한다고 쓰지 않음 |
| 한갓지도 회원·보안 | 회고·현재 코드·Git 이력, 기존 데모 계정 통합 시험 12개 성공 XML | 인증 실패 후 별도 트랜잭션에서 DB 횟수 확인, 5회 제한, 실제 DB 동시 재발급·폐기 커밋·절대 만료 검증. 기존 12개 전체가 이 조건을 검증한 것은 아님 |

File in & Out [배포 문서](C:/Git/fullstack_project/docs/deployment/oci-k3s-jenkins.md:3)의 OCI 4 OCPU·24 GiB는 별도 배포 프로필이다. 사용자는 당시 서버를 AWS라고 설명했으므로, OCI 사양을 성능 측정 조건에 사용하지 않는다. AWS 서비스·인스턴스 유형·노드/컨테이너 할당량은 아직 미확인이다.

Callog는 **캐시가 비어 있는 상태로 시작해 동일 계정의 통합 대시보드를 반복 조회한 시험**으로 표현한다. 이후 캐시가 채워지면 재사용될 수 있으므로 모든 요청이 캐시 미적중인 시험으로 설명하면 안 된다. 실제 hit/miss 비율은 미확인이다. 사용자 확인으로 캐시 초기 상태는 보강됐지만, 전체 실행의 자원 경합·설정·반복 조건까지 동일해졌다고 추정하지 않는다.

자료가 없으면 과거 결과의 조건을 추측하지 않는다. 기록이 확인되는 범위로 서술하고, 필요할 경우 새 측정은 새로운 날짜·버전의 결과로 남긴다.

## 4번: 아직 필요한 기술 선택 이유

코드로 확인되는 동작과 합리적인 설명은 정리할 수 있다. 그러나 당시 실제로 비교·실험했다는 경험까지 대신 만들어서는 안 된다. 아래 항목은 모든 대안을 실험하라는 요청이 아니라, 실제 고려했던 대안과 선택 기준을 확인하기 위한 질문이다.

| 사례 | 코드에서 확인되는 선택 | 사람이 보강하면 좋은 이유·경험 |
|---|---|---|
| File in & Out 동시 편집 | 기존 Yjs 모델을 블록 단위로 변경, 같은 블록 문자 병합은 후속 범위 | 노션처럼 블록 중심 편집을 원했고 당시 구현·운영 여건 때문에 문자·문장 단위 병합까지 확대하지 않았다는 설명 확보. 문자 CRDT가 서버에서 원천적으로 불가능하다는 주장으로 바꾸지 않음 |
| File in & Out 목록 | 필요 컬럼 Projection과 페이지 제한, SSE 이벤트 갱신 | 30초 폴링은 변경 없는 사용자에게도 조회를 유발. 서버→관련 사용자 알림이면 충분해 SSE 선택. 페이지 크기 50의 별도 기준은 확인될 때만 추가 |
| File in & Out SSE | 공통 연결·연결 ID·15초 ping, 기존 Pub/Sub 활용 | 중복 연결·재연결을 줄이려고 연결을 통합했다는 설명 확보. heartbeat 15초의 특정 프록시 근거는 아직 확인되지 않음 |
| Callog 대시보드 | DB 집계+통합 응답 캐시, 사용자·기간·버전 키 | 타임아웃 연장만으로 조회 비용이 줄지 않아 원인을 개선. 자체 측정에서 Valkey가 더 나았고 전환이 간단해 후속 채택. 일반적인 제품 우열로 확대하지 않음 |
| Callog 캘린더 | 직접 주간 구간·줄 배치 계산 | 기간 일정과 당일·다른 기간 일정을 구분해서 보이도록 배치한 목적 확보. 다른 라이브러리를 실험·탈락시켰다는 서술은 하지 않음 |
| Callog 다중 Pod | 기존 Redis에 TTL 락·토큰 검증·알림 중계 | 이전 File in & Out의 독립 스케줄러 문제 경험을 Callog에 반영. 락은 실행 경쟁 제어, Pub/Sub은 서버 간 알림 전달로 역할 구분. TTL 10분 선정 근거는 미확인 |
| 한갓지도 회원 인증 설계 | 이메일 인증 후 연결 판단, 백엔드 OAuth, 쿠키·메모리 역할 분리 | 회고에 당시 제약과 선택 이유가 있어 초안 작성 가능. 모든 가입 경로의 정보 노출을 막았다고 확대하지 않음 |
| 한갓지도 인증 실패 횟수 | 롤백 제외 대상을 BaseException 전체에서 코드 불일치 전용 예외로 축소한 이력 | 오류 응답과 실패 사실 저장을 구분한다는 이유가 확보됨. 별도 트랜잭션 등 다른 대안을 실험했다고 만들지 않음 |
| 한갓지도 Refresh Token | 잠금 조회·폐기 보존·기존 만료 시각 전달·프론트 요청 공유 | 회고의 정책 목적은 작성 가능. 왜 14일·12시간인지와 다른 락 방식의 실제 비교는 추가 설명이 있을 때만 포함 |

한갓지도 발견 경위는 회고에 명시된 ‘회원·보안 코드 검토 과정’으로 작성한다. 운영 사고나 직접적인 공격 피해로 바꾸지 않는다. 첨부 문서가 이미 설명한 발견 경위·선택 이유를 사용자에게 다시 일괄 요청할 필요는 없다.

## 작성 순서 제안

1. 확보한 코드로 File in & Out·Callog의 기존 6개 사례를 정리하되, 성능 수치는 각 실행 조건이 연결되는 범위에서 사용한다.
2. 한갓지도는 **이메일 소유권·OAuth 설계**, **인증 실패 횟수 보존**, **Refresh Token 상태·만료 관리**로 선정한다. 첫 사례는 설계 의사결정, 나머지는 개발 중 검토·보완한 경험으로 구분한다.
3. 각 사례를 제목 → 문제·해결 그림 1장 → 원인 3문장 → 해결 3~4줄 → 테스트 조건 → 전후 결과로 통일한다.
4. 한갓지도 그림은 이메일 인증 전후의 정보 공개 순서, 오류 응답과 DB 저장의 분리, 토큰 회전과 고정 만료 시점으로 각각 구성한다. 설계안 비교 그림을 실제 과거 구현 화면으로 표시하지 않는다.
5. 세 프로젝트의 핵심 발견 상황·선택 이유는 사용자 설명과 회고로 확보됐다. 이제 초안의 논리·그림·기능 검증 결과를 정리한다. 팀 인원 등 소개 정보는 별개이며, 당시 서버 사양·과거 전체 로그 복구를 초안 작성의 선행 조건으로 삼지 않는다.

## 발견 경위·선택 이유가 들어갈 위치

- **발견 경위:** 원인 3문장 중 첫 문장에 넣는다. 누가 어떤 입력·행동·검증으로 증상을 확인했는지 설명한다.
- **기술적 원인:** 원인 3문장 중 두 번째 문장에 넣는다. 실제 코드·쿼리·구조의 문제는 확보한 소스로 작성한다.
- **해결 필요성:** 원인 3문장 중 세 번째 문장에 넣는다. 사용자 작업·성능·데이터에 미친 영향을 설명한다.
- **선택 이유:** 해결 과정 3~4줄 중 실제 변경 설명 다음에 넣는다. 고려한 다른 방식과 요구사항·제약을 연결하며, 비교 실험이 없었다면 실험했다고 쓰지 않는다.

| 사례 | 발견 경위에서 보강할 내용 | 선택 이유에서 보강할 내용 |
|---|---|---|
| File in & Out 동시 편집 | 다른 사람에게 기초 편집 시험을 요청한 뒤 본인이 두 브라우저로 재현. 편집 내용 반영 이상과 전체 깜빡임 | 블록 중심 사용 경험과 당시 구현·운영 여건. 같은 블록의 문자 병합은 해결 범위 밖 |
| File in & Out 목록 조회 | 최초 30초 폴링 구조에서 변경 없는 사용자도 반복 조회하는 문제 인식 | 갱신 알림에 서버→클라이언트 단방향 전송이면 충분해 SSE 채택 |
| File in & Out SSE 안정화 | 진입할 때 SSE가 두 개 잡혀 끊김·재연결 반복을 확인 | 연결과 재연결을 공통 관리. 15초라는 값의 선정 사유는 추가 근거가 있을 때만 설명 |
| Callog 대시보드 | 기초 구현 후 화면에서 데이터 미수신·부분 표시 확인. 사용자 기억상 15초 제한과 조회량 문제 | 대기 시간 확대보다 조회 비용을 줄임. Redis 이후 자체 비교 결과와 간단한 교체를 근거로 Valkey 채택 |
| Callog 캘린더 | 임시 더미 데이터로 긴 일정의 반복 표시와 다른 일정이 보이지 않는 현상 확인 | 일정 구간과 줄을 나눠 각각 보이게 하는 것이 요구사항. 데이터 삭제 사건으로 표현하지 않음 |
| Callog 다중 Pod | 이전 File in & Out에서 Pod별 스케줄러 독립 실행을 경험 | 해당 경험을 Callog 설계에 반영. Callog 운영 중 중복 저장 사고가 났다는 뜻은 아님 |
| 한갓지도 회원·보안 3개 사례 | 회고에 회원 구현·코드 검토 과정이 명시되어 작성 가능. 당시 DB 증상 직접 관찰과 검토에서 발견한 가능성을 구분 | 이메일 소유권, 실패 기록 유지, 토큰 수명 정책이라는 이유가 확보됨. 실제로 비교하지 않은 방식이나 보안 성과는 추가하지 않음 |

추가 대조: Callog 사용자는 당시 프론트 제한을 15초로 기억하지만 현재 `frontend/plugins/interceptor.js:25`는 `timeout: 5000`이며, 확인한 해당 파일 이력에서는 당시 대시보드의 15초 설정을 확보하지 못했다. 15초 기억을 현재 코드로 검증했다고 하지 않으며 본문은 ‘프론트 요청 제한 시간’으로 표현한다. nGrinder 오류 44건·16건 모두를 이 프론트 타임아웃 탓으로 연결하지 않는다.

File in & Out의 ‘서버가 감당할 수 없다’는 실제 장애·한계 측정으로 제시하지 않는다. 변경이 없어도 사용자 수에 비례해 폴링 조회가 늘어나는 구조적 문제로 쓴다. 문자 단위 병합 미적용도 기술적으로 불가능한 것이 아니라 당시 프로젝트에서 선택한 구현·운영 범위로 설명한다.

## 추가: 두 위키 사진에서 확인한 전후 수치

### File in & Out — 팀 테스트 기록

[성능 테스트 위키](https://github.com/beyond-sw-camp/be24-3rd-ShakeShackFile-In-N-Out-File/wiki/%EC%84%B1%EB%8A%A5-%ED%85%8C%EC%8A%A4%ED%8A%B8)의 `4-3. 워크스페이스 리스트`에 전후 이미지가 모두 있다.

| 항목 | 개선 전 | 개선 후 |
|---|---:|---:|
| 총 VUser | 100 | 100 |
| TPS | 99.4 | 356.9 |
| 평균 테스트 시간 | 974.35ms | 247.91ms |
| 총 실행 테스트 | 5,174 | 5,004 |
| 오류 | 0 | 0 |
| 동작 시간 | 59초 | 22초 |

위키의 `3-1. 성능 향상 부분`은 워크스페이스 계열의 FETCH JOIN·EntityGraph·배치 조회 등을 개선 내용으로 설명한다. 이 사진을 개인 고도화의 Projection·페이지네이션 변경 및 32.7→192.4 수치에 대응시키지 않는다. 전후 실행 시간이 달라 고정된 동일 시간의 비교라고 쓰지 않으며, 총 실행 수만 보고 정확히 5,000회로 설정한 시험이라고 추정하지 않는다.

### Callog — 대시보드 기록

| 항목 | 위키상 Redis 적용 전 | Redis 적용 후 | Valkey 적용 후 |
|---|---:|---:|---:|
| 총 VUser | 100 | 100 | 100 |
| TPS | 7.0 | 97.3 | 117.4 |
| 평균 테스트 시간 | 11,033.33ms | 995.14ms | 787.35ms |
| 총 실행 테스트 | 785 | 10,174 | 12,685 |
| 오류 | 44 | 16 | 0 |
| 동작 시간 | 2분 1초 | 2분 | 2분 1초 |

위키의 세 사진은 현재 포트폴리오의 수치와 일치한다. 실제 변경 이력은 JPA 조회·통합 캐시 등 여러 조치를 포함하므로, 포트폴리오 단계 이름은 해당 코드 변경까지 포함해 작성한다. 위키의 `Redis 적용 전/후`라는 이름만으로 Redis 단독 효과가 분리 검증된 것은 아니다.

이전 리뷰에서 개선 전 이미지의 설명을 ‘레디스 적용한 테스트임’으로 잘못 읽은 부분도 정정했다. 실제로는 ‘레디스 적용안한 테스트임’이며 `dashboard_noCache_Test`와 모순되지 않는다.

결과 캡처와 부하 설정은 확인됐다. 캡처 속 ‘상세 보고서’ 버튼이나 로그 ZIP 글자는 사진의 일부이므로, 그 안의 원본 리포트까지 확인한 것으로 취급하지 않는다. 현재 자료만으로도 확인된 조건을 명시한 결과 문단은 작성할 수 있으며, 모든 과거 로그 복구를 작성의 선행 조건으로 삼지 않는다.

# Callog 담당 영역 이미지 개편 설계

## 목표

- Frontend 기여 문구를 `구글 캘린더 친화적 가져오기·내보내기 UI 구현`으로 변경한다.
- 담당 영역에 대시보드, 캠페인, 캘린더, 팀보드, KPI 화면 이미지를 추가한다.
- 캘린더와 팀보드는 데스크톱에서 나란히, 모바일에서 세로로 배치한다.
- Callog 상세 페이지의 `구현 방식` 섹션을 제거한다.

## 데이터 구조

- 기존 단일 이미지 필드 `features.image`는 그대로 지원한다.
- 복수 이미지가 필요한 기능은 `features.images` 배열을 사용한다.
- `features.images`의 각 원소는 `image`와 `alt`를 가진다.
- Callog의 대시보드, 캠페인, KPI는 단일 이미지 필드를 사용한다.
- 캘린더·팀보드는 복수 이미지 배열을 사용한다.

## 렌더링

- 공통 프로젝트 템플릿은 단일 이미지와 복수 이미지 모두 렌더링한다.
- 복수 이미지는 데스크톱 2열, 720px 이하에서 1열이다.
- 각 이미지에는 담당 화면을 설명하는 대체 텍스트를 제공한다.
- FileinNOut 등 기존 단일 이미지 프로젝트의 출력은 변경하지 않는다.

## 콘텐츠 정리

- Callog의 `implementation_methods` 데이터 4개를 제거한다.
- 대시보드 집계는 트러블 슈팅 1, 일정 레인 배치는 트러블 슈팅 2, 다중 Pod 조정은 트러블 슈팅 3에 이미 포함되어 중복 이관하지 않는다.
- 캠페인 권한 검증은 실제 장애 근거가 없으므로 트러블 슈팅으로 만들지 않고 담당 영역 설명에 유지한다.

## 이미지 파일

- `대시보드.png` -> `assets/images/projects/callog/dashboard.png`
- `캠페인.png` -> `assets/images/projects/callog/campaign.png`
- `캘린더.png` -> `assets/images/projects/callog/calendar.png`
- `팀보드.png` -> `assets/images/projects/callog/teamboard.png`
- `KPI.png` -> `assets/images/projects/callog/kpi.png`

## 검증

- 변경 전 렌더링 검사에서 새 이미지 그룹과 파일 참조가 없어 실패하는지 확인한다.
- 변경 후 Hugo 빌드가 성공하는지 확인한다.
- 생성된 Callog HTML에 5개 이미지와 복수 이미지 그룹이 있는지 확인한다.
- 생성된 FileinNOut HTML의 기존 단일 이미지가 유지되는지 확인한다.

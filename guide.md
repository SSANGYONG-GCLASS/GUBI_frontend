# 브랜치 전략 가이드

## 브랜치 규칙

- `main`: 배포 브랜치
- `feature/xxx`: 기능 개발(각 기능별로 브랜치 생성)
- `fix/xxx`: 특정 기능 버그 수정
- `hotfix/xxx`: 긴급 버그 수정(배포, 운영 단계)

인원 별 브랜치 사용이 아닌 기능 단위 브랜치 생성(로그인, 회원가입, 상품 등..)

예시) 로그인 기능 개발 시
```bash
# 최신 코드 업데이트
git checkout main
git pull origin main

# 새 기능 브랜치 생성
git checkout -b feature/login-api
# 프론트의 경우
git checkout -b feature/login-page

# 기능 개발 후 push
git add .
git commit -m "feat: 로그인 API 제작"
git push origin feature/login-api

## (선택사항) 브랜치 삭제
# 로컬 브랜치 삭제
git branch -d feature/login-api

# 원격 브랜치 삭제
git push origin --delete feature/login-api
```

이후 github PR 생성 → 코드리뷰 → Merge

PR merge 시 기능별로 코드리뷰를 하고 추적하기 용이하므로 번거롭더라도 한 개의 기능 완성 후 브랜치 푸시, 새로운 브랜치 제작 필요

## 커밋 메시지 규칙

| 메시지        | 의미                 | 예시                      |
| ---------- | ------------------ | ----------------------- |
| `feat`     | 새로운 기능 추가          | `feat: 로그인 기능 구현`       |
| `fix`      | 버그 수정              | `fix: 날짜 포맷 오류 수정`      |
| `docs`     | 문서 수정              | `docs: API 정의서 추가`      |
| `style`    | 코드 스타일 변경(기능 변경x)  | `style: 들여쓰기 수정`        |
| `refactor` | 코드 리팩토링(동작 변경x)    | `refactor: 주문 로직 함수 분리` |
| `test`     | 테스트 코드 추가          | `test: 회원가입 API 테스트 추가` |
| `chore`    | 빌드/패키지 변경 등 자잘한 작업 | `chore: DB 의존성 추가`      |

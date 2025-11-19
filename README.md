# 💊 이건뭐약

![](./src/assets/images/banner/banner.png)

> 오픈 API를 활용한 의약품 이미지 검색 시스템

- [GitHub REPO](https://github.com/orgs/oz-main-13-team5/repositories)

<br>

## 서비스 소개

이건뭐약은 사용자가 약 사진 업로드 시, 의약품의 이름·성분·효능·주의사항 등을 빠르게 조회할 수 있는 서비스입니다.

- 이미지/텍스트 기반 약 검색
- 북마크 기능
- 이미지 검색 히스토리
- 마이페이지
- 회원가입 / 로그인

<br>

## 배포링크

- [Frontend](https://frontend-mu-ruby.vercel.app/)
- [Backend](https://search-pill.p-e.kr/)

<br>

## 📋 Documents

### 발표

- [이건뭐약 PPT](https://docs.google.com/presentation/d/1BKcQu7VAuFIlppJSzQg8yMZ0Rw7T2qOT/edit?slide=id.p1#slide=id.p1)

### 개발

- [사용자 요구사항 정의서](https://www.notion.so/296caf5650aa808ab4b3e0750a2a55cc?source=copy_link)
- [Figma 와이어프레임/디자인시스템](https://www.figma.com/design/y1mrdq5f3bYzMjdKwTn2ZE/Main-Project_%EC%9D%B4%EA%B1%B4%EB%AD%90%EC%95%BD_5%ED%8C%80?node-id=5-92&t=f4jOgtHbtvHmJF1T-1)
- [FigJam 플로우차트](https://www.figma.com/board/yhlkHQAaOdPWwIr6NehNHS/%EB%A9%94%EC%9D%B8%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8_5%ED%8C%80_%ED%94%8C%EB%A1%9C%EC%9A%B0%EC%B0%A8%ED%8A%B8?node-id=0-1&t=u3POshEO5BGka4Oy-1)
- [Figma 화면정의서](https://www.figma.com/design/y1mrdq5f3bYzMjdKwTn2ZE/Main-Project_%EC%9D%B4%EA%B1%B4%EB%AD%90%EC%95%BD_5%ED%8C%80?node-id=0-1&t=f4jOgtHbtvHmJF1T-1)
- [ERD](https://www.erdcloud.com/d/pPGdKKksBb5JGEinj)
- [테이블 명세서](https://www.notion.so/296caf5650aa8060b5ebf028e7567643?source=copy_link)
- [API 명세서](https://docs.google.com/spreadsheets/d/1JDMBH_-3PmuspuN63x4fQFO2cqnYQ1dK8t54ROaa6gs/edit?gid=142927694#gid=142927694)

<br>

## 🛠 기술 스택

### FE

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
<br>
![Zustand](https://img.shields.io/badge/Zustand-181717?style=for-the-badge&logo=redux&logoColor=white)
![TanStack Query](https://img.shields.io/badge/TanStack_Query-FF4154?style=for-the-badge&logo=reactquery&logoColor=white)
<br>
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)
![Zod](https://img.shields.io/badge/Zod-3E67B1?style=for-the-badge&logo=zod&logoColor=white)
![React Hook Form](https://img.shields.io/badge/React_Hook_Form-EC5990?style=for-the-badge&logo=reacthookform&logoColor=white)
![MSW](https://img.shields.io/badge/MSW-FF6A33?style=for-the-badge&logo=mockserviceworker&logoColor=white)

### BE

<br>

## 👥 팀 소개

### BE

| GitHub          | 이름        |
| --------------- | ----------- |
| @badatga        | 김재호 팀장 |
| @BH13KDR        | 김동렬      |
| @TeaCat-Develop | 박진영      |
| @codfin02       | 황성연      |

### FE

| GitHub         | 이름          |
| -------------- | ------------- |
| @badatga       | 박혜빈 부팀장 |
| @goz442        | 이상원        |
| @JaeHyunLee123 | 이재현        |

<br>

## 📏 Project Convention

- [Frontend Convention](https://www.notion.so/29acaf5650aa803c8418c8bbb286a711?source=copy_link)

### Git Branch

| 종류        | 설명                 | 예시              | 설명               |
| ----------- | -------------------- | ----------------- | ------------------ |
| **main**    | 메인 브랜치          | main              | 그대로 사용        |
| **develop** | 배포 전 개발 브랜치  | develop           | 그대로 사용        |
| **feature** | 기능 개발 브랜치     | feature/10-signin | 로그인 기능 브랜치 |
| **hotfix**  | 디버깅 브랜치        | hotfix-1.1.4      | 1.1버전 디버깅     |
| **release** | 배포하기 위한 브랜치 | release-1.1       | 1.1 버전           |

<br>

### Commit Message

| Type         | 설명                                                 |
| ------------ | ---------------------------------------------------- |
| **feat**     | 새로운 기능 추가                                     |
| **fix**      | 버그 수정                                            |
| **refactor** | 리팩토링                                             |
| **design**   | CSS 및 사용자 UI 디자인 변경                         |
| **style**    | 코드 포맷팅, 세미콜론 누락, 코드 변경이 없는 경우    |
| **test**     | 테스트(테스트 코드 추가, 수정, 삭제)                 |
| **chore**    | 기타 변경사항 (빌드 스크립트 수정, 패키지 매니저 등) |
| **init**     | 프로젝트 초기 생성                                   |
| **rename**   | 파일 혹은 폴더명 수정 또는 이동                      |
| **remove**   | 파일을 삭제하는 작업만 수행한 경우                   |

<br>

## 환경변수 세팅

- 아래와 같이 .env 파일을 설정해주세요.

```
# api 주소
VITE_API_BASE_URL=
```

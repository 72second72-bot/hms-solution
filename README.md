# HMS Solution 홈페이지

엔지니어링 실무를 위한 업무 자동화. 이 저장소에는 **홈페이지와 배포용 파일만** 있습니다.
프로그램 소스는 들어 있지 않습니다.

**주소** — https://72second72-bot.github.io/hms-solution/

| 무엇 | 어디 |
|---|---|
| 홈페이지 | `index.html` 한 장 |
| 로고 · 아이콘 | `logo.png` · `favicon.png` |
| 사용 안내서 | `guides/` 안에 PDF 10권 |
| 설치 파일 | [Releases](../../releases) 에 올려 둡니다 |

---

## 고치는 법

### 1. 글자만 바꾸고 싶을 때 — 가장 흔한 경우

1. 위에서 **`index.html`** 을 누릅니다
2. 오른쪽 위 **연필 아이콘**(Edit this file)을 누릅니다
3. 고칠 글을 찾아 바꿉니다
4. 아래 **[Commit changes]** 를 누릅니다

**1~2분 뒤 홈페이지에 반영됩니다.** 프로그램을 깔 필요도, 명령어를 칠 필요도 없습니다.

바뀐 것이 안 보이면 브라우저에서 `Ctrl+F5` 로 새로 읽어 보세요.

### 2. 새 설치 파일을 올릴 때

1. **Releases** → **[Draft a new release]**
2. 태그는 `v2.0.5` 처럼 판 번호로
3. 설치 파일을 끌어다 놓습니다
4. **파일 이름은 반드시 `HMS-Solution-Center-Setup.exe`** 로 둡니다

이름을 그대로 두는 까닭 — 홈페이지의 내려받기 단추가 이 주소를 가리키기 때문입니다.

```
releases/latest/download/HMS-Solution-Center-Setup.exe
```

`latest` 라서 새 릴리스를 만들면 단추가 저절로 새것을 가리킵니다. 홈페이지는 손댈 것이 없습니다.
다만 첫 화면에 적힌 판 번호(`v2.0.4 · 200MB`)는 글자라서 `index.html` 에서 함께 고쳐 주셔야 합니다.

### 3. 안내서를 바꿀 때

`guides/` 폴더에 **같은 이름으로** 올려 덮어씁니다. 이름이 달라지면 홈페이지의 링크가 끊깁니다.

| 파일 이름 | 무엇 |
|---|---|
| `hms-center-guide.pdf` | Solution Center 사용 안내서 |
| `hms-solutions-guide.pdf` | 업무 효율화 솔루션 안내서 (7종 묶음) |
| `solution-cad-cadastral.pdf` | CAD 지적도 · 토지현황도 제작 |
| `solution-dxf-merge.pdf` | CAD 도면 병합 |
| `solution-coord-trans.pdf` | AutoCAD 좌표변환 |
| `solution-building-register.pdf` | 건축물대장 조서 작성 |
| `solution-realty-price.pdf` | 부동산 공시가격 조회 · 수집 |
| `solution-thematic-shp.pdf` | 주제도 SHP 속성 코드 입력 |
| `solution-ppt-image.pdf` | PPT 이미지 맞춰 넣기 |

### 4. 구성을 바꾸거나 새 마디를 넣고 싶을 때

말씀만 주시면 고쳐 올려 드립니다. 위 1~3 은 급하실 때 직접 하실 수 있는 길입니다.

---

## 알아 두면 좋은 것

- **비용은 들지 않습니다.** GitHub Pages 와 Releases 모두 무료이고, 설치 파일이 몇 백 번
  내려받아져도 전송량으로 돈이 나가지 않습니다.
- **`.nojekyll` 파일을 지우지 마세요.** GitHub 이 페이지를 함부로 손대지 않게 막아 둔 것입니다.
- 홈페이지 색과 글꼴은 Solution Center · Manager 와 같은 것을 씁니다. 프로그램 쪽 팔레트를
  바꾸면 여기도 함께 맞춰 주세요.

## 문의

- 메일 — 72second@naver.com
- 카카오톡 오픈채팅 — https://open.kakao.com/o/gkkxMGLi

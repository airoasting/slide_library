# 분석 기준 상세 가이드

아래 색 이름(`--forest-dark` 등)과 값은 **한 IR 덱에서 나온 예시**다. 분석 대상 덱의 실제 값으로 대체한다.

## 2.0 추출 방법론 (정확한 값을 얻는 법)

"추측하지 말고 정확히"라는 요구는 방법이 있어야 지킬 수 있다. PDF를 눈으로만 보면 색은 근사치가 된다. 다음 순서로 실제 값을 확보한다.

**색상**
- PDF 페이지를 이미지로 렌더링한 뒤 대표 영역(표지 배경, 강조 배경, 본문 텍스트, 테두리)의 픽셀에서 hex를 읽는다. macOS라면 다음이 빠르다.
  ```bash
  # PDF 첫 5페이지를 PNG로 렌더 (해상도 150)
  sips -s format png --resampleWidth 1600 "deck.pdf" --out /tmp/deck-p1.png 2>/dev/null || \
  qlmanage -t -s 1600 -o /tmp "deck.pdf"
  # 또는 pdftoppm 사용 (있으면): pdftoppm -png -r 150 -f 1 -l 5 "deck.pdf" /tmp/deck
  ```
  렌더된 PNG를 Read로 열어 색을 확인한다. 픽셀 단위 hex가 필요하면 Python(Pillow)으로 샘플링한다.
  ```python
  from PIL import Image
  im = Image.open('/tmp/deck-p1.png').convert('RGB')
  print('#%02X%02X%02X' % im.getpixel((x, y)))  # 대표 좌표에서
  ```
- 정확한 hex를 끝내 확정 못 하면 근사값 옆에 `(근사)`를 붙여 다음 사람이 검증하게 한다. 지어낸 정밀값보다 정직한 근사가 낫다.

**폰트**
- PDF에 임베드된 폰트 목록을 직접 조회한다.
  ```bash
  pdffonts "deck.pdf"   # 임베드 폰트명·타입 출력
  ```
- 목록의 폰트명을 웹/시스템 폰트 스택으로 매핑한다. 한글 폰트(예: Pretendard, Apple SD Gothic Neo)와 라틴/숫자 폰트를 구분한다.

**레이아웃·여백**
- 렌더 이미지 위에서 요소 간 간격을 재 그리드 스케일(8의 배수 등)과 패딩 단위를 추정한다. 절대 px를 못 잡으면 슬라이드 폭 대비 %로 기록한다.

**PPTX 입력**
- `.pptx`는 zip이다. 풀어서 `ppt/slideMasters`, `ppt/theme/theme1.xml`(색·폰트 테마), `ppt/slides/*.xml`을 직접 읽으면 색·폰트·레이아웃을 **PDF보다 정확히** 얻는다. 또는 pptx 전용 스킬로 파싱한다. pptx가 있으면 이 경로를 우선한다.

---

## 2.1 컬러 팔레트 추출

파일의 모든 색상을 식별하고 다음과 같이 문서화합니다:

```
--forest-dark:   #0B5A3C   /* 메인 캔버스, 표지 배경 */
--lime-accent:   #C4D96F   /* 1차 액센트, 강조 배경, 키워드 강조 */
--lime-pale:     #E8F0BF   /* 2차 액센트, 페일 강조 배경 */
--green-dark:    #1F5F4A   /* 섹션 라벨, 보조 강조 */
--paper:         #FFFFFF   /* 본문 슬라이드 배경 */
--ink:           #000000   /* 본문 잉크 */
--muted:         #666666   /* 약화 텍스트, 메타 라벨, 날짜 */
--line:          #E0E0E0   /* 테이블 보더, 카드 테두리 */
--highlight:     #D4472A   /* 강조 보더, 강조 셀 */
```

**기준:**
- 모든 hex 값은 대문자 6자리
- 가장 중요한 색부터 나열
- 각 색에 사용 맥락 명시 (최소 1개, 최대 3개)
- 유사한 색은 변수명으로 관계 표시 (예: `--ink-dark` = `--forest-dark`)

---

## 2.2 타이포그래피

### 폰트 스택

```
font-family: 'Apple SD Gothic Neo', 'Segoe UI', system-ui, -apple-system, Arial, sans-serif
```

**기준:**
- 실제 사용 폰트를 식별 (웹 폰트 또는 시스템)
- iOS/Android/Windows/macOS 모두 확인
- mono-space 폰트 (차트, 숫자) 별도 기록

### Weight / Size / Spacing

| 요소 | Weight | Size 범위 | Letter-spacing | Line-height |
|---|---|---|---|---|
| 디스플레이 (H1) | 700 | 28~48pt | -0.02em ~ 0em | 1.2~1.3 |
| 서브헤드 (H2) | 600 | 18~24pt | -0.01em ~ 0em | 1.3~1.4 |
| 본문 | 400 | 12~16pt | 0em | 1.6~1.8 |
| 라벨 | 600 | 10~12pt | 0.05em | 1.4 |
| 숫자 (차트) | 700 | 10~14pt | 0em | 1.4 |

**기준:**
- 각 요소마다 최소값과 최대값 기록 (반응형 시스템 고려)
- letter-spacing은 em 단위로 (음수면 압축, 양수면 확대)
- line-height는 배수로 (1.6 = 160%)

---

## 2.3 레이아웃 그리드

### 슬라이드 비율
- 16:9 (최신), 4:3 (구식), 16:10 (드문) 등

### 기본 패딩
```
본문 슬라이드:  padding: 6cqi 7cqi 8cqi (좌 우 하)
표지 / 마무리: padding: 8cqi 8cqi 6cqi
```

**기준:**
- `px` vs `cqi` vs `em` vs `%` 중 어떤 단위인지 확인
- 슬라이드별로 상/좌우/하 패딩이 다를 수 있음
- 절대값이 아니면 상대값(%)으로 기록

### 그리드 시스템
```
컬럼: 12 컬럼 또는 자유
간격: 8px, 16px, 24px 등 일관된 스케일
```

**기준:**
- 슬라이드를 가상의 그리드로 나누어 컬럼 수 파악
- 요소 간 거리가 일관되는 단위 찾기
- 예: 8px의 배수 (8, 16, 24, 32, 40 ...)

### 페이지 번호 / 헤더 푸터
- 위치 (좌상, 우상, 중앙하 등)
- 폰트 크기
- 색상

---

## 2.4 데코레이션 요소

### 표지
```
배경색:    --forest-dark
로고:      중앙 또는 좌상단
텍스트:    회사명 (center, white)
메타:      좌하단 "April 2026", 우하단 "Confidential"
```

### 섹션 라벨
```
위치:      좌측, 6cqi 내어쓰기
색상:      --green-dark 또는 --lime-accent
폰트:      weight 600, letter-spacing 0.05em, 13~15pt
```

예: `[Mission]`, `[Problem]`, `[Product]`

### 카드 / 박스
```
배경:      --lime-pale (#E8F0BF) 또는 --lime-accent
테두리:    1px solid --line
그림자:    subtle (blur 4px, offset 0 2px)
내부 패딩: 3cqi
```

### 테이블
```
헤더 배경:     --lime-pale
테두리:        --line (1px)
강조 셀:       --highlight (테두리) 또는 굵음
대체 행 색:    없거나 매우 옅은 배경
```

### 차트
```
자사 데이터:   --forest-dark (#0B5A3C)
경쟁사 데이터: #CCCCCC (연한 회색)
축 라벨:       10pt, --muted
범례:          하단, font-size 0.85em
```

### 특수 장식
- 코너 괄호 (한쪽만? 모서리 4곳?)
- 선 (수평 구분선? 위치?)
- 패턴 / 질감 (paper grain 오버레이? 색상?)
- SVG 아이콘 (색상, 크기, 스타일)

---

## 2.5 인터랙션

### 네비게이션
- 클릭 좌/우 영역으로 슬라이드 이동?
- 화살표 키 지원?
- 스크롤?
- 터치 스와이프?

### 전체화면 모드
```
body { overflow: hidden; }
.slide { width: 100vw; height: 100vh; }
```

### 프린트 / PDF
```
@media print {
  .slide { page-break-after: always; }
}
```

---

## 예제: Liner IR Pitch Deck

| 항목 | 값 |
|---|---|
| 슬라이드 비율 | 16:9 |
| 기본 패딩 | 6cqi 7cqi 8cqi |
| 색상 개수 | 10개 |
| 레이아웃 종류 | 9가지 |
| 제목 style | weight 700, letter-spacing 0 |
| 본문 line-height | 1.6~1.8 |
| 표지 배경 | #0B5A3C |
| 강조색 | #C4D96F, #E8F0BF |
| 네비게이션 | 클릭, 화살표 키 |


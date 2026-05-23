# slide library

🔗 **Live gallery**: <https://airoasting.github.io/slide_library/>

**slide library**는 코딩 에이전트가 사용자의 브리프에 맞는 템플릿을 골라 슬라이드 덱을 자동으로 만들어 낼 수 있도록 설계한 재사용형 HTML 슬라이드 템플릿 라이브러리입니다.

**두 가지 사용 방법:**
1. **새 슬라이드 생성**: 35개 템플릿 중 선택하고 콘텐츠 입력
2. **기존 슬라이드 분석** (🆕): `slide-clone` 스킬로 PDF/PowerPoint의 디자인 시스템을 자동 추출

에이전트는 [`AGENTS.md`](./AGENTS.md)를 먼저 읽어 주세요. `index.json`을 해석하고, 사용자 요청을 템플릿과 매칭하고, 템플릿을 복제한 뒤 콘텐츠를 적용하는 절차가 그 문서에 모두 정리되어 있습니다. 

기존 슬라이드를 새 템플릿으로 재현하고 싶으면 [`slide-clone/SKILL.md`](./slide-clone/SKILL.md)를 참조하세요.

## Get started

### 방법 1: 슬라이드 덱 생성 (추천)
코딩 에이전트에게 아래 문장을 그대로 전달하면 됩니다.

```
Clone the slide library repo and follow the instructions in AGENTS.md to build me a professional HTML slide deck.
```

### 방법 2: slide-clone 스킬 (기존 슬라이드 분석)

기존 PDF나 PowerPoint 파일의 디자인을 분석해서 완전한 시스템 프롬프트를 자동으로 생성합니다.

```bash
@/path/to/your/deck.pdf 이걸로 프롬프트 만들어줘
```

**slide-clone이 하는 것:**
- 색상 팔레트, 타이포그래피, 레이아웃 그리드 자동 추출
- 슬라이드 레이아웃 타입 분류 (9가지)
- 콘텐츠 작성 규칙 문서화
- 완전한 시스템 프롬프트 생성 (§1~§10)
- 기본값: **PPTX** (사용자가 HTML을 원하면 요청 시 생성)

**결과물:**
```
~/Desktop/{파일명}-prompt.md (15~20KB)
```

사용 예:
```bash
@~/Desktop/LINER/[IR Pitch Deck] Liner KR.pdf 이걸로 프롬프트 만들어줘
→ ~/Desktop/[IR Pitch Deck] Liner KR-prompt.md 자동 생성
```

자세한 설명은 [`slide-clone/SKILL.md`](./slide-clone/SKILL.md) 참조.

---

## 📊 템플릿 갤러리

총 35개 템플릿을 6개 카테고리로 나누어 정리했습니다. 각 카드는 대표 슬라이드 3장(커버, 중반, 후반)을 보여 주고, 카드 순서는 `index.html`의 분류 순서와 같습니다.

1. **컨설팅 펌** (3종)
2. **정중·기관형** IR / 이사회 / 학술 / 화이트페이퍼 (6종)
3. **에디토리얼·매거진·포스터** (8종)
4. **브랜드·라이프스타일·호스피탈리티** (7종)
5. **크리에이티브 스튜디오·에이전시·스타트업** (7종)
6. **레트로·플레이풀·노스탤지어** (4종)

---

## 1. 컨설팅 펌

### [맥킨지 네이비 (McKinsey Navy)](./templates/mckinsey-navy/)

<p>
  <img src="./screenshots/mckinsey-navy-1.png" width="32.5%" alt="맥킨지 네이비 슬라이드 1" />
  <img src="./screenshots/mckinsey-navy-2.png" width="32.5%" alt="맥킨지 네이비 슬라이드 2" />
  <img src="./screenshots/mckinsey-navy-3.png" width="32.5%" alt="맥킨지 네이비 슬라이드 3" />
</p>

> 딥 네이비 캔버스에 풍부한 여백과 액션 타이틀 구조를 얹은 시그니처 무드입니다. 전략 보고서, 이사회 발표, M&A 자문에 잘 어울립니다.

### [베인 레드 (Bain Red)](./templates/bain-red/)

<p>
  <img src="./screenshots/bain-red-1.png" width="32.5%" alt="베인 레드 슬라이드 1" />
  <img src="./screenshots/bain-red-2.png" width="32.5%" alt="베인 레드 슬라이드 2" />
  <img src="./screenshots/bain-red-3.png" width="32.5%" alt="베인 레드 슬라이드 3" />
</p>

> 화이트 캔버스 위에 시그니처 레드를 얹은 디자인입니다. 깔끔한 그리드와 결과 중심의 톤이 실행 로드맵이나 PE 듀딜리전스에 잘 맞습니다.

### [비씨지 그린 (BCG Green)](./templates/bcg-green/)

<p>
  <img src="./screenshots/bcg-green-1.png" width="32.5%" alt="비씨지 그린 슬라이드 1" />
  <img src="./screenshots/bcg-green-2.png" width="32.5%" alt="비씨지 그린 슬라이드 2" />
  <img src="./screenshots/bcg-green-3.png" width="32.5%" alt="비씨지 그린 슬라이드 3" />
</p>

> 시그니처 다크 그린과 절제된 그리드로 사고의 깊이를 강조하는 프로페셔널 스타일입니다. 성장 점유율 분석이나 디지털 전환 로드맵에 어울립니다.

---

## 2. 정중·기관형 (IR / 이사회 / 학술 / 화이트페이퍼)

### [네이비 골드 (Navy Gold)](./templates/navy-gold/)

<p>
  <img src="./screenshots/navy-gold-1.png" width="32.5%" alt="네이비 골드 슬라이드 1" />
  <img src="./screenshots/navy-gold-8.png" width="32.5%" alt="네이비 골드 슬라이드 8" />
  <img src="./screenshots/navy-gold-18.png" width="32.5%" alt="네이비 골드 슬라이드 18" />
</p>

> 짙은 남색 배경에 골드 포인트를 더한 묵직한 톤입니다. 이사회, IR, 정책 보고 자리에 잘 어울립니다.

### [딥 네이비 서재 (Deep Navy Library)](./templates/navy-library/)

<p>
  <img src="./screenshots/navy-library-1.png" width="32.5%" alt="딥 네이비 서재 슬라이드 1" />
  <img src="./screenshots/navy-library-4.png" width="32.5%" alt="딥 네이비 서재 슬라이드 4" />
  <img src="./screenshots/navy-library-8.png" width="32.5%" alt="딥 네이비 서재 슬라이드 8" />
</p>

> 어두운 남색 위에 따뜻한 노란 글자를 얹은 차분한 학구적 무드입니다. 논문이나 리서치 보고서에 잘 맞습니다.

### [흑백 타이포 (Black & White Typo)](./templates/bw-typo/)

<p>
  <img src="./screenshots/bw-typo-1.png" width="32.5%" alt="흑백 타이포 슬라이드 1" />
  <img src="./screenshots/bw-typo-4.png" width="32.5%" alt="흑백 타이포 슬라이드 4" />
  <img src="./screenshots/bw-typo-12.png" width="32.5%" alt="흑백 타이포 슬라이드 12" />
</p>

> 아이보리 종이에 검정 글자만 올렸습니다. 색을 빼고 글자만으로 말하는 덱입니다.

### [차분한 클래식 (Calm Classic)](./templates/calm-classic/)

<p>
  <img src="./screenshots/calm-classic-1.png" width="32.5%" alt="차분한 클래식 슬라이드 1" />
  <img src="./screenshots/calm-classic-4.png" width="32.5%" alt="차분한 클래식 슬라이드 4" />
  <img src="./screenshots/calm-classic-8.png" width="32.5%" alt="차분한 클래식 슬라이드 8" />
</p>

> 따뜻한 중립 색상에 클래식 글꼴을 얹었습니다. 정제되고 여유로운 톤이 살아납니다.

### [소프트 클래식 (Soft Classic)](./templates/soft-classic/)

<p>
  <img src="./screenshots/soft-classic-4.png" width="32.5%" alt="소프트 클래식 슬라이드 4" />
  <img src="./screenshots/soft-classic-6.png" width="32.5%" alt="소프트 클래식 슬라이드 6" />
  <img src="./screenshots/soft-classic-10.png" width="32.5%" alt="소프트 클래식 슬라이드 10" />
</p>

> 따뜻한 종이에 파스텔 포인트를 살린 디자인입니다. 우아하고 조용한 인상을 줍니다.

### [모눈종이 블루 (Grid Paper Blue)](./templates/grid-blue/)

<p>
  <img src="./screenshots/grid-blue-1.png" width="32.5%" alt="모눈종이 블루 슬라이드 1" />
  <img src="./screenshots/grid-blue-3.png" width="32.5%" alt="모눈종이 블루 슬라이드 3" />
  <img src="./screenshots/grid-blue-5.png" width="32.5%" alt="모눈종이 블루 슬라이드 5" />
</p>

> 모눈종이 위에 짙은 파랑 글꼴을 올렸습니다. 리서치나 디자인 리포트에 어울리는 모더니스트 무드입니다.

---

## 3. 에디토리얼·매거진·포스터

### [다크 매거진 (Dark Magazine)](./templates/dark-magazine/)

<p>
  <img src="./screenshots/dark-magazine-1.png" width="32.5%" alt="다크 매거진 슬라이드 1" />
  <img src="./screenshots/dark-magazine-4.png" width="32.5%" alt="다크 매거진 슬라이드 4" />
  <img src="./screenshots/dark-magazine-13.png" width="32.5%" alt="다크 매거진 슬라이드 13" />
</p>

> 어두운 캔버스 위에 오렌지 한 점을 찍었습니다. 매거진 표지처럼 떨어지는 덱입니다.

### [대형 포스터 (Bold Poster)](./templates/bold-poster/)

<p>
  <img src="./screenshots/bold-poster-1.png" width="32.5%" alt="대형 포스터 슬라이드 1" />
  <img src="./screenshots/bold-poster-4.png" width="32.5%" alt="대형 포스터 슬라이드 4" />
  <img src="./screenshots/bold-poster-8.png" width="32.5%" alt="대형 포스터 슬라이드 8" />
</p>

> 큰 글씨에 빨간 포인트 하나를 더했습니다. 포스터처럼 강렬한 발표에 잘 어울립니다.

### [캠페인 포스터 (Campaign Poster)](./templates/campaign-poster/)

<p>
  <img src="./screenshots/campaign-poster-1.png" width="32.5%" alt="캠페인 포스터 슬라이드 1" />
  <img src="./screenshots/campaign-poster-4.png" width="32.5%" alt="캠페인 포스터 슬라이드 4" />
  <img src="./screenshots/campaign-poster-8.png" width="32.5%" alt="캠페인 포스터 슬라이드 8" />
</p>

> 크림 바탕 위에 파랑, 주황, 빨강을 올렸습니다. 캠페인이나 커뮤니티 발표에 어울리는 액티비스트 에너지가 있습니다.

### [3색 매거진 (Tri-Color Magazine)](./templates/tri-color-magazine/)

<p>
  <img src="./screenshots/tri-color-magazine-1.png" width="32.5%" alt="3색 매거진 슬라이드 1" />
  <img src="./screenshots/tri-color-magazine-3.png" width="32.5%" alt="3색 매거진 슬라이드 3" />
  <img src="./screenshots/tri-color-magazine-4.png" width="32.5%" alt="3색 매거진 슬라이드 4" />
</p>

> 분홍, 크림, 와인색 세 가지로 구성했습니다. 패션 매거진 무드에 가깝습니다.

### [레트로 잡지 (Retro Magazine)](./templates/retro-magazine/)

<p>
  <img src="./screenshots/retro-magazine-1.png" width="32.5%" alt="레트로 잡지 슬라이드 1" />
  <img src="./screenshots/retro-magazine-4.png" width="32.5%" alt="레트로 잡지 슬라이드 4" />
  <img src="./screenshots/retro-magazine-8.png" width="32.5%" alt="레트로 잡지 슬라이드 8" />
</p>

> 베이지 종이에 초록 포인트를 더했습니다. 인디 잡지나 수공예 느낌이 납니다.

### [흙빛 아카이브 (Earth Archive)](./templates/earth-archive/)

<p>
  <img src="./screenshots/earth-archive-1.png" width="32.5%" alt="흙빛 아카이브 슬라이드 1" />
  <img src="./screenshots/earth-archive-3.png" width="32.5%" alt="흙빛 아카이브 슬라이드 3" />
  <img src="./screenshots/earth-archive-8.png" width="32.5%" alt="흙빛 아카이브 슬라이드 8" />
</p>

> 흙빛 6색 팔레트에 스텐실 글씨를 얹었습니다. 박물관이나 공예 브랜드에 잘 맞습니다.

### [선샤인 옐로 (Sunshine Yellow)](./templates/sunshine-yellow/)

<p>
  <img src="./screenshots/sunshine-yellow-1.png" width="32.5%" alt="선샤인 옐로 슬라이드 1" />
  <img src="./screenshots/sunshine-yellow-5.png" width="32.5%" alt="선샤인 옐로 슬라이드 5" />
  <img src="./screenshots/sunshine-yellow-8.png" width="32.5%" alt="선샤인 옐로 슬라이드 8" />
</p>

> 따뜻한 종이 위에 노란 햇살을 담았습니다. 전시나 문화 행사에 어울리는 에디토리얼 포스터입니다.

### [핀 노트 (Pin Note)](./templates/pin-note/)

<p>
  <img src="./screenshots/pin-note-1.png" width="32.5%" alt="핀 노트 슬라이드 1" />
  <img src="./screenshots/pin-note-3.png" width="32.5%" alt="핀 노트 슬라이드 3" />
  <img src="./screenshots/pin-note-11.png" width="32.5%" alt="핀 노트 슬라이드 11" />
</p>

> 노란 종이에 핀 그림과 손글씨를 올렸습니다. 정성을 들인 수공예 같은 느낌이 납니다.

---

## 4. 브랜드·라이프스타일·호스피탈리티

### [나이트 핑크 (Night Pink)](./templates/night-pink/)

<p>
  <img src="./screenshots/night-pink-1.png" width="32.5%" alt="나이트 핑크 슬라이드 1" />
  <img src="./screenshots/night-pink-4.png" width="32.5%" alt="나이트 핑크 슬라이드 4" />
  <img src="./screenshots/night-pink-8.png" width="32.5%" alt="나이트 핑크 슬라이드 8" />
</p>

> 검정 배경에 핫핑크 포인트를 더했습니다. 세련되고 럭셔리한 심야 에디토리얼입니다.

### [숲속 그린 (Forest Green)](./templates/forest-green/)

<p>
  <img src="./screenshots/forest-green-1.png" width="32.5%" alt="숲속 그린 슬라이드 1" />
  <img src="./screenshots/forest-green-4.png" width="32.5%" alt="숲속 그린 슬라이드 4" />
  <img src="./screenshots/forest-green-8.png" width="32.5%" alt="숲속 그린 슬라이드 8" />
</p>

> 짙은 초록 배경에 크림색 글자를 얹었습니다. 자연이나 웰니스 브랜드에 잘 어울립니다.

### [다크 코랄 (Dark Coral)](./templates/coral/)

<p>
  <img src="./screenshots/coral-1.png" width="32.5%" alt="다크 코랄 슬라이드 1" />
  <img src="./screenshots/coral-4.png" width="32.5%" alt="다크 코랄 슬라이드 4" />
  <img src="./screenshots/coral-8.png" width="32.5%" alt="다크 코랄 슬라이드 8" />
</p>

> 어두운 배경 위에 산호색과 크림을 올렸습니다. 패션이나 라이프스타일 분야에 잘 맞습니다.

### [올리브 모던 (Olive Modern)](./templates/olive-modern/)

<p>
  <img src="./screenshots/olive-modern-1.png" width="32.5%" alt="올리브 모던 슬라이드 1" />
  <img src="./screenshots/olive-modern-4.png" width="32.5%" alt="올리브 모던 슬라이드 4" />
  <img src="./screenshots/olive-modern-8.png" width="32.5%" alt="올리브 모던 슬라이드 8" />
</p>

> 올리브색 배경에 크림과 주황 포인트를 더했습니다. 건축, 인테리어, 공예 브랜드에 어울리는 미드센추리 무드입니다.

### [따뜻한 크림 (Warm Cream)](./templates/warm-cream/)

<p>
  <img src="./screenshots/warm-cream-1.png" width="32.5%" alt="따뜻한 크림 슬라이드 1" />
  <img src="./screenshots/warm-cream-3.png" width="32.5%" alt="따뜻한 크림 슬라이드 3" />
  <img src="./screenshots/warm-cream-7.png" width="32.5%" alt="따뜻한 크림 슬라이드 7" />
</p>

> 크림색 배경에 벽돌색 포인트를 얹었습니다. 모임, 레스토랑, 이벤트에 어울리는 호스피탈리티 무드입니다.

### [복숭아 톤 (Peach Tone)](./templates/peach-tone/)

<p>
  <img src="./screenshots/peach-tone-1.png" width="32.5%" alt="복숭아 톤 슬라이드 1" />
  <img src="./screenshots/peach-tone-6.png" width="32.5%" alt="복숭아 톤 슬라이드 6" />
  <img src="./screenshots/peach-tone-8.png" width="32.5%" alt="복숭아 톤 슬라이드 8" />
</p>

> 복숭아색 배경이 다정한 톤을 만들어 줍니다. 소규모 브랜드나 크리에이터에게 잘 맞습니다.

### [파스텔 카드 (Pastel Card)](./templates/pastel-card/)

<p>
  <img src="./screenshots/pastel-card-1.png" width="32.5%" alt="파스텔 카드 슬라이드 1" />
  <img src="./screenshots/pastel-card-4.png" width="32.5%" alt="파스텔 카드 슬라이드 4" />
  <img src="./screenshots/pastel-card-8.png" width="32.5%" alt="파스텔 카드 슬라이드 8" />
</p>

> 둥근 카드 모양에 파스텔 팝 색상을 입혔습니다. 밝고 귀여운 무드가 살아납니다.

---

## 5. 크리에이티브 스튜디오·에이전시·스타트업

### [블랙 옐로 (Black Yellow)](./templates/black-yellow/)

<p>
  <img src="./screenshots/black-yellow-1.png" width="32.5%" alt="블랙 옐로 슬라이드 1" />
  <img src="./screenshots/black-yellow-4.png" width="32.5%" alt="블랙 옐로 슬라이드 4" />
  <img src="./screenshots/black-yellow-8.png" width="32.5%" alt="블랙 옐로 슬라이드 8" />
</p>

> 검정 배경에 노란 글자를 올렸습니다. 강렬하고 대비가 높은 디자인 스튜디오 무드입니다.

### [형광 옐로 (Neon Yellow)](./templates/neon-yellow/)

<p>
  <img src="./screenshots/neon-yellow-1.png" width="32.5%" alt="형광 옐로 슬라이드 1" />
  <img src="./screenshots/neon-yellow-3.png" width="32.5%" alt="형광 옐로 슬라이드 3" />
  <img src="./screenshots/neon-yellow-8.png" width="32.5%" alt="형광 옐로 슬라이드 8" />
</p>

> 흰 종이에 형광 노랑 포인트 하나를 찍었습니다. 강렬하고 모던한 에디토리얼 네오브루탈리즘입니다.

### [소프트 뉴모피즘 (Soft Neumorph)](./templates/soft-neumorph/)

<p>
  <img src="./screenshots/soft-neumorph-1.png" width="32.5%" alt="소프트 뉴모피즘 슬라이드 1" />
  <img src="./screenshots/soft-neumorph-3.png" width="32.5%" alt="소프트 뉴모피즘 슬라이드 3" />
  <img src="./screenshots/soft-neumorph-7.png" width="32.5%" alt="소프트 뉴모피즘 슬라이드 7" />
</p>

> 부드러운 블루 그레이 캔버스에 양각과 음각 그림자를 더해 촉각형 디자인을 만들었습니다.

### [컬러 블록 (Color Block)](./templates/color-block/)

<p>
  <img src="./screenshots/color-block-1.png" width="32.5%" alt="컬러 블록 슬라이드 1" />
  <img src="./screenshots/color-block-4.png" width="32.5%" alt="컬러 블록 슬라이드 4" />
  <img src="./screenshots/color-block-8.png" width="32.5%" alt="컬러 블록 슬라이드 8" />
</p>

> 파스텔 컬러 블록에 굵은 검정 테두리를 둘렀습니다. 산뜻하면서도 대담한 네오브루탈 덱입니다.

### [알록달록 크리에이티브 (Colorful Creative)](./templates/colorful-creative/)

<p>
  <img src="./screenshots/colorful-creative-1.png" width="32.5%" alt="알록달록 크리에이티브 슬라이드 1" />
  <img src="./screenshots/colorful-creative-4.png" width="32.5%" alt="알록달록 크리에이티브 슬라이드 4" />
  <img src="./screenshots/colorful-creative-6.png" width="32.5%" alt="알록달록 크리에이티브 슬라이드 6" />
</p>

> 크림 배경 위에 초록, 분홍, 주황, 노랑을 함께 올렸습니다. 밝고 활기찬 무드입니다.

### [거친 그리드 (Rough Grid)](./templates/rough-grid/)

<p>
  <img src="./screenshots/rough-grid-1.png" width="32.5%" alt="거친 그리드 슬라이드 1" />
  <img src="./screenshots/rough-grid-4.png" width="32.5%" alt="거친 그리드 슬라이드 4" />
  <img src="./screenshots/rough-grid-8.png" width="32.5%" alt="거친 그리드 슬라이드 8" />
</p>

> 두꺼운 테두리와 그림자에 분홍, 초록, 잉크색의 에너지를 더했습니다.

### [포스트잇 보드 (Post-it Board)](./templates/postit-board/)

<p>
  <img src="./screenshots/postit-board-1.png" width="32.5%" alt="포스트잇 보드 슬라이드 1" />
  <img src="./screenshots/postit-board-4.png" width="32.5%" alt="포스트잇 보드 슬라이드 4" />
  <img src="./screenshots/postit-board-8.png" width="32.5%" alt="포스트잇 보드 슬라이드 8" />
</p>

> 파스텔 포스트잇과 손글씨로 구성했습니다. 브레인스토밍이나 워크숍에 잘 어울립니다.

---

## 6. 레트로·플레이풀·노스탤지어

### [네온 픽셀 (Neon Pixel)](./templates/neon-pixel/)

<p>
  <img src="./screenshots/neon-pixel-1.png" width="32.5%" alt="네온 픽셀 슬라이드 1" />
  <img src="./screenshots/neon-pixel-5.png" width="32.5%" alt="네온 픽셀 슬라이드 5" />
  <img src="./screenshots/neon-pixel-6.png" width="32.5%" alt="네온 픽셀 슬라이드 6" />
</p>

> 어두운 우주 배경 위에 네온 픽셀 아트를 얹었습니다. 게임 무드 발표에 잘 어울립니다.

### [윈도우 95 (Windows 95)](./templates/windows-95/)

<p>
  <img src="./screenshots/windows-95-1.png" width="32.5%" alt="윈도우 95 슬라이드 1" />
  <img src="./screenshots/windows-95-4.png" width="32.5%" alt="윈도우 95 슬라이드 4" />
  <img src="./screenshots/windows-95-8.png" width="32.5%" alt="윈도우 95 슬라이드 8" />
</p>

> 90년대 윈도우를 그대로 가져왔습니다. 회색 창과 픽셀 글꼴까지 완벽하게 복고를 살렸습니다.

### [레트로 카세트 (Retro Cassette)](./templates/retro-cassette/)

<p>
  <img src="./screenshots/retro-cassette-1.png" width="32.5%" alt="레트로 카세트 슬라이드 1" />
  <img src="./screenshots/retro-cassette-3.png" width="32.5%" alt="레트로 카세트 슬라이드 3" />
  <img src="./screenshots/retro-cassette-4.png" width="32.5%" alt="레트로 카세트 슬라이드 4" />
</p>

> 옛날 카세트 포장 무드를 가져왔습니다. 크림 종이에 무지개 리본을 더했습니다.

### [꽃그림 파스텔 (Floral Pastel)](./templates/floral-pastel/)

<p>
  <img src="./screenshots/floral-pastel-1.png" width="32.5%" alt="꽃그림 파스텔 슬라이드 1" />
  <img src="./screenshots/floral-pastel-4.png" width="32.5%" alt="꽃그림 파스텔 슬라이드 4" />
  <img src="./screenshots/floral-pastel-8.png" width="32.5%" alt="꽃그림 파스텔 슬라이드 8" />
</p>

> 꽃, 별, 무지개 손그림이 어우러진 파스텔 덱입니다. 교육이나 어린이 콘텐츠에 잘 맞습니다.

---

## 업데이트 내역

### v2.0 (2026-05-23)
모바일 사용성과 디테일 마감을 마쳤고, 저장소를 외부 공개에 맞게 정리했습니다. 이 버전부터는 누구나 그대로 클론해 바로 쓸 수 있습니다.

### v1.2 (2026-05-19)
모바일 추천 영역을 가로 스크롤 카루셀로 바꿨고, 인덱스 페이지의 깨진 링크와 누락된 템플릿을 채웠습니다. 사용자가 둘러보는 동선이 한결 매끄러워졌습니다.

### v1.1 (2026-05-16)
warm-cream 템플릿의 브랜드를 AI ROASTING으로 통일했고, 한국어 카피를 실제 서울 화법으로 다시 썼습니다. tri-color-magazine에는 호스트 색과 슬라이드 색이 함께 바뀌는 트랜지션을 넣어 매거진 톤 템플릿의 완성도를 끌어올렸습니다.

### v1.0 (2026-05-15)
산출물 기본 형식을 HTML에서 PPTX로 바꿨고, 기존 슬라이드를 분석해 시스템 프롬프트를 역추출하는 `slide-clone` 스킬을 추가했습니다. 인덱스 페이지는 레트로 카세트 톤으로 다시 디자인했고, 사이트 제목도 `AI ROASTING · Slide Library`로 정식화했습니다. 이 시점부터 라이브러리는 단순 갤러리를 넘어 생성 도구로 확장됐습니다.

### v0.2 (2026-05-11)
모든 템플릿에 `prompt.md`를 붙였고, 그 결과 각 템플릿이 그 자체로 재사용 가능한 자산이 됐습니다. 히어로 영역은 3-up coverflow 캐러셀로 재설계했고, README와 가이드 톤은 입니다체로 통일했습니다.

### v0.1 (2026-05-09, 최초 공개)
슬라이드 라이브러리를 처음 공개했습니다. 템플릿, 스크린샷, 런타임 셋업, OG 메타까지 한 묶음으로 정리해 외부에서 바로 접근할 수 있게 만들었습니다.

---

> [zarazhangrui/beautiful-html-templates](https://github.com/zarazhangrui/beautiful-html-templates)에서 영감을 얻었습니다.

## License

[MIT](./LICENSE) © 2026 AI Roasting. 자유롭게 사용, 수정, 배포할 수 있습니다.

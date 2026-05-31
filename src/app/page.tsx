import Link from "next/link";
import {
  SubscribeDiagram,
  InstanceMapDiagram,
  StateLayersDiagram,
  FrameworkOverviewDiagram,
  ComponentTaxonomyDiagram,
  SystemsDiagram,
} from "./diagrams";

/* 발표 필수 5항 구성:
 *   01. About (게임 소개) — 스크린샷 + 한줄 컨셉
 *   02. How to Play — 룰 + 조작 + 흐름도
 *   03. Instance Map — 런타임 GameObject + dangling 부록 (pooling vs dynamic)
 *   04. Class Diagram — 여러 sub-section
 *        a. Framework Overview
 *        b. State 계층 (Two Layers)
 *        c. Component Taxonomy
 *        d. Systems
 *        e. ★ 특이한 부분 1: Subscribe 패턴 (7 step)
 *        f. ★ 특이한 부분 2: StateCallbacks 응집
 *        g. ★ 특이한 부분 3: Pooling vs Dynamic + reserve
 *   05. Demo
 */

const slides = [
  { num: "01", id: "about",     label: "About" },
  { num: "02", id: "rules",     label: "How to Play" },
  { num: "03", id: "instances", label: "Instance Map" },
  { num: "04", id: "diagram",   label: "Class Diagram ★" },
  { num: "05", id: "demo",      label: "Demo" },
];

const titles: Record<string, string> = {
  about:     "게임 소개 및 플레이방법",
  rules:     "게임 룰 설명",
  instances: "오브젝트 인스턴스 맵",
  diagram:   "클래스 다이어그램",
  demo:      "게임 실행 데모",
};

export default function Home() {
  return (
    <>
      {/* NAV */}
      <header className="sticky top-0 z-50 bg-canvas/95 backdrop-blur border-b border-hairline">
        <div className="mx-auto max-w-[1280px] flex items-center justify-between px-6 lg:px-12 h-16">
          <Link href="#top" className="t-link-sm text-ink lowercase">
            custom game engine
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            {slides.map((s) => (
              <a key={s.id} href={`#${s.id}`} className="t-link-sm text-ink-soft hover:text-ink">
                {s.label}
              </a>
            ))}
          </nav>
          <a href="https://github.com/RyuDongHo/custom-game-engine" className="btn-primary">
            View Repo
          </a>
        </div>
      </header>

      {/* HERO */}
      <section
        id="top"
        className="text-on-primary"
        style={{ backgroundColor: "var(--color-scrim)" }}
      >
        <div className="mx-auto max-w-[1280px] px-6 lg:px-12 py-[96px] lg:py-[140px] min-h-[72vh] flex flex-col justify-end">
          <p className="t-eyebrow text-on-primary/70">
            2026 · Game Programming · Presentation
          </p>
          <h1 className="t-display mt-6 max-w-[20ch]">
            DirectX 11 위의 작은 2D 게임 — Subscribe로 엮인 엔진.
          </h1>
          <p className="t-subtitle mt-8 max-w-[44ch] text-on-primary/80">
            5분짜리 플레이, 그 뒤에 Component-Entity / Observable State /
            비동기 Firebase 로깅이 조용히 돌아간다.
          </p>
          <div className="mt-12 flex gap-3">
            <a href="#about" className="btn-primary-on-dark">Start</a>
            <a
              href="#diagram"
              className="t-link-sm self-center text-on-primary/80 underline underline-offset-4"
            >
              Jump to Class Diagram →
            </a>
          </div>
        </div>
      </section>

      {/* PROGRAMME INDEX */}
      <section className="bg-canvas">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-12 py-[72px]">
          <p className="t-eyebrow text-graphite">Programme</p>
          <ul className="mt-10 divide-y divide-hairline border-y border-hairline">
            {slides.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className="group flex items-baseline justify-between py-6 hover:bg-canvas-warm transition"
                >
                  <span className="flex items-baseline gap-8">
                    <span className="t-meta text-stone w-10">{s.num}</span>
                    <span className="t-heading-sm text-ink">{titles[s.id]}</span>
                  </span>
                  <span className="t-link-sm text-graphite group-hover:text-ink">
                    {s.label} →
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          01. About — 게임 소개 + 스크린샷
      ════════════════════════════════════════════ */}
      <section id="about" className="bg-canvas border-t border-hairline scroll-mt-16">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-12 py-[96px] lg:py-[140px]">
          <div className="flex items-baseline gap-8">
            <span className="t-meta text-stone w-10">01</span>
            <p className="t-eyebrow text-graphite">About</p>
          </div>
          <h2 className="t-display mt-8 max-w-[22ch]">
            평지 위에서, 적을 베고 별을 줍는다.
          </h2>

          <div className="mt-12 grid grid-cols-12 gap-x-8 gap-y-12">
            <p className="col-span-12 lg:col-span-7 t-subtitle text-graphite">
              평지 한 화면 안에서 끊임없이 몰려드는 적을 검으로 막아내는
              생존형 액션. 사망한 적이 떨어뜨리는 별을 모아 점수를 올리고,
              시간이 갈수록 빨라지는 적의 압박을 견디는 시간 싸움이다.
            </p>
            <ul className="col-span-12 lg:col-span-5 lg:col-start-8 t-body text-graphite space-y-3 border-t border-hairline pt-6">
              <li><span className="t-body-strong text-ink">장르 · </span>2D 액션 / 생존</li>
              <li><span className="t-body-strong text-ink">플랫폼 · </span>Windows (DirectX 11)</li>
              <li><span className="t-body-strong text-ink">제어 · </span>키보드 단독</li>
              <li><span className="t-body-strong text-ink">세션 · </span>~5분 (난이도 곡선 무한)</li>
            </ul>
          </div>

          {/* 스크린샷 4 자리 */}
          <div className="mt-16 grid grid-cols-12 gap-6">
            {[
              { label: "메인 화면", tag: "Title" },
              { label: "초기 플레이 — 흙갈색 배경", tag: "Lv 1" },
              { label: "중반 — 적이 빨라짐", tag: "Lv 10" },
              { label: "후반 — 핏빛 배경", tag: "Lv 20+" },
            ].map((m) => (
              <figure key={m.label} className="col-span-12 sm:col-span-6 space-y-3">
                <div
                  className="aspect-video w-full"
                  style={{
                    backgroundColor: "var(--color-surface-cool)",
                    borderRadius: "var(--r-md)",
                  }}
                />
                <figcaption className="flex justify-between items-baseline">
                  <span className="t-body-strong text-ink">{m.label}</span>
                  <span className="t-micro-caps text-slate">{m.tag}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          02. How to Play — 룰 + 조작 + 흐름도
      ════════════════════════════════════════════ */}
      <section id="rules" className="bg-canvas border-t border-hairline scroll-mt-16">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-12 py-[96px] lg:py-[140px]">
          <div className="flex items-baseline gap-8">
            <span className="t-meta text-stone w-10">02</span>
            <p className="t-eyebrow text-graphite">How to Play</p>
          </div>
          <h2 className="t-display mt-8 max-w-[22ch]">
            룰은 단순. 곡선만 점점 가파르다.
          </h2>

          {/* 조작 */}
          <div className="mt-16 grid grid-cols-12 gap-x-8 gap-y-12">
            <div className="col-span-12 lg:col-span-7">
              <p className="t-eyebrow text-graphite">Controls</p>
              <dl className="mt-6 divide-y divide-hairline border-t border-b border-hairline">
                {[
                  ["WASD / 방향키", "이동"],
                  ["Space", "검 공격 (전방 hitbox)"],
                  ["F", "전체화면 토글"],
                  ["ESC", "종료"],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between py-3">
                    <dt className="t-body-strong text-ink">{k}</dt>
                    <dd className="t-body text-graphite">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="col-span-12 lg:col-span-5">
              <p className="t-eyebrow text-graphite">Score</p>
              <ul className="t-body text-graphite mt-6 space-y-2 list-disc pl-6">
                <li>적 1마리 처치 → 사망 위치에 별 생성</li>
                <li>플레이어가 별에 접촉 → 점수 +1</li>
                <li>점수는 <span className="text-ink">ScoreState</span>로 보관</li>
              </ul>
            </div>
          </div>

          {/* 흐름도 */}
          <div className="mt-20">
            <p className="t-eyebrow text-graphite">Game Flow</p>
            <pre className="code-block mt-6">
{`MainMenu ──[Space]──► Playing ──[HP=0]──► GameOver
                       │
                       │ every 10s
                       ▼
                  level += 1
                  enemy speed × (1 + 0.1·(level−1))
                  background brown → red`}
            </pre>
          </div>

          {/* 난이도 곡선 */}
          <div className="mt-12 grid grid-cols-12 gap-x-8 gap-y-8 border-t border-hairline pt-12">
            {[
              { n: "10s",  l: "Level 1 회 상승" },
              { n: "+10%", l: "레벨당 적 속도 증가" },
              { n: "5%",   l: "레벨당 배경 빨강 보간" },
              { n: "Lv 21+", l: "배경 완전 빨강 도달" },
            ].map((m) => (
              <div key={m.l} className="col-span-6 lg:col-span-3">
                <p className="t-display-sm text-ink">{m.n}</p>
                <p className="t-meta text-stone mt-3">{m.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          03. Instance Map (+ Pooling vs Dynamic 부록)
      ════════════════════════════════════════════ */}
      <section id="instances" className="bg-canvas border-t border-hairline scroll-mt-16">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-12 py-[96px] lg:py-[140px]">
          <div className="flex items-baseline gap-8">
            <span className="t-meta text-stone w-10">03</span>
            <p className="t-eyebrow text-graphite">Instance Map</p>
          </div>
          <h2 className="t-display mt-8 max-w-[22ch]">
            런타임에 실제로 살아 있는 것들.
          </h2>
          <p className="t-subtitle text-graphite mt-10 max-w-[58ch]">
            Player 1, Enemy 풀 100, Star는 적이 죽을 때마다 동적으로 추가.
            모두 GameLoop의 단일 <span className="text-ink">gameWorld</span>
            벡터 안에 들어 있다.
          </p>

          <div className="mt-16 border border-hairline rounded-[var(--r-lg)] bg-canvas-warm p-6 lg:p-10">
            <InstanceMapDiagram />
          </div>

          {/* ── 부록: dangling + Pooling vs Dynamic ── */}
          <div className="mt-24 border-t border-hairline pt-12">
            <p className="t-eyebrow text-graphite">Appendix</p>
            <h3 className="t-display-sm mt-6 max-w-[24ch]">
              GameObject가 늘어날 때 우리가 마주한 use-after-free.
            </h3>

            <div className="mt-16 grid grid-cols-12 gap-x-8 gap-y-6 border-t border-hairline pt-12">
              <div className="col-span-12 lg:col-span-3">
                <p className="t-meta text-stone">Case</p>
                <p className="t-eyebrow text-graphite mt-2">The Incident</p>
              </div>
              <div className="col-span-12 lg:col-span-9 space-y-6">
                <h4 className="t-heading-md">
                  적을 베면 디버거가 <span className="text-ink">0xFFFF…FFFB</span>를 띄웠다.
                </h4>
                <p className="t-body text-graphite">
                  검 한 번 → CombatSystem이 hitbox 안 적을 순회 → 한 마리 죽음 →
                  Subscribe 체인이 OnLifeEnemyDead 발화 → StarSpawner가
                  <span className="text-ink"> loop.AddGameObject(star)</span> 호출 →
                  내부적으로 <span className="text-ink">gameWorld.push_back</span>.
                </p>
                <p className="t-body text-graphite">
                  그 순간 vector capacity 초과 → <span className="text-ink">재할당</span>
                  → 옛 메모리 free. 하지만 CombatSystem의 range-based for는 옛
                  iterator를 잡고 있었다 → freed 메모리 read → debug heap의
                  sentinel <span className="text-ink">0xFFFF…FFFB</span> → access violation.
                </p>
                <pre className="code-block">
{`// CombatSystem.cpp — 사고 현장
for (GameObject* target : gameObjects) {  // begin/end iterator 캡쳐
    ...
    targetHs->SetCurrent(prev - hit.damage);
    //   ↓ Subscribe 도미노 발화
    //   ↓ → OnHealthAutoDeath → LifeState.SetDead
    //   ↓ → OnLifeEnemyDead   → StarSpawner.SpawnAt
    //   ↓ → loop.AddGameObject → gameWorld.push_back
    //   ↓ → vector 재할당 → 옛 메모리 free
}                                          // 다음 ++iter → 💥`}
                </pre>
              </div>
            </div>

            {/* Fix A · Pooling */}
            <div className="mt-16 grid grid-cols-12 gap-x-8 gap-y-6 border-t border-hairline pt-12">
              <div className="col-span-12 lg:col-span-3">
                <p className="t-meta text-stone">Fix · A</p>
                <p className="t-eyebrow text-graphite mt-2">Pooling</p>
              </div>
              <div className="col-span-12 lg:col-span-9 space-y-6">
                <h4 className="t-heading-md">생성을 게임 시작 전에 끝낸다 — Enemy.</h4>
                <p className="t-body text-graphite">
                  Enemy는 한 번 spawn된 뒤 죽고, 다시 spawn되고를 반복한다.
                  게임 시작 전에 100마리를 미리 생성해 풀에 넣고 활성/비활성만 토글.
                  <span className="text-ink"> 런타임에 push_back이 일어나지 않으므로
                  iterator invalidation 위험 자체가 없다.</span>
                </p>
                <pre className="code-block">
{`// main.cpp — 게임 루프 시작 전에 미리 생성
spawner1->PreAllocate(50);
spawner2->PreAllocate(50);
loop.Run();                          // 여기서부터 gameWorld 크기 불변

// EnemySpawner.cpp — 풀에서 꺼내쓰기
void Spawn() {
    if (inactivePool.empty()) return;
    GameObject* enemy = inactivePool.back();
    inactivePool.pop_back();
    enemy->position = randomSpawnPos();
    enemy->GetState<EnemyState>()->SetMove(...);
}

void ReturnToPool(GameObject* enemy) {
    enemy->position = { 100.0f, 100.0f, 10.0f };   // 영역 밖 격리
    enemy->GetState<EnemyState>()->SetDisabled();
    inactivePool.push_back(enemy);
}`}
                </pre>
                <p className="t-body text-graphite">
                  트레이드오프 — 활성 + 비활성 합쳐 <span className="text-ink">100마리 상한</span>.
                </p>
              </div>
            </div>

            {/* Fix B · Dynamic + reserve */}
            <div className="mt-16 grid grid-cols-12 gap-x-8 gap-y-6 border-t border-hairline pt-12">
              <div className="col-span-12 lg:col-span-3">
                <p className="t-meta text-stone">Fix · B</p>
                <p className="t-eyebrow text-graphite mt-2">Dynamic + reserve</p>
              </div>
              <div className="col-span-12 lg:col-span-9 space-y-6">
                <h4 className="t-heading-md">capacity를 미리 확보해 재할당을 막는다 — Star.</h4>
                <p className="t-body text-graphite">
                  Star는 적이 죽는 자리마다 생기고 픽업되면 사라진다. 풀로 묶기
                  어렵다 (위치가 매번 다르고 수명도 짧음). 동적 spawn을 유지하되
                  <span className="text-ink"> vector.reserve(1024)</span>로 capacity를 게임 시작
                  시점에 충분히 확보.
                </p>
                <pre className="code-block">
{`// GameLoop 생성자 — capacity 미리 확보
GameLoop::GameLoop() {
    gameWorld.reserve(1024);   // ← 핵심 한 줄
}

// 표준 보장: vector가 재할당하지 않는 한 push_back은 iterator를
// invalidate하지 않는다. range-based for의 end는 캡쳐 시점 기준이라
// 같은 프레임 새 push는 다음 frame부터 보인다 — 의도된 동작.`}
                </pre>
              </div>
            </div>

            {/* Trade-offs */}
            <div className="mt-16 grid grid-cols-12 gap-x-8 gap-y-6 border-t border-hairline pt-12">
              <div className="col-span-12 lg:col-span-3">
                <p className="t-meta text-stone">Compare</p>
                <p className="t-eyebrow text-graphite mt-2">Trade-offs</p>
              </div>
              <div className="col-span-12 lg:col-span-9">
                <div className="overflow-x-auto border-t border-b border-hairline-soft">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-hairline-soft">
                        <th className="text-left t-eyebrow text-graphite py-3 pr-6">기준</th>
                        <th className="text-left t-eyebrow text-graphite py-3 pr-6">Pooling (Enemy)</th>
                        <th className="text-left t-eyebrow text-graphite py-3">Dynamic + reserve (Star)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ["언제 할당",       "게임 시작 전",          "런타임 (적 사망 시)"],
                        ["push_back 발생", "X (Run 이후)",          "O (매 사망마다)"],
                        ["iterator 안전",   "구조적으로 보장",         "capacity 안에서만 보장"],
                        ["수량 상한",       "PreAllocate (100)",      "reserve (1024)"],
                        ["적합한 객체",     "수명 길고 재사용 가능",   "수명 짧고 위치 가변"],
                      ].map(([k, a, b]) => (
                        <tr key={k} className="border-b border-hairline">
                          <td className="t-body-strong text-ink py-4 pr-6 align-top w-40">{k}</td>
                          <td className="t-body text-graphite py-4 pr-6 align-top">{a}</td>
                          <td className="t-body text-graphite py-4 align-top">{b}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          04. Class Diagram — 여러 sub-section
      ════════════════════════════════════════════ */}
      <section id="diagram" className="bg-canvas border-t border-hairline scroll-mt-16">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-12 py-[96px] lg:py-[160px]">
          <div className="flex items-baseline gap-8">
            <span className="t-meta text-stone w-10">04</span>
            <p className="t-eyebrow text-graphite">Class Diagram</p>
          </div>
          <h2 className="t-display mt-8 max-w-[22ch]">
            엔진을 네 개의 레이어로 본다.
          </h2>
          <p className="t-subtitle text-graphite mt-10 max-w-[60ch]">
            Framework가 골격을 잡고, State가 데이터, Component가 행동, System이
            전체를 매 프레임 돌린다. 그 안에서 특이한 것 셋 — Subscribe 패턴,
            StateCallbacks 응집, 두 가지 spawn 전략.
          </p>

          {/* (a) Framework Overview */}
          <div className="mt-20 border-t border-hairline pt-12">
            <p className="t-eyebrow text-graphite">a · Framework Overview</p>
            <h3 className="t-heading-md mt-4">GameLoop가 중심, 모든 것이 그 안에서.</h3>
            <p className="t-body text-graphite mt-4 max-w-[60ch]">
              GameLoop는 객체 컨테이너 + 시스템 호스트 + 시간 관리자.
              GameObject는 Component / State 컬렉션. 둘 다 base class를 거쳐 다형성으로 다룬다.
            </p>
            <div className="mt-8 border border-hairline rounded-[var(--r-lg)] bg-canvas-warm p-6 lg:p-10">
              <FrameworkOverviewDiagram />
            </div>
          </div>

          {/* (b) State 계층 */}
          <div className="mt-20 border-t border-hairline pt-12">
            <p className="t-eyebrow text-graphite">b · State Layers</p>
            <h3 className="t-heading-md mt-4">State / ObservableState&lt;T&gt; / 구체.</h3>
            <p className="t-body text-graphite mt-4 max-w-[60ch]">
              세 계층으로 나눈 이유 — State는 다형성 base (vector&lt;State*&gt;에 담기),
              ObservableState&lt;T&gt;는 Subscribe 메커니즘 1회 작성, 구체 State는
              도메인별 helper만.
            </p>
            <div className="mt-8 border border-hairline rounded-[var(--r-lg)] bg-canvas-warm p-6 lg:p-10">
              <StateLayersDiagram />
            </div>
            <ol className="mt-8 t-body text-graphite list-decimal pl-6 space-y-2 max-w-[80ch]">
              <li>
                <span className="text-ink">vector&lt;State*&gt; 다형성</span> — template은 자체로 타입이 아니라
                비-template base가 필요.
              </li>
              <li>
                <span className="text-ink">GetState&lt;T&gt;() 동작</span> — virtual 소멸자가 있어야 dynamic_cast 안전.
              </li>
              <li>
                <span className="text-ink">코드 1회</span> — Subscribe 메커니즘을 template으로 빼서 6-7번 반복 회피.
              </li>
              <li>
                <span className="text-ink">확장 여지</span> — Observable이 필요 없는 정적 State도 가능.
              </li>
            </ol>
          </div>

          {/* (c) Component Taxonomy */}
          <div className="mt-20 border-t border-hairline pt-12">
            <p className="t-eyebrow text-graphite">c · Component Taxonomy</p>
            <h3 className="t-heading-md mt-4">Component 13종, 네 그룹으로.</h3>
            <p className="t-body text-graphite mt-4 max-w-[60ch]">
              이름은 모두 Component이지만 실제 역할은 다르다 —
              <span className="text-ink"> Active Controller</span>(Update 주도) ·
              <span className="text-ink"> Reactive Listener</span>(Subscribe로 데이터 갱신) ·
              <span className="text-ink"> Visual/Audio</span> · <span className="text-ink">Data marker</span>.
            </p>
            <div className="mt-8 border border-hairline rounded-[var(--r-lg)] bg-canvas-warm p-6 lg:p-10">
              <ComponentTaxonomyDiagram />
            </div>
            <p className="t-meta text-stone mt-6 max-w-[80ch]">
              HealthController는 Active + Reactive 둘 다 — 무적 타이머(Update) + HP=0 시 LifeState 동기화(Subscribe).
            </p>
          </div>

          {/* (d) Systems */}
          <div className="mt-20 border-t border-hairline pt-12">
            <p className="t-eyebrow text-graphite">d · Systems</p>
            <h3 className="t-heading-md mt-4">매 프레임 gameWorld 전체를 도는 것들.</h3>
            <p className="t-body text-graphite mt-4 max-w-[60ch]">
              GameLoop가 멤버로 직접 보유한 시스템(CollisionSystem · CombatSystem)과 main이 소유한 외부 시스템(EnemySpawner · StarSpawner · Logger).
            </p>
            <div className="mt-8 border border-hairline rounded-[var(--r-lg)] bg-canvas-warm p-6 lg:p-10">
              <SystemsDiagram />
            </div>
          </div>

          {/* ★ (e) 특이한 부분 1: Subscribe 패턴 ── 7단계 */}
          <div className="mt-24 border-t border-hairline pt-12">
            <div className="flex items-baseline gap-4">
              <span className="t-meta text-stone">★ 특이한 부분 1</span>
              <p className="t-eyebrow text-graphite">Subscribe Pattern</p>
            </div>
            <h3 className="t-display-sm mt-6 max-w-[22ch]">
              데이터가 바뀌면, 듣고 있던 사람들이 반응한다.
            </h3>
            <p className="t-subtitle text-graphite mt-8 max-w-[60ch]">
              엔진의 거의 모든 동작이 한 패턴 위에 있다. 학교 종이 울리면 모든
              교실이 일제히 반응하는 것처럼 — 종 친 사람은 누가 듣는지 모른다.
            </p>

            {/* Step 1 */}
            <div className="mt-16 grid grid-cols-12 gap-x-8 gap-y-6 border-t border-hairline pt-12">
              <div className="col-span-12 lg:col-span-3">
                <p className="t-meta text-stone">Step 01</p>
                <p className="t-eyebrow text-graphite mt-2">Problem</p>
              </div>
              <div className="col-span-12 lg:col-span-9 space-y-6">
                <h4 className="t-heading-md">HP가 0이 되면 무슨 일이 일어나야 하나?</h4>
                <ul className="t-body text-graphite list-disc pl-6 space-y-1.5">
                  <li>LifeState를 Dead로 전환</li>
                  <li>빨간 깜빡임 + 흔들림</li>
                  <li>Player라면 GameState를 GameOver로</li>
                  <li>적이라면 사망 위치에 Star + <span className="text-ink">dead.mp3</span></li>
                  <li>EnemyState도 Dead로 동기화</li>
                </ul>
                <p className="t-body text-graphite">
                  단순하게 짜면 — HP를 깎는 모든 곳에 이 다섯 가지를 매번 호출.
                  트리거가 늘 때마다 다섯 줄을 복사. 하나라도 빠뜨리면 버그.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="mt-16 grid grid-cols-12 gap-x-8 gap-y-6 border-t border-hairline pt-12">
              <div className="col-span-12 lg:col-span-3">
                <p className="t-meta text-stone">Step 02</p>
                <p className="t-eyebrow text-graphite mt-2">Idea</p>
              </div>
              <div className="col-span-12 lg:col-span-9 space-y-6">
                <h4 className="t-heading-md">값을 보관하는 객체가 직접 &quot;변했다&quot;고 알려준다.</h4>
                <p className="t-body text-graphite">
                  HP라는 데이터를 단순 int가 아니라 <span className="text-ink">관찰
                  가능한 State</span>로. 누구나 거기에 &quot;값이 바뀌면 알려달라&quot;고
                  Subscribe할 수 있고, 값이 바뀌면 등록된 모두에게 한꺼번에 알린다.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="mt-16 grid grid-cols-12 gap-x-8 gap-y-6 border-t border-hairline pt-12">
              <div className="col-span-12 lg:col-span-3">
                <p className="t-meta text-stone">Step 03</p>
                <p className="t-eyebrow text-graphite mt-2">Container</p>
              </div>
              <div className="col-span-12 lg:col-span-9 space-y-6">
                <h4 className="t-heading-md">ObservableState&lt;T&gt; — 30줄짜리 척추.</h4>
                <pre className="code-block">
{`template<typename T>
class ObservableState : public State {
    T current;
    std::vector<Callback> subscribers;
public:
    T  Get() const { return current; }
    void Subscribe(Callback cb) { subscribers.push_back(std::move(cb)); }
    void Set(T next) {
        if (current == next) return;
        const T prev = current;
        current = next;
        // snapshot — 콜백 안에서 Subscribe 호출돼도 안전
        const auto callbacks = subscribers;
        for (auto& cb : callbacks) cb(prev, next);
    }
};`}
                </pre>
              </div>
            </div>

            {/* Step 4 Subscribe */}
            <div className="mt-16 grid grid-cols-12 gap-x-8 gap-y-6 border-t border-hairline pt-12">
              <div className="col-span-12 lg:col-span-3">
                <p className="t-meta text-stone">Step 04</p>
                <p className="t-eyebrow text-graphite mt-2">Subscribe</p>
              </div>
              <div className="col-span-12 lg:col-span-9 space-y-6">
                <h4 className="t-heading-md">한 번 등록하고 잊는다.</h4>
                <pre className="code-block">
{`// HealthController.cpp
void HealthController::Start() {
    HealthState* hs = pOwner->GetState<HealthState>();
    hs->Subscribe([this](int prev, int next) {
        StateCallbacks::OnHealthAutoDeath(this, prev, next);
    });
}

// HitReactionController.cpp — 같은 HealthState에 다른 콜백
void HitReactionController::Start() {
    HealthState* hs = pOwner->GetState<HealthState>();
    hs->Subscribe([this](int prev, int next) {
        StateCallbacks::OnHitReaction(this, prev, next);
    });
}`}
                </pre>
              </div>
            </div>

            {/* Step 5 Set */}
            <div className="mt-16 grid grid-cols-12 gap-x-8 gap-y-6 border-t border-hairline pt-12">
              <div className="col-span-12 lg:col-span-3">
                <p className="t-meta text-stone">Step 05</p>
                <p className="t-eyebrow text-graphite mt-2">Set</p>
              </div>
              <div className="col-span-12 lg:col-span-9 space-y-6">
                <h4 className="t-heading-md">트리거는 한 줄. 무엇이 반응할지는 모름.</h4>
                <pre className="code-block">
{`// (a) CombatSystem.cpp — 검 공격 적중
hs->SetCurrent(hs->GetCurrent() - hit.damage);

// (b) StateCallbacks.cpp — Player가 적과 접촉
hs->SetCurrent(hs->GetCurrent() - 1);`}
                </pre>
              </div>
            </div>

            {/* Step 6 Fan-out */}
            <div className="mt-16 grid grid-cols-12 gap-x-8 gap-y-6 border-t border-hairline pt-12">
              <div className="col-span-12 lg:col-span-3">
                <p className="t-meta text-stone">Step 06</p>
                <p className="t-eyebrow text-graphite mt-2">Fan-out & Chain</p>
              </div>
              <div className="col-span-12 lg:col-span-9 space-y-6">
                <h4 className="t-heading-md">Set 한 번이 일으키는 도미노.</h4>
                <div className="border border-hairline rounded-[var(--r-lg)] bg-canvas-warm p-6 lg:p-10">
                  <SubscribeDiagram />
                </div>
              </div>
            </div>

            {/* Step 7 Why */}
            <div className="mt-16 grid grid-cols-12 gap-x-8 gap-y-6 border-t border-hairline pt-12">
              <div className="col-span-12 lg:col-span-3">
                <p className="t-meta text-stone">Step 07</p>
                <p className="t-eyebrow text-graphite mt-2">Why it matters</p>
              </div>
              <div className="col-span-12 lg:col-span-9 space-y-6">
                <h4 className="t-heading-md">새 트리거도, 새 반응도 자유롭게.</h4>
                <ul className="t-body text-graphite list-disc pl-6 space-y-2">
                  <li>
                    <span className="text-ink">새 데미지 트리거</span> (예: 화염 지대) —
                    SetCurrent 한 줄. 사망 처리/시각 반응/사운드 자동.
                  </li>
                  <li>
                    <span className="text-ink">새 반응</span> (예: 점수 표시) —
                    StateCallbacks에 자유 함수 + Component Start에서 Subscribe. 기존 코드 0줄 변경.
                  </li>
                  <li>
                    반응 로직이 한 파일에 모여있어 디버그할 때
                    &quot;HP가 줄면 무엇이 일어나지?&quot; 한 곳에서 다 보임.
                  </li>
                </ul>
                <div className="grid grid-cols-12 gap-6 pt-4">
                  {[
                    { n: "5", l: "한 트리거가 일으키는 반응" },
                    { n: "1줄", l: "트리거 측 코드" },
                    { n: "0", l: "새 반응 추가 시 트리거 수정" },
                  ].map((m) => (
                    <div key={m.l} className="col-span-12 sm:col-span-4">
                      <p className="t-display-sm text-ink">{m.n}</p>
                      <p className="t-meta text-stone mt-2">{m.l}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ★ (f) 특이한 부분 2: StateCallbacks 응집 */}
          <div className="mt-24 border-t border-hairline pt-12 grid grid-cols-12 gap-x-8 gap-y-6">
            <div className="col-span-12 lg:col-span-3">
              <span className="t-meta text-stone">★ 특이한 부분 2</span>
              <p className="t-eyebrow text-graphite mt-2">Callback 응집</p>
            </div>
            <div className="col-span-12 lg:col-span-9 space-y-6">
              <h3 className="t-heading-md">Component class에 동작을 넣지 않는다.</h3>
              <p className="t-body text-graphite">
                모든 reaction을 <span className="text-ink">Callbacks/StateCallbacks.cpp</span>의
                자유 함수로 모은다. Component는 데이터(타이머/플래그)만 들고
                Subscribe 등록만 한다. &quot;HP가 줄면 무엇이 일어나는가&quot;는 한 파일을
                훑으면 다 보인다.
              </p>
              <pre className="code-block">
{`// StateCallbacks.cpp — 한 파일에 모든 반응

void OnHealthAutoDeath(HealthController* self, int prev, int next) {
    if (!(prev > 0 && next <= 0)) return;
    self->pOwner->GetState<LifeState>()->SetDead();
}

void OnLifeEnemyDead(EnemyController* self, LifeStateType, LifeStateType next) {
    if (next != LifeStateType::Dead) return;
    self->pOwner->GetState<EnemyState>()->SetDead();
    self->pSpawner->pStarSpawner->SpawnAt(self->pOwner->position.x,
                                          self->pOwner->position.y);
    AudioPlayer::PlayOneShot(L"assets\\\\dead.mp3");
}

void OnHitReaction(HitReactionController* self, int prev, int next) {
    if (next >= prev) return;
    self->remainingTime = self->duration;
}

// OnControlLife / OnAnimAttack / OnCollisionEnter / OnScoreChange ...`}
              </pre>
            </div>
          </div>

          {/* ★ (g) 특이한 부분 3: BoxCollider Prevention */}
          <div className="mt-24 border-t border-hairline pt-12 grid grid-cols-12 gap-x-8 gap-y-6">
            <div className="col-span-12 lg:col-span-3">
              <span className="t-meta text-stone">★ 특이한 부분 3</span>
              <p className="t-eyebrow text-graphite mt-2">Collision</p>
            </div>
            <div className="col-span-12 lg:col-span-9 space-y-6">
              <h3 className="t-heading-md">BoxCollider · swept-axis prevention.</h3>
              <p className="t-body text-graphite">
                모든 충돌체는 BoxCollider. CollisionSystem이 매 프레임 X/Y 축을
                분리해 이동을 시도하고, 다음 위치가 차단 대상과 겹치면 그 축
                이동만 취소 (밀어내기 X). 차단 대상은 self/other 팀 조합으로 다름.
              </p>
              <div className="overflow-x-auto border-t border-b border-hairline-soft">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-hairline-soft">
                      <th className="text-left t-eyebrow text-graphite py-3 pr-6">self</th>
                      <th className="text-left t-eyebrow text-graphite py-3 pr-6">차단 대상</th>
                      <th className="text-left t-eyebrow text-graphite py-3">설명</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["Player", "Wall + Enemy", "적 위로 못 올라감, 벽 못 통과"],
                      ["Enemy",  "Wall만",       "Enemy는 Player에 안 막힘, 다른 Enemy 통과"],
                      ["Wall",   "—",            "정적 (velocity 0)"],
                    ].map(([s, t, d]) => (
                      <tr key={s} className="border-b border-hairline">
                        <td className="t-body-strong text-ink py-4 pr-6 align-top">{s}</td>
                        <td className="t-body text-ink py-4 pr-6 align-top">{t}</td>
                        <td className="t-body text-graphite py-4 align-top">{d}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          05. Demo
      ════════════════════════════════════════════ */}
      <section id="demo" className="bg-canvas border-t border-hairline scroll-mt-16">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-12 py-[96px] lg:py-[140px]">
          <div className="flex items-baseline gap-8">
            <span className="t-meta text-stone w-10">05</span>
            <p className="t-eyebrow text-graphite">Demo</p>
          </div>
          <h2 className="t-display mt-8 max-w-[22ch]">움직이는 시스템.</h2>

          <div className="mt-16">
            <p className="t-eyebrow text-graphite">Full Playthrough</p>
            <div
              className="mt-6 aspect-video w-full"
              style={{
                backgroundColor: "var(--color-surface-cool)",
                borderRadius: "var(--r-lg)",
              }}
            />
            <p className="t-meta text-stone mt-3">
              영상 자리 — &lt;video src=&quot;/play.mp4&quot; controls className=&quot;w-full rounded-[var(--r-lg)]&quot; /&gt;
            </p>
          </div>

          <div className="mt-16 grid grid-cols-12 gap-6">
            {[
              { label: "검 휘두름 + 적 사망", tag: "Combat" },
              { label: "별 픽업 + 점수", tag: "Pickup" },
              { label: "후반 빨강 배경", tag: "Lv 20+" },
              { label: "Firebase 로그 — Realtime DB", tag: "Telemetry" },
            ].map((m) => (
              <figure key={m.label} className="col-span-12 sm:col-span-6 space-y-3">
                <div
                  className="aspect-video w-full"
                  style={{
                    backgroundColor: "var(--color-surface-cool)",
                    borderRadius: "var(--r-md)",
                  }}
                />
                <figcaption className="flex justify-between items-baseline">
                  <span className="t-body-strong text-ink">{m.label}</span>
                  <span className="t-micro-caps text-slate">{m.tag}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer
        className="text-on-primary"
        style={{ backgroundColor: "var(--color-footer)" }}
      >
        <div className="mx-auto max-w-[1280px] px-6 lg:px-12 py-[72px]">
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-12 lg:col-span-6">
              <p className="t-link-sm text-on-primary lowercase">custom game engine</p>
              <p className="t-body text-on-primary/60 mt-4 max-w-[42ch]">
                2026 Game Programming presentation. DX11 + C++ + Firebase.
              </p>
            </div>
            <div className="col-span-6 lg:col-span-3">
              <p className="t-micro-caps text-stone">Sections</p>
              <ul className="mt-4 space-y-2">
                {slides.map((s) => (
                  <li key={s.id}>
                    <a href={`#${s.id}`} className="t-body text-on-primary/80 hover:text-on-primary">
                      {s.num} · {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-span-6 lg:col-span-3">
              <p className="t-micro-caps text-stone">Links</p>
              <ul className="mt-4 space-y-2">
                <li>
                  <a
                    href="https://github.com/RyuDongHo/custom-game-engine"
                    className="t-body text-on-primary/80 hover:text-on-primary"
                  >
                    GitHub
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/RyuDongHo/custom-game-engine/pull/9"
                    className="t-body text-on-primary/80 hover:text-on-primary"
                  >
                    Pull Request
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-6 border-t border-on-primary/10 flex justify-between">
            <p className="t-meta text-stone lowercase">custom game engine</p>
            <p className="t-meta text-stone">© 2026</p>
          </div>
        </div>
      </footer>
    </>
  );
}

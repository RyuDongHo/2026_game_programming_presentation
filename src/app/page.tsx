import Link from "next/link";

/* DESIGN.md 토큰 매핑:
 *  - 전반: monochrome (ink/graphite/slate/hairline), 단일 sans, hairline divider
 *  - 리듬: editorial eyebrow + display lockup, 64–96px section gutter
 *  - hero/interlude: scrim(#1a1a1a) 다크 패널 + 흰 본문 band 교차
 *  - CTA: black pill (.btn-primary)
 * 프레젠테이션 톤: 각 슬라이드는 화면 가득 (min-h-screen), 큰 display headline. */

const slides = [
  { num: "01", id: "rules",         label: "Programme" },
  { num: "02", id: "instances",     label: "Instance Map" },
  { num: "03", id: "class-diagram", label: "Diagram Notes" },
  { num: "04", id: "demo",          label: "Demo" },
];

export default function Home() {
  return (
    <>
      {/* ─────────────────────────────────────────────
          NAV — canvas, lowercase wordmark + nav links
      ────────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 bg-canvas/95 backdrop-blur border-b border-hairline">
        <div className="mx-auto max-w-[1280px] flex items-center justify-between px-6 lg:px-12 h-16">
          <Link href="#top" className="t-link-sm text-ink lowercase tracking-tight">
            custom game engine
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            {slides.map((s) => (
              <a key={s.id} href={`#${s.id}`} className="t-link-sm text-ink-soft hover:text-ink">
                {s.label}
              </a>
            ))}
          </nav>
          <a
            href="https://github.com/RyuDongHo/custom-game-engine"
            className="btn-primary"
          >
            View Repo
          </a>
        </div>
      </header>

      {/* ─────────────────────────────────────────────
          HERO — scrim 다크 패널 + display
      ────────────────────────────────────────────── */}
      <section
        id="top"
        className="bg-scrim text-on-primary"
        style={{ backgroundColor: "var(--color-scrim)" }}
      >
        <div className="mx-auto max-w-[1280px] px-6 lg:px-12 py-[96px] lg:py-[160px] min-h-[88vh] flex flex-col justify-end">
          <p className="t-eyebrow text-on-primary/70">
            2026 · Game Programming · Presentation
          </p>
          <h1 className="t-display mt-6 max-w-[18ch]">
            A small DirectX 11 game,
            <br />
            engineered as a quiet system.
          </h1>
          <p className="t-subtitle mt-8 max-w-[42ch] text-on-primary/80">
            Subscribe-driven state, Component-Entity composition,
            asynchronous Firebase logging. Four slides.
          </p>
          <div className="mt-12 flex gap-3">
            <a href="#rules" className="btn-primary-on-dark">Start Programme</a>
            <a href="#demo" className="t-link-sm self-center text-on-primary/80 underline underline-offset-4">
              Skip to Demo →
            </a>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────
          INDEX — programme listing
      ────────────────────────────────────────────── */}
      <section className="bg-canvas">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-12 py-[96px]">
          <p className="t-eyebrow text-graphite">Programme</p>
          <h2 className="t-heading-md mt-6 max-w-[24ch]">
            Four sections, one continuous reading.
          </h2>
          <ul className="mt-16 divide-y divide-hairline border-y border-hairline">
            {slides.map((s, i) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className="group flex items-baseline justify-between py-6 lg:py-8 hover:bg-canvas-warm transition"
                >
                  <span className="flex items-baseline gap-8">
                    <span className="t-meta text-stone w-10">{s.num}</span>
                    <span className="t-heading-sm text-ink">
                      {[
                        "게임 룰 설명",
                        "오브젝트 인스턴스 맵",
                        "클래스 다이어그램 — 특이한 부분",
                        "게임 실행 데모",
                      ][i]}
                    </span>
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

      {/* ─────────────────────────────────────────────
          01. 게임 룰 설명 (Programme)
      ────────────────────────────────────────────── */}
      <section
        id="rules"
        className="bg-canvas border-t border-hairline scroll-mt-16"
      >
        <div className="mx-auto max-w-[1280px] px-6 lg:px-12 py-[96px] lg:py-[160px] min-h-screen flex flex-col">
          <div className="flex items-baseline gap-8">
            <span className="t-meta text-stone w-10">01</span>
            <p className="t-eyebrow text-graphite">Programme</p>
          </div>

          <h2 className="t-display mt-8 max-w-[22ch]">
            Hunt enemies. Collect stars. Outlast the redshift.
          </h2>

          <div className="mt-16 grid grid-cols-12 gap-x-8 gap-y-12">
            <p className="col-span-12 lg:col-span-7 t-subtitle text-graphite">
              플레이어는 적의 공격을 피하면서 검으로 처치하고, 떨어진 별을 모아
              점수를 올린다. 10초마다 레벨이 오르고 적 속도가 10%씩 빨라지며
              배경이 점점 붉어진다. 결국 적이 플레이어를 능가하는 순간 게임은
              조용히 한계에 닿는다.
            </p>

            <div className="col-span-12 lg:col-span-5 lg:col-start-8">
              <p className="t-eyebrow text-graphite">Controls</p>
              <dl className="mt-6 divide-y divide-hairline border-t border-hairline">
                {[
                  ["WASD / Arrows", "이동"],
                  ["Space", "검 공격"],
                  ["F", "전체화면 토글"],
                  ["ESC", "종료"],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between py-4">
                    <dt className="t-body-strong text-ink">{k}</dt>
                    <dd className="t-body text-graphite">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          <div className="mt-20">
            <p className="t-eyebrow text-graphite">Game Flow</p>
            <pre className="code-block mt-6">
{`MainMenu ──[Space]──► Playing ──[HP==0]──► GameOver
                       │
                       │ every 10s
                       ▼
                  level += 1
                  enemy speed × (1 + 0.1·(level−1))
                  background brown → red`}
            </pre>
          </div>

          <div className="mt-20 grid grid-cols-12 gap-x-8">
            <div className="col-span-12 lg:col-span-7">
              <p className="t-eyebrow text-graphite">Score</p>
              <p className="t-body text-graphite mt-6">
                적 1마리 처치 → 사망 위치에 Star 생성. Player가 Star에 접촉하면
                점수 +1 + <span className="t-body-strong text-ink">get_star.mp3</span>.
                점수는 Player의 <span className="t-body-strong text-ink">ScoreState</span>
                (Observable&lt;int&gt;)로 보관되어 UI 도입 시 Subscribe만 추가하면 됨.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────
          02. Instance Map
      ────────────────────────────────────────────── */}
      <section
        id="instances"
        className="bg-canvas border-t border-hairline scroll-mt-16"
      >
        <div className="mx-auto max-w-[1280px] px-6 lg:px-12 py-[96px] lg:py-[160px] min-h-screen flex flex-col">
          <div className="flex items-baseline gap-8">
            <span className="t-meta text-stone w-10">02</span>
            <p className="t-eyebrow text-graphite">Instance Map</p>
          </div>

          <h2 className="t-display mt-8 max-w-[22ch]">
            What actually lives in the world at runtime.
          </h2>

          <p className="t-subtitle text-graphite mt-12 max-w-[58ch]">
            게임 시작 시 GameLoop의 <span className="text-ink">gameWorld</span> 벡터에
            아래 GameObject들이 등록된다. 적은 풀링이라 활성 + 비활성 합쳐
            최대 100마리, Star는 적이 죽을 때마다 동적 생성.
          </p>

          <pre className="code-block mt-16">
{`GameLoop
├── gameWorld (vector<GameObject*>, reserve 1024)
│   ├── GameRoot       — GameState + GameFlowController
│   ├── StageTerrain   — LevelLayout (timer → level)
│   ├── Wall_BoundsTop / Bottom / Left / Right (4)
│   ├── Player         — Attack/Life/Movement/Health/ScoreState
│   │                    + AttackController/HealthController/PlayerControl
│   │                    + VelocityController/SpriteAnimator/HitReactionController
│   │                    + DeathTimer/MeshRenderer/BoxCollider
│   ├── Enemy_1 .. Enemy_100   (풀: 50 Orc1 + 50 Orc2)
│   │                    EnemyState/HealthState/LifeState
│   │                    + EnemyController/HealthController/VelocityController
│   │                    + SpriteAnimator/HitReactionController
│   │                    + MeshRenderer/BoxCollider
│   └── Star_N         (적 사망 시 동적 spawn)
│                       PickupItem + BoxCollider + MeshRenderer + SpriteAnimator
│
├── collisionSystem    — BoxCollider AABB prevention
├── combatSystem       — 공격 hitbox 큐
└── spawners
    ├── EnemySpawner (Orc1)
    └── EnemySpawner (Orc2)   — 둘 다 StarSpawner 참조 보유

Logger
├── ConsoleLogSink
└── FirebaseLogSink    — 비동기 큐 + worker thread → Realtime DB`}
          </pre>

          <div className="mt-16 grid grid-cols-12 gap-x-8 gap-y-8 border-t border-hairline pt-12">
            {[
              { n: "1024", l: "gameWorld reserve" },
              { n: "100",  l: "최대 활성 적" },
              { n: "10s",  l: "Level Up Interval" },
              { n: "1h",   l: "Firebase idToken 유효" },
            ].map((m) => (
              <div key={m.l} className="col-span-6 lg:col-span-3">
                <p className="t-display-sm text-ink">{m.n}</p>
                <p className="t-meta text-stone mt-3">{m.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────
          INTERLUDE — scrim 다크 패널
      ────────────────────────────────────────────── */}
      <section
        className="text-on-primary"
        style={{ backgroundColor: "var(--color-scrim)" }}
      >
        <div className="mx-auto max-w-[1280px] px-6 lg:px-12 py-[96px] lg:py-[140px]">
          <p className="t-eyebrow text-on-primary/70">Intermission</p>
          <p className="t-heading-md mt-8 max-w-[28ch] text-on-primary">
            Components hold data. Free functions react.
            <br />
            <span className="text-on-primary/60">
              State changes ripple outward through Subscribe.
            </span>
          </p>
        </div>
      </section>

      {/* ─────────────────────────────────────────────
          03. Diagram Notes
      ────────────────────────────────────────────── */}
      <section
        id="class-diagram"
        className="bg-canvas border-t border-hairline scroll-mt-16"
      >
        <div className="mx-auto max-w-[1280px] px-6 lg:px-12 py-[96px] lg:py-[160px] min-h-screen flex flex-col">
          <div className="flex items-baseline gap-8">
            <span className="t-meta text-stone w-10">03</span>
            <p className="t-eyebrow text-graphite">Diagram Notes</p>
          </div>

          <h2 className="t-display mt-8 max-w-[22ch]">
            Four design moves worth pointing at.
          </h2>

          {/* (a) ObservableState */}
          <article className="mt-20 grid grid-cols-12 gap-x-8 gap-y-6 border-t border-hairline pt-12">
            <p className="col-span-12 lg:col-span-3 t-eyebrow text-graphite">
              a · Observer
            </p>
            <div className="col-span-12 lg:col-span-9 space-y-6">
              <h3 className="t-heading-md">
                ObservableState&lt;TEnum&gt;
              </h3>
              <p className="t-body text-graphite">
                State는 단순 enum 값이 아니라 변경 시 구독자에게 알린다.
                Component는 Start()에서 Subscribe만 하면 되고, &quot;값이 바뀌면
                무엇을 할지&quot;는 모두 StateCallbacks 자유 함수에 응집된다.
              </p>
              <pre className="code-block">
{`template<typename TEnum>
class ObservableState : public State {
    TEnum current;
    std::vector<Callback> subscribers;
    void Set(TEnum next) {
        if (current == next) return;
        const TEnum prev = current; current = next;
        // snapshot copy — 콜백 도중 Subscribe 호출 시 reallocation 안전
        const auto callbacks = subscribers;
        for (auto& cb : callbacks) cb(prev, next);
    }
};`}
              </pre>
            </div>
          </article>

          {/* (b) StateCallbacks */}
          <article className="mt-16 grid grid-cols-12 gap-x-8 gap-y-6 border-t border-hairline pt-12">
            <p className="col-span-12 lg:col-span-3 t-eyebrow text-graphite">
              b · Cohesion
            </p>
            <div className="col-span-12 lg:col-span-9 space-y-6">
              <h3 className="t-heading-md">StateCallbacks 응집</h3>
              <p className="t-body text-graphite">
                Component class 안에 동작 메서드를 두지 않고 모든 reaction을
                <span className="text-ink"> Callbacks/StateCallbacks.cpp</span>의
                자유 함수로 모은다. HP가 0이 되어 사망 처리될 때 어디서 데미지가
                발생했든 (CombatSystem 공격 / OnCollisionEnter 접촉) 같은 콜백
                체인이 동일하게 발화. 동작 분기가 한 곳에 있어 디버깅이 쉽다.
              </p>
            </div>
          </article>

          {/* (c) BoxCollider */}
          <article className="mt-16 grid grid-cols-12 gap-x-8 gap-y-6 border-t border-hairline pt-12">
            <p className="col-span-12 lg:col-span-3 t-eyebrow text-graphite">
              c · Collision
            </p>
            <div className="col-span-12 lg:col-span-9 space-y-6">
              <h3 className="t-heading-md">BoxCollider · swept-axis prevention</h3>
              <p className="t-body text-graphite">
                모든 충돌체는 BoxCollider. CollisionSystem이 매 프레임 X/Y 축을
                분리해 이동을 시도하고, 다음 위치가 차단 대상과 겹치면 그 축의
                이동만 취소한다(밀어내기 X). 케이스별 차단 대상은 다르다.
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
          </article>

          {/* (d) FirebaseLogSink */}
          <article className="mt-16 grid grid-cols-12 gap-x-8 gap-y-6 border-t border-hairline pt-12">
            <p className="col-span-12 lg:col-span-3 t-eyebrow text-graphite">
              d · Telemetry
            </p>
            <div className="col-span-12 lg:col-span-9 space-y-6">
              <h3 className="t-heading-md">Logger + FirebaseLogSink</h3>
              <p className="t-body text-graphite">
                <span className="text-ink">LOG_INFO(...)</span> 매크로가
                <span className="text-ink"> __FILE__</span>을 자동 캡쳐 →
                AuthorMap이 파일별 작성자를 lookup → 콘솔 sink와 Firebase sink로
                동시 발사. Firebase sink는 별도 worker thread가 100ms마다 또는
                큐 10개 도달 시 PATCH multi-update로 batch 전송 — 게임 프레임은
                절대 차단되지 않는다.
              </p>
            </div>
          </article>
        </div>
      </section>

      {/* ─────────────────────────────────────────────
          04. Demo
      ────────────────────────────────────────────── */}
      <section
        id="demo"
        className="bg-canvas border-t border-hairline scroll-mt-16"
      >
        <div className="mx-auto max-w-[1280px] px-6 lg:px-12 py-[96px] lg:py-[160px] min-h-screen flex flex-col">
          <div className="flex items-baseline gap-8">
            <span className="t-meta text-stone w-10">04</span>
            <p className="t-eyebrow text-graphite">Demo</p>
          </div>

          <h2 className="t-display mt-8 max-w-[22ch]">
            See the system in motion.
          </h2>

          <p className="t-subtitle text-graphite mt-12 max-w-[58ch]">
            정적 자산을 <span className="text-ink">public/</span> 폴더에 두고 아래
            placeholder를 교체하세요. 4개의 정적 컷 + 1개의 영상 슬롯이 준비되어
            있습니다.
          </p>

          <div className="mt-16 grid grid-cols-12 gap-6">
            {[
              { label: "메인 화면", tag: "Title screen" },
              { label: "플레이 중", tag: "Gameplay · Level 1" },
              { label: "후반 — 빨강 배경", tag: "Gameplay · Level 20+" },
              { label: "Firebase 로그", tag: "Realtime DB capture" },
            ].map((m) => (
              <figure
                key={m.label}
                className="col-span-12 sm:col-span-6 space-y-3"
              >
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

          <div className="mt-20">
            <p className="t-eyebrow text-graphite">Full Playthrough</p>
            <figure className="mt-6">
              <div
                className="aspect-video w-full"
                style={{
                  backgroundColor: "var(--color-surface-cool)",
                  borderRadius: "var(--r-lg)",
                }}
              />
              <figcaption className="mt-3 t-meta text-stone">
                플레이 영상 — &lt;video src=&quot;/play.mp4&quot; controls
                className=&quot;w-full rounded-[var(--r-lg)]&quot; /&gt; 로 교체
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────
          CLOSING CTA — scrim
      ────────────────────────────────────────────── */}
      <section
        className="text-on-primary"
        style={{ backgroundColor: "var(--color-scrim)" }}
      >
        <div className="mx-auto max-w-[1280px] px-6 lg:px-12 py-[120px] lg:py-[180px]">
          <p className="t-eyebrow text-on-primary/70">Resources</p>
          <h2 className="t-display mt-8 max-w-[22ch]">
            Read the source. Run the build.
          </h2>
          <div className="mt-12 flex flex-wrap gap-3">
            <a
              href="https://github.com/RyuDongHo/custom-game-engine"
              className="btn-primary-on-dark"
            >
              GitHub Repository
            </a>
            <a
              href="https://github.com/RyuDongHo/custom-game-engine/pull/9"
              className="t-link-sm text-on-primary/80 underline underline-offset-4 self-center"
            >
              Pull Request #9 →
            </a>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────
          FOOTER
      ────────────────────────────────────────────── */}
      <footer
        className="text-on-primary"
        style={{ backgroundColor: "var(--color-footer)" }}
      >
        <div className="mx-auto max-w-[1280px] px-6 lg:px-12 py-[64px]">
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
          <div className="mt-16 pt-6 border-t border-on-primary/10 flex justify-between">
            <p className="t-meta text-stone lowercase">custom game engine</p>
            <p className="t-meta text-stone">© 2026</p>
          </div>
        </div>
      </footer>
    </>
  );
}

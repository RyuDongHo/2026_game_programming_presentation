import Link from "next/link";
import { SubscribeDiagram, InstanceMapDiagram } from "./diagrams";

/* 10분 발표 분량 — Hero + 4 main + footer.
 * 02. Subscribe 패턴이 시스템의 핵심이라 가장 큰 비중. */

const slides = [
  { num: "01", id: "rules",          label: "Rules" },
  { num: "02", id: "subscribe",      label: "Subscribe Pattern" },
  { num: "03", id: "instances",      label: "Instance Map" },
  { num: "04", id: "demo",           label: "Demo" },
];

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
        <div className="mx-auto max-w-[1280px] px-6 lg:px-12 py-[96px] lg:py-[140px] min-h-[78vh] flex flex-col justify-end">
          <p className="t-eyebrow text-on-primary/70">
            2026 · Game Programming · Presentation
          </p>
          <h1 className="t-display mt-6 max-w-[20ch]">
            One pattern carries the whole engine: Subscribe.
          </h1>
          <p className="t-subtitle mt-8 max-w-[44ch] text-on-primary/80">
            DirectX 11 위의 작은 2D 게임. Component는 데이터만 들고,
            모든 반응은 ObservableState의 구독자로 흘러간다.
          </p>
          <div className="mt-12 flex gap-3">
            <a href="#rules" className="btn-primary-on-dark">Start</a>
            <a
              href="#subscribe"
              className="t-link-sm self-center text-on-primary/80 underline underline-offset-4"
            >
              Jump to the pattern →
            </a>
          </div>
        </div>
      </section>

      {/* PROGRAMME INDEX */}
      <section className="bg-canvas">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-12 py-[72px]">
          <p className="t-eyebrow text-graphite">Programme</p>
          <ul className="mt-10 divide-y divide-hairline border-y border-hairline">
            {[
              "게임 룰",
              "Subscribe 패턴  ★",
              "오브젝트 인스턴스 맵",
              "게임 실행 데모",
            ].map((title, i) => (
              <li key={slides[i].id}>
                <a
                  href={`#${slides[i].id}`}
                  className="group flex items-baseline justify-between py-6 hover:bg-canvas-warm transition"
                >
                  <span className="flex items-baseline gap-8">
                    <span className="t-meta text-stone w-10">{slides[i].num}</span>
                    <span className="t-heading-sm text-ink">{title}</span>
                  </span>
                  <span className="t-link-sm text-graphite group-hover:text-ink">
                    {slides[i].label} →
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ──────────── 01. 게임 룰 (간략) ──────────── */}
      <section id="rules" className="bg-canvas border-t border-hairline scroll-mt-16">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-12 py-[96px] lg:py-[140px]">
          <div className="flex items-baseline gap-8">
            <span className="t-meta text-stone w-10">01</span>
            <p className="t-eyebrow text-graphite">Rules</p>
          </div>
          <h2 className="t-display mt-8 max-w-[22ch]">
            적을 베고, 별을 줍고, 점점 빨라지는 적을 견딘다.
          </h2>

          <div className="mt-16 grid grid-cols-12 gap-x-8 gap-y-12">
            <p className="col-span-12 lg:col-span-7 t-subtitle text-graphite">
              10초마다 레벨이 1씩 오르고 적 속도가 10%씩 증가한다.
              배경은 점점 붉어지고 결국 적이 플레이어를 능가하는 순간
              게임은 한계에 닿는다.
            </p>

            <div className="col-span-12 lg:col-span-5 lg:col-start-8">
              <p className="t-eyebrow text-graphite">Controls</p>
              <dl className="mt-6 divide-y divide-hairline border-t border-hairline">
                {[
                  ["WASD / Arrows", "이동"],
                  ["Space", "검 공격"],
                  ["F", "전체화면"],
                  ["ESC", "종료"],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between py-3">
                    <dt className="t-body-strong text-ink">{k}</dt>
                    <dd className="t-body text-graphite">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          <pre className="code-block mt-16">
{`MainMenu ──[Space]──► Playing ──[HP==0]──► GameOver
                       │
                       │ every 10s
                       ▼
                  level += 1
                  enemy speed × (1 + 0.1·(level−1))
                  background brown → red`}
          </pre>
        </div>
      </section>

      {/* ──────────── 02. Subscribe 패턴 (메인) ──────────── */}
      <section
        id="subscribe"
        className="bg-canvas border-t border-hairline scroll-mt-16"
      >
        <div className="mx-auto max-w-[1280px] px-6 lg:px-12 py-[96px] lg:py-[160px]">
          <div className="flex items-baseline gap-8">
            <span className="t-meta text-stone w-10">02</span>
            <p className="t-eyebrow text-graphite">The Pattern</p>
          </div>
          <h2 className="t-display mt-8 max-w-[22ch]">
            데이터가 바뀌면, 그걸 듣고 있던 사람들이 반응한다.
          </h2>
          <p className="t-subtitle text-graphite mt-10 max-w-[58ch]">
            HP가 바뀌면 — 어디서 깎였든 — 같은 콜백 체인이 발화된다.
            사망 처리도, 빨간 깜빡임도, 다음 단계도 모두 구독자의 책임.
            트리거하는 쪽은 그저 <span className="text-ink">Set()</span>만 부른다.
          </p>

          {/* SVG 다이어그램 */}
          <div className="mt-16 border border-hairline rounded-[var(--r-lg)] bg-canvas-warm p-6 lg:p-10">
            <SubscribeDiagram />
          </div>

          {/* 3-step 설명 */}
          <ol className="mt-16 grid grid-cols-12 gap-x-8 gap-y-10 border-t border-hairline pt-12">
            {[
              {
                k: "Subscribe",
                t: "한 번 등록",
                d: "Controller.Start()에서 hs.Subscribe([this](p,n){...}). 이후 평생.",
              },
              {
                k: "Set",
                t: "값을 바꾼다",
                d: "트리거(공격/접촉)는 HealthState.SetCurrent만 호출. 어떻게 반응할지는 모름.",
              },
              {
                k: "Fan-out",
                t: "구독자들이 자동 반응",
                d: "ObservableState.Set이 모든 콜백을 (prev,next)와 함께 발화. snapshot copy로 reallocation 안전.",
              },
            ].map((s, i) => (
              <li key={s.k} className="col-span-12 lg:col-span-4">
                <p className="t-meta text-stone">0{i + 1}</p>
                <p className="t-eyebrow text-graphite mt-2">{s.k}</p>
                <h3 className="t-heading-sm mt-4">{s.t}</h3>
                <p className="t-body text-graphite mt-3">{s.d}</p>
              </li>
            ))}
          </ol>

          {/* 코드 */}
          <pre className="code-block mt-16">
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
    void Subscribe(Callback cb) { subscribers.push_back(std::move(cb)); }
};`}
          </pre>

          {/* 왜 중요한가 */}
          <div className="mt-16 grid grid-cols-12 gap-x-8 border-t border-hairline pt-12">
            <p className="col-span-12 lg:col-span-3 t-eyebrow text-graphite">
              Why it matters
            </p>
            <p className="col-span-12 lg:col-span-9 t-subtitle text-graphite">
              어디서 데미지가 발생했든 — CombatSystem의 공격이든 OnCollisionEnter의
              접촉이든 — 같은 콜백 체인을 탄다. 사망 처리/시각 반응/사운드/Star
              스폰이 한 곳(<span className="text-ink">StateCallbacks</span>)에 응집되어
              새 트리거를 추가해도 반응 로직은 건드릴 필요가 없다.
            </p>
          </div>
        </div>
      </section>

      {/* ──────────── 03. Instance Map (다이어그램) ──────────── */}
      <section
        id="instances"
        className="bg-canvas border-t border-hairline scroll-mt-16"
      >
        <div className="mx-auto max-w-[1280px] px-6 lg:px-12 py-[96px] lg:py-[140px]">
          <div className="flex items-baseline gap-8">
            <span className="t-meta text-stone w-10">03</span>
            <p className="t-eyebrow text-graphite">Instance Map</p>
          </div>
          <h2 className="t-display mt-8 max-w-[22ch]">
            런타임에 실제로 살아 있는 것들.
          </h2>
          <p className="t-subtitle text-graphite mt-10 max-w-[58ch]">
            Player 1, Enemy 풀 100 (Orc1 50 + Orc2 50), Star는 적이 죽을 때마다
            동적으로 추가. 각 GameObject는 State + Component 조합으로 구성.
          </p>

          <div className="mt-16 border border-hairline rounded-[var(--r-lg)] bg-canvas-warm p-6 lg:p-10">
            <InstanceMapDiagram />
          </div>
        </div>
      </section>

      {/* ──────────── 04. Demo ──────────── */}
      <section id="demo" className="bg-canvas border-t border-hairline scroll-mt-16">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-12 py-[96px] lg:py-[140px]">
          <div className="flex items-baseline gap-8">
            <span className="t-meta text-stone w-10">04</span>
            <p className="t-eyebrow text-graphite">Demo</p>
          </div>
          <h2 className="t-display mt-8 max-w-[22ch]">움직이는 시스템.</h2>

          <div className="mt-16 grid grid-cols-12 gap-6">
            {[
              { label: "메인 화면", tag: "Title" },
              { label: "플레이 중", tag: "Gameplay · Lv 1" },
              { label: "후반 — 빨강", tag: "Gameplay · Lv 20+" },
              { label: "Firebase 로그", tag: "Realtime DB" },
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

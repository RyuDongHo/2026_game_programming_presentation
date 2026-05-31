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

      {/* ──────────── 02. Subscribe 패턴 (메인) ────────────
          단계별 — Problem → Idea → State → Subscribe → Set → Chain → Why
      ──────────────────────────────────────────────────────── */}
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
            데이터가 바뀌면, 듣고 있던 사람들이 반응한다.
          </h2>
          <p className="t-subtitle text-graphite mt-10 max-w-[60ch]">
            엔진의 거의 모든 동작은 한 가지 패턴 위에 얹혀 있다. 학교 종이
            울리면 모든 교실이 일제히 반응하는 것과 같다 — 종을 친 사람은
            누가 듣는지 몰라도 된다.
          </p>

          {/* ── Step 1. Problem ── */}
          <div className="mt-20 border-t border-hairline pt-12 grid grid-cols-12 gap-x-8 gap-y-6">
            <div className="col-span-12 lg:col-span-3">
              <p className="t-meta text-stone">Step 01</p>
              <p className="t-eyebrow text-graphite mt-2">Problem</p>
            </div>
            <div className="col-span-12 lg:col-span-9 space-y-6">
              <h3 className="t-heading-md">
                HP가 0이 되면 무슨 일이 일어나야 하나?
              </h3>
              <ul className="t-body text-graphite list-disc pl-6 space-y-1.5">
                <li>LifeState를 Dead로 전환</li>
                <li>빨간 깜빡임 + 흔들림 (HitReactionController)</li>
                <li>Player라면 GameState를 GameOver로</li>
                <li>적이라면 사망 위치에 Star 생성 + <span className="text-ink">dead.mp3</span></li>
                <li>EnemyState도 Dead로 동기화</li>
              </ul>
              <p className="t-body text-graphite">
                이걸 단순하게 짜면 — HP를 깎는 모든 곳(공격, 접촉, 함정, …)에
                이 다섯 가지를 매번 호출해야 한다. 트리거가 늘 때마다 다섯 줄을
                복사. 트리거 하나가 한 가지를 빠뜨리면 버그.
              </p>
              <pre className="code-block">
{`// 😵  단순 접근 — 모든 데미지 위치에서 매번 반복
hp -= damage;
if (hp <= 0) {
    SetDead();
    StartHitReaction();
    if (isPlayer) GameOver();
    if (isEnemy)  SpawnStar(pos);
    if (isEnemy)  PlaySound("dead.mp3");
    SyncEnemyStateToDead();
}`}
              </pre>
            </div>
          </div>

          {/* ── Step 2. Idea ── */}
          <div className="mt-16 border-t border-hairline pt-12 grid grid-cols-12 gap-x-8 gap-y-6">
            <div className="col-span-12 lg:col-span-3">
              <p className="t-meta text-stone">Step 02</p>
              <p className="t-eyebrow text-graphite mt-2">Idea</p>
            </div>
            <div className="col-span-12 lg:col-span-9 space-y-6">
              <h3 className="t-heading-md">
                값을 보관하는 객체가 직접 &quot;변했다&quot;고 알려주자.
              </h3>
              <p className="t-body text-graphite">
                HP라는 데이터를 단순 int가 아니라 <span className="text-ink">관찰
                가능한 State</span>로 만든다. 누구나 거기에 &quot;값이 바뀌면 나에게
                알려달라&quot;고 등록(subscribe)할 수 있고, 값이 바뀌면 등록된
                모두에게 한꺼번에 알린다(fire).
              </p>
              <p className="t-body text-graphite">
                트리거는 그저 <span className="text-ink">Set()</span>만 부른다.
                무엇이 일어날지는 모른다. 알 필요도 없다.
              </p>
            </div>
          </div>

          {/* ── Step 3. ObservableState ── */}
          <div className="mt-16 border-t border-hairline pt-12 grid grid-cols-12 gap-x-8 gap-y-6">
            <div className="col-span-12 lg:col-span-3">
              <p className="t-meta text-stone">Step 03</p>
              <p className="t-eyebrow text-graphite mt-2">The Container</p>
            </div>
            <div className="col-span-12 lg:col-span-9 space-y-6">
              <h3 className="t-heading-md">ObservableState&lt;T&gt;</h3>
              <p className="t-body text-graphite">
                값 하나(<span className="text-ink">current</span>) + 콜백 목록
                (<span className="text-ink">subscribers</span>) + 두 메서드
                (<span className="text-ink">Set</span>,
                <span className="text-ink"> Subscribe</span>)뿐. 30줄짜리 작은
                템플릿이 엔진 전체의 척추가 된다.
              </p>
              <pre className="code-block">
{`template<typename T>
class ObservableState : public State {
    T current;
    std::vector<Callback> subscribers;
public:
    T  Get() const { return current; }
    void Subscribe(Callback cb) { subscribers.push_back(std::move(cb)); }
    void Set(T next) {
        if (current == next) return;              // 동일값이면 noop
        const T prev = current;
        current = next;
        // snapshot — 콜백 안에서 Subscribe가 호출돼도 안전
        const auto callbacks = subscribers;
        for (auto& cb : callbacks) cb(prev, next);
    }
};`}
              </pre>
              <p className="t-body text-graphite">
                <span className="text-ink">HealthState</span>는 단순히
                <span className="text-ink"> ObservableState&lt;int&gt;</span>를
                상속할 뿐. <span className="text-ink">LifeState</span>는
                <span className="text-ink"> ObservableState&lt;LifeStateType&gt;</span>,
                <span className="text-ink"> ScoreState</span>도 같은 방식.
              </p>
            </div>
          </div>

          {/* ── Step 4. Subscribe ── */}
          <div className="mt-16 border-t border-hairline pt-12 grid grid-cols-12 gap-x-8 gap-y-6">
            <div className="col-span-12 lg:col-span-3">
              <p className="t-meta text-stone">Step 04</p>
              <p className="t-eyebrow text-graphite mt-2">Subscribe</p>
            </div>
            <div className="col-span-12 lg:col-span-9 space-y-6">
              <h3 className="t-heading-md">한 번 등록하고 잊는다.</h3>
              <p className="t-body text-graphite">
                각 Component는 자기 <span className="text-ink">Start()</span>에서
                관심 있는 State에 콜백을 단 한 번 등록한다. 람다 안에서 어떻게
                반응할지를 적되, 실제 처리 로직은 <span className="text-ink">
                StateCallbacks</span>의 자유 함수로 응집시켜 한 곳에서 관리한다.
              </p>
              <pre className="code-block">
{`// HealthController.cpp — 한 번 등록만 한다
void HealthController::Start() {
    HealthState* hs = pOwner->GetState<HealthState>();
    hs->Subscribe([this](int prev, int next) {
        StateCallbacks::OnHealthAutoDeath(this, prev, next);
    });
}

// HitReactionController.cpp — 같은 HealthState에 다른 콜백 등록
void HitReactionController::Start() {
    HealthState* hs = pOwner->GetState<HealthState>();
    hs->Subscribe([this](int prev, int next) {
        StateCallbacks::OnHitReaction(this, prev, next);
    });
}`}
              </pre>
              <p className="t-body text-graphite">
                같은 HealthState에 두 컨트롤러가 각자 자기 콜백을 등록.
                서로의 존재를 모른다.
              </p>
            </div>
          </div>

          {/* ── Step 5. Set (트리거) ── */}
          <div className="mt-16 border-t border-hairline pt-12 grid grid-cols-12 gap-x-8 gap-y-6">
            <div className="col-span-12 lg:col-span-3">
              <p className="t-meta text-stone">Step 05</p>
              <p className="t-eyebrow text-graphite mt-2">Set</p>
            </div>
            <div className="col-span-12 lg:col-span-9 space-y-6">
              <h3 className="t-heading-md">트리거는 한 줄.</h3>
              <p className="t-body text-graphite">
                HP를 깎는 두 가지 경로 — 검 공격과 적 접촉 — 둘 다 똑같이
                <span className="text-ink"> SetCurrent(prev − dmg)</span> 한 줄만
                호출한다. 무엇이 반응할지는 모른다.
              </p>
              <pre className="code-block">
{`// (a) CombatSystem.cpp — 검 공격이 적중했을 때
HealthState* hs = target->GetState<HealthState>();
hs->SetCurrent(hs->GetCurrent() - hit.damage);

// (b) StateCallbacks.cpp — Player가 적과 접촉했을 때
HealthState* hs = player->GetState<HealthState>();
hs->SetCurrent(hs->GetCurrent() - 1);`}
              </pre>
            </div>
          </div>

          {/* ── Step 6. Chain (다이어그램) ── */}
          <div className="mt-16 border-t border-hairline pt-12 grid grid-cols-12 gap-x-8 gap-y-6">
            <div className="col-span-12 lg:col-span-3">
              <p className="t-meta text-stone">Step 06</p>
              <p className="t-eyebrow text-graphite mt-2">Fan-out & Chain</p>
            </div>
            <div className="col-span-12 lg:col-span-9 space-y-6">
              <h3 className="t-heading-md">
                Set 한 번이 일으키는 도미노.
              </h3>
              <p className="t-body text-graphite">
                <span className="text-ink">HealthState.Set</span>이 등록된 모든
                콜백을 한 번씩 호출. 그 중
                <span className="text-ink"> OnHealthAutoDeath</span>가
                <span className="text-ink"> LifeState.SetDead()</span>를 호출하면
                또 다른 Observable chain이 시작된다 — 사망 애니메이션, GameOver,
                Star 스폰, 효과음까지.
              </p>

              <div className="mt-4 border border-hairline rounded-[var(--r-lg)] bg-canvas-warm p-6 lg:p-10">
                <SubscribeDiagram />
              </div>

              <pre className="code-block">
{`// StateCallbacks.cpp — 한 곳에 모든 반응이 응집

void OnHealthAutoDeath(HealthController* self, int prev, int next) {
    if (!(prev > 0 && next <= 0)) return;        // HP가 0으로 떨어진 순간만
    self->pOwner->GetState<LifeState>()->SetDead();
    //     ↑ 이 한 줄이 또 다른 Observable chain을 일으킨다 ↓
}

void OnLifeEnemyDead(EnemyController* self, LifeStateType, LifeStateType next) {
    if (next != LifeStateType::Dead) return;
    self->pOwner->GetState<EnemyState>()->SetDead();
    self->pSpawner->pStarSpawner->SpawnAt(self->pOwner->position.x,
                                          self->pOwner->position.y);
    AudioPlayer::PlayOneShot(L"assets\\\\dead.mp3");
}

void OnHitReaction(HitReactionController* self, int prev, int next) {
    if (next >= prev) return;                    // 회복은 반응 X
    self->remainingTime = self->duration;        // 다음 프레임부터 깜빡임
}`}
              </pre>
            </div>
          </div>

          {/* ── Step 7. Why it matters ── */}
          <div className="mt-16 border-t border-hairline pt-12 grid grid-cols-12 gap-x-8 gap-y-6">
            <div className="col-span-12 lg:col-span-3">
              <p className="t-meta text-stone">Step 07</p>
              <p className="t-eyebrow text-graphite mt-2">Why it matters</p>
            </div>
            <div className="col-span-12 lg:col-span-9 space-y-6">
              <h3 className="t-heading-md">새 트리거도, 새 반응도 자유롭게.</h3>
              <ul className="t-body text-graphite list-disc pl-6 space-y-2">
                <li>
                  <span className="text-ink">새 데미지 트리거</span> (예: 화염
                  지대) 추가 시 — <span className="text-ink">SetCurrent</span> 한
                  줄만 호출. 사망 처리/시각 반응/사운드는 자동.
                </li>
                <li>
                  <span className="text-ink">새 반응</span> (예: 사망 시 점수
                  표시) 추가 시 — <span className="text-ink">StateCallbacks</span>에
                  자유 함수 하나 추가하고 어느 Component의
                  <span className="text-ink"> Start()</span>에서 Subscribe만 하면
                  끝. 기존 코드 변경 0줄.
                </li>
                <li>
                  반응 로직이 모두 한 파일에 모여 있어 — 디버그할 때
                  &quot;HP가 줄면 무엇이 일어나지?&quot;를 한 곳에서 다 볼 수 있다.
                </li>
              </ul>

              <div className="grid grid-cols-12 gap-6 pt-6">
                {[
                  { n: "5", l: "한 트리거가 일으키는 반응 수" },
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

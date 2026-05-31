import Link from "next/link";

const sections = [
  {
    href: "#rules",
    title: "1. 게임 룰 설명",
    desc: "게임 흐름도, 입력, 승패 조건, 점수 시스템.",
  },
  {
    href: "#instances",
    title: "2. 오브젝트 인스턴스 맵",
    desc: "런타임에 실제로 살아있는 GameObject들과 그 관계도.",
  },
  {
    href: "#class-diagram",
    title: "3. 클래스 다이어그램 — 특이한 부분",
    desc: "ObservableState / Subscribe 패턴, StateCallbacks 응집 구조.",
  },
  {
    href: "#demo",
    title: "4. 게임 실행 데모",
    desc: "스크린샷 / 영상 / Firebase 로그 캡처.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100 px-6 py-12">
      <div className="mx-auto max-w-4xl space-y-16">
        <header className="space-y-4 border-b border-neutral-800 pb-8">
          <h1 className="text-4xl font-bold tracking-tight">
            Custom Game Engine
          </h1>
          <p className="text-neutral-400">
            DX11 기반 2D 게임 엔진 — Subscribe 패턴 + Component-Entity 구조 +
            Firebase 비동기 로깅.
          </p>
          <nav className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
            {sections.map((s) => (
              <Link
                key={s.href}
                href={s.href}
                className="block rounded-lg border border-neutral-800 bg-neutral-900 px-4 py-3 hover:border-neutral-600 transition"
              >
                <div className="font-semibold">{s.title}</div>
                <div className="text-sm text-neutral-400 mt-1">{s.desc}</div>
              </Link>
            ))}
          </nav>
        </header>

        {/* 1. 게임 룰 */}
        <section id="rules" className="space-y-4 scroll-mt-12">
          <h2 className="text-2xl font-bold">1. 게임 룰 설명</h2>
          <p className="text-neutral-300">
            플레이어는 적의 공격을 피하면서 검으로 처치하고, 떨어진 별을 모아
            점수를 올린다. 시간이 갈수록 적의 속도가 빨라지고 배경이 점점
            붉어진다. 결국 적 속도가 플레이어를 능가하면 게임이 사실상 종료
            상태에 도달.
          </p>

          <h3 className="text-lg font-semibold mt-6">조작</h3>
          <ul className="list-disc pl-6 text-neutral-300 space-y-1">
            <li>WASD / 방향키 — 이동</li>
            <li>Space — 검 공격 (전방 hitbox 0.15)</li>
            <li>ESC — 종료</li>
            <li>F — 전체화면 토글</li>
          </ul>

          <h3 className="text-lg font-semibold mt-6">흐름도</h3>
          <pre className="bg-neutral-900 border border-neutral-800 rounded p-4 text-sm overflow-x-auto">
{`┌──────────────┐    Space    ┌──────────────┐    HP==0    ┌──────────────┐
│  MainMenu    │ ──────────► │   Playing    │ ──────────► │  GameOver    │
└──────────────┘             └──────────────┘             └──────────────┘
                                    │                              │
                                    │ 10초마다 level += 1          │ Space/ESC
                                    │ 적 속도 +10%, 배경 더 빨강    │
                                    ▼                              ▼
                              적이 점점 빨라짐                    종료`}
          </pre>

          <h3 className="text-lg font-semibold mt-6">점수</h3>
          <ul className="list-disc pl-6 text-neutral-300 space-y-1">
            <li>적 1마리 처치 → 사망 위치에 Star 생성</li>
            <li>Player가 Star에 닿음 → 점수 +1 + <code>get_star.mp3</code></li>
            <li>점수 = Player의 <code>ScoreState</code> (Observable&lt;int&gt;)</li>
          </ul>
        </section>

        {/* 2. 오브젝트 인스턴스 맵 */}
        <section id="instances" className="space-y-4 scroll-mt-12">
          <h2 className="text-2xl font-bold">2. 오브젝트 인스턴스 맵</h2>
          <p className="text-neutral-300">
            게임이 시작되면 GameLoop의 <code>gameWorld</code>에 다음 GameObject들이
            등록된다. 적은 풀링이라 활성/비활성 합쳐 100마리, Star는 적이 죽을
            때마다 동적 생성.
          </p>
          <pre className="bg-neutral-900 border border-neutral-800 rounded p-4 text-sm overflow-x-auto">
{`GameLoop
├── gameWorld (vector<GameObject*>, reserve 1024)
│   ├── GameRoot       — GameState + GameFlowController
│   ├── StageTerrain   — LevelLayout (timer → level)
│   ├── Wall_BoundsTop / Bottom / Left / Right (4)
│   ├── Player         — Attack/Life/Movement/Health/ScoreState
│   │                    + AttackController/HealthController/PlayerControl
│   │                    + VelocityController/SpriteAnimator/HitReactionController
│   │                    + DeathTimer/MeshRenderer/BoxCollider
│   ├── Enemy_1 .. Enemy_100  (풀, 50 Orc1 + 50 Orc2)
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
    └── EnemySpawner (Orc2) — 둘 다 StarSpawner 참조 보유

Logger
├── ConsoleLogSink
└── FirebaseLogSink — 비동기 큐 + worker thread → Realtime DB`}
          </pre>
        </section>

        {/* 3. 클래스 다이어그램 특이한 부분 */}
        <section id="class-diagram" className="space-y-4 scroll-mt-12">
          <h2 className="text-2xl font-bold">
            3. 클래스 다이어그램 — 특이한 부분 설명
          </h2>

          <h3 className="text-lg font-semibold mt-6">
            (a) ObservableState&lt;TEnum&gt; — Observer 패턴
          </h3>
          <p className="text-neutral-300">
            State는 단순 enum 값이 아니라 변경 시 구독자에게 알린다.
            Component는 Start()에서 Subscribe만 하면 되고, &quot;값이 바뀌면
            무엇을 할지&quot;는 모두 <code>StateCallbacks</code> 자유 함수에
            응집된다.
          </p>
          <pre className="bg-neutral-900 border border-neutral-800 rounded p-4 text-sm overflow-x-auto">
{`template<typename TEnum>
class ObservableState : public State {
    TEnum current;
    std::vector<Callback> subscribers;
    void Set(TEnum next) {
        if (current == next) return;
        const TEnum prev = current;
        current = next;
        // snapshot copy — 콜백 안 Subscribe 호출 시 reallocation 안전
        const auto callbacks = subscribers;
        for (auto& cb : callbacks) cb(prev, next);
    }
    void Subscribe(Callback cb) { subscribers.push_back(...); }
};`}
          </pre>

          <h3 className="text-lg font-semibold mt-6">
            (b) StateCallbacks 응집 — Component는 데이터만, 동작은 자유 함수
          </h3>
          <p className="text-neutral-300">
            Component class 안에 동작 메서드를 두지 않고 모든 reaction을{" "}
            <code>Callbacks/StateCallbacks.cpp</code>의 자유 함수로 모은다.
            장점: HP가 0이 되어 사망 처리될 때 어디서 데미지가 발생했든
            (CombatSystem 공격 / OnCollisionEnter 접촉 / 다른 어떤 곳) 같은
            콜백 체인이 동일하게 발화. 동작 분기가 한 곳에 있어 디버깅 쉬움.
          </p>

          <h3 className="text-lg font-semibold mt-6">
            (c) BoxCollider + Prevention swept-axis
          </h3>
          <p className="text-neutral-300">
            모든 충돌체는 BoxCollider. CollisionSystem이 매 프레임 X/Y 축을
            분리해 이동을 시도하고, 다음 위치가 차단 대상과 겹치면 그 축의
            이동을 취소(밀어내기 X). 케이스별 차단 대상:
          </p>
          <table className="w-full text-sm border border-neutral-800">
            <thead className="bg-neutral-900">
              <tr>
                <th className="p-2 text-left">self</th>
                <th className="p-2 text-left">차단 대상</th>
                <th className="p-2 text-left">설명</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-neutral-800">
                <td className="p-2">Player</td>
                <td className="p-2">Wall + Enemy</td>
                <td className="p-2">적 위로 못 올라감, 벽 못 통과</td>
              </tr>
              <tr className="border-t border-neutral-800">
                <td className="p-2">Enemy</td>
                <td className="p-2">Wall만</td>
                <td className="p-2">
                  Enemy는 Player에 안 막힘, 다른 Enemy 통과
                </td>
              </tr>
              <tr className="border-t border-neutral-800">
                <td className="p-2">Wall</td>
                <td className="p-2">—</td>
                <td className="p-2">정적 (velocity 0)</td>
              </tr>
            </tbody>
          </table>

          <h3 className="text-lg font-semibold mt-6">
            (d) Logger + FirebaseLogSink — 비동기 사이드카
          </h3>
          <p className="text-neutral-300">
            <code>LOG_INFO(...)</code> 매크로가 <code>__FILE__</code>을 자동
            캡쳐 → AuthorMap이 파일별 작성자 lookup → 콘솔 sink와 Firebase
            sink로 동시 발사. Firebase sink는 별도 worker thread가 100ms마다
            또는 큐 10개 도달 시 PATCH multi-update로 batch 전송 — 게임 프레임
            차단 X.
          </p>
        </section>

        {/* 4. 게임 실행 데모 */}
        <section id="demo" className="space-y-4 scroll-mt-12">
          <h2 className="text-2xl font-bold">4. 게임 실행 데모</h2>

          <h3 className="text-lg font-semibold mt-4">스크린샷 (자리)</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              "메인 화면",
              "플레이 중",
              "후반 (빨강 배경)",
              "Firebase 로그 캡처",
            ].map((label) => (
              <div
                key={label}
                className="aspect-video bg-neutral-900 border border-dashed border-neutral-700 rounded flex items-center justify-center text-neutral-500 text-sm"
              >
                {label} — 이미지 추가 자리
              </div>
            ))}
          </div>

          <h3 className="text-lg font-semibold mt-6">영상 (자리)</h3>
          <div className="aspect-video bg-neutral-900 border border-dashed border-neutral-700 rounded flex items-center justify-center text-neutral-500 text-sm">
            플레이 영상 (YouTube embed / video 태그 자리)
          </div>

          <p className="text-sm text-neutral-500 mt-4">
            영상/이미지 파일을 <code>public/</code> 폴더에 두고 위 placeholder를{" "}
            <code>
              &lt;Image src=&quot;/foo.png&quot; width=&quot;...&quot;
              height=&quot;...&quot; /&gt;
            </code>{" "}
            또는{" "}
            <code>
              &lt;video src=&quot;/play.mp4&quot; controls /&gt;
            </code>
            로 교체.
          </p>
        </section>

        <footer className="border-t border-neutral-800 pt-6 text-sm text-neutral-500">
          Repo:{" "}
          <a
            href="https://github.com/RyuDongHo/custom-game-engine"
            className="underline hover:text-neutral-300"
          >
            github.com/RyuDongHo/custom-game-engine
          </a>
        </footer>
      </div>
    </main>
  );
}

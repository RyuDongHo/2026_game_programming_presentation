/* 손그림-인접 다이어그램들. 모두 SVG, monochrome, hairline stroke. */

/* ─────────────────────────────────────────────
 * Diagram A: Subscribe 패턴 흐름도
 * State.Set(v) → 등록된 모든 콜백 발화 → 각 콜백이 다른 State 또는 자기 데이터 갱신
 * ────────────────────────────────────────── */
export function SubscribeDiagram() {
  return (
    <svg viewBox="0 0 1200 540" className="w-full h-auto" aria-label="Subscribe pattern diagram">
      <defs>
        <marker id="arr" markerWidth="10" markerHeight="10" refX="9" refY="5" orient="auto">
          <path d="M0,0 L10,5 L0,10 z" fill="#030303" />
        </marker>
        <marker id="arrDashed" markerWidth="10" markerHeight="10" refX="9" refY="5" orient="auto">
          <path d="M0,0 L10,5 L0,10 z" fill="#676f7b" />
        </marker>
      </defs>

      {/* 1. Trigger source: CombatSystem 또는 OnCollisionEnter */}
      <g>
        <rect x="20" y="40" width="240" height="74" fill="#fefefe" stroke="#030303" strokeWidth="1.5" rx="4" />
        <text x="140" y="68" textAnchor="middle" fontSize="14" fontWeight="600" fill="#030303">CombatSystem</text>
        <text x="140" y="92" textAnchor="middle" fontSize="12" fill="#404040">.Update() → hit detected</text>

        <rect x="20" y="140" width="240" height="74" fill="#fefefe" stroke="#030303" strokeWidth="1.5" rx="4" />
        <text x="140" y="168" textAnchor="middle" fontSize="14" fontWeight="600" fill="#030303">CollisionSystem</text>
        <text x="140" y="192" textAnchor="middle" fontSize="12" fill="#404040">.OnCollisionEnter</text>

        <text x="140" y="240" textAnchor="middle" fontSize="11" fill="#676f7b" fontWeight="500" letterSpacing="1.5">EITHER TRIGGER</text>
      </g>

      {/* arrows from triggers → State.Set */}
      <line x1="265" y1="80"  x2="450" y2="265" stroke="#030303" strokeWidth="1.5" markerEnd="url(#arr)" />
      <line x1="265" y1="180" x2="450" y2="290" stroke="#030303" strokeWidth="1.5" markerEnd="url(#arr)" />
      <text x="340" y="160" fontSize="11" fill="#404040">hs.SetCurrent(prev − dmg)</text>

      {/* 2. ObservableState (center) */}
      <g>
        <rect x="450" y="220" width="280" height="120" fill="#e7eaf0" stroke="#030303" strokeWidth="1.5" rx="4" />
        <text x="590" y="252" textAnchor="middle" fontSize="16" fontWeight="600" fill="#030303">HealthState</text>
        <text x="590" y="276" textAnchor="middle" fontSize="12" fill="#404040">ObservableState&lt;int&gt;</text>
        <text x="590" y="304" textAnchor="middle" fontSize="11" fontFamily="ui-monospace" fill="#1a1a1a">Set(next) →</text>
        <text x="590" y="322" textAnchor="middle" fontSize="11" fontFamily="ui-monospace" fill="#1a1a1a">for cb in subscribers: cb(prev, next)</text>
      </g>

      {/* 3. Subscribers fan-out */}
      <line x1="735" y1="245" x2="900" y2="80"  stroke="#030303" strokeWidth="1.5" markerEnd="url(#arr)" />
      <line x1="735" y1="280" x2="900" y2="195" stroke="#030303" strokeWidth="1.5" markerEnd="url(#arr)" />
      <line x1="735" y1="315" x2="900" y2="310" stroke="#030303" strokeWidth="1.5" markerEnd="url(#arr)" />
      <text x="800" y="160" fontSize="11" fill="#404040" fontStyle="italic">fires (prev, next)</text>

      <g>
        <rect x="900" y="40" width="280" height="74" fill="#fefefe" stroke="#030303" strokeWidth="1.5" rx="4" />
        <text x="1040" y="68" textAnchor="middle" fontSize="14" fontWeight="600" fill="#030303">OnHealthAutoDeath</text>
        <text x="1040" y="92" textAnchor="middle" fontSize="11" fill="#404040">prev&gt;0 &amp;&amp; next≤0 → LifeState.SetDead</text>

        <rect x="900" y="155" width="280" height="74" fill="#fefefe" stroke="#030303" strokeWidth="1.5" rx="4" />
        <text x="1040" y="183" textAnchor="middle" fontSize="14" fontWeight="600" fill="#030303">OnHitReaction</text>
        <text x="1040" y="207" textAnchor="middle" fontSize="11" fill="#404040">remainingTime = duration (붉은 깜빡임)</text>

        <rect x="900" y="270" width="280" height="74" fill="#fefefe" stroke="#030303" strokeWidth="1.5" rx="4" />
        <text x="1040" y="298" textAnchor="middle" fontSize="14" fontWeight="600" fill="#030303">기타 구독자</text>
        <text x="1040" y="322" textAnchor="middle" fontSize="11" fill="#404040">자유 함수로 자유롭게 추가</text>
      </g>

      {/* Subscribe registration (dashed, bottom) */}
      <g>
        <rect x="450" y="420" width="280" height="80" fill="#fefefe" stroke="#676f7b" strokeWidth="1.5" strokeDasharray="4 3" rx="4" />
        <text x="590" y="452" textAnchor="middle" fontSize="14" fontWeight="600" fill="#030303">Controller::Start()</text>
        <text x="590" y="478" textAnchor="middle" fontSize="11" fontFamily="ui-monospace" fill="#404040">{"hs.Subscribe([this](p, n){ ... })"}</text>
      </g>

      <line x1="590" y1="420" x2="590" y2="345" stroke="#676f7b" strokeWidth="1.5" strokeDasharray="4 3" markerEnd="url(#arrDashed)" />
      <text x="600" y="395" fontSize="11" fill="#676f7b" fontStyle="italic">Subscribe (1회 등록)</text>
    </svg>
  );
}

/* ─────────────────────────────────────────────
 * Diagram D: Framework Overview — GameLoop를 중심으로 전체 골격
 * ────────────────────────────────────────── */
export function FrameworkOverviewDiagram() {
  return (
    <svg viewBox="0 0 1200 640" className="w-full h-auto" aria-label="Framework overview">
      <defs>
        <marker id="arrFw" markerWidth="10" markerHeight="10" refX="9" refY="5" orient="auto">
          <path d="M0,0 L10,5 L0,10 z" fill="#030303" />
        </marker>
        <marker id="arrFwLight" markerWidth="10" markerHeight="10" refX="9" refY="5" orient="auto">
          <path d="M0,0 L10,5 L0,10 z" fill="#676f7b" />
        </marker>
      </defs>

      {/* GameLoop — 중심 */}
      <g>
        <rect x="40" y="40" width="380" height="560" fill="#e7eaf0" stroke="#030303" strokeWidth="2" rx="6" />
        <text x="60" y="72" fontSize="16" fontWeight="600" fill="#030303">GameLoop</text>
        <text x="60" y="92" fontSize="11" fill="#404040">메인 루프 · 매 프레임 Input → Update → Render</text>

        <text x="60" y="124" fontSize="11" fontWeight="600" fill="#676f7b" letterSpacing="0.5">MEMBERS</text>
        {[
          ["vector<GameObject*>", "gameWorld (reserve 1024)"],
          ["CollisionSystem",     "collisionSystem"],
          ["CombatSystem",        "combatSystem"],
          ["vector<EnemySpawner*>", "spawners"],
          ["GameState*",          "cachedGameState"],
          ["LevelLayout*",        "cachedLevelLayout"],
          ["float",               "deltaTime"],
          ["bool",                "isRunning"],
        ].map(([t, n], i) => (
          <g key={n}>
            <rect x="60" y={138 + i * 36} width="340" height="28" fill="#ffffff" stroke="#c9ccd1" rx="2" />
            <text x="72" y={157 + i * 36} fontSize="11" fontFamily="ui-monospace" fill="#404040">{t}</text>
            <text x="392" y={157 + i * 36} fontSize="11" fill="#030303" textAnchor="end" fontWeight="600">{n}</text>
          </g>
        ))}

        <text x="60" y="460" fontSize="11" fontWeight="600" fill="#676f7b" letterSpacing="0.5">LIFECYCLE</text>
        {[
          "Input()  ← Win32 → component->Input()",
          "Update() ← Start once, then Update(dt)",
          "         → collisionSystem.Update(world, dt)",
          "         → combatSystem.Update(world)",
          "         → spawner->Update(dt)",
          "         → cleanup pendingDestroy",
          "Render() ← Clear + component->Render()",
        ].map((l, i) => (
          <text key={l} x="60" y={478 + i * 16} fontSize="11" fontFamily="ui-monospace" fill="#1a1a1a">{l}</text>
        ))}
      </g>

      {/* GameObject */}
      <g>
        <rect x="470" y="40" width="320" height="280" fill="#fefefe" stroke="#030303" strokeWidth="1.5" rx="6" />
        <text x="490" y="72" fontSize="16" fontWeight="600" fill="#030303">GameObject</text>
        <text x="490" y="92" fontSize="11" fill="#404040">엔티티 — 데이터 + 컴포넌트 + 상태 컨테이너</text>

        <text x="490" y="124" fontSize="11" fontWeight="600" fill="#676f7b" letterSpacing="0.5">DATA</text>
        {[
          "name · pOwner",
          "position / velocity / scale / rotation",
          "teamId · pendingDestroy",
        ].map((l, i) => (
          <text key={l} x="500" y={144 + i * 18} fontSize="11" fontFamily="ui-monospace" fill="#1a1a1a">{l}</text>
        ))}

        <text x="490" y="208" fontSize="11" fontWeight="600" fill="#676f7b" letterSpacing="0.5">COLLECTIONS</text>
        <rect x="490" y="216" width="280" height="28" fill="#e7eaf0" stroke="#c9ccd1" rx="2" />
        <text x="500" y="235" fontSize="11" fontFamily="ui-monospace" fill="#030303">vector&lt;Component*&gt;  components</text>
        <rect x="490" y="252" width="280" height="28" fill="#e7eaf0" stroke="#c9ccd1" rx="2" />
        <text x="500" y="271" fontSize="11" fontFamily="ui-monospace" fill="#030303">vector&lt;State*&gt;      states</text>

        <text x="490" y="306" fontSize="11" fill="#676f7b">GetComponent&lt;T&gt;() · GetState&lt;T&gt;()</text>
      </g>

      {/* Component */}
      <g>
        <rect x="820" y="40" width="340" height="170" fill="#fefefe" stroke="#030303" strokeWidth="1.5" rx="6" />
        <text x="840" y="72" fontSize="16" fontWeight="600" fill="#030303">Component (base)</text>
        <text x="840" y="92" fontSize="11" fill="#404040">lifecycle을 가지는 데이터 모듈</text>

        <text x="840" y="124" fontSize="11" fontWeight="600" fill="#676f7b" letterSpacing="0.5">VIRTUAL</text>
        {[
          "Start()    · 처음 한 번 (Subscribe 등록)",
          "Input()    · 매 프레임 입력",
          "Update(dt) · 매 프레임 갱신",
          "Render()   · 매 프레임 그리기",
        ].map((l, i) => (
          <text key={l} x="850" y={144 + i * 16} fontSize="11" fontFamily="ui-monospace" fill="#1a1a1a">{l}</text>
        ))}
      </g>

      {/* State */}
      <g>
        <rect x="820" y="240" width="340" height="170" fill="#fefefe" stroke="#030303" strokeWidth="1.5" rx="6" />
        <text x="840" y="272" fontSize="16" fontWeight="600" fill="#030303">State (base)</text>
        <text x="840" y="292" fontSize="11" fill="#404040">값 — lifecycle 없음</text>

        <text x="840" y="324" fontSize="11" fontWeight="600" fill="#676f7b" letterSpacing="0.5">DESCENDANTS</text>
        {[
          "ObservableState<T>",
          "  ├─ HealthState   = …<int>",
          "  ├─ LifeState     = …<LifeStateType>",
          "  ├─ ScoreState    = …<int>",
          "  └─ … 그 외",
        ].map((l, i) => (
          <text key={l} x="850" y={344 + i * 14} fontSize="11" fontFamily="ui-monospace" fill="#1a1a1a">{l}</text>
        ))}
      </g>

      {/* Callbacks */}
      <g>
        <rect x="470" y="350" width="320" height="120" fill="#fefefe" stroke="#030303" strokeWidth="1.5" rx="6" />
        <text x="490" y="382" fontSize="16" fontWeight="600" fill="#030303">StateCallbacks (자유 함수)</text>
        <text x="490" y="402" fontSize="11" fill="#404040">모든 reaction 로직이 한 파일에 응집</text>
        {[
          "OnHealthAutoDeath / OnHitReaction",
          "OnControlLife / OnAnimAttack / …",
          "OnCollisionEnter / OnLifeEnemyDead",
        ].map((l, i) => (
          <text key={l} x="490" y={424 + i * 14} fontSize="11" fontFamily="ui-monospace" fill="#1a1a1a">{l}</text>
        ))}
      </g>

      {/* Logger sidecar */}
      <g>
        <rect x="470" y="500" width="690" height="100" fill="#fefefe" stroke="#030303" strokeWidth="1.5" rx="6" />
        <text x="490" y="532" fontSize="16" fontWeight="600" fill="#030303">Logger · Sinks</text>
        <text x="490" y="552" fontSize="11" fill="#404040">LOG_INFO(__FILE__, ...) → AuthorMap lookup → fan-out</text>
        {[
          "ConsoleLogSink   · stdout 즉시 출력",
          "FirebaseLogSink  · 비동기 큐 + worker → Realtime DB",
        ].map((l, i) => (
          <text key={l} x="490" y={574 + i * 14} fontSize="11" fontFamily="ui-monospace" fill="#1a1a1a">{l}</text>
        ))}
      </g>

      {/* connections */}
      <line x1="420" y1="120" x2="470" y2="180" stroke="#030303" strokeWidth="1.5" markerEnd="url(#arrFw)" />
      <text x="430" y="145" fontSize="10" fill="#676f7b">owns N</text>

      <line x1="790" y1="200" x2="820" y2="125" stroke="#676f7b" strokeWidth="1.2" markerEnd="url(#arrFwLight)" />
      <line x1="790" y1="265" x2="820" y2="325" stroke="#676f7b" strokeWidth="1.2" markerEnd="url(#arrFwLight)" />

      <line x1="630" y1="320" x2="630" y2="350" stroke="#676f7b" strokeWidth="1.2" strokeDasharray="3 3" markerEnd="url(#arrFwLight)" />
      <text x="640" y="343" fontSize="10" fill="#676f7b">Subscribe</text>
    </svg>
  );
}

/* ─────────────────────────────────────────────
 * Diagram E: Component Taxonomy — Component 파생들을 역할별로 그룹
 * ────────────────────────────────────────── */
export function ComponentTaxonomyDiagram() {
  return (
    <svg viewBox="0 0 1200 580" className="w-full h-auto" aria-label="Component taxonomy">
      <defs>
        <marker id="arrCT" markerWidth="10" markerHeight="10" refX="9" refY="5" orient="auto">
          <path d="M0,0 L10,5 L0,10 z" fill="#030303" />
        </marker>
      </defs>

      {/* base */}
      <g>
        <rect x="460" y="20" width="280" height="60" fill="#e7eaf0" stroke="#030303" strokeWidth="1.5" rx="4" />
        <text x="600" y="48" textAnchor="middle" fontSize="16" fontWeight="600" fill="#030303">Component</text>
        <text x="600" y="68" textAnchor="middle" fontSize="11" fill="#404040">Start · Input · Update · Render</text>
      </g>

      {/* 4 groups */}
      {[
        {
          x: 30, title: "Active Controllers", subtitle: "Update에서 능동 동작",
          items: [
            "PlayerControl",
            "EnemyController",
            "VelocityController",
            "AttackController",
            "GameFlowController",
          ],
        },
        {
          x: 310, title: "Reactive Listeners", subtitle: "Subscribe → 데이터 갱신",
          items: [
            "HealthController",
            "HitReactionController",
            "DeathTimer",
          ],
        },
        {
          x: 590, title: "Visual / Audio", subtitle: "그리고 들리는 것",
          items: [
            "MeshRenderer",
            "SpriteAnimator",
            "EnvironmentRenderer",
            "TerrainStateController",
          ],
        },
        {
          x: 870, title: "Data / Markers", subtitle: "필드 + 라벨",
          items: [
            "BoxCollider",
            "PickupItem",
            "LevelLayout",
          ],
        },
      ].map((g) => (
        <g key={g.title}>
          {/* arrow base → group head */}
          <line x1="600" y1="80" x2={g.x + 145} y2="135" stroke="#030303" strokeWidth="1.2" markerEnd="url(#arrCT)" />

          {/* group container */}
          <rect x={g.x} y="140" width="290" height="400" fill="#fefefe" stroke="#030303" strokeWidth="1.5" rx="6" />
          <text x={g.x + 20} y="170" fontSize="14" fontWeight="600" fill="#030303">{g.title}</text>
          <text x={g.x + 20} y="190" fontSize="11" fill="#676f7b">{g.subtitle}</text>

          {g.items.map((it, i) => (
            <g key={it}>
              <rect x={g.x + 20} y={210 + i * 38} width="250" height="30" fill="#ffffff" stroke="#c9ccd1" rx="3" />
              <text x={g.x + 30} y={230 + i * 38} fontSize="12" fontWeight="600" fill="#030303">{it}</text>
            </g>
          ))}
        </g>
      ))}
    </svg>
  );
}

/* ─────────────────────────────────────────────
 * Diagram F: Systems — GameLoop의 시스템 멤버 + 외부 spawners + Logger
 * ────────────────────────────────────────── */
export function SystemsDiagram() {
  return (
    <svg viewBox="0 0 1200 600" className="w-full h-auto" aria-label="Systems diagram">
      <defs>
        <marker id="arrSy" markerWidth="10" markerHeight="10" refX="9" refY="5" orient="auto">
          <path d="M0,0 L10,5 L0,10 z" fill="#030303" />
        </marker>
      </defs>

      {/* GameLoop systems lane */}
      <g>
        <rect x="20" y="30" width="700" height="540" fill="none" stroke="#030303" strokeWidth="1.2" rx="6" strokeDasharray="4 4" />
        <text x="40" y="22" fontSize="13" fontWeight="600" fill="#030303">GameLoop 멤버 시스템 (값 보유)</text>

        {/* CollisionSystem */}
        <g>
          <rect x="40" y="60" width="320" height="220" fill="#fefefe" stroke="#030303" strokeWidth="1.5" rx="4" />
          <text x="60" y="90" fontSize="14" fontWeight="600" fill="#030303">CollisionSystem</text>
          <text x="60" y="108" fontSize="11" fill="#404040">BoxCollider 기반 AABB prevention</text>
          {[
            "Update(world, dt)",
            "  1. BoxCollider 수집 (Disabled/Dead skip)",
            "  2. swept-axis prevention (X then Y)",
            "  3. Enter/Stay/Exit 콜백 발화",
            "",
            "정책 — 차단 대상은 self/other 팀 조합:",
            "  Player ← Wall + Enemy",
            "  Enemy  ← Wall만",
          ].map((l, i) => (
            <text key={i} x="60" y={130 + i * 16} fontSize="11" fontFamily="ui-monospace" fill="#1a1a1a">{l}</text>
          ))}
        </g>

        {/* CombatSystem */}
        <g>
          <rect x="380" y="60" width="320" height="220" fill="#fefefe" stroke="#030303" strokeWidth="1.5" rx="4" />
          <text x="400" y="90" fontSize="14" fontWeight="600" fill="#030303">CombatSystem</text>
          <text x="400" y="108" fontSize="11" fill="#404040">공격 hitbox 1회성 큐</text>
          {[
            "RequestHit(attacker, type, dmg)",
            "  → pendingHits.push_back(...)",
            "",
            "Update(world)",
            "  1. pendingHits를 swap·drain",
            "  2. attacker 전방 hitbox 검사",
            "  3. target.HealthState.SetCurrent(-dmg)",
            "",
            "필터: 같은 팀 / 사망 / Disabled enemy skip",
          ].map((l, i) => (
            <text key={i} x="400" y={130 + i * 16} fontSize="11" fontFamily="ui-monospace" fill="#1a1a1a">{l}</text>
          ))}
        </g>

        {/* spawners pointer collection */}
        <g>
          <rect x="40" y="310" width="660" height="240" fill="#fefefe" stroke="#030303" strokeWidth="1.5" rx="4" />
          <text x="60" y="340" fontSize="14" fontWeight="600" fill="#030303">spawners (vector&lt;EnemySpawner*&gt;)</text>
          <text x="60" y="358" fontSize="11" fill="#404040">포인터 컬렉션 — 실 객체는 main이 소유</text>

          {/* two spawner cards */}
          <rect x="60"  y="380" width="300" height="150" fill="#e7eaf0" stroke="#c9ccd1" rx="3" />
          <text x="75" y="406" fontSize="13" fontWeight="600" fill="#030303">EnemySpawner (Orc1)</text>
          {[
            "inactivePool: 50마리 (PreAllocate)",
            "Spawn()       → 풀에서 꺼내 활성화",
            "ReturnToPool  → (100,100,10)로 격리",
            "interval 5s → 0.6s로 시간 가속",
            "pStarSpawner — 사망 시 위임",
          ].map((l, i) => (
            <text key={i} x="75" y={426 + i * 18} fontSize="11" fontFamily="ui-monospace" fill="#1a1a1a">{l}</text>
          ))}

          <rect x="380" y="380" width="300" height="150" fill="#e7eaf0" stroke="#c9ccd1" rx="3" />
          <text x="395" y="406" fontSize="13" fontWeight="600" fill="#030303">EnemySpawner (Orc2 · Dash)</text>
          {[
            "inactivePool: 50마리",
            "+ dash 파라미터 (range/speed/prepTime)",
            "공통: pLayout, pPlayer 외부 참조",
            "",
            "두 spawner 모두 동일 StarSpawner 공유",
          ].map((l, i) => (
            <text key={i} x="395" y={426 + i * 18} fontSize="11" fontFamily="ui-monospace" fill="#1a1a1a">{l}</text>
          ))}
        </g>
      </g>

      {/* External: StarSpawner + Logger */}
      <g>
        <rect x="750" y="30" width="430" height="540" fill="none" stroke="#030303" strokeWidth="1.2" rx="6" strokeDasharray="4 4" />
        <text x="770" y="22" fontSize="13" fontWeight="600" fill="#030303">외부 시스템 (main 소유)</text>

        {/* StarSpawner */}
        <g>
          <rect x="770" y="60" width="390" height="170" fill="#fefefe" stroke="#030303" strokeWidth="1.5" rx="4" />
          <text x="790" y="90" fontSize="14" fontWeight="600" fill="#030303">StarSpawner</text>
          <text x="790" y="108" fontSize="11" fill="#404040">적 사망 위치에 Star 동적 생성</text>
          {[
            "SpawnAt(x, y)",
            "  → new GameObject + BoxCollider",
            "  → new Mesh (vertex buffer 별도)",
            "  → SpriteAnimator + idle 클립",
            "  → PickupItem (scoreValue=1, ownedMesh)",
            "  → loop.AddGameObject(star)",
            "",
            "풀링 X — 사망 빈도/위치 가변",
          ].map((l, i) => (
            <text key={i} x="790" y={128 + i * 14} fontSize="11" fontFamily="ui-monospace" fill="#1a1a1a">{l}</text>
          ))}
        </g>

        {/* Logger */}
        <g>
          <rect x="770" y="260" width="390" height="310" fill="#fefefe" stroke="#030303" strokeWidth="1.5" rx="4" />
          <text x="790" y="290" fontSize="14" fontWeight="600" fill="#030303">Logger (singleton)</text>
          <text x="790" y="308" fontSize="11" fill="#404040">LOG_INFO/WARN/ERROR/DEBUG 매크로</text>
          {[
            "LOG_INFO(__FILE__, fmt, ...)",
            "  → LogEntry { level, file, author, msg }",
            "  → AuthorMap.Lookup(__FILE__)",
            "  → 모든 sink에 발사",
          ].map((l, i) => (
            <text key={i} x="790" y={328 + i * 14} fontSize="11" fontFamily="ui-monospace" fill="#1a1a1a">{l}</text>
          ))}

          <text x="790" y="400" fontSize="11" fontWeight="600" fill="#676f7b" letterSpacing="0.5">SINKS</text>
          <rect x="790" y="410" width="350" height="50" fill="#e7eaf0" stroke="#c9ccd1" rx="3" />
          <text x="800" y="430" fontSize="12" fontWeight="600" fill="#030303">ConsoleLogSink</text>
          <text x="800" y="448" fontSize="11" fill="#404040">stdout 즉시</text>

          <rect x="790" y="470" width="350" height="80" fill="#e7eaf0" stroke="#c9ccd1" rx="3" />
          <text x="800" y="490" fontSize="12" fontWeight="600" fill="#030303">FirebaseLogSink</text>
          {[
            "큐 push + worker thread",
            "100ms 또는 큐≥10 → PATCH multi-update",
          ].map((l, i) => (
            <text key={i} x="800" y={508 + i * 14} fontSize="11" fill="#404040">{l}</text>
          ))}
        </g>
      </g>

      {/* arrow: spawners → StarSpawner */}
      <line x1="700" y1="430" x2="770" y2="120" stroke="#030303" strokeWidth="1.2" markerEnd="url(#arrSy)" />
      <text x="710" y="280" fontSize="10" fill="#676f7b" transform="rotate(-65 710 280)">위임</text>
    </svg>
  );
}

/* ─────────────────────────────────────────────
 * Diagram C: State 계층 (State → ObservableState<T> → 구체)
 * ────────────────────────────────────────── */
export function StateLayersDiagram() {
  return (
    <svg viewBox="0 0 1100 380" className="w-full h-auto" aria-label="State layer diagram">
      <defs>
        <marker id="arrL" markerWidth="10" markerHeight="10" refX="9" refY="5" orient="auto">
          <path d="M0,0 L10,5 L0,10 z" fill="#030303" />
        </marker>
      </defs>

      {/* L1: State (base) */}
      <g>
        <rect x="380" y="30" width="340" height="80" fill="#fefefe" stroke="#030303" strokeWidth="1.5" rx="4" />
        <text x="550" y="58" textAnchor="middle" fontSize="16" fontWeight="600" fill="#030303">State</text>
        <text x="550" y="80" textAnchor="middle" fontSize="11" fill="#404040">다형성 base · vector&lt;State*&gt;에 담기 위함</text>
        <text x="550" y="96" textAnchor="middle" fontSize="11" fill="#404040">virtual ~State() · GameObject* pOwner</text>
      </g>

      {/* arrow L1 → L2 */}
      <line x1="550" y1="115" x2="550" y2="155" stroke="#030303" strokeWidth="1.5" markerEnd="url(#arrL)" />
      <text x="565" y="140" fontSize="11" fill="#676f7b" fontStyle="italic">template 한 단계</text>

      {/* L2: ObservableState<T> */}
      <g>
        <rect x="340" y="160" width="420" height="80" fill="#e7eaf0" stroke="#030303" strokeWidth="1.5" rx="4" />
        <text x="550" y="188" textAnchor="middle" fontSize="16" fontWeight="600" fill="#030303">ObservableState&lt;T&gt;</text>
        <text x="550" y="210" textAnchor="middle" fontSize="11" fill="#404040">값 보관 + Subscribe 메커니즘 한 번만 작성</text>
        <text x="550" y="226" textAnchor="middle" fontSize="11" fill="#404040">T current · Set(next) · Subscribe(cb)</text>
      </g>

      {/* arrows L2 → 3 concrete */}
      <line x1="430" y1="245" x2="200" y2="295" stroke="#030303" strokeWidth="1.5" markerEnd="url(#arrL)" />
      <line x1="550" y1="245" x2="550" y2="295" stroke="#030303" strokeWidth="1.5" markerEnd="url(#arrL)" />
      <line x1="670" y1="245" x2="900" y2="295" stroke="#030303" strokeWidth="1.5" markerEnd="url(#arrL)" />

      {/* L3 concrete */}
      <g>
        <rect x="60"  y="300" width="280" height="60" fill="#fefefe" stroke="#030303" strokeWidth="1.5" rx="4" />
        <text x="200" y="324" textAnchor="middle" fontSize="14" fontWeight="600" fill="#030303">HealthState</text>
        <text x="200" y="344" textAnchor="middle" fontSize="11" fill="#404040">= ObservableState&lt;int&gt; + clamp</text>

        <rect x="410" y="300" width="280" height="60" fill="#fefefe" stroke="#030303" strokeWidth="1.5" rx="4" />
        <text x="550" y="324" textAnchor="middle" fontSize="14" fontWeight="600" fill="#030303">LifeState</text>
        <text x="550" y="344" textAnchor="middle" fontSize="11" fill="#404040">= ObservableState&lt;LifeStateType&gt;</text>

        <rect x="760" y="300" width="280" height="60" fill="#fefefe" stroke="#030303" strokeWidth="1.5" rx="4" />
        <text x="900" y="324" textAnchor="middle" fontSize="14" fontWeight="600" fill="#030303">ScoreState · …</text>
        <text x="900" y="344" textAnchor="middle" fontSize="11" fill="#404040">= ObservableState&lt;int&gt; + Add()</text>
      </g>
    </svg>
  );
}

/* ─────────────────────────────────────────────
 * Diagram B: Instance Map — 예시 그림 스타일
 * GameLoop::world 큰 외곽 박스 → Player / Enemy Pool / Star 구획
 * 각 인스턴스 안에 component 박스들
 * ────────────────────────────────────────── */
export function InstanceMapDiagram() {
  return (
    <svg viewBox="0 0 1200 700" className="w-full h-auto" aria-label="Instance map">
      {/* Outer GameLoop frame */}
      <rect x="20" y="40" width="1160" height="640" fill="none" stroke="#030303" strokeWidth="2" rx="8" />
      <text x="40" y="32" fontSize="14" fontWeight="600" fill="#030303">
        GameLoop :: gameWorld (100+ GameObject, reserve 1024)
      </text>

      {/* === 1. Player === */}
      <g>
        <rect x="50" y="80" width="320" height="580" fill="#fefefe" stroke="#030303" strokeWidth="1.5" rx="4" />
        <text x="70" y="110" fontSize="14" fontWeight="600" fill="#030303">1. Player</text>
        <text x="70" y="132" fontSize="12" fill="#404040">pos: (-0.2, 0)  ·  scale: 1.15</text>

        {/* States */}
        <text x="70" y="170" fontSize="11" fontWeight="600" fill="#676f7b" letterSpacing="0.5">STATES</text>
        {[
          "AttackState  (NoAttack / SwordAttack)",
          "LifeState  (Alive / Dead)",
          "MovementState  (방향)",
          "HealthState  (HP 0..10)",
          "ScoreState  (★)",
        ].map((s, i) => (
          <g key={s}>
            <rect x="70" y={180 + i * 30} width="280" height="22" fill="#e7eaf0" stroke="#c9ccd1" rx="2" />
            <text x="80" y={195 + i * 30} fontSize="11" fill="#030303">{s}</text>
          </g>
        ))}

        {/* Components */}
        <text x="70" y="360" fontSize="11" fontWeight="600" fill="#676f7b" letterSpacing="0.5">COMPONENTS</text>
        {[
          "PlayerControl  (입력 → velocity)",
          "AttackController  (검 타이머)",
          "HealthController  (무적 + 자동사망)",
          "VelocityController  (pos += v·dt)",
          "SpriteAnimator  (클립 전환)",
          "HitReactionController  (붉은 깜빡임)",
          "DeathTimer  (사망 후 N초)",
          "BoxCollider  (size, AABB)",
          "MeshRenderer  (player_atlas)",
        ].map((c, i) => (
          <g key={c}>
            <rect x="70" y={370 + i * 28} width="280" height="22" fill="#ffffff" stroke="#c9ccd1" rx="2" />
            <text x="80" y={385 + i * 28} fontSize="11" fill="#030303">{c}</text>
          </g>
        ))}
      </g>

      {/* === 2. Enemy Pool === */}
      <g>
        <rect x="400" y="80" width="380" height="580" fill="#fefefe" stroke="#030303" strokeWidth="1.5" rx="4" />
        <text x="420" y="110" fontSize="14" fontWeight="600" fill="#030303">2. Enemy Pool (×100)</text>
        <text x="420" y="132" fontSize="12" fill="#404040">활성: spawn된 적 · 비활성: (100,100,10)</text>

        {/* Stacked pool tiles */}
        <g>
          {Array.from({ length: 4 }).map((_, r) =>
            Array.from({ length: 6 }).map((__, c) => (
              <rect
                key={`${r}-${c}`}
                x={420 + c * 56}
                y={155 + r * 30}
                width="50"
                height="24"
                fill={r === 0 && c < 3 ? "#ffffff" : "#e7eaf0"}
                stroke="#c9ccd1"
                rx="2"
              />
            ))
          )}
          <text x="780" y="172" fontSize="10" fill="#676f7b" textAnchor="end">활성</text>
          <text x="780" y="262" fontSize="10" fill="#676f7b" textAnchor="end">풀</text>
        </g>

        <text x="420" y="310" fontSize="11" fontWeight="600" fill="#676f7b" letterSpacing="0.5">STATES</text>
        {[
          "EnemyState  (Disabled / Move / Dead)",
          "HealthState  (HP 2)",
          "LifeState",
        ].map((s, i) => (
          <g key={s}>
            <rect x="420" y={320 + i * 30} width="340" height="22" fill="#e7eaf0" stroke="#c9ccd1" rx="2" />
            <text x="430" y={335 + i * 30} fontSize="11" fill="#030303">{s}</text>
          </g>
        ))}

        <text x="420" y="430" fontSize="11" fontWeight="600" fill="#676f7b" letterSpacing="0.5">COMPONENTS</text>
        {[
          "EnemyController  (추적 + Dash)",
          "HealthController",
          "VelocityController",
          "SpriteAnimator  (orc1 / orc2)",
          "HitReactionController",
          "BoxCollider · MeshRenderer",
        ].map((c, i) => (
          <g key={c}>
            <rect x="420" y={440 + i * 28} width="340" height="22" fill="#ffffff" stroke="#c9ccd1" rx="2" />
            <text x="430" y={455 + i * 28} fontSize="11" fill="#030303">{c}</text>
          </g>
        ))}
      </g>

      {/* === 3. Star (Pickup) === */}
      <g>
        <rect x="810" y="80" width="340" height="280" fill="#fefefe" stroke="#030303" strokeWidth="1.5" rx="4" />
        <text x="830" y="110" fontSize="14" fontWeight="600" fill="#030303">3. Star  (동적 spawn)</text>
        <text x="830" y="132" fontSize="12" fill="#404040">적 사망 시 사망 위치에 생성</text>

        <text x="830" y="170" fontSize="11" fontWeight="600" fill="#676f7b" letterSpacing="0.5">COMPONENTS</text>
        {[
          "PickupItem  (scoreValue=1)",
          "SpriteAnimator  (13 frame idle)",
          "BoxCollider  (size 0.05)",
          "MeshRenderer  (Star.png)",
        ].map((c, i) => (
          <g key={c}>
            <rect x="830" y={180 + i * 28} width="300" height="22" fill="#ffffff" stroke="#c9ccd1" rx="2" />
            <text x="840" y={195 + i * 28} fontSize="11" fill="#030303">{c}</text>
          </g>
        ))}

        <text x="830" y="320" fontSize="11" fill="#404040">
          Player와 접촉 → ScoreState.Add(+1)
        </text>
        <text x="830" y="338" fontSize="11" fill="#404040">
          pendingDestroy = true → 다음 cleanup
        </text>
      </g>

      {/* === Wall / Systems === */}
      <g>
        <rect x="810" y="380" width="340" height="280" fill="#fefefe" stroke="#030303" strokeWidth="1.5" rx="4" />
        <text x="830" y="410" fontSize="14" fontWeight="600" fill="#030303">Walls · Systems</text>

        <text x="830" y="442" fontSize="11" fontWeight="600" fill="#676f7b" letterSpacing="0.5">WALLS</text>
        <g>
          {["Top", "Bottom", "Left", "Right"].map((d, i) => (
            <g key={d}>
              <rect x={830 + (i % 2) * 150} y={452 + Math.floor(i / 2) * 28} width="140" height="22" fill="#1a1a1a" rx="2" />
              <text x={830 + (i % 2) * 150 + 10} y={467 + Math.floor(i / 2) * 28} fontSize="11" fill="#ffffff">Wall_Bounds{d}</text>
            </g>
          ))}
        </g>

        <text x="830" y="540" fontSize="11" fontWeight="600" fill="#676f7b" letterSpacing="0.5">SYSTEMS (GameLoop 멤버)</text>
        {[
          "CollisionSystem  (BoxCollider prevention)",
          "CombatSystem  (공격 hitbox 큐)",
          "EnemySpawner × 2  (Orc1 / Orc2)",
          "StarSpawner",
        ].map((s, i) => (
          <g key={s}>
            <rect x="830" y={552 + i * 26} width="300" height="20" fill="#ffffff" stroke="#c9ccd1" rx="2" />
            <text x="840" y={566 + i * 26} fontSize="11" fill="#030303">{s}</text>
          </g>
        ))}
      </g>
    </svg>
  );
}

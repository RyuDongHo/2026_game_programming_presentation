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

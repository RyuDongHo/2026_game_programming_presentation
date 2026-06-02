"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import {
  SubscribeDiagram,
  InstanceMapDiagramA,
  InstanceMapDiagramB,
  StateLayersDiagram,
  FrameworkOverviewDiagram,
  SystemsDiagram,
} from "./diagrams";

/* ════════════════════════════════════════════════════════════
 * 가로 슬라이드 PPT 덱.
 *  - 좌우 화살표 / 키보드(←→, Space, Home/End)로 슬라이드 전환
 *  - 한 슬라이드 = 한 메시지 (폰트 크게, 다이어그램 높이 제한)
 *  - 발표 필수 5항:
 *      01 About · 02 How to Play · 03 Instance Map ·
 *      04 Class Diagram(★Subscribe/★Callback 응집/★Collision) · 05 Demo
 *  - Component Taxonomy 섹션은 제거하고, 대신 Subscribe/Callback 설명 뒤에
 *    "Component는 Start/Input/Update/Render만 가진다"는 일관성 예시 슬라이드 추가.
 * ══════════════════════════════════════════════════════════ */

/* ── 공통 머리말 ── */
function Head({ num, label }: { num: string; label: string }) {
  return (
    <div className="deck-head">
      <span className="t-meta text-stone">{num}</span>
      <span className="t-eyebrow text-graphite">{label}</span>
    </div>
  );
}

/* ── 슬라이드 정의 ── */
type SlideDef = { section: string; dark?: boolean; node: ReactNode };

const SLIDES: SlideDef[] = [
  /* ───────── 00. Title ───────── */
  {
    section: "Title",
    dark: true,
    node: (
      <div
        className="h-full flex flex-col justify-center text-on-primary"
        style={{ backgroundColor: "var(--color-scrim)", margin: "-84px -48px -92px", padding: "84px 48px 92px" }}
      >
        <div className="max-w-[1200px] mx-auto w-full">
          <p className="t-eyebrow text-on-primary/70">2026 · Game Programming · Presentation</p>
          <h1 className="t-display mt-6 max-w-[14ch]">StarEater</h1>
          <p className="t-subtitle mt-8 max-w-[40ch] text-on-primary/80">
            악마를 베어 넘기고, 그들이 떨어뜨린 별을 회수하라.
          </p>
          <p className="t-meta text-on-primary/50 mt-12">
            DirectX 11 · C++ 자작 2D 엔진 &nbsp;·&nbsp; → 또는 Space 키로 시작
          </p>
        </div>
      </div>
    ),
  },

  /* ───────── Agenda ───────── */
  {
    section: "Agenda",
    node: (
      <div>
        <Head num="—" label="Programme" />
        <h2 className="t-display max-w-[20ch]">오늘 다룰 다섯 가지.</h2>
        <ul className="mt-12 divide-y divide-hairline border-y border-hairline max-w-[760px]">
          {[
            ["01", "게임 소개 및 플레이방법"],
            ["02", "게임 룰 설명 · 흐름도"],
            ["03", "오브젝트 인스턴스 맵"],
            ["04", "클래스 다이어그램 ★ Subscribe 패턴"],
            ["05", "게임 실행 데모"],
          ].map(([n, t]) => (
            <li key={n} className="flex items-baseline gap-8 py-5">
              <span className="t-meta text-stone w-8">{n}</span>
              <span className="t-heading-sm text-ink">{t}</span>
            </li>
          ))}
        </ul>
      </div>
    ),
  },

  /* ═════════ 01. About ═════════ */
  {
    section: "01 · About",
    node: (
      <div>
        <Head num="01" label="About" />
        <h2 className="t-display max-w-[20ch]">평지 위에서, 적을 베고 별을 줍는다.</h2>
        <div className="mt-12 grid grid-cols-12 gap-x-10 gap-y-8">
          <p className="col-span-12 lg:col-span-7 t-subtitle text-graphite leading-snug">
            평지 한 화면 안에서 끊임없이 몰려드는 적을 검으로 막아내는 생존형 액션.
            사망한 적이 떨어뜨리는 별을 모아 점수를 올리고, 시간이 갈수록 빨라지는
            적의 압박을 견디는 시간 싸움이다.
          </p>
          <ul className="col-span-12 lg:col-span-5 t-body text-graphite space-y-3 border-t border-hairline pt-6">
            <li><span className="t-body-strong text-ink">장르 · </span>2D 액션 / 생존</li>
            <li><span className="t-body-strong text-ink">플랫폼 · </span>Windows (DirectX 11)</li>
            <li><span className="t-body-strong text-ink">제어 · </span>키보드 단독</li>
            <li><span className="t-body-strong text-ink">세션 · </span>~5분 (난이도 곡선 무한)</li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    section: "01 · About",
    node: (
      <div>
        <Head num="01" label="Screens" />
        <h2 className="t-heading-md max-w-[24ch]">난이도가 오를수록 배경이 핏빛으로.</h2>
        <div className="mt-10 grid grid-cols-12 gap-6">
          {[
            { label: "메인 화면", tag: "Title", src: "/main.png" },
            { label: "초기", tag: "Lv 1", src: "/first.png" },
            { label: "중반 — 적이 빨라짐", tag: "Lv 10", src: "/mid.png" },
            { label: "후반 — 핏빛 배경", tag: "Lv 20+", src: "/last.png" },
          ].map((m) => (
            <figure key={m.label} className="col-span-6 space-y-2">
              <img
                src={m.src}
                alt={m.label}
                className="aspect-video w-full object-cover"
                style={{ borderRadius: "var(--r-md)" }}
              />
              <figcaption className="flex justify-between items-baseline">
                <span className="t-body-strong text-ink">{m.label}</span>
                <span className="t-micro-caps text-slate">{m.tag}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    ),
  },

  /* ═════════ 02. How to Play ═════════ */
  {
    section: "02 · How to Play",
    node: (
      <div>
        <Head num="02" label="How to Play" />
        <h2 className="t-display max-w-[18ch]">룰은 단순. 곡선만 점점 가파르다.</h2>
        <div className="mt-12 grid grid-cols-12 gap-x-12 gap-y-10">
          <div className="col-span-12 lg:col-span-7">
            <p className="t-eyebrow text-graphite">Controls</p>
            <dl className="mt-5 divide-y divide-hairline border-t border-b border-hairline">
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
            <ul className="t-body text-graphite mt-5 space-y-2 list-disc pl-5">
              <li>적 1마리 처치 → 사망 위치에 별 생성</li>
              <li>플레이어가 별에 접촉 → 점수 +1</li>
              <li>점수는 <span className="text-ink">ScoreState</span>로 보관</li>
            </ul>
          </div>
        </div>
      </div>
    ),
  },
  {
    section: "02 · How to Play",
    node: (
      <div>
        <Head num="02" label="Combat · 피해 규칙" />
        <h2 className="t-heading-md max-w-[26ch]">맞으면 깎이고, 베면 떨군다.</h2>
        <div className="mt-8 grid grid-cols-12 gap-x-12 gap-y-8">
          <ul className="col-span-12 lg:col-span-7 t-body text-graphite space-y-3 list-disc pl-5">
            <li>플레이어 기본 체력 <span className="text-ink">HP 10</span> (좌하단 하트로 표시).</li>
            <li>적과 접촉하면 <span className="text-ink">HP −1</span>, 직후 짧은 <span className="text-ink">무적 시간</span>(피격 깜빡임) 동안 연속 피해를 막는다.</li>
            <li><span className="text-ink">Space</span> 검 공격 — 바라보는 방향 전방 hitbox.</li>
            <li>적 체력 <span className="text-ink">HP 2</span> → 두 번 맞히면 처치.</li>
            <li>처치한 적이 <span className="text-ink">별</span>을 떨구고, 주우면 점수 +1.</li>
            <li>HP가 <span className="text-ink">0</span>이 되면 게임 오버.</li>
          </ul>
          <div className="col-span-12 lg:col-span-5 self-center">
            <p className="t-eyebrow text-graphite">한 사이클</p>
            <pre className="code-block mt-4">
{`적 접근 → 검 공격(×2) → 처치
       → 별 드롭 → 줍기 → +1
맞으면 → HP −1 (잠깐 무적)
HP 0  → GameOver`}
            </pre>
          </div>
        </div>
      </div>
    ),
  },
  {
    section: "02 · How to Play",
    node: (
      <div>
        <Head num="02" label="Enemies · 2종류" />
        <h2 className="t-heading-md max-w-[28ch]">적은 둘 — 하나는 걷고, 하나는 덤빈다.</h2>
        <div className="mt-8 grid grid-cols-12 gap-8">
          <div className="col-span-12 lg:col-span-6 border-t border-hairline pt-5">
            <p className="t-body-strong text-ink">① Walker (Orc1)</p>
            <ul className="t-body text-graphite mt-3 space-y-2 list-disc pl-5">
              <li>플레이어를 향해 일정 속도로 <span className="text-ink">걸어서 추적</span>.</li>
              <li>접촉 시 피해. 단순하지만 점점 수가 많아진다.</li>
            </ul>
          </div>
          <div className="col-span-12 lg:col-span-6 border-t border-hairline pt-5">
            <p className="t-body-strong text-ink">② Dasher (Orc2)</p>
            <ul className="t-body text-graphite mt-3 space-y-2 list-disc pl-5">
              <li>추적하다 사거리에 들면 잠깐 <span className="text-ink">준비(DashPrep)</span> 후,</li>
              <li>플레이어 쪽으로 빠르게 <span className="text-ink">대시(돌진)</span>.</li>
              <li>피하지 않으면 압박이 크다 — 위치 선정이 핵심.</li>
            </ul>
          </div>
        </div>
        <p className="t-meta text-stone mt-8 max-w-[72ch]">
          두 종류 모두 시간이 지날수록(10초마다 레벨↑) 속도가 +10%씩 빨라진다. 후반엔 Walker 무리와 Dasher 돌진이 겹쳐 난이도가 가파르게 오른다.
        </p>
      </div>
    ),
  },
  {
    section: "02 · How to Play",
    node: (
      <div>
        <Head num="02" label="Game Flow · GameState" />
        <h2 className="t-heading-md max-w-[24ch]">게임은 세 가지 상태를 오간다.</h2>
        <div className="mt-8 grid grid-cols-12 gap-x-12 gap-y-8">
          <pre className="code-block col-span-12 lg:col-span-7 self-start">
{`MainMenu ─[Space]─► Playing ─[HP=0]─► GameOver
                      │
                      │ every 10s
                      ▼
                 level += 1
                 enemy speed × (1 + 0.1·(level−1))
                 background  brown → red`}
          </pre>
          <dl className="col-span-12 lg:col-span-5 space-y-4 self-center">
            {[
              ["MainMenu", "시작 화면 · Space로 게임 진입"],
              ["Playing", "전투 진행 · 10초마다 레벨·속도·배경 상승"],
              ["GameOver", "HP 0 도달 · 결과 표시 후 종료"],
            ].map(([k, v]) => (
              <div key={k} className="border-l-2 border-ink pl-4">
                <dt className="t-body-strong text-ink font-mono">{k}</dt>
                <dd className="t-body text-graphite mt-0.5">{v}</dd>
              </div>
            ))}
            <p className="t-meta text-stone pt-1">
              <span className="text-ink">GameState</span> = ObservableState&lt;GameStateType&gt; — 전환 시 BGM·UI가 Subscribe로 반응.
            </p>
          </dl>
        </div>
      </div>
    ),
  },

  /* ═════════ 03. Instance Map ═════════ */
  {
    section: "03 · Instance Map",
    node: (
      <div>
        <Head num="03" label="Instance Map · ① Player + Enemy" />
        <h2 className="t-heading-md max-w-[28ch]">런타임에 실제로 살아 있는 것들 — ①.</h2>
        <p className="t-body text-graphite mt-3 max-w-[66ch]">
          Player 1개와 Enemy 풀 100개. 각 GameObject가 어떤 State·Component를 들고 있는지.
        </p>
        <div className="diagram-fit mt-4 border border-hairline rounded-[var(--r-lg)] bg-canvas-warm p-5">
          <InstanceMapDiagramA />
        </div>
      </div>
    ),
  },
  {
    section: "03 · Instance Map",
    node: (
      <div>
        <Head num="03" label="Instance Map · ② Star + World" />
        <h2 className="t-heading-md max-w-[28ch]">런타임에 실제로 살아 있는 것들 — ②.</h2>
        <p className="t-body text-graphite mt-3 max-w-[66ch]">
          적이 죽을 때마다 동적으로 추가되는 Star, 그리고 정적 Wall과 매 프레임 도는 System들.
        </p>
        <div className="diagram-fit mt-4 border border-hairline rounded-[var(--r-lg)] bg-canvas-warm p-5">
          <InstanceMapDiagramB />
        </div>
      </div>
    ),
  },
  /* ═════════ 04. Class Diagram ═════════ */
  {
    section: "04 · Class Diagram",
    node: (
      <div>
        <Head num="04" label="Class Diagram" />
        <h2 className="t-display max-w-[18ch]">엔진을 네 개의 레이어로 본다.</h2>
        <p className="t-subtitle text-graphite mt-8 max-w-[60ch] leading-snug">
          Framework가 골격을, State가 데이터를, Component가 행동을, System이 매 프레임
          전체를 돌린다. 먼저 이 구성을 훑고 → 핵심인 <span className="text-ink">Subscribe 패턴</span> →
          그 위에서 만든 <span className="text-ink">Spawner 두 전략</span> 순으로 본다.
        </p>
      </div>
    ),
  },
  {
    section: "04 · Class Diagram",
    node: (
      <div>
        <Head num="04" label="프로젝트 구성 · 폴더 = 레이어" />
        <h2 className="t-heading-md max-w-[24ch]">폴더 구조가 곧 클래스 레이어다.</h2>
        <dl className="mt-8 divide-y divide-hairline border-y border-hairline max-w-[880px]">
          {[
            ["FrameWork/", "GameLoop · GameObject · State · Component (base)"],
            ["States/", "HealthState · LifeState · ScoreState · EnemyState · GameState"],
            ["Components/", "PlayerControl · EnemyController · HealthController · SpriteAnimator …"],
            ["Callbacks/", "StateCallbacks — 모든 반응 로직이 모이는 한 파일"],
            ["Systems", "CollisionSystem · CombatSystem · EnemySpawner · StarSpawner"],
          ].map(([k, v]) => (
            <div key={k} className="flex flex-col lg:flex-row lg:items-baseline gap-1 lg:gap-8 py-3.5">
              <dt className="t-body-strong text-ink font-mono w-40 shrink-0">{k}</dt>
              <dd className="t-body text-graphite">{v}</dd>
            </div>
          ))}
        </dl>
      </div>
    ),
  },
  {
    section: "04 · a · Framework",
    node: (
      <div>
        <Head num="04 a" label="Framework Overview" />
        <h2 className="t-heading-md max-w-[26ch]">GameLoop가 중심, 모든 것이 그 안에서.</h2>
        <div className="diagram-fit mt-5 border border-hairline rounded-[var(--r-lg)] bg-canvas-warm p-5">
          <FrameworkOverviewDiagram />
        </div>
      </div>
    ),
  },
  {
    section: "04 · b · State",
    node: (
      <div>
        <Head num="04 b" label="State Layers" />
        <h2 className="t-heading-md max-w-[24ch]">State / ObservableState&lt;T&gt; / 구체.</h2>
        <div className="diagram-fit mt-5 border border-hairline rounded-[var(--r-lg)] bg-canvas-warm p-5">
          <StateLayersDiagram />
        </div>
      </div>
    ),
  },
  {
    section: "04 · b · State",
    node: (
      <div>
        <Head num="04 b" label="State Layers · 왜 3계층인가" />
        <h2 className="t-heading-md max-w-[24ch]">굳이 한 단계 더 상속한 이유.</h2>
        <ol className="mt-8 t-subtitle text-graphite list-decimal pl-6 space-y-4 max-w-[68ch] leading-snug">
          <li>
            <span className="text-ink">vector&lt;State*&gt; 다형성</span> — template은 자체로 타입이 아니라 비-template base가 필요.
          </li>
          <li>
            <span className="text-ink">코드 1회</span> — Subscribe 메커니즘을 template으로 빼서 6-7번 반복 회피.
          </li>
          <li>
            <span className="text-ink">확장 여지</span> — Observable이 필요 없는 정적 State도 가능.
          </li>
        </ol>
      </div>
    ),
  },
  {
    section: "04 · c · Systems",
    node: (
      <div>
        <Head num="04 c" label="Systems" />
        <h2 className="t-heading-md max-w-[28ch]">매 프레임 gameWorld 전체를 도는 것들.</h2>
        <div className="diagram-fit mt-5 border border-hairline rounded-[var(--r-lg)] bg-canvas-warm p-5">
          <SystemsDiagram />
        </div>
      </div>
    ),
  },
  {
    section: "04 · d · Collision",
    node: (
      <div>
        <Head num="04 d" label="Collision — BoxCollider" />
        <h2 className="t-heading-md max-w-[26ch]">BoxCollider · swept-axis prevention.</h2>
        <p className="t-body text-graphite mt-4 max-w-[64ch]">
          매 프레임 X/Y 축을 분리해 이동을 시도하고, 다음 위치가 차단 대상과 겹치면 그 축
          이동만 취소 (밀어내기 X). 차단 대상은 self/other 팀 조합으로 다르다.
        </p>
        <div className="mt-8 overflow-x-auto border-t border-b border-hairline-soft max-w-[920px]">
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
                ["Enemy", "Wall만", "Player에 안 막힘, 다른 Enemy 통과"],
                ["Wall", "—", "정적 (velocity 0)"],
              ].map(([s, t, d]) => (
                <tr key={s} className="border-b border-hairline">
                  <td className="t-body-strong text-ink py-3.5 pr-6 align-top">{s}</td>
                  <td className="t-body text-ink py-3.5 pr-6 align-top">{t}</td>
                  <td className="t-body text-graphite py-3.5 align-top">{d}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    ),
  },

  /* ───── ★ Subscribe 패턴 ───── */
  {
    section: "04 · ★ Subscribe",
    dark: true,
    node: (
      <div
        className="h-full flex flex-col justify-center text-on-primary"
        style={{ backgroundColor: "var(--color-scrim)", margin: "-84px -48px -92px", padding: "84px 48px 92px" }}
      >
        <div className="max-w-[1200px] mx-auto w-full">
          <p className="t-eyebrow text-on-primary/60">★ 특이한 부분 1 · Subscribe Pattern</p>
          <h2 className="t-display mt-6 max-w-[20ch]">
            데이터가 바뀌면, 듣고 있던 사람들이 반응한다.
          </h2>
          <p className="t-subtitle mt-8 max-w-[56ch] text-on-primary/80 leading-snug">
            엔진의 거의 모든 동작이 한 패턴 위에 있다. 학교 종이 울리면 모든 교실이
            일제히 반응하듯 — 종 친 사람은 누가 듣는지 모른다.
          </p>
        </div>
      </div>
    ),
  },
  {
    section: "04 · ★ Subscribe",
    node: (
      <div>
        <Head num="Step 01" label="Problem" />
        <h2 className="t-heading-md max-w-[26ch]">HP가 0이 되면 무슨 일이 일어나야 하나?</h2>
        <ul className="mt-8 t-subtitle text-graphite list-disc pl-6 space-y-2 max-w-[60ch]">
          <li>LifeState를 Dead로 전환</li>
          <li>빨간 깜빡임 + 흔들림</li>
          <li>Player라면 GameState를 GameOver로</li>
          <li>적이라면 사망 위치에 Star + <span className="text-ink">dead.mp3</span></li>
          <li>EnemyState도 Dead로 동기화</li>
        </ul>
        <p className="t-body text-graphite mt-6 max-w-[60ch]">
          단순하게 짜면 — HP를 깎는 모든 곳에 이 다섯을 매번 호출. 트리거가 늘 때마다
          복사. 하나라도 빠뜨리면 버그.
        </p>
      </div>
    ),
  },
  {
    section: "04 · ★ Subscribe",
    node: (
      <div>
        <Head num="Step 02" label="Idea" />
        <h2 className="t-heading-md max-w-[28ch]">
          값을 보관하는 객체가 직접 &quot;변했다&quot;고 알려준다.
        </h2>
        <p className="t-subtitle text-graphite mt-8 max-w-[60ch] leading-snug">
          HP라는 데이터를 단순 int가 아니라 <span className="text-ink">관찰 가능한 State</span>로.
          누구나 거기에 &quot;값이 바뀌면 알려달라&quot;고 Subscribe할 수 있고, 값이 바뀌면
          등록된 모두에게 한꺼번에 알린다.
        </p>
      </div>
    ),
  },
  {
    section: "04 · ★ Subscribe",
    node: (
      <div>
        <Head num="Step 03" label="Container" />
        <h2 className="t-heading-md max-w-[24ch]">ObservableState&lt;T&gt; — 30줄짜리 척추.</h2>
        <pre className="code-block mt-7 max-w-[820px]">
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
        const auto callbacks = subscribers;   // snapshot — 재진입 안전
        for (auto& cb : callbacks) cb(prev, next);
    }
};`}
        </pre>
      </div>
    ),
  },
  {
    section: "04 · ★ Subscribe",
    node: (
      <div>
        <Head num="Step 04" label="Subscribe" />
        <h2 className="t-heading-md max-w-[24ch]">한 번 등록하고 잊는다.</h2>
        <pre className="code-block mt-7 max-w-[860px]">
{`// HealthController.cpp
void HealthController::Start() {
    HealthState* hs = pOwner->GetState<HealthState>();
    hs->Subscribe([this](int prev, int next) {
        StateCallbacks::OnHealthAutoDeath(this, prev, next);
    });
}

// HitReactionController.cpp — 같은 HealthState에 다른 콜백
void HitReactionController::Start() {
    pOwner->GetState<HealthState>()->Subscribe(
        [this](int prev, int next) {
            StateCallbacks::OnHitReaction(this, prev, next);
        });
}`}
        </pre>
      </div>
    ),
  },
  {
    section: "04 · ★ Subscribe",
    node: (
      <div>
        <Head num="Step 05" label="Set" />
        <h2 className="t-heading-md max-w-[28ch]">트리거는 한 줄. 무엇이 반응할지는 모름.</h2>
        <pre className="code-block mt-7 max-w-[760px]">
{`// (a) CombatSystem.cpp — 검 공격 적중
hs->SetCurrent(hs->GetCurrent() - hit.damage);

// (b) StateCallbacks.cpp — Player가 적과 접촉
hs->SetCurrent(hs->GetCurrent() - 1);`}
        </pre>
        <p className="t-body text-graphite mt-6 max-w-[56ch]">
          두 트리거 모두 &quot;값을 바꾼다&quot;만 안다. 사망·시각반응·사운드는 알 바 아니다.
        </p>
      </div>
    ),
  },
  {
    section: "04 · ★ Subscribe",
    node: (
      <div>
        <Head num="Step 06" label="Fan-out & Chain" />
        <h2 className="t-heading-md max-w-[24ch]">Set 한 번이 일으키는 도미노.</h2>
        <div className="diagram-fit mt-5 border border-hairline rounded-[var(--r-lg)] bg-canvas-warm p-5">
          <SubscribeDiagram />
        </div>
      </div>
    ),
  },
  {
    section: "04 · ★ Subscribe",
    node: (
      <div>
        <Head num="Step 07" label="Why it matters" />
        <h2 className="t-heading-md max-w-[24ch]">새 트리거도, 새 반응도 자유롭게.</h2>
        <ul className="mt-7 t-body text-graphite list-disc pl-6 space-y-2.5 max-w-[66ch]">
          <li><span className="text-ink">새 데미지 트리거</span> (화염 지대) — SetCurrent 한 줄. 사망/시각/사운드 자동.</li>
          <li><span className="text-ink">새 반응</span> (점수 표시) — Callback 추가 + Subscribe. 기존 코드 0줄 변경.</li>
          <li>&quot;HP가 줄면 무엇이 일어나지?&quot;가 한 곳에서 다 보인다.</li>
        </ul>
        <div className="grid grid-cols-12 gap-6 mt-8 max-w-[680px]">
          {[
            { n: "5", l: "한 트리거가 일으키는 반응" },
            { n: "1줄", l: "트리거 측 코드" },
            { n: "0", l: "새 반응 시 트리거 수정" },
          ].map((m) => (
            <div key={m.l} className="col-span-4">
              <p className="t-display-sm text-ink">{m.n}</p>
              <p className="t-meta text-stone mt-2">{m.l}</p>
            </div>
          ))}
        </div>
      </div>
    ),
  },

  /* ───── NEW: Component 일관성 (Taxonomy 대체) ───── */
  {
    section: "04 · 결과",
    node: (
      <div>
        <Head num="04" label="그래서 — Component의 모양" />
        <h2 className="t-heading-md max-w-[30ch]">
          모든 Component가 똑같은 네 메서드만 가진다.
        </h2>
        <p className="t-subtitle text-graphite mt-6 max-w-[62ch] leading-snug">
          Subscribe + StateCallbacks 덕분에 Component는 분기 로직을 들고 있을 필요가 없다.
          전부 <span className="text-ink">Start · Input · Update · Render</span> 네 메서드로 통일되고,
          실제 로직은 모두 callback으로 빠진다.
        </p>
        <div className="mt-8 grid grid-cols-12 gap-6 max-w-[860px]">
          {[
            ["Start()", "한 번 — Subscribe 등록"],
            ["Input()", "매 프레임 입력"],
            ["Update(dt)", "매 프레임 데이터/타이머"],
            ["Render()", "매 프레임 그리기"],
          ].map(([k, v]) => (
            <div key={k} className="col-span-6 border-t border-hairline pt-3">
              <p className="t-body-strong text-ink font-mono">{k}</p>
              <p className="t-meta text-stone mt-1">{v}</p>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    section: "04 · 결과",
    node: (
      <div>
        <Head num="04" label="예시 · 얇아진 Component" />
        <h2 className="t-heading-md max-w-[28ch]">HealthController는 데이터 + 등록뿐.</h2>
        <pre className="code-block mt-7 max-w-[900px]">
{`class HealthController : public Component {
    float invincibilityRemaining = 0.f;        // ① 데이터만 보유

    void Start() override {                     // ② 등록만
        GetState<HealthState>()->Subscribe(
            [this](int p, int n){ OnHealthAutoDeath(this, p, n); });
    }
    void Update(float dt) override {            // ③ 타이머만
        if (invincibilityRemaining > 0) invincibilityRemaining -= dt;
    }
    // Input() / Render() — 필요 없으면 비움
};

// 사망 판정·Star 생성·사운드·GameOver 전환 등 '무엇이 일어나는가'는
// 전부 StateCallbacks.cpp의 자유 함수로. Component엔 한 줄도 없다.`}
        </pre>
      </div>
    ),
  },
  {
    section: "04 · 결과",
    node: (
      <div>
        <Head num="04" label="일관성의 효과" />
        <h2 className="t-heading-md max-w-[26ch]">어떤 Component든 읽는 법이 같다.</h2>
        <div className="mt-8 grid grid-cols-12 gap-x-12 gap-y-6 max-w-[920px]">
          <ul className="col-span-12 lg:col-span-6 t-body text-graphite space-y-3 list-disc pl-6">
            <li>새 Component → 같은 4메서드 골격 복붙.</li>
            <li>&quot;이 컴포넌트가 뭘 하지?&quot; → Start의 Subscribe만 보면 됨.</li>
            <li>분기·반응 로직은 전부 한 파일(StateCallbacks)에 응집.</li>
          </ul>
          <div className="col-span-12 lg:col-span-6 border-l border-hairline pl-8">
            <p className="t-eyebrow text-graphite">한눈에</p>
            <p className="t-subtitle text-ink mt-3 leading-snug">
              Component = 데이터 + 4 lifecycle.<br />
              Logic = callback.
            </p>
          </div>
        </div>
      </div>
    ),
  },

  /* ───── ★ Callback 응집 ───── */
  {
    section: "04 · ★ Callback",
    node: (
      <div>
        <Head num="★ 특이한 부분 2" label="Callback 응집" />
        <h2 className="t-heading-md max-w-[26ch]">Component class에 동작을 넣지 않는다.</h2>
        <p className="t-body text-graphite mt-4 max-w-[64ch]">
          모든 reaction을 <span className="text-ink">Callbacks/StateCallbacks.cpp</span>의 자유 함수로 모은다.
          &quot;HP가 줄면 무엇이 일어나는가&quot;는 한 파일을 훑으면 다 보인다.
        </p>
        <pre className="code-block mt-6 max-w-[900px]">
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
// OnHitReaction / OnAnimAttack / OnCollisionEnter / OnScoreChange ...`}
        </pre>
      </div>
    ),
  },

  /* ═════════ 04. Spawner — 두 전략 (Subscribe 뒤) ═════════ */
  {
    section: "04 · Spawner",
    node: (
      <div>
        <Head num="04" label="Spawner — 두 가지 생성 전략" />
        <h2 className="t-heading-md max-w-[26ch]">적과 별을 어떻게 만들 것인가.</h2>
        <p className="t-subtitle text-graphite mt-6 max-w-[64ch] leading-snug">
          EnemySpawner와 StarSpawner는 객체를 만들어 gameWorld에 넣는다. 처음엔 둘 다
          그때그때 <span className="text-ink">new</span>로 즉석 생성했는데, 그 방식이
          use-after-free를 불렀다. 그래서 객체 성격에 맞춰 두 전략으로 갈랐다.
        </p>
        <div className="mt-10 grid grid-cols-12 gap-6 max-w-[820px]">
          <div className="col-span-12 lg:col-span-6 border-t border-hairline pt-4">
            <p className="t-body-strong text-ink">Enemy → Pooling</p>
            <p className="t-meta text-stone mt-1">수명 길고 재사용 가능 → 미리 만들어 둔다</p>
          </div>
          <div className="col-span-12 lg:col-span-6 border-t border-hairline pt-4">
            <p className="t-body-strong text-ink">Star → Dynamic + reserve</p>
            <p className="t-meta text-stone mt-1">위치 가변·수명 짧음 → 동적 생성 + capacity 확보</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    section: "04 · Spawner",
    node: (
      <div>
        <Head num="04" label="Spawner · 사고의 발단" />
        <h2 className="t-heading-md max-w-[24ch]">
          적을 베면 디버거가 <span className="text-ink">0xFFFF…FFFB</span>를 띄웠다.
        </h2>
        <div className="mt-8 space-y-5 max-w-[72ch]">
          <p className="t-body text-graphite">
            검 한 번 → CombatSystem이 hitbox 안 적을 순회 → 한 마리 죽음 → Subscribe 체인이
            OnLifeEnemyDead 발화 → StarSpawner가 <span className="text-ink">loop.AddGameObject(star)</span> →
            내부적으로 <span className="text-ink">gameWorld.push_back</span>.
          </p>
          <p className="t-body text-graphite">
            그 순간 vector capacity 초과 → <span className="text-ink">재할당</span> → 옛 메모리 free.
            하지만 CombatSystem의 range-based for는 옛 iterator를 잡고 있었다 → freed 메모리 read →
            debug heap sentinel <span className="text-ink">0xFFFF…FFFB</span> → access violation.
          </p>
        </div>
      </div>
    ),
  },
  {
    section: "04 · Spawner",
    node: (
      <div>
        <Head num="04" label="Spawner · 사고 현장 (code)" />
        <h2 className="t-heading-md max-w-[22ch]">한 줄의 push_back이 부순 것.</h2>
        <pre className="code-block mt-8 max-w-[880px]">
{`// CombatSystem.cpp
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
    ),
  },
  {
    section: "04 · Spawner",
    node: (
      <div>
        <Head num="04" label="전략 ① Pooling (Enemy)" />
        <h2 className="t-heading-md max-w-[26ch]">생성을 게임 시작 전에 끝낸다.</h2>
        <p className="t-body text-graphite mt-4 max-w-[64ch]">
          게임 시작 전에 100마리를 미리 생성해 풀에 넣고 활성/비활성만 토글.
          <span className="text-ink"> 런타임에 push_back이 없으므로 iterator invalidation 위험 자체가 없다.</span>
          (트레이드오프 — 활성+비활성 합쳐 100마리 상한.)
        </p>
        <pre className="code-block mt-6 max-w-[880px]">
{`spawner1->PreAllocate(50);
spawner2->PreAllocate(50);
loop.Run();                       // 이후 gameWorld 크기 불변

void Spawn() {                    // 풀에서 꺼내쓰기
    GameObject* e = inactivePool.back();
    inactivePool.pop_back();
    e->position = randomSpawnPos();
    e->GetState<EnemyState>()->SetMove();
}
void ReturnToPool(GameObject* e) {
    e->position = { 100, 100, 10 };  // 영역 밖 격리
    e->GetState<EnemyState>()->SetDisabled();
    inactivePool.push_back(e);
}`}
        </pre>
      </div>
    ),
  },
  {
    section: "04 · Spawner",
    node: (
      <div>
        <Head num="04" label="전략 ② Dynamic + reserve (Star)" />
        <h2 className="t-heading-md max-w-[28ch]">capacity를 미리 확보해 재할당을 막는다.</h2>
        <p className="t-body text-graphite mt-4 max-w-[64ch]">
          Star는 위치가 매번 다르고 수명도 짧아 풀로 묶기 어렵다. 동적 spawn을 유지하되
          <span className="text-ink"> reserve(1024)</span>로 capacity를 시작 시점에 확보한다.
        </p>
        <pre className="code-block mt-6 max-w-[880px]">
{`GameLoop::GameLoop() {
    gameWorld.reserve(1024);   // ← 핵심 한 줄
}

// 표준 보장: vector가 재할당하지 않는 한 push_back은
// iterator를 invalidate하지 않는다. 같은 프레임의 새 push는
// 다음 frame부터 보인다 — 의도된 동작.`}
        </pre>
      </div>
    ),
  },
  {
    section: "04 · Spawner",
    node: (
      <div>
        <Head num="04" label="두 전략 비교" />
        <h2 className="t-heading-md max-w-[24ch]">객체 성격에 맞게 골라 쓴다.</h2>
        <div className="mt-8 overflow-x-auto border-t border-b border-hairline-soft max-w-[960px]">
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
                ["언제 할당", "게임 시작 전", "런타임 (적 사망 시)"],
                ["push_back", "X (Run 이후)", "O (매 사망마다)"],
                ["iterator 안전", "구조적으로 보장", "capacity 안에서만 보장"],
                ["수량 상한", "PreAllocate (100)", "reserve (1024)"],
                ["적합한 객체", "수명 길고 재사용 가능", "수명 짧고 위치 가변"],
              ].map(([k, a, b]) => (
                <tr key={k} className="border-b border-hairline">
                  <td className="t-body-strong text-ink py-3.5 pr-6 align-top w-40">{k}</td>
                  <td className="t-body text-graphite py-3.5 pr-6 align-top">{a}</td>
                  <td className="t-body text-graphite py-3.5 align-top">{b}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    ),
  },

  /* ═════════ 05. Demo ═════════ */
  {
    section: "05 · Demo",
    node: (
      <div>
        <Head num="05" label="Demo" />
        <h2 className="t-display max-w-[16ch]">움직이는 시스템.</h2>
        <p className="t-eyebrow text-graphite mt-10">Full Playthrough</p>
        <div
          className="mt-4 w-full max-w-[900px]"
          style={{ aspectRatio: "16 / 9", borderRadius: "var(--r-lg)", overflow: "hidden", backgroundColor: "#000" }}
        >
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/kuB8sLnu2Kk"
            title="StarEater 데모"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
        <p className="t-meta text-stone mt-3">
          <a
            href="https://youtu.be/kuB8sLnu2Kk"
            className="underline underline-offset-2 hover:text-ink"
          >
            youtu.be/kuB8sLnu2Kk
          </a>
        </p>
      </div>
    ),
  },
  /* ───────── Closing ───────── */
  {
    section: "End",
    dark: true,
    node: (
      <div
        className="h-full flex flex-col justify-center text-on-primary"
        style={{ backgroundColor: "var(--color-footer)", margin: "-84px -48px -92px", padding: "84px 48px 92px" }}
      >
        <div className="max-w-[1200px] mx-auto w-full">
          <p className="t-eyebrow text-on-primary/60">Thank you</p>
          <h2 className="t-display mt-6 max-w-[18ch]">Subscribe 하나로 엮인 작은 엔진.</h2>
          <div className="mt-10 flex flex-wrap gap-x-10 gap-y-3 t-body text-on-primary/70">
            <a className="hover:text-on-primary underline underline-offset-4" href="https://github.com/RyuDongHo/custom-game-engine">
              GitHub · custom-game-engine
            </a>
            <a className="hover:text-on-primary underline underline-offset-4" href="https://github.com/RyuDongHo/custom-game-engine/pull/9">
              Pull Request #9
            </a>
          </div>
          <p className="t-meta text-stone mt-12">2026 Game Programming · DX11 + C++ + Firebase</p>
        </div>
      </div>
    ),
  },
];

export default function Home() {
  const total = SLIDES.length;
  const [i, setI] = useState(0);

  const go = useCallback(
    (n: number) => setI((prev) => Math.max(0, Math.min(total - 1, n))),
    [total],
  );
  const next = useCallback(() => go(i + 1), [go, i]);
  const prev = useCallback(() => go(i - 1), [go, i]);

  // 휠 연타가 여러 장을 한 번에 넘기지 않도록 잠금.
  const lockRef = useRef(false);
  const stepLocked = useCallback(
    (dir: number) => {
      if (lockRef.current) return;
      lockRef.current = true;
      setI((p) => Math.max(0, Math.min(total - 1, p + dir)));
      window.setTimeout(() => {
        lockRef.current = false;
      }, 600);
    },
    [total],
  );

  // 키보드 + 마우스 휠/트랙패드. wheel은 passive:false로 페이지 바운스 차단.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowRight":
        case "ArrowDown":
        case "PageDown":
        case " ":
          e.preventDefault();
          setI((p) => Math.min(total - 1, p + 1));
          break;
        case "ArrowLeft":
        case "ArrowUp":
        case "PageUp":
          e.preventDefault();
          setI((p) => Math.max(0, p - 1));
          break;
        case "Home":
          setI(0);
          break;
        case "End":
          setI(total - 1);
          break;
      }
    };
    const onWheel = (e: WheelEvent) => {
      const d = Math.abs(e.deltaY) >= Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
      if (Math.abs(d) < 12) return;
      e.preventDefault();
      stepLocked(d > 0 ? 1 : -1);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("wheel", onWheel);
    };
  }, [total, stepLocked]);

  // 터치 스와이프.
  const touchX = useRef<number | null>(null);
  const onTouchStart = (e: React.TouchEvent) => {
    touchX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    touchX.current = null;
    if (Math.abs(dx) < 45) return;
    setI((p) => Math.max(0, Math.min(total - 1, p + (dx < 0 ? 1 : -1))));
  };

  const cur = SLIDES[i];

  return (
    <div
      className="deck"
      data-dark={cur.dark ? "true" : "false"}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* top chrome */}
      <div className="deck-topbar">
        <span className="deck-brand">custom game engine</span>
        <span className="deck-section">{cur.section}</span>
      </div>

      {/* track */}
      <div className="deck-track" style={{ transform: `translateX(-${i * 100}vw)` }}>
        {SLIDES.map((s, idx) => (
          <div className="deck-slide" key={idx} aria-hidden={idx !== i}>
            <div className="deck-inner">{s.node}</div>
          </div>
        ))}
      </div>

      {/* arrows */}
      <button className="deck-arrow deck-arrow-left" onClick={prev} disabled={i === 0} aria-label="이전 슬라이드">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>
      <button className="deck-arrow deck-arrow-right" onClick={next} disabled={i === total - 1} aria-label="다음 슬라이드">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>

      {/* bottom chrome */}
      <div className="deck-bottombar">
        <span className="deck-hint">휠 · ← → · Space · 스와이프로 이동</span>
        <div className="deck-progress">
          <span style={{ width: `${((i + 1) / total) * 100}%` }} />
        </div>
        <span className="deck-counter">
          {String(i + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
      </div>
    </div>
  );
}

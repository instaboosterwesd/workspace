import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { ChevronDown, Gamepad2, HelpCircle, History, Languages, Menu, Minus, Music2, Plus, ShieldCheck, Sparkles, UserRound, Volume2 } from "lucide-react";

import loadingAsset from "../assets/aviator/loading.png.asset.json";
import wordmarkAsset from "../assets/aviator/wordmark.svg.asset.json";
import officialAsset from "../assets/aviator/official.svg.asset.json";
import partnersLogoAsset from "../assets/aviator/partners-logo.svg.asset.json";
import avatar1 from "../assets/aviator/avatar-1.png.asset.json";
import avatar2 from "../assets/aviator/avatar-2.png.asset.json";
import avatar3 from "../assets/aviator/avatar-3.png.asset.json";
import avatar4 from "../assets/aviator/avatar-4.png.asset.json";
import avatar5 from "../assets/aviator/avatar-5.png.asset.json";
import avatar6 from "../assets/aviator/avatar-6.png.asset.json";
import avatar7 from "../assets/aviator/avatar-7.png.asset.json";
import avatar8 from "../assets/aviator/avatar-8.png.asset.json";
import avatar9 from "../assets/aviator/avatar-9.png.asset.json";
import avatar10 from "../assets/aviator/avatar-10.png.asset.json";
import avatar11 from "../assets/aviator/avatar-11.png.asset.json";
import avatar12 from "../assets/aviator/avatar-12.png.asset.json";
import planeFrameSmall from "../assets/aviator/plane-frame-1.svg";
import planeFrameMedium from "../assets/aviator/plane-frame-2.svg";
import planeFrameBig from "../assets/aviator/plane-frame-3.svg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Aviator — Live Flight Game" },
      { name: "description", content: "A fast live multiplier flight game interface." },
      { property: "og:title", content: "Aviator — Live Flight Game" },
      { property: "og:description", content: "A fast live multiplier flight game interface." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AviatorGame,
});

const avatars = [avatar1, avatar2, avatar3, avatar4, avatar5, avatar6, avatar7, avatar8, avatar9, avatar10, avatar11, avatar12];
const planeFrames = [planeFrameSmall, planeFrameMedium, planeFrameBig];
const planeFrameNames = ["small", "medium", "big"] as const;
const maxMultiplier = 20;

type LiveBet = { id: string; name: string; avatar: number; amount: number; cashAt: number | null };

function makeRoundBets(seed: number): LiveBet[] {
  const count = 26;
  const list: LiveBet[] = [];
  for (let i = 0; i < count; i += 1) {
    const amount = Math.round((300 + Math.random() * 7700) / 100) * 100;
    list.push({
      id: `${seed}-${i}`,
      name: `1***${Math.floor(Math.random() * 10)}`,
      avatar: Math.floor(Math.random() * 12),
      amount,
      cashAt: Math.random() < 0.45 ? Number((1.05 + Math.random() * 1.75).toFixed(2)) : null,
    });
  }
  return list.sort((a, b) => b.amount - a.amount);
}

const money = (value: number) => value.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const history = [
  "1.00x", "1.26x", "1.24x", "9.13x", "1.01x", "1.50x", "4.55x", "7.15x", "1.14x", "1.50x", "7.04x", "1.02x", "4.34x", "1.92x", "1.32x", "11.11x", "2.66x", "5.64x",
  "1.88x", "1.01x", "10.53x", "1.70x", "1.27x", "2.39x", "1.85x", "5.05x", "1.04x", "3.07x", "1.87x", "1.52x", "1.18x", "5.97x", "1.93x", "1.50x", "1.52x", "1.39x",
  "5.35x", "1.50x", "12.02x", "1.56x", "1.26x", "2.99x", "1.14x", "74.65x", "1.12x", "17.41x", "1.26x", "1.19x", "2.60x", "3.93x", "1.02x", "1.90x", "3.04x",
];

function historyTone(value: string) {
  const multiplierValue = Number.parseFloat(value);
  if (multiplierValue >= 10) return "pink";
  if (multiplierValue >= 2) return "purple";
  return "blue";
}

function LoadingScreen({ progress }: { progress: number }) {
  return (
    <div className="aviator-loader" aria-label="Loading game">
      <div className="loader-center">
        <img src={loadingAsset.url} alt="Aviator" className="loader-logo" />
        <div className="loader-progress-row">
          <div className="loader-track"><div className="loader-fill" style={{ width: `${progress}%` }} /></div>
          <span>{progress}%</span>
        </div>
        <p><img src={wordmarkAsset.url} alt="Aviator" /> is a 100% provably fair game.</p>
        <small>If you find that the game has modified the game results and submit relevant evidence to customer service, you can receive a maximum compensation of 100000 USDT</small>
      </div>
    </div>
  );
}

function AutoToggle({ checked, onToggle, label }: { checked: boolean; onToggle: () => void; label: string }) {
  return (
    <button className={checked ? "auto-switch on" : "auto-switch"} aria-pressed={checked} aria-label={label} onClick={onToggle}>
      <i />
    </button>
  );
}

function AutoStepper({ value, onChange, step = 1, suffix = "" }: { value: number; onChange: (value: number) => void; step?: number; suffix?: string }) {
  const decimals = step < 1 ? 1 : suffix === "%" ? 0 : 2;
  return (
    <div className="auto-stepper">
      <div className="auto-stepper-core">
        <button aria-label={`Decrease ${suffix || "value"}`} onClick={() => onChange(Math.max(0, Number((value - step).toFixed(decimals))))}><Minus /></button>
        <strong>{value.toFixed(decimals)}</strong>
        <button aria-label={`Increase ${suffix || "value"}`} onClick={() => onChange(Number((value + step).toFixed(decimals)))}><Plus /></button>
      </div>
      {suffix && <span>{suffix}</span>}
    </div>
  );
}

function PlaneAnimation({ animationOn, label }: { animationOn: boolean; label?: string }) {
  return (
    <div className={animationOn ? "plane-frame-stack" : "plane-frame-stack paused"} role={label ? "img" : undefined} aria-label={label}>
      {planeFrames.map((frame, index) => (
        <img className={`plane-frame-layer ${planeFrameNames[index]}`} key={frame} src={frame} alt="" aria-hidden="true" />
      ))}
    </div>
  );
}

function BetPanel({ initial }: { initial: number }) {
  const [amount, setAmount] = useState(initial);
  const [placed, setPlaced] = useState(false);
  const [mode, setMode] = useState<"Bet" | "Auto">("Bet");
  const [autoCashOut, setAutoCashOut] = useState(false);
  const [autoTarget, setAutoTarget] = useState(1.1);
  const [autoOpen, setAutoOpen] = useState(false);
  const [rounds, setRounds] = useState(100);
  const [stopDecrease, setStopDecrease] = useState(false);
  const [stopIncrease, setStopIncrease] = useState(false);
  const [stopSingleWin, setStopSingleWin] = useState(false);
  const [loseReturn, setLoseReturn] = useState(true);
  const [loseIncrease, setLoseIncrease] = useState(false);
  const [loseDecrease, setLoseDecrease] = useState(false);
  const [winReturn, setWinReturn] = useState(true);
  const [winIncrease, setWinIncrease] = useState(false);
  const [winDecrease, setWinDecrease] = useState(false);
  const [stopDecreaseValue, setStopDecreaseValue] = useState(0);
  const [stopIncreaseValue, setStopIncreaseValue] = useState(0);
  const [stopSingleWinValue, setStopSingleWinValue] = useState(0);
  const [loseIncreaseValue, setLoseIncreaseValue] = useState(100);
  const [loseDecreaseValue, setLoseDecreaseValue] = useState(50);
  const [winIncreaseValue, setWinIncreaseValue] = useState(100);
  const [winDecreaseValue, setWinDecreaseValue] = useState(50);
  const change = (by: number) => setAmount((value) => Math.max(10, value + by));
  return (
    <section className={mode === "Auto" ? "bet-panel auto-mode" : "bet-panel"}>
      <div className="bet-tabs">
        {(["Bet", "Auto"] as const).map((item) => <button key={item} className={mode === item ? "active" : ""} onClick={() => setMode(item)}>{item}</button>)}
      </div>
      <div className="bet-panel-body">
        <div className="stake-tools">
          <div className="stake-row">
            <button aria-label="Decrease bet" onClick={() => change(-10)}><Minus /></button>
            <strong>{amount.toFixed(2)}</strong>
            <button aria-label="Increase bet" onClick={() => change(10)}><Plus /></button>
          </div>
          <div className="quick-grid">
            {[10, 100, 500, 1000].map((value) => <button key={value} onClick={() => setAmount(value)}>{value.toLocaleString()}</button>)}
          </div>
        </div>
        <button className={placed ? "main-bet placed" : "main-bet"} onClick={() => setPlaced(!placed)}>
          <span>{placed ? "CANCEL" : "BET"}</span>
          <b>{amount.toFixed(2)} INR</b>
        </button>
      </div>
      {mode === "Auto" && (
        <div className="auto-row">
          <button className="auto-play" onClick={() => setAutoOpen(true)}>AUTO PLAY</button>
          <div className="auto-cashout">
            <span>Auto Cash Out</span>
            <button className={autoCashOut ? "switch on" : "switch"} aria-pressed={autoCashOut} aria-label="Auto cash out" onClick={() => setAutoCashOut(!autoCashOut)}><i /></button>
            <strong>
              <span>{autoTarget.toFixed(1)}</span>
              <button className="auto-clear" aria-label="Clear auto cash out" onClick={() => setAutoCashOut(false)}>×</button>
            </strong>
          </div>
        </div>
      )}
      {autoOpen && (
        <div className="help-backdrop" onClick={() => setAutoOpen(false)}>
          <section className="help-dialog auto-dialog" role="dialog" aria-modal="true" aria-labelledby="auto-play-title" onClick={(event) => event.stopPropagation()}>
            <div className="help-dialog-head"><h2 id="auto-play-title">Auto Play Options</h2><button aria-label="Close" onClick={() => setAutoOpen(false)}>×</button></div>
            <div className="auto-dialog-scroll">
              <section className="auto-section rounds-section">
                <p className="auto-section-title">Number of rounds:</p>
                <div className="round-chips">
                  {[10, 20, 50, 100, 500, 1000].map((value) => <button key={value} className={rounds === value ? "active" : ""} onClick={() => setRounds(value)}>{value}</button>)}
                </div>
                <div className="auto-cash-field">
                  <span>Auto Cash Out:</span>
                  <div className="auto-cash-value">
                    <input aria-label="Auto cash out value" value={autoTarget} onChange={(event) => setAutoTarget(Number(event.target.value) || 1)} />
                    <button aria-label="Clear auto cash out" onClick={() => setAutoTarget(1.1)}>×</button>
                  </div>
                </div>
              </section>
              <div className="auto-rule">
                <AutoToggle checked={stopDecrease} onToggle={() => setStopDecrease((value) => !value)} label="Stop if cash decreases" />
                <span>Stop if cash decreases by</span>
                <AutoStepper value={stopDecreaseValue} onChange={setStopDecreaseValue} suffix="INR" />
              </div>
              <div className="auto-rule">
                <AutoToggle checked={stopIncrease} onToggle={() => setStopIncrease((value) => !value)} label="Stop if cash increases" />
                <span>Stop if cash increases by</span>
                <AutoStepper value={stopIncreaseValue} onChange={setStopIncreaseValue} suffix="INR" />
              </div>
              <div className="auto-rule">
                <AutoToggle checked={stopSingleWin} onToggle={() => setStopSingleWin((value) => !value)} label="Stop if single win exceeds" />
                <span>Stop if single win exceeds</span>
                <AutoStepper value={stopSingleWinValue} onChange={setStopSingleWinValue} suffix="INR" />
              </div>
              <section className="auto-section strategy-section">
                <h3>If I Lose</h3>
                <div className="strategy-row"><AutoToggle checked={loseReturn} onToggle={() => setLoseReturn((value) => !value)} label="Return to initial bet after a loss" /><span>Return to initial bet</span></div>
                <div className="strategy-row"><AutoToggle checked={loseIncrease} onToggle={() => setLoseIncrease((value) => !value)} label="Increase bet after a loss" /><span>Increase bet</span><AutoStepper value={loseIncreaseValue} onChange={setLoseIncreaseValue} suffix="%" /></div>
                <div className="strategy-row"><AutoToggle checked={loseDecrease} onToggle={() => setLoseDecrease((value) => !value)} label="Decrease bet after a loss" /><span>Decrease bet</span><AutoStepper value={loseDecreaseValue} onChange={setLoseDecreaseValue} suffix="%" /></div>
              </section>
              <section className="auto-section strategy-section">
                <h3>If I Win</h3>
                <div className="strategy-row"><AutoToggle checked={winReturn} onToggle={() => setWinReturn((value) => !value)} label="Return to initial bet after a win" /><span>Return to initial bet</span></div>
                <div className="strategy-row"><AutoToggle checked={winIncrease} onToggle={() => setWinIncrease((value) => !value)} label="Increase bet after a win" /><span>Increase bet</span><AutoStepper value={winIncreaseValue} onChange={setWinIncreaseValue} suffix="%" /></div>
                <div className="strategy-row"><AutoToggle checked={winDecrease} onToggle={() => setWinDecrease((value) => !value)} label="Decrease bet after a win" /><span>Decrease bet</span><AutoStepper value={winDecreaseValue} onChange={setWinDecreaseValue} suffix="%" /></div>
              </section>
            </div>
            <div className="auto-actions">
              <button className="reset" onClick={() => setAutoOpen(false)}>Reset</button>
              <button className="start" onClick={() => setAutoOpen(false)}>Start</button>
            </div>
          </section>
        </div>
      )}
    </section>
  );
}

function AviatorGame() {
  const [progress, setProgress] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [multiplier, setMultiplier] = useState(1);
  const [flight, setFlight] = useState(0);
  const [roundProgress, setRoundProgress] = useState(0);
  const [phase, setPhase] = useState<"intro" | "flying" | "crashed">("intro");
  const [round, setRound] = useState(3325559);
  const [tab, setTab] = useState("All Bets");
  const [liveBets, setLiveBets] = useState<LiveBet[]>(() => makeRoundBets(0));
  const [totalBets, setTotalBets] = useState(1464);
  const [menuOpen, setMenuOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [soundOn, setSoundOn] = useState(false);
  const [musicOn, setMusicOn] = useState(false);
  const [animationOn, setAnimationOn] = useState(true);
  const [profileAvatarIndex, setProfileAvatarIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => setProgress((value) => {
      const next = Math.min(100, value + 2);
      if (next === 100) window.setTimeout(() => setLoaded(true), 420);
      return next;
    }), 34);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    const started = Date.now();
    // Keep each flight long enough to visibly reach the 10x and 20x range.
    const introDuration = 3100;
    const flightDuration = 18000;
    const crashDuration = 1700;
    const roundDuration = introDuration + flightDuration + crashDuration;
    const timer = window.setInterval(() => {
      const totalElapsed = Date.now() - started;
      const elapsed = totalElapsed % roundDuration;
      setRound(3325559 + Math.floor(totalElapsed / roundDuration));

      if (elapsed < introDuration) {
        setPhase("intro");
        setFlight(0);
        setRoundProgress(elapsed / introDuration);
        setMultiplier(1);
      } else if (elapsed < introDuration + flightDuration) {
          const flightProgress = Math.min((elapsed - introDuration) / flightDuration, 1);
        setPhase("flying");
          setFlight(flightProgress);
        setRoundProgress(1);
          setMultiplier(Number(Math.pow(maxMultiplier, flightProgress).toFixed(2)));
      } else {
        setPhase("crashed");
        setFlight(1);
        setRoundProgress(1);
          setMultiplier(maxMultiplier);
      }
    }, 50);
    return () => window.clearInterval(timer);
  }, [loaded]);

  useEffect(() => {
    if (!loaded) return;
    setLiveBets(makeRoundBets(round));
    setTotalBets(1100 + Math.floor(Math.random() * 700));
  }, [round, loaded]);

  // Fill the list with 20 bets immediately, then add the remaining bets one at a time before takeoff.
  const visibleBets = useMemo(() => {
    if (phase === "intro") {
      const initialCount = Math.min(20, liveBets.length);
      const remainingCount = liveBets.length - initialCount;
      const count = initialCount + Math.floor(roundProgress * remainingCount);
      return liveBets.slice(0, count);
    }
    return liveBets;
  }, [liveBets, phase, roundProgress]);

  // The source graph sits just above the white x-axis dots. Keep its start
  // aligned with the blue y-axis and let the plane travel on the line.
  const curveEnd = useMemo(() => ({
    x: 4 + flight * 79,
    y: 95 - flight * 82,
  }), [flight]);
  const curve = useMemo(() => {
    const { x: endX, y: endY } = curveEnd;
    const graphBase = 95;
    const rise = graphBase - endY;
    const span = endX - 4;
    const points: string[] = [];
    const steps = 26;
    for (let i = 0; i <= steps; i += 1) {
      const t = i / steps;
      const x = 4 + span * t;
      // Keep the line attached to the plane and steadily steepen it. The
      // source animation leaves the path behind instead of wobbling it.
      const base = graphBase - rise * Math.pow(t, 2.25);
      points.push(`${x.toFixed(2)} ${base.toFixed(2)}`);
    }
    return `M ${points.join(" L ")}`;
  }, [curveEnd, flight]);

  if (!loaded) return <LoadingScreen progress={progress} />;

  return (
    <main className="aviator-shell">
      <header className="topbar">
        <img src={wordmarkAsset.url} alt="Aviator" className="brand" />
        <button className="help" onClick={() => setHelpOpen(true)}><HelpCircle /> <span>How to play?</span></button>
        <div className="balance"><strong>4,077</strong> INR</div>
        <button className="menu-button" aria-label="Open menu" onClick={() => setMenuOpen(!menuOpen)}><Menu /></button>
        {menuOpen && (
          <div className="menu-popover" role="dialog" aria-label="Game menu" onClick={(event) => event.stopPropagation()}>
            <div className="menu-profile">
              <img src={avatars[profileAvatarIndex]?.url ?? avatar1.url} alt="" />
              <strong>11020000102087</strong>
              <button className="change-avatar" onClick={() => setProfileAvatarIndex((index) => (index + 1) % avatars.length)}><UserRound /><span>Change<br />Avatar</span></button>
            </div>
            <div className="menu-settings">
              <button className="menu-setting" onClick={() => setSoundOn((value) => !value)}>
                <Volume2 /><span>Sound</span><i className={soundOn ? "menu-switch on" : "menu-switch"}><b /></i>
              </button>
              <button className="menu-setting" onClick={() => setMusicOn((value) => !value)}>
                <Music2 /><span>Music</span><i className={musicOn ? "menu-switch on" : "menu-switch"}><b /></i>
              </button>
              <button className="menu-setting" onClick={() => setAnimationOn((value) => !value)}>
                <Sparkles /><span>Animation</span><i className={animationOn ? "menu-switch on" : "menu-switch"}><b /></i>
              </button>
            </div>
            <div className="menu-divider" />
            <div className="menu-links">
              <button className="menu-link" onClick={() => setMenuOpen(false)}><History /><span>My Bet History</span></button>
              <button className="menu-link" onClick={() => setMenuOpen(false)}><Gamepad2 /><span>Game Limits</span></button>
              <button className="menu-link" onClick={() => setMenuOpen(false)}><Languages /><span>Language</span></button>
            </div>
          </div>
        )}
      </header>

      <div className="game-layout">
        <aside className="bets-sidebar">
          <div className="side-tabs">
            {["All Bets", "My Bets", "Top"].map((item) => <button key={item} className={tab === item ? "active" : ""} onClick={() => setTab(item)}>{item}</button>)}
          </div>
          <div className="bets-heading"><span>{tab.toUpperCase()}</span><strong>{tab === "All Bets" ? visibleBets.length + totalBets : 0}</strong></div>
          <div className="bets-labels"><span>User</span><span>Bet INR</span><span>X</span><span>Cash out INR</span></div>
          <div className="bets-scroll">
            {tab === "All Bets" ? visibleBets.map((bet) => {
              const cashed = bet.cashAt !== null && phase !== "intro" && multiplier >= bet.cashAt;
              return (
                <div className={cashed ? "bet-row cashed" : "bet-row"} key={bet.id}>
                  <span className="bettor"><img src={avatars[bet.avatar]?.url ?? avatar1.url} alt="" />{bet.name}</span>
                  <strong>{money(bet.amount)}</strong>
                  {cashed && bet.cashAt !== null && <span className={`tiny-multi ${bet.cashAt >= 2 ? "high" : "low"}`}>{bet.cashAt.toFixed(2)}x</span>}
                  {cashed && bet.cashAt !== null && <em className="cash-out">{money(bet.amount * bet.cashAt)}</em>}
                </div>
              );
            }) : <div className="empty-bets">No bets yet</div>}
          </div>
          <div className="fair"><ShieldCheck /> This game is <b>Provably Fair</b></div>
        </aside>

        <section className={historyOpen ? "play-area history-expanded" : "play-area"}>
          <div className={historyOpen ? "history-bar open" : "history-bar"}>
            {historyOpen && <strong className="history-title">ROUND HISTORY</strong>}
            <div className="history-list">{history.map((value, index) => <span className={historyTone(value)} key={`${value}-${index}`}>{value}</span>)}</div>
            {!historyOpen && (
              <div className="history-meta">
                <button className="round-id" onClick={() => setHistoryOpen((value) => !value)}>Round ID: {round}<ChevronDown /></button>
                <span>Ping:167ms</span>
              </div>
            )}
            <div className="history-actions">
              <button className={historyOpen ? "history-toggle active" : "history-toggle"} aria-label={historyOpen ? "Close round history" : "Open round history"} aria-expanded={historyOpen} onClick={() => setHistoryOpen((value) => !value)}><History /><ChevronDown /></button>
            </div>
          </div>
          <div className={`flight-stage phase-${phase} border-t-[0.8px] border-r-[0.8px] border-b-[0.8px] border-l-[0.8px] rounded-tl-[15px] rounded-tr-[15px] rounded-br-[15px] rounded-bl-[15px]`}>
            <div className="radial-rays" />
            <div className="stage-glow" style={{ opacity: phase === "flying" ? Math.min(1, 0.4 + flight) : 0, filter: `hue-rotate(${flight * 85}deg)` }} />
            {phase === "flying" && (
              <>
                <div className="axis-y-line" aria-hidden="true" />
                <div className="axis-x-line" aria-hidden="true" />
                <div className="y-dots">
                  <div className={multiplier >= 2 ? "y-dots-track moving" : "y-dots-track"}>
                    {[0, 1].map((group) => <div className="y-dot-group" key={group}>{Array.from({ length: 7 }).map((_, i) => <i key={i} />)}</div>)}
                  </div>
                </div>
                <div className="x-dots">
                  <div className={multiplier >= 2 ? "x-dots-track moving" : "x-dots-track"}>
                    {[0, 1].map((group) => <div className="x-dot-group" key={group}>{Array.from({ length: 9 }).map((_, i) => <i key={i} />)}</div>)}
                  </div>
                </div>
              </>
            )}

            <svg className={`flight-curve ${phase === "flying" ? "" : "is-hidden"}`} viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
              <defs><linearGradient id="flightFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="var(--game-red-soft)" /><stop offset="1" stopColor="var(--game-red-deep)" /></linearGradient></defs>
              <path d={`${curve} L ${curveEnd.x} 95 Z`} fill="url(#flightFill)" />
              <path d={curve} fill="none" stroke="var(--game-red)" strokeWidth="2" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
               <path d={`M ${curveEnd.x} ${curveEnd.y} L ${curveEnd.x} 95`} fill="none" stroke="var(--game-red)" strokeWidth="2" strokeLinecap="butt" vectorEffect="non-scaling-stroke" />
            </svg>
            {phase === "intro" ? (
              <div className="round-intro gap-[0px]" aria-label="Official partners">
                <img className="partners-logo" src={partnersLogoAsset.url} alt="UFC and Aviator official partners" />
                <div className="round-progress" aria-label="Next flight loading" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(roundProgress * 100)}>
                  <div className="round-progress-fill" />
                </div>
                <img className="official-badge" src={officialAsset.url} alt="Spribe official game" />
              </div>
            ) : (
              <>
                <div className={`multiplier ${phase === "crashed" ? "crashed" : ""}`}>
                  {phase === "crashed" && <small>FLEW AWAY!</small>}
                  {multiplier.toFixed(2)}x
                </div>
              </>
            )}
            <div
              className={
                phase === "intro"
                  ? "plane-holder intro-position"
                  : phase === "flying"
                    ? "plane-holder flight-position"
                    : "plane-holder is-hidden"
              }
              style={phase === "flying" ? { left: `${curveEnd.x}%`, bottom: `${100 - curveEnd.y}%` } : undefined}
            >
              <PlaneAnimation animationOn={animationOn} {...(phase === "flying" ? { label: "Flying airplane" } : {})} />
            </div>
          </div>
          <div className="bet-panels"><BetPanel initial={90} /><BetPanel initial={10} /></div>
        </section>
      </div>

      {helpOpen && (
        <div className="help-backdrop" role="presentation" onClick={() => setHelpOpen(false)}>
          <section className="help-dialog" role="dialog" aria-modal="true" aria-labelledby="help-title" onClick={(event) => event.stopPropagation()}>
            <div className="help-dialog-head"><h2 id="help-title">HOW TO PLAY</h2><button aria-label="Close" onClick={() => setHelpOpen(false)}>×</button></div>
            <div className="help-steps">
              <div><b>1</b><span>Choose your bet amount before the flight starts.</span></div>
              <div><b>2</b><span>Place a bet and watch the multiplier rise.</span></div>
              <div><b>3</b><span>Cash out before the airplane flies away.</span></div>
            </div>
          </section>
        </div>
      )}
    </main>
  );
}

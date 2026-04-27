import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import "./../styles/Tournament.css";
import TiltCard from "./TiltCard";
import "./../styles/Themes.css";
import ChampionMessage from "./ChampionMessage";
import DuelMessage from "./DuelMessage";
import { FaLongArrowAltLeft, FaVolumeUp, FaVolumeMute } from "react-icons/fa";

import vs from "../assets/versus_white.svg";
import gsap from "gsap";

const shuffleArray = (array) => {
  return [...array].sort(() => 0.5 - Math.random());
};

// public img path
const basePath = import.meta.env.BASE_URL;

const Tournament = ({ title, data }) => {
  const navigate = useNavigate();
  const [step, setStep] = useState("selection");
  const [selected, setSelected] = useState([]);
  const [round, setRound] = useState([]);
  const [nextRound, setNextRound] = useState([]);
  const [winner, setWinner] = useState(null);
  const [duelIndex, setDuelIndex] = useState(0);
  const startButtonRef = useRef(null);
  const [flash, setFlash] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const selectSound = useRef(new Audio(`${basePath}sounds/select.mp3`));
  const removeSound = useRef(new Audio(`${basePath}sounds/remove.mp3`));
  const startSound = useRef(new Audio(`${basePath}sounds/whoosh.mp3`));
  const victorySound = useRef(new Audio(`${basePath}sounds/victory.mp3`));
  const audioRef = useRef(null);
  const suspensMusic = useRef(new Audio(`${basePath}sounds/tension.mp3`));
  const themeClass = data[0]?.theme ? `theme_${data[0].theme}` : "";
  const winnerCardRef = useRef(null);
  const finalTitleRef = useRef(null);
  const leftDuelRef = useRef(null);
  const rightDuelRef = useRef(null);
  const finalOverlayRef = useRef(null);
  const newWinnerCardRef = useRef(null);
  const [finalAnimating, setFinalAnimating] = useState(false);
  const [finalWinner, setFinalWinner] = useState(null);

  // toggle mute
  const toggleMute = () => {
    setIsMuted((prev) => !prev);
  };

  // mute / unmute
  useEffect(() => {
    const sounds = [
      selectSound.current,
      removeSound.current,
      startSound.current,
      victorySound.current,
      suspensMusic.current
    ];
    sounds.forEach((sound) => {
      if (sound) sound.muted = isMuted;
    });
  }, [isMuted]);

  // handle sounds
  const handleSelect = (champion) => {
    if (selected.includes(champion)) {
      setSelected(selected.filter((c) => c !== champion));

      if (removeSound.current) {
        removeSound.current.pause();
        removeSound.current.currentTime = 0;
        removeSound.current.playbackRate = 1.5;
        removeSound.current.volume = 0.3;
        removeSound.current.play();
      }
    } else if (selected.length < 8) {
      const updated = [...selected, champion];
      setSelected(updated);

      if (updated.length === 8) {
        if (startSound.current) {
          startSound.current.pause();
          startSound.current.currentTime = 0;
          startSound.current.playbackRate = 2;
          startSound.current.volume = 0.3;
          startSound.current.play();
        }
      } else {
        if (selectSound.current) {
          selectSound.current.pause();
          selectSound.current.currentTime = 0;
          selectSound.current.playbackRate = 1;
          selectSound.current.volume = 0.3;
          selectSound.current.play();
        }
      }
    }
  };

  // battle sound
  useEffect(() => {
  if (step === "battle") {
    if (!audioRef.current) {
      audioRef.current = suspensMusic.current;
      audioRef.current.loop = true;
      audioRef.current.volume = 0.1;
    }
    audioRef.current.play().catch(() => {
    });
  }

  return () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }
  };
}, [step]);

  // winner sound
  useEffect(() => {
  if (step === "winner" && victorySound.current) {
    victorySound.current.pause();
    victorySound.current.currentTime = 0;
    victorySound.current.playbackRate = 1.5;
    victorySound.current.volume = 0.1;
    victorySound.current.play();
  }
}, [step]);

  // winner card animation
  useEffect(() => {
    if (step !== "winner" || !winnerCardRef.current) return;

    const tween = gsap.fromTo(
      winnerCardRef.current,
      { y: -window.innerHeight * 1.5, scale: 1.2, opacity: 0, rotation: 0 },
      {
        y: 0, scale: 1, opacity: 1, rotation: 0,
        duration: 0.6,
        ease: "power4.in",
        delay: 0.2,
        onComplete: () => {
          const tl = gsap.timeline();
          tl.to(".winner_wrapper", { x: 10, duration: 0.04, yoyo: true, repeat: 7, ease: "none" })
            .to(winnerCardRef.current, { scaleX: 1.1, scaleY: 0.85, duration: 0.07, ease: "none" }, "<")
            .to(winnerCardRef.current, { scaleX: 0.97, scaleY: 1.05, duration: 0.1, ease: "none" })
            .to(winnerCardRef.current, { scaleX: 1, scaleY: 1, duration: 0.15, ease: "power2.out" })
            .add(() => {
              gsap.to(winnerCardRef.current, {
                y: -12, rotation: 1.5, duration: 2.2,
                ease: "sine.inOut", yoyo: true, repeat: -1,
              });
            });
        }
      }
    );

    return () => tween.kill();
  }, [step]);

  // tournament logic
  const startTournament = () => {
    const shuffled = shuffleArray(selected);
    const initialDuels = [];
    for (let i = 0; i < shuffled.length; i += 2) {
      initialDuels.push([shuffled[i], shuffled[i + 1]]);
    }
    setRound(initialDuels);
    setStep("battle");
    setDuelIndex(0);
  };

  // handle votes
  const handleVote = (winner) => {
    const updatedNextRound = [...nextRound, winner];

    if (round.length === 1) {
      if (updatedNextRound.length === 1) {
        setWinner(updatedNextRound[0]);
        setStep("winner");
      } else {
        const duels = [];
        for (let i = 0; i < updatedNextRound.length; i += 2) {
          duels.push([updatedNextRound[i], updatedNextRound[i + 1]]);
        }
        setRound(duels);
        setNextRound([]);
        setDuelIndex(0);
      }
    } else {
      const remaining = [...round];
      remaining.shift();
      setRound(remaining);
      setNextRound(updatedNextRound);
      setDuelIndex((prev) => prev + 1);
    }
  };

  useEffect(() => {
    if (selected.length === 8 && startButtonRef.current) {
      startButtonRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [selected]);

  useEffect(() => {
    if (selected.length === 8 && startButtonRef.current) {
      setFlash(true);
      const timer = setTimeout(() => setFlash(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [selected]);

  const isFinal = step === "battle" && round.length > 0 && round.length + duelIndex === 1;

  // final title animation
  useEffect(() => {
    if (!isFinal || !finalTitleRef.current) return;
    const tl = gsap.timeline();
    tl.fromTo(finalTitleRef.current,
      { scale: 8, opacity: 0, filter: "blur(40px)" },
      { scale: 1, opacity: 1, filter: "blur(0px)", duration: 1.1, ease: "expo.out" }
    )
    .to(finalTitleRef.current, { x: 14, duration: 0.04, yoyo: true, repeat: 11, ease: "none" }, "-=0.05")
    .add(() => {
      gsap.to(finalTitleRef.current, {
        textShadow: "0 0 80px rgba(255,255,255,1), 0 0 160px rgba(255,255,255,0.4)",
        duration: 1.8, yoyo: true, repeat: -1, ease: "sine.inOut"
      });
    });
    return () => tl.kill();
  }, [isFinal]);

  // final cards entry
  useEffect(() => {
    if (!isFinal || !leftDuelRef.current || !rightDuelRef.current) return;
    gsap.fromTo(leftDuelRef.current,
      { x: -window.innerWidth, rotation: -20, opacity: 0 },
      { x: 0, rotation: 0, opacity: 1, duration: 0.9, ease: "power4.out", delay: 0.4 }
    );
    gsap.fromTo(rightDuelRef.current,
      { x: window.innerWidth, rotation: 20, opacity: 0 },
      { x: 0, rotation: 0, opacity: 1, duration: 0.9, ease: "power4.out", delay: 0.4 }
    );
  }, [isFinal]);

  // VS entrance animation per duel
  useEffect(() => {
    if (step !== "battle") return;
    gsap.fromTo(".vs_text",
      { scale: 0.05, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.6, ease: "back.out(2)", delay: 0.3 }
    );
  }, [duelIndex, step]);

  // final vote with impact animation
  const handleFinalVote = (winner, side) => {
    if (finalAnimating) return;
    setFinalAnimating(true);
    const winnerEl = side === "left" ? leftDuelRef.current : rightDuelRef.current;
    const loserEl  = side === "left" ? rightDuelRef.current : leftDuelRef.current;
    const dir = side === "left" ? 1 : -1;

    if (audioRef.current) gsap.to(audioRef.current, { volume: 0, duration: 0.8 });

    gsap.timeline()
      .to(".battle_wrapper", { x: dir * 22, duration: 0.04, yoyo: true, repeat: 9, ease: "none" })
      .to(winnerEl, { scale: 1.25, duration: 0.2, ease: "power2.out" }, "<")
      .to(loserEl, { x: dir * window.innerWidth * 1.3, rotation: dir * 35, scale: 0.4, opacity: 0, duration: 0.55, ease: "power4.in", onStart: () => setFinalWinner(winner) }, "+=0.05")
      .to([".final_title", ".vs_text"], { opacity: 0, duration: 0.3 })
      .add(() => {
        winnerEl.style.zIndex = "20";
        const rect = winnerEl.getBoundingClientRect();
        const currentX = gsap.getProperty(winnerEl, "x") || 0;
        const currentY = gsap.getProperty(winnerEl, "y") || 0;
        const dx = window.innerWidth / 2 - (rect.left + rect.width / 2);
        const dy = window.innerHeight / 2 - (rect.top + rect.height / 2);
        gsap.to(winnerEl, {
          x: currentX + dx,
          y: currentY + dy,
          scale: 1.4,
          duration: 0.7,
          ease: "power3.out",
          onComplete: () => {
            gsap.set(winnerEl, { opacity: 0 });
            gsap.set('.duel_wrapper', { opacity: 0 });
            gsap.set('.bg_card_wrapper', { opacity: 0 });
            if (newWinnerCardRef.current) {
              gsap.set(newWinnerCardRef.current, { opacity: 1 });
              const bgCard = finalOverlayRef.current?.querySelector('.bg_card');
              if (bgCard) gsap.fromTo(bgCard, { opacity: 0 }, { opacity: 1, duration: 1.2, delay: 0.6, ease: "power2.out" });
              const impactTl = gsap.timeline();
              impactTl
                .to(".battle_wrapper", { x: 10, duration: 0.04, yoyo: true, repeat: 7, ease: "none" })
                .to(newWinnerCardRef.current, { scaleX: 1.1, scaleY: 0.85, duration: 0.07, ease: "none" }, "<")
                .to(newWinnerCardRef.current, { scaleX: 0.97, scaleY: 1.05, duration: 0.1, ease: "none" })
                .to(newWinnerCardRef.current, { scaleX: 1, scaleY: 1, duration: 0.15, ease: "power2.out" })
                .add(() => {
                  gsap.to(newWinnerCardRef.current, { y: "-=12", rotation: 1.5, duration: 2.2, ease: "sine.inOut", yoyo: true, repeat: -1 });
                });
            }
          }
        });
      });
  };

  // final winner overlay + victory sound + crash animation
  useEffect(() => {
    if (!finalWinner) return;
    if (victorySound.current) {
      victorySound.current.pause();
      victorySound.current.currentTime = 0;
      victorySound.current.playbackRate = 1.5;
      victorySound.current.volume = 0.1;
      victorySound.current.play();
    }
    if (finalOverlayRef.current) {
      gsap.set(finalOverlayRef.current, { opacity: 1 });
    }
  }, [finalWinner]);

  // duel title
  const getOrdinalSuffix = (n) => {
    if (n === 1) return "st";
    if (n === 2) return "nd";
    if (n === 3) return "rd";
    return "th";
  };

  const getDuelText = () => {
    const total = round.length + duelIndex;

    let label = "";
    if (total === 4) label = "quarterfinal";
    else if (total === 2) label = "semifinal";
    else if (total === 1) return "Final";

    const duelNumber = duelIndex + 1;
    return `${duelNumber}${getOrdinalSuffix(duelNumber)} ${label} match`;
  };

  // current match index
  const getCurrentMatchIndex = () => {
    const total = round.length + duelIndex;
    if (total === 4) return duelIndex;
    if (total === 2) return 4 + duelIndex;
    if (total === 1) return 6;
    return 0;
  };

  return (
    <section className="tournament_wrapper">

      {/* mute button */}
      <button className="mute_button" onClick={toggleMute}>
        {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
      </button>
      <ChampionMessage remaining={8 - selected.length} />

      {step === "selection" && (
        <>
          {/* back button */}
          <button className="back_button" onClick={() => navigate('/', { state: { openMenu: true } })}>
            <span className="blink"><FaLongArrowAltLeft /></span>THEMES
          </button>

          {/* title */}
          <div className="wrapper_title">
            <h3>{title}</h3>
            <p>Click to select up to 8 champions</p>
          </div>

          {/* grid */}
          <div className="grid">
            {data.map((item, index) => (
              <div
                key={item.id}
                className="card_wrapper"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <TiltCard
                  className={`card card_glass ${selected.includes(item) ? "selected" : ""} ${selected.length === 8 && !selected.includes(item) ? "card_disabled" : ""}`}
                  onClick={() => handleSelect(item)}
                >
                  <div className="card_content">
                    {/* selection badge */}
                    {selected.includes(item) && (
                      <span className="card_badge">{selected.indexOf(item) + 1}</span>
                    )}
                    <div className="image_wrapper">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="card_img loading"
                        onLoad={(e) => e.target.classList.remove("loading")}
                      />
                      <p className="card_name">{item.name}</p>
                    </div>
                  </div>
                </TiltCard>
              </div>
            ))}
          </div>

          {/* start button */}
          {selected.length === 8 && (
            <button
              className={`start_button ${flash ? "flash_effect" : ""}`}
              onClick={startTournament}
              ref={startButtonRef}>
              Start Tournament
            </button>
          )}
        </>
      )}

      {/* duel versus */}
      {step === "battle" && round.length > 0 && (
        <div className={`battle_wrapper ${themeClass} ${isFinal ? "final_battle" : ""}`}>
          {!isFinal && <h4>Choose your winner</h4>}

          {/* back button */}
          <button className={`back_button ${finalWinner ? "back_button_final" : ""}`} style={finalWinner ? { zIndex: 20 } : {}}>
            <Link to='/'>
              <span className="blink"><FaLongArrowAltLeft /></span>
              {finalWinner ? "PLAY AGAIN" : "MENU"}
            </Link>
          </button>

          {/* duel message / final title */}
          {isFinal
            ? <h2 className="final_title" ref={finalTitleRef}>Final</h2>
            : <DuelMessage text={getDuelText()} />
          }

          {/* timeline */}
          {!isFinal && (() => {
            const cm = getCurrentMatchIndex();
            return (
              <div className="tournament_timeline">
                <div className="timeline_group">
                  <span className="timeline_label">QF</span>
                  <div className="timeline_dots">
                    {[0, 1, 2, 3].map((i) => (
                      <span key={i} className={`timeline_dot ${i < cm ? "done" : i === cm ? "active" : ""}`} />
                    ))}
                  </div>
                </div>
                <span className="timeline_connector" />
                <div className="timeline_group">
                  <span className="timeline_label">SF</span>
                  <div className="timeline_dots">
                    {[4, 5].map((i) => (
                      <span key={i} className={`timeline_dot ${i < cm ? "done" : i === cm ? "active" : ""}`} />
                    ))}
                  </div>
                </div>
                <span className="timeline_connector" />
                <div className="timeline_group">
                  <span className="timeline_label">Final</span>
                  <div className="timeline_dots">
                    <span className={`timeline_dot ${cm === 6 ? "active" : ""}`} />
                  </div>
                </div>
              </div>
            );
          })()}

          {/* bg giant images */}

          {round[0] && round[0].length === 2 && (
            <div className="bg_card_wrapper">
              <img
                className="bg_card bg_card_left"
                src={round[0][0].image}
                alt={round[0][0].name}
              />
              <img
                className="bg_card bg_card_right"
                src={round[0][1].image}
                alt={round[0][1].name}
              />
            </div>
          )}

          {/* duel */}
          {round[0] && round[0].length === 2 && (
          <div className="duel_wrapper">
            {/* left card */}
            <div ref={leftDuelRef}>
              <TiltCard
                className="card_duel"
                onClick={() => isFinal ? handleFinalVote(round[0][0], "left") : handleVote(round[0][0])}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === "Enter") isFinal ? handleFinalVote(round[0][0], "left") : handleVote(round[0][0]); }}
              >
                <img className="duel_zoom" src={round[0][0].image} alt={round[0][0].name} />
                <p>{round[0][0].name}</p>
              </TiltCard>
            </div>

            <div className="vs_text">
              <img src={vs} alt="VS image" />
            </div>

            {/* right card */}
            <div ref={rightDuelRef}>
              <TiltCard
                className="card_duel"
                onClick={() => isFinal ? handleFinalVote(round[0][1], "right") : handleVote(round[0][1])}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === "Enter") isFinal ? handleFinalVote(round[0][1], "right") : handleVote(round[0][1]); }}
              >
                <img className="duel_zoom" src={round[0][1].image} alt={round[0][1].name} />
                <p>{round[0][1].name}</p>
              </TiltCard>
            </div>
          </div>
        )}

        {/* final winner overlay */}
        {finalWinner && (
          <div className="final_winner_overlay" ref={finalOverlayRef}>
            <img className="bg_card" src={finalWinner.winnerImage || finalWinner.image} alt={finalWinner.name} />
            <p className="winner_label">Last Champion</p>
            <div className="winner_card_wrapper" ref={newWinnerCardRef} style={{ opacity: 0 }}>
              <img className="winner_img" src={finalWinner.winnerImage || finalWinner.image} alt={finalWinner.name} />
              <p className="winner_card_name">{finalWinner.name}</p>
            </div>
          </div>
        )}
        </div>
      )}

      {/* winner */}
      {step === "winner" && winner && (
        <div className={`winner_wrapper ${themeClass}`}>

          {/* winner bg */}
          <img
            className="bg_card"
            src={winner.winnerImage || winner.image}
            alt={winner.name}
          />

          {/* big bg name */}
          {/* <h5 className="letter_animation">
            {(winner.winnerName || winner.name)
              .split(" ")
              .map((word, wi, arr) => (
                <React.Fragment key={wi}>
                  {word.split("").map((letter, i) => (
                    <span
                      key={`${wi}-${i}`}
                      style={{ animationDelay: `${(wi * 3 + i) * 0.2}s` }}
                      data-letter={letter}
                    >
                      {letter}
                    </span>
                  ))}
                  {wi < arr.length - 1 && <span>&nbsp;</span>}
                </React.Fragment>
              ))}
          </h5> */}

          {/* label */}
          <p className="winner_label">Last Champion </p>

          {/* winner card */}
          <div className="winner_card_wrapper" ref={winnerCardRef}>
            <img
              className="winner_img"
              src={winner.winnerImage || winner.image}
              alt={winner.name}
            />
            <p className="winner_card_name">{winner.name}</p>
          </div>

          {/* play again */}
          <button className="back_button">
            <Link to='/'>
              <span className="blink"><FaLongArrowAltLeft /></span>PLAY AGAIN
            </Link>
          </button>
        </div>
      )}

    </section>
  );
};

export default Tournament;
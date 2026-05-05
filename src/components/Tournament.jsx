import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import "./../styles/Tournament.css";
import TiltCard from "./TiltCard";
import "./../styles/Themes.css";
import ChampionMessage from "./ChampionMessage";
import DuelMessage from "./DuelMessage";
import { FaLongArrowAltLeft, FaVolumeUp, FaVolumeMute, FaWhatsapp, FaSnapchatGhost } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

import vs from "../assets/versus_white.svg";
import gsap from "gsap";

const shuffleArray = (array) => {
  return [...array].sort(() => 0.5 - Math.random());
};

// public img path
const basePath = import.meta.env.BASE_URL;

const Tournament = ({ data }) => {
  const navigate = useNavigate();
  const [step, setStep] = useState("selection");
  const [selected, setSelected] = useState([]);
  const [round, setRound] = useState([]);
  const [nextRound, setNextRound] = useState([]);
  const [winner, setWinner] = useState(null);
  const [duelIndex, setDuelIndex] = useState(0);
  const startButtonRef = useRef(null);
  const [flash, setFlash] = useState(false);
  const [isMuted, setIsMuted] = useState(() => sessionStorage.getItem("muted") === "true");

  const selectSound = useRef(null);
  const removeSound = useRef(null);
  const startSound = useRef(null);
  const victorySound = useRef(null);
  const audioRef = useRef(null);
  const suspensMusic = useRef(null);

  const getSound = (ref, src) => {
    if (!ref.current) ref.current = new Audio(src);
    return ref.current;
  };
  const themeClass = data[0]?.theme ? `theme_${data[0].theme}` : "";
  const winnerCardRef = useRef(null);
  const finalTitleRef = useRef(null);
  const leftDuelRef = useRef(null);
  const rightDuelRef = useRef(null);
  const finalOverlayRef = useRef(null);
  const newWinnerCardRef = useRef(null);
  const [finalAnimating, setFinalAnimating] = useState(false);
  const [finalWinner, setFinalWinner] = useState(null);
  const [showShare, setShowShare] = useState(false);
  const [shareTarget, setShareTarget] = useState(null);
  const [copied, setCopied] = useState(false);
  const [shareVisible, setShareVisible] = useState(false);

  const siteUrl = "https://khadija-asa.github.io/LastChampion/";

  const handleShare = (name) => {
    setShareTarget(name);
    setShowShare(true);
    setCopied(false);
  };

  const handleSnapchat = () => {
    const text = `Mon champion est ${shareTarget} ! Quel sera le tien ? ${siteUrl}`;
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => {
        window.open(isMobileDevice ? "snapchat://" : "https://www.snapchat.com", "_blank");
        setShowShare(false);
        setCopied(false);
      }, 800);
    });
  };

  const isMobileDevice = /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);

  // toggle mute
  const toggleMute = () => {
    setIsMuted((prev) => {
      const next = !prev;
      sessionStorage.setItem("muted", next);
      return next;
    });
  };

  // mute / unmute
  useEffect(() => {
    const sounds = [
      selectSound.current,
      removeSound.current,
      startSound.current,
      victorySound.current,
      suspensMusic.current,
    ];
    sounds.forEach((sound) => {
      if (sound) sound.muted = isMuted;
    });
  }, [isMuted]);

  // handle sounds
  const handleSelect = (champion) => {
    if (selected.includes(champion)) {
      setSelected(selected.filter((c) => c !== champion));

      const snd = getSound(removeSound, `${basePath}sounds/remove.mp3`);
      snd.muted = isMuted;
      snd.pause(); snd.currentTime = 0; snd.playbackRate = 1.5; snd.volume = 0.3;
      snd.play();
    } else if (selected.length < 8) {
      const updated = [...selected, champion];
      setSelected(updated);

      if (updated.length === 8) {
        const snd = getSound(startSound, `${basePath}sounds/whoosh.mp3`);
        snd.muted = isMuted;
        snd.pause(); snd.currentTime = 0; snd.playbackRate = 2; snd.volume = 0.3;
        snd.play();
      } else {
        const snd = getSound(selectSound, `${basePath}sounds/select.mp3`);
        snd.muted = isMuted;
        snd.pause(); snd.currentTime = 0; snd.playbackRate = 1; snd.volume = 0.3;
        snd.play();
      }
    }
  };

  // battle sound
  useEffect(() => {
    if (step === "battle") {
      if (!audioRef.current) {
        audioRef.current = getSound(suspensMusic, `${basePath}sounds/tension.mp3`);
        audioRef.current.loop = true;
        audioRef.current.volume = 0.1;
        audioRef.current.muted = isMuted;
      }
      audioRef.current.play().catch(() => {});
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
    if (step === "winner") {
      const snd = getSound(victorySound, `${basePath}sounds/victory.mp3`);
      snd.muted = isMuted;
      snd.pause(); snd.currentTime = 0; snd.playbackRate = 1.5; snd.volume = 0.1;
      snd.play();
    }
  }, [step]);

  // winner card animation
  useEffect(() => {
    if (step !== "winner" || !winnerCardRef.current) return;
    setShareVisible(false);

    const tween = gsap.fromTo(
      winnerCardRef.current,
      { y: -1200, scale: 1.2, opacity: 0, rotation: 0 },
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
              gsap.set(winnerCardRef.current, { clearProps: "transform" });
              winnerCardRef.current.classList.add("winner_float");
              setShareVisible(true);
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
      gsap.set(finalTitleRef.current, { clearProps: "transform" });
      finalTitleRef.current.classList.add("final_title_float");
    });
    return () => tl.kill();
  }, [isFinal]);

  // final cards entry
  useEffect(() => {
    if (!isFinal || !leftDuelRef.current || !rightDuelRef.current) return;
    const vw = document.documentElement.clientWidth;
    gsap.fromTo(leftDuelRef.current,
      { x: -vw, rotation: -20, opacity: 0 },
      { x: 0, rotation: 0, opacity: 1, duration: 0.9, ease: "power4.out", delay: 0.4 }
    );
    gsap.fromTo(rightDuelRef.current,
      { x: vw, rotation: 20, opacity: 0 },
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
    setShareVisible(false);
    const winnerEl = side === "left" ? leftDuelRef.current : rightDuelRef.current;
    const loserEl  = side === "left" ? rightDuelRef.current : leftDuelRef.current;
    const dir = side === "left" ? 1 : -1;
    const vw = document.documentElement.clientWidth;
    const vh = document.documentElement.clientHeight;

    if (audioRef.current) gsap.to(audioRef.current, { volume: 0, duration: 0.8 });

    gsap.timeline()
      .to(".battle_wrapper", { x: dir * 22, duration: 0.04, yoyo: true, repeat: 9, ease: "none" })
      .to(winnerEl, { scale: 1.25, duration: 0.2, ease: "power2.out" }, "<")
      .to(loserEl, { x: dir * vw * 1.3, rotation: dir * 35, scale: 0.4, opacity: 0, duration: 0.55, ease: "power4.in", onStart: () => setFinalWinner(winner) }, "+=0.05")
      .to([".final_title", ".vs_text"], { opacity: 0, duration: 0.3 })
      .add(() => {
        winnerEl.style.zIndex = "20";
        const rect = winnerEl.getBoundingClientRect();
        const currentX = gsap.getProperty(winnerEl, "x") || 0;
        const currentY = gsap.getProperty(winnerEl, "y") || 0;
        const dx = vw / 2 - (rect.left + rect.width / 2);
        const dy = vh / 2 - (rect.top + rect.height / 2);
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
              gsap.fromTo(newWinnerCardRef.current,
                { scale: 0.78, y: 30, filter: "brightness(2.5) blur(4px)" },
                {
                  scale: 1, y: 0, filter: "brightness(1) blur(0px)",
                  duration: 0.9, ease: "back.out(1.4)",
                  onComplete: () => {
                    gsap.set(newWinnerCardRef.current, { clearProps: "transform" });
                    newWinnerCardRef.current.classList.add("winner_float");
                    setShareVisible(true);
                  }
                }
              );
            }
          }
        });
      });
  };

  // final winner overlay + victory sound + crash animation
  useEffect(() => {
    if (!finalWinner) return;
    const snd = getSound(victorySound, `${basePath}sounds/victory.mp3`);
    snd.muted = isMuted;
    snd.pause(); snd.currentTime = 0; snd.playbackRate = 1.5; snd.volume = 0.1;
    snd.play();
    if (finalOverlayRef.current) {
      gsap.set(finalOverlayRef.current, { opacity: 1, pointerEvents: "auto" });
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

      {/* share modal */}
      {showShare && shareTarget && (
        <div className="share_overlay" onClick={() => setShowShare(false)}>
          <div className="share_modal" onClick={e => e.stopPropagation()}>
            <button className="share_modal_close" onClick={() => setShowShare(false)}>✕</button>
            <p className="share_modal_title">Partager</p>
            <div className="share_networks">
              <a
                className="share_network_btn"
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`Mon champion est ${shareTarget} ! Quel sera le tien ? ${siteUrl}`)}`}
                target="_blank" rel="noopener noreferrer"
                onClick={() => setShowShare(false)}
              >
                <FaXTwitter size={24} /> X
              </a>
              <a
                className="share_network_btn"
                href={`https://wa.me/?text=${encodeURIComponent(`Mon champion est ${shareTarget} ! Quel sera le tien ? ${siteUrl}`)}`}
                target="_blank" rel="noopener noreferrer"
                onClick={() => setShowShare(false)}
              >
                <FaWhatsapp size={24} /> WhatsApp
              </a>
              <button
                className="share_network_btn"
                onClick={handleSnapchat}
              >
                <FaSnapchatGhost size={24} /> {copied ? "Copié !" : "Snapchat"}
              </button>
            </div>
          </div>
        </div>
      )}

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

          {/* progress bar */}
          <div className="selection_header">
            <p className="selection_subtitle">Select 8 champions to start the tournament</p>
            <div className="selection_bar">
              <div className="selection_bar_fill" style={{ width: `${(selected.length / 8) * 100}%` }} />
            </div>
          </div>

          {/* grid */}
          <div className="grid">
            {data.map((item, index) => (
              <div
                key={item.id}
                className="card_wrapper"
                style={{ animationDelay: `${Math.min(index * 40, 500)}ms` }}
              >
                <TiltCard
                  className={`card card_glass ${selected.includes(item) ? "selected" : ""} ${selected.length === 8 && !selected.includes(item) ? "card_disabled" : ""}`}
                  onClick={() => handleSelect(item)}
                >
                  <div className="card_content">
                    {selected.includes(item) && (
                      <span className="card_badge">{selected.indexOf(item) + 1}</span>
                    )}
                    <div className="image_wrapper">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="card_img"
                        loading={index < 8 ? "eager" : "lazy"}
                        decoding="async"
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
          {/* back button */}
          <button className={`back_button ${finalWinner ? "back_button_final" : ""}`} style={finalWinner ? { zIndex: 20 } : {}}>
            <Link to='/'>
              <span className="blink"><FaLongArrowAltLeft /></span>
              {finalWinner ? "PLAY AGAIN" : "MENU"}
            </Link>
          </button>

          {/* share button */}
          {finalWinner && shareVisible && (
            <button className="share_button" style={{ zIndex: 20 }} onClick={() => handleShare(finalWinner.name)}>
              <FaXTwitter size={12} /> PARTAGER
            </button>
          )}

          {/* duel message / final title */}
          {isFinal
            ? <h2 className="final_title" ref={finalTitleRef}>Final</h2>
            : (() => {
                const cm = getCurrentMatchIndex();
                return (
                  <div className="battle_header">
                    <p className="battle_label">Choose your winner</p>
                    <DuelMessage text={getDuelText()} />
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
                  </div>
                );
              })()
          }

          {/* duel area */}
          {round[0] && round[0].length === 2 && (
          <div className="duel_area">

            {/* bg giant images */}
            <div className="bg_card_wrapper">
              <img className="bg_card bg_card_left" src={round[0][0].image} alt={round[0][0].name} />
              <img className="bg_card bg_card_right" src={round[0][1].image} alt={round[0][1].name} />
            </div>

          <div className="duel_wrapper">
            {/* left card */}
            <div ref={leftDuelRef} className="duel_card_side">
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
            <div ref={rightDuelRef} className="duel_card_side">
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

          {/* share */}
          {shareVisible && (
            <button className="share_button" onClick={() => handleShare(winner.name)}>
              <FaXTwitter size={12} /> PARTAGER
            </button>
          )}
        </div>
      )}

    </section>
  );
};

export default Tournament;
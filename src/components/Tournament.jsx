import React, { useState, useRef, useEffect } from "react";
import { Link } from 'react-router-dom';
import "./../styles/Tournament.css";
import TiltCard from "./TiltCard";
import "./../styles/Themes.css";
import ChampionMessage from "./ChampionMessage";
import DuelMessage from "./DuelMessage";
import { FaLongArrowAltLeft, FaVolumeUp, FaVolumeMute } from "react-icons/fa";

import vs from "../assets/versus_white.svg";

const shuffleArray = (array) => {
  return [...array].sort(() => 0.5 - Math.random());
};

// URL IMG PUBLIC
const basePath = import.meta.env.BASE_URL;

const Tournament = ({ title, data }) => {
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
  const backgroundRef = useRef(null);

  // TOGGLE MUTE
  const toggleMute = () => {
    setIsMuted((prev) => !prev);
  };

  // MUTE/UNMUTE
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

  // HANDLE SOUNDS
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

  // SOUND BATTLE
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

  // SOUND WINNER
  useEffect(() => {
  if (step === "winner" && victorySound.current) {
    victorySound.current.pause();
    victorySound.current.currentTime = 0;
    victorySound.current.playbackRate = 1.5;
    victorySound.current.volume = 0.1;
    victorySound.current.play();
  }
}, [step]);

  // GLOBAL TOURNAMENT
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

  // HANDLE VOTES
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

  // TITLE DUEL
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

  return (
    <section className="tournament_wrapper">

      {/* MUTE UNMUTE BUTTON */}
      <button className="mute_button" onClick={toggleMute}>
        {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
      </button>
      <ChampionMessage remaining={8 - selected.length} />

      {step === "selection" && (
        <>
          {/* BACK BUTTON */}
          <button className="back_button">
            <Link to='/'> <span className="blink"><FaLongArrowAltLeft /></span>MENU</Link>
          </button>

          {/* TITLE */}
          <div className="wrapper_title">
            <h3>{title}</h3>
            <br />
            <br />
            <p>Click to select up to 8 champions</p>
          </div>

          {/* GRID */}
          <div className="grid">
            {data.map((item, index) => (
              <div
                key={item.id}
                className="card_wrapper"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <TiltCard
                  className={`card card_glass ${selected.includes(item) ? "selected" : ""}`}
                  onClick={() => handleSelect(item)}
                >
                  <div className="card_content">
                    <div className="image_wrapper">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="card_img loading"
                        onLoad={(e) => e.target.classList.remove("loading")}
                      />
                    </div>
                    <br />
                    <p className="card_name">{item.name}</p>
                  </div>
                </TiltCard>
              </div>
            ))}
          </div>

          {/* START BUTTON */}
          {selected.length === 2 && (
            <button
              className={`start_button ${flash ? "flash_effect" : ""}`}
              onClick={startTournament}
              ref={startButtonRef}>
              Start Tournament
            </button>
          )}
        </>
      )}

      {/* DUEL VERSUS */}
      {step === "battle" && round.length > 0 && (
        <div className={`battle_wrapper ${themeClass}`}>
          <h4>Choose your winner</h4>

          {/* BACK BUTTON */}
          <button className="back_button">
            <Link to='/'> <span className="blink"><FaLongArrowAltLeft /></span>MENU</Link>
          </button>

          {/* DUEL MESSAGE */}
          <DuelMessage text={getDuelText()} />

          {/* BACKGROUND GIANT IMAGES */}
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

          {/* DUEL */}
          {round[0] && round[0].length === 2 && (
          <div className="duel_wrapper">
            {/* LEFT CARD */}
            <TiltCard
              className="card_duel"
              onClick={() => handleVote(round[0][0])}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === "Enter") handleVote(round[0][0]); }}
            >
              <img
                className="duel_zoom"
                src={round[0][0].image}
                alt={round[0][0].name}
              />
              <p>{round[0][0].name}</p>
            </TiltCard>

            <div className="vs_text">
              <img src={vs} alt="" />
            </div>

            {/* RIGHT CARD */}
            <TiltCard
              className="card_duel"
              onClick={() => handleVote(round[0][1])}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === "Enter") handleVote(round[0][1]); }}
            >
              <img
                className="duel_zoom"
                src={round[0][1].image}
                alt={round[0][1].name}
              />
              <p>{round[0][1].name}</p>
            </TiltCard>
          </div>
        )}
        </div>
      )}

      {/* WINNER */}
      {step === "winner" && winner && (
        <div className="winner_wrapper">

          {/* WINNER BG IMAGE */}
          <picture>
            <source media="(max-width: 768px)"
              srcSet={winner.winnerImage || winner.image} />

            <img className="bg_card"
              src={winner.image}
              alt={winner.name} />
          </picture>

          {/* WINNER IMAGE */}
          <TiltCard>
            <img className="duel_zoom" src={winner.winnerImage || winner.image} alt={winner.name} />
          </TiltCard>

          {/* WINNER TITLE */}
          <h5 className="letter_animation">
            { (winner.winnerName || winner.name).split(" ").map((word, wi) => (
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
              </React.Fragment>
            ))}
          </h5>

          {/* PLAY AGAIN BUTTON */}
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
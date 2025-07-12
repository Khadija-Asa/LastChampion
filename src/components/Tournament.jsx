import React, { useState } from "react";
import "./../styles/Tournament.css";

const shuffleArray = (array) => {
  return [...array].sort(() => 0.5 - Math.random());
};

const Tournament = ({ title, data }) => {
  const [step, setStep] = useState("selection");
  const [selected, setSelected] = useState([]);
  const [round, setRound] = useState([]);
  const [nextRound, setNextRound] = useState([]);
  const [winner, setWinner] = useState(null);

  // --- Step 1: Selection of 8 champions ---
  const handleSelect = (champion) => {
    if (selected.includes(champion)) {
      setSelected(selected.filter((c) => c !== champion));
    } else if (selected.length < 8) {
      setSelected([...selected, champion]);
    }
  };

  const startTournament = () => {
    const shuffled = shuffleArray(selected);
    const initialDuels = [];
    for (let i = 0; i < shuffled.length; i += 2) {
      initialDuels.push([shuffled[i], shuffled[i + 1]]);
    }
    setRound(initialDuels);
    setStep("battle");
  };

  // --- Step 2: Handle votes for each duel ---
  const handleVote = (winner) => {
    const updatedNextRound = [...nextRound, winner];

    if (round.length === 1) {
      // Final duel
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
      }
    } else {
      const remaining = [...round];
      remaining.shift();
      setRound(remaining);
      setNextRound(updatedNextRound);
    }
  };

  return (
    <div className="tournament_wrapper">
      {step === "selection" && (
        <>
          <h3>
            { title }
          </h3>

          <p>
            Click to select up to 8 champions
          </p>

          <div className="grid">
            {data.map((item) => (
              <div
                key={item.id}
                className={`card ${selected.includes(item) ? "selected" : ""}`}
                onClick={() => handleSelect(item)} >
                <img src={item.image} alt={item.name} />
                <p>{item.name}</p>
              </div>
            ))}
          </div>
          {selected.length === 8 && (
            <button className="start_button" onClick={startTournament}>
              Start Tournament
            </button>
          )}
        </>
      )}

      {step === "battle" && round.length > 0 && (
        <div className="battle_stage">
          <h4>
            Choose your winner
          </h4>

          <div className="duel">
            {round[0].map((champion) => (
              <div key={champion.id}
                className="card"
                onClick={() => handleVote(champion)}>

                <img src={champion.image} alt={champion.name} />

                <p>
                  {champion.name}
                </p>
              </div>
            ))}
          </div>

          <p>
            {round.length - 1} duel(s) remaining in this round
          </p>
        </div>
      )}

      {step === "winner" && winner && (
        <div className="winner_screen">
          <h5>
            🏆 {winner.name} is the Champion! 🏆
          </h5>

          <img src={winner.image} alt={winner.name} />
        </div>
      )}


    </div>
  );
};

export default Tournament;

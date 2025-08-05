import { useEffect, useState } from "react";

const ChampionMessage = ({ remaining }) => {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (remaining >= 0 && remaining < 8) {
      if (remaining === 0) {
        setMessage("Champions, take your positions !");
      } else if (remaining === 1) {
        setMessage("Just one more champion");
      } else {
        setMessage(` ${remaining} champions left to pick`);
      }

      setVisible(true);

      const timer = setTimeout(() => {
        setVisible(false);
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [remaining]);

  if (!visible) return null;

  return (
    <div className="champion_message">
      {message}
    </div>
  );
};

export default ChampionMessage;

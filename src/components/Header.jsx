import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./../styles/Header.css";
import { gsap } from "gsap";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openSection, setOpenSection] = useState(null);
  const location = useLocation();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    if (sessionStorage.getItem("openMenu") === "1") {
      sessionStorage.removeItem("openMenu");
      setIsMenuOpen(true);
    }
  }, []);

  const toggleSection = (label) => {
    setOpenSection(openSection === label ? null : label);
  };

  useEffect(() => {
    if (isMenuOpen) {
      gsap.from(".links_menu li", {
        opacity: 0,
        y: 10,
        stagger: 0.1,
        duration: 0.5,
        ease: "power2.out",
        delay: 0.1,
      });
    }
  }, [isMenuOpen]);

  const sections = [
    {
      label: "Characters",
      items: [
        {
          to: "/cartoon-heroes",
          label: "Cartoon Heroes",
          word: "cartoon heroes",
        },
        { to: "/characters", label: "Characters", word: "characters" },
        { to: "/lol", label: "LoL Champions", word: "lol champions" },
        { to: "/one-piece", label: "One Piece", word: "one piece" },
        { to: "/super-heroes", label: "Superheroes", word: "superheroes" },
        { to: "/villains", label: "Villains", word: "villains" },
        { to: "/yu-gi-oh", label: "Yu-Gi-Oh", word: "yu-gi-oh" },
      ],
    },
    {
      label: "Pop Culture",
      items: [
        { to: "/animes", label: "Anime", word: "anime" },
        { to: "/manga", label: "Manga", word: "manga" },
        { to: "/movies", label: "Movies", word: "movies" },
        { to: "/pokemons", label: "Pokemon", word: "pokemon" },
        { to: "/series", label: "Series", word: "series" },
        {
          to: "/youtubers-streamers",
          label: "YT/Twitch (fr)",
          word: "YT/Twitch (fr)",
        },
      ],
    },
    {
      label: "Sports & E-Sport",
      items: [
        {
          to: "/basketball-players",
          label: "Basketball Players",
          word: "basketball players",
        },
        {
          to: "/esport-players",
          label: "Esport Players",
          word: "esport players",
        },
        { to: "/esport-teams", label: "Esport Teams", word: "esport teams" },
        {
          to: "/esport-tournaments",
          label: "Esport Tournaments",
          word: "esport tournaments",
        },
        { to: "/fifa26-clubs", label: "Fifa26 Clubs", word: "fifa26 clubs" },
        {
          to: "/football-players",
          label: "Football Players",
          word: "football players",
        },
      ],
    },
    {
      label: "Gaming",
      items: [
        {
          to: "/fortnite-skins",
          label: "OG Fortnite Skins",
          word: "OG fortnite skins",
        },
        { to: "/game-consoles", label: "Game Consoles", word: "game consoles" },
        { to: "/retro-games", label: "Retro Games", word: "retro games" },
        { to: "/streetfighter", label: "StreetFighter", word: "streetfighter" },
        {
          to: "/valorant-agents",
          label: "Valorant Agents",
          word: "valorant agents",
        },
        { to: "/video-games", label: "Video Games", word: "video games" },
      ],
    },
  ];

  return (
    <header className="navbar_menu">
      <nav className="social_menu">
        <div className="menu_logo">LastChampion</div>

        <div className="menu_action">
          <button
            className={`burger_menu ${isMenuOpen ? "open" : ""}`}
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <span className="burger_bar"></span>
            <span className="burger_bar"></span>
            <span className="burger_bar"></span>
          </button>
        </div>
      </nav>

      <nav>
        <ul className={`links_menu ${isMenuOpen ? "open" : ""}`}>
          {sections.map((section) => (
            <li key={section.label} className="menu_section">
              <button
                className="section_title accordion_toggle"
                onClick={() => toggleSection(section.label)}
              >
                {section.label}

                <span
                  className={`arrow ${openSection === section.label ? "open" : ""}`}
                >
                  ▾
                </span>
              </button>

              <ul
                className={`submenu ${
                  openSection === section.label ? "submenu_open" : ""
                }`}
              >
                {section.items.map(({ to, label, word }) => (
                  <li key={label}>
                    <Link to={to} className="hover_link" onClick={closeMenu}>
                      <span className="word_wrapper">
                        <span className="base_word">{word}</span>
                        <span className="animated_word">
                          {word.split("").map((letter, i) => (
                            <span className="letter" key={i}>
                              {letter}
                            </span>
                          ))}
                        </span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          ))}
          <li className="menu_legal">
            <Link
              to="/mentions-legales"
              className="legal_link"
              onClick={closeMenu}
            >
              Mentions légales
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;

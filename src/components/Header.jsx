import { useState } from 'react';
import { Link } from 'react-router-dom';
import './../styles/Header.css';
import { FaGithub, FaCode, FaLinkedin } from 'react-icons/fa';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="navbar_menu">
      <nav className="social_menu">

        <div className="menu_logo">
          <a className='logo-title' href="#">LastChampion</a>
        </div>

        <button
          className={`burger_menu ${isMenuOpen ? 'open' : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle menu">
          <span className="burger_bar"></span>
          <span className="burger_bar"></span>
          <span className="burger_bar"></span>
        </button>
      </nav>

      <nav>
        <ul className={`links_menu ${isMenuOpen ? 'open' : ''}`}>
          {[
            {
              label: "Champion versus",
              items: [
                { to: "/pokemons", label: "Pokemon", word: "pokemon" },
                { to: "/animes", label: "Anime", word: "anime" },
                { to: "/lol", label: "LoL Champions", word: "lol champions" },
                { to: "/streetfighter", label: "StreetFighter", word: "streetfighter" },
                { to: "/yu-gi-oh", label: "Yu-Gi-Oh", word: "yu-gi-oh" },
              ]
            },
            {
              label: "Heroes & Characters",
              items: [
                { to: "/super-heroes", label: "Superheroes", word: "superheroes" },
                { to: "/manga", label: "Manga", word: "manga" }, 
                { to: "/characters", label: "Characters", word: "characters" },
                { to: "/villains", label: "Villains", word: "villains" },
                { to: "/cartoon-heroes", label: "cartoon heroes", word: "cartoon heroes" },
              ]
            },
            {
              label: "Video Games & E-Sport",
              items: [
                { to: "/game-consoles", label: "Game consoles", word: "game consoles" },
                { to: "/video-games", label: "Video Games", word: "video games" },
                { to: "/retro-games", label: "Retro Games", word: "retro games" },
                { to: "/esport-teams", label: "E-sport Teams", word: "e-sport teams" },
                { to: "/esport-players", label: "E-sport players", word: "e-sport players" },
              ]
            }
          ].map((section) => (
            <li key={section.label} className="menu_section">
              <span className="section_title">{section.label}</span>
              <ul className="submenu">
                {section.items.map(({ to, label, word }) => (
                  <li key={label}>
                    <Link to={to} className="hover_link" onClick={closeMenu}>
                      <span className="word_wrapper">
                        <span className="base_word">{word}</span>
                        <span className="animated_word">
                          {word.split("").map((letter, i) => (
                            <span className="letter" key={i}>{letter}</span>
                          ))}
                        </span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;

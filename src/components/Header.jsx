import { useState } from 'react';
import { Link } from 'react-router-dom';
import './../styles/Header.css';
import { FaGithub, FaCode, FaLinkedin } from 'react-icons/fa';
import logo from './../assets/LastChampion.svg';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="navbar_menu">
      <nav className="social_menu">
        <div className="social_logo">
          <button
          className={`burger_menu ${isMenuOpen ? 'open' : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle menu">
          <span className="burger_bar"></span>
          <span className="burger_bar"></span>
          <span className="burger_bar"></span>
        </button>

          <img src={logo} alt="LastChampion logo" />
        </div>

        <div className="social_media">
          <a href="https://khadija-asa.github.io/web_developer/" target="_blank" rel="noopener noreferrer">
            <FaCode size={20} />
          </a>
          <a href="https://github.com/Khadija-Asa" target="_blank" rel="noopener noreferrer">
            <FaGithub size={20} />
          </a>
          <a href="https://www.linkedin.com/in/khadidja-ait-si-ali/" target="_blank" rel="noopener noreferrer">
            <FaLinkedin size={20} />
          </a>
        </div>        
      </nav>

      <nav>
        <ul className={`links_menu ${isMenuOpen ? 'open' : ''}`}>
          <li className='menu_logo'>
            <img src={logo} alt="LastChampion logo" />
          </li>
          {[
            { to: "/",
              label: "home",
              word: "home" 
              },
            { to: "/animes", 
              label: "anime", 
              word: "anime" 
            },
            { to: "/pokemons", 
              label: "pokemon", 
              word: "pokemon" 
            },
            { to: "/heroes", 
              label: "heroes", 
              word: "heroes" 
            },
            { to: "/yu-gi-oh", 
              label: "yu-gi-oh", 
              word: "yu-gi-oh" 
            },
          ].map(({ to, label, word }) => (
            <li key={label}>
              <Link to={to} className="hover_link" onClick={closeMenu}>
                <span className="blink">_</span>
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
      </nav>
    </header>
  );
};

export default Header;

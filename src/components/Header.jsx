import { Link } from 'react-router-dom';
import './../styles/Header.css';
import { FaGithub, FaCode, FaLinkedin } from 'react-icons/fa';
import logo from './../assets/LastChampion.svg';

const Header = () => {
  return (
      <header className='navbar_menu'>

        <nav className="social_menu">

          <div className='social_logo'>
            <img src={ logo } />
          </div>

          <div className='social_media'>
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

        <nav className="links_menu">
          <li>
            <Link to="/">
              home 
            </Link>
          </li>
          <li>
            <Link to="/animes">
              anime
            </Link>
          </li>
          <li>
            <Link to="/pokemons">
              pokemon
            </Link>
          </li>
          <li>
            <Link to="/streamers">
              streamers
            </Link>
          </li>
          <li>
            <Link to="/yu-gi-oh">
              yu-gi-oh
            </Link>
          </li>
        </nav>

      </header>
      )
}

export default Header
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import './../styles/Home.css';
import './../styles/main.css';
import './../styles/Header.css';
import Header from './Header';
import { FaCode } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa";
import { IoMail } from "react-icons/io5";


export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  const lastRef = useRef(null);
  const championRef = useRef(null);
  const imageRef = useRef(null);

  // sound
  const homeSound = useRef(null);

useEffect(() => {
  if (isLoading) {
    const tl = gsap.timeline({
      onComplete: () => {
      setIsLoading(false);
      },
    });

    gsap.set(".preloader_grid .item", { y: -100, opacity: 0 });

    tl.to(".preloader_grid .item", {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: "power4.out",
      stagger: 0.15
    })
    // .to({}, { duration: 99999 })
    .to(".preloader_grid .item", {
      y: -150,
      opacity: 0,
      duration: 1,
      ease: "power4.in",
      stagger: 0.1
    })
    .to(".preloader", {
      y: "-100%",
      duration: 1,
      ease: "power4.inOut"
    }, "-=0.5")

     .add(() => {
      if (!homeSound.current) {
        homeSound.current = new Audio(`${import.meta.env.BASE_URL}sounds/home2.mp3`);
        homeSound.current.volume = 0.05;
        homeSound.current.loop = false;
      }

      homeSound.current.muted = true;
      homeSound.current.play().then(() => {
        homeSound.current.muted = false;
      })
    });
  }
}, [isLoading]);

  // social media
  useEffect(() => {
    if (!isLoading) {
      const tl = gsap.timeline({ delay: 1, ease: "power3.out" });

      tl.from(".social-link", {
        y: 50,
        opacity: 0,
        scale: 0.5,
        stagger: 0.2,
        duration: 0.8
      })
      .to(".social-link", {
        rotation: 360,
        duration: 1,
        ease: "back.out(1.7)"
      }, "-=0.5"
    );
    }
  }, [isLoading]);

  // title
  useEffect(() => {
    if (!isLoading) {
      const tl = gsap.timeline({ defaults: { ease: "expoScale(0.5,7,none)", duration: 1 } });

      // Image
      tl.fromTo(
        imageRef.current,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.2 }
      );

      // Last
      tl.fromTo(
        lastRef.current,
        { y: "-100%", scale: 0.3, opacity: 0 },
        { y: 0, scale: 1, opacity: 1 },
        "-=1"
      );

      // Champion
      tl.fromTo(
        championRef.current,
        { y: "100%", scale: 0.3, opacity: 0 },
        { y: 0, scale: 1, opacity: 1 },
        "-=0.8"
      );
    }
  }, [isLoading]);

  // Random theme
  const navigate = useNavigate();

  const handleRandomTheme = () => {
  const themes = ["/pokemons", "/yu-gi-oh", "/animes", "/super-heroes", "/lol", "/villains",
        "/streetfighter", "/esport-teams", "/esport-players", "/video-games",
        "/game-consoles", "/characters", "/manga", "/retro-games", "/cartoon-heroes", "/youtubers",
        "/series", "/movies", "/football-players", "/fifa26-clubs" ]

  const randomTheme = themes[Math.floor(Math.random() * themes.length)];
  navigate(randomTheme);
};

  if (isLoading) {
    return (
      <div className="preloader">

        <section class="preloader_grid">
          <div class="item">
            <h2>movies</h2>
          </div>
          <div class="item">
            <h2>anime</h2>
          </div>
          <div class="item">
            <h2>manga</h2>
          </div>
          <div class="item">
            <h3>Only one can remain <br />
                who's gonna win ?
            </h3>
          </div>
          <div class="item">
            <h2>pokemon</h2>
          </div>
          <div class="item">
            <h2>series</h2>
          </div>
          <div class="item">
            <h2>games</h2>
          </div>
        </section>

      </div>
    );
  }

  return (
    <section className="home_container">

      <Header/>

      <div className="home">
        <h1 className="title_container">
          <span ref={lastRef} className="word last">last</span>

          <div className="image-wrapper">
            <img
              ref={imageRef}
              className="center-image"
              src="https://wallpapers.com/images/hd/ash-ketchum-pokemon-trainer-pose-8qvwplhdpl9aecuu.jpg" 
              alt="Sacha"
            />
          </div>

          <span ref={championRef} className="word champion">champion</span>
        </h1>

        <div className="random-btn-container">
          <button className="random-btn" onClick={handleRandomTheme}>
            <svg viewBox="0 0 200 200" className="svg-circle">
              <g className="text-group">
                <defs>
                  <path
                    id="circlePath"
                    d="M 100, 100 m -75, 0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0"
                  />
                </defs>
                <text>
                  <textPath href="#circlePath" startOffset="0%">
                    RANDOM THEME• RANDOM THEME• RANDOM THEME•
                  </textPath>
                </text>
              </g>
            </svg>
            <span className="center-point"></span>
          </button>
        </div>

        <div className="home_media">
          <a className="social-link" href="khadidja-dev.fr" target="_blank"><FaCode size={12}/></a>
          <a className="social-link" href="https://www.linkedin.com/in/khadidja-ait-si-ali/" target="_blank"><FaLinkedinIn size={12}/></a>
          <a className="social-link" href="mailto:khadidja.aitsiali@gmail.com" target="_blank"><IoMail size={12}/></a>
        </div>
      </div>

    </section>
  );
}

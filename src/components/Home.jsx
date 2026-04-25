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
import { animeList } from "../datas/animesData";
import { heroesList } from "../datas/heroesData";
import { lolList } from "../datas/lolData";
import { villainsList } from "../datas/villainsData";


export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  const lastRef = useRef(null);
  const championRef = useRef(null);
  const leftCardRef = useRef(null);
  const rightCardRef = useRef(null);
  const impactRef = useRef(null);
  const crackRef = useRef(null);
  const leftCrackRef = useRef(null);
  const rightCrackRef = useRef(null);
  const spotlightRef = useRef(null);

  // random cards
  const [cards] = useState(() => {
    const categories = [animeList, heroesList, lolList, villainsList];
    const category = categories[Math.floor(Math.random() * categories.length)];
    const idx1 = Math.floor(Math.random() * category.length);
    let idx2;
    do { idx2 = Math.floor(Math.random() * category.length); } while (idx2 === idx1);
    return [category[idx1], category[idx2]];
  });
  const [card1, card2] = cards;

  // home sound
  const homeSound = useRef(null);

useEffect(() => {
  if (isLoading) {
    const tl = gsap.timeline({
      onComplete: () => {
      setIsLoading(false);
      },
    });

    gsap.set(".preloader_grid .item", { y: -80, opacity: 0 });

    tl.to(".preloader_grid .item", {
      y: 0,
      opacity: 1,
      duration: 0.5,
      ease: "power4.out",
      stagger: 0.07
    })
    .to(".preloader_grid .item", {
      scale: 1.03,
      duration: 0.15,
      ease: "power2.out",
      stagger: 0.02
    })
    .to(".preloader_grid .item", {
      y: -220,
      opacity: 0,
      scale: 1,
      duration: 0.38,
      ease: "power3.in",
      stagger: 0.03
    })
    .to(".preloader", {
      y: "-100%",
      duration: 0.65,
      ease: "power4.inOut"
    }, "-=0.25")

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

  // social links
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

  // title & cards
  useEffect(() => {
    if (!isLoading) {
      gsap.set(impactRef.current, { xPercent: -50, yPercent: -50, scale: 0, opacity: 0 });
      gsap.set(crackRef.current, { xPercent: -50, yPercent: -50, scale: 0.4, opacity: 0 });
      gsap.set([leftCrackRef.current, rightCrackRef.current], { opacity: 0 });
      gsap.set(spotlightRef.current, { opacity: 0 });

      const tl = gsap.timeline({ defaults: { ease: "expoScale(0.5,7,none)", duration: 1 } });

      // words
      tl.fromTo(lastRef.current, { y: "-100%", scale: 0.3, opacity: 0 }, { y: 0, scale: 1, opacity: 0.9 })
        .fromTo(championRef.current, { y: "100%", scale: 0.3, opacity: 0 }, { y: 0, scale: 1, opacity: 1 }, "-=0.8")

        // flying cards
        .fromTo(leftCardRef.current,
          { x: -window.innerWidth, rotation: -30, opacity: 0 },
          { x: 0, rotation: 8, opacity: 1, duration: 0.65, ease: "power3.out" },
          "-=0.3"
        )
        .fromTo(rightCardRef.current,
          { x: window.innerWidth, rotation: 30, opacity: 0 },
          { x: 0, rotation: -8, opacity: 1, duration: 0.65, ease: "power3.out" },
          "<"
        )

        // impact & cracks
        .to(impactRef.current, { opacity: 1, scale: 1, duration: 0.1, ease: "none" })
        .to(crackRef.current, { opacity: 1, scale: 1, duration: 0.08, ease: "none" }, "<")
        .to([leftCrackRef.current, rightCrackRef.current], { opacity: 1, duration: 0.06, ease: "none" }, "<")
        .to(".home", { x: 10, duration: 0.04, yoyo: true, repeat: 7, ease: "none" }, "<")
        .to(impactRef.current, { opacity: 0, scale: 5, duration: 0.45, ease: "power2.out" })
        .to(crackRef.current, { opacity: 0, scale: 1.3, duration: 0.55, ease: "power2.out" }, "<")

        // card settle
        .to(leftCardRef.current, { x: -10, rotation: 12, duration: 0.3, ease: "back.out(2)" }, "-=0.35")
        .to(rightCardRef.current, { x: 10, rotation: -12, duration: 0.3, ease: "back.out(2)" }, "<")

        // spotlight reveal
        .add(() => {
          gsap.timeline()
            .to(spotlightRef.current, { opacity: 0.9, duration: 0.1, ease: "none" })
            .to(spotlightRef.current, { opacity: 0.02, duration: 0.08, ease: "none" })
            .to(spotlightRef.current, { opacity: 1, duration: 0.06, ease: "none" })
            .to(spotlightRef.current, { opacity: 0.1, duration: 0.1, ease: "none" })
            .to(spotlightRef.current, { opacity: 0.85, duration: 0.08, ease: "none" })
            .to(spotlightRef.current, { opacity: 0.05, duration: 0.06, ease: "none" })
            .to(spotlightRef.current, { opacity: 1, duration: 0.1, ease: "none" })
            .add(() => {
              gsap.set(spotlightRef.current, { clearProps: "opacity" });
              spotlightRef.current.style.animation = "spotlight_flicker 4s linear infinite";
            });
        }, "-=0.1")

        // card float
        .add(() => {
          gsap.to(leftCardRef.current, {
            y: -10, rotation: 10, duration: 2.4,
            ease: "sine.inOut", yoyo: true, repeat: -1,
          });
          gsap.to(rightCardRef.current, {
            y: -10, rotation: -10, duration: 2,
            ease: "sine.inOut", yoyo: true, repeat: -1, delay: 0.3,
          });
        });
    }
  }, [isLoading]);

  // random theme
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
      <div className="home_spotlight" ref={spotlightRef} />

      <Header/>

      <div className="home">
        <h1 className="title_container">
          <span ref={lastRef} className="word last">last</span>

          <div className="image-wrapper">
            {/* impact flash */}
            <div className="impact_flash" ref={impactRef} />

            {/* impact crack */}
            <svg className="crack_overlay" ref={crackRef} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <g stroke="white" fill="none" strokeLinecap="round">
                <line x1="50" y1="50" x2="8" y2="6" strokeWidth="1.8"/>
                <line x1="22" y1="20" x2="10" y2="32" strokeWidth="1"/>
                <line x1="50" y1="50" x2="94" y2="4" strokeWidth="1.6"/>
                <line x1="78" y1="20" x2="92" y2="36" strokeWidth="1"/>
                <line x1="50" y1="50" x2="1" y2="52" strokeWidth="1.4"/>
                <line x1="50" y1="50" x2="99" y2="70" strokeWidth="1.4"/>
                <line x1="50" y1="50" x2="33" y2="100" strokeWidth="1.3"/>
                <line x1="50" y1="50" x2="70" y2="100" strokeWidth="1.3"/>
                <line x1="50" y1="50" x2="50" y2="0" strokeWidth="1.5"/>
                <line x1="50" y1="18" x2="36" y2="4" strokeWidth="0.9"/>
                <line x1="50" y1="50" x2="15" y2="88" strokeWidth="1.1"/>
                <line x1="50" y1="50" x2="88" y2="95" strokeWidth="1.1"/>
              </g>
            </svg>

            {/* left card */}
            <div className="battle_card" ref={leftCardRef}>
              <img src={card1.image} alt={card1.name} />
              <p>{card1.name}</p>
              {/* right impact cracks */}
              <svg className="card_crack" ref={leftCrackRef} viewBox="0 0 60 100" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                <g stroke="white" fill="none" strokeLinecap="round">
                  <line x1="58" y1="50" x2="0" y2="8" strokeWidth="1.8"/>
                  <line x1="58" y1="50" x2="2" y2="50" strokeWidth="2"/>
                  <line x1="58" y1="50" x2="0" y2="92" strokeWidth="1.8"/>
                  <line x1="58" y1="50" x2="16" y2="0" strokeWidth="1.3"/>
                  <line x1="58" y1="50" x2="16" y2="100" strokeWidth="1.3"/>
                  <line x1="58" y1="50" x2="36" y2="0" strokeWidth="1"/>
                  <line x1="58" y1="50" x2="36" y2="100" strokeWidth="1"/>
                  <line x1="22" y1="22" x2="10" y2="34" strokeWidth="0.8"/>
                  <line x1="22" y1="78" x2="10" y2="66" strokeWidth="0.8"/>
                  <line x1="40" y1="14" x2="28" y2="26" strokeWidth="0.7"/>
                </g>
              </svg>
            </div>

            {/* right card */}
            <div className="battle_card" ref={rightCardRef}>
              <img src={card2.image} alt={card2.name} />
              <p>{card2.name}</p>
              {/* left impact cracks */}
              <svg className="card_crack" ref={rightCrackRef} viewBox="0 0 60 100" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                <g stroke="white" fill="none" strokeLinecap="round">
                  <line x1="2" y1="50" x2="60" y2="8" strokeWidth="1.8"/>
                  <line x1="2" y1="50" x2="58" y2="50" strokeWidth="2"/>
                  <line x1="2" y1="50" x2="60" y2="92" strokeWidth="1.8"/>
                  <line x1="2" y1="50" x2="44" y2="0" strokeWidth="1.3"/>
                  <line x1="2" y1="50" x2="44" y2="100" strokeWidth="1.3"/>
                  <line x1="2" y1="50" x2="24" y2="0" strokeWidth="1"/>
                  <line x1="2" y1="50" x2="24" y2="100" strokeWidth="1"/>
                  <line x1="38" y1="22" x2="50" y2="34" strokeWidth="0.8"/>
                  <line x1="38" y1="78" x2="50" y2="66" strokeWidth="0.8"/>
                  <line x1="20" y1="14" x2="32" y2="26" strokeWidth="0.7"/>
                </g>
              </svg>
            </div>
          </div>

          <span ref={championRef} className="word champion">champion</span>
        </h1>

        {/* tagline & cta */}
        <p className="home_subtitle">Only one can remain<br/>who's gonna win?</p>
        <button
          className="choose_btn"
          onClick={() => document.querySelector('.burger_menu')?.click()}>
          choose your theme
        </button>

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

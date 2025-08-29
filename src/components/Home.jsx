import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import './../styles/Home.css';
import './../styles/main.css';
import './../styles/Header.css';
import Header from './Header';
import { FaCode } from "react-icons/fa6";
import { MdPhone } from "react-icons/md";
import { FaLinkedinIn } from "react-icons/fa";
import { IoMail } from "react-icons/io5";


export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  const lastRef = useRef(null);
  const championRef = useRef(null);
  const imageRef = useRef(null);

  // loader
  useEffect(() => {
    if (isLoading) {
      const tl = gsap.timeline({
        onComplete: () => setIsLoading(false),
      });

      tl.to(".loader_text", {
        opacity: 1,
        y: -20,
        duration: 0.8,
        ease: "power3.out",
      })
        .to(".loader_bar", {
          width: "100%",
          duration: 0.8,
          ease: "power4.inOut",
        }, "-=0.5")
        .to(".preloader", {
          y: "-100%",
          duration: 0.8,
          ease: "power4.inOut",
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

  if (isLoading) {
    return (
      <div className="preloader">
        <span className="loader_text">Only one can remain, who's gonna win ?</span>
        <div className="loader_bar"></div>
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

        <div className="home_media">
          <a className="social-link" href="mailto:khadidja.aitsiali@gmail.com" target="_blank"><IoMail size={12}/></a>
          <a className="social-link" href="tel:+33614720566" target="_blank"><MdPhone size={12}/></a>
          <a className="social-link" href="https://www.linkedin.com/in/khadidja-ait-si-ali/" target="_blank"><FaLinkedinIn size={12}/></a>
          <a className="social-link" href="https://khadija-asa.github.io/web_developer/" target="_blank"><FaCode size={12}/></a>
        </div>
      </div>

    </section>
  );
}

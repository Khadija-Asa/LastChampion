import { useState, useEffect } from "react";
import gsap from "gsap";
import './../styles/Home.css';
import './../styles/main.css';
import './../styles/Header.css';
import Header from './Header';

const Home = () => {
  // const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   if (isLoading) {
  //     const tl = gsap.timeline({
  //       onComplete: () => setIsLoading(false),
  //     });

  //     tl.to(".loader-text", {
  //       opacity: 1,
  //       y: -20,
  //       duration: 0.8,
  //       ease: "power3.out",
  //     })
  //       .to(".loader-bar", {
  //         width: "100%",
  //         duration: 2,
  //         ease: "power4.inOut",
  //       }, "-=0.5")
  //       .to(".preloader", {
  //         y: "-100%",
  //         duration: 1,
  //         ease: "power4.inOut",
  //       });
  //   }
  // }, [isLoading]);

  // if (isLoading) {
  //   return (
  //     <div className="preloader">
  //       <h1 className="loader-text">LastChampion</h1>
  //       <div className="loader-bar"></div>
  //     </div>
  //   );
  // }

  return (
    <section className="home_container">

      <Header/>

      <div className='home'>

        <p>
          Only one can remain — Who will earn your vote ?
        </p>

        <h1 className='flip_container'>
          <div>
            <span className="flip_letter">l</span>
            <span className="flip_letter">a</span>
            <span className="flip_letter">s</span>
            <span className="flip_letter">t</span>
          </div>

          <div>
            <span className="flip_letter">c</span>
            <span className="flip_letter">h</span>
            <span className="flip_letter">a</span>
            <span className="flip_letter">m</span>
            <span className="flip_letter">p</span>
            <span className="flip_letter">i</span>
            <span className="flip_letter">o</span>
            <span className="flip_letter">n</span>
          </div>
        </h1>

      </div>  

    </section>
  )
}

export default Home

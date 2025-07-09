import './../styles/Home.css';
import './../styles/main.css';
import Header from './Header';

const Home = () => {
  return (
    <>
      <Header/>

      <section className='home_container'>

        <p data-aos="fade-down" data-aos-duration="1900">
          Only one can remain — Who will earn your vote ?
        </p>

        <h1 className='flip_container'>
          <div data-aos="fade-down" data-aos-duration="1500">
            <span className="flip_letter">l</span>
            <span className="flip_letter">a</span>
            <span className="flip_letter">s</span>
            <span className="flip_letter">t</span>
          </div>

          <div data-aos="fade-down" data-aos-duration="1000">
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
        
      </section>   
    </>   
  )
}

export default Home
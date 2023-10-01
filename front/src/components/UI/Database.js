import { useEffect } from 'react'
import { database } from "../../images/image_exp";
import classes from './Database.module.css'
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const Database = () => {
    let window_width = window.innerWidth;
    if (window_width > 500) {
      window_width -= 16.8
    }
    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger)
        gsap.to(".database_image_anim" ,{
                x: window_width > 500 ? -80 : 50,
                opacity: 1,
                duration: 1,
                scrollTrigger: {
                    trigger: ".database_image_anim",
                    start: `center ${window_width > 500 ? "600px" : "400px"}`,
                    toggleActions: "play none none reverse",
                  }
            }
        )
        gsap.to(".database_text_anim" ,{
                x: 40,
                opacity: 1,
                duration: 1,
                scrollTrigger: {
                    trigger: ".database_image_anim",
                    start: `center ${window_width > 500 ? "600px" : "200px"}`,
                    toggleActions: "play none none reverse",
                  }
            }
        )
    }, []);


    return (
        <div className={`${classes.Wrap}`}> 
            <div className={`${classes.imgWrap} database_image_anim`}>
                <img src={database} width={window_width > 500 ? "400px" : "200px"} className={`${classes.database} second_pin_ex`} id="database"></img>
            </div>
            <div className={`${classes.text} database_text_anim`}>
                <p>data is saved in our database<br/>to train prediction models<br/>blah blah blah for good init.</p>
            </div>
        </div>
    )
}

export default Database
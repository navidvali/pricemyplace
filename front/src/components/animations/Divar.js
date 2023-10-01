import { divar_screen, divar_screen_res } from "../../images/image_exp";
import classes from "./Divar.module.css"
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faEnvelope, faEnvelopeOpen, faRuler, faCalendarDays, faPersonShelter, faStairs } from '@fortawesome/free-solid-svg-icons'
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect } from 'react'

const Divar = () => {
    let window_width = window.innerWidth
    useLayoutEffect(() => {
        gsap.registerPlugin(ScrollTrigger)
        gsap.to(".divar_image_anim" ,{
                x: window_width > 500 ? 150 : 40,
                opacity: 1,
                duration: 1,
                scrollTrigger: {
                    trigger: ".divar_image_anim",
                    start: `center ${window_width > 500 ? "600px" : "400px"}`,
                    toggleActions: "play none none reverse",
                  }
            }
        )
        gsap.to(".divar_text_anim" ,{
                x: window_width > 500 ? -90 : -10,
                opacity: 1,
                duration: 1,
                scrollTrigger: {
                    trigger: ".divar_image_anim",
                    start: `center ${window_width > 500 ? "600px" : "200px"}`,
                    toggleActions: "play none none reverse",
                  }
            }
        )
        gsap.to(".App_image_anim", {
          y: window_width > 500 ? -400 : -300,
          opacity: 1,
          duration: 1,
          gap: 0,
          scrollTrigger: {
            trigger: ".App_image_anim_trigger",
            start: "0 bottom",
            end: `${window_width > 500 ? "400px" : "300px"} top`,
            scrub: true,
            toggleActions: "play none reverse reverse",
          },
        });
    }, []);
    return(
        <div className={classes.mainWrap}>
            <div className={`${classes.posterWrap} divar_image_anim`}>
                <img className={`${classes.poster}`} height={window_width > 500 ? "600px" : "350px"} alt="divar" src={window.innerWidth > 500 ? divar_screen : divar_screen_res}></img>
                {window_width > 500 && 
                <>
                    <span className={classes.lineWrap}>
                        <svg viewBox="0 0 70 36">
                        <path
                            d="M6.9739 30.8153H63.0244C65.5269 30.8152 75.5358 -3.68471 35.4998 2.81531C-16.1598 11.2025 0.894099 33.9766 26.9922 34.3153C104.062 35.3153 54.5169 -6.68469 23.489 9.31527" />
                        </svg>
                    </span>
                    <span className={classes.lineWrap1}>
                        <svg viewBox="0 0 70 36">
                        <path
                            d="M6.9739 30.8153H63.0244C65.5269 30.8152 75.5358 -3.68471 35.4998 2.81531C-16.1598 11.2025 0.894099 33.9766 26.9922 34.3153C104.062 35.3153 54.5169 -6.68469 23.489 9.31527" />
                        </svg>
                    </span>
                    <span className={classes.lineWrap2}>
                        <svg viewBox="0 0 70 36">
                        <path
                            d="M6.9739 30.8153H63.0244C65.5269 30.8152 75.5358 -3.68471 35.4998 2.81531C-16.1598 11.2025 0.894099 33.9766 26.9922 34.3153C104.062 35.3153 54.5169 -6.68469 23.489 9.31527" />
                        </svg>
                    </span>
                    <span className={classes.lineWrap3}>
                        <svg viewBox="0 0 70 36">
                        <path
                            d="M6.9739 30.8153H63.0244C65.5269 30.8152 75.5358 -3.68471 35.4998 2.81531C-16.1598 11.2025 0.894099 33.9766 26.9922 34.3153C104.062 35.3153 54.5169 -6.68469 23.489 9.31527" />
                        </svg>
                    </span>
                </>}
            </div>
            <p className={`${classes.text} divar_text_anim`}>all the data is gathered <br/>from the website divar.ir
                the data includes:<br/>meters, year, floor and the<br/>number of rooms
                of the household.
            </p>
        </div>
    )
}

            /* <div className={`${classes.dataWrap} second_pin`} id="first_pin">
                <h3>gathered data </h3>
                <p>meters: 144 <FontAwesomeIcon icon={faRuler} /></p>
                <p>year: 1384 <FontAwesomeIcon icon={faCalendarDays} /></p>
                <p>rooms: 3 <FontAwesomeIcon icon={faPersonShelter} /></p>
                <p>floor: 3 <FontAwesomeIcon icon={faStairs} /></p>
                <p>price: 16,500,000,000</p>
                <div className={`${classes.moving_data_st} moving_data`}>
                    <FontAwesomeIcon icon={faEnvelope} className={classes.closed_env}/>
                </div>
            </div> */

export default Divar
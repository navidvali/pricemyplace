import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect } from "react";
import { waves, waves_res } from "../../images/image_exp";
import classes from './MovingImage.module.css'

const MovingImage = () => {
    let window_width = window.innerWidth;
    if (window_width > 500) {
      window_width -= 16.8
    }
    return (
      <div className={`${classes.moveWrap} App_image_anim_trigger`}>
        <img
          src={window_width > 500 ? waves : waves_res}
          alt="waves"
          className={`${classes.bgImage2} App_image_anim`}
          width={window_width.toString().concat("px")}
        ></img>
      </div>
    )
}

export default MovingImage
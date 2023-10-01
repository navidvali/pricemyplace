import {modelVisuals} from "../../images/image_exp"
import classes from "./Model.module.css"
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect } from 'react'

const Model = () => {
    let window_width = window.innerWidth - 16.8;

    return (
        <div className={`${classes.wrap}`}>
            <h2>evaluations</h2>
            <span>not ready yet ...</span>
        </div>
    )
}

export default Model
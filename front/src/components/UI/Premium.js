import { jungleHouse } from "../../images/image_exp"
import classes from "./Premium.module.css"
import { Link } from "react-router-dom"

const Premium = () => {
    let window_width = window.innerWidth - 16.8;

    return (
        <>
            {window_width > 500 && <img src={jungleHouse} alt="jungleHouse" className={classes.bgImage} width={window_width.toString().concat("px")}></img>}
            <p className={classes.title}>our premium is free!</p>
            <hr className={classes.line}/>
            <Link to="/setmodel" className={classes.link}>set custome model</Link>
        </>
    )
}

export default Premium
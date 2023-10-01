import classes from "./Navbar.module.css"
import { NavLink, useHistory } from "react-router-dom"
import { useContext } from "react";
import AuthContext from "../store/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const Navbar = () => {
    const authCtx = useContext(AuthContext)
    const [ menu, setMenu ] = useState(false)
    const history = useHistory()
    document.body.classList.remove('hold');
    let window_width = window.innerWidth;
    if (window_width > 500) {
      window_width -= 16.8
    }
    const logControl = () => {
        if (authCtx.isLoggedIn){
            authCtx.logout()
        } else {
            history.replace('/auth')
        }
    }

    const toggleMenu = () => {
        setMenu((pre) => !pre)
    }
    console.log(window_width)
    return(
        <div className={classes.navWrap} style={{ width: window_width.toString().concat("px")}}>
            {window_width > 500 ? 
            <>
                <NavLink activeClassName={classes.activelink} className={classes.link} to="/premium">premium</NavLink>
                <hr className={classes.line}></hr>
                <NavLink activeClassName={classes.activelink} className={`${classes.link} ${classes.home}`} to="/home">home</NavLink>
                <hr className={classes.line}></hr>
                <div className={`${classes.link} ${classes.log}`} onClick={logControl}>{authCtx.isLoggedIn ? "logout" : "login"}</div>
                <span className={classes.title}>price my place</span>
                <NavLink activeClassName={classes.activelink} className={`${classes.link} ${classes.price}`} to="/price/predict">price prediction</NavLink>
            </>
            : 
            <>
                <span className={classes.title}>price my place</span>
                <div className={classes.burgerBtn} onClick={toggleMenu} style={{display: menu ? "none" : "inline-block"}}><FontAwesomeIcon icon={faBars}/></div>
                <div className={classes.burgerMask} onClick={toggleMenu} style={{display: menu ? "inline-block" : "none"}}></div>
                <div className={classes.burger} style={{display: menu ? "flex" : "none"}}>
                    <NavLink activeClassName={classes.activelink} className={classes.link} to="/premium">premium</NavLink>
                    <NavLink activeClassName={classes.activelink} className={`${classes.link} ${classes.home}`} to="/home">home</NavLink>
                    <div className={`${classes.link} ${classes.log}`} onClick={logControl}>{authCtx.isLoggedIn ? "logout" : "login"}</div>
                    <NavLink activeClassName={classes.activelink} className={`${classes.link} ${classes.price}`} to="/price/predict">price prediction</NavLink>    
                </div>
            </>
            }
        </div>
    )
}

export default Navbar
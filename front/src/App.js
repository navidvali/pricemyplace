import React from "react";
import Divar from "./components/animations/Divar";
import Navbar from "./components/UI/Navbar";
import Database from "./components/UI/Database";
import { jungleHouse, buildings } from "./images/image_exp";
import classes from "./App.module.css";
import { Link, Switch, Redirect, Route } from "react-router-dom";
import Model from "./components/UI/Model";
import HomeData from "./components/price/HomeData";
import Premium from "./components/UI/Premium";
import SetModel from "./components/AI/SetModel";
import Authentication from "./components/user/Authentication";
import MovingImage from "./components/UI/MovingImage";

const App = () => {
  let window_width = window.innerWidth;
  if (window_width > 500) {
    window_width -= 16.8
  }
  let style = window_width.toString().concat("px solid transparent");
  return (
    <div>
      <Switch>
        <Route path="/" exact>
          <Redirect to="/home" />
        </Route>
        <Route path="/home">
          <Navbar />
          {window_width > 500 && <img
            src={jungleHouse}
            className={classes.bgImage}
            alt="jungleHouse"
            width={window_width.toString().concat("px")}
          ></img>}
          <p className={classes.wcText}>
            <span className={classes.wcTextani1}>this is some nonsense</span>
            <br />
            <span className={classes.wcTextani2}>that looks good!</span>
            <br />
            <span className={classes.wcTextani3}>we love you.</span>
          </p>
          <Link
            className={`${classes.link} ${classes.price}`}
            to="/price/predict"
          >
            price prediction
          </Link>
          <div className={classes.cover}>
            <div
              className={classes.tri}
              style={{ borderRight: style, overflow: "hidden" }}
            ></div>
            <div
              className={classes.rect}
              style={{ width: window_width.toString().concat("px") }}
            ></div>
          </div>
          <Divar />
          <Database />
          <MovingImage />
          <Model />
          <div className={classes.footer_wrap}>
            <div className={classes.wave}>
              <svg
                data-name="Layer 1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1200 120"
                preserveAspectRatio="none"
              >
                <path
                  d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
                  opacity=".25"
                  className={classes.shape}
                ></path>
                <path
                  d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
                  opacity=".5"
                  className={classes.shape}
                ></path>
                <path
                  d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
                  className={classes.shape}
                ></path>
              </svg>
            </div>
            <p className={classes.footer_text}>contact, support, copyright</p>
            <img
              alt="buildings"
              src={buildings}
              className={classes.footer_image}
              width={window_width.toString().concat("px")}
            ></img>
            <span>THIS IS SOME TEXT!</span>
          </div>
        </Route>
        <Route path="/price">
          <HomeData />
        </Route>
        <Route path="/premium">
          <Navbar />
          <Premium />
        </Route>
        <Route path="/setmodel">
          <SetModel />
        </Route>
        <Route path="/auth">
          <Authentication />
        </Route>
        <Route path="*">
          <p>404</p>
        </Route>
      </Switch>
    </div>
  );
};

export default App;

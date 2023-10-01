import { useReducer, useState } from "react"
import {insideHome} from "../../images/image_exp"
import classes from "./HomeData.module.css"
import { Link, Route, useHistory } from "react-router-dom"
import axios from 'axios'
import { Switch } from "react-router-dom/cjs/react-router-dom.min"
import GetData from "../data/GetData"
import AllData from "../data/AllData"
import { useContext } from "react"
import AuthContext from "../store/AuthContext"

const inputReducer = (state, action) => {
    if (action.method === "meters"){
        return {...state, meters: action.val}
    }
    if (action.method === "year"){
        return {...state, year: action.val}
    }
    if (action.method === "rooms"){
        return {...state, rooms: action.val}
    }
    if (action.method === "floor"){
        return {...state, floor: action.val}
    }
    return state
}

const HomeData = () => {
    const authCtx = useContext(AuthContext)
    const history = useHistory()
    const [loading, setLoading] = useState(false)
    const [ state, dispatchState ] = useReducer(inputReducer, {
        meters: 100,
        year: 1390,
        rooms: 2,
        floor: 1,
    })
    const [rep, setRep] = useState({
        status: true,
        msg: "",
        price: 0,
    })
    window.scrollTo(0, 0);
    document.body.classList.add('hold');
    let year = new Date().toLocaleDateString('fa-IR').split("/")[0];
    let e = '۰'.charCodeAt(0);
    year = year.replace(/[۰-۹]/g, (t) => {
        return t.charCodeAt(0) - e;
    });

    const get_price = async (event) => {
        event.preventDefault()
        setLoading(true)
        history.push("/price/predict/result")
        // const res = await fetch('http://127.0.0.1:8000/pricer/guess_the_price_api/', {
        //     method: 'POST',
        //     body: JSON.stringify(state),
        //     headers: {
        //         'Content-Type': 'application/json',
        //     }
        // })

        let { data } = await axios.post('http://127.0.0.1:8000/pricer/guess_the_price_api/', state)
        setLoading(false)
        setRep(data)
    }

    const setname = (event) => {
        dispatchState({method: "meters", val: event.target.value})
    }
    const setyear = (event) => {
        dispatchState({method: "year", val: event.target.value})
    }
    const setrooms = (event) => {
        dispatchState({method: "rooms", val: event.target.value})
    }
    const setfloor = (event) => {
        dispatchState({method: "floor", val: event.target.value})
    }

    console.log(state)
    return (
        <>  
                {window.innerWidth > 500 && <img src={insideHome} alt="insideHome" className={classes.bgimage}></img>}
                <div className={classes.cover}></div>
                <Route path='/price/predict'>
                    <form className={classes.form} onSubmit={get_price}> 
                        <Link to="/home" className={classes.back}>{"<-"} back</Link>
                        {authCtx.isLoggedIn && <Link to="/price/getdata" className={classes.get}>getdata</Link>}
                        {authCtx.isLoggedIn && <Link to="/price/alldata" className={classes.all}>alldata</Link>}
                        <div className={classes.inputHolder}>
                            <label htmlFor="meters" className={classes.label}>meters:</label>
                            <input id="meters" min="30" max="1000" onBlur={setname} className={classes.input} placeholder="100" type="number"></input>
                        </div>
                        <div className={classes.inputHolder}>
                            <label htmlFor="date" className={classes.label}>year:</label>
                            <input id="date" min="1300" max={year} onBlur={setyear} className={classes.input} placeholder="1390" type="number"></input>
                        </div>
                        <div className={classes.inputHolder}>
                            <label htmlFor="rooms" className={classes.label}>rooms:</label>
                            <input id="rooms" min="0" max="50" onBlur={setrooms} className={classes.input} placeholder="2" type="number"></input>
                        </div>
                        <div className={classes.inputHolder}>
                            <label htmlFor="floor" className={classes.label}>floor:</label>
                            <input id="floor" min="-1" max="150" onBlur={setfloor} className={classes.input} placeholder="1" type="number"></input>
                        </div>
                        <input className={classes.submit} type="submit" value="price"></input>
                    </form>
                    <Route path='/price/predict/result'>
                        {rep.status ? 
                            <>
                                {loading ? <span className={classes.loading}>loading ...</span> : ""}
                                <span className={classes.prediction}>predicted price: {rep.price}</span>
                            </>
                        : <h1 className={classes.prediction}>{rep.msg}</h1>}
                    </Route>
                </Route>
                <Route path='/price/getdata'>
                    <GetData />
                </Route>
                <Route path='/price/alldata'>
                    <AllData />
                </Route>
        </>
    )
}

export default HomeData
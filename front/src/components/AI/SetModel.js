import {yellowChair, modelVisuals} from "../../images/image_exp"
import classes from "./SetModel.module.css"
import ModelRep from "./ModelRep"
import {useState, useReducer} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import LoadingAnimation from "../UI/LoadingAnimation"
import { Link } from "react-router-dom"

const inputReducer = (state, action) => {
    if (action.method === "rnd_state"){
        return {...state, rnd_state: action.val}
    }
    if (action.method === "dt_volume"){
        return {...state, dt_volume: action.val}
    }
    if (action.method === "max_depth"){
        return {...state, max_depth: action.val}
    }
    if (action.method === "n_estimators"){
        return {...state, n_estimators: action.val}
    }
    if (action.method === "tst_size"){
        return {...state, tst_size: action.val}
    }
    return state
}

const tmp = {
    rnd_state: 100,
    score: 0.5152192898785893,
    status: true,
    tst_size: 0.2,
    Accuracy: -41945306352.94,
    MAE: 66526596843.318924,
    MAPE: 41945306452.94,
    MSE: 4.521146726982631e+21,
    RMSE: 67239472982.635956,
    dt_volume: 200,
    max_depth: 4,
    msg: "ok",
    n_estimators: 100,
}

const SetModel = () => {
    const [loading, setLoading] = useState(false)
    const [show, setShow] = useState(false)
    const [image, setImage] = useState('')
    const [modelData, setModelData] = useState({
        tst_size: 10,
        rnd_state: null,
        dt_volume: 100,
        max_depth: null,
        n_estimators: 100,
        plot_data: 0,
        score: 0,
        MSE: 0,
        MAE: 0,
        RMSE: 0,
        MAPE: 0,
        Accuracy: 0,
    })
    const [elementStyles, setElementStyles] = useState({
        0: false, 1: false, 2: false, 3: false, 4: false, 5: false,
    });
    const [ state, dispatchState ] = useReducer(inputReducer, {
        tst_size: 10,
        rnd_state: null,
        dt_volume: 100,
        max_depth: null,
        n_estimators: 100,
    })
    const desClick = (event) => {
        let index = parseInt(event.target.id)
        setElementStyles((pre) => {
            return {...pre, [index]: !pre[index]}
        })
    }

    const submitForm = async (event) => {
        event.preventDefault()
        setLoading(true)
        // history.push("/price/predict/result")
        // let { data } = await axios.post('http://127.0.0.1:8000/pricer/costume_guess_the_price_api/', state)
        // setModelData(data)
        // setImage(`data:image/png;base64,${data.plot_data}`)
        setModelData(tmp)
        setImage(modelVisuals)
        setLoading(false)
        setShow(true)
    }

    const setsize = (event) => {
        dispatchState({method: "tst_size", val: event.target.value})
    }
    const setrnd = (event) => {
        dispatchState({method: "rnd_state", val: event.target.value})
    }
    const setvol = (event) => {
        dispatchState({method: "dt_volume", val: event.target.value})
    }
    const setdepth = (event) => {
        dispatchState({method: "max_depth", val: event.target.value})
    }
    const setnest = (event) => {
        dispatchState({method: "n_estimators", val: event.target.value})
    }

    console.log(elementStyles)
    let window_width = window.innerWidth
    if (window_width > 500){
        window.scrollTo(0, 0);
        document.body.classList.add('hold');
    }
    console.log(modelData)
    return (
        <>
            <div className={classes.wrap}>
                <Link className={classes.back_btn} to="/premium">back {"->"}</Link>
                <div className={classes.wrapmodel}>
                    {window_width > 500 && <img src={yellowChair} alt="yellowChair" className={classes.bgimage}></img>}
                    <div className={classes.wrapload}>
                        {loading && <LoadingAnimation w={window_width > 500 ? '300' : '80'} h={window_width > 500 ? '300' : '80'}/>} 
                    </div>
                    {show && <ModelRep image={image} report={modelData}/>}
                </div>
                <form className={classes.dataWrap}>
                    <span className={classes.msg}>this feature has been shut down for performance reasons, the data you see is a static example of how it would work.</span>
                    <span className={classes.modeltitle}>model: RandomForestRegressor</span>
                    <div className={classes.inputWrap}>
                        <label htmlFor="test_size">test size:</label>
                        <input onBlur={setsize} max="95" min="5" className={classes.input} id="test_size" type="number"></input>
                        <div className={classes.desButtom} onClick={desClick} id="0">description <FontAwesomeIcon className={classes.desarr} icon={faAngleDown} /></div>
                        {elementStyles[0] && <p onClick={desClick} id="0">set the percentage of data to be used in testing and evaluating the model.</p>}
                    </div>
                    <div className={classes.inputWrap}>
                        <label htmlFor="random_state">random state:</label>
                        <input onBlur={setrnd} max="100000" min="0" className={classes.input} id="random_state" type="number"></input>
                        <div className={classes.desButtom} onClick={desClick} id="1">description <FontAwesomeIcon className={classes.desarr} icon={faAngleDown} /></div>
                        {elementStyles[1] && <p onClick={desClick} id="1">set a number to which the data will be set, to be used on test or train.</p>}
                    </div>
                    <div className={classes.inputWrap}>
                        <label htmlFor="data_vol">data vol:</label>
                        <input onBlur={setvol} max="100000" min="1" className={classes.input} id="data_vol" type="number"></input>
                        <div className={classes.desButtom} onClick={desClick} id="2">description <FontAwesomeIcon className={classes.desarr} icon={faAngleDown} /></div>
                        {elementStyles[2] && <p onClick={desClick} id="2">how many of the the latest n data to use.</p>}
                    </div>
                    <div className={classes.inputWrap}>
                        <label htmlFor="max_depth">max depth:</label>
                        <input onBlur={setdepth} max="32" min="1" className={classes.input} id="max_depth" type="number"></input>
                        <div className={classes.desButtom} onClick={desClick} id="3">description <FontAwesomeIcon className={classes.desarr} icon={faAngleDown} /></div>
                        {elementStyles[3] && <p onClick={desClick} id="3">max depth of Random forest regressor.</p>}
                    </div>
                    <div className={classes.inputWrap}>
                        <label htmlFor="n_estimators">n_estimators:</label>
                        <input onBlur={setnest} max="800" min="1" className={classes.input} id="n_estimators" type="number"></input>
                        <div className={classes.desButtom} onClick={desClick} id="4">description <FontAwesomeIcon className={classes.desarr} icon={faAngleDown} /></div>
                        {elementStyles[4] && <p onClick={desClick} id="4">the number of trees you want to build before taking the maximum voting or averages of predictions.</p>}
                    </div>
                    <input className={classes.submit} type="submit" onClick={submitForm}></input>
                </form>
            </div>
        </>
    )
}

export default SetModel;
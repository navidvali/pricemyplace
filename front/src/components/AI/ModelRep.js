import classes from "./ModelRep.module.css"
import {useState} from 'react'
import Draggable from "react-draggable";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faX, faAngleRight, faAngleLeft, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'


const ModelRep = (props) => {
    const [isZoomed, setIsZoomed] = useState(false);
    const [zoomLevel, setZoomLevel] = useState(2)
    const [show, setShow] = useState(false)
    const switchZoom = (event) => {
        setIsZoomed((pre) => {
            return !pre
        })
    }

    const changedes = () => {
        setShow(pre => !pre)
    }

    const addZoom = () => {
        if (zoomLevel > 20){
            return
        }
        setZoomLevel(pre => pre + 1)
    }
    const takeZoom = () => {
        if (zoomLevel === 1){
            return
        }
        setZoomLevel(pre => pre - 1)
    }
    let window_width = window.innerWidth
    return (
        <>
            {props.report.status ? <div className={classes.mdimagewrap}>
                {isZoomed ? 
                    <>
                        <FontAwesomeIcon className={classes.backbtn} onClick={switchZoom} icon={faX}/>
                        <FontAwesomeIcon className={classes.plusbtn} onClick={addZoom} icon={faPlus}/>
                        <FontAwesomeIcon className={classes.minusbtn} onClick={takeZoom} icon={faMinus}/>
                        <Draggable>
                            <div>
                                <p style={{backgroundImage: `url(${props.image})`, 
                                        backgroundSize: "700px",
                                        transform: `scale(${zoomLevel}, ${zoomLevel})`,
                                        Zindex: 3,
                                        }}
                                    className={classes.modelaftr}
                                ></p>
                            </div>
                        </Draggable> 
                    </>
                :                 
                    <p onClick={window_width > 500 ? switchZoom : () => {}} 
                        className={classes.modelPre}
                        style={{backgroundImage: `url(${props.image})`,
                                backgroundSize: "300px",
                        }}
                    ></p>
                }
                <div className={classes.datarep}>
                    <h2>settings:</h2>
                    <span>data vol : {props.report.dt_volume}</span>
                    <span>randome state: {props.report.rnd_state}</span>
                    <span>test size: {props.report.tst_size}%</span>
                    <span>max depth: {props.report.max_depth}</span>
                    <span>n_estimators: {props.report.n_estimators}</span>
                </div>
                <div className={classes.evals}>
                    <h2>evaluations:<p onClick={changedes} className={classes.des}>
                        description    
                        {!show ? <FontAwesomeIcon icon={faAngleRight} /> 
                        :
                            <FontAwesomeIcon icon={faAngleLeft} /> 
                        }
                        </p>
                    </h2>
                    {!show ? 
                    <>
                        <span>score : {props.report.score}</span>
                        <span>MAE: {props.report.MAE}</span>
                        <span>MSE: {props.report.MSE}</span>
                        <span>RMSE: {props.report.RMSE}</span>
                        <span>MAPE: {props.report.MAPE}</span>
                        <span>Accuracy: {props.report.Accuracy}</span>
                    </>
                :
                    <>
                        <p className={classes.descriptionText}>
                            <b>model</b> : A random forest is a meta estimator that fits a number of classifying decision trees on various sub-samples of the dataset and uses averaging to improve the predictive accuracy and control over-fitting.
                            <br/>
                            <b>score</b> : The coefficient of determination R**2 is defined as (1-(u/v)), where 
                            u is the residual sum of squares ((y_true - y_pred)** 2).sum() and 
                            v is the total sum of squares ((y_true - y_true.mean()) ** 2).sum(). The best possible score is 1.0 and it can be negative (because the model can be arbitrarily worse). A constant model that always predicts the expected value of y, disregarding the input features, would get a 
                            R**2 score of 0.0.
                            <br/>
                            <b>Mean Absolute Error (MAE)</b> : The MAE measures the average absolute difference between the predicted values (pred) and the ground truth values (gt).
                            It provides a measure of the average magnitude of the errors without considering their direction.
                            Lower MAE values indicate better model performance, where a value of 0 represents a perfect prediction.
                            <br />
                            <b>Mean Squared Error (MSE)</b> : The MSE measures the average of the squared differences between the predicted values and the ground truth values.
                            It amplifies larger errors due to the squaring operation, giving more weight to outliers.
                            Like MAE, lower MSE values indicate better model performance, and a value of 0 represents a perfect prediction.
                            <br />
                            <b>Root Mean Squared Error (RMSE)</b> : The RMSE is the square root of the MSE and is often used as a more interpretable metric since it's in the same unit as the target variable.
                            It provides an estimate of the standard deviation of the prediction errors.
                            As with MAE and MSE, lower RMSE values indicate better model performance, and a value of 0 represents a perfect prediction.
                            <br />
                            <b>Mean Absolute Percentage Error (MAPE)</b> : The MAPE measures the average percentage difference between the predicted values and the ground truth values.
                            It represents the average relative error as a percentage of the true value.
                            MAPE is useful when you want to understand the magnitude of the errors in relation to the actual values.
                            It's important to note that MAPE can be problematic when the ground truth values are close to zero since it may result in division by zero or very large values.
                            <br />
                            <b>Accuracy</b> : In this context, accuracy represents the percentage of correct predictions based on the MAPE.
                            It is calculated as 100 minus the MAPE.
                            Higher accuracy values indicate better model performance, with 100% representing a perfect prediction.
                            <br />
                        </p>
                    </>
                }
                </div>
            </div> 
            : 
            <h1 className={classes.mdimagewrap}>{props.report.msg}</h1>
            }
        </>
    )
}

export default ModelRep
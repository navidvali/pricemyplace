import { blob } from '../../images/image_exp'
import classes from './Authentication.module.css'
import { useReducer, useState, useContext } from "react"
import AuthContext from '../store/AuthContext'
import axios from 'axios'
import LoadingAnimation from '../UI/LoadingAnimation'
import { Link, useHistory } from 'react-router-dom/cjs/react-router-dom.min'

const inputReducer = (state, action) => {
    if (action.method === "email"){
        return {...state, username: action.val}
    }
    if (action.method === "pass"){
        return {...state, password: action.val}
    }
}

const Authentication = () => {
    const history = useHistory()
    const authCtx = useContext(AuthContext)
    const [loading, setLoading] = useState(false)
    const [ msg, setMsg ] = useState('')
    const [ state, dispatchState ] = useReducer(inputReducer, {
        username: "",
        password: "",
    })

    const submitLogin = async (event) => {
        event.preventDefault()
        setLoading(true)
        try {
            let config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            const { data } = await axios.post('http://127.0.0.1:8000/users/token/', state, config);
            authCtx.login(data.token)
            console.log(data)
            history.replace('/home')
        } catch (error) {
            if (error.response.status = 401) {
                setMsg("wrong cridentials!")
                setLoading(false)
                return
            }
        }
        setMsg('')
        setLoading(false)
    }
    console.log(authCtx)
    const setemail = (event) => {
        dispatchState({method: "email", val: event.target.value})
    }
    const setpass = (event) => {
        dispatchState({method: "pass", val: event.target.value})
    }

    let window_width = window.innerWidth;
    if (window_width > 500) {
      window_width -= 16.8
    }
    window.scrollTo(0, 0);
    document.body.classList.add('hold');
    return (
        <>
            <img src={blob} alt='blob' className={classes.bgImage} 
                width={window_width.toString().concat("px")}>
            </img>
            <form className={classes.wrap} onSubmit={submitLogin}>
                <div className={classes.load}>
                    {loading && <LoadingAnimation w="100" h="100"></LoadingAnimation>}
                </div>
                {msg.length != 0 && <p className={classes.errormsg}>{msg}</p>}
                <h1>login</h1>
                <div className={classes.inpwrap}>
                    <label htmlFor='email'>EMAIL:</label>
                    <input type="text" id="email" onBlur={setemail}></input>
                </div>
                <div className={classes.inpwrap}>
                    <label htmlFor='password'>PASSWORD:</label>
                    <input type='password' id='password' onBlur={setpass}></input>
                </div>
                <input type='submit' value='Enter' className={classes.submit}></input>
                <Link to='/home' className={classes.backbtn}>home</Link>
            </form>
        </>
    )
}

export default Authentication
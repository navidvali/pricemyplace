import axios from "axios"
import { useEffect, useState, useContext } from "react"
import DataItem from "./DataItem"
import classes from "./GetData.module.css"
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min"
import LoadingAnimation from "../UI/LoadingAnimation"
import AuthContext from "../store/AuthContext"

const GetData = () => {
    const history = useHistory()
    const [ rep, setRep ] = useState({
        status: true,
        msg: "",
        places: [],
    })
    const [ loading, setLoading ] = useState(false)
    const [ msg, setMsg ] = useState('')
    const authCtx = useContext(AuthContext)

    useEffect(()=>{
        const sendGet = async () => {
            setLoading(true)
            const config = {
                headers: {
                  'Authorization': `Bearer ${authCtx.token}`
                }
            };
            try {
                const { data } = await axios.get(`http://127.0.0.1:8000/retrievedata/get_data_api/`, config)
                setRep(data)
                setLoading(false)
            } catch (error) {
                if (error.response.status = 401) {
                    setMsg("Access Denied!\nredirecting ...")
                    setLoading(false)
                    setTimeout(() => {
                        history.replace('/auth');
                      }, 2000);
                    return
                }
            }
        } 
        sendGet()
    },[])

    return(
        <div className={classes.WrapAll}>  
            <div className={classes.Wrapnav}>
                <span className={classes.title}>Get Data:</span>
                <Link to="/home" className={classes.link}>home</Link>
                <Link to="/price/predict" className={classes.link}>predict</Link>
                <Link to="/price/alldata" className={classes.link}>alldata</Link>
            </div>
            <div className={classes.Wrapdata}>
                {loading && <LoadingAnimation />} 
                {msg.length != 0 && <h1>{msg}</h1>}
                {rep.status && 
                    rep.places.map((item)=>{
                        return(
                            <DataItem key={item.Places_id} year={item.year} 
                                price={item.price} rooms={item.rooms} 
                                floor={item.floor} code={item.code} 
                                url={item.url} meter={item.meters}
                            />
                        )
                    })
                }
                {!rep.status && <h1>{rep.msg}</h1>}
            </div>
        </div>
    )
}

export default GetData
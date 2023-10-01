import axios from "axios"
import { useEffect, useState, useContext } from "react"
import DataItem from "./DataItem"
import classes from "./AllData.module.css"
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min"
import AuthContext from "../store/AuthContext"
import LoadingAnimation from "../UI/LoadingAnimation"
import Navbar from "../UI/Navbar"

const AllData = () => {
    const history = useHistory()
    const authCtx = useContext(AuthContext)
    const [ houses, setHouses ] = useState([])
    const [ page, setPage ] = useState(1)
    const [ maxPage, setMaxPage ] = useState(0)
    const [ loading, setLoading ] = useState(false)
    const [ msg, setMsg ] = useState('')

    useEffect(()=>{
        const sendGet = async () => {
            setLoading(true)
            let page_num = ''
            if(page != 1){
                page_num = `?page=${page}`
            }
            const config = {
                headers: {
                  'Authorization': `Bearer ${authCtx.token}`
                }
              };
            try {
                const { data } = await axios.get(`http://127.0.0.1:8000/retrievedata/list_homes_api/${page_num}`, config)
                setHouses(data["places"])
                setMaxPage(data["num"])
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
    },[page])
    
    const changepage = (event) => {
        let dir = event.target.id
        if (dir == "l"){
            setPage((pre) => {
                if( pre === 1){
                    return pre
                } 
                else
                {
                    return pre - 1
                }
            })
        }
        if (dir == "h"){
            setPage((pre) => {
                if( pre === maxPage){
                    return pre
                } 
                else
                {
                    return pre + 1
                }
            })
        }
    }
    return(
        <div className={classes.WrapAll}>  
            <div className={classes.Wrapnav}>
                <span className={classes.title}>All Data:</span>
                <Link to="/home" className={classes.link}>home</Link>
                <Link to="/price/predict" className={classes.link}>predict</Link>
                <Link to="/price/getdata" className={`${classes.link} ${classes.longlink}`}>get new data</Link>
            </div>
            <div className={classes.Wrapdata}>
                {msg.length != 0 && <h1>{msg}</h1>}
                {houses.length !== 0 && 
                    houses.map((item)=>{
                        return(
                            <DataItem key={item.Places_id} year={item.year} 
                                price={item.price} rooms={item.rooms} 
                                floor={item.floor} code={item.code} 
                                url={item.url} meter={item.meters}
                            />
                        )
                    })
                }
                {loading && <LoadingAnimation></LoadingAnimation>}
                <div className={classes.pageSelection}>
                    {page > 1 && <span onClick={changepage} id="l">«  </span>}
                    {`${page}/${maxPage}`}
                    {page < maxPage  && <span onClick={changepage} id="h">  »</span>}
                </div>
            </div>
        </div>
    )
}

export default AllData
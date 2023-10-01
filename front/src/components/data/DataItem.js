import classes from "./DataItem.module.css"

const DataItem = (props) => {
    return(
            <div className={classes.dataWrap}>
                <span className={classes.grid1}>meter: {props.meter}</span>
                <span className={classes.grid2}>year: {props.year}</span>
                <span className={classes.grid3}>price: {props.price}</span>
                <span className={classes.grid4}>rooms: {props.rooms}</span>
                <span className={classes.grid5}>floor: {props.floor}</span>
                <span className={classes.grid6}>code: {props.code}</span>
                <span className={classes.grid7}> url: {props.url}</span>
            </div>
    )
}

export default DataItem
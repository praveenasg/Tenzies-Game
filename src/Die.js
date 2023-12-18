export default function Die(props){
    return(
        <div onClick={props.holddice} style={{backgroundColor : props.isHeld? '#59E391' : 'white'}} className="Individual-Die">
            <h1>{props.value}</h1>
        </div>
    )
}
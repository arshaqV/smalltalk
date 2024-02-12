

const Avatar = ({code, avatarImage, cool}) => {
    if(code===null || code===undefined)
        code="000"
    
    let colors = ["#eeeeee","#04724d","#fa8334","#b6244f","#648de5"]

    return ( <div className="avatar" style={{backgroundColor : colors[code[1]]}}>
        <img className="avatarImage" src={avatarImage}></img>
        {(code[2]==="1")?<img className="cool" src={cool}></img>:null}
    </div> );
}
 
export default Avatar;
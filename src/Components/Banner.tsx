

function Banner(props:any) {
    const {setBanner} = props

    const handleClick = () => {
        setBanner(false)
    }
    
    return (
        <div className='banner-wrap'>
            <button onClick={handleClick}>X</button>            
            <img src="./Recipe.png" alt="Banner" />
        </div>
    );
}

export default Banner;
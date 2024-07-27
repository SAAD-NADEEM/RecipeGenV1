
function InputComp(props:any) {

    const {handleSubmit, data} = props
    return(
        <section className="header">
            <h1 className="header-title fontColor-1 fs-paragraph">Recipe Generator</h1>
            <p className="header-description fontColor-2">Introducing RecipeGen, 
            the ultimate app for personalized recipes! Simply input your 
            preferences, and our AI-powered engine creates delicious, tailored meal
            ideas just for you. Powered by OpenAI, your perfect dish is just a tap 
            away! {data} </p>
            <form className="submit" onSubmit={handleSubmit} >
            <input name="recipe" type="text" placeholder='"Brownie" or "Aloo Paratha"' className="header-input" />
            <button type="submit">Submit</button>
            </form>
        </section>
    )
}

export default InputComp

function Recipe(props: any) {
  const { data, title } = props;

  const { ingredients, method } = JSON.parse(data);

  // const Ingredients = () => {
  //   ingredients.map((ingredient:any, index:any) => (
  //     <li key={index}>{ingredient}</li>
  //   ));
  // };

  return (
    <section className=" recipe-box header">
      <header className="fontColor-1 fs-heading header-title">{title}</header>
      <ul className="fontColor-2 fs-secondary">{
          ingredients.map((ingredient:any, index:any) => (
            <li key={index}>{ingredient}</li>
          ))
      }</ul>
      <p className="fontColor-2 fs-paragraph">{method}</p>
      <footer>
        Copryrights &copy; 2024 RecipeGen <br /> Powered By Gemini
      </footer>
    </section>
  );
}

export default Recipe;

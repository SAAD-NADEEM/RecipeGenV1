import { useState } from "react";

function Dashboard() {

  const [trigger, setTrigger] = useState<boolean>(false)

  const handleClick = () => {
    setTrigger(!trigger)
  }

  return (
    <section className={`Dashboard-wrapper flex-column ${trigger && `Dashboard-wrapperOpen`}`}>
      <button onClick={handleClick} className="dash">
        <img src="./ham.svg" alt="" />
      </button>
      <header className="img flex-column">
        
        <img src="./Logo.jpg" alt="" />

        <ul className="flex-column fs-secondary">
          <li>
            <img src="./youtube.svg" alt="" />
            <a href="https://youtube.com/shorts/vx8QyjBlFnQ">Youtube</a>
          </li>
          <li>
            <img src="./linkedin.svg" alt="" />
            <a href="https://www.linkedin.com/in/reactandroll-saad/">Linkedin</a>
          </li>
          <li>
            <img src="./instagram.svg" alt="" />
            <a href="https://www.instagram.com/react_and_roll_saad/">Instagram</a>
          </li>
          <li>
            <img src="./github.svg" alt="" />
            <a href="https://github.com/SAAD-NADEEM">Github</a>
          </li>
        </ul>

      </header>
    </section>
  );
}

export default Dashboard;

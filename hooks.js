import { useState } from "react";
import ReactDOM from "react-dom/client";

function Home() {
  const [car, setCar] = useState({
    brand: "Ford",
    model: "Mustang",
    year: "1964",
    color: "red"
  });

  const changeVal = () => {
    setCar(previousState => {
      return {...previousState,color:"blue",model:"Dhiraj",brand:"test"}
    })
  }
  
  return (
    <>
      <h1>My {car.brand}</h1>
      <p>
        It is a {car.color} {car.model} from {car.year}.
        <button onClick={changeVal}>Change Val</button>
      </p>
    </>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Home />);

export default Home;

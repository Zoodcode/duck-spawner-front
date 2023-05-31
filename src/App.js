import logo from "./zoodcode.svg";
import "./App.css";
import duckSound from "./duck-sound.wav";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [fade, setFade] = useState(false);
  const [ducks, setDucks] = useState([]);

  const rndInt = () => Math.floor(Math.random() * 50) + 1


  const triggerFade = () => {
    console.log('here');
    if(fade){
      playAudio()

      axios
      .post("http://localhost:3000", { property: rndInt()*100 })
      .then(async (res) => {
        console.log(res);
      });
    }
    else{
       fetchDucks();

    }
    setFade((prevState) => {
      return !prevState;
    });
  };
  async function fetchDucks() {
    let res = await axios.get("http://localhost:3000");
    setDucks(res.data);
  }

  useEffect(() => {
    console.log(ducks);
  }, [ducks]);

  function playAudio() {
    new Audio(duckSound).play();
  }

  useEffect(() => {
    fetchDucks();
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <img
          onClick={()=>triggerFade()}
          onAnimationEnd={()=>triggerFade()}
          className={fade ? "App-logo fadedClass" : "App-logo visibleClass"}
          src={logo}
          alt="logo"
        />
        <p>
          <span className="zc">ZoodCode</span> Duck Warehouse
        </p>
        <div className="warehouse">
          {ducks.map(i=>  <img className="ducks" style={{filter:`hue-rotate(${i.property}deg)`}} alt="duck" src={logo}></img>)}
        </div>
      </header>
    </div>
  );
}

export default App;


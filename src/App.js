import "./App.css";
import ForeGround from "./components/ForeGround";
import PlayGround from "./components/PlayGround";
function App() {
  return (
   <div className=" section  relative w-full h-screen overflow-hidden">
   <ForeGround></ForeGround>
   <PlayGround></PlayGround>
   </div>
  );
}

export default App;

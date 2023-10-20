import { RecoilRoot } from "recoil";
import "./App.css";
import Routers from "./routers";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <RecoilRoot>
        <Routers />
      </RecoilRoot>
    </BrowserRouter>
  );
}

export default App;

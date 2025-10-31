import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { IndovinaChiRapper } from "./pages/IndovinaChiRapper";
import { GuessAlbumYear } from "./pages/GuessAlbumYear";
import { Uwufufu } from "./pages/Uwufufu";

function App() {
  return (
    <div id="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/indovinaChiRapper" element={<IndovinaChiRapper/>}/>
          <Route path="/indovinaAlbumAnno" element={<GuessAlbumYear/>}/>
          <Route path="/uwufufu" element={<Uwufufu/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

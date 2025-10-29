import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { IndovinaChiRapper } from "./pages/IndovinaChiRapper";
import { GuessAlbumYear } from "./pages/GuessAlbumYear";

function App() {
  return (
    <div id="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/indovinaChiRapper" element={<IndovinaChiRapper/>}/>
          <Route path="/indovinaAlbumAnno" element={<GuessAlbumYear/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

import {
  BrowserRouter,
  Route,
  Routes,
  Link
} from "react-router-dom";
import './App.css'
import Books from "./pages/Books";
import Update from "./pages/Update";
import Adds from "./pages/Adds";


function App() {

  return (
    <>
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Books/>}/>
          <Route path="/add" element={<Adds/>}/>
          <Route path="/update/:id" element={<Update/>}/>
        </Routes>
      </BrowserRouter>
    </div>
    </>
  )
}

export default App

import Login from './pages/login/login'
import Newmember from './pages/newmember/newmember'
import { Route, BrowserRouter, Routes } from "react-router-dom"
import Tests from './pages/tests/tests'
function App(){
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Login/>} />    
        <Route path="newmember" element={<Newmember/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;

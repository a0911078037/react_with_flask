import Login from './pages/login/login'
import Newmember from './pages/newmember/newmember'
import { Route, BrowserRouter, Routes } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify'
import Main from './pages/main/main'
import Tests from './pages/tests/tests'
function App(){
  return (
    <BrowserRouter>
    <ToastContainer/>
      <Routes>
        <Route index element={<Login/>} />    
        <Route path="newmember" element={<Newmember/>} />
        <Route path='main/:user' element={<Main/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;

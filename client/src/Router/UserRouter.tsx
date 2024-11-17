import { Route, Routes } from "react-router-dom"
import Signup from "../components/auth/Signup"
import Login from "../components/auth/Login"
import Otp from "../components/auth/Otp"

const UserRouter = () => {
  return (
    <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/otp" element={<Otp/>}/>
    </Routes>
  )
}

export default UserRouter
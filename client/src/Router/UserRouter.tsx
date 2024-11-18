import { Route, Routes } from "react-router-dom"
import Signup from "../components/auth/Signup"
import Login from "../components/auth/Login"
import Otp from "../components/auth/Otp"
import CreateProfile from "../components/auth/CreateProfile"
import HomePage from "../Pages/HomePage"

const UserRouter = () => {
  return (
    <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/otp" element={<Otp/>}/>
        <Route path="/profile-create" element={<CreateProfile/>}/>
        <Route path="/" element={<HomePage/>}/>
    </Routes>
  )
}

export default UserRouter
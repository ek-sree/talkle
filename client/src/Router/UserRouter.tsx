import { Route, Routes } from "react-router-dom"
import Signup from "../components/auth/Signup"
import Login from "../components/auth/Login"
import Otp from "../components/auth/Otp"
import CreateProfile from "../components/auth/CreateProfile"
import HomePage from "../Pages/HomePage"
import { UserPrivateRoute } from "../utils/routes/UserPrivateRoute"
import { PublicRoute } from "../utils/routes/PublicRoutes"

const UserRouter = () => {
 

  return (
    <Routes>
      <Route element={<UserPrivateRoute/>}>
        <Route path="/" element={<HomePage/>}/>
      </Route>

      <Route element={<PublicRoute/>}>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/otp" element={<Otp/>}/>
        <Route path="/profile-create" element={<CreateProfile/>}/>
      </Route>
    </Routes>
  )
}

export default UserRouter
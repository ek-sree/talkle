import { useState } from "react";
import BlockedUserModal from "./BlockedUserModal";
import Axios from "../../api/axios/axios";
import { AUTH_ENDPOINTS } from "../../api/endpoints/authEndpoints";
import { useDispatch } from "react-redux";
import { clearUser } from "../../states/redux/slice/userSlice";
import { useNavigate } from "react-router-dom";

const Settings = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

    const [blockUserModal, setBlockUserModal] = useState<boolean>(false)


    const handleBlockUserModal = ()=>{
        setBlockUserModal(true);
    }

    const handleLogout=async()=>{
      try {
        const response = await Axios.post(AUTH_ENDPOINTS.LOGOUT)
        if(response.status==200){
          dispatch(clearUser())
          sessionStorage.removeItem('accessToken')
          navigate('/login')
        }
      } catch (error) {
        console.log("Logout error",error);
        
      }
    }

    return (
      <div className="flex-1 min-h-screen bg-black text-white ml-14 p-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold mb-6">Settings</h2>
          
          <div className="space-y-6">
            <section onClick={handleBlockUserModal} className="bg-neutral-900 rounded-lg p-6 hover:bg-neutral-800 cursor-pointer">
              <button className="text-xl font-medium mb-4">Blocked Users</button>
            </section>
  
            <section className="bg-neutral-900 rounded-lg p-6 hover:bg-neutral-800 cursor-pointer">
              <button className="text-xl font-medium mb-4">Privacy</button>
            </section>
          </div>
          <div className="flex justify-center">

          <button className="bg-gradient-to-t from-red-400 to-red-600 py-4 px-6 rounded-xl mt-6 hover:bg-gradient-to-t hover:from-red-500 hover:to-red-700" onClick={handleLogout}>Logout</button>
          </div>
        </div>
        {blockUserModal &&(
            <BlockedUserModal
            isOpen={blockUserModal}
            onClose={()=>setBlockUserModal(false)}
            />
        )}
      </div>
    );
  };
  
  export default Settings;
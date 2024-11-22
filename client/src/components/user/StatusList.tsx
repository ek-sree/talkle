import { Search } from "lucide-react"
import dummyUser from '../../constant/status.json'
import avatar from '../../../public/images/9286c820b0386e71f0ad7fec5f59c7c4.jpg'
import { useState } from "react"
import StatusModal from "./StatusModal"

const StatusList = () => {
    const [openModal, setOpenModal] = useState<boolean>(false);

    const handleStatusUpload=()=>{

    }


    const handleOpenStatusModal=(user:string)=>{
        setOpenModal(true);
    }

    return ( 
        <div className="bg-neutral-800 min-h-screen w-96 ml-[3rem] p-4"> 
            <div className="flex items-center gap-4 mb-6"> 
                <div className="relative flex-grow"> 
                    <input 
                        type="text" 
                        placeholder="Search users" 
                        className="w-full pl-10 pr-4 py-2 bg-neutral-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 border-none"
                    /> 
                    <Search 
                        color="gray" 
                        className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5"
                    /> 
                </div>
            </div> 
            <div>
            <div
                    onClick={handleStatusUpload}  
                        className="mt-6 ml-8 flex border-neutral-700 pb-4 last:border-b-0 cursor-pointer hover:bg-slate-800"
                    >
                        <img 
                            src={avatar} 
                            alt="profile-dp" 
                            className="w-12 h-12 rounded-full"
                        />
                        <div className="flex flex-col flex-grow ml-4 justify-center">
                            <span className="text-white">You</span>
                            <span className="text-white"></span>
                        </div>
                    </div>
            </div>
            <div className="bg-slate-500 text-white flex justify-center rounded-md mt-6 mb-2">Updated status</div>
            <div className="overflow-y-auto max-h-[calc(100vh-14vh)] pr-2">
                {dummyUser.map((user) => (
                    <div
                    onClick={()=>handleOpenStatusModal(user)} 
                        key={user.id} 
                        className="mt-6 ml-8 flex border-b border-neutral-700 pb-4 last:border-b-0 cursor-pointer hover:bg-slate-800"
                    >
                        <img 
                            src={user.avatar} 
                            alt="profile-dp" 
                            className="w-12 h-12 rounded-full  ring-4 ring-green-300 ring-offset-2"
                        />
                        <div className="flex flex-col flex-grow ml-4 justify-center">
                        <span className="text-slate-300 text-md">{user.name}</span>
                        <span className="text-slate-400 text-sm">{user.time}</span>
                        </div>
                    </div>
                ))}
                <div className="bg-slate-500 text-white rounded-md mt-3 mb-3 flex justify-center">viewed status</div>
                {dummyUser.map((user) => (
                    <div
                    onClick={()=>onSelectStatus(user)} 
                        key={user.id} 
                        className="mt-6 ml-8 flex border-b border-neutral-700 pb-4 last:border-b-0 cursor-pointer hover:bg-slate-800"
                    >
                        <img 
                            src={user.avatar} 
                            alt="profile-dp" 
                            className="w-12 h-12 rounded-full  ring-4 ring-slate-400 ring-offset-2"
                        />
                        <div className="flex flex-col flex-grow ml-4 justify-center">
                            <span className="text-slate-300 text-md">{user.name}</span>
                            <span className="text-slate-400 text-sm">{user.time}</span>
                        </div>
                    </div>
                ))}
                
            </div>
            {openModal && (
                <StatusModal
                isOpen={openModal}
                onClose={()=>setOpenModal(false)}
                />
            )}
        </div> 
      ) 
    } 

export default StatusList
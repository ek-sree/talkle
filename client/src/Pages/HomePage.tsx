import { useState } from 'react'
import ChatArea from '../components/user/ChatArea'
import SideBar from '../components/user/SideBar'
import UserList from '../components/user/UserList'

const HomePage = () => {

  const [selectUser ,setSelectUser] = useState(null)

  return (
    <div className='flex'>
        <SideBar/>
        <UserList onSelectUser={setSelectUser}/>
        <ChatArea user={selectUser}/>
    </div>
  )
}

export default HomePage
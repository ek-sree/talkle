import { useState } from 'react'
import ChatArea from '../components/user/ChatArea'
import SideBar from '../components/user/SideBar'
import UserList from '../components/user/UserList'
import PhoneList from '../components/user/PhoneList'
import PhoneArea from '../components/user/PhoneArea'
import StatusList from '../components/user/StatusList'
import StatusArea from '../components/user/StatusArea'

const HomePage = () => {
  const [activeSection, setActiveSection] = useState('chats')

  
  const [selectUser ,setSelectUser] = useState(null)
  const [selectUserCall ,setSelectUserCall] = useState(null)

  

  return (
    <div className='flex'>

        <SideBar onSectionChange={setActiveSection}/>
        {activeSection =='chats' &&  <UserList onSelectUser={setSelectUser}/>}
        {activeSection=='chats' && <ChatArea user={selectUser}/>}

        {activeSection=='phone' && <PhoneList onSelectUserCall={setSelectUserCall}/>}
        {activeSection=='phone' && <PhoneArea userCall={selectUserCall}/>}

        {activeSection =='status' && <StatusList/>}
        {activeSection =='status' && <StatusArea/>}
    </div>
  )
}

export default HomePage
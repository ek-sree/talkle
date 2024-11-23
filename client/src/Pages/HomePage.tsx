import { useState } from 'react'
import ChatArea from '../components/user/ChatArea'
import SideBar from '../components/user/SideBar'
import UserList from '../components/user/UserList'
import PhoneList from '../components/user/PhoneList'
import PhoneArea from '../components/user/PhoneArea'
import StatusList from '../components/user/StatusList'
import StatusArea from '../components/user/StatusArea'
import Settings from '../components/user/Settings'
import UserAccount from '../components/user/UserAccount'

const HomePage = () => {
  const [activeSection, setActiveSection] = useState('chats')

  
  const [selectUser ,setSelectUser] = useState(null)
  const [selectUserCall ,setSelectUserCall] = useState(null)

  

  return (
    <div className='flex h-full w-full'>

        <SideBar onSectionChange={setActiveSection}/>

        {activeSection === 'chats' && (
        <>
        <UserList onSelectUser={setSelectUser} />
        <ChatArea user={selectUser} />
        </>
          )}


          {activeSection === 'phone' &&(
            <>
            <PhoneList onSelectUserCall={setSelectUserCall}/>
            <PhoneArea userCall={selectUserCall}/>
            </>
          )}

          {activeSection ==='status' &&(
            <>
            <StatusList/>
            <StatusArea/>
            </>
          )}

        {activeSection =='settings' && <Settings/>}

        {activeSection=='profile' && <UserAccount/>}
    </div>
  )
}

export default HomePage
import ChatArea from '../components/user/ChatArea'
import SideBar from '../components/user/SideBar'
import UserList from '../components/user/UserList'

const HomePage = () => {
  return (
    <div className='flex'>
        <SideBar/>
        <UserList/>
        <ChatArea/>
    </div>
  )
}

export default HomePage
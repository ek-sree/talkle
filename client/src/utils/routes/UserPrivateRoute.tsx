import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { isAuthenticated } from '../authCheck';
import Loading from '../../components/common/Loading';

export const UserPrivateRoute: React.FC = () => {
  const [authStatus, setAuthStatus] = useState<boolean | null>(null);
  const [flow, setFlow] =useState<string | null>('')


  useEffect(() => {
    const checkUserAuth = async () => {
      try {
        const isAuth = await isAuthenticated(); 
        setAuthStatus(isAuth);
      } catch (error) {
        console.error('Error checking authentication:', error);
        setAuthStatus(false); 
      }
    };
    checkUserAuth();
  }, []);



  useEffect(()=>{
    const flowAction = localStorage.getItem("flowAction");
    setFlow(flowAction)
  },[])

  if (authStatus === null) {
    return <div><Loading/></div>;
  }

  if(flow=='verifyed'){
    return <Navigate to='/profile-create'/>
  }

  return authStatus  ? <Outlet /> : <Navigate to="/login" replace />;
};
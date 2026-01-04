import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { authContext } from '../Context/AuthContextProvider'

export default function AuthProtectedRoutes({children}) {
  const {token} = useContext(authContext)
  const navigate = useNavigate()
  useEffect(()=>{
    if(token){
    navigate("/home")
  }
  },[token])
  return (
    <>
    {children}
    </>
  )
}

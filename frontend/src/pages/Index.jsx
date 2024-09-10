import React, { useState, useEffect } from 'react'
import FundsList from '../components/fundsList'
import FundsFamilySelect from '../components/fundsFamilySelect'
import { FundsContextProvider } from '../contexts/fundsContext'
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';



function IndexPage() {

  const [fundsFamily, setFundsFamily] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    if (Cookies.get('accessToken') === undefined) {
        navigate('/login')
    }
    }, [])

  return (
    <>
        <h4 className='text-3xl text-center font-bold mb-5'>
          Browse Mutual Funds
        </h4>
        <FundsContextProvider value={{fundsFamily, setFundsFamily}}>
          <FundsFamilySelect/>
          <FundsList />
        </FundsContextProvider>
    </>
  )
}

export default IndexPage

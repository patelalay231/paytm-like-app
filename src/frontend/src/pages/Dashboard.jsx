import {React,useState,useEffect} from 'react'
import {Navbar,Users} from '../components/'
import axios from 'axios'


function Dashboard() {
  const [username, setUsername] = useState('')
  const [balance, setBalance] = useState('')

  useEffect(() => {
    axios.get('http://localhost:8000/api/v1/account/balance',{
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    }).then(response => {
      setBalance(response.data.balance)
    })
    axios.get('http://localhost:8000/api/v1/user/me',{
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    }).then(response => {
      setUsername(response.data.name)
    })
  }, [])

  return (
    <div>
      <Navbar username={username} appTitle={'Paytm'} balance = {balance}/>
      <Users />
    </div>
  )
}

export default Dashboard
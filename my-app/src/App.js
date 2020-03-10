import React, {useState, useEffect} from 'react';
import './App.css';
import axios from 'axios';
import UserList from './components/UserList';

function App() {
  const [userList, setUserList] = useState([]);
  useEffect(() =>{
    axios
      .get('http://localhost:5000/api/users')
      .then(res=>setUserList(res.data))
      .catch(err=>console.log("stopped here", err))
    }, [])
  return (
    <UserList users={userList} updateUsers={setUserList} />
  );
}

export default App;

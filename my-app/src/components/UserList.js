import React, { useState } from "react";
import axios from "axios";

const initialUser = {
  name: "",
  bio: "",
  id:""
};

const UserList = ({ users, updateUsers }) => {
  console.log("users",users);
  const [editing, setEditing] = useState(false);
  const [userToEdit, setUserToEdit] = useState(initialUser);
  const [userToDelete, setUserToDelete] = useState();
  const [adding, setAdding] = useState(false);
  const [userToAdd, setUserToAdd] = useState({
    name: "",
    bio: "",
    id: ""
  });

  const addUser = e => {
    axios
      .post('http://localhost:5000/api/users', userToAdd)
      .then(res => {
        setUserToAdd(res.data)
        console.log('User Added!');
      })
      .catch(err => console.log(err));
  };

  const editUser = user => {
    setEditing(true);
    setUserToEdit(user);
  };

  const saveEdit = e => {
    e.preventDefault();
    // Make a put request to save your updated user
    // think about where will you get the id from...
    // where is is saved right now?
    axios
    .put(`http://localhost:5000/api/users/${userToEdit.id}`, userToEdit)
    .then(res => {
      console.log(res.data);
      axios
      .get(`http://localhost:5000/api/users`)
      .then(response => {
        updateUsers(response.data);
        window.location.reload();
      });
    })
    .catch(err => console.log(err));
  };

  const deleteUser = user => {
    // make a delete request to delete this user
    axios
    .delete( `http://localhost:5000/api/users/${user.id}`)
    .then(res => {
      console.log("delete:",res)
      setUserToDelete(res)
      window.location.reload();
    })
    .catch(err => console.log(err))
  };

  return (
    <div className="users-wrap">
      <p>users</p>
      <ul>
        {users.map(user => (
          <li key={user.name} onClick={() => editUser(user)}>
            <span>
              <span className="delete" onClick={e => {
                    e.stopPropagation();
                    deleteUser(user)
                  }
                }>
                  x
              </span>{" "}
              {user.name}
            </span>
            <div
              className="user-box"
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit user</legend>
          <label>
            name:
            <input
              onChange={e =>
                setUserToEdit({ ...userToEdit, name: e.target.value })
              }
              value={userToEdit.name}
            />
          </label>
          <label>
            bio:
            <input
              onChange={e =>
                setUserToEdit({
                  ...userToEdit,
                  bio: e.target.value
                })
              }
              value={userToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <span className="add" onClick={() => setAdding(true)}>add user</span>
      {adding && (
        <form className="add-form" onSubmit={addUser}>
          <legend>add user</legend>
          <label>
            name:
            <input
              onChange={e =>
                setUserToAdd({ ...userToAdd, name: e.target.value })
              }
              value={userToAdd.name}
            />
          </label>
          <label>
            bio:
            <input
              onChange={e =>
                setUserToAdd({
                  ...userToAdd,
                  bio: e.target.value
                })
              }
              value={userToAdd.bio}
            />
          </label>
          <div className="button-row">
            <button type="submit">add</button>
            <button onClick={() => setAdding(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />

    </div>
  );
};

export default UserList;

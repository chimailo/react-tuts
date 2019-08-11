import React, { useState, useEffect } from 'react'

function AddUserForm(props) {
    const initialState = {
        id: null,
        jersey_no: '',
        firstName: '',
        lastName: '',
        position: '',
    }

    const [player, setPlayer] = useState(initialState)

    const handleChange = event => {
        const { name, value } = event.target

        setPlayer({ ...player, [name]: value})
    }

    const handleSubmit = event => {
        event.preventDefault()
        if (!player.firstName || !player.position || !player.jersey_no ) return

        props.addUser(player)
        setPlayer(initialState)
    }

    return (
        <fieldset>
            <legend>Add New Player</legend>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="jersey_no">Jersey Number</label>
                    <input onChange={handleChange} className="form-control mb-3" 
                            value={player.jersey_no} name="jersey_no"/>
                    <label htmlFor="firstName">First Name</label>
                    <input onChange={handleChange} className="form-control mb-3"
                            value={player.firstName} name="firstName"/>
                    <label htmlFor="lastName">Last Name</label>
                    <input onChange={handleChange} className="form-control mb-3"
                            value={player.lastName} name="lastName"/>
                    <label htmlFor="position">Position</label>
                    <input onChange={handleChange} className="form-control mb-3"
                            value={player.position} name="position"/>
                    <button className="btn btn-success">Add New User</button>
                </div>
            </form>
        </fieldset>
    )
}

function UpdateUserForm(props) {
    
    const [player, setPlayer] = useState(props.currentUser)

    const handleChange = event => {
        const { name, value } = event.target

        setPlayer({ ...player, [name]: value})
    }

    const handleSubmit = event => {
        event.preventDefault()
        if (!player.firstName || !player.position || !player.jersey_no ) return

        props.updateUser(player)
    }

    useEffect(() => {
        setPlayer(props.currentUser)
    }, [props])

    return (
        <fieldset>
            <legend>Add New Player</legend>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="jersey_no">Jersey Number</label>
                    <input onChange={handleChange} className="form-control mb-3" 
                            value={player.jersey_no} name="jersey_no"/>
                    <label htmlFor="firstName">First Name</label>
                    <input onChange={handleChange} className="form-control mb-3"
                            value={player.firstName} name="firstName"/>
                    <label htmlFor="lastName">Last Name</label>
                    <input onChange={handleChange} className="form-control mb-3"
                            value={player.lastName} name="lastName"/>
                    <label htmlFor="position">Position</label>
                    <input onChange={handleChange} className="form-control mb-3"
                            value={player.position} name="position"/>
                    <button className="btn btn-success">Update User</button>
                    <button onClick={() => props.setEditing(false)}
                            className="btn btn-secondary ml-3">Cancel</button>
                </div>
            </form>
        </fieldset>
    )
}

function PlayersTable(props) {
    return (
        <div>
            <table className="table">
                <thead className="thead-light">
                    <tr>
                        <th scope="col">Jersey</th>
                        <th scope="col">Name</th>
                        <th scope="col">Position</th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {props.users.length > 0 ? (
                        props.users.map((user) => (
                            <tr key={user.id}>
                                <td>{user.jersey_no}</td>
                                <td>{user.firstName} {user.lastName}</td>
                                <td>{user.position}</td>
                                <td>
                                    <button onClick={() => props.editRow(user)}>
                                        <i className="fas fa-pen"></i>
                                    </button>
                                </td>
                                <td>
                                    <button onClick={() => props.removeUser(user)}>
                                        <i className="fas fa-trash"></i>
                                    </button>
                                </td>
                            </tr>
                        )) 
                    ) : (
                        <tr className="text-center">
                            <td>No players yet, fill the form to add players.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

function CrudApp() {
    const [users, setUser] = useState([])
    const [editing, setEditing] = useState(false)
    const initialState = {id:null, jersey_no:'', firstName:'', lastName:'', position:''}
    const [curentUser, setCurrentUser] = useState(initialState)

    const editRow = user => {
        setEditing(true)

        setCurrentUser({
            id: user.id,
            jersey_no: user.jersey_no,
            firstName: user.firstName,
            lastName: user.lastName,
            position:user.position,
        })
    }

    const addUser = user => {
        user.id = users.length + 1
        setUser([ ...users, user])
    }

    const removeUser = user => {
        setUser(users.filter(u => u.id !== user.id))
    }

    const updateUser = updatedUser => {
        setUser(users.map(user => user.id === updatedUser.id ? updatedUser : user))
    }

    return (
        <div className="container m-5">
            <header className="text-center">
                <h1>CRUD App (FM 17 players)</h1>
            </header>
            <div className="row">
                <div className="col-sm-6">
                    <PlayersTable users={users} removeUser={removeUser} editRow={editRow} />
                </div>
                <div className="col-sm-6">
                    {editing ? (
                        <UpdateUserForm
                            currentUser={curentUser}
                            setEditing={setEditing}
                            updateUser={updateUser}
                        />
                    ) : (
                        <AddUserForm addUser={addUser} />
                    )}
                </div>
            </div>
        </div>
    )
}

export default CrudApp

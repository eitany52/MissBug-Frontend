import { useEffect, useState } from "react"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service"
import { UserList } from "../cmps/UserList"
import { userService } from "../services/user.service"

export const UserIndex = () => {
    const [users, setUsers] = useState([])

    useEffect(() => {
        loadUsers()
    }, [])

    async function loadUsers() {
        const users = await userService.query()
        setUsers(users)
    }

    async function onRemoveUser(userId) {
        try {
            await userService.remove(userId)
            setUsers(prevUsers => prevUsers.filter(user => user._id !== userId))
            showSuccessMsg('User removed')
        } catch (err) {
            console.log('Error from onRemoveUser ->', err)
            showErrorMsg('Cannot remove user')
        }
    }

    async function onEditUser(user) {
        const score = +prompt('New score?')
        const userToSave = { ...user, score }
        try {
            const savedUser = await userService.save(userToSave)
            setUsers(prevUsers => prevUsers.map((currUser) =>
                currUser._id === savedUser._id ? savedUser : currUser
            ))
            showSuccessMsg('User updated')
        } catch (err) {
            console.log('Error from onEditUser ->', err)
            showErrorMsg('Cannot update user')
        }
    }
    console.log("Rendered")
    return (
        <div className="user-index">
            <h3>Users</h3>
            <UserList
                users={users}
                onRemoveUser={onRemoveUser}
                onEditUser={onEditUser} />
        </div>
    )
}

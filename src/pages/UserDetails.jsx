import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { eventBusService, showErrorMsg, showSuccessMsg } from "../services/event-bus.service"
import { userService } from "../services/user.service"
import { BugList } from "../cmps/BugList"
import { bugService } from "../services/bug/bug.service"

export const UserDetails = () => {

    const [user, setUser] = useState(null)
    const [userBugs, setUserBugs] = useState([])
    const { userId } = useParams()

    useEffect(() => {
        loadUser()
        loadUserBugs()
    }, [])

    async function loadUser() {
        try {
            const user = await userService.getById(userId)
            setUser(user)
        } catch (err) {
            showErrorMsg('Cannot load user')

        }
    }

    async function loadUserBugs() {
        const userBugs = await userService.getUserBugs(userId)
        setUserBugs(userBugs)
    }

    async function onRemoveBug(bugId) {
        try {
          await bugService.remove(bugId)
          setUserBugs(userBugs => userBugs.filter(bug => bug._id !== bugId))
          showSuccessMsg('Bug removed')
        } catch (err) {
          console.log('Error from onRemoveBug ->', err)
          showErrorMsg('Cannot remove bug')
        }
      }

      async function onEditBug(bug) {
        const severity = +prompt('New severity?')
        const bugToSave = { ...bug, severity }
        try {
          const savedBug = await bugService.save(bugToSave)
          setUserBugs(userBugs => userBugs.map(currBug =>
            currBug._id === savedBug._id ? savedBug : currBug
          ))
          showSuccessMsg('Bug updated')
        } catch (err) {
          console.log('Error from onEditBug ->', err)
          showErrorMsg('Cannot update bug')
        }
      }

    if (!user) return <h1>loadings....</h1>

    return (
        <div className="user-details container">
            <h3>User Details</h3>
            <p>Full Name: <span>{user.fullname}</span></p>
            <p>Score: <span>{user.score}</span></p>
            <BugList
                bugs={userBugs}
                onEditBug={onEditBug}
                onRemoveBug={onRemoveBug} />
            <Link to="/bug">Back to list</Link>
        </div>
    )
}

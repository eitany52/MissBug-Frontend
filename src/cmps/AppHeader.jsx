
import { useEffect, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { userService } from '../services/user.service'
import { eventBusService } from '../services/event-bus.service'

export function AppHeader() {
    const navigate = useNavigate()
    const [loggedInUser, setLoggedInUser] = useState(userService.getLoggedInUser())

    useEffect(() => {
        const unsubscribe = eventBusService.on('send-logged-in-user', _loggedInUser => {
            setLoggedInUser(_loggedInUser)
        })
        return unsubscribe
    }, [])

    async function onLogout() {
        try {
            await userService.logout()
            setLoggedInUser(null)
            navigate('/')
        } catch (error) {
            console.log("Cannot logout");
        }
    }

    function onGoToLoginSignup(location) {
        navigate(`/${location}`)
    }

    const isAdmin = loggedInUser?.isAdmin
    return (
        <header className='app-header container'>

            <div className='header-container'>
                <nav className='app-nav'>
                    <NavLink to="/">Home</NavLink> | <NavLink to="/bug">Bugs</NavLink> |
                    {isAdmin && <NavLink to="/user">Users</NavLink>} {isAdmin ? "|" : ""}
                    <NavLink to="/about">About</NavLink> | <NavLink to="/msg">Messages</NavLink>
                </nav>
                <h1>Bugs are Forever</h1>
                <section className='login-signup-nav'>
                    <nav className='app-nav'>
                        {!loggedInUser &&
                            <button onClick={() => onGoToLoginSignup('login')}>Login</button>}
                        {!loggedInUser &&
                            <button onClick={() => onGoToLoginSignup('signup')}>Signup</button>}
                    </nav>
                    {loggedInUser &&
                        <div className='user-preview'>
                            <Link to={`/user/${loggedInUser._id}`}><h3>Hello {loggedInUser.fullname}</h3></Link>
                            <button onClick={onLogout}>Logout</button>
                        </div>}
                </section>
            </div>
        </header>
    )
}

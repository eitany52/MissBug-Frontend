import { useState } from "react"
import { userService } from "../services/user.service"
import { sendLoggedInUser, showErrorMsg, showSuccessMsg } from "../services/event-bus.service"
import { useNavigate, useParams } from "react-router"

export const LoginSignup = () => {
    const [credentials, setCredentials] = useState(userService.getEmptyCredentials())
    const navigate = useNavigate()
    const { location } = useParams()

    function onChangeInput({ target }) {
        const { name: key, value } = target
        setCredentials(credentials => ({ ...credentials, [key]: value }))
    }

    async function onSubmitLoginSignup(ev) {
        ev.preventDefault()
        const { fullname, username, password, repeatPassword } = credentials
        try {
            if (location === 'signup' && password !== repeatPassword) return
            let user = null
            if (location === 'signup') {
                user = await userService.signup({ fullname, username, password })
            }
            else {
                user = await userService.login({ username, password })
            }
            sendLoggedInUser(user)
            navigate('/')
            // setCredentials(userService.getEmptyCredentials())
            showSuccessMsg(`${location === 'signup' ? 'Signed up' : 'Logged in'} successfully`)
        } catch (error) {
            console.log("Cannot login or sign up", error);
            showErrorMsg(`Failed to ${location === 'signup' ? 'sign up' : 'login'}`)
        }
    }
    const { fullname, username, password, repeatPassword } = credentials
    return (
        <form onSubmit={onSubmitLoginSignup} className="login-signup">
            {location === 'signup' &&
                <label htmlFor="fullname">Fullname</label>}
            {location === 'signup' &&
                <input
                    value={fullname}
                    name="fullname"
                    type="text"
                    placeholder="Enter your full name"
                    onChange={onChangeInput}
                    required />}
            <label htmlFor="username">Username</label>
            <input
                value={username}
                name="username"
                type="text"
                placeholder="Enter username"
                onChange={onChangeInput}
                required />
            <label htmlFor="password">Password</label>
            <input
                value={password}
                name="password"
                type="password"
                placeholder="Enter password"
                onChange={onChangeInput}
                required />
            {location === 'signup' &&
                <label htmlFor="repeatPassword">Repeat password</label>}
            {location === 'signup' &&
                <input
                    value={repeatPassword}
                    name="repeatPassword"
                    type="password"
                    placeholder="Enter password again"
                    onChange={onChangeInput}
                    required />}
            <button>{location === 'signup' ? 'Signup' : 'Login'}</button>
            {location === 'signup' && password !== repeatPassword &&
                <p>The two password fields do not match</p>}
        </form>
    )
}

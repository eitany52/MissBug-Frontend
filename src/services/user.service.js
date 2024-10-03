import Axios from 'axios'
import { bugService } from './bug/bug.service'

const axios = Axios.create({
    withCredentials: true
})


const BASE_URL = (process.env.NODE_ENV !== 'development') ?
    '/api' :
    '//localhost:3030/api'

const BASE_USER_URL = BASE_URL + '/user'
const BASE_AUTH_URL = BASE_URL + '/auth'
const STORAGE_KEY_LOGGED_IN_USER = 'loggedInUser'
export const userService = {
    query,
    getById,
    save,
    remove,
    login,
    signup,
    logout,
    getLoggedInUser,
    getEmptyCredentials,
    getUserBugs
}


async function query() {
    try {
        const { data: users } = await axios.get(BASE_USER_URL)
        return users
    } catch (error) {
        console.log("Having issues with getting users", error)
        throw error
    }
}
async function getById(userId) {
    try {
        const url = BASE_USER_URL + '/' + userId
        const { data: user } = await axios.get(url)
        return user
    } catch (error) {
        console.log("Having issues with getting the user with the given id", error)
        throw error
    }
}
async function remove(userId) {
    try {
        const url = BASE_USER_URL + '/' + userId
        const { data } = await axios.delete(url)
        return data
    } catch (error) {
        console.log("Having issues with deleting this user with the given id", error)
        throw error
    }
}
async function save(userToSave) {
    try {
        const method = userToSave._id ? 'put' : 'post'
        const { data: savedUser } = await axios[method](BASE_USER_URL, userToSave)
        return savedUser
    } catch (error) {
        console.log("Having issues with saving user", error)
        throw error
    }
}

async function login(credentials) {
    const url = BASE_AUTH_URL + '/login'
    try {
        const { data: user } = await axios.post(url, credentials)
        _saveLocalUser(user)
        return user
    } catch (error) {
        console.log("Cannot login", error);
        throw error
    }
}

function _saveLocalUser(user) {
    sessionStorage.setItem(STORAGE_KEY_LOGGED_IN_USER, JSON.stringify(user))
}

async function signup(credentials) {
    const url = BASE_AUTH_URL + '/signup'
    try {
        const { data: user } = await axios.post(url, credentials)
        _saveLocalUser(user)
        return user
    } catch (error) {
        console.log("Cannot signup", error);
        throw error
    }
}

async function logout() {
    const url = BASE_AUTH_URL + '/logout'
    try {
        await axios.post(url)
        sessionStorage.removeItem(STORAGE_KEY_LOGGED_IN_USER)
    } catch (error) {
        console.log("Cannot logout", error)
        throw error
    }
}

function getLoggedInUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGED_IN_USER))
}

function getEmptyCredentials() {
    return (
        {
            fullname: "",
            username: "",
            password: "",
            repeatPassword: ""
        }
    )
}

async function getUserBugs(userId) {
    const bugs = await bugService.query()
    const userBugs = bugs.filter(bug => bug.creator._id === userId)
    return userBugs
}
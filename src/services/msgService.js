import Axios from 'axios'

const axios = Axios.create({
    withCredentials: true
})
const BASE_URL = (process.env.NODE_ENV !== 'development') ?
    '/api/msg' :
    '//localhost:3030/api/msg'

export const msgService = {
    query,
    getById,
    save,
    remove
}

async function query() {
    try {
        let { data: msgs } = await axios.get(BASE_URL)
        return msgs
    } catch (error) {
        console.log("Having issues with getting messages", error)
        throw error
    }
}
async function getById(msgId) {
    try {
        const url = BASE_URL + '/' + msgId
        const { data: msg } = await axios.get(url)
        console.log("msg: ", msg);
        return msg
    } catch (error) {
        console.log("Having issues with getting the message with the given id", error)
        throw error
    }
}
async function remove(msgId) {
    try {
        const url = BASE_URL + '/' + msgId
        const { data } = await axios.delete(url)
        return data
    } catch (error) {
        console.log("Having issues with deleting this message with the given id", error)
        throw error
    }
}
async function save(msgToSave) {
    try {
        const method = msgToSave._id ? 'put' : 'post'
        const { data: savedMsg } = await axios[method](BASE_URL, msgToSave)
        return savedMsg
    } catch (error) {
        console.log("Having issues with saving message", error)
        throw error
    }
}
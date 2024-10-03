import Axios from 'axios'

const axios = Axios.create({
    withCredentials: true
})
const BASE_URL = (process.env.NODE_ENV !== 'development') ?
    '/api/bug' :
    '//localhost:3030/api/bug'

export const bugService = {
    query,
    getById,
    save,
    remove,
    getDefaultFilter,
    getFilterFromSearchParams,
    getAllLabels
}


async function query(filterBy = {}) {
    try {
        let { data: bugs } = await axios.get(BASE_URL, { params: filterBy })
        return bugs
    } catch (error) {
        console.log("Having issues with getting bugs", error)
        throw error
    }
}
async function getById(bugId) {
    try {
        const url = BASE_URL + '/' + bugId
        const { data: bug } = await axios.get(url)
        return bug
    } catch (error) {
        console.log("Having issues with getting the bug with the given id", error)
        throw error
    }
}
async function remove(bugId) {
    try {
        const url = BASE_URL + '/' + bugId
        const { data } = await axios.delete(url)
        return data
    } catch (error) {
        console.log("Having issues with deleting this bug with the given id", error)
        throw error
    }
}
async function save(bugToSave) {
    try {
        const method = bugToSave._id ? 'put' : 'post'
        const { data: savedBug } = await axios[method](BASE_URL, bugToSave)
        return savedBug
    } catch (error) {
        console.log("Having issues with saving bug", error)
        throw error
    }
}

function getDefaultFilter() {
    return {
        txt: '',
        minSeverity: 0
    }
}

function getFilterFromSearchParams(searchParams) {
    return {
        txt: searchParams.get('txt') || '',
        minSeverity: +searchParams.get('minSeverity') || 0,
        labels: searchParams.get('labels')?.split(',') || [],
        sortBy: searchParams.get('sortBy') || '',
        sortDir: +searchParams.get('sortDir') || null,
        pageIdx: searchParams.get('pageIdx') ? +searchParams.get('pageIdx') : null
    }
}

async function getAllLabels() {
    const bugs = await query()
    const allLabels = []

    bugs.forEach(bug => {
        const labels = bug.labels
        labels.forEach(label => {
            const regExp = new RegExp(label, 'i')
            if (!regExp.test(allLabels)) {
                allLabels.push(label)
            }
        })
    })
    return allLabels
}
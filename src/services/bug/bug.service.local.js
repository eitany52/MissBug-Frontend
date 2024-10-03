import { storageService } from './async-storage.service.js'

const STORAGE_KEY = 'bugDB'
export const bugService = {
    query,
    getById,
    save,
    remove,
    getDefaultFilter
}

async function query(filterBy = {}) {
    try {
        let bugs = await storageService.query(STORAGE_KEY)
        const { txt, minSeverity } = filterBy

        if (txt) {
            const regExp = new RegExp(txt, 'i')
            bugs = bugs.filter(bug => regExp.test(bug.title))
        }
        if (minSeverity) {
            bugs = bugs.filter(bug => bug.severity >= minSeverity)
        }

        return bugs
    } catch (error) {
        console.log("Having issues with getting bugs", error)
        throw error
    }
}

function getById(bugId) {
    return storageService.get(STORAGE_KEY, bugId)
}

function remove(bugId) {
    return storageService.remove(STORAGE_KEY, bugId)
}

function save(bugToSave) {
    if (bugToSave._id) {
        return storageService.put(STORAGE_KEY, bugToSave)
    } else {
        return storageService.post(STORAGE_KEY, bugToSave)
    }
}

function getDefaultFilter() {
    return {
        txt: '',
        minSeverity: 0
    }
}
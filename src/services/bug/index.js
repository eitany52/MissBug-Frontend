import { storageService as remoteService } from "../async-storage.service.js"
import { storageService as localService } from "../async-storage.service.local.js"

const isRemote = true

export const storageService = isRemote ? remoteService : localService
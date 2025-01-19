'use strict'

const STORAGE_KEY = 'searches'
let gSearches = loadFromStorage(STORAGE_KEY)|| []

function getSearchInfo(search) {
    const url = `https://en.wikipedia.org/w/api.php?&origin=*&action=query&list=search&srsearch=${search}&format=json`
    return axios.get(url).then(res => {
        const searchInfo = res.data.query.search
        let arrangedInfo = searchInfo.map(info => {
            const snippet = info.snippet
            const title = info.title

            return { snippet, title }
        })

        return arrangedInfo
    })
}

function saveSearches(value) {
    if (gSearches.includes(value)) return
    gSearches.push(value)
    saveToStorage(STORAGE_KEY, gSearches)
}

function getHistory(){
    return gSearches
}

function clearHistory(){
    gSearches = []
    saveToStorage(STORAGE_KEY,gSearches)
}
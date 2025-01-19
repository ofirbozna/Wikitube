'use strict'

function onInit(ev) {
    document.querySelector('.search-input').value = 'john lenon'
    onFindVideos(ev)
}


function onFindVideos(ev) {
    ev.preventDefault()
    const value = document.querySelector('.search-input').value

    saveSearches(value)

    getVideoList(value)
        .then(renderVideoList).then(res => onGetVideo(res[0].id))

    getSearchInfo(value)
        .then(renderWikipedia)

    renderHistorySearches()

}


function renderVideoList(videos) {
    const elVideoList = document.querySelector('.videos-list')
    let strHtml = videos.map(video =>
        `<div class="video-card" onclick="onGetVideo('${video.id}', '${video.title}')">
        <img src="${video.imgUrl}" alt="">
        <div>${video.title}</div>
       </div> `)
    elVideoList.innerHTML = strHtml.join('')

    return videos
}

function onGetVideo(videoId) {
    const elSelectedVideo = document.querySelector('.selected-video')
    let strHtml = `
    <iframe  src="https://www.youtube.com/embed/${videoId}">
    </iframe>
    `
    elSelectedVideo.innerHTML = strHtml
}




function renderWikipedia(infoList) {
    const elWikipedia = document.querySelector('.wikipedia')
    let strHtml = infoList.map(info => `
        <div class="info-card">
        <div class="info-title">${info.title}</div>
        <div class="info">${info.snippet}</div>
        </div>
        `
    )
    elWikipedia.innerHTML = strHtml.join('')
}


function renderHistorySearches() {
    const historySearches = getHistory()

    const elHistorySearches = document.querySelector('.searches-history')
    let strHtml = historySearches.map(search => `<div onclick="onGetHistortVideo(event , '${search}')">${search}</div>`)
    elHistorySearches.innerHTML = strHtml.join('')
}


function onGetHistortVideo(ev, search){
    document.querySelector('.search-input').value = search
    onFindVideos(ev)    

}

function onOpenModal(){
    const elModal = document.querySelector('.history-modal')
    elModal.showModal()
}

function onClearHistory(){
    const elModal = document.querySelector('.history-modal')
    elModal.close()
    clearHistory()
    renderHistorySearches() 
    
}

function onCloseModal(){
    const elModal = document.querySelector('.history-modal')
    elModal.close()
}
'use strict'

function getVideoList(value) {
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&videoEmbeddable=true&type=video&key=AIzaSyC7QA7GyfONInCjDQ4r96nF3CfMrDqMqs4&q=${value}`

    return axios.get(url).then(res => {
        const videos = res.data.items

        let arrangedVideos = videos.map(video => {
            const id = video.id.videoId
            const title = video.snippet.title
            const imgUrl = video.snippet.thumbnails.default.url

            return { id, title, imgUrl }
        })
        return arrangedVideos
    })
}



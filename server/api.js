const express = require('express')
const cors = require('cors')
const app = express()

function getRandomNumberBetween(min, max) {
    return Math.floor(
        Math.random() * (max - min) + min
    )
}

app.use(cors())

app.use(express.static('images'))

const responseMock = [
    {
        "id": "ba3ebadf-db38-4f94-9f61-adfc2e9827b9",
        "path": "/img-1.jpg",
        "photographer": "Lian Von Ah",
        "title": "A winter sunshine in Amsterdam",
        "created_at": "2016-05-03T11:00:28-04:00"
    },
    {
        "id": "0daf2d18-4624-4fd0-8004-633d115a8ec9",
        "path": "/img-2.jpg",
        "photographer": "Alex Jones",
        "title": "NYC",
        "created_at": "2016-05-03T11:00:28-04:00"
    },
    {
        "id": "680637a6-7c1d-4992-96af-952a278eae23",
        "path": "/img-3.jpg",
        "photographer": "Arthur Ferreira Neto",
        "title": "Amazon as is",
        "created_at": "2019-12-03T11:00:23-00:00"
    },
    {
        "id": "de0f8bbb-1d30-475d-85f6-706808092597",
        "path": "/img-4.jpg",
        "photographer": "Fernando Alcan",
        "title": "A nice landscape",
        "created_at": "2019-12-03T12:00:23-00:00"
    },
    {
        "id": "d93c63d7-408d-48cb-890d-db2353b2002a",
        "path": "/img-5.jpg",
        "photographer": "Felix Mayer",
        "title": "Untitled",
        "created_at": "2020-01-03T11:00:23-00:00"
    },
    {
        "id": "30dcb28c-0194-47f8-b26d-2969e7a9bff1",
        "path": "/img-6.jpg",
        "photographer": "Andrey Stan Jones",
        "title": "UK for us",
        "created_at": "2019-12-04T11:00:23-00:00"
    },
    {
        "id": "21109cf3-3c88-4b69-9048-f90f7f10b698",
        "path": "/img-7.jpg",
        "photographer": "Carla Miran",
        "title": "Greek sun",
        "created_at": "2001-12-03T11:00:23-00:00"
    },
    {
        "id": "bba2204b-09a4-45df-b9a0-3247409b8e69",
        "path": "/img-8.jpg",
        "photographer": "Ana Lisa Wandersen",
        "title": "Follow the river down",
        "created_at": "2019-12-03T11:00:23-00:00"
    },
    {
        "id": "b8bb5ba2-d555-4a07-b504-47fbd0bad2b4",
        "path": "/img-9.jpg",
        "photographer": "Alex Nelson",
        "title": "Amazon as is 2",
        "created_at": "2019-12-03T11:00:23-00:00"
    },
    {
        "id": "456b4b53-8127-4758-9a11-37dcb909148e",
        "path": "/img-10.jpg",
        "photographer": "Nova Supra",
        "title": "Universe in a nutshell",
        "created_at": "2019-09-01T11:00:01-30:00"
    }
]

app.get('/images', function (req, res) {
    res.send(responseMock)
})

app.get('/image/:id', function (req, res) {
    const { id } = req.params
    const imageInfo = responseMock.filter(image => image.id === id)
    res.send(imageInfo)
})


app.use(function(req, res, next){
    res.status(404)
    const imageIndex = getRandomNumberBetween(1, 10)
    const image = `http://localhost:3001/img-${imageIndex}.jpg`
    res.send(`<div><img src=${image} /> Página não encontrada</div>`);
});

app.listen(3001, function () {
    console.log('Ouvindo a porta 3001!')
})
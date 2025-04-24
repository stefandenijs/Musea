//
// This server will be started by Protractor in end-to-end tests.
// Add your API mocks for your specific project in this file.
//
const { on } = require('events')
const express = require('express')
const port = 3000

let app = express()
let routes = require('express').Router()

// Global mock objects
const mockUserToken = {
    token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1NzUwMjIzNjQsImlhdCI6MTU3NDE1ODM2NCwic3ViIjp7ImVtYWlsIjoiYWRtaW5AYXZhbnMubmwiLCJpZCI6IjVkYzlhY2Y3NmUzOTVhMTY1ODkwMjk2MiJ9fQ.qRPy-lTPIopAJPrarJYZkxK0suUJF_XZ9szeTtie4nc'
}

const mockUsers = [{
        _id: '61st6dd80bef6a39n07d8dd8',
        firstName: 'Stefan',
        lastName: 'de Nijs',
        email: 'Stefan@deNijs.nl',
        gender: 'Man',
        birthDate: new Date('1983-02-24T00:00:00.000Z'),
        role: 'admin',
        friends: [],
        friendRequests: []
    },
    {
        _id: '61aa6dd80bae6e39a07d8dd8',
        firstName: 'Dion',
        lastName: 'Koeze',
        email: 'Dion@Koeze.nl',
        gender: 'Man',
        birthDate: new Date('1983-02-24T00:00:00.000Z'),
        role: 'general',
        friends: [],
        friendRequests: []
    },
    {
        _id: '61aa6dd80bae6e39a07d8daa',
        firstName: 'Freek',
        lastName: 'Vonk',
        email: 'Freek@Vonk.nl',
        gender: 'Man',
        birthDate: new Date('1983-02-24T00:00:00.000Z'),
        role: 'general',
        friends: [],
        friendRequests: []
    },
    {
        _id: '61aa6dd80bae6e39a07d23ab',
        firstName: 'Scotty',
        lastName: 'Morr',
        email: 'Scott@Morr.nl',
        gender: 'Man',
        birthDate: new Date('1921-02-24T00:00:00.000Z'),
        role: 'general',
        friends: [],
        friendRequests: []
    }
]

// Add CORS headers so our external Angular app is allowed to connect
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,authorization')
    res.setHeader('Access-Control-Allow-Credentials', true)
    next()
})

routes.post('/api/authentication/login', (req, res, next) => {
    res.status(200).json(mockUserToken)
})

routes.get('/api/profile', (req, res, next) => {
    res.status(200).json(mockUsers[0])
})

routes.get('/api/user', (req, res, next) => {
    res.status(200).json(mockUsers)
})

routes.get('/api/user/61st6dd80bef6a39n07d8dd8', (req, res, next) => {
    res.status(200).json(mockUsers[0])
})

routes.get('/api/user/61aa6dd80bae6e39a07d8dd8', (req, res, next) => {
    res.status(200).json(mockUsers[1])
})

routes.put('/api/user/61aa6dd80bae6e39a07d8dd8', (req, res, next) => {
    mockUsers[1].firstName = "Robin"
    mockUsers[1].lastName = "Schellius"
    mockUsers[1].email = "Robin@Schellius.nl"
    mockUsers[1].gender = "Man"
    mockUsers[1].birthDate = new Date("1960-03-12")
    res.status(204).end()
})

routes.get('/api/user/61aa6dd80bae6e39a07d23ab', (req, res, next) => {
    res.status(200).json(mockUsers[3])
})

routes.delete('/api/user/61aa6dd80bae6e39a07d23ab', (req, res, next) => {
    mockUsers.splice(3, 1)
    res.status(204).end()
})

//
// Write your own mocking API endpoints here.
//

// Finally add your routes to the app
app.use(routes)

app.use('*', function(req, res, next) {
    next({ error: 'Non-existing endpoint' })
})

app.use((err, req, res, next) => {
    res.status(400).json(err)
})

app.listen(port, () => {
    console.log('Mock backend server running on port', port)
})

process.on('uncaughtException', (err) => {
    console.log('There was an uncaught error', err)
    process.exit(1) //mandatory (as per the Node.js docs)
})
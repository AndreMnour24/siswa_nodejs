const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const port = process.env.PORT || '3000'
const db = require('./models/index')

global.__basedir = __dirname

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

require('./models')
require('./routes/siswa')(app)

app.listen(port, (err) => {
    if (err) throw err;
    console.log("+ Ready on http://localhost:" + port)
    console.log("+ Start on " + new Date().toLocaleString())
})

module.exports = app
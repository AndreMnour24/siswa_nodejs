const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const port = process.env.PORT || '3000'
const pur = require("dotenv")
const path = require('path')

pur.config()

global.__basedir = __dirname

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

require('./models')
require('./routes/siswa')(app)
require('./routes/kelas')(app)
require('./routes/admin')(app)
require('./routes/guru')(app)

app.use('/image/siswa', express.static(path.join(__dirname + '/assets/image')))

app.listen(port, (err) => {
    if (err) throw err;
    console.log("+ Ready on http://localhost:" + port)
    console.log("+ Start on " + new Date().toLocaleString())
})

module.exports = app
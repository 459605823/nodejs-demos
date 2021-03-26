const express = require('express')
const app = express()
const router = require('./router')
const bodyParser = require('body-parser')

app.engine('html', require('express-art-template'))

app.use('/public/', express.static('./public/'))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(router)

app.listen(3000, () => {
  console.log('server is listening at http://localhost:3000')
})

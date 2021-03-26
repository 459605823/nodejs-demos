const express = require('express')
const app = express()

app.use((req, res, next) => {
  console.log('111') // 1
  next()
  console.log('222') // 5
})

app.use((req, res, next) => {
  console.log('333') // 2
  next()
  console.log('444') // 4
})

app.use((req, res, next) => {
  next()
  console.log('555') // 3
})

app.listen(3000, () => {
  console.log('Server is running at http://localhost:3000')
})
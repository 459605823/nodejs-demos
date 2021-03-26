const express = require('express')
const router = express.Router()
const fs = require('fs')
const controler = require('../util/dataControl')

// router.get('/', (req, res) => { 回调函数方式
//   controler.find((err, students) => {
//     if (err) {
//       res.status(500).send('Server error.')
//     } else {
//       res.render('index.html', {
//         students: students
//       })
//     } 
//   })
// })
router.get('/', (req, res) => { // Promise方式
  controler.findAll().then((students) => {
    res.render('index.html', {
      students: students
    })
  }).catch(err => {
    res.status(500).send('Server error.')
  })
})

router.get('/students/new', (req, res) => {
  res.render('add.html')
})

router.post('/students/new', (req, res) => {
  controler.save(req.body).then(() => { 
    res.redirect('/')
  }).catch(err => {
    res.status(500).send('Server error.')
  })
})

router.get('/students/edit', (req, res) => {
  controler.findById(req.query.id).then((student) => {
    res.render('edit.html', {
      student: student
    })
  }).catch(err => {
    res.status(500).send('Server error.')
  })
})

router.post('/students/edit', (req, res) => {
  controler.update(req.body).then(() => {
    res.redirect('/')
  }).catch(err => {
    res.status(500).send('Server error.')
  })
})

router.get('/students/delete', (req, res) => {
  controler.delete(req.query.id).then(() => {
    res.redirect('/')
  }).catch(err => {
    res.status(500).send('Server error.')
  })
})

module.exports = router

const express = require('express')
const router = express.Router()
const fs = require('fs')
const Student = require('../schemas/student') // 引入mongoose的model

router.get('/', (req, res) => {
  Student.find(function(err, students) {
    if (err) {
      res.status(500).send('Server error')
    } else {
      res.render('index.html', {
        students: students
      })
    }
  })
})

router.get('/students/new', (req, res) => {
  res.render('add.html')
})

router.post('/students/new', (req, res) => {
  new Student(req.body).save().then(() => {
    res.redirect('/')
  }).catch(() => {
    res.status(500).send('Server error.')
  })
})

router.get('/students/edit', (req, res) => {
  Student.findOne({id: req.query.id}, function(err, student) {
    if (err) {
      res.status(500).send('Server error.')
    } else {
      res.render('edit.html', {
        student: student
      })
    }
  })
})

router.post('/students/edit', (req, res) => {
  Student.findOneAndUpdate({id: req.body.id}, req.body, function(err) {
    if (err) {
      res.status(500).send('Server error.')
    } else {
      res.redirect('/')
    }
  })
})

router.get('/students/delete', (req, res) => {
  Student.findOneAndRemove({id: req.query.id}, function(err) {
    if (err) {
      res.status(500).send('Server error.')
    } else {
      res.redirect('/')
    }
  })
})

module.exports = router

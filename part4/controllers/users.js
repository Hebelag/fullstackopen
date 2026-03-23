const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async(req,res) => {
  const { username, name, password } = req.body

  if (password.length <= 3){
    return res.status(400).json({
      error: 'password is too short! (<= 3 characters)',
    })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash
  })

  const savedUser = await user.save()

  res.status(201).json(savedUser)
})

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', { 'title':1, 'url':1,'likes':1,'id':1 })
  response.json(users)
})
module.exports = usersRouter
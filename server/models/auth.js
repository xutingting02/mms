import mongoose from 'mongoose'
// const userSchema = '../schema/user.js'
// const User = mongoose.model('user', userSchema);

import User from '../schema/user.js'

const getUserById = async function (id) {
  const userInfo = await User.findOne({
    id
  }).exec()
  return userInfo
}

const getUserByName = async function (username) {
  const userInfo = await User.findOne({
    username
  }).exec()
  return userInfo
}

const addUser = async function (data) {
  let user = new User({
      username: data.username,
      password: data.password
  });
  await user.save().catch(err => {
      console.log(err);
  });
}

export default {
  getUserById,
  getUserByName,
  addUser
}

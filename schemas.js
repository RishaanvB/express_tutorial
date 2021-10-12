
const mongoose = require('mongoose')


const Schema = mongoose.Schema

const UserSchema = Schema({
    name = String,
})

const UserModel = mongoose.model('User', UserSchema)

const john = new UserModel({'name': "Jon" })
john.save((err) => {
    err && console.log(err) 
})

console.log(john.name)
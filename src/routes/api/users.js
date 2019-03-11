const {Router}  = require('express')
const {createUser} = require('../../controllers/users')

const route  = Router()

route.post('/', async (req,res)=>{

  const createdUser =   await createUser(
        {
            username : req.body.username,
            email : req.body.email,
            // password : req.body.password
        }
    )
    res.send(createdUser)
})

module.exports = route
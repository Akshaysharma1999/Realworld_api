const {Router}  = require('express')
const {createUser , verifyuser } = require('../../controllers/users')

const route  = Router()

route.post('/', async (req,res)=>{

  const createdUser =   await createUser(
        {
            username : req.body.username,
            email : req.body.email,
            password : req.body.password
        }
    )
    res.send(createdUser)
})

route.post('/login',async (req,res)=>{
    try{
        const verifieduser = await verifyuser(req.body.user)
    res.send(verifieduser)
    }catch(err)
    {
        res.status(403).send({
            errors: {
              body: [ err.message ]
            }
          })
    }
    
})
module.exports = route
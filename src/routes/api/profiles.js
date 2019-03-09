const {Router}  = require('express')

const route  = Router()



route.get('/',(req,res)=>{

    res.send(
        {
            "profile": {
              "username": "jake",
              "bio": "I work at statefarm",
              "image": "https://static.productionready.io/images/smiley-cyrus.jpg",
              "following": false
            }
        }

    )

})




module.exports = route
const { Users } = require('../models')
const { createJwt } = require('../utils/jwt')

async function createUser(userOpts)
{
     console.log(userOpts)

    if(!userOpts.username)
    {
        throw new Error('Did not supply username')
    }
    if(!userOpts.email)
    {
        throw new Error('Did not supply email')
    }
    if(!userOpts.password)
    {
        throw new Error('Did not supply password')
    }

    const user = await Users.create({
          ...userOpts,
    })

    if(!user)
    {
        throw new Error('Error creating user')
    }
    // console.log('here')
    //console.log(user)

  
    const createdUser = await Users.findOne({
        attributes: ['email', 'username', 'bio', 'image'],
        where: {
          username: user.username
        }
      })
      const token = await createJwt(createdUser.get())
    
      return {
        ...createdUser.get(),
        token
      }

}

async function verifyuser(userOpts)
{
    console.log("hi")
    if(!userOpts.email)
    {
        throw new Error ('email not proivided')
    }
    if(!userOpts.password)
    {
        throw new Error ('password not proivided')
    }

    const user = await Users.findOne(
        {
            where:{
                email : userOpts.email
            }
        }
    )

    if(!user)
    {
        throw new Error ('no such user')
    }

    if(user.password !== userOpts.password)
    {
        throw new Error ('wrong password');
    }

    const token = await createJwt(user.get())
    const userJson = {
      ...user.get(),
      token
    }
    delete userJson.password
    return userJson

}

module.exports = {
    createUser,
    verifyuser
} 
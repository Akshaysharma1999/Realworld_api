const { Users } = require('../models')

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
    // console.log(user)

    return user


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


    return user



}

module.exports = {
    createUser,
    verifyuser
} 
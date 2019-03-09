const Sequelize = require('sequelize')

const db = new Sequelize(
    {
       database:'realworlddb',
       username:'realworlduser',
       password:'realworldpass',
       dialect : 'mysql',
       host:'localhost'
    }
)

const Users =  db.define('user',{
    email:{
        type:Sequelize.STRING,
        validate:{
            isEmail:true
        },
        allowNull:false,
        unique:true
    },
    username:
    {
        type : Sequelize.STRING,
        primaryKey:true
    },
    bio : Sequelize.STRING,
    image:{
        type:Sequelize.STRING,
        allowNull:true,
        validate:{
            isUrl:true
        }
    }
})

const Articles = db.define('article',{
    slug:
})
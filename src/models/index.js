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
    },
    password:{
        type:Sequelize.STRING,
        allowNull:false
    }

})

const Articles = db.define('article',{
    slug:{
        type:Sequelize.STRING,
        primaryKey:true
    },
    title:{
        allowNull:false,
        type:Sequelize.STRING(50)
    },
    description:Sequelize.STRING(100),
    body:Sequelize.STRING
})


const Comments = db.define('comment', {
    body: {
      type: Sequelize.STRING,
      allowNull: false
    }
  })

  

const Tags = db.define('tag', {
    name: {
      type: Sequelize.STRING,
      primaryKey: true
    }
  })
  

  Articles.hasMany(Comments)
  Comments.belongsTo(Articles)

  Articles.belongsTo(Users,{as : 'author'})
  Users.hasMany(Articles)

  Comments.belongsTo(Users , {as:'author'})

  Articles.belongsToMany(Users , {through:'favorites'})
  Users.belongsToMany(Articles , {through:'favorites'})
  
  Articles.belongsToMany(Tags , {through:'article_tags'})
  Tags.belongsToMany(Articles , {through:'article_tags'})
  
  
module.exports = {
    db,
    Users, Articles, Comments, Tags
  }
  
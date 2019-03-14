const express = require('express')
const {db} = require('./models')
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/api',require('./routes/api'))

db.sync().then(()=>{
    app.listen(1234,()=>{console.log("server started on http://localhost:1234")})
}).catch(err => {
    console.error(err)
  })
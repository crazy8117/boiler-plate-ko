const express = require('express')
const app = express()
const port = 5000

const { User } = require("./models/User")
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

mongoose.connect('mongodb+srv://crazy8117:bean1004@cluster0.stjtuxb.mongodb.net/?retryWrites=true&w=majority',{
    useNewUrlParser: true, useUnifiedTopology: true
}).then(()=>console.log('MongoDB connected...'))
  .catch(err => console.log(err))

app.get('/', (req, res) => {
  res.send('Hello World! 헬로 월드')
})

app.post('/register', (req, res) => {
    // 회원 가입 할때 필요한 정보들을 client 에서 가져오면
    // 그것들을 데이터 베이스에저장한다.
    const user = new User(req.body)

    user.save((err, userInfo) => {
        if(err) return res.json({success: false, err})
        return res.status(200).json({
            success: true
        })
    })

})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
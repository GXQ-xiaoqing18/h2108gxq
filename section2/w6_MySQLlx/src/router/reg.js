const express = require('express')
const db=require('../db')
const router = express.Router();
const {formatData} = require('../utils')
module.exports = router;

// 注册用户
router.post('/',async(req,res)=>{
    const {username,password} = req.body;

    const sql = `insert into users(username,password) values('${username}','${password}')`

    const data =  await db(sql)
    if(data.insertId){
        // 统一前后端数据格式
        // res.send({
        //     code:200,
        //     data:[],
        //     message:'success'
        // })
        res.send(formatData())
        
    }else{
        // res.send({
        //     code:400,
        //     data:[],
        //     message:'fail'
        // })
        res.send(formatData({code:400})) 
    }
    
})

router.get('/check',async(req,res)=>{
    const {username} = req.query;

    // 检测用户名是否存在，根据用户名查询数据库，看是否能查询到数据，如果查询到：用户已存在 查不到：可注册
    const sql = `select username from users where username="${username}"`
    console.log(sql);
  const data = await db(sql)
  if(data.length>0){
    //   res.send('用户已存在')
    // res.send({
    //     code:400
    // })
    res.send(formatData.fail()) 
  }else {
    //   res.send('可注册')
    // res.send({
    //     code:200
    // })
    res.send(formatData({code:200})) 
  }
})


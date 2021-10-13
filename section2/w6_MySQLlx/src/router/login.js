const express = require('express')
const db=require('../db')
const router = express.Router();
module.exports = router;

// 登录
router.get('/',async(req,res)=>{
    const {username,password,mdl} = req.query;

    const sql = `select id,username,age,gender,regtime from users where username='${username}' and password='${password}'`

    const data =  await db(sql)
    // 查询到数据，说明用户名和密码正确
    if(data.length>0){
        res.send({
            code:200,
            data:data[0],
            message:'success'
        })
    }else{
        res.send({
            code:400,
            data:[],
            message:'fail'
        })
    }
    
})

const express = require('express')
const db=require('../db')
const router = express.Router();
module.exports = router;

router.get('/list',async(req,res)=>{
    const sql = `select * from users`

    // db(sql,function(data){
    //     res.send()
    // }) 

    // db(sql).then(data=>{
    //     res.send(data)
    // }) 

    const data =  await db(sql)

    res.send({
        code:200,
        data:data,
        msg:'success'
    })
})

router.get('/:id',async(req,res)=>{
    const {id} = req.params;
    const sql = `select * from users where id=${id}`
    const data =  await db(sql)
    res.send({
        code:200,
        data:data[0],
        msg:'success',        
    } ) 
})
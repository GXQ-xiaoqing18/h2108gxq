const express = require('express')
const db = require('../db')

// const mysql = require('mysql')
// // 连接方式一：创建连接对象，并配置参数
// const connection = mysql.createConnection({
//     host     :'localhost',
//     user     :'root',
//     password :'root',
//     database :'h52108'
// })

// // 连接方式二：
// //创建连接池
// const pool  = mysql.createPool({
//     host     : 'localhost',
//     user     : 'root',
//     password : 'root',
//     // port: 3306,
//     database: 'h52108',
//     // 允许每个mysql语句有多条查询（默认false）.使用它时要非常注意，因为它很容易引起sql注入攻击
//     //multipleStatements: true
// });

const router = express.Router();
module.exports = router;


//get /api/goods/list
router.get('/list',async(req,res)=>{
    const {page=1,size=10,order,category} = req.query;
    // 计算索引值
    const idx = (page-1)*size
    const qty = Number(size)
    // 查询数据库商品，并把查询数据结果响应到前端
    let sql =`select * from goods`
    if(category){
        sql += ` where category='${category}'`
    }

    if(order){
        let [key,type=0] = order.split(',')

        sql += ` order by ${key}`
        if(type == 1){
            sql += ` desc`
        }
    }

    sql += ` limit ${idx},${qty}`


    // // 连接数据库
    // connection.connect();
    // connection.query(sql,function(error,results,fields){
    //    if(error) throw error;
    //    console.log('the solution is:',results); 
    //    res.send(results)
    // //    关闭连接
    // connection.end()

    // pool.query(sql,(err,rows)=>{
    //     res.send(rows)
    // })

    const data = await db(sql)
    res.send({
        code:200,
        data,
        msg:'success'
    })

    })

// router.get('/:id',async(req,res)=>{
//     // 根据id查询数据库商品，并把擦华讯数据结果响应到前端 
//     const  {id}=req.params;
//     const sql = `select * from goods where _id ='${id}'`
   
// //    // 连接数据库
// //    connection.connect();
// //     console.log('sql=',sql);
// //     connection.query(sql,function(error,results,fields){
// //         if(error) throw error;
// //         console.log('the solution is:',results); 
// //         res.send(results[0])
// //      //    关闭连接
// //      connection.end()
// //      })

// // pool.query(sql,(err,rows)=>{
// //     res.send(rows[0])
// // })
// const data = await db (sql)
// res.send({
//     code:200,
//     data:data[0],
//     msg:'success'
// })

// })


// get /api/goods/1,/api/goods/2
router.get('/:id',async (req,res)=>{
    const {id} = req.params;
    // 根据id查询数据库商品，并把查询结果响应到前端
    const sql = `select * from goods where _id='${id}'`
    // console.log('sql=',sql)
    const data = await db(sql)
    res.send({
        code:200,
        data:data[0],
        msg:'success'
    })
})


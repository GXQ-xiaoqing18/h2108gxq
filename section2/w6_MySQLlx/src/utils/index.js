// 封装formatDate函数，用以生产返回前端的数据格式
function formatData(obj={}){
    const {code=200,data=[],msg='success'} = obj
    if(code === 400 && msg==='success'){
        msg='fail'
    }
    return {
        code,
        data,
        msg
    }
}

formatData.fail=function(){
    return formatData({code:400})
}
formatData.success=function(){
    return formatData()
}


module.exports={
    formatData
}

class Cookie{
    // 初始化
    constructor(){
        // cookie -> object
        const cookies = document.cookie.split('; ');

        const data = {}
        cookies.forEach(item=>{
            const [key,value] = item.split('=')
            data[key] = value;
        })

        this.data = data;
    }

    // 方法

    // 获取
    get(key){
        return this.data[key] 
    }

    // 设置
    set(key,value,options={}){
        this.data[key] = value;

        const params = [];
        for(let key in options){
            params.push(`${key}=${options[key]}`)
        }

        document.cookie = `${key}=${value}` + (params.length>0 ? `;`+params.join(';') : '')
    }

    // 删除
    remove(key){
        const date = new Date()
        data.setDate(date.getDate()-1)

        this.set(key,null,{expires:date})

        delete this.data[key];
    }

    // 清空
    clear(){
        for(let key in this.data){
            this.remove(key)
        }
    }

}




// 节点操作
class Query{
    constructor(selector){
        this.el = document.querySelectorAll(selector)
    }

    // 事件绑定
    on(type,handle){
        this.el.forEach(item=>{
            item['on'+type]=handle
        })
    }
    // 添加类名
    addClass(className){
        this.el.forEach(item=>{
            item.classList.add(className)
        })
    }

    removeClass(className){
        this.el.forEach(item=>{
            item.classList.remove(className)
        })
    }
}

const $ =function(selector){
    return new Query(selector)
}


const gulp = require('gulp');
const babel = require('gulp-babel');
const rename = require('gulp-rename')
const concat = require('gulp-concat')
const uglify = require('gulp-uglify')


// console.log('gulp',gulp,__proto__);
// 老版本创建任务
// gulp.task('es625',function(){
//     console.log(123);
// })

// 新版本创建任务
// exports.es625=function(done){
//     // done回调函数:用于表示完成任务
//     console.log('es625');
//     // 模拟异步任务
//     setTimeout(()=>{
//         done();
//     },5000)
// }
// exports.comoress=function(done){
//     console.log('comoress');

//     done();
// }
// module.exports = {
//     es625(){
//         console.log(888);
//     }
// }
function es625 (done){
    // 输入：查找目标文件（返回文件流）
    gulp.src('./src/js/common.js')

    // 处理
    .pipe(babel({
        presets:["@babel/preset-env"],
    }))

    // 输出：把处理过得文件保存到硬盘
    .pipe(gulp.dest('./dist'))

    done();
}

function mergeJS(done){
    console.log('mergeJS');
    done();
}

function compileJS(done){
    console.log('compileJS');
    done();
}

// 编译JS：ES6+转ES5，合并，压缩
function compileJS(done){
    // gulp.src(['./src/**/*.js','!./src/plugins/jquery.min.js'])
    gulp.src('./src/**/*.js')

    // ES6+ -> ES5：gulp-babel+@babel/core+@babel/preset-env
    .pipe(babel({
        presets:["@babel/preset-env"],
    }))

    // 合并: gulp-concat
    .pipe(concat('all.js'))
    // 输出：未压缩
    .pipe(gulp.dest('./dist/js'))

    // 压缩：
    .pipe(uglify())
    // 重命名
    .pipe(rename({
         // dirname: "main/text/ciao",
        // basename: "aloha",
        // prefix: "page-", // page-all.js
        suffix: ".min", // all.min.js
        // extname: ".md"
    }))
    .pipe(gulp.dest('./dist/js'))

    done();
}

// es6->es5
exports.es625 = es625
exports.mergeJS = mergeJS
exports.compileJS = compileJS

// 监听
exports.listen = function(){
    // 单个任务
    gulp.watch('./src/**/*.js',es625)

    // 多个任务
    gulp.watch('./src/**/*.js',
    
    // 顺序执行
    gulp.series(mergeJS,es625,compressJS)

    // 同时执行
    // gulp.parallel(mergeJS,es625,compressJS)
    
    )
}

exports.server = function(){

}

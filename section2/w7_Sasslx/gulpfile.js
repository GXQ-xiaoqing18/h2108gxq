const gulp = require('gulp')
// const babel = require('gulp-babel')
// const concat = require('gulp-concat')
// 引入gulp-sass并指定sass编译器（sass或node-sass）
const sass = require('gulp-sass')(require('sass'))

const filePath = {
    sass:'./src/sass/*.scss',
    js:'./src/js/*.js',
    html:'./src/views/*.html'
}

//创建任务：编译sass
const compileSass = function(done){
    // 匹配文件
    gulp.src(filePath.sass)
    // 编译
    .pipe(sass({
        // outputStyle:'compressed'//expanded(默认),compressed
    })).on('error',sass.logError)

    // 输出
    .pipe(gulp.dest('./dist/css'))

    done();
}

exports.compileSass = compileSass;

// 默认任务
// 调用方式：gulp
exports.default = function(){
    // 监听sass
    gulp.watch(filePath.sass,compileSass);
}
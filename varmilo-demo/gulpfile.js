const gulp = require('gulp'),
  htmlmin = require('gulp-htmlmin'),
  autoprefixer = require('gulp-autoprefixer'),
  cleanCss = require('gulp-clean-css'),
  del = require('del'),
  babel = require('gulp-babel'),
  uglify = require('gulp-uglify'),
  connect = require('gulp-connect'),
  { createProxyMiddleware } = require('http-proxy-middleware'),
  sass = require('gulp-sass')

const paths = {
  html: {
    src: 'src/**/*.html',
    dest: 'dist'
  },
  css: {
    src: 'src/css/**/*.scss',
    dest: 'dist/css'
  },
  js: {
    src: 'src/js/**/*.js',
    dest: 'dist/js'
  },
  libs: {
    src: 'src/libs/**',
    dest: 'dist/libs'
  },
  imgs: {
    src: 'src/images/**',
    dest: 'dist/images'
  },
  ico: {
    src: 'src/favicon.ico',
    dest: 'dist'
  }
}
// 制定删除任务
const delDist = () => del('dist')

// 制定html任务
const html = () => {
  return gulp.src(paths.html.src)
    .pipe(htmlmin({
      removeComments: true,//清除HTML注释
      collapseWhitespace: true,//压缩HTML
      collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input checked />
      removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
      removeScriptTypeAttributes: false,//删除<script>的type="text/javascript"
      removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
      minifyJS: true,//压缩页面JS
      minifyCSS: true//压缩页面CSS 
    }))
    .pipe(gulp.dest(paths.html.dest))
    .pipe(connect.reload())
}

// 制定css任务
const css = () => {
  return gulp.src(paths.css.src)
    .pipe(sass())
    .pipe(autoprefixer({
      cascade: false
    }))
    .pipe(cleanCss())
    .pipe(gulp.dest(paths.css.dest))
    .pipe(connect.reload())
}
// 制定js任务
const js = () => {
  return gulp.src(paths.js.src)
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(uglify())
    .pipe(gulp.dest(paths.js.dest))
    .pipe(connect.reload())
}

// 制定imgs任务,移动图片到dist目录
const imgs = () => gulp.src(paths.imgs.src).pipe(gulp.dest(paths.imgs.dest))
// 制定libs任务,移动图片到dist目录
const libs = () => gulp.src(paths.libs.src).pipe(gulp.dest(paths.libs.dest))

// 把ico图标移动到dist目录
const ico = () => gulp.src(paths.ico.src).pipe(gulp.dest(paths.ico.dest))

const server = () => {
  connect.server({
    root: 'dist',
    port: 1234,
    livereload: true,
    middleware() {
      return [
        createProxyMiddleware('/api', {
          target: 'https://xiongmaoyouxuan.com',
          changeOrigin: true
        })
      ]
    }
  })
}

// 监听任务的改变,一旦被修改就重启任务
const watch = () => {
  gulp.watch(paths.html.src, html)
  gulp.watch(paths.css.src, css)
  gulp.watch(paths.js.src, js)
}


// 默认导出任务且只用导出一次
module.exports.default = gulp.series(delDist, gulp.parallel(html, css, js, imgs, libs, watch, server,ico))
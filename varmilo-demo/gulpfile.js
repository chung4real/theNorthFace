const gulp = require('gulp'),
  htmlmin = require('gulp-htmlmin'),
  autoprefixer = require('gulp-autoprefixer'),
  cleanCss = require('gulp-clean-css'),
  del = require('del')

const paths = {
  html: {
    src: 'src/**/*.html',
    dest: 'dist'
  },
  css: {
    src: 'src/css/**/*.css',
    dest: 'dist/css'
  }
}
// 制定删除任务
const delDist = del('dist')
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
}

// 制定css任务
const css = () => {
  return gulp.src(paths.css.src)
    .pipe(autoprefixer({
      cascade: false
    }))
    .pipe(cleanCss())
    .pipe(gulp.dest(paths.css.dest))
}
// module.exports = {
//   html,
//   css
// }

module.exports.default = gulp.series(delDist, gulp.parallel(html, css))
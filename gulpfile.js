var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var babel = require('gulp-babel');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var cssmin = require('gulp-minify-css');
var htmlmin = require('gulp-htmlmin');
var rev = require('gulp-rev-append');
var livereload = require('gulp-livereload');
// 获取 gulp-imagemin 模块
var imagemin = require('gulp-imagemin');
 // 深度压缩图片
pngquant = require('imagemin-pngquant');
var htmlOptions = {
  removeComments: true, // 清除HTML注释
  collapseWhitespace: true, // 压缩HTML
  collapseBooleanAttributes: true, // 省略布尔属性的值 <input checked="true"/> ==> <input />
  removeEmptyAttributes: true, // 删除所有空格作属性值 <input id="" /> ==> <input />
  removeScriptTypeAttributes: true, // 删除<script>的type="text/javascript"
  removeStyleLinkTypeAttributes: true, // 删除<style>和<link>的type="text/css"
  minifyJS: true, // 压缩页面JS
  minifyCSS: true // 压缩页面CSS
};


gulp.task('htmlmin', function() {
  gulp.src('./src/tpl/*.html')
    .pipe(htmlmin(htmlOptions))
    .pipe(gulp.dest('./dist/tpl'));

    // 压缩views的html文件
  gulp.src('./src/views/*.html')
    .pipe(htmlmin(htmlOptions))
    .pipe(gulp.dest('./dist/views'));
})

gulp.task('cssmin', function() {
  gulp.src('./src/css/**/*.css')
    .pipe(cssmin({
      // 类型：Boolean 默认：true [是否开启高级优化（合并选择器等）]
      advanced: false,
      // 保留ie7及以下兼容写法 类型：String 默认：''or'*' [启用兼容模式； 'ie7'：IE7兼容模式，'ie8'：IE8兼容模式，'*'：IE9+兼容模式]
      compatibility: 'ie7',
      // 类型：Boolean 默认：false [是否保留换行]
      keepBreaks: true,
      // 保留所有特殊前缀 当你用autoprefixer生成的浏览器前缀，如果不加这个参数，有可能将会删除你的部分前缀
      keepSpecialComments: '*'
    }))
    .pipe(gulp.dest('./dist/css'));

    // 压缩views的css
  gulp.src('./src/views/css/*.css')
    .pipe(cssmin({
      // 类型：Boolean 默认：true [是否开启高级优化（合并选择器等）]
      advanced: false,
      // 保留ie7及以下兼容写法 类型：String 默认：''or'*' [启用兼容模式； 'ie7'：IE7兼容模式，'ie8'：IE8兼容模式，'*'：IE9+兼容模式]
      compatibility: 'ie7',
      // 类型：Boolean 默认：false [是否保留换行]
      keepBreaks: true,
      // 保留所有特殊前缀 当你用autoprefixer生成的浏览器前缀，如果不加这个参数，有可能将会删除你的部分前缀
      keepSpecialComments: '*'
    }))
    .pipe(gulp.dest('./dist/views/css'));

})

gulp.task('jsmin', function() {
  gulp.src('./src/js/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(babel({
      presets: ['es2015', 'stage-2']
    }))
    .pipe(uglify({
      mangle: true, // 类型：Boolean 默认：true 是否修改变量名
      compress: true, // 类型：Boolean 默认：true 是否完全压缩
      // preserveComments: 'all' // 保留所有注释w
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dist'));

  // 压缩views的js文件
  gulp.src('./src/views/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(babel({
      presets: ['es2015', 'stage-2']
    }))
    .pipe(uglify({
      mangle: true, // 类型：Boolean 默认：true 是否修改变量名
      compress: true, // 类型：Boolean 默认：true 是否完全压缩
      // preserveComments: 'all' //保留所有注释w
    }))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest('./dist/views'));
})

gulp.task('revhtml', function() {
  gulp.src('./src/index.html')
    .pipe(rev())
    .pipe(htmlmin(htmlOptions))
    .pipe(gulp.dest('./dist'))
    .pipe(livereload());
})

// 压缩图片任务
// 在命令行输入 gulp images 启动此任务
gulp.task('images', function () {
  // 压缩img文件夹的图片
  gulp.src('src/img/*.*')
    .pipe(imagemin({
        progressive: true,
        optimizationLevel: 7,
        use: [pngquant()]
    }))
    .pipe(gulp.dest('dist/img'))

  // 压缩views的图片
  gulp.src('src/views/images/*.*')
    .pipe(imagemin({
      progressive: true
    }))
    .pipe(gulp.dest('dist/views/images'));
});

gulp.task('mywatch', function() {
  livereload.listen();
  gulp.watch(['./src/js/**/*.js', './src/views/**/*.js', './src/**/*.html', './src/views/*.html'
  , './src/css/**/*.css', './src/views/css/*.css', './src/index.html', 'src/img/*.*', 'src/views/images/*.*'],
  ['jsmin', 'htmlmin', 'cssmin', 'revhtml', 'images'],
  function(event){
    console.log(`${event.path} was ${event.type} , running tasks...`);
  })
})

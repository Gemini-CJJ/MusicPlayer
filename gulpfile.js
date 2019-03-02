var gulp = require("gulp");
var htmlClean = require("gulp-htmlclean"); //压缩html
var imageMin = require("gulp-imagemin"); //压缩图片
var uglify = require("gulp-uglify"); //压缩js
var strip = require("gulp-strip-debug"); //清除js调试代码
var concat = require("gulp-concat"); //连接多个js文件
var less = require("gulp-less"); //less转css
var postcss = require("gulp-postcss"); //传递其他插件
var auotprefixer = require("autoprefixer"); //添加前缀
var cssnano = require("cssnano"); //压缩代码
var connect = require("gulp-connect"); //服务器

var devMode = process.env.NODE_ENV == "development"; //环境变量
// gulp.src()//读文件
// gulp.dest()//写文件
// gulp.task() //任务
// gulp.watch() //监听
var folder = {
  src: "./src/", //开发目录文件夹
  dist: "./dist/" //压缩打包后目录文件夹
};

gulp.task("html", function() {
  var page = gulp.src(folder.src + "html/*").pipe(connect.reload());
  if (!devMode) {
    // page.pipe(htmlClean());
  }
  page.pipe(gulp.dest(folder.dist + "html/"));
});

gulp.task("images", function() {
  gulp
    .src(folder.src + "images/*")
    .pipe(connect.reload())
    .pipe(imageMin())
    .pipe(gulp.dest(folder.dist + "images/"));
});

gulp.task("js", function() {
  var page = gulp.src(folder.src + "js/*").pipe(connect.reload());
  if (!devMode) {
    // page.pipe(uglify());
  }
  page.pipe(gulp.dest(folder.dist + "js/"));
});

gulp.task("css", function() {
  var options = [auotprefixer(), cssnano()];
  var page = gulp
    .src(folder.src + "css/*")
    .pipe(less())
    .pipe(connect.reload());
  if (!devMode) {
    page.pipe(postcss(options));
  }
  page.pipe(gulp.dest(folder.dist + "css/"));
});

gulp.task("watch", function() {
  gulp.watch(folder.src + "html/*", ["html"]);
  gulp.watch(folder.src + "css/*", ["css"]);
  gulp.watch(folder.src + "js/*", ["js"]);
  gulp.watch(folder.src + "images/*", ["images"]);
});

gulp.task("server", function() {
  connect.server({
    port: "8081", //端口
    livereload: true //自动刷新
  });
});

gulp.task("default", ["html", "images", "js", "css", "watch", "server"]);

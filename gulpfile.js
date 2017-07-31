var gulp = require("gulp");
var htmlExtract = require("./gulp-html-extract");
var concat   = require("gulp-concat");

gulp.task('default',function(){
	return gulp.src(['sample/*.html'])
		.pipe(htmlExtract())
		.pipe(concat('bundle.html'))		//結合
		.pipe(gulp.dest('dist/'));
});
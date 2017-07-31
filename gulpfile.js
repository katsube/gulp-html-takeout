var gulp    = require("gulp");
var takeout = require("./gulp-html-takeout");
var concat  = require("gulp-concat");

gulp.task('default',function(){
	return gulp.src(['sample/*.html'])
		.pipe(takeout('h1'))
		.pipe(concat('bundle.html'))		//結合
		.pipe(gulp.dest('dist/'));
});
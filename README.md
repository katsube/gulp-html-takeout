# gulp-html-takeout
This is the Gulp plugin which extracts only the part specified by CSS selector.
（CSSセレクターで指定した部分のみを取り出すGulpプラグインです。）

## install
```bash
npm install --save-dev gulp-html-takeout
```

## Example
gulpfile.js
```javascript
var gulp    = require("gulp");
var takeout = require("gulp-html-takeout");
var concat  = require("gulp-concat");

gulp.task('default',function(){
	return gulp.src(['sample/*.html'])
		.pipe(takeout('h1'))
		.pipe(concat('bundle.html'))
		.pipe(gulp.dest('dist/'));
});
```

sample/hello.html
```html
<h1>Hello</h1>
```

sample/world.html
```html
<h1>World</h1>
```

dist/bundle.html
```html
Hello
World
```

## API
### takeout(option)
#### option
Set CSS Seletor. If not specified, "body" is the default.
```javascript
   // == "body"
   .pipe(takeout())
   
   // HTML element
   .pipe(takeout("html"))
   .pipe(takeout("head"))
   .pipe(takeout("h1"))
   
   //Class and ID
   .pipe(takeout(".foo"))
   .pipe(takeout("#bar"))
```

If more than one HTML Element is applicable
```javascript
gulp.task('default',function(){
	return gulp.src(['sample/*.html'])
		.pipe(takeout('h1'))
		.pipe(concat('bundle.html'))
		.pipe(gulp.dest('dist/'));
});
```
sample/foo.html
```html
<h1>Hello</h1>
<h1>World</h1>
```
dist/bundle.html
```html
HelloWorld
```

## License
[MIT License](https://en.wikipedia.org/wiki/MIT_License)

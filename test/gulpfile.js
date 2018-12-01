
var gulp = require('gulp');

var download = require('../index');

gulp.task('default', function() {
	return download('http://example.com').pipe(gulp.dest('./'));
});

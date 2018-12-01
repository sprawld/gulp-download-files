#gulp-download-files

Fork of [gulp-download](https://github.com/Metrime/gulp-download), a [Request](https://github.com/mikeal/request) wrapper for gulp, allowing you to download files via http/https.

##Installation

	npm install gulp-download-files
	
##Usage

	var download = require("gulp-download-files");
	
	download(url)
		.pipe(gulp.dest("downloads/"));
		
Url: Either a url string, an array of url strings, or an object with of {filename: url} pairs

var through = require("through"),
	Vinyl = require('vinyl'),
	// gutil = require("gulp-util"),
	request = require("request"),
	progress = require("request-progress"),
	col = require('ansi-colors');


module.exports = function(urls){
	var stream = through(function(file,enc,cb){
		this.push(file);
		cb();
	});

	if(Array.isArray(urls)) { 
		// array
		var files = urls.map(function(i) {
			return [i.split('/').pop(),i];
		});
	} else if(typeof urls === "object") {
		var files = [];
		for(var i in urls) {
			files.push([i,urls[i]]);
		}
	} else if(typeof urls === "string") {
		var files = [[urls.split('/').pop(),urls]];
	}
	
	var downloadCount = 0;

	function download(dat){
		var fileName = dat[0],
			url = dat[1],
			firstLog = true;
		
		progress(
			request({url:url,encoding:null},downloadHandler),
			{throttle:1000,delay:1000}
		)
		.on('progress',function(state){
			process.stdout.write(' '+state.percent+'%');
		})
		.on('data',function(){
			if(firstLog){
				process.stdout.write('['+col.green('gulp')+']'+' Downloading '+col.cyan(fileName)+'...');
				firstLog = false;
			}
		});

		function downloadHandler(err, res, body){
			// var file = new gutil.File( {path:fileName, contents: new Buffer(body)} );
			var file = new Vinyl({
				path: fileName,
				contents: new Buffer(body)
			});
			// var file = new Vinyl( {path:fileName, contents: new Buffer(body)} );
			stream.queue(file);

			process.stdout.write(' '+col.green('Done\n'));
			downloadCount++;
			if(downloadCount != files.length){
				download(files[downloadCount]);
			}else{
				stream.emit('end');
			}
		}
	}
	if(files.length) download(files[0]);
	else stream.emit('end');

	return stream;
};


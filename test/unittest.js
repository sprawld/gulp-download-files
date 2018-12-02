
// var gulp = require('gulp');

var {expect} = require('chai');

var gulp = require('gulp');
var download = require('../index');
var rename = require('gulp-rename');
var fs = require('fs');

// gulp.task('default', function() {
// 	return 
// });

describe('gulp-download-files', () => {


	it('example.com string', done => {

		console.log('testing');
		// remove file
		if(fs.existsSync(__dirname+'/downloaded/string-test.txt')) fs.unlinkSync(__dirname+'/downloaded/string-test.txt');

		download('http://example.com').pipe(rename('string-test.txt')).pipe(gulp.dest(__dirname+'/downloaded/'))
			.on('error', err => {
				expect(false).to.be.true;
				console.log('error '+err);
				done();
			})
			.on('end', () => {

				let example = fs.readFileSync(__dirname+'/example.com').toString();
				let page = fs.readFileSync(__dirname+'/downloaded/string-test.txt').toString();
				expect(example).to.equal(page);
				fs.unlinkSync(__dirname+'/downloaded/string-test.txt');
				done();
			});
	});

	it('example.com array', done => {

		console.log('testing');
		// remove file
		if(fs.existsSync(__dirname+'/downloaded/array-test.txt')) fs.unlinkSync(__dirname+'/downloaded/array-test.txt');

		download(['http://example.com']).pipe(rename('array-test.txt')).pipe(gulp.dest(__dirname+'/downloaded/'))
			.on('error', err => {
				expect(false).to.be.true;
				console.log('error '+err);
				done();
			})
			.on('end', () => {

				let example = fs.readFileSync(__dirname+'/example.com').toString();
				let page = fs.readFileSync(__dirname+'/downloaded/array-test.txt').toString();
				
				expect(example).to.equal(page);
				fs.unlinkSync(__dirname+'/downloaded/array-test.txt');
				done();
			});
	});


	it('example.com object', done => {

		console.log('testing');
		// remove file
		if(fs.existsSync(__dirname+'/downloaded/object-test.txt')) fs.unlinkSync(__dirname+'/downloaded/object-test.txt');

		download({'object-test.txt': 'http://example.com'}).pipe(gulp.dest(__dirname+'/downloaded/'))
			.on('error', err => {
				expect(false).to.be.true;
				console.log('error '+err);
				done();
			})
			.on('end', () => {

				let example = fs.readFileSync(__dirname+'/example.com').toString();
				let page = fs.readFileSync(__dirname+'/downloaded/object-test.txt').toString();
				expect(example).to.equal(page);

				fs.unlinkSync(__dirname+'/downloaded/object-test.txt');
				done();
			});
	});


});


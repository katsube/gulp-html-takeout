/*!
 * gulp-html-extract v0.0.1
 * Copyright 2017-, M.Katsube <katsubemakito@gmail.com>. MIT Lisence.
 */
var through     = require("through2");
var PluginError = require("gulp-util").PluginError;
var {JSDOM}     = require("jsdom");
var PLUGIN_NAME = "gulp-html-extract";

module.exports = function(opt=null) {	
	/**
	 * @this {Transform}
	 */
	var transform = function(file, encoding, callback) {
		if (file.isNull()) {
			return callback(null, file);
		}
		var selector = (opt===null)? "body":opt;


		//---------------------------------
		// not support streams
		//---------------------------------
		if (file.isStream()) {
			// ストリームはサポートしない
			this.emit('error', new PluginError(PLUGIN_NAME, "Sorry, Streams not supported."));
		}

		//---------------------------------
		// Do
		//---------------------------------
		if (file.isBuffer()) {
			var contents = String(file.contents);
			
			// extract
			const dom = new JSDOM(contents);
			contents  = dom.window.document.querySelector(selector).innerHTML;

			file.contents = new Buffer(contents);

			return callback(null, file);
		}
	
		this.push(file);
		callback();
	};

	return through.obj(transform);
};
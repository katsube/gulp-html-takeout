/*!
 * gulp-html-takeout v0.0.1
 * Copyright 2017-, M.Katsube <katsubemakito@gmail.com>. MIT Lisence.
 */
var through     = require("through2");
var PluginError = require("gulp-util").PluginError;
var {JSDOM}     = require("jsdom");
var PLUGIN_NAME = "gulp-html-takeout";

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
			this.emit('error', new PluginError(PLUGIN_NAME, "Sorry, Streams not supported."));
		}

		//---------------------------------
		// Do
		//---------------------------------
		if (file.isBuffer()) {
			var contents = String(file.contents);
			
			// extract
			const dom  = new JSDOM(contents);
			var   buff = dom.window.document.querySelectorAll(selector);
			var   ret  = '';
			buff.forEach(function(element) {
				ret  += element.innerHTML;
			}, this);

			file.contents = new Buffer(ret);

			return callback(null, file);
		}
	
		this.push(file);
		callback();
	};

	return through.obj(transform);
};
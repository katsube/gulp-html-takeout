var through     = require("through2");
var PluginError = require("gulp-util").PluginError;
var {JSDOM}     = require("jsdom");
var PLUGIN_NAME = "gulp-html-extract";

module.exports = function() {
	/**
	 * @this {Transform}
	 */
	var transform = function(file, encoding, callback) {
		if (file.isNull()) {
			// 何もしない
			return callback(null, file);
		}

		if (file.isStream()) {
			// ストリームはサポートしない
			this.emit('error', new PluginError(PLUGIN_NAME, "Sorry, Streams not supported."));
		}

		// プラグインの処理本体
		if (file.isBuffer()) {
			// ファイルの内容をcontentsに読み込み
			var contents = String(file.contents);

			// 同じ内容を繰り返す(サンプル)
			const dom = new JSDOM(contents);
			contents  = dom.window.document.querySelector("body").innerHTML;
			console.log(contents + "---");

			// 編集した内容を出力
			file.contents = new Buffer(contents);

			// 処理の完了を通知
			return callback(null, file);
		}
	
		this.push(file);
		callback();
	};

	return through.obj(transform);
};
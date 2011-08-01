var StatAssistant = function() {
}

StatAssistant.prototype.run = function(future) {
	var fs = IMPORTS.require("fs");
	
	var path = this.controller.args.path;
	
	fs.stat(path, function(err, stats) { future.result = { path: path, isFile: stats.isFile(), isDirectory: stats.isDirectory() }; });
}
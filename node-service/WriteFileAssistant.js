var WriteFileAssistant = function() {
}

WriteFileAssistant.prototype.run = function(future) {
	var fs = IMPORTS.require("fs");
	
	var path = this.controller.args.path
	var content = this.controller.args.content
	
	fs.writeFile(path, content, 'binary', function(err) { future.result = { path: path, bytes: content.length, error: err }; });
}
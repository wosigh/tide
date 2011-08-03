var ReadDirAssistant = function() {
}

ReadDirAssistant.prototype.run = function() {
	var fs = IMPORTS.require("fs");
	var path = this.controller.args.path;
	return fs.readdirSync(path);
}
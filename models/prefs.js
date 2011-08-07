function Prefs() {
	
	this.defaults = {
		
		theme: 'cobalt',
		mode: 'python',
		fontSize: '12px',
		tabSize: '4',
		defaultPath: '/media/internal',
		useSoftTabs: true,
		showInvisibles: true,//
		showPrintMargin: true,
		useWordWrap: true,
		highlightActiveLine: true,
		showGutter: true,
		
	}
	
	for (key in this.defaults)
		if (this.get(key)==null)
			this.set(key, this.defaults[key])
	
}

Prefs.prototype.set = function(key, value) {
	localStorage.setItem(key, JSON.stringify(value))
}

Prefs.prototype.get = function(key) {
	return JSON.parse(localStorage.getItem(key))
}

Prefs.prototype.clear = function() {
	localStorage.clear()
}
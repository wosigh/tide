enyo.kind({
	
  	name: "Editah.Editor",
  	kind: enyo.Control,
  	
	editor: null,
  	
  	components: [
  		{kind: enyo.Control, allowHtml: true, name: 'editor'}
  	],
	
	rendered: function() {
		this.editor = ace.edit(this.$.editor.getId())
		var PythonMode = require("ace/mode/python").Mode
		this.editor.getSession().setMode(new PythonMode())
		this.editor.setShowPrintMargin(true)
	},
	
	setTheme: function(theme) {
		this.editor.setTheme('ace/theme/'+theme)
	},
	
	setValue: function(value) {
		this.editor.getSession().setValue(value)
	},
	
	setFontSize: function(size) {
		this.editor.setFontSize(size)
	},
	
	setTabSize: function(size) {
		this.editor.getSession().setTabSize(size)
	},
	
	resizeRenderer: function() {
		this.editor.resize()
	},
	
	refresh: function(width,height,fontSize) {
		this.$.editor.applyStyle('width',width)
		this.$.editor.applyStyle('height',height)
		this.setFontSize(fontSize)
	},
	
	undo: function() {
		this.editor.undo()
	},
	
	redo: function() {
		this.editor.redo()
	}
})

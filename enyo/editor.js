enyo.kind({
	
  	name: "Editah.Editor",
  	kind: enyo.Control,
  	
	editor: null,
  	
  	components: [
  		{kind: enyo.Control, allowHtml: true, name: 'editor', style: 'width: 100%; height: 100%;'}
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
		this.warn('Tab size:'+size)
		this.editor.getSession().setTabSize(size)
	}
	
})

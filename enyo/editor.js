enyo.kind({
	
  	name: "Editah.Editor",
  	kind: enyo.Control,
  	
	editor: null,
  	
  	components: [
  		{kind: enyo.Control, allowHtml: true, name: 'editor'}
  	],
	
	rendered: function() {
		this.editor = ace.edit(this.$.editor.getId())
		var text = require("ace/mode/text").Mode
		var c_cpp = require("ace/mode/c_cpp").Mode
		var clojure = require("ace/mode/clojure").Mode
		var coffee = require("ace/mode/coffee").Mode
		var csharp = require("ace/mode/csharp").Mode
		var css = require("ace/mode/css").Mode
		var html = require("ace/mode/html").Mode
		var java = require("ace/mode/java").Mode
		var javascript = require("ace/mode/javascript").Mode
		var json = require("ace/mode/json").Mode
		var perl = require("ace/mode/perl").Mode
		var php = require("ace/mode/php").Mode
		var python = require("ace/mode/python").Mode
		var ruby = require("ace/mode/ruby").Mode
		var scss = require("ace/mode/scss").Mode
		var svg = require("ace/mode/svg").Mode
		var xml = require("ace/mode/xml").Mode
		this.modes = {
			'text': new text(),
			'c_cpp': new c_cpp(),
			'clojure': new clojure(),
			'coffee': new coffee(),
			'csharp': new csharp(),
			'css': new css(),
			'html': new html(),
			'java': new java(),
			'javascript': new javascript(),
			'json': new json(),
			'perl': new perl(),
			'php': new php(),
			'python': new python(),
			'ruby': new ruby(),
			'scss': new scss(),
			'svg': new svg(),
			'xml': new xml()
		}
		
	},
	
	showInvisibled: function(value) {
		this.editor.setShowInvisibles(value)
	},
	
	showPrintMargin: function(value) {
		this.editor.setShowPrintMargin(value)
	},
	
	useWordWrap: function(value) {
		this.editor.getSession().setUseWrapMode(value)
	},
	
	highlightActiveLine: function(value) {
		this.editor.setHighlightActiveLine(value)
	},
	
	setTheme: function(theme) {
		this.editor.setTheme('ace/theme/'+theme)
	},
	
	getValue: function() {
		return this.editor.getSession().getValue()
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
	
	useSoftTabs: function(value) {
		this.editor.getSession().setUseSoftTabs(value);
	},
	
	setMode: function(mode) {
		this.editor.getSession().setMode(this.modes[mode])
	},
	
	resizeRenderer: function() {
		this.editor.resize()
	},
	
	refresh: function(width,height,fontSize) {
		this.$.editor.applyStyle('width',width)
		this.$.editor.applyStyle('height',height)
		this.setFontSize(fontSize)
		if (enyo.keyboard.isShowing())
			this.editor.centerSelection()
	},
	
	undo: function() {
		this.editor.undo()
	},
	
	redo: function() {
		this.editor.redo()
	}
})

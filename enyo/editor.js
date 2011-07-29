enyo.kind({
	
  	name: "Editah.Editor",
  	kind: enyo.Control,
  	
	editor: null,
  	
  	components: [
  		{kind: enyo.Control, allowHtml: true, name: 'editor', style: 'width: 100%; height: 100%; font-size: 18px'}
  	],
	
	rendered: function() {
		this.editor = ace.edit(this.$.editor.getId())
		var JavaScriptMode = require("ace/mode/javascript").Mode
		this.editor.getSession().setMode(new JavaScriptMode())
		this.editor.setShowPrintMargin(true)
	}
	
})

enyo.kind({
	name: "TideToolButton", 
	kind: enyo.IconButton,
	// do not style this as a button
	className: "tide-tool-button",
	captionedClassName: "tide-tool-button-captioned",
	chrome: [
		{name: "client", className: "tide-tool-button-client"}
	],
	captionChanged: function() {
		this.inherited(arguments);
		this.$.client.addRemoveClass(this.captionedClassName, this.caption);
	},
	setState: function(inState, inValue) {
		this.$.client.addRemoveClass(this.cssNamespace + "-" + inState, Boolean(inValue));
	}
});
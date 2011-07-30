enyo.kind({
	name: "VSlider",
	kind: enyo.ProgressBar,
	className: "enyo-vslider",
	published: {
		/** Controls whether position may be set by tapping
		an arbitrary position on the bar.  If false, position may only be set by dragging the knob. */
		tapPosition: true
	},
	events: {
		onChange: "",
		onChanging: ""
	},
	chrome: [
		{name: "animator", kind: enyo.Animator, onBegin: "beginAnimation", onAnimate: "stepAnimation", onEnd: "endAnimation", onStop: "stopAnimation"},
		// FIXME: this node exists so our entire height can encompass the margin used for centering this div
		{className: "enyo-vslider-progress", components: [
			{name: "bar", className: "enyo-vslider-inner", components: [
				// NOTE: using a toggle so that mouseout doesn't abort down state
				// manually setting down/up when dragging and on mouseup.
				{name: "button", kind: "CustomButton", caption: " ", toggle: true, allowDrag: true, className: "enyo-vslider-button"}
			]}
		]},
		{name: "client"}
	],
	//* @protected
	positionChanged: function(inOldPosition) {
		// disallow position changes not a result of dragging while control is dragging
		if (this.handlingDrag && !this.dragChange) {
			this.position = inOldPosition;
		} else {
			this.inherited(arguments);
		}
	},
	renderPosition: function(inPercent) {
		this.$.button.applyStyle("top",  inPercent + "%");
	},
	renderPositionDirect: function(inDomStyle, inPercent) {
		inDomStyle.top = inPercent + "%";
	},
	canAnimate: function() {
		return this.$.button.hasNode();
	},
	beginAnimation: function(inSender, inStart, inEnd) {
		this.$.button.domStyles.top = inEnd + "%";
		if (this.$.button.hasNode()) {
			inSender.setNode(this.$.button.node);
			inSender.style = this.$.button.node.style;
		}
		this.doBeginAnimation();
	},
	calcHeight: function() {
		var n = this.$.bar.hasNode();
		return n.offsetHeight;
	},
	calcEventPosition: function(inY) {
		var o = this.$.bar.getOffset();
		var y = inY - o.top;
		this.log(inY, o.top, y / this.calcHeight())
		return (y / this.calcHeight()) * (this.maximum - this.minimum) + this.minimum;
	},
	// drag processing
	dragstartHandler: function(inSender, inEvent) {
		this.handlingDrag = true;
		this._height = this.calcHeight();
		this.$.button.setDown(true);
		return true;
	},
	dragHandler: function(inSender, inEvent) {
		if (this.handlingDrag) {
			var p = this.calcEventPosition(inEvent.pageY);
			this.error(p)
			this.dragChange = true;
			this.setPositionImmediate(p);
			this.dragChange = false;
			this.doChanging(this.position);
		}
	},
	dragfinishHandler: function(inSender, inEvent) {
		if (this.handlingDrag) {
			this.toggleButtonUp();
			this.doChange(this.position);
			this.handlingDrag = false;
			inEvent.preventClick();
		}
	},
	//
	completeAnimation: function(inSender, inValue) {
		this.inherited(arguments);
		if (this._clicked) {
			this._clicked = false;
			inSender.setNode(null);
			this.doChange(this.position);
		}
	},
	clickHandler: function(inSender, e) {
		if (this.tapPosition && (e.dispatchTarget != this.$.button)) {
			this.$.animator.stop();
			var p = this.calcEventPosition(e.pageY);
			this._clicked = true;
			this.setPosition(p);
			if (!this.animatePosition) {
				this.doChange(this.position);
			}
		}
	},
	mouseupHandler: function() {
		this.toggleButtonUp();
	},
	toggleButtonUp: function() {
		this.$.button.setDown(false);
	}
});
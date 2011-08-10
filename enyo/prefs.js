enyo.kind({
			
	kind: 'Popup2',
	name: 'Preferences',
	scrim: true,
	modal: true,
	autoClose: false,
	dismissWithClick: false,
	width: "680px",
	align: 'center',
		
	published: {
		prefs: null,
		hasBitstream: false,
		hasDejaVu: false,
		hasLiberation: false,
		hasDroid: false
	},
	
	fontsLoaded: false,
	
	events: {
		onClose: ''
	},
	
	components: [
		{
			layoutKind: "HFlexLayout",
			pack: "center",
			style: 'padding-bottom: 20px;',
			components: [
				{kind: "RadioGroup", name: "myGroup", onclick: "myGroupClick", value: 'appearance',
		      		components: [
		          		{caption: "Appearance", value: "appearance", width: '120px'},
		          		{caption: "Paths", value: "paths", width: '100px'},
					]
		  		}
			]
		},
		{
			layoutKind: "HFlexLayout",
			pack: "center",
			className: "enyo-modaldialog-container",
			style: 'padding: 8px;',
			name: 'paths',
			components: [
				{kind: "Group", caption: "Default Path", flex: 1, components: [
          			{kind: "Input", name: 'defaultPath', alwaysLooksFocused: true, flex: 1},
      			]}
			]
		},
		{
			layoutKind: "HFlexLayout",
			pack: "center",
			className: "enyo-modaldialog-container",
			style: 'padding: 8px;',
			name: 'appearance',
			components: [
				{
					kind: "RowGroup", flex: 1, components: [
		      			{kind: "HFlexBox", align: "center", height: "32px", components: [
		      				{content: "Theme", flex: 1},
		      				{
						  		kind: "ListSelector",
						  		name: 'themePicker',
						  		value: 'textmate',
						  		items: [
						  			{caption: 'Clouds Midnight', value: 'clouds_midnight'},
									{caption: 'Clouds', value: 'clouds'},
									{caption: 'Cobalt', value: 'cobalt'},
									{caption: 'Crimson Editor', value: 'crimson_editor'},
									{caption: 'Dawn', value: 'dawn'},
									{caption: 'Eclipse', value: 'eclipse'},
									{caption: 'idleFingers', value: 'idle_fingers'},
									{caption: 'krTheme', value: 'kr_theme'},
									{caption: 'Merbivore Soft', value: 'merbivore_soft'},
									{caption: 'Merbivore', value: 'merbivore'},
									{caption: 'Mono Industrial', value: 'mono_industrial'},
									{caption: 'Monokai', value: 'monokai'},
									{caption: 'Pastel on dark', value: 'pastel_on_dark'},
									{caption: 'TextMate', value: 'textmate'},
									{caption: 'Twilight', value: 'twilight'},
									{caption: 'Vibrant Ink', value: 'vibrant_ink'}
						  		]
							}
		      			]},
		      			{kind: "HFlexBox", align: "center", height: "32px", components: [
		          			{content: "Font Size", flex: 1},
		          			{
						  		kind: "ListSelector",
						  		name: 'fontSizePicker',
						  		value: '12px',
						  		items: ['12px','14px','16px','18px','20px','22px','24px'],
						  		onChange: "changeFontSize"
							}
		      			]},
		      			{kind: "HFlexBox", align: "center", height: "32px", components: [
		          			{content: "Tab Size", flex: 1},
		          			{
						  		kind: "ListSelector",
						  		name: 'tabSizePicker',
						  		value: '4',
						  		items: ['1','2','3','4','5','6','7','8'],
						  		onChange: "changeTabSize"
							}
		      			]},
		      			{kind: "HFlexBox", align: "center", height: "32px", components: [
		          			{content: "Soft Tabs", flex: 1},
		          			{kind: "CheckBox", name: 'useSoftTabs'}
		      			]},
		      			{kind: "HFlexBox", align: "center", height: "32px", components: [
		      				{content: "Font", flex: 1},
			      			{
						  		kind: "ListSelector",
						  		name: 'editorFont',
						  		value: '"Lucida Console"',
						  		items: [
						  			{caption: 'Lucida Console', value: '"Lucida Console"'},
									{caption: 'Menlo', value: '"Menlo"'},
									{caption: 'Courier New', value: '"Courier New"'}
						  		]
							}
						]}
		  			]
				},
				{
					kind: "RowGroup", flex: 1, components: [
		      			{kind: "HFlexBox", align: "center", height: "32px", components: [
		          			{content: "Show Invisibles", flex: 1},
		          			{kind: "CheckBox", name: 'showInvisibles'}
		      			]},
		      			{kind: "HFlexBox", align: "center", height: "32px", components: [
		          			{content: "Show Print Margin", flex: 1},
		          			{kind: "CheckBox", name: 'showPrintMargin'}
		      			]},
		      			{kind: "HFlexBox", align: "center", height: "32px", components: [
		          			{content: "Word Wrap", flex: 1},
		          			{kind: "CheckBox", name: 'useWordWrap'}
		      			]},
		      			{kind: "HFlexBox", align: "center", height: "32px", components: [
		          			{content: "Highlight Active Line", flex: 1},
		          			{kind: "CheckBox", name: 'highlightActiveLine'}
		      			]},
		      			{kind: "HFlexBox", align: "center", height: "32px", components: [
		          			{content: "Show Gutter", flex: 1},
		          			{kind: "CheckBox", name: 'showGutter'}
		      			]}
		  			]
				}
			]
		},
		{flex:1},
  		{
  			layoutKind: "HFlexLayout",
  			pack: "center",
  			components: [
  				{kind: 'Spacer'},
      			{
      				kind: "Button",
      				caption: "Close",
      				flex: 1,
      				onclick: "closePrefs"
  				},
  				{kind: 'Spacer'}
  			]
		}
	],
	
	myGroupClick: function(inSender, inEvent) {
		var grp = inSender.getValue()
		if (grp == 'appearance') {
			this.$.appearance.setShowing(true)
			this.$.paths.setShowing(false)
		} else if (grp == 'paths') {
			this.$.paths.setShowing(true)
			this.$.appearance.setShowing(false)
		}
	},
	
	loadFonts: function() {
		if (this.hasBitstream)
			this.$.editorFont.items.push({caption: 'Bitstream Vera Sans Mono', value: '"Bitstream Vera Sans Mono"'})
		if (this.hasDejaVu)
			this.$.editorFont.items.push({caption: 'DejaVu Sans Mono', value: '"DejaVu Sans Mono"'})
		if (this.hasLiberation)
			this.$.editorFont.items.push({caption: 'Liberation Mono', value: '"Liberation Mono"'})
		if (this.hasDroid)
			this.$.editorFont.items.push({caption: 'Droid Sans Mono', value: '"Droid Sans Mono"'})
		this.fontsLoaded = true
	},
	
	rendered: function() {
		if (!this.fontsLoaded)
			this.loadFonts()
		this.$.myGroup.setValue('appearance')
		this.$.paths.setShowing(false)
		this.$.themePicker.setValue(this.prefs.get('theme'))
		this.$.fontSizePicker.setValue(this.prefs.get('fontSize'))
		this.$.tabSizePicker.setValue(this.prefs.get('tabSize'))
		this.$.useSoftTabs.setChecked(this.prefs.get('useSoftTabs'))
		this.$.showInvisibles.setChecked(this.prefs.get('showInvisibles'))
		this.$.showPrintMargin.setChecked(this.prefs.get('showPrintMargin'))
		this.$.useWordWrap.setChecked(this.prefs.get('useWordWrap'))
		this.$.highlightActiveLine.setChecked(this.prefs.get('highlightActiveLine'))
		this.$.showGutter.setChecked(this.prefs.get('showGutter'))
		this.$.defaultPath.setValue(this.prefs.get('defaultPath'))
		this.$.editorFont.setValue(this.prefs.get('editorFont'))
	},
	
	closePrefs: function(inSender, inEvent) {
		this.prefs.set('theme', this.$.themePicker.value)
		this.prefs.set('fontSize', this.$.fontSizePicker.value)
		this.prefs.set('tabSize', this.$.tabSizePicker.value)
		this.prefs.set('useSoftTabs', this.$.useSoftTabs.checked)
		this.prefs.set('showInvisibles', this.$.showInvisibles.checked)
		this.prefs.set('showPrintMargin', this.$.showPrintMargin.checked)
		this.prefs.set('useWordWrap', this.$.useWordWrap.checked)
		this.prefs.set('highlightActiveLine', this.$.highlightActiveLine.checked)
		this.prefs.set('showGutter', this.$.showGutter.checked)
		this.prefs.set('defaultPath',this.$.defaultPath.value)
		this.prefs.set('editorFont',this.$.editorFont.value)
		this.doClose()
		this.close()
	},

})
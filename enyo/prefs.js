enyo.kind({
			
	kind: 'Popup2',
	name: 'Preferences',
	scrim: true,
	modal: true,
	autoClose: false,
	dismissWithClick: false,
		
	published: {
		prefs: null
	},
	
	components: [
		{
			layoutKind: "HFlexLayout",
			pack: "center",
			style: 'padding-bottom: 20px;',
			components: [
				{kind: "RadioGroup", name: "myGroup", onclick: "myGroupClick", value: 'appearance',
		      		components: [
		          		{caption: "Appearance", value: "appearance"},
		          		//{caption: "KeyBindings", value: "keybindings"},
					]
		  		}
			]
		},
		{
			layoutKind: "HFlexLayout",
			pack: "center",
			className: "enyo-modaldialog-container",
			style: 'padding: 8px;',
			components: [
				{
					kind: "RowGroup", width: "250px", components: [
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
						  		],
						  		onChange: "changeTheme"
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
		      			]}
		  			]
				},
				{
					kind: "RowGroup", width: "250px", components: [
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
		      			]}
		  			]
				}
			]
		},
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
	
	rendered: function() {
		//this.$.libraryPath.setValue(this.prefs.get('libraryPath'))
		//this.$.syncOnLaunch.setChecked(this.prefs.get('syncOnLaunch'))
	},
	
	closePrefs: function(inSender, inEvent) {
		//this.prefs.set('libraryPath', this.$.libraryPath.value)
		//this.prefs.set('syncOnLaunch', this.$.syncOnLaunch.checked)
		this.close()
	},

})
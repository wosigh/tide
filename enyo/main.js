enyo.kind({
	
  	name: "Editah.Main",
  	kind: enyo.VFlexBox,
  	
  	prefs: new Prefs(),
  	
  	components: [
		{
			kind: 'Toolbar',
			name: 'toolbar',
			className: 'enyo-toolbar-light',
			style: 'height: 48px;',
			components: [
				{flex:1},
				{
			  		kind: "Picker",
			  		name: 'tabSizePicker',
			  		value: '4',
			  		items: ['1','2','3','4','5','6','7','8'],
			  		onChange: "changeTabSize"
				},
				{
			  		kind: "Picker",
			  		name: 'fontSizePicker',
			  		value: '12px',
			  		items: ['12px','14px','16px','18px','20px','22px','24px'],
			  		onChange: "changeFontSize"
				},
				{
			  		kind: "Picker",
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
			]
		},
		{
			kind: 'Editah.Editor', name: 'editor', flex: 1
		}
  	],
  	
  	changeTabSize: function(inSender, inValue) {
  		this.$.editor.setTabSize(parseInt(inValue))
  		this.prefs.set('tabSize',inValue)
  	},
  	
  	changeFontSize: function(inSender, inValue) {
  		this.$.editor.setFontSize(inValue)
  		this.prefs.set('fontSize',inValue)
  	},
  	
  	changeTheme: function(inSender, inValue) {
  		this.$.editor.setTheme(inValue)
  		this.prefs.set('theme',inValue)
  	},
  	
  	resizeHandler: function() {
  		this.$.editor.refresh(
  			(window.innerWidth)+'px',
  			(window.innerHeight-48)+'px',
  			this.prefs.get('fontSize')
		)
  		this.$.editor.resizeRenderer()
  	},
  	
  	rendered: function() {
		this.inherited(arguments)
		enyo.setFullScreen(true)
		enyo.keyboard.setResizesWindow(true)
		this.$.editor.setTheme(this.prefs.get('theme'))
		this.$.themePicker.setValue(this.prefs.get('theme'))
		this.$.editor.setFontSize(this.prefs.get('fontSize'))
		this.$.editor.resizeRenderer()
		this.$.fontSizePicker.setValue(this.prefs.get('fontSize'))
		this.$.editor.setTabSize(parseInt(this.prefs.get('tabSize')))
		this.$.tabSizePicker.setValue(this.prefs.get('tabSize'))
		window.addEventListener('resize', enyo.bind(this, 'resizeHandler'), false)
		this.$.editor.setValue("\#!/usr/local/bin/python\n\nimport string, sys\n\n\
# If no arguments were given, print a helpful message\n\
if len(sys.argv)==1:\n\tprint 'Usage: celsius temp1 temp2 ...'\n\
\tsys.exit(0)\n\n# Loop over the arguments\nfor i in sys.argv[1:]:\n\
\ttry:\n\t\tfahrenheit=float(string.atoi(i))\n\texcept string.atoi_error:\n\
\t\tprint repr(i), 'not a numeric value'\n\telse:\n\t\tcelsius=(fahrenheit-32)*5.0/9.0\n\
\t\tprint '%i\260F = %i\260C' % (int(fahrenheit), int(celsius+.5))\n")
  	}
  	
})

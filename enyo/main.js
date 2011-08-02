enyo.kind({
	
  	name: "Editah.Main",
  	kind: enyo.VFlexBox,
  	
  	prefs: new Prefs(),
  	
  	components: [
  		{ name: 'readfile', kind: 'PalmService',
	      service: 'palm://us.ryanhope.tide.fileio/', method: 'readfile',
	      onResponse: 'readfile' },
		{
			kind: 'Toolbar',
			name: 'toolbar',
			showing: true,
			className: 'enyo-toolbar-light',
			components: [
				{icon: 'images/cog.png', onclick: "preferences"},
				{width: '16px'},
				{icon: 'images/new.png'},
				{icon: 'images/open.png', onclick: "openDialog"},
				{icon: 'images/save.png', onclick: "saveDialog"},
				{width: '16px'},
	      		{icon: 'images/undo.png', onclick: 'undo'},
	      		{icon: 'images/redo.png', onclick: 'redo'},
	      		//{width: '16px'},
	      		//{icon: 'images/search.png', onclick: 'toggleSearch'},
				{flex:1},
				
				{
			  		kind: "ListSelector",
			  		name: 'modePicker',
			  		value: 'python',
			  		items: [
			  			{caption: 'Plain Text', value: 'text'},
			  			{caption: 'C/C++', value: 'c_cpp'},
			  			{caption: 'Clojure', value: 'clojure'},
			  			{caption: 'CoffeeScript', value: 'coffee'},
			  			{caption: 'C#', value: 'csharp'},
			  			{caption: 'CSS', value: 'css'},
			  			{caption: 'HTML', value: 'html'},
			  			{caption: 'Java', value: 'java'},
			  			{caption: 'JavaScript', value: 'javascript'},
			  			{caption: 'JSON', value: 'json'},
			  			{caption: 'Perl', value: 'perl'},
			  			{caption: 'PHP', value: 'php'},
			  			{caption: 'Python', value: 'python'},
			  			{caption: 'Ruby', value: 'ruby'},
			  			{caption: 'SCSS', value: 'scss'},
			  			{caption: 'SVG', value: 'svg'},
			  			{caption: 'XML', value: 'xml'}
			  		],
			  		onChange: "changeMode"
				}
			]
		},
		{
			kind: 'Editah.Editor', name: 'editor', flex: 1
		},
		{
			kind: 'Toolbar',
			name: 'searchbar',
			showing: false,
			className: 'enyo-toolbar-light',
			components: [
				{kind: 'Input', alwaysLooksFocused: true, hint: $L('Find'), flex: 1},
				{caption: 'Find'},
				{kind: 'Input', alwaysLooksFocused: true, hint: $L('Replace'), flex: 1},
				{caption: 'Replace'},
				{caption: 'Replace All'},
			]
		}
  	],
  	
  	initComponents: function() {
  		this.inherited(arguments)
  		this.createComponent({
			kind: 'Preferences',
			name: 'preferences',
			prefs: this.prefs,
			onClose: 'refresh'
		})
		this.createComponent({
			kind: 'FileDialog',
			name: 'filedialog',
			prefs: this.prefs,
			onFileOpen: 'handleOpen',
			onFileSave: 'handleSave'
		})
  	},
  	
  	openDialog: function() {
  		this.$.filedialog.display('open')
  	},
  	
  	saveDialog: function() {
  		this.$.filedialog.display('save')
  	},
  	
  	toggleSearch: function() {
  		this.$.searchbar.setShowing(!this.$.searchbar.showing)
  	},
  	
  	preferences: function() {
		this.$.preferences.openAtTopCenter()
	},
  	
  	undo: function() {
		this.$.editor.undo()
  	},
  	
  	redo: function() {
  		this.$.editor.redo()
  	},
  	
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
  	
  	changeMode: function(inSender, inValue) {
  		this.$.editor.setMode(inValue)
  		this.prefs.set('mode',inValue)
  	},
  	
  	resizeHandler: function() {
  		this.$.editor.refresh(
  			window.innerWidth+'px',
  			(window.innerHeight-54)+'px',
  			this.prefs.get('fontSize')
		)
  		this.$.editor.resizeRenderer()
  	},
  	
  	refresh: function() {
  		this.$.editor.setTheme(this.prefs.get('theme'))
  		this.$.editor.setFontSize(this.prefs.get('fontSize'))
  		this.$.editor.setTabSize(parseInt(this.prefs.get('tabSize')))
  		this.$.editor.showInvisibled(this.prefs.get('showInvisibles'))
  		this.$.editor.showPrintMargin(this.prefs.get('showPrintMargin'))
  		this.$.editor.highlightActiveLine(this.prefs.get('highlightActiveLine'))
  		this.$.editor.useWordWrap(this.prefs.get('useWordWrap'))
  		this.$.editor.useSoftTabs(this.prefs.get('useSoftTabs'))
  		
  		this.$.editor.setMode(this.prefs.get('mode'))
		this.$.modePicker.setValue(this.prefs.get('mode'))
  	},
  	
  	handleSave: function(inSender, file) {
  	},
  	
  	handleOpen: function(inSender, file) {
  		this.warn(file)
		this.$.readfile.call({ 'path': file })
		this.resizeHandler()
  	},
  	
  	readfile: function(inSender, inResponse, inRequest) {
  		this.warn(inResponse)
  		this.$.editor.setValue(inResponse.content)
  	},
  	
  	rendered: function() {
		this.inherited(arguments)
		enyo.setFullScreen(true)
		enyo.keyboard.setResizesWindow(true)
		this.refresh()
		this.$.editor.resizeRenderer()
		window.addEventListener('resize', enyo.bind(this, 'resizeHandler'), false)
		this.showDemoDoc(this.prefs.get('mode'))
  	}
  	
})

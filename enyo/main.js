enyo.kind({
	
  	name: "Editah.Main",
  	kind: enyo.VFlexBox,
  	
  	prefs: new Prefs(),
  	currentFile: '',
  	
  	components: [
  		{ name: 'readfile', kind: 'PalmService',
	      service: 'palm://us.ryanhope.tide.fileio/', method: 'readfile',
	      onResponse: 'readfile' },
      	{ name: 'writefile', kind: 'PalmService',
	      service: 'palm://us.ryanhope.tide.fileio/', method: 'writefile',
	      onResponse: 'writefile' },
		{
			kind: 'Toolbar',
			name: 'toolbar',
			showing: true,
			className: 'enyo-toolbar-light',
			components: [
				{icon: 'images/cog.png', onclick: "preferences"},
				{width: '16px'},
				{icon: 'images/new.png', onclick: "newDoc"},
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
			  			{caption: 'Groovy', value: 'groovy'},
			  			{caption: 'HTML', value: 'html'},
			  			{caption: 'Java', value: 'java'},
			  			{caption: 'JavaScript', value: 'javascript'},
			  			{caption: 'JSON', value: 'json'},
			  			{caption: 'OCaml', value: 'ocaml'},
			  			{caption: 'Perl', value: 'perl'},
			  			{caption: 'PHP', value: 'php'},
			  			{caption: 'Python', value: 'python'},
			  			{caption: 'SCAD', value: 'scad'},
			  			{caption: 'Scala', value: 'scala'},
			  			{caption: 'Ruby', value: 'ruby'},
			  			{caption: 'SCSS', value: 'scss'},
			  			{caption: 'SVG', value: 'svg'},
			  			{caption: 'XML', value: 'xml'}
			  		],
			  		onChange: "changeMode"
				}
			]
		},
		{kind: enyo.HFlexBox, components: [
			{
				kind: 'Editah.Editor', name: 'editor', flex: 1
			},
			{
				kind: 'VSlider', name: 'slider', width: '28px', onChanging: 'sliderChange'
			}
		]},
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
  	
  	sliderChange: function(inSender, percent) {
  		this.$.editor.scrollByPercent(percent/100)
  	},
  	
  	setModeByExtension: function(filename) {
  		var mode = "text";
        if (/^.*\.js$/i.test(filename)) {
            mode = "javascript";
        } else if (/^.*\.xml$/i.test(filename)) {
            mode = "xml";
        } else if (/^.*\.html$/i.test(filename)) {
            mode = "html";
        } else if (/^.*\.css$/i.test(filename)) {
            mode = "css";
        } else if (/^.*\.scss$/i.test(filename)) {
            mode = "scss";
        } else if (/^.*\.py$/i.test(filename)) {
            mode = "python";
        } else if (/^.*\.php$/i.test(filename)) {
            mode = "php";
        } else if (/^.*\.cs$/i.test(filename)) {
            mode = "csharp";
        } else if (/^.*\.java$/i.test(filename)) {
            mode = "java";
        } else if (/^.*\.rb$/i.test(filename)) {
            mode = "ruby";
        } else if (/^.*\.(c|cpp|h|hpp|cxx)$/i.test(filename)) {
            mode = "c_cpp";
        } else if (/^.*\.coffee$/i.test(filename)) {
            mode = "coffee";
        } else if (/^.*\.json$/i.test(filename)) {
            mode = "json";
        } else if (/^.*\.(pl|pm)$/i.test(filename)) {
            mode = "perl";
        }  else if (/^.*\.(ml|mli)$/i.test(filename)) {
            mode = "ocaml";
        } else if (/^.*\.(groovy)$/i.test(filename)) {
            mode = "groovy";
        } else if (/^.*\.(scala)$/i.test(filename)) {
            mode = "scala";
        } else if (/^.*\.(scad)$/i.test(filename)) {
            mode = "scad";
        }
        this.changeMode(null,mode)
  	},
  	
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

  	newDoc: function() {
  		this.$.editor.setValue('')
  	},
  	
  	openDialog: function() {
  		this.$.filedialog.display('open','')
  	},
  	
  	saveDialog: function() {
  		this.$.filedialog.display('save',this.currentFile)
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
  		this.$.modePicker.setValue(this.prefs.get('mode'))
  	},
  	
  	resizeListener: function() {
  		this.$.slider.$.progress.applyStyle('height', (window.innerHeight-89)+'px')
  		this.$.editor.refresh(
  			(window.innerWidth-28)+'px',
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
  		this.$.editor.showGutter(this.prefs.get('showGutter'))
  		
  		this.$.editor.setMode(this.prefs.get('mode'))
		this.$.modePicker.setValue(this.prefs.get('mode'))
  	},
  	
  	handleSave: function(inSender, file) {
  		this.$.writefile.call({ 'path': file, 'content': this.$.editor.getValue()})
  	},
  	
  	handleOpen: function(inSender, file) {
		this.$.readfile.call({ 'path': file })
		this.resizeListener()
  	},
  	
  	writefile: function(inSender, inResponse, inRequest) {
  		this.warn(inResponse)
  	},
  	
  	readfile: function(inSender, inResponse, inRequest) {
  		this.currentFile = inResponse.path
  		this.setModeByExtension(inResponse.path)
  		this.$.editor.setValue(inResponse.content)
  	},
  	
  	rendered: function() {
		this.inherited(arguments)
		enyo.setFullScreen(true)
		enyo.keyboard.setResizesWindow(true)
		this.refresh()
		this.resizeListener()
		window.addEventListener('resize', enyo.bind(this, 'resizeListener'), false)
		this.$.readfile.call({ 'path': 'TIDE.txt' })
  	}
  	
})

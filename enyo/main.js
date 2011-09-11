enyo.kind({
	
  	name: "Editah.Main",
  	kind: enyo.VFlexBox,
  	
  	prefs: new Prefs(),
  	currentFile: '',
  	currentSearchTerm: null,
  	currentSearchOptions: null,
  	
  	components: [
  		{kind: 'Scrim', name: 'mainScrim', showing: true, components:[
  			{layoutKind: "VFlexLayout", height: '100%', width: '100%', pack: 'center', align: 'center', components: [
  				{kind: 'SpinnerLarge', showing: true}
  			]}
  		]},
  		{
			kind: 'Popup2',
			name: 'search', 
			scrim: false,
			modal: false,
			autoClose: true,
			dismissWithClick: false,
			width: "540px",
			components: [
				{
					layoutKind: "HFlexLayout",
					pack: "center",
					style: 'padding: 8px;',
					components: [
						{
							components: [
								{kind: "Group", caption: "Search for:", components: [
									{
										kind: 'Input',
										name: 'searchText', 
										style: 'min-width: 300px;', 
										spellcheck: false, 
										autocorrect: false,
										autoCapitalize: 'lowercase',
										changeOnInput: true,
										alwaysLooksFocused: true,
										hint: $L(''),
										onchange: 'stChange'
									},
								]},
								{kind: "Group", caption: "Replace with:", components: [
									{
										kind: 'Input',
										name: 'replaceText',
										style: 'min-width: 300px;',
										spellcheck: false, 
										autocorrect: false,
										autoCapitalize: 'lowercase',
										changeOnInput: true,
										alwaysLooksFocused: true,
										hint: $L(''),
										onchange: 'stChange'
									},
								]}
							]
						},
						{
							flex: 1, layoutKind: "VFlexLayout", align: "end", components: [
								{kind: "HFlexBox", align: "center", components: [
									{content: 'Wrap'},
									{kind: "CheckBox", name: 'searchWrap', style: 'margin-left: 8px', checked: true},
								]},
								{kind: "HFlexBox", align: "center", components: [
									{content: 'Backwards'},
									{kind: "CheckBox", name: 'searchBackwards', style: 'margin-left: 8px'},
								]},
								{kind: "HFlexBox", align: "center", components: [
									{content: 'Case Sensitive', style: 'padding-right: 4px'},
									{kind: "CheckBox", name: 'searchCaseSensitive', style: 'margin-left: 8px'},
								]},
								{kind: "HFlexBox", align: "center", components: [
									{content: 'Whole Word'},
									{kind: "CheckBox", name: 'searchWholeWord', style: 'margin-left: 8px'},
								]},
								{kind: "HFlexBox", align: "center", components: [
									{content: 'RegExp'},
									{kind: "CheckBox", name: 'searchRegExp', style: 'margin-left: 8px'},
								]}
							]
						},
					]
				},
				{
					layoutKind: "HFlexLayout",
					pack: "center",
					components: [
						{
							kind: "Button",
							caption: "Close",
							flex: 1,
							onclick: "closeSearch"
						},
						{
							kind: "Button",
							caption: "Search",
							disabled: true,
							flex: 1,
							name: 'searchButton',
							onclick: "search"
						},
						{
							kind: "Button",
							caption: "Replace",
							disabled: true,
							flex: 1,
							name: 'replaceButton',
							onclick: "replace"
						},
						{
							kind: "Button",
							caption: "Replace All",
							disabled: true,
							flex: 1,
							name: 'replaceAllButton',
							onclick: "replaceAll"
						},
					]
				}		
			]
		},
  		{ name: 'readfile', kind: 'PalmService',
	      service: 'palm://us.ryanhope.tide.fileio/', method: 'readfile',
	      onResponse: 'readfile' },
      	{ name: 'writefile', kind: 'PalmService',
	      service: 'palm://us.ryanhope.tide.fileio/', method: 'writefile',
	      onResponse: 'writefile' },
	    { name: 'checkfonts', kind: 'PalmService',
	      service: 'palm://us.ryanhope.tide.fileio/', method: 'readdir',
	      onResponse: 'fontschecked' },
		{
			kind: 'HFlexBox',
			name: 'toolbar',
			showing: true,
			align: 'center',
			className: 'tide-toolbar-light',
			//style: 'min-height: 48px',
			components: [
				{width: '5px'},
				{kind: "TideToolButton", icon: 'images/new/prefs.png', onclick: "preferences"},
				{width: '20px'},
				{kind: "TideToolButton", icon: 'images/new/new_doc.png', onclick: "newDoc"},
				{kind: "TideToolButton", icon: 'images/new/open.png', onclick: "openDialog"},
				{kind: "TideToolButton", icon: 'images/new/save.png', onclick: "saveDialog"},
				{width: '20px'},
				{kind: "TideToolButton", icon: 'images/new/cut.png', onclick: "cut"},
				{kind: "TideToolButton", icon: 'images/new/copy.png', onclick: "copy"},
				{kind: "TideToolButton", icon: 'images/new/paste.png', onclick: "paste"},
				{width: '20px'},
	      		{kind: "TideToolButton", icon: 'images/new/undo.png', onclick: 'undo'},
	      		{kind: "TideToolButton", icon: 'images/new/redo.png', onclick: 'redo'},
	      		{width: '20px'},
	      		{kind: "TideToolButton", icon: 'images/new/search.png', onclick: 'toggleSearch'},
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
				},
				{width: '5px'}
			]
		},
		{kind: enyo.HFlexBox, components: [
			{
				kind: 'Editah.Editor', name: 'editor', flex: 1
			},
			{
				layoutKind: 'VFlexLayout', align: 'end', components: [
					{kind: "TideToolButton", style: 'margin-right: -4px;', icon: 'images/new/arrow_up.png', onclick: "pgUp"},
					{kind: 'VSlider', name: 'slider', width: '28px', onChanging: 'sliderChange', onChange: 'sliderChange'},
					{kind: "TideToolButton", style: 'margin-right: -4px;', icon: 'images/new/arrow_down.png', onclick: "pgDown"},
				]
			}
		]}
  	],
  	
  	stChange: function() {
		if (this.$.searchText.value && this.$.replaceText.value) {
			this.$.searchButton.setDisabled(false)
			this.$.replaceButton.setDisabled(false)
			this.$.replaceAllButton.setDisabled(false)
		} else if (this.$.searchText.value) {
			this.$.searchButton.setDisabled(false)
			this.$.replaceButton.setDisabled(true)
			this.$.replaceAllButton.setDisabled(true)
		} else {
			this.$.searchButton.setDisabled(true)
			this.$.replaceButton.setDisabled(true)
			this.$.replaceAllButton.setDisabled(true)
		}
	},
  	
  	sliderChange: function(inSender, percent) {
  		this.$.editor.scrollByPercent(percent/100,window.innerHeight-89)
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
  		this.$.filedialog.display('open',this.currentFile)
  	},
  	
  	saveDialog: function() {
  		this.$.filedialog.display('save',this.currentFile)
  	},
  	
  	toggleSearch: function() {
		this.$.search.openAtTopCenter()
  	},
  	
  	closeSearch: function() {
		this.$.search.close()
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
		this.$.slider.$.progress.applyStyle('height', (window.innerHeight-148)+'px')
		this.$.editor.refresh(
			(window.innerWidth-28)+'px',
			(window.innerHeight-40)+'px',
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
  		this.$.editor.setEditorFont()
  		this.$.editor.setMode(this.prefs.get('mode'))
		this.$.modePicker.setValue(this.prefs.get('mode'))
  	},
  	
  	handleSave: function(inSender, file) {
  		this.$.mainScrim.setShowing(true)
  		this.$.writefile.call({ 'path': file, 'content': this.$.editor.getValue()})
  	},
  	
  	handleOpen: function(inSender, file) {
  		this.$.mainScrim.setShowing(true)
		this.$.readfile.call({ 'path': file })
		this.resizeListener()
  	},
  	
  	writefile: function(inSender, inResponse, inRequest) {
  		this.warn(inResponse)
  		this.$.mainScrim.setShowing(false)
  	},
  	
  	readfile: function(inSender, inResponse, inRequest) {
  		this.currentFile = inResponse.path
  		this.setModeByExtension(inResponse.path)
  		this.$.editor.setValue(inResponse.content)
  		this.$.mainScrim.setShowing(false)
  	},
  	
  	fontschecked: function(inSender, inResponse, inRequest) {
  		if (inResponse.returnValue) {
  			for (i in inResponse.files) {
				if (inResponse.files[i] == 'DroidSansMono.ttf')
					this.$.preferences.hasDroid = true
				else if (inResponse.files[i] == 'DejaVuSansMono.ttf')
					this.$.preferences.hasDejaVu = true
				else if (inResponse.files[i] == 'VeraMono.ttf')
					this.$.preferences.hasBitstream = true
				else if (inResponse.files[i] == 'LiberationMono-Regular.ttf')
					this.$.preferences.hasLiberation = true
  			}
		} else {
			this.error(inResponse)
		}
  	},
  	
  	rendered: function() {
		this.inherited(arguments)
		this.$.editor.prefs = this.prefs
		enyo.setFullScreen(true)
		enyo.keyboard.setResizesWindow(true)
		this.refresh()
		this.resizeListener()
		window.addEventListener('resize', enyo.bind(this, 'resizeListener'), false)
		this.$.checkfonts.call({ 'path': '/usr/share/fonts' })
		this.$.readfile.call({ 'path': 'TIDE.txt' })
  	},
  	
	cut: function() {
		this.$.editor.cut()
	},
	
	copy: function() {
		this.$.editor.copy()
	},
	
	paste: function() {
		this.$.editor.paste()
	},
	
	pgDown: function() {
		this.$.editor.pgDown()
	},
	
	pgUp: function() {
		this.$.editor.pgUp()
	},
	
	search: function() {
		var newSearch = false
		var options = {
			backwards: this.$.searchBackwards.checked,
			wrap: this.$.searchWrap.checked,
			caseSensitive: this.$.searchCaseSensitive.checked,
			wholeWord: this.$.searchWholeWord.checked,
			regExp: this.$.searchRegExp.checked
		}
		if (this.$.searchText.value != this.currentSearchTerm) {
			this.currentSearchTerm = this.$.searchText.value
			newSearch = true
		} else if (this.currentSearchOptions != options) {
			this.currentSearchOptions = options
			newSearch = true
		}
		if (newSearch)
			this.$.editor.find(this.currentSearchTerm, this.currentSearchOptions)
		else
			this.$.editor.findNext()
	},
	
	replace: function() {
		this.search()
		this.$.editor.replace(this.$.replaceText.value)
	},
	
	replaceAll: function() {
		this.search()
		this.$.editor.replaceAll(this.$.replaceText.value)
	},
	
})

enyo.kind({
	
	/*
	 * TODO: Fix loading files with spaces in the path
	 */
			
	kind: 'Popup2',
	name: 'FileDialog',
	scrim: true,
	modal: true,
	autoClose: false,
	dismissWithClick: false,
	width: '700px',
		
	published: {
		prefs: null
	},
	
	data: [],
	dataSize: 0,
	
	events: {
		onFileSave: '',
		onFileOpen: ''
	},
	
	components: [
		{ name: 'readdir', kind: 'PalmService',
	      service: 'palm://us.ryanhope.tide.fileio/', method: 'readdir',
	      onResponse: 'readdir' },
      	{ name: 'stat', kind: 'PalmService',
	      service: 'palm://us.ryanhope.tide.fileio/', method: 'stat',
	      onResponse: 'stat' },
		{
			layoutKind: "HFlexLayout",
			pack: "center",
			style: 'padding-bottom: 16px;',
			components: [
          		{name: 'title', content: "Open or Save"}
			]
		},
		{
			layoutKind: "VFlexLayout",
			pack: "center",
			width: '100%',
			components: [
				{
					layoutKind: "HFlexLayout",
					width: '100%',
					components: [
						{kind: 'IconButton', icon: 'images/folder-new.png', pack: 'center', align: 'center', disabled: true},
						{
							kind: "Input", onchange: "inputChange", changeOnInput: true,
							width: '100%', autoCapitalize: 'lowercase', 
							name: 'filename', hint: '', autoWordComplete: false,
							alwaysLooksFocused: true, spellcheck: false
						}
					]
				},
				{name: 'path', style: 'font-size: 70%; margin: 8px 0px;'},
				{
					layoutKind: "HFlexLayout",
					width: '100%',
					components: [
						{
							layoutKind: "VFlexLayout",
							width: '100%',
							name: 'inner',
							style: 'border-style:inset;',
							pack: 'center',
							components: [
								{
									layoutKind: "HFlexLayout", components: [
										{flex:1},
										{kind: 'SpinnerLarge', name: 'fdSpinner', showing: true},
										{flex:1}
									]
								},
								{
									kind: 'List2',
									name: 'dirlist',
									height: '198px',
									flex: 1,
									onSetupRow: 'setupRow',
									components: [
										{kind: 'DirlistItem', name: 'diritem', onclick: 'diritemclick'}
					    			]
								}
							]
						},
						{
				  			layoutKind: "VFlexLayout",
				  			pack: "center",
				  			align: "center",
				  			components: [
			  					{kind: "CheckBox", name: 'showHidden', style: 'margin-left:8px;', checked: false, onChange: 'toggleHidden'},
			          			{content: "Show Hidden", style: 'margin-left:8px; font-size: 70%;'},
				      			{flex: 1},
				      			{
				      				kind: "Button",
				      				caption: "Save/Open",
				      				name: 'action',
				      				width: '60px',
				      				disabled: true,
				      				onclick: "handleAction"
				  				},
				      			{
				      				kind: "Button",
				      				caption: "Cancel",
				      				width: '60px',
				      				onclick: 'close',
				      				style: 'margin-top: 16px;'
				  				},
				  				{flex: 1}
				  			]
						}
					]
				}
			]
		}
	],
	
	toggleHidden: function(inSender) {
		this.prepareList()
		this.$.dirlist.refresh()
	},
	
	inputChange: function(inSender, inEvent, inMessage) {
		if (inMessage)
			this.$.action.setDisabled(false)
		else
			this.$.action.setDisabled(true)
	},
	
	diritemclick: function(inSender, inEvent, rowIndex) {
		if (this.$.dirlist.data[rowIndex].isFile) {
			var file = this.$.dirlist.data[rowIndex].path
			this.$.filename.setValue(file.substring(file.lastIndexOf('/')+1))
			this.$.action.setDisabled(false)
		} else {
			this.$.filename.setValue('')
			this.$.action.setDisabled(true)
			var path = this.$.dirlist.data[rowIndex].path
			if (path == '..') {
				path = this.$.path.getContent()
				if (path.lastIndexOf('/') == 0)
					path = '/'
				else
					path = path.substring(0,path.lastIndexOf('/'))
			}
			this.$.path.setContent(path)
			this.clear()
			this.$.readdir.call({ 'path': path })
		}
	},
	
  	readdir: function(inSender, inResponse, inRequest) {
		if (inResponse.returnValue) {
			this.dataSize = inResponse.files.length
			if (this.dataSize > 0) {
		  		var base = '/'
		  		if (this.$.path.getContent() != '/')
		  			base = this.$.path.getContent() + '/'
		  		for (i in inResponse.files)
					this.$.stat.call({ 'path': base + inResponse.files[i] })
			} else {
	  			this.$.dirlist.setShowing(true)
	  			this.$.fdSpinner.setShowing(false)
				this.$.dirlist.refresh()
				this.resizeListener()
			}
		} else {
			this.error(inResponse)
		}
  	},
  	
  	sortByPath: function(a ,b) {
		if (a.path > b.path)
			return 1
		else if (a.path < b.path)
			return -1
		else
			return 0
	},

	sortByType: function(a, b) {
		if (a.isDirectory && b.isFile)
			return -1
		else if (a.isFile && b.isDirectory)
			return 1
		else
			return this.sortByPath(a, b)
	},
  	
  	stat: function(inSender, inResponse, inRequest) {
  		if (inResponse.returnValue) {
	  		this.data.push(inResponse)
	  		if (this.data.length == this.dataSize) {
	  			this.$.dirlist.setShowing(true)
	  			this.$.fdSpinner.setShowing(false)
	  			this.data.sort(enyo.bind(this,'sortByType'))
	  			this.prepareList()
				this.$.dirlist.refresh()
				this.resizeListener()
	  		}
  		} else {
  			this.error(inResponse)
  		}
  	},
	
	setupRow: function(inSender, info, inIndex) {
		var path = info.path
		path = path.split('/')
		path = path[path.length-1]
		if (info.isFile)
			this.$.diritem.$.icon.addClass('file')
		else
			this.$.diritem.$.icon.addClass('folder')
		this.$.diritem.$.file.setContent(path)
	},
	
	prepareList: function() {
		this.$.dirlist.data = []
		if (this.$.path.getContent() != '/')
			this.$.dirlist.data.push({path:'..',isDirectory:true,isFile:false})
		for (i in this.data) {
			var path = this.data[i].path
			path = path.split('/')
			path = path[path.length-1]
			if (!this.$.showHidden.checked && path[0] == '.')
				continue
			this.$.dirlist.data.push(this.data[i])
		}
	},
	
	handleAction: function() {
		var file = this.$.path.getContent()+'/'+this.$.filename.getValue()
		if (this.type == 'open')
			this.doFileOpen(file)
		else if (this.type == 'save')
			this.doFileSave(file)
		this.close()
	},
	
	clear: function() {
		this.data = []
		this.prepareList()
		this.$.dirlist.refresh()
		this.$.dirlist.setShowing(false)
		this.$.fdSpinner.setShowing(true)
	},
	
	display: function(type, file) {
		this.openAtTopCenter()
		this.clear()
		this.type = type
		if (file.length > 0 && file[0] == '/') {
			this.$.path.setContent(file.substring(0,file.lastIndexOf('/')))
			if (this.type == 'save')
				this.$.filename.setValue(file.substring(file.lastIndexOf('/')+1))
			else
				this.$.filename.setValue('')
			this.$.action.setDisabled(false)
		} else {
			this.$.path.setContent(this.prefs.get('defaultPath'))
			this.$.filename.setValue('')
			this.$.action.setDisabled(true)
		}	
		if (this.type == 'open') {
			this.$.title.setContent('Open File')
			this.$.action.setCaption('Open')
		} else if (this.type == 'save') {
			this.$.title.setContent('Save File')
			this.$.action.setCaption('Save')
		}
		this.$.readdir.call({ 'path': this.$.path.getContent() })
	},
	
	resizeListener: function() {
		if (this.showing) {
			this.$.inner.applyStyle('height',window.innerHeight-200+'px')
			this.$.dirlist.applyStyle('height',window.innerHeight-200+'px')
			this.resized()
			this.$.dirlist.refresh()
		}
  	},
	
	create: function() {
		this.inherited(arguments)
		window.addEventListener('resize', enyo.bind(this, 'resizeListener'), false)
	}

})
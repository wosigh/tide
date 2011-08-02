enyo.kind({
			
	kind: 'Popup2',
	name: 'FileDialog',
	scrim: true,
	modal: true,
	autoClose: false,
	dismissWithClick: false,
	width: '768px',
		
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
						{kind: 'IconButton', icon: 'images/folder-new.png', pack: 'center', align: 'center'},
						{kind: "Input", onchange: "inputChange", width: '100%', name: 'filename', hint: '', alwaysLooksFocused: true}
					]
				},
				{content: '/media/internal', name: 'path', style: 'font-size: 70%; margin: 8px 0px;'},
				{
					layoutKind: "HFlexLayout",
					width: '100%',
					components: [
						{
							kind: 'List2',
							name: 'dirlist',
							height: '220px',
							flex: 1,
							style: 'border-style:inset;',
							onSetupRow: 'setupRow',
							components: [
								{kind: 'DirlistItem', name: 'diritem', onclick: 'diritemclick'}
			    			]
						},
						{
							kind: 'List2',
							name: 'filelist',
							height: '220px',
							flex: 1,
							style: 'border-style:inset;',
							onSetupRow: 'setupRow',
							components: [
								{kind: 'DirlistItem', name: 'fileitem', onclick: 'diritemclick'}
			    			]
						}
					]
				}
			]
		},
  		{
  			layoutKind: "HFlexLayout",
  			pack: "center",
  			components: [
      			{
      				kind: "Button",
      				caption: "Cancel",
      				flex: 1,
      				onclick: 'close'
  				},
  				{kind: 'Spacer', flex: 2},
  				{
      				kind: "Button",
      				caption: "Save/Open",
      				name: 'action',
      				flex: 1,
      				disabled: true,
      				onclick: "handleAction"
  				},
  			]
		}
	],
	
	diritemclick: function(inSender, inEvent, rowIndex) {
		if (inSender.name == 'fileitem') {
			this.$.filename.setValue(this.$.filelist.data[rowIndex].path)
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
			this.warn(path)
			this.$.path.setContent(path)
			this.clear()
			this.$.readdir.call({ 'path': path })
		}
	},
	
  	readdir: function(inSender, inResponse, inRequest) {
  		if (inResponse.returnValue) {
	  		this.data = []
	  		this.dataSize = inResponse.files.length
	  		var base = '/'
	  		if (this.$.path.getContent() != '/')
	  			base = this.$.path.getContent() + '/'
	  		for (i in inResponse.files)
	  			this.$.stat.call({ 'path': base + inResponse.files[i] })
		} else {
			this.error(inResponse)
		}
  	},
  	
  	sortPaths: function(a ,b) {
  		if (a.path > b.path)
  			return 1
		else if (a.path < b.path)
			return -1
		else
			return 0
  	},
  	
  	stat: function(inSender, inResponse, inRequest) {
  		if (inResponse.returnValue) {
	  		this.data.push(inResponse)
	  		if (this.data.length == this.dataSize) {
	  			this.data.sort(enyo.bind(this,'sortPaths'))
	  			for (i in this.data) {
	  				if (this.data[i].isFile)
	  					this.$.filelist.data.push(this.data[i])
					else
						this.$.dirlist.data.push(this.data[i])
	  			}
				this.$.filelist.refresh()
				this.$.dirlist.refresh()
	  		}
  		} else {
  			this.error(inResponse)
  		}
  	},
	
	setupRow: function(inSender, info, inIndex) {
		var path = info.path
		path = path.split('/')
		path = path[path.length-1]
		if (info.isFile) {
			this.$.fileitem.$.icon.addClass('file')
			this.$.fileitem.$.file.setContent(path)
		} else {
			this.$.diritem.$.icon.addClass('folder')
			this.$.diritem.$.file.setContent(path)
		}
	},
	
	handleAction: function() {
		if (this.type == 'open')
			this.doFileOpen(this.$.filename.getValue())
		else if (this.type == 'save')
			this.doFileSave(this.$.filename.getValue())
		this.close()
	},
	
	clear: function() {
		this.$.dirlist.data = []
		this.$.filelist.data = []
		if (this.$.path.getContent() != '/')
			this.$.dirlist.data.push({path:'..',isDirectory:true,isFile:false})
		this.$.filelist.refresh()
		this.$.dirlist.refresh()
	},
	
	display: function(type) {
		this.openAtTopCenter()
		this.clear()
		this.data = []
		this.type = type
		this.$.filename.setValue('')
		this.$.action.setDisabled(true)
		if (this.type == 'open') {
			this.$.title.setContent('Open File')
			this.$.action.setCaption('Open')
		} else if (this.type == 'save') {
			this.$.title.setContent('Save File')
			this.$.action.setCaption('Save')
		}
		this.$.readdir.call({ 'path': this.$.path.getContent() })
	}

})
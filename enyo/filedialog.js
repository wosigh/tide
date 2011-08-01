enyo.kind({
			
	kind: 'Popup2',
	name: 'FileDialog',
	scrim: true,
	modal: true,
	autoClose: false,
	dismissWithClick: false,
		
	published: {
		prefs: null
	},
	
	data: [],
	dataSize: 0,
	
	events: {
		onSave: '',
		onOpen: ''
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
			style: 'padding-bottom: 20px;',
			components: [
          		{name: 'title', content: "Open or Save"}
			]
		},
		{
			layoutKind: "VFlexLayout",
			pack: "center",
			width: '600px',
			height: '300px',
			components: [
				{kind: "Input", onchange: "inputChange", name: 'filename', hint: '', alwaysLooksFocused: true},
				{
					kind: 'List2',
					name: 'dirlist',
					height: '250px',
					width: '100%',
					onSetupRow: 'setupRow',
					components: [
						{kind: 'Item', tapHighlight: true, name: 'diritem', onclick: 'diritemclick'}
	    			]
				}
			]
		},
  		{
  			layoutKind: "HFlexLayout",
  			pack: "center",
  			style: 'padding-above: 20px;',
  			components: [
  				{kind: 'Spacer'},
      			{
      				kind: "Button",
      				caption: "Cancel",
      				flex: 1,
      				onclick: 'close'
  				},
  				{
      				kind: "Button",
      				caption: "Save/Open",
      				name: 'action',
      				flex: 1,
      				disabled: true,
      				onclick: "handleAction"
  				},
  				{kind: 'Spacer'}
  			]
		}
	],
	
	diritemclick: function(inSender, inEvent, rowIndex) {
		this.$.filename.setValue(this.$.dirlist.data[rowIndex].path)
		if (this.$.dirlist.data[rowIndex].isFile)
			this.$.action.setDisabled(false)
		else
			this.$.action.setDisabled(true)
	},
	
  	readdir: function(inSender, inResponse, inRequest) {
  		this.data = []
  		this.dataSize = inResponse.files.length
  		for (i in inResponse.files)
  			this.$.stat.call({ 'path': '/media/internal/' + inResponse.files[i] })
  	},
  	
  	stat: function(inSender, inResponse, inRequest) {
  		this.data.push(inResponse)
  		if (this.data.length == this.dataSize) {
  			this.$.dirlist.data = this.data
			this.$.dirlist.refresh()
  		}
  	},
	
	setupRow: function(inSender, info, inIndex) {
		this.$.diritem.setContent(this.data[inIndex].path)
	},
	
	rendered: function() {
		this.inherited(arguments)
		if (this.type == 'open') {
			this.$.title.setContent('Open File')
			this.$.action.setCaption('Open')
		} else if (this.type == 'save') {
			this.$.title.setContent('Save File')
			this.$.action.setCaption('Save')
		}
		this.$.readdir.call({ 'path': '/media/internal' })
		for (k in this.$.dirlist.client)
			this.error([k,this.$.dirlist.client[k]])
	},
	
	handleAction: function() {
		if (this.type == 'open')
			this.doOpen(this.$.filename.getValue())
		else if (this.type == 'save')
			this.doSave(this.$.filename.getValue())
		this.close()
	}

})
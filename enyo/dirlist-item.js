enyo.kind({
	name: 'DirlistItem',
	kind: 'Item',
	layoutKind: 'HFlexLayout',
	tapHighlight: true,
	
	components: [
		{name: 'icon', className: 'dirlistIcon'},
		{name: 'file'}
	]
	
})
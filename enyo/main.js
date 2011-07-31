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
				{kind: "ToolButtonGroup", components: [
		      		{caption: 'Undo', onclick: 'undo'},
		      		{caption: 'Redo', onclick: 'redo'}
				]},
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
				},
				{
			  		kind: "Picker",
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
		}
  	],
  	
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
  		this.showDemoDoc(inValue)
  	},
  	
  	resizeHandler: function() {
  		this.$.editor.refresh(
  			(window.innerWidth-40)+'px',
  			(window.innerHeight-54)+'px',
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
		this.$.modePicker.setValue(this.prefs.get('mode'))
		this.$.editor.setMode(this.prefs.get('mode'))
		this.showDemoDoc(this.prefs.get('mode'))
  	},
  	
  	showDemoDoc: function(mode) {
  		if (mode == 'python')
  			this.$.editor.setValue("\#!/usr/local/bin/python\n\nimport string, sys\n\n\
# If no arguments were given, print a helpful message\n\
if len(sys.argv)==1:\n\tprint 'Usage: celsius temp1 temp2 ...'\n\
\tsys.exit(0)\n\n# Loop over the arguments\nfor i in sys.argv[1:]:\n\
\ttry:\n\t\tfahrenheit=float(string.atoi(i))\n\texcept string.atoi_error:\n\
\t\tprint repr(i), 'not a numeric value'\n\telse:\n\t\tcelsius=(fahrenheit-32)*5.0/9.0\n\
\t\tprint '%i\260F = %i\260C' % (int(fahrenheit), int(celsius+.5))\n")
		else if (mode == 'text')
			this.$.editor.setValue('Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.\n\
\n\
Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.\n\
\n\
Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.\n\
\n\
Nam liber tempor cum soluta nobis eleifend option congue nihil imperdiet doming id quod mazim placerat facer possim assum. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.\n\
\n\
Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis.\n\
\n\
At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, At accusam aliquyam diam diam dolore dolores duo eirmod eos erat, et nonumy sed tempor et et invidunt justo labore Stet clita ea et gubergren, kasd magna no rebum. sanctus sea sed takimata ut vero voluptua. est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur')
		else if (mode == 'scala')
			this.$.editor.setValue('//http://www.scala-lang.org/node/227\n\
/* Defines a new method "sort" for array objects */\n\
object implicits extends Application {\n\
\timplicit def arrayWrapper[A : ClassManifest](x: Array[A]) =\n\
\t\tnew {\n\t\t\tdef sort(p: (A, A) => Boolean) = {\n\
\t\t\t\tutil.Sorting.stableSort(x, p); x\n\t\t\t}\n\t\t}\n\
\tval x = Array(2, 3, 1, 4)\n\tprintln("x = "+ x.sort((x: Int, y: Int) => x < y))\n\}')
		else if (mode == 'javascript')
			this.$.editor.setValue('function foo(items) {\n\
\tfor (var i=0; i<items.length; i++) {\n\t\talert(items[i] + "juhu");\n\
\t}\t// Real Tab.\n}\n// A magic character: >> ぁ <<')
		else if (mode == 'php')
			this.$.editor.setValue('<?php\n\nfunction nfact($n) {\n\tif ($n == 0) {\n\
\t\treturn 1;\n\t}\n\telse {\n\t\treturn $n * nfact($n - 1);\n\t}\n}\n\n\
echo "\\n\\nPlease enter a whole number ... ";\n$num = trim(fgets(STDIN));\n\n\
// ===== PROCESS - Determing the factorial of the input number =====\n\
$output = "\\n\\nFactorial " . $num . " = " . nfact($num) . "\\n\\n";\necho $output;\n\n?>')
		else if (mode == 'java')
			this.$.editor.setValue('public class InfiniteLoop {\n\n\t/*\n\
\t * This will cause the program to hang...\n\t *\n\t * Taken from:\n\
\t * http://www.exploringbinary.com/java-hangs-when-converting-2-2250738585072012e-308/\n\
\t */\n\tpublic static void main(String[] args) {\n\
\t\tdouble d = Double.parseDouble("2.2250738585072012e-308");\n\n\
\t\t// unreachable code\n\t\tSystem.out.println("Value: " + d);\n\t}\n}')
		else if (mode == 'css')
			this.$.editor.setValue('.text-layer {\n\tfont-family: Monaco, "Courier New", monospace;\n\tfont-size: 12px;\n\tcursor: text;\n}')
		else if (mode == 'scss')
		this.$.editor.setValue('/* style.scss */\n\n#navbar {\
\t$navbar-width: 800px;\n\t$items: 5;\n\t$navbar-color: #ce4dd6;\n\n\
\twidth: $navbar-width;\n\tborder-bottom: 2px solid $navbar-color;\n\n\
\tli {\n\t\tfloat: left;\n\t\twidth: $navbar-width/$items - 10px;\n\n\
\t\tbackground-color: lighten($navbar-color, 20%);\n\t\t&:hover {\n\
\t\t\tbackground-color: lighten($navbar-color, 10%);\n\t\t}\n\t}\n}')
		else if (mode == 'csharp')
			this.$.editor.setValue('public void HelloWorld() {\n\t//Say Hello!\n\tConsole.WriteLine("Hello World");\n}')
		else if (mode == 'clojure')
			this.$.editor.setValue('(defn parting\n\
\t"returns a String parting in a given language"\n\t([] (parting "World"))\n\
\t([name] (parting name "en"))\n\t([name language]\n\
\t\t; condp is similar to a case statement in other languages.\n\
\t\t; It is described in more detail later.\n\
\t\t; It is used here to take different actions based on whether the\n\
\t\t; parameter "language" is set to "en", "es" or something else.\n\
\t\t\t(condp = language\n\t\t\t"en" (str "Goodbye, " name)\n\t\t\t"es" (str "Adios, " name)\n\
\t\t\t(throw (IllegalArgumentException.\n\t\t\t(str "unsupported language " language))))))\n\n\
(println (parting)) ; -> Goodbye, World\n(println (parting "Mark")) ; -> Goodbye, Mark\n\
(println (parting "Mark" "es")) ; -> Adios, Mark\n\
(println (parting "Mark", "xy")) ; -> java.lang.IllegalArgumentException: unsupported language xy')
		else
			this.$.editor.setValue("")
	}
  	
})

define("ace/theme/textmate",["require","exports","module"],function(a,b,c){var d=a("pilot/dom"),e=".ace-tm .ace_editor {  border: 2px solid rgb(159, 159, 159);}.ace-tm .ace_editor.ace_focus {  border: 2px solid #327fbd;}.ace-tm .ace_gutter {  width: 50px;  background: #e8e8e8;  color: #333;  overflow : hidden;}.ace-tm .ace_gutter-layer {  width: 100%;  text-align: right;}.ace-tm .ace_gutter-layer .ace_gutter-cell {  padding-right: 6px;}.ace-tm .ace_print_margin {  width: 1px;  background: #e8e8e8;}.ace-tm .ace_text-layer {  cursor: text;}.ace-tm .ace_cursor {  border-left: 2px solid black;}.ace-tm .ace_cursor.ace_overwrite {  border-left: 0px;  border-bottom: 1px solid black;}        .ace-tm .ace_line .ace_invisible {  color: rgb(191, 191, 191);}.ace-tm .ace_line .ace_keyword {  color: blue;}.ace-tm .ace_line .ace_constant.ace_buildin {  color: rgb(88, 72, 246);}.ace-tm .ace_line .ace_constant.ace_language {  color: rgb(88, 92, 246);}.ace-tm .ace_line .ace_constant.ace_library {  color: rgb(6, 150, 14);}.ace-tm .ace_line .ace_invalid {  background-color: rgb(153, 0, 0);  color: white;}.ace-tm .ace_line .ace_fold {    background-color: #E4E4E4;    border-radius: 3px;}.ace-tm .ace_line .ace_support.ace_function {  color: rgb(60, 76, 114);}.ace-tm .ace_line .ace_support.ace_constant {  color: rgb(6, 150, 14);}.ace-tm .ace_line .ace_support.ace_type,.ace-tm .ace_line .ace_support.ace_class {  color: rgb(109, 121, 222);}.ace-tm .ace_line .ace_keyword.ace_operator {  color: rgb(104, 118, 135);}.ace-tm .ace_line .ace_string {  color: rgb(3, 106, 7);}.ace-tm .ace_line .ace_comment {  color: rgb(76, 136, 107);}.ace-tm .ace_line .ace_comment.ace_doc {  color: rgb(0, 102, 255);}.ace-tm .ace_line .ace_comment.ace_doc.ace_tag {  color: rgb(128, 159, 191);}.ace-tm .ace_line .ace_constant.ace_numeric {  color: rgb(0, 0, 205);}.ace-tm .ace_line .ace_variable {  color: rgb(49, 132, 149);}.ace-tm .ace_line .ace_xml_pe {  color: rgb(104, 104, 91);}.ace-tm .ace_marker-layer .ace_selection {  background: rgb(181, 213, 255);}.ace-tm .ace_marker-layer .ace_step {  background: rgb(252, 255, 0);}.ace-tm .ace_marker-layer .ace_stack {  background: rgb(164, 229, 101);}.ace-tm .ace_marker-layer .ace_bracket {  margin: -1px 0 0 -1px;  border: 1px solid rgb(192, 192, 192);}.ace-tm .ace_marker-layer .ace_active_line {  background: rgba(0, 0, 0, 0.07);}.ace-tm .ace_marker-layer .ace_selected_word {  background: rgb(250, 250, 255);  border: 1px solid rgb(200, 200, 250);}.ace-tm .ace_string.ace_regex {  color: rgb(255, 0, 0)}";d.importCssString(e),b.cssClass="ace-tm"})
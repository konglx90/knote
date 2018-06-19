### A easy compiler

```js
const template = `
    #$in.title#
    ==============
    Items on today's list:
    #for item in $in.items#
    * #item.name##if item.note# (Note: #item.note#) #end#
    #end#
`
function compile(template) {
    var code = "var _out = '';", uniq = 0;
    var parts = template.split("#");
    for (var i = 0; i < parts.length; ++i) {
        var part = parts[i], m;
        if (i % 2) { // Odd elements are templating directives
            if (m = part.match(/^for (\S+) in (.*)/)) {
                var loopVar = m[1], arrayExpr = m[2];
                var indexVar = "_i" + (++uniq), arrayVar = "_a" + uniq;
                code += "for (var " + indexVar + " = 0, " + arrayVar + " = " +
                arrayExpr + ";" + indexVar + "<" + arrayVar + ".length; ++" +
                indexVar + ") {" + "var " + loopVar + " = " + arrayVar +
                "[" + indexVar + "];";
            } else if (m = part.match(/^if (.*)/)) {
                code += "if (" + m[1] + ") {";
            } else if (part == "end") {
                code += "}";
            } else {
                code += "_out += " + part + ";";
            }
        } else if (part) { // Even elements are plain text
            code += "_out += " + JSON.stringify(part) + ";";
        }
    }
    return new Function("$in", code + "return _out;");
}

const data = {
    title: 'Today\'s sun is good!',
    items: [{
        name: 'Kong',
        note: 'Run'
    }, {
        name: 'Zhang',
        note: 'Swim'
    }]
}

const execute = compile(template);
const renderString = execute(data);

/**
 * renderString
 * "
    Today's sun is good!
    ==============
    Items on today's list:
    
    * Kong (Note: Run) 
    
    * Zhang (Note: Swim) 
    
   "
 */

// execute: We get a function like
function($in) {
    var _out = '';
    _out += $in.title;
    _out += "\n==============\n\nItems on today's list:\n";
    for (var _i1 = 0, _a1 = $in.items; _i1 < _a1.length; ++_i1) {
        var item = _a1[_i1];
        _out += "\n * ";
        _out += item.name;
        if (item.note) {
            _out += " (Note: ";
            _out += item.note;
            _out += ") "
        }
    }
    return _out;
}
```
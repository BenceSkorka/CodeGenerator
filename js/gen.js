function _(e) {
    return document.getElementById(e);
}
tabs = {
    counter: 0,
    generate: function() {
        console.log("generate...");
        $( ".tabbox" ).each(function(index) {
            console.log("tabbox...");
            var tabhead = document.createElement("div");
            tabhead.className = "tabhead";
            $( this ).prepend(tabhead);
            $( this ).children( ".tabcnt" ).each(function(index) {
                console.log("tabcnt...");
                var tab = document.createElement("div");
                tab.className = "tabbtn";
                tab.innerHTML = $( this ).attr("data-tab-name");
                $( this ).attr("id", "tab-content-" + tabs.counter);
                tab.id = "tab-button-" + tabs.counter;
                tab.setAttribute("data-tab-id", tabs.counter);
                tab.setAttribute("onclick", "tabs.choose("+tabs.counter+")");
                tabhead.appendChild(tab);
                tabs.counter++;
            });
        });
        tabs.choose(0);
    },
    choose: function (t) {
        for (var i = 0; i < tabs.counter; i++) {
            _("tab-content-" + i).className = "tabcnt hidden";
            _("tab-button-" + i).className = "tabbtn";
        }
        _("tab-content-" + t).className = "tabcnt";
        _("tab-button-" + t).className = "tabbtn selected";
        $( ".tabhead" ).each(function(index) {
            $( this ).children( ".tabbtn" ).last().addClass("endline");
        });
    }
}
$(function() {
    if (location.protocol != 'https:' && location.protocol != 'file:') {
        location.href = 'https:' + window.location.href.substring(window.location.protocol.length);
    }
    tabs.generate();
});
function str_arraycheck_change() {
    if (_("str_arraycheck").checked) {
        _("str_arraydata").className = "";
    } else {
        _("str_arraydata").className = "hidden";
    }
};

function generateStringCode() {
	if (_("str_arraycheck").checked) {
		str_code.innerHTML = "bool hiba = false;\n\
do {\n\
    cout << \""+_("str_premsg").value+"\" << endl;\n";
	if (_("str_arrayprint").checked) {
		str_code.innerHTML += "    cout << \"Elfogadott bemeneti ertekek: \";\n\
    for (int i = 0; i < "+_("str_arraymax").value+"; i++) {\n\
        cout << "+_("str_arrayname").value+"[i] << \" \";\n\
    }\n\
    cout << endl;\n";
	}
	if (_("str_returnint").checked) {
    str_code.innerHTML += "    string beolvas;\n\
    cin >> beolvas;\n\
    hiba = true;\n\
    for (int i = 0; i < "+_("str_arraymax").value+"; i++) {\n\
        if ("+_("str_arrayname").value+"[i] == beolvas) {\n\
            "+_("str_varname").value+" = i;\n\
            hiba = false;\n\
            break;\n\
        }\n\
    }\n";
	} else {
    str_code.innerHTML += "    cin >> "+_("str_varname").value+";\n\
    hiba = true;\n\
    for (int i = 0; i < "+_("str_arraymax").value+"; i++) {\n\
        if ("+_("str_arrayname").value+"[i] == "+_("str_varname").value+") {\n\
            hiba = false;\n\
            break;\n\
        }\n\
    }\n";
	}
    str_code.innerHTML += "    if (hiba) {\n\
        cout << \""+_("str_errmsg").value+"\" << endl;\n\
    }\n\
} while (hiba);";
	} else {
		str_code.innerHTML = "cout << \""+_("str_premsg").value+"\" << endl;\ncin >> "+_("str_varname").value+";";
	}
    if (_("str_cerr").checked) {
        _("str_code").innerHTML = replaceAll("cout", "cerr", _("str_code").innerHTML);
    }
	$('pre code').each(function(i, block) {
		hljs.highlightBlock(block);
	});
}
function generateIntCode() {
    int_code.innerHTML = "bool hiba = false;\n\
do {\n\
    cout << \""+_("int_premsg").value+"\" << endl;\n\
    cin >> "+_("int_varname").value+";\n\
    hiba = cin.fail();\n";
    if (_("int_val_max").value == "" && _("int_val_min").value != "") {
        int_code.innerHTML += "    if (!hiba) {\n        if ("+_("int_varname").value+" < "+_("int_val_min").value+") {\n            hiba = true;\n        }\n    }\n";
    }
    if (_("int_val_max").value != "" && _("int_val_min").value == "") {
        int_code.innerHTML += "    if (!hiba) {\n        if ("+_("int_varname").value+" > "+_("int_val_max").value+") {\n            hiba = true;\n        }\n    }\n";
    }
    if (_("int_val_max").value != "" && _("int_val_min").value != "") {
        int_code.innerHTML += "    if (!hiba) {\n        if (("+_("int_varname").value+" < "+_("int_val_min").value+") || ("+_("int_varname").value+" > "+_("int_val_max").value+")) {\n            hiba = true;\n        }\n    }\n";
    }
    int_code.innerHTML += "    if (hiba) {\n\
        cin.clear();\n\
        cin.ignore(1000, '\\n');\n\
        cout << \""+_("int_errmsg").value+"\" << endl;\n\
    }\n\
} while (hiba);";
    if (_("int_cerr").checked) {
        _("int_code").innerHTML = replaceAll("cout", "cerr", _("int_code").innerHTML);
    }
	$('pre code').each(function(i, block) {
		hljs.highlightBlock(block);
	});
}

function generateArrCode() {
    arr_code.innerHTML = "int "+_("arr_varname").value+"["+_("arr_length").value+"] = ";
    if (_("arr_type").value == "none") {
        arr_code.innerHTML += "{};";
    }
    if (_("arr_type").value == "zero") {
        arr_code.innerHTML += "{";
        for (var i = 0; i < _("arr_length").value; i++) {
             arr_code.innerHTML += "0";
             if (i != _("arr_length").value - 1) {
                 arr_code.innerHTML += ", ";
             }
        }
        arr_code.innerHTML += "};";
    }
    if (_("arr_type").value == "incr") {
        arr_code.innerHTML += "{";
        for (var i = 0; i < _("arr_length").value; i++) {
             arr_code.innerHTML += ""+i;
             if (i != _("arr_length").value - 1) {
                 arr_code.innerHTML += ", ";
             }
        }
        arr_code.innerHTML += "};";
    }
    if (_("arr_type").value == "days") {
        arr_code.innerHTML = "const string "+_("arr_varname").value+"[7] = " + '{"hetfo", "kedd", "szerda", "csutortok", "pentek", "szombat", "vasarnap"};';
    }
    if (_("arr_type").value == "months") {
        arr_code.innerHTML = "const string "+_("arr_varname").value+"[12] = " + '{"januar", "februar", "marcius", "aprilis", "majus", "junius", "julius", "augusztus", "szeptember", "oktober", "november", "december"};';
    }
	$('pre code').each(function(i, block) {
		hljs.highlightBlock(block);
	});
}

function generateIntArrCode() {
    intarr_code.innerHTML = "bool hiba = false;\n\
for (int i = 0; i < "+_("intarr_arrlng").value+"; i++) {\n\
    do {\n\
        cout << \""+_("intarr_premsg").value+"\" << endl;\n\
        cin >> "+_("intarr_varname").value+"[i];\n\
        hiba = cin.fail();\n";
    if (_("intarr_val_max").value == "" && _("intarr_val_min").value != "") {
        intarr_code.innerHTML += "        if (!hiba) {\n            if ("+_("intarr_varname").value+"[i] < "+_("intarr_val_min").value+") {\n                hiba = true;\n            }\n        }\n";
    }
    if (_("intarr_val_max").value != "" && _("intarr_val_min").value == "") {
        intarr_code.innerHTML += "        if (!hiba) {\n            if ("+_("intarr_varname").value+"[i] > "+_("intarr_val_max").value+") {\n                hiba = true;\n            }\n        }\n";
    }
    if (_("intarr_val_max").value != "" && _("intarr_val_min").value != "") {
        intarr_code.innerHTML += "        if (!hiba) {\n            if (("+_("intarr_varname").value+"[i] < "+_("intarr_val_min").value+") || ("+_("intarr_varname").value+"[i] > "+_("intarr_val_max").value+")) {\n                hiba = true;\n            }\n        }\n";
    }
    intarr_code.innerHTML += "        if (hiba) {\n\
            cin.clear();\n\
            cin.ignore(1000, '\\n');\n\
            cout << \""+_("intarr_errmsg").value+"\" << endl;\n\
        }\n\
    } while (hiba);\n\
}";
    if (_("intarr_cerr").checked) {
        _("intarr_code").innerHTML = replaceAll("cout", "cerr", _("intarr_code").innerHTML);
    }
    _("intarr_code").innerHTML = replaceAll("{sorszam}", '" << (i+1) << "', _("intarr_code").innerHTML);
	$('pre code').each(function(i, block) {
		hljs.highlightBlock(block);
	});
}

function generateBaseCode() {
    base_code.innerHTML = htmlEncode("\
#include <iostream>\n\
#include <sstream>\n\
#include <cstdlib>\n\
\n\
using namespace std;\n\
\n");
    if (_("base_tostr").checked) {
        base_code.innerHTML += htmlEncode("\
template <typename T>\n\
string toString(const T& item)\n\
{\n\
    stringstream ss;\n\
    ss << item;\n\
    return ss.str();\n\
}\n\
\n");
    }
base_code.innerHTML += "int main()\n\
{\n\
    return 0;\n\
}";
	$('pre code').each(function(i, block) {
		hljs.highlightBlock(block);
	});
}

function htmlEncode(value){
  return $('<div/>').text(value).html();
}

function replaceAll(o, n, str) {
    var l = str.length;
    for (var i = 0; i < l; i++) {
        str = str.replace(o, n);
    }
    return str;
}
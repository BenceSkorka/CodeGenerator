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
    str_code.innerHTML = "bool hiba = false;\n\
do {\n\
    cout << \""+_("str_premsg").value+"\" << endl;\n\
    cout << endl;\n\
    cin >> "+_("str_varname").value+";\n\
    hiba = true;\n";
    if (_("str_arraycheck").checked) {
        str_code.innerHTML += "    for (int i = 0; i < "+_("str_arraymax").value+"; i++) {\n\
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
    if (_("str_cerr").checked) {
        _("str_code").innerHTML = replaceAll("cout", "cerr", _("str_code").innerHTML);
    }
}
function generateIntCode() {
    int_code.innerHTML = "bool hiba = false;\n\
do {\n\
    cout << \""+_("int_premsg").value+"\" << endl;\n\
    cin >> "+_("int_varname").value+";\n\
    hiba = cin.fail();\n\
    cin.clear();\n\
    cin.ignore(1000, '\\n');\n";
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
        cout << \""+_("int_errmsg").value+"\" << endl;\n\
    }\n\
} while (hiba);";
    if (_("int_cerr").checked) {
        _("int_code").innerHTML = replaceAll("cout", "cerr", _("int_code").innerHTML);
    }
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
        arr_code.innerHTML += "}";
    }
    if (_("arr_type").value == "incr") {
        arr_code.innerHTML += "{";
        for (var i = 0; i < _("arr_length").value; i++) {
             arr_code.innerHTML += ""+i;
             if (i != _("arr_length").value - 1) {
                 arr_code.innerHTML += ", ";
             }
        }
        arr_code.innerHTML += "}";
    }
    if (_("arr_type").value == "days") {
        arr_code.innerHTML = "cost string "+_("arr_varname").value+"[7] = " + '{"hetfo", "kedd", "szerda", "csutortok", "pentek", "szombat", "vasarnap"}';
    }
    if (_("arr_type").value == "months") {
        arr_code.innerHTML = "const string "+_("arr_varname").value+"[12] = " + '{"januar", "februar", "marcius", "aprilis", "majus", "junius", "julius", "augusztus", "szeptember", "oktober", "november", "december"}';
    }
}

function generateIntArrCode() {
    intarr_code.innerHTML = "bool hiba = false;\n\
for (int i = 0; i < "+_("intarr_arrlng").value+"; i++) {\n\
    do {\n\
        cout << \""+_("intarr_premsg").value+"\" << endl;\n\
        cin >> "+_("intarr_varname").value+"[i];\n\
        hiba = cin.fail();\n\
        cin.clear();\n\
        cin.ignore(1000, '\\n');\n";
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
            cout << \""+_("intarr_errmsg").value+"\" << endl;\n\
        }\n\
    } while (hiba);\n\
}";
    if (_("intarr_cerr").checked) {
        _("intarr_code").innerHTML = replaceAll("cout", "cerr", _("intarr_code").innerHTML);
    }
    _("intarr_code").innerHTML = replaceAll("{sorszam}", '" << (i+1) << "', _("intarr_code").innerHTML);
}

function replaceAll(o, n, str) {
    var l = str.length;
    for (var i = 0; i < l; i++) {
        str = str.replace(o, n);
    }
    return str;
}
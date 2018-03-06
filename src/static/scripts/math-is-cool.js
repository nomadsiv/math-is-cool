var i = 1;
var t = 1000;
var ops = "+-*";
var MIN = 1, MAX = 10;
var complexity = 1;

function animate_to(id, value) {
    value = value.toString().replace("*", "\u00D7")
    $('#' + id).fadeTo(t / 4, 0, function() {
        $('#' + id).html(value);
        $('#' + id).fadeTo(t / 4, 1);
    });
}

function rand(op, min, max, ignore_complexity) {
    var complexity_factor;
    complexity_factor = op != '*' ? complexity : Math.floor(Math
            .sqrt(complexity));
    min = min == null ? MIN : min;
    max = max == null ? MAX : max;
    if (!ignore_complexity) {
        max = max * complexity_factor;
        min = (min + 1) * complexity_factor;
    }
    return Math.floor((Math.random() * (max + 1)) + min)
}

function ask() {
    var op_index = rand('', 0, 2, true);
    var op = ops[op_index];
    var i = rand(op);
    var j = rand(op);
    if (!op)
        alert(op_index);
    if (op == '-' && i < j)
        [ j, i ] = [ i, j ];
    q = '' + i + op + j;
    animate_to('a', '???');
    animate_to('q', q);
    setTimeout(answer, t);
}

function answer() {
    animate_to('a', eval(q));
    setTimeout(ask, t / 2);
}
function run() {
    setTimeout(ask, 3);

}

$(document).ready(function() {
    setTimeout(run, t);

});

$(function() {
    $("#vslider").slider({
        orientation : "vertical",
        min : 1,
        max : 10,
        value : 4,
        slide : function(event, ui) {
            complexity = ui.value;
        }
    });
    $("#hslider").slider({
        min : 1,
        max : 10,
        value : 1,
        slide : function(event, ui) {
            t = 20000 / ui.value;
        }
    });
});
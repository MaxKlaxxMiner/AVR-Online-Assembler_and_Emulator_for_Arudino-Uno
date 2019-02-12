var AsmEditor = (function () {
    function AsmEditor(element) {
        this.element = element;
        this.doFormat();
    }
    AsmEditor.lineSplitter = function (htmlCode) {
        var lines = htmlCode.split("<br>");
        var output = [];
        for (var i = 0; i < lines.length; i++) {
            var o = { origin: lines[i] };
            o.filtered = $.trim(o.origin).replace("&nbsp;", " ");
            output[i] = o;
        }
        return output;
    };
    AsmEditor.prototype.doFormat = function () {
        var lines = AsmEditor.lineSplitter(this.element.innerHTML);
        console.log(lines);
    };
    return AsmEditor;
})();
var asmEditor;
window.onload = function () {
    asmEditor = new AsmEditor(document.getElementById("line-code"));
};
//# sourceMappingURL=app.js.map
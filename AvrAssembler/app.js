var AsmEditor = (function () {
    function AsmEditor(element) {
        this.element = element;
        this.doFormat();
    }
    AsmEditor.prototype.doFormat = function () {
        var str = this.element.innerHTML;
        var lines = str.split("<br>");
        console.log(lines);
    };
    return AsmEditor;
})();
var asmEditor;
window.onload = function () {
    asmEditor = new AsmEditor(document.getElementById("line-code"));
};
//# sourceMappingURL=app.js.map
var Greeter = (function () {
    function Greeter(element) {
        this.element = element;
        this.update();
    }
    Greeter.prototype.update = function () {
        //this.element.innerHTML = "";
    };
    Greeter.prototype.start = function () {
        var _this = this;
        this.timerToken = setInterval(function () { return _this.update(); }, 500);
    };
    Greeter.prototype.stop = function () {
        clearTimeout(this.timerToken);
    };
    return Greeter;
})();
window.onload = function () {
    var el = document.getElementById("line-codes");
    var greeter = new Greeter(el);
    greeter.start();
};
//# sourceMappingURL=app.js.map
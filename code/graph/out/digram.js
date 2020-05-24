var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var box;
(function (box) {
    var Diagram = /** @class */ (function (_super) {
        __extends(Diagram, _super);
        function Diagram(frame) {
            var _this = _super.call(this) || this;
            _this.boxDigram_frame = frame || "Diagram";
            return _this;
        }
        return Diagram;
    }(sys.xObject));
    box.Diagram = Diagram;
})(box || (box = {}));
//# sourceMappingURL=digram.js.map
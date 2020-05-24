/// <reference path="core.ts"/>
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
var sys;
(function (sys) {
    var Svg = /** @class */ (function (_super) {
        __extends(Svg, _super);
        ///////////////////////////////////////////////////////////////////////
        function Svg(tag, parent) {
            var _this = _super.call(this) || this;
            _this.sysSvg_parent = parent;
            _this.sysSvg_object = Svg.sysSvg_createElement(tag);
            if (parent)
                parent.appendChild(_this.sysSvg_object);
            return _this;
        }
        // #sysSvg_baseSpace => z
        Svg.sysSvg_baseSpace = function () {
            return "http://www.w3.org/2000/svg";
        };
        // #sysSvg_linkSpace => y
        Svg.sysSvg_linkSpace = function () {
            return "http://www.w3.org/1999/xlink";
        };
        // #sysSvg_createElement => x
        Svg.sysSvg_createElement = function (tag) {
            return document.createElementNS(Svg.sysSvg_baseSpace(), tag);
        };
        // #sysSvg_attribute => w
        Svg.sysSvg_attribute = function (element, name, value, _namespace) {
            if (_namespace === void 0) { _namespace = null; }
            element.setAttributeNS(_namespace, name, value);
        };
        // #sysSvg_use => a
        Svg.prototype.sysSvg_use = function (id) {
            var objUse = new Svg("use", this.sysSvg_object);
            Svg.sysSvg_attribute(objUse.sysSvg_object, "xlink:href", "#" + id, Svg.sysSvg_linkSpace());
            return objUse;
        };
        return Svg;
    }(sys.xObject));
    sys.Svg = Svg;
})(sys || (sys = {}));
//# sourceMappingURL=svg.js.map
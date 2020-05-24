/// <reference path="control.ts"/>
/// <reference path="../sys/svg.ts"/>
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
var ui;
(function (ui) {
    var Image = /** @class */ (function (_super) {
        __extends(Image, _super);
        function Image(parent, option) {
            var _this = this;
            option = option || {};
            option.uiImageOption_tag =
                option.uiImageOption_tag || "svg";
            _this = _super.call(this, parent, option) || this;
            return _this;
        }
        Image.prototype.uiControl_create = function (html) {
            var self = this.sysObject_this;
            var option = self.uiControl_option;
            if (option.uiImageOption_tag == "svg") {
                self.uiControl_control = html.sysHtml_svgIcon(option.uiControlOption_icon);
                if (option.uiControlOption_class)
                    self.uiControl_control.className = option.uiControlOption_class;
            }
        };
        return Image;
    }(ui.Control));
    ui.Image = Image;
})(ui || (ui = {}));
//# sourceMappingURL=image.js.map
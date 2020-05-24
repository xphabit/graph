/// <reference path="control.ts"/>
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
    var Text = /** @class */ (function (_super) {
        __extends(Text, _super);
        // Default constructor
        function Text(parent, option) {
            var _this = this;
            option = option || {};
            option.uiTextOption_tag =
                option.uiTextOption_tag || "span";
            _this = _super.call(this, parent, option) || this;
            return _this;
        }
        // Create the control
        Text.prototype.uiControl_create = function (html) {
            var self = this.sysObject_this;
            var option = self.uiControl_option;
            self.uiControl_control = html.sysHtml_element(option.uiTextOption_tag, option.uiControlOption_class);
            if (option.uiControlOption_text)
                self.uiControl_control.innerText = option.uiControlOption_text;
            _super.prototype.uiControl_create.call(this, html);
        };
        // Update the control
        Text.prototype.uiControl_update = function (param) {
            _super.prototype.uiControl_update.call(this, param);
            var self = this.sysObject_this;
            if (self.uiControl_control &&
                self.uiControl_option.uiControlOption_text) {
                self.uiControl_control.innerText = self.uiControl_option.
                    uiControlOption_text;
            }
        };
        return Text;
    }(ui.Control));
    ui.Text = Text;
})(ui || (ui = {}));
//# sourceMappingURL=text.js.map
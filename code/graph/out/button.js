/// <reference path="control.ts"/>
/// <reference path="../sys/html.ts"/>
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
    var Button = /** @class */ (function (_super) {
        __extends(Button, _super);
        // Default constructor
        function Button(parent, option) {
            var _this = _super.call(this, parent, option) || this;
            _this.uiButton_binder = [_this.sysObject_bind(_this.uiButton_onClick)]; // Keep event order
            return _this;
        }
        // Create control
        Button.prototype.uiControl_create = function (html) {
            var self = this.sysObject_this;
            var option = self.uiControl_option;
            self.uiControl_control = html.sysHtml_element("button", option.uiControlOption_class);
            if (option.uiControlOption_action)
                self.uiControl_onOffEvents(self.uiControl_on, [define.$const_eventClick], self.uiButton_binder);
            if (option.uiControlOption_text)
                self.uiControl_control.value = option.uiControlOption_text;
            if (option.uiControlOption_tip)
                html.sysHtml_attribute(self.uiControl_control, "title", option.uiControlOption_tip);
            _super.prototype.uiControl_create.call(this, html);
        };
        // #uiButton_onClick => $1
        Button.prototype.uiButton_onClick = function (event) {
            sys.sysRoot_delay(this.uiControl_option.uiControlOption_action, this);
        };
        // Remove the control
        Button.prototype.uiControl_destory = function () {
            var self = this.sysObject_this;
            if (self.uiControl_option.uiControlOption_action)
                self.uiControl_onOffEvents(self.uiControl_off, [define.$const_eventClick], self.uiButton_binder);
            _super.prototype.uiControl_destory.call(this);
        };
        return Button;
    }(ui.Control));
    ui.Button = Button;
})(ui || (ui = {}));
//# sourceMappingURL=button.js.map
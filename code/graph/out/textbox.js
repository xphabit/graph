/// <reference path="Control.ts"/>
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
    var Textbox = /** @class */ (function (_super) {
        __extends(Textbox, _super);
        // Default constructor
        function Textbox(parent, option) {
            var _this = _super.call(this, parent, option) || this;
            _this.uiTextbox_binder = [_this.sysObject_bind(_this.uiTextbox_onChange)];
            return _this;
        }
        // Create the control
        Textbox.prototype.uiControl_create = function (html) {
            var self = this.sysObject_this;
            var option = self.uiControl_option;
            var mutipleLines = option.uiTextboxOption_rows > 0 || option.uiTextboxOption_cols > 0;
            self.uiControl_control = html.sysHtml_element(mutipleLines ? "textarea" : "input", option.uiControlOption_class);
            var input = self.uiControl_control;
            if (option.uiTextboxOption_placeHolder)
                input.placeholder = option.uiTextboxOption_placeHolder;
            if (option.uiTextboxOption_maxLength)
                input.maxLength = option.uiTextboxOption_maxLength;
            if (mutipleLines) {
                var area = self.uiControl_control;
                area.rows = option.uiTextboxOption_rows;
                area.cols = option.uiTextboxOption_cols;
            }
            if (self.uiControl_option.uiControlOption_action)
                html.sysHtml_event(define.$const_actionAddEvent, input, [define.$const_eventChange], self.uiTextbox_binder);
            if (option.uiControlOption_text)
                input.value = option.uiControlOption_text;
            _super.prototype.uiControl_create.call(this, html);
        };
        // Update the control
        Textbox.prototype.uiControl_update = function (param) {
            _super.prototype.uiControl_update.call(this, param);
            var self = this.sysObject_this;
            var input = self.uiControl_control;
            if (input && self.uiControl_option.uiControlOption_text)
                input.value = self.uiControl_option.
                    uiControlOption_text;
        };
        // #uiTextbox_onChange => $1
        Textbox.prototype.uiTextbox_onChange = function (event) {
            var self = this.sysObject_this;
            sys.sysRoot_delay(self.uiControl_option.uiControlOption_action, self, self.uiControl_control.value);
        };
        // Remove the control
        Textbox.prototype.uiControl_destory = function (html) {
            var self = this.sysObject_this;
            if (self.uiControl_option.uiControlOption_action)
                html.sysHtml_event(define.$const_actionRemoveEvent, self.uiControl_control, [define.$const_eventChange], self.uiTextbox_binder);
            _super.prototype.uiControl_destory.call(this, html);
        };
        return Textbox;
    }(ui.Control));
    ui.Textbox = Textbox;
})(ui || (ui = {}));
//# sourceMappingURL=textbox.js.map
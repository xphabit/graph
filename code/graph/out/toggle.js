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
    var Toggle = /** @class */ (function (_super) {
        __extends(Toggle, _super);
        ///////////////////////////////////////////////////////////////////////
        function Toggle(parent, option) {
            var _this = _super.call(this, parent, option) || this;
            _this.uiToggle_binder = [_this.sysObject_bind(_this.uiToggle_onClick)];
            new ui.Text(new ui.Text(_this, { uiControlOption_class: "out" }), { uiControlOption_class: "in" });
            return _this;
        }
        Toggle.prototype.uiControl_create = function (html) {
            var self = this.sysObject_this;
            var option = self.uiControl_option;
            var wrap = html.sysHtml_element("button", option.uiControlOption_class);
            self.uiControl_control = wrap;
            html.sysHtml_class(define.$const_actionAddClass, wrap, ["_xcheck"]);
            if (option.uiControlOption_tip)
                html.sysHtml_attribute(wrap, "title", option.uiControlOption_tip);
            if (option.uiToggleOption_checked)
                html.sysHtml_class(define.$const_actionAddClass, wrap, ["on"]);
            if (option.uiControlOption_text)
                self.uiControl_control.dataset.tip = option.uiControlOption_text;
            html.sysHtml_event(define.$const_actionAddEvent, wrap, [define.$const_eventClick], self.uiToggle_binder);
            _super.prototype.uiControl_create.call(this, html);
        };
        // #uiToggle_onClick => $1
        Toggle.prototype.uiToggle_onClick = function (event) {
            console.log("uiToggle::onClick - " +
                this.uiControl_option.uiToggleOption_checked);
            event.stopPropagation();
            this.uiToggle_checked(!this.uiControl_option.
                uiToggleOption_checked);
        };
        // Set checked of the button
        // #uiToggle_checked => $2
        Toggle.prototype.uiToggle_checked = function (value) {
            var self = this.sysObject_this;
            var option = self.uiControl_option;
            if (!sys.sysRoot_defined(value))
                return option.uiToggleOption_checked;
            option.uiToggleOption_checked = value;
            sys.sysRoot_delay(option.uiControlOption_action, self, value);
            sys.Html.sysHtml_class([define.$const_actionRemoveClass,
                define.$const_actionAddClass][Number(value)], self.uiControl_control, ["on"]);
        };
        // Update the control
        Toggle.prototype.uiControl_update = function (param) {
            _super.prototype.uiControl_update.call(this, param);
            var self = this.sysObject_this;
            var option = this.uiControl_option;
            if (sys.sysRoot_defined(param.uiToggleOption_checked)) {
                option.uiToggleOption_checked = param.uiToggleOption_checked;
                sys.Html.sysHtml_class([define.$const_actionRemoveClass,
                    define.$const_actionAddClass][Number(option.uiToggleOption_checked)], self.uiControl_control, ["on"]);
            }
        };
        // Destroy the button
        Toggle.prototype.uiControl_destory = function (html) {
            var self = this.sysObject_this;
            html.sysHtml_event(define.$const_actionRemoveEvent, self.uiControl_control, [define.$const_eventClick], self.uiToggle_binder);
            _super.prototype.uiControl_destory.call(this, html);
        };
        return Toggle;
    }(ui.Control));
    ui.Toggle = Toggle;
})(ui || (ui = {}));
//# sourceMappingURL=toggle.js.map
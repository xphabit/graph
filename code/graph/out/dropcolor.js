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
    var DropColor = /** @class */ (function (_super) {
        __extends(DropColor, _super);
        ///////////////////////////////////////////////////////////////////////
        // Default constructor
        function DropColor(parent, option) {
            var _this = _super.call(this, parent, option) || this;
            var param = _this.uiControl_option;
            _this.uiDropColor_colorBinder = [_this.sysObject_bind(_this.uiDropColor_onColorHide)];
            param.uiDropColorOption_color = sys.sysRoot_color(define.$const_actionUnboxColor, param.uiDropColorOption_color);
            _this.uiDropColor_binder = [_this.sysObject_bind(_this.uiDropColor_onClick)];
            _this.uiDropColor_icon = new ui.Text(_this, { uiTextOption_tag: "label" });
            new ui.Text(_this, { uiControlOption_text: param.uiControlOption_text });
            new ui.Text(_this, { uiControlOption_class: "drop" });
            return _this;
        }
        // Create control
        DropColor.prototype.uiControl_create = function (html) {
            var self = this.sysObject_this;
            var option = self.uiControl_option;
            self.uiControl_control = html.sysHtml_element("button", option.uiControlOption_class);
            html.sysHtml_event(define.$const_actionAddEvent, self.uiControl_control, [define.$const_eventClick], self.uiDropColor_binder);
            _super.prototype.uiControl_create.call(this, html);
            self.uiDropColor_icon.uiControl_element.style.background =
                sys.sysRoot_color(define.$const_actionBoxColor, option.uiDropColorOption_color);
            html.sysHtml_class(define.$const_actionAddClass, self.uiControl_control, ["_xdropclr"]);
        };
        // #uiDropColor_selectColor => $5
        DropColor.prototype.uiDropColor_selectColor = function (self, color) {
            var option = self.uiControl_option;
            var style = self.uiDropColor_icon.uiControl_element.style;
            if (option.uiDropColorOption_color != color) {
                option.uiDropColorOption_color = color;
                if (self.uiDropColor_icon) {
                    self.uiDropColor_icon.uiControl_element.style.background =
                        sys.sysRoot_color(define.$const_actionBoxColor, color);
                }
                sys.sysRoot_delay(option.uiControlOption_action, self, sys.sysRoot_color(define.$const_actionBoxColor, option.uiDropColorOption_color));
            }
        };
        // #uiDropColor_onClick => $6
        DropColor.prototype.uiDropColor_onClick = function (event) {
            var self = this.sysObject_this;
            var option = self.uiControl_option;
            var dropper = option.uiDropColorOption_dropper();
            self.uiDropColor_dropper = dropper;
            if (dropper) {
                dropper.uiControl_update({
                    uiColorOption_color: option.uiDropColorOption_color,
                    uiControlOption_action: function (sender, color) { self.uiDropColor_selectColor(self, color); },
                    uiControlOption_hidden: true
                });
                var rect = sys.Html.sysHtml_boundRect(self.uiControl_control);
                dropper.uiControl_pop(rect.left, rect.bottom, option.uiDropColorOption_place);
                sys.Html.sysHtml_event(define.$const_actionAddEvent, dropper.uiControl_element, [define.$const_eventHidden], self.uiDropColor_colorBinder);
                sys.Html.sysHtml_class(define.$const_actionAddClass, self.uiControl_control, ["on"]);
            }
        };
        // #uiDropColor_onColorHide => $3
        DropColor.prototype.uiDropColor_onColorHide = function (event) {
            console.log("uiDropColor::onColorHide");
            var self = this.sysObject_this;
            sys.Html.sysHtml_event(define.$const_actionRemoveEvent, self.uiDropColor_dropper.uiControl_element, [define.$const_eventHidden], self.uiDropColor_colorBinder);
            sys.Html.sysHtml_class(define.$const_actionAddClass, self.uiControl_control, ["on"]);
        };
        // Update the color
        DropColor.prototype.uiControl_update = function (param) {
            _super.prototype.uiControl_update.call(this, param);
            var self = this.sysObject_this;
            var option = self.uiControl_option;
            if (sys.sysRoot_defined(param.uiDropColorOption_color)) {
                var color = sys.sysRoot_color(define.$const_actionUnboxColor, param.uiDropColorOption_color);
                if (option.uiDropColorOption_color != color) {
                    option.uiDropColorOption_color = color;
                    if (self.uiDropColor_icon) {
                        self.uiDropColor_icon.uiControl_element.style.background =
                            sys.sysRoot_color(define.$const_actionBoxColor, color);
                    }
                }
            }
        };
        // Destroy the button
        DropColor.prototype.uiControl_destory = function (html) {
            var self = this.sysObject_this;
            html.sysHtml_event(define.$const_actionRemoveEvent, self.uiControl_control, [define.$const_eventClick], self.uiDropColor_binder);
            if (self.uiDropColor_dropper)
                self.uiDropColor_dropper.uiControl_hidden(true);
            _super.prototype.uiControl_destory.call(this, html);
        };
        return DropColor;
    }(ui.Control));
    ui.DropColor = DropColor;
})(ui || (ui = {}));
//# sourceMappingURL=dropcolor.js.map
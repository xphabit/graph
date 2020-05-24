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
    ///////////////////////////////////////////////////////////////////////////////////////////////
    //
    // Button control
    //
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
                html.sysHtml_event(define.$const_actionAddEvent, self.uiControl_control, [define.$const_eventClick], self.uiButton_binder);
            if (option.uiControlOption_text)
                self.uiControl_control.innerText = option.uiControlOption_text;
            if (option.uiControlOption_tip)
                html.sysHtml_attribute(self.uiControl_control, "title", option.uiControlOption_tip);
            _super.prototype.uiControl_create.call(this, html);
        };
        // #uiButton_onClick => $1
        Button.prototype.uiButton_onClick = function (event) {
            event.stopPropagation();
            sys.sysRoot_delay(this.uiControl_option.uiControlOption_action, this);
        };
        // Remove the control
        Button.prototype.uiControl_destory = function (html) {
            var self = this.sysObject_this;
            if (self.uiControl_option.uiControlOption_action)
                html.sysHtml_event(define.$const_actionRemoveEvent, self.uiControl_control, [define.$const_eventClick], self.uiButton_binder);
            _super.prototype.uiControl_destory.call(this, html);
        };
        return Button;
    }(ui.Control));
    ui.Button = Button;
    ///////////////////////////////////////////////////////////////////////////////////////////////
    //
    // Image control
    //
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
    ///////////////////////////////////////////////////////////////////////////////////////////////
    //
    // Text control
    //
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
    ///////////////////////////////////////////////////////////////////////////////////////////////
    //
    // Pane control
    //
    var Pane = /** @class */ (function (_super) {
        __extends(Pane, _super);
        // Default constructor
        function Pane(parent, option) {
            return _super.call(this, parent, option) || this;
        }
        // Create a control
        Pane.prototype.uiControl_create = function (html) {
            var self = this.sysObject_this;
            self.uiControl_control = html.sysHtml_element("div", self.uiControl_option.uiControlOption_class);
            self.uiControl_modal(true); // Setup modal
            _super.prototype.uiControl_create.call(this, html);
        };
        // Remove control
        Pane.prototype.uiControl_destory = function (html) {
            this.uiControl_modal(false);
            _super.prototype.uiControl_destory.call(this, html);
        };
        return Pane;
    }(ui.Control));
    ui.Pane = Pane;
})(ui || (ui = {}));
//# sourceMappingURL=common.js.map
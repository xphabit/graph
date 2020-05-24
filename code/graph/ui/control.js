/// <reference path="../sys/core.ts"/>
/// <reference path="../sys/html.ts"/>
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
    var Control = /** @class */ (function (_super) {
        __extends(Control, _super);
        /////////////////////////////////////////////////////////////////////////////
        // The default constructor
        function Control(parent, option) {
            var _this = _super.call(this) || this;
            // The kid list
            // #uiControl_kids => z
            _this.uiControl_kids = [];
            if (parent)
                parent.uiControl_kids.push(_this);
            _this.uiControl_option = option || {};
            _this.uiControl_parent = parent;
            return _this;
        }
        Object.defineProperty(Control.prototype, "uiControl_element", {
            // #uiControl_element => v
            get: function () {
                var self = this.sysObject_this;
                if (!self.uiControl_control)
                    self.uiControl_create(sys.Html);
                return self.uiControl_control;
            },
            enumerable: true,
            configurable: true
        });
        /////////////////////////////////////////////////////////////////////////////
        // Create the control
        // The function will be called by child
        // #uiControl_create => u
        Control.prototype.uiControl_create = function (html) {
            var self = this.sysObject_this;
            if (self.uiControl_control) {
                self.uiControl_kids.forEach(function (kid) {
                    html.sysHtml_appendTo(kid.uiControl_element, self.uiControl_control);
                });
                self.uiControl_state(self, self.uiControl_option);
            }
        };
        // Update the control accord option
        // #uiControl_update => t
        Control.prototype.uiControl_update = function (param) {
            var self = this.sysObject_this;
            var option = self.uiControl_option;
            ["uiControlOption_action", "uiControlOption_disabled",
                "uiControlOption_hidden", "uiControlOption_text", "uiControlOption_tip"].
                forEach(function (item) {
                if (sys.sysRoot_defined(param[item]))
                    option[item] = param[item];
            });
            if (self.uiControl_control) {
                self.uiControl_state(self, option);
            }
        };
        // Remove a kid from children list
        // #uiControl_remove => s
        Control.prototype.uiControl_remove = function (kid) {
            var list = this.uiControl_kids;
            var index = list.indexOf(kid);
            if (index >= 0) {
                list.splice(index, 1);
            }
        };
        // Destroy the object
        // #uiControl_destory => r
        Control.prototype.uiControl_destory = function (html) {
            var self = this.sysObject_this;
            if (self.uiControl_parent)
                self.uiControl_parent.uiControl_remove(self);
            while (self.uiControl_kids.length > 0)
                self.uiControl_kids[0].uiControl_destory(html);
        };
        // Hidden of the control
        // #uiControl_hidden => q
        Control.prototype.uiControl_hidden = function (value) {
            var self = this.sysObject_this;
            var control = self.uiControl_control;
            if (control) {
                if (sys.sysRoot_defined(value) && control.hidden != value) {
                    control.hidden = value;
                    self.uiControl_kids.forEach(function (kid) { return kid.uiControl_hidden(value); });
                    control.dispatchEvent(new CustomEvent("hidden", { "detail": self }));
                }
                return control.hidden;
            }
        };
        /////////////////////////////////////////////////////////////////////////////
        // Setup modal
        // #uiControl_modal => p
        Control.prototype.uiControl_modal = function (on) {
            var self = this.sysObject_this;
            if (self.uiControl_option.uiControlOption_modal) {
                on ? sys.Html.sysHtml_appendTo(self.uiControl_control) :
                    self.uiControl_control.remove();
            }
        };
        // Display picker at point
        // align - undefine: left, define: right
        // #uiControl_pop => o
        //  %place = define.$const_placeWhere
        Control.prototype.uiControl_pop = function (x, y, place) {
            var html = sys.Html;
            var self = this.sysObject_this;
            var modal = self.uiControl_option.uiControlOption_modal;
            if (modal) {
                var element = self.uiControl_element;
                html.sysHtml_css(element, html.sysHtml_place(place || 0, x, y));
                html.sysHtml_class(define.$const_actionAddClass, element, ["_xpopup"]);
                modal.uiModal_show(self);
            }
        };
        // Quit modal
        // #uiControl_quit => n
        Control.prototype.uiControl_quit = function () {
            var modal = this.uiControl_option.uiControlOption_modal;
            if (modal) {
                modal.uiModal_quit();
            }
        };
        // #uiControl_state => m
        Control.prototype.uiControl_state = function (self, option) {
            self.uiControl_control["disabled"] = !!option.uiControlOption_disabled;
            self.uiControl_control.hidden = !!option.uiControlOption_hidden;
            if (option.uiControlOption_id) {
                self.uiControl_control.dataset.id =
                    option.uiControlOption_id;
            }
        };
        return Control;
    }(sys.xObject));
    ui.Control = Control;
})(ui || (ui = {}));
//# sourceMappingURL=control.js.map
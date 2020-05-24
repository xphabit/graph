/// <reference path="Control.ts"/>
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
        Pane.prototype.uiControl_destory = function () {
            this.uiControl_modal(false);
            _super.prototype.uiControl_destory.call(this);
        };
        return Pane;
    }(ui.Control));
    ui.Pane = Pane;
})(ui || (ui = {}));
//# sourceMappingURL=pane.js.map
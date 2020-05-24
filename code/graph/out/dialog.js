/// <reference path="control.ts"/>
/// <reference path="common.ts"/>
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
    var Dialog = /** @class */ (function (_super) {
        __extends(Dialog, _super);
        ////Functions//////////////////////////////////////////////////////////
        // Default constructor
        function Dialog(parent, option) {
            var _this = _super.call(this, parent, option) || this;
            var closebind = _this.sysObject_bind(_this.uiDialog_onClose);
            _this.uiDialog_title = _this.uiDialog_createTitle();
            _this.uiDialog_foot = _this.uiDialog_createFoot(closebind);
            new ui.Text(new ui.Button(_this, { uiControlOption_action: closebind,
                uiControlOption_class: "_xdoff" }));
            _this.uiDialog_body();
            return _this;
        }
        // Create a band
        // #uiDialog_band => $3
        Dialog.prototype.uiDialog_band = function (className) {
            return new ui.Pane(this.uiDialog_pane, {
                uiControlOption_class: "_xdband" + (className ? " " + className : "")
            });
        };
        // Display the dialog
        // #uiDialog_show => $4
        Dialog.prototype.uiDialog_show = function () {
            var self = this.sysObject_this;
            var option = self.uiControl_option;
            sys.Html.sysHtml_css(self.uiControl_element, "width:" + option.uiDialogOption_width + "px;height:" + option.uiDialogOption_height + "px;margin-left:" + -option.uiDialogOption_width / 2 + "px;margin-top:" + -option.uiDialogOption_height * 3 / 4 + "px");
            option.uiControlOption_modal.uiModal_show(self, true);
        };
        // Create the component
        Dialog.prototype.uiControl_create = function (html) {
            var self = this.sysObject_this;
            var option = self.uiControl_option;
            var id = option.uiControlOption_id;
            self.uiControl_control = html.sysHtml_element("div", option.uiControlOption_class);
            html.sysHtml_class(define.$const_actionAddClass, self.uiControl_control, ["_xdlg"]);
            if (sys.sysRoot_defined(option.uiControlOption_hidden))
                self.uiControl_control.hidden = option.uiControlOption_hidden;
            self.uiControl_control.id = id;
            self.uiControl_modal(true); // Setup modal
            _super.prototype.uiControl_create.call(this, html);
        };
        // Create dialog body
        // #uiDialog_body => $5
        Dialog.prototype.uiDialog_body = function () {
            this.uiDialog_pane = new ui.Pane(this, { uiControlOption_class: "_xdbody" });
        };
        // #uiDialog_createTitle => $6
        Dialog.prototype.uiDialog_createTitle = function () {
            var self = this.sysObject_this;
            var title = new ui.Pane(self, { uiControlOption_class: "_xdtitle" });
            new ui.Text(title, { uiControlOption_text: self.uiControl_option.uiControlOption_text });
            return title;
        };
        // #uiDialog_createFoot => $7
        Dialog.prototype.uiDialog_createFoot = function (onClosebind) {
            var self = this.sysObject_this;
            var foot = new ui.Pane(self, { uiControlOption_class: "_xdfoot" });
            new ui.Button(foot, {
                uiControlOption_action: onClosebind,
                uiControlOption_text: self.uiControl_option.uiDialogOption_cancel
            });
            return foot;
        };
        // #uiDialog_onClose => $8
        Dialog.prototype.uiDialog_onClose = function (sender) {
            this.uiControl_hidden(true);
        };
        // Destroy the component
        Dialog.prototype.uiControl_destory = function (html) {
            this.uiControl_modal(false);
            _super.prototype.uiControl_destory.call(this, html);
        };
        return Dialog;
    }(ui.Control));
    ui.Dialog = Dialog;
})(ui || (ui = {}));
//# sourceMappingURL=dialog.js.map
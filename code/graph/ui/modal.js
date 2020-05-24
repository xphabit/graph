// The modal manager control
//
// @Histroy
//   2018/06/20  Heyang  Initial version
//
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
/// <reference path="../sys/html.ts"/>
/// <reference path="control.ts"/>
var ui;
(function (ui) {
    var Modal = /** @class */ (function (_super) {
        __extends(Modal, _super);
        ///////////////////////////////////////////////////////////////////////
        // The default constructor
        function Modal(option) {
            var _this = _super.call(this, null, option) || this;
            // #uiModal_target => $0
            _this.uiModal_target = [];
            var html = sys.Html;
            _this.uiControl_control = html.sysHtml_element("div", "_xmodal");
            _this.uiModal_initial(_this, html);
            return _this;
        }
        // #uiModal_initial => $4
        Modal.prototype.uiModal_initial = function (self, html) {
            self.uiControl_control.hidden = true;
            self.uiModal_docBinder = [self.sysObject_bind(self.uiModal_onKeydown)];
            self.uiModal_binder = [self.sysObject_bind(self.uiModal_onMousedown), self.sysObject_bind(self.uiModal_onContext)];
            self.uiModal_targetBinder = [self.sysObject_bind(self.uiModal_onHidden)];
            html.sysHtml_appendTo(self.uiControl_control);
        };
        // Show target component
        // #uiModal_show => $5
        Modal.prototype.uiModal_show = function (target, mask) {
            var html = sys.Html;
            var self = this.sysObject_this;
            html.sysHtml_class([define.$const_actionRemoveClass,
                define.$const_actionAddClass][Number(!!mask)], self.uiControl_control, ["_xmask"]);
            html.sysHtml_event(define.$const_actionAddEvent, target.uiControl_element, [define.$const_eventHidden], self.uiModal_targetBinder);
            target.uiControl_hidden(false);
        };
        // Quit modal state
        // #uiModal_quit => $6
        Modal.prototype.uiModal_quit = function () {
            this.uiModal_target.forEach(function (target) { return target.uiControl_hidden(true); });
        };
        // Handle target hidden/show
        // #uiModal_onHidden => $7
        Modal.prototype.uiModal_onHidden = function (event) {
            var html = sys.Html;
            var self = this.sysObject_this;
            if (event.detail.uiControl_hidden()) {
                var top_1 = self.uiModal_target.pop();
                if (self.uiModal_target.length == 0) {
                    self.uiModal_unhook(html);
                    html.sysHtml_event(define.$const_actionRemoveEvent, top_1.uiControl_element, [define.$const_eventHidden], self.uiModal_targetBinder);
                    top_1.uiControl_destory(html);
                }
            }
            else {
                self.uiModal_target.push(event.detail);
                if (self.uiModal_target.length == 1)
                    self.uiModal_hook(html);
            }
        };
        // Keydown on document 
        // #uiModal_onKeydown => $8
        Modal.prototype.uiModal_onKeydown = function (event) {
            if (event.keyCode == 27) { // ESC to hide the top item
                event.stopPropagation();
                var targets = this.uiModal_target;
                if (targets.length > 0) {
                    var index = targets.length - 1;
                    targets[index].uiControl_hidden(true);
                }
            }
        };
        // Mouse down handler
        // #uiModal_onMousedown => $9
        Modal.prototype.uiModal_onMousedown = function (event) {
            var bound = false;
            this.uiModal_target.forEach(function (item) { return bound = bound ||
                sys.Html.sysHtml_contain(event.pageX, event.pageY, item.uiControl_element); });
            if (!bound) {
                this.uiModal_target.forEach(function (item) {
                    return item.uiControl_hidden(true);
                });
            }
        };
        // Hook system event
        // #uiModal_hook => x0
        Modal.prototype.uiModal_hook = function (html) {
            var self = this.sysObject_this;
            html.sysHtml_event(define.$const_actionAddEvent, self.uiControl_control, [define.$const_eventMouseDown, define.$const_eventContext], self.uiModal_binder);
            html.sysHtml_event(define.$const_actionAddEvent, html.sysHtml_document(), [define.$const_eventKeydown], self.uiModal_docBinder);
            self.uiControl_hidden(false);
        };
        // Unhook system event
        // #uiModal_unhook => x1
        Modal.prototype.uiModal_unhook = function (html) {
            var self = this.sysObject_this;
            html.sysHtml_event(define.$const_actionRemoveEvent, self.uiControl_control, [define.$const_eventMouseDown, define.$const_eventContext], self.uiModal_binder);
            html.sysHtml_event(define.$const_actionRemoveEvent, html.sysHtml_document(), [define.$const_eventKeydown], self.uiModal_docBinder);
            self.uiControl_hidden(true);
        };
        // #uiModal_onContext => x2
        Modal.prototype.uiModal_onContext = function (event) {
            this.uiModal_target.forEach(function (item) { return item.uiControl_hidden(true); });
            return false;
        };
        return Modal;
    }(ui.Control));
    ui.Modal = Modal;
})(ui || (ui = {}));
//# sourceMappingURL=modal.js.map
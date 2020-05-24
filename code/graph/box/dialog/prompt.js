/// <reference path="../../ui/dialog.ts"/>
/// <reference path="../../ui/common.ts"/>
/// <reference path="../../ui/textbox.ts"/>
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
var box;
(function (box) {
    var Prompt = /** @class */ (function (_super) {
        __extends(Prompt, _super);
        ///////////////////////////////////////////////////////////////////////
        function Prompt(parent, option) {
            var _this = _super.call(this, parent, option) || this;
            _this.boxPromote_binder = [_this.sysObject_bind(_this.boxPromote_onHidden)];
            return _this;
        }
        // Create body
        Prompt.prototype.uiDialog_body = function () {
            _super.prototype.uiDialog_body.call(this);
            var self = this.sysObject_this;
            var option = self.uiControl_option;
            // Icon & label band
            var band = self.uiDialog_band("_xdtip");
            new ui.Image(new ui.Pane(band, { uiControlOption_class: "icon" }), {
                uiControlOption_icon: option.uiControlOption_icon
            });
            new ui.Text(band, { uiControlOption_text: option.boxPromptOption_tip });
            // Input band
            self.boxPrompt_text = new ui.Textbox(self.uiDialog_band(), {
                uiTextboxOption_placeHolder: option.boxPromptOption_placeHolder,
                uiControlOption_class: "_xdtext"
            });
            // Foot band confirm button
            new ui.Button(self.uiDialog_foot, {
                uiControlOption_action: self.sysObject_bind(self.boxPrompt_confirm),
                uiControlOption_text: option.uiDialogOption_confirm,
                uiControlOption_class: "ok"
            });
        };
        // #boxPrompt_confirm => $01
        Prompt.prototype.boxPrompt_confirm = function (sender) {
            var self = this.sysObject_this;
            var option = self.uiControl_option;
            var input = self.boxPrompt_text.uiControl_element;
            if (option.uiControlOption_action)
                sys.sysRoot_delay(option.uiControlOption_action, input.value);
            self.uiControl_hidden(true);
        };
        // #boxPrompt_show => $02
        Prompt.prototype.boxPrompt_show = function (value) {
            var self = this.sysObject_this;
            self.boxPrompt_text.uiControl_update({ uiControlOption_text: value });
            if (self.uiControl_element)
                sys.Html.sysHtml_event(define.$const_actionAddEvent, self.uiControl_element, [define.$const_eventHidden], self.boxPromote_binder);
            _super.prototype.uiDialog_show.call(this);
        };
        // #boxPromote_onHidden => $04
        Prompt.prototype.boxPromote_onHidden = function (event) {
            if (!event.detail.uiControl_hidden()) {
                this.boxPrompt_text.uiControl_element.focus();
            }
        };
        Prompt.prototype.uiControl_destory = function (html) {
            var self = this.sysObject_this;
            html.sysHtml_event(define.$const_actionRemoveEvent, self.uiControl_control, [define.$const_eventHidden], self.boxPromote_binder);
            _super.prototype.uiControl_destory.call(this, html);
        };
        return Prompt;
    }(ui.Dialog));
    box.Prompt = Prompt;
})(box || (box = {}));
//# sourceMappingURL=prompt.js.map
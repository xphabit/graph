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
    var Format = /** @class */ (function (_super) {
        __extends(Format, _super);
        function Format() {
            var _this = this;
            (_this = _super.call(this) || this) || "format";
            return _this;
        }
        // #boxFormat_build => a
        Format.prototype.boxFormat_build = function (language, wrap, items) {
            var classRight = "right";
            var modal = sys.Pod.sysPod_depend(ui.Modal);
            for (var index = 0; index < items.length; index++) {
                var item = items[index];
                var pane = new ui.Pane(null, { uiControlOption_class: "_xfband" });
                new ui.Text(pane, { uiControlOption_text: item.uiListItem_text });
                var action = item.uiListItem_action;
                item.uiListItem_pane = pane;
                // Resuse uiListItem_class here
                switch (item.uiListItem_class) {
                    case define.$const_controlToggle:
                        new ui.Toggle(pane, {
                            uiControlOption_disabled: item.uiListItem_disabled,
                            uiToggleOption_checked: item.uiListItem_checked,
                            uiControlOption_text: item.uiListItem_tip,
                            uiControlOption_id: item.uiListItem_id,
                            uiControlOption_class: classRight,
                            uiControlOption_action: action,
                        });
                        break;
                    case define.$const_controlColor:
                        new ui.DropColor(pane, {
                            uiControlOption_action: action,
                            uiControlOption_class: classRight,
                            uiControlOption_disabled: item.uiListItem_disabled,
                            uiControlOption_id: item.uiListItem_id,
                            uiDropColorOption_color: item.uiListItem_tag,
                            uiDropColorOption_place: define.$const_placeRightTop,
                            uiDropColorOption_dropper: function () {
                                return new ui.Color(null, {
                                    uiColorOption_clearText: language.boxLang_clear,
                                    uiControlOption_modal: modal,
                                });
                            }
                        });
                        break;
                    case define.$const_controlSpinner:
                        new ui.Spinner(pane, {
                            uiSpinnerOption_value: item.uiListItem_tag,
                            uiControlOption_id: item.uiListItem_id,
                            uiControlOption_disabled: item.uiListItem_disabled,
                            uiControlOption_class: classRight,
                        });
                        break;
                    case define.$const_controlButton:
                        new ui.Button(pane, {
                            uiControlOption_class: classRight,
                            uiControlOption_disabled: item.uiListItem_disabled,
                            uiControlOption_action: action,
                        });
                        break;
                }
            }
        };
        // #boxFormat_pane => b
        Format.prototype.boxFormat_pane = function (title) {
            var classPane = ui.Pane;
            var pane = new classPane(null, { uiControlOption_class: "_xfpane" });
            new ui.Text(new classPane(pane, { uiControlOption_class: "_xfhead" }), { uiControlOption_text: title });
            return pane;
        };
        // #boxFormat_update => c
        Format.prototype.boxFormat_update = function (item) {
            var pane = item.uiListItem_pane;
            var disabled = item.uiListItem_disabled;
            if (pane && pane.uiControl_kids.length > 1) {
                switch (item.uiListItem_class) {
                    case define.$const_controlToggle:
                        pane.uiControl_kids[1].uiControl_update({
                            uiToggleOption_checked: item.uiListItem_checked,
                            uiControlOption_disabled: disabled
                        });
                        break;
                    case define.$const_controlColor:
                        pane.uiControl_kids[1].uiControl_update({
                            uiDropColorOption_color: item.uiListItem_tag,
                            uiControlOption_disabled: disabled
                        });
                        break;
                }
            }
        };
        return Format;
    }(sys.xObject));
    box.Format = Format;
})(box || (box = {}));
//# sourceMappingURL=formathelper.js.map
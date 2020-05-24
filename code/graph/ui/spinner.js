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
    var Spinner = /** @class */ (function (_super) {
        __extends(Spinner, _super);
        ///////////////////////////////////////////////////////////////////////
        function Spinner(parent, option) {
            var _this = _super.call(this, parent, option) || this;
            // #uiSpinner_class => $00
            _this.uiSpinner_class = ["inc", "dec", "hex"];
            var param = _this.uiControl_option;
            param.uiSpinnerOption_max = param.uiSpinnerOption_max || Number.MAX_VALUE;
            param.uiSpinnerOption_min = param.uiSpinnerOption_min || -param.uiSpinnerOption_max;
            param.uiSpinnerOption_value = param.uiSpinnerOption_value || 0;
            new ui.Textbox(_this, {
                uiControlOption_action: _this.sysObject_bind(_this.uiSpinner_onChange),
                uiControlOption_text: param.uiSpinnerOption_value.toString(),
                uiControlOption_class: _this.uiSpinner_class[2]
            });
            new ui.Button(_this, {
                uiControlOption_action: _this.sysObject_bind(_this.uiSpinner_onClick),
                uiControlOption_class: _this.uiSpinner_class[0]
            });
            new ui.Button(_this, {
                uiControlOption_action: _this.sysObject_bind(_this.uiSpinner_onClick),
                uiControlOption_class: _this.uiSpinner_class[1]
            });
            return _this;
        }
        Spinner.prototype.uiControl_create = function (html) {
            _super.prototype.uiControl_create.call(this, html);
            html.sysHtml_class(define.$const_actionAddClass, this.uiControl_control, ["_xspin"]);
        };
        // #uiSpinner_adjust => $01
        Spinner.prototype.uiSpinner_adjust = function (option) {
            if (option.uiSpinnerOption_min && option.uiSpinnerOption_value < option.uiSpinnerOption_min)
                option.uiSpinnerOption_value = option.uiSpinnerOption_min;
            if (option.uiSpinnerOption_max && option.uiSpinnerOption_value > option.uiSpinnerOption_max)
                option.uiSpinnerOption_value = option.uiSpinnerOption_max;
        };
        Spinner.prototype.uiControl_update = function (param) {
            _super.prototype.uiControl_update.call(this, param);
            var self = this.sysObject_this;
            var option = self.uiControl_option;
            self.uiControl_kids.forEach(function (x) {
                x.uiControl_update({ uiControlOption_disabled: option.uiControlOption_disabled });
            });
            if (param.uiSpinnerOption_value) {
                option.uiSpinnerOption_value = param.uiSpinnerOption_value;
                self.uiControl_kids[0].uiControl_update({
                    uiControlOption_text: option.
                        uiSpinnerOption_value.toString()
                });
            }
        };
        // #uiSpinner_onClick => $02
        Spinner.prototype.uiSpinner_onClick = function (sender) {
            var self = this.sysObject_this;
            var option = self.uiControl_option;
            if (option.uiSpinnerOption_value > option.uiSpinnerOption_min &&
                option.uiSpinnerOption_value < option.uiSpinnerOption_max) {
                option.uiSpinnerOption_value +=
                    (sender.uiControl_option.uiControlOption_class == self.uiSpinner_class[0]) ? 1 : -1;
                self.uiControl_kids[0].uiControl_update({ uiControlOption_text: option.uiSpinnerOption_value.toString() });
                sys.sysRoot_delay(self.uiControl_option.uiControlOption_action, self, option.uiSpinnerOption_value);
            }
        };
        // #uiSpinner_onChange => $03
        Spinner.prototype.uiSpinner_onChange = function (sender, value) {
            var self = this.sysObject_this;
            var option = self.uiControl_option;
            var tempValue = (+value) | 0;
            if (option.uiSpinnerOption_value != tempValue) {
                option.uiSpinnerOption_value = tempValue;
                self.uiSpinner_adjust(option);
                sys.sysRoot_delay(self.uiControl_option.uiControlOption_action, self, option.uiSpinnerOption_value);
            }
        };
        return Spinner;
    }(ui.Pane));
    ui.Spinner = Spinner;
})(ui || (ui = {}));
//# sourceMappingURL=spinner.js.map
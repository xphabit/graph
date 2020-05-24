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
    var Color = /** @class */ (function (_super) {
        __extends(Color, _super);
        ///////////////////////////////////////////////////////////////////////
        function Color(parent, option) {
            var _this = _super.call(this, parent, option) || this;
            // #uiColor_colorPreset => $1
            _this.uiColor_colorPreset = [
                'E6D0DE', 'CDA2BE', 'B5739D', 'E1D5E7', 'C3ABD0', 'A680B8', 'D4E1F5', 'A9C4EB', '7EA6E0', 'D5E8D4', '9AC7BF', '67AB9F',
                'D5E8D4', 'B9E0A5', '97D077', 'FFF2CC', 'FFE599', 'FFD966', 'FFF4C3', 'FFCE9F', 'FFB570', 'F8CECC', 'F19C99', 'EA6B66'
            ];
            // #uiColor_colorList => $2
            _this.uiColor_colorList = [
                'none', 'FFFFFF', 'E6E6E6', 'CCCCCC', 'B3B3B3', '999999', '808080', '666666', '4D4D4D', '333333', '1A1A1A', '000000',
                'FFCCCC', 'FFE6CC', 'FFFFCC', 'E6FFCC', 'CCFFCC', 'CCFFE6', 'CCFFFF', 'CCE5FF', 'CCCCFF', 'E5CCFF', 'FFCCFF', 'FFCCE6',
                'FF9999', 'FFCC99', 'FFFF99', 'CCFF99', '99FF99', '99FFCC', '99FFFF', '99CCFF', '9999FF', 'CC99FF', 'FF99FF', 'FF99CC',
                'FF6666', 'FFB366', 'FFFF66', 'B3FF66', '66FF66', '66FFB3', '66FFFF', '66B2FF', '6666FF', 'B266FF', 'FF66FF', 'FF66B3',
                'FF3333', 'FF9933', 'FFFF33', '99FF33', '33FF33', '33FF99', '33FFFF', '3399FF', '3333FF', '9933FF', 'FF33FF', 'FF3399',
                'FF0000', 'FF8000', 'FFFF00', '80FF00', '00FF00', '00FF80', '00FFFF', '007FFF', '0000FF', '7F00FF', 'FF00FF', 'FF0080',
                'CC0000', 'CC6600', 'CCCC00', '66CC00', '00CC00', '00CC66', '00CCCC', '0066CC', '0000CC', '6600CC', 'CC00CC', 'CC0066',
                '990000', '994C00', '999900', '4D9900', '009900', '00994D', '009999', '004C99', '000099', '4C0099', '990099', '99004D',
                '660000', '663300', '666600', '336600', '006600', '006633', '006666', '003366', '000066', '330066', '660066', '660033',
                '330000', '331A00', '333300', '1A3300', '003300', '00331A', '003333', '001933', '000033', '190033', '330033', '33001A'
            ];
            var _option = _this.uiControl_option;
            _this.uiColor_color = _option.uiColorOption_color;
            _this.uiColor_binder = [_this.sysObject_bind(_this.uiColor_onClick)];
            _this.uiColor_input = new ui.Pane(_this, { uiControlOption_class: "_xhex" });
            console.log("Color::constructor - " + _option.uiColorOption_color);
            _this.uiColor_textbox = new ui.Textbox(_this.uiColor_input, {
                uiTextboxOption_maxLength: 6, uiControlOption_text: _option.uiColorOption_color
            });
            new ui.Button(_this.uiColor_input, {
                uiControlOption_text: _option.uiColorOption_confirm,
                uiControlOption_action: function () { return _this.uiColor_selectColor(_this.uiColor_textbox.
                    uiControl_element.value); }
            });
            return _this;
        }
        // Create the control
        Color.prototype.uiControl_create = function (html) {
            var self = this.sysObject_this;
            var option = self.uiControl_option;
            var panel = html.sysHtml_element("div", option.uiControlOption_class);
            self.uiControl_control = panel;
            // Create the preset table
            html.sysHtml_class(define.$const_actionAddClass, panel, ["_xcolor"]);
            var table = self.uiColor_createTable(html, "T1");
            for (var index = 0; index < 2; index++)
                html.sysHtml_appendTo(self.uiColor_createRow(html, option, self.uiColor_colorPreset, index * 12), table);
            html.sysHtml_appendTo(table, panel);
            // Create the colored table
            table = self.uiColor_createTable(html, "T2");
            for (var index = 0; index < 10; index++)
                html.sysHtml_appendTo(self.uiColor_createRow(html, option, self.uiColor_colorList, index * 12), table);
            html.sysHtml_appendTo(table, panel);
            // Create history color table
            table = self.uiColor_createTable(html, "T3");
            self.uiColor_historyRow = self.uiColor_createRow(html, option, Color.uiColor_history, 0);
            html.sysHtml_appendTo(self.uiColor_historyRow, table);
            html.sysHtml_appendTo(table, panel);
            // Create input area
            html.sysHtml_appendTo(self.uiColor_input.uiControl_element, panel);
            html.sysHtml_event(define.$const_actionAddEvent, self.uiControl_control, [define.$const_eventClick], self.uiColor_binder);
            self.uiControl_modal(true); // setup modal
            _super.prototype.uiControl_create.call(this, html);
        };
        // #uiColor_createRow => $7
        Color.prototype.uiColor_createRow = function (html, option, colorList, offset) {
            var self = this.sysObject_this;
            var row = html.sysHtml_element("tr");
            for (var index = 0; index < 12; index++) {
                var column = html.sysHtml_element("td");
                var colorValue = colorList[offset + index];
                if (colorValue) {
                    column.style.backgroundColor = "#" + colorValue;
                    column.dataset.color = colorValue;
                }
                if (colorValue == "noop" && option.uiColorOption_clearText)
                    html.sysHtml_attribute(column, "title", option.uiColorOption_clearText);
                if (colorValue && colorValue.charAt(0) == "n") {
                    html.sysHtml_appendTo(html.sysHtml_element("span"), column);
                    column.className = colorValue;
                }
                html.sysHtml_appendTo(column, row);
            }
            return row;
        };
        // #uiColor_createTable => $8
        Color.prototype.uiColor_createTable = function (html, id) {
            var table = html.sysHtml_element("table");
            table.cellSpacing = "0";
            table.id = id;
            return table;
        };
        // #uiColor_colorItem => $9
        Color.prototype.uiColor_colorItem = function (element) {
            while (element && element.nodeName && element.nodeName != "TD")
                element = element.parentElement;
            return element;
        };
        // #uiColor_putHisory => x0
        Color.prototype.uiColor_putHisory = function (color) {
            var history = Color.uiColor_history;
            if (history.indexOf(color) == -1) {
                if (history.length == 12)
                    history.splice(1, 1);
                history.push(color);
            }
        };
        // #uiColor_selectColor => x1
        Color.prototype.uiColor_selectColor = function (color) {
            var self = this.sysObject_this;
            if (self.uiColor_color != color) {
                self.uiColor_color = color;
                sys.sysRoot_delay(self.uiControl_option.
                    uiControlOption_action, self, self.uiColor_color);
            }
            self.uiControl_quit();
        };
        // #uiColor_onClick => x2
        Color.prototype.uiColor_onClick = function (event) {
            var self = this.sysObject_this;
            var cell = self.uiColor_colorItem(event.srcElement);
            if (cell) {
                event.stopPropagation();
                var color = cell.dataset.color;
                if (color == "noop") {
                    self.uiControl_clearHistory();
                }
                else {
                    if (color != "none")
                        self.uiColor_putHisory(color);
                    self.uiColor_selectColor(color);
                }
            }
        };
        // #uiControl_clearHistory => x5
        Color.prototype.uiControl_clearHistory = function () {
            Color.uiColor_history.splice(1, Color.uiColor_history.length - 1);
            var cells = sys.Html.sysHtml_query("td:not(.noop)", this.uiColor_historyRow);
            [].forEach.call(cells, function (x) { return x.style.backgroundColor = ""; });
        };
        Color.prototype.uiControl_update = function (param) {
            _super.prototype.uiControl_update.call(this, param);
            var option = this.uiControl_option;
            option.uiColorOption_color = param.uiColorOption_color;
            if (sys.sysRoot_defined(option.uiColorOption_color))
                this.uiColor_textbox.uiControl_update({
                    uiControlOption_text: param.uiColorOption_color
                });
        };
        // Destroy the control
        Color.prototype.uiControl_destory = function (html) {
            var self = this.sysObject_this;
            html.sysHtml_event(define.$const_actionRemoveEvent, self.uiControl_control, [define.$const_eventClick], self.uiColor_binder);
            self.uiControl_modal(false);
            _super.prototype.uiControl_destory.call(this, html);
        };
        // #uiColor_history => $0
        Color.uiColor_history = ["noop"];
        return Color;
    }(ui.Control));
    ui.Color = Color;
})(ui || (ui = {}));
//# sourceMappingURL=color.js.map
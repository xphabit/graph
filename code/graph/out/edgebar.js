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
    // #boxEdgebar_config => $e
    function boxEdgebar_config(lazy, lang, register, resolve) {
        // Register pane control
        register(ui.Pane, Edgebar.boxEdgebar_key).sysBean_signleton.sysBean_argument(function () { return [
            null, {
                uiControlOption_class: Edgebar.boxEdgebar_key
            }
        ]; });
        // Register the close button
        register(ui.Button, Edgebar.boxEdgebar_closekey).sysBean_signleton.sysBean_argument(function () { return [
            resolve(Edgebar.boxEdgebar_key), {
                uiControlOption_class: Edgebar.boxEdgebar_closekey,
                uiControlOption_icon: "unfold",
                uiControlOption_action: true
            }
        ]; });
        // Register button list
        register(ui.Toolist, Edgebar.boxEdgebar_listkey).sysBean_signleton.sysBean_argument(function () { return [
            resolve(Edgebar.boxEdgebar_key), Edgebar.boxEdgebar_items, {
                uiControlOption_class: Edgebar.boxEdgebar_listkey
            }
        ]; });
        // Register edge bar component
        register(Edgebar).sysBean_signleton.sysBean_argument(function () {
            return [new lazy(function () { return resolve("frame"); })];
        });
    }
    box.boxEdgebar_config = boxEdgebar_config;
    var Edgebar = /** @class */ (function (_super) {
        __extends(Edgebar, _super);
        function Edgebar(frame) {
            var _this = _super.call(this) || this;
            _this.boxEdgebar_frame = frame || "edge";
            return _this;
        }
        // #boxEdgebar_start => e
        Edgebar.prototype.boxEdgebar_start = function (resolve) {
            var self = this.sysObject_this;
            Edgebar.boxEdgebar_items.forEach(function (item) { return item.uiListItem_tip =
                item.uiListItem_icon = item.uiListItem_id; });
            self.boxEdgebar_list = resolve(Edgebar.boxEdgebar_listkey);
            resolve(Edgebar.boxEdgebar_closekey).uiControl_update({ uiControlOption_action: function () { return self.boxEdgebar_frame.sysLazy_value.toggleFormatPanel(); } });
            self.boxEdgebar_list.uiControl_update({ uiControlOption_action: self.sysObject_bind(self.boxEdgebar_onList) });
            return resolve(Edgebar.boxEdgebar_key).
                uiControl_element;
        };
        // #boxEdgebar_onList => i
        Edgebar.prototype.boxEdgebar_onList = function (sender, item) {
            var self = this.sysObject_this;
            var frame = self.boxEdgebar_frame.sysLazy_value;
            var index = Edgebar.boxEdgebar_items.indexOf(item);
            console.log("boxEdgebar::onList - " + item.uiListItem_id + "  =  " + item.uiListItem_disabled);
            if (!item.uiListItem_disabled &&
                index != -1 && index != self.boxEdgebar_lightIndex) {
                self.boxEdgebar_lightList(index, item);
                self.boxEdgebar_lightIndex = index;
                if (index <= 1)
                    frame.showLayer(false);
                else if (index == 5)
                    frame.showLayer(true);
                else if (index >= 2 && index < 5) {
                    frame.format.switchPanel(index - 2);
                    frame.showLayer(false);
                }
            }
        };
        // #boxEdgebar_lightList => j
        Edgebar.prototype.boxEdgebar_lightList = function (index, item) {
            var html = sys.Html;
            var elements = this.boxEdgebar_elements(html);
            [].forEach.call(elements, function (x) { return html.sysHtml_class(define.$const_actionRemoveClass, x, ["checked"]); });
            Edgebar.boxEdgebar_items.forEach(function (x) { return x.uiListItem_checked = false; });
            Edgebar.boxEdgebar_items[index].uiListItem_checked = true;
            html.sysHtml_class(define.$const_actionAddClass, elements[index], ["checked"]);
        };
        // #boxEdgebar_disable => k
        // groupId = define.$const_formatXXX
        Edgebar.prototype.boxEdgebar_disable = function (groups, checked) {
            var html = sys.Html;
            var self = this.sysObject_this;
            var items = Edgebar.boxEdgebar_items;
            var elements = self.boxEdgebar_elements(html);
            [].forEach.call(elements, function (x) { return html.sysHtml_class(define.$const_actionRemoveClass, x, self.boxEdgebar_lightIndex != 5 ? ["disabled", "checked"] : ["disabled"]); });
            for (var index = 0; index < items.length; index++) {
                items[index].uiListItem_disabled = false;
                if (groups.indexOf(items[index].uiListItem_tag) >= 0) {
                    html.sysHtml_class(define.$const_actionAddClass, elements[index], ["disabled"]);
                    items[index].uiListItem_disabled = true;
                }
                if (self.boxEdgebar_lightIndex != 5 &&
                    items[index].uiListItem_tag == checked) {
                    html.sysHtml_class(define.$const_actionAddClass, elements[index], ["checked"]);
                    items[index].uiListItem_checked = true;
                    self.boxEdgebar_lightIndex = index;
                    checked = -1;
                }
            }
        };
        // #boxEdgebar_elements => l
        Edgebar.prototype.boxEdgebar_elements = function (html) {
            return html.sysHtml_query("li." + ui.List.uiList_itemClass, this.boxEdgebar_list.uiControl_element);
        };
        // #boxEdgebar_key => a
        Edgebar.boxEdgebar_key = "_xedge";
        // #boxEdgebar_closekey => c
        Edgebar.boxEdgebar_closekey = "_xekey";
        // #boxEdgebar_listkey => b
        Edgebar.boxEdgebar_listkey = "_xelist";
        // #boxEdgebar_items => d
        Edgebar.boxEdgebar_items = [
            {
                uiListItem_tag: define.$const_formatDigram,
                uiListItem_checked: true,
                uiListItem_id: "digram",
            },
            {
                uiListItem_tag: define.$const_formatText,
                uiListItem_id: "string",
            },
            {
                uiListItem_tag: define.$const_formatShape,
                uiListItem_class: "blank",
                uiListItem_disabled: true,
                uiListItem_id: "style",
            },
            {
                uiListItem_tag: define.$const_formatShape,
                uiListItem_disabled: true,
                uiListItem_id: "text",
            },
            {
                uiListItem_tag: define.$const_formatShape,
                uiListItem_disabled: true,
                uiListItem_id: "arrange",
            },
            {
                uiListItem_tag: define.$const_formatLayer,
                uiListItem_class: "blank",
                uiListItem_id: "layer",
            }
        ];
        return Edgebar;
    }(sys.xObject));
    box.Edgebar = Edgebar;
})(box || (box = {}));
//# sourceMappingURL=edgebar.js.map
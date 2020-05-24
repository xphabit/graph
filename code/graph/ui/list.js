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
    var List = /** @class */ (function (_super) {
        __extends(List, _super);
        ////Functions//////////////////////////////////////////////////////////
        // Default constructor
        function List(parent, items, option) {
            var _this = _super.call(this, parent, option) || this;
            _this.uiList_items = items || [];
            return _this;
        }
        // Create the control
        List.prototype.uiControl_create = function (html) {
            var self = this.sysObject_this;
            self.uiControl_control = html.sysHtml_element("ul", self.uiControl_option.uiControlOption_class);
            html.sysHtml_class(define.$const_actionAddClass, self.uiControl_control, ["_xlist"]);
            self.uiList_items.forEach(function (item) { self.uiList_createItem(html, item); });
            _super.prototype.uiControl_create.call(this, html);
        };
        // Create an item
        // #uiList_createItem => $2
        List.prototype.uiList_createItem = function (html, item) {
            var self = this.sysObject_this;
            var listItem = html.sysHtml_element("li", item.uiListItem_class);
            html.sysHtml_class(define.$const_actionAddClass, listItem, [List.uiList_itemClass]);
            if (item.uiListItem_id)
                listItem.dataset.id = item.uiListItem_id;
            if (item.uiListItem_pane)
                html.sysHtml_appendTo(item.uiListItem_pane.uiControl_element, listItem);
            if (item.uiListItem_hidden)
                listItem.hidden = true;
            html.sysHtml_appendTo(listItem, self.uiControl_control);
            return listItem;
        };
        // #uiList_itemClass => $1
        List.uiList_itemClass = "_xlitem";
        return List;
    }(ui.Control));
    ui.List = List;
})(ui || (ui = {}));
//# sourceMappingURL=list.js.map
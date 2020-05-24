/// <reference path="../sys/html.ts"/>
/// <reference path="control.ts"/>
/// <reference path="common.ts"/>
/// <reference path="list.ts"/>
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
    var Toolist = /** @class */ (function (_super) {
        __extends(Toolist, _super);
        ////Functions//////////////////////////////////////////////////////////
        // Default constructor
        function Toolist(parent, items, option) {
            var _this = _super.call(this, parent, items, option) || this;
            _this.uiToolist_binder = [
                _this.sysObject_bind(_this.uiList_onClick),
                _this.sysObject_bind(_this.uiList_onLeave),
                _this.sysObject_bind(_this.uiList_onMove)
            ];
            return _this;
        }
        // Create the control
        Toolist.prototype.uiControl_create = function (html) {
            _super.prototype.uiControl_create.call(this, html);
            html.sysHtml_event(define.$const_actionAddEvent, this.uiControl_control, [define.$const_eventClick, define.$const_eventMouseLeave, define.$const_eventMouseMove], this.uiToolist_binder);
        };
        Toolist.prototype.uiList_createItem = function (html, item) {
            var className = [];
            var listItem = _super.prototype.uiList_createItem.call(this, html, item);
            var _item = item;
            if (_item.uiListItem_icon && !_item.uiListItem_pane)
                html.sysHtml_appendTo(html.sysHtml_svgIcon(_item.uiListItem_icon), listItem);
            if (_item.uiListItem_disabled)
                className.push("disabled");
            if (_item.uiListItem_checked)
                className.push("checked");
            if (_item.uiListItem_pop)
                className.push("drop");
            else if (_item.uiListItem_tip)
                className.push("tip");
            if (className.length > 0)
                html.sysHtml_class(define.$const_actionAddClass, listItem, className);
            return listItem;
        };
        ////Event Handler//////////////////////////////////////////////////////
        // #uiList_onMove => $5
        Toolist.prototype.uiList_onMove = function (event) {
            var self = this.sysObject_this;
            var element = self.uiList_itemFor(event.srcElement);
            self.uiList_move(self.uiList_findItem(element), element);
        };
        // hover on item
        // #uiList_move => $6
        Toolist.prototype.uiList_move = function (item, element) {
            this.uiList_lightItem(item, element);
        };
        ///////////////////////////////////////////////////////////////////////
        // #uiList_onClick => $7
        Toolist.prototype.uiList_onClick = function (event) {
            var self = this.sysObject_this;
            var element = self.uiList_itemFor(event.srcElement);
            var item = self.uiList_findItem(element);
            if (item && !item.uiListItem_disabled &&
                sys.Html.sysHtml_has(element, ui.List.uiList_itemClass)) {
                event.stopPropagation();
                self.uiList_click(item, element);
            }
        };
        // Handle click on item
        // #uiList_click => $8
        Toolist.prototype.uiList_click = function (item, element) {
            var self = this.sysObject_this;
            if (item.uiListItem_pop) {
                var html = sys.Html;
                var r = self.uiList_point(item.uiListItem_pos, html.sysHtml_boundRect(element));
                item.uiListItem_pop().uiControl_pop(r.left, r.top, item.uiListItem_pos);
            }
            else {
                sys.sysRoot_delay(item.uiListItem_action ? item.uiListItem_action :
                    self.uiControl_option.uiControlOption_action, self, item);
            }
        };
        // #uiList_onLeave => $9
        Toolist.prototype.uiList_onLeave = function (event) {
            this.uiList_leave();
        };
        // Handle leave on control
        // #uiList_leave => x0
        Toolist.prototype.uiList_leave = function () {
            this.uiList_lightItem();
        };
        ////Additionial function///////////////////////////////////////////////
        // #uiList_lightItem => x1
        Toolist.prototype.uiList_lightItem = function (item, element) {
            this.uiList_blank(false, true);
            if (item && !item.uiListItem_disabled && element)
                sys.Html.sysHtml_class(define.$const_actionAddClass, element, ["on"]);
        };
        // #uiList_itemFor => x2
        Toolist.prototype.uiList_itemFor = function (element) {
            while (element && element.nodeName && element.nodeName != "LI")
                element = element.parentElement;
            if (element && sys.Html.sysHtml_has(element, ui.List.uiList_itemClass))
                return element;
            return null;
        };
        // #uiList_findItem => x3
        Toolist.prototype.uiList_findItem = function (element) {
            var items = this.uiList_items;
            for (var index = 0; element && index < items.length; index++) {
                var item = items[index];
                if (item.uiListItem_id == element.dataset.id) {
                    return item;
                }
            }
            return null;
        };
        // #uiList_blank => x6
        Toolist.prototype.uiList_blank = function (down, on) {
            var self = this.sysObject_this;
            console.log("uiList::blank - " + this.uiList_blank.caller.toString());
            [].forEach.call(sys.Html.sysHtml_query("li._xlitem", self.uiControl_control), function (item) {
                var classList = item.classList;
                if (down)
                    classList.remove("down");
                if (on)
                    classList.remove("on");
            });
        };
        // #uiList_point => x7
        Toolist.prototype.uiList_point = function (place, rect) {
            return {
                width: 0,
                height: 0,
                left: (place == 2 || place == 5) ? rect.right : rect.left,
                top: place < 3 ? rect.bottom : rect.top,
                bottom: 0,
                right: 0
            };
        };
        // Destroy the list
        Toolist.prototype.uiControl_destory = function (html) {
            var self = this.sysObject_this;
            html.sysHtml_event(define.$const_actionRemoveEvent, this.uiControl_control, [define.$const_eventClick, define.$const_eventMouseLeave, define.$const_eventMouseMove], this.uiToolist_binder);
            _super.prototype.uiControl_destory.call(this, html);
        };
        return Toolist;
    }(ui.List));
    ui.Toolist = Toolist;
})(ui || (ui = {}));
//# sourceMappingURL=toolist.js.map
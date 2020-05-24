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
    // BoxTailbar_config
    // #boxFootbar_config => $t
    function boxFootbar_config(lazy, lang, register, resolve) {
        // Register pane control
        register(ui.Pane, Footbar.boxFootbar_key).sysBean_signleton.sysBean_argument(function () {
            return [null, { uiControlOption_class: Footbar.boxFootbar_key }];
        });
        // Register button list
        register(ui.Toolist, Footbar.boxFootbar_listkey).sysBean_signleton.sysBean_argument(function () { return [
            resolve(Footbar.boxFootbar_key), Footbar.boxFootbar_right,
            { uiControlOption_class: Footbar.boxFootbar_listkey }
        ]; });
        // Register foot bar component
        register(Footbar).sysBean_signleton.sysBean_argument(function () {
            return [new lazy(function () { return resolve("frame"); })];
        });
    }
    box.boxFootbar_config = boxFootbar_config;
    var Footbar = /** @class */ (function (_super) {
        __extends(Footbar, _super);
        function Footbar(frame) {
            var _this = _super.call(this) || this;
            _this.boxFootbar_frame = frame || "foot";
            _this.boxFootbar_outlineBinder = [
                _this.sysObject_bind(_this.boxFootbar_onOutlineMouseWheel),
                _this.sysObject_bind(_this.boxFootbar_onOutlineHidden)
            ];
            return _this;
        }
        ///////////////////////////////////////////////////////////////////////
        // #boxFootbar_start => f
        Footbar.prototype.boxFootbar_start = function (resolve) {
            var self = this.sysObject_this;
            var item = Footbar.boxFootbar_right[0];
            item.uiListItem_pop = self.boxFootbar_createOutline(resolve);
            item.uiListItem_icon = item.uiListItem_id;
            Footbar.boxFootbar_right[1].uiListItem_action = self.boxFootbar_onItem.bind(self);
            self.boxFootbar_list = resolve(Footbar.boxFootbar_listkey);
            return resolve(Footbar.boxFootbar_key).uiControl_element;
        };
        // #boxFootbar_onItem => g
        Footbar.prototype.boxFootbar_onItem = function (sender, item) {
            alert("boxFootbar::onItem - " + item.uiListItem_id);
        };
        // #boxFootbar_createOutline => k
        Footbar.prototype.boxFootbar_createOutline = function (resolve) {
            var self = this.sysObject_this;
            return function () {
                var graph = self.boxFootbar_frame.sysLazy_value.editor.graph;
                var pane = new ui.Pane(null, {
                    uiControlOption_class: "_xtline", uiControlOption_hidden: true,
                    uiControlOption_modal: resolve(ui.Modal)
                });
                self.boxFootbar_outline =
                    new mxOutline(graph, pane.uiControl_element);
                sys.Html.sysHtml_event(define.$const_actionAddEvent, pane.uiControl_element, // Keep event order
                [define.$const_eventMouseWheel, define.$const_eventHidden], self.boxFootbar_outlineBinder);
                self.boxFootbar_outlinePane = pane;
                return pane;
            };
        };
        // #boxFootbar_onOutlineHidden => l
        Footbar.prototype.boxFootbar_onOutlineHidden = function (event) {
            var self = this.sysObject_this;
            var graph = self.boxFootbar_frame.sysLazy_value.editor.graph;
            var outline = self.boxFootbar_outline;
            console.log("boxFootbar::onHidden - " + outline);
            if (!(event.detail.uiControl_hidden())) {
                var g = outline.outline;
                outline.suspended = false;
                g.pageScale = graph.pageScale;
                g.pageFormat = graph.pageFormat;
                // g.pageVisible = graph.pageVisible;
                var background = graph.background;
                g.background = (!graph.background || graph.background == "none") ?
                    graph.defaultPageBackgroundColor : graph.background;
                g.gridEnabled = false;
                outline.refresh();
            }
            else {
                sys.Html.sysHtml_event(define.$const_actionRemoveEvent, self.boxFootbar_outlinePane.uiControl_element, [define.$const_eventMouseWheel, define.$const_eventHidden], self.boxFootbar_outlineBinder);
                outline.suspended = true;
                outline.destroy();
            }
        };
        // #boxFootbar_onOutlineMouseWheel => m
        Footbar.prototype.boxFootbar_onOutlineMouseWheel = function (event) {
            this.boxFootbar_frame.sysLazy_value.actions.get(event.deltaY < 0 ? "zoomIn" : "zoomOut").funct();
        };
        // #boxFootbar_key => a
        Footbar.boxFootbar_key = "_xtail";
        // #boxFootbar_listkey => b
        Footbar.boxFootbar_listkey = "_xtlist";
        // #boxFootbar_right => c
        Footbar.boxFootbar_right = [
            {
                uiListItem_pos: define.$const_placeRightBottom,
                uiListItem_id: "outline",
            },
            {
                uiListItem_text: "XXX",
                uiListItem_id: "X"
            }
        ];
        return Footbar;
    }(sys.xObject));
    box.Footbar = Footbar;
})(box || (box = {}));
//# sourceMappingURL=footbar.js.map
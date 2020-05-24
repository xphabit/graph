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
    var Diagram = /** @class */ (function (_super) {
        __extends(Diagram, _super);
        function Diagram(frame, helper, language) {
            var _this = _super.call(this) || this;
            // #boxDiagram_options => b
            _this.boxDiagram_options = [
                {
                    uiListItem_class: define.$const_controlToggle,
                    uiListItem_id: "connectionArrows",
                },
                {
                    uiListItem_class: define.$const_controlToggle,
                    uiListItem_id: "connectionPoints",
                },
                {
                    uiListItem_class: define.$const_controlToggle,
                    uiListItem_id: "guides",
                },
            ];
            // #boxDiagram_views => i
            _this.boxDiagram_views = [
                {
                    uiListItem_class: define.$const_controlToggle,
                    uiListItem_id: "grid",
                },
                {
                    uiListItem_class: define.$const_controlColor,
                    uiListItem_id: "gridColor",
                },
                {
                    uiListItem_class: define.$const_controlSpinner,
                    uiListItem_id: "gridSize",
                },
                {
                    uiListItem_class: define.$const_controlToggle,
                    uiListItem_id: "pageView",
                },
                {
                    uiListItem_class: define.$const_controlToggle,
                    uiListItem_id: "background",
                },
                {
                    uiListItem_class: define.$const_controlColor,
                    uiListItem_id: "backgroundColor",
                },
                {
                    uiListItem_class: define.$const_controlButton,
                    uiListItem_id: "backgroundImage",
                },
            ];
            _this.boxDiagram_frame = frame || "diagram";
            _this.boxDiagram_language = language;
            _this.boxDiagram_helper = helper;
            return _this;
        }
        // #boxDiagram_optionPane => c
        Diagram.prototype.boxDiagram_optionPane = function () {
            var classPane = ui.Pane;
            var self = this.sysObject_this;
            var pane = self.boxDiagram_helper.boxFormat_pane(self.boxDiagram_language.boxLang_options);
            // Create list item
            var list = new ui.List(pane, self.boxDiagram_options, { uiControlOption_class: "_xflist" });
            var frame = self.boxDiagram_frame.sysLazy_value;
            var graph = frame.editor.graph;
            // Initialize and bind action
            var isGraphEnabled = graph.isEnabled();
            var checkValue = [graph.connectionArrowsEnabled,
                graph.connectionHandler.isEnabled(), graph.graphHandler.guidesEnabled];
            var textValue = [self.boxDiagram_language.boxLang_connectarrow,
                self.boxDiagram_language.boxLang_connectarrow, self.boxDiagram_language.boxLang_guide];
            for (var index = 0; index < 3; index++) {
                var item = self.boxDiagram_options[index];
                item.uiListItem_checked = checkValue[index];
                item.uiListItem_disabled = !isGraphEnabled;
                item.uiListItem_action = function (sender, value) { frame.actions.get(sender.uiControl_option.uiControlOption_id).funct(); };
                item.uiListItem_text = textValue[index];
            }
            self.boxDiagram_helper.boxFormat_build(self.boxDiagram_language, list, self.boxDiagram_options);
            return pane;
        };
        // #boxDiagram_create => e
        Diagram.prototype.boxDiagram_create = function () {
            var self = this.sysObject_this;
            var frame = self.boxDiagram_frame.sysLazy_value;
            var optionActions = [
                "connectionArrowsChanged", "connectionPointsChanged", "guidesEnabledChanged"
            ];
            var _loop_1 = function (index) {
                frame.addListener(optionActions[index], function () { self.boxDiagram_updateOption(index); });
            };
            for (var index = 0; index < 3; index++) {
                _loop_1(index);
            }
            var viewActions = ["gridEnabledChanged", "gridColorChanged", "none",
                "pageViewChanged", "backgroundColorChanged", "backgroundColorChanged"];
            var _loop_2 = function (index) {
                frame.addListener(viewActions[index], function () { self.boxDiagram_updateView(index); });
            };
            for (var index = 0; index < 5; index++) {
                _loop_2(index);
            }
        };
        // #boxDiagram_destroy => f
        Diagram.prototype.boxDiagram_destroy = function () {
            var self = this.sysObject_this;
            self.boxDiagram_options.concat(self.boxDiagram_views).forEach(function (x) { delete x.uiListItem_pane; });
        };
        // #boxDiagram_updateOption => g
        Diagram.prototype.boxDiagram_updateOption = function (index) {
            var self = this.sysObject_this;
            var frame = self.boxDiagram_frame.sysLazy_value;
            var item = self.boxDiagram_options[index];
            var graph = frame.editor.graph;
            var checkValue = [graph.connectionArrowsEnabled,
                graph.connectionHandler.isEnabled(), graph.graphHandler.guidesEnabled];
            item.uiListItem_disabled = !graph.isEnabled();
            item.uiListItem_checked = checkValue[index];
            self.boxDiagram_helper.
                boxFormat_update(item);
        };
        // #boxDiagram_viewPane => j
        Diagram.prototype.boxDiagram_viewPane = function () {
            var classPane = ui.Pane;
            var self = this.sysObject_this;
            var pane = self.boxDiagram_helper.boxFormat_pane("View");
            // Create list item
            var list = new ui.List(pane, self.boxDiagram_views, { uiControlOption_class: "_xflist" });
            var frame = self.boxDiagram_frame.sysLazy_value;
            var graph = frame.editor.graph;
            // Initialize and bind action
            var isGraphEnabled = graph.isEnabled();
            var textValue = ["Grid", " > color", " > size", "PageView", "Background", " > Color", " > Image"];
            for (var index = 0; index < self.boxDiagram_views.length; index++) {
                var item_1 = self.boxDiagram_views[index];
                item_1.uiListItem_text = textValue[index];
            }
            // Grid option
            var item = self.boxDiagram_views[0];
            var gridEnabled = graph.isGridEnabled();
            item.uiListItem_action = function (sender, value) {
                graph.setGridEnabled(!graph.isGridEnabled());
                frame.fireEvent(new mxEventObject("gridEnabledChanged"));
            };
            item.uiListItem_checked = gridEnabled;
            item = self.boxDiagram_views[1];
            item.uiListItem_action = function (sender, color) { frame.setGridColor(color); };
            item.uiListItem_tag = graph.view.gridColor;
            item.uiListItem_disabled = !gridEnabled;
            item = self.boxDiagram_views[2];
            item.uiListItem_tag = graph.getGridSize();
            item.uiListItem_disabled = !gridEnabled;
            // Page view
            item = self.boxDiagram_views[3];
            item.uiListItem_action = function (sender, value) { frame.actions.get("pageView").funct(); };
            item.uiListItem_checked = graph.pageVisible;
            item.uiListItem_disabled = !isGraphEnabled;
            // Background
            item = self.boxDiagram_views[4];
            item.uiListItem_action = function (sender, value) {
                self.boxDiagram_background(frame, graph, value ? "#ffffff" : "none");
            };
            item.uiListItem_checked = graph.background != "none";
            item.uiListItem_disabled = !isGraphEnabled;
            // BackgroundColor
            item = self.boxDiagram_views[5];
            item.uiListItem_action = function (sender, value) { self.boxDiagram_background(frame, graph, value); };
            item.uiListItem_disabled = !isGraphEnabled || graph.background == "none";
            item.uiListItem_tag = graph.background;
            item = self.boxDiagram_views[6];
            item.uiListItem_action = function (sender) { frame.showBackgroundImageDialog(); };
            // Initialize and bind action
            self.boxDiagram_helper.boxFormat_build(self.boxDiagram_language, list, self.boxDiagram_views);
            return pane;
        };
        // #boxDiagram_updateView => k
        Diagram.prototype.boxDiagram_updateView = function (index) {
            var self = this.sysObject_this;
            var frame = self.boxDiagram_frame.sysLazy_value;
            var helper = self.boxDiagram_helper;
            var graph = frame.editor.graph;
            // Update grid enable
            var isGraphEnabled = graph.isEnabled();
            var isGridEnabled = graph.isGridEnabled();
            var item = self.boxDiagram_views[index];
            switch (index) {
                case 0: // Grid enabled
                    item.uiListItem_checked = isGridEnabled;
                    helper.boxFormat_update(item);
                    self.boxDiagram_updateView(1);
                    self.boxDiagram_updateView(2);
                    break;
                case 1: // Grid color
                    item.uiListItem_tag = graph.view.gridColor;
                    item.uiListItem_disabled = !isGridEnabled;
                    helper.boxFormat_update(item);
                    break;
                case 3: // Page view
                    item.uiListItem_checked = graph.pageVisible;
                    item.uiListItem_disabled = !isGraphEnabled;
                    helper.boxFormat_update(item);
                    break;
                case 4: // Background
                    item.uiListItem_checked = graph.background != "none";
                    item.uiListItem_disabled = !isGraphEnabled;
                    helper.boxFormat_update(item);
                    self.boxDiagram_updateView(5);
                    break;
                case 5: // Background color
                    item.uiListItem_tag = graph.background;
                    item.uiListItem_disabled = !isGraphEnabled || graph.background == "none";
                    helper.boxFormat_update(item);
                    break;
            }
        };
        // #boxDiagram_background => l
        Diagram.prototype.boxDiagram_background = function (frame, graph, color) {
            var change = new ChangePageSetup(frame, color);
            change.ignoreImage = true;
            graph.model.execute(change);
        };
        return Diagram;
    }(sys.xObject));
    box.Diagram = Diagram;
})(box || (box = {}));
//# sourceMappingURL=diagram.js.map
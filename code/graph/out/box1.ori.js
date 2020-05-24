// var __extends = (this && this.__extends) || (function () {
//     var extendStatics = Object.setPrototypeOf ||
//         ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
//         function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
//     return function (d, b) {
//         extendStatics(d, b);
//         function __() { this.constructor = d; }
//         d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
//     };
// })();
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
// })(box || (box = {}));
//# sourceMappingURL=edgebar.js.map
// var __extends = (this && this.__extends) || (function () {
//     var extendStatics = Object.setPrototypeOf ||
//         ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
//         function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
//     return function (d, b) {
//         extendStatics(d, b);
//         function __() { this.constructor = d; }
//         d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
//     };
// })();
// var box;
// (function (box) {
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
// })(box || (box = {}));
//# sourceMappingURL=footbar.js.map
/// <reference path="../../ui/dialog.ts"/>
/// <reference path="../../ui/common.ts"/>
/// <reference path="../../ui/textbox.ts"/>
// var __extends = (this && this.__extends) || (function () {
//     var extendStatics = Object.setPrototypeOf ||
//         ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
//         function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
//     return function (d, b) {
//         extendStatics(d, b);
//         function __() { this.constructor = d; }
//         d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
//     };
// })();
// var box;
// (function (box) {
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
// })(box || (box = {}));
//# sourceMappingURL=prompt.js.map
/// <reference path="prompt.ts"/>
// var box;
// (function (box) {
    // #boxDialog_config => $d
    function boxDialog_config(lazy, lang, register, resolve) {
        var uiModal = ui.Modal;
        // Configure link dialog
        var linkOption = {
            uiControlOption_hidden: true,
            uiControlOption_text: lang.boxLang_link,
            uiDialogOption_confirm: lang.boxLang_ok,
            uiDialogOption_cancel: lang.boxLang_cancel,
            uiControlOption_modal: resolve(uiModal),
            boxPromptOption_placeHolder: "http://www.xphabit.com",
            boxPromptOption_tip: lang.boxLang_url,
            uiDialogOption_height: 185,
            uiDialogOption_width: 460
        };
        linkOption.uiControlOption_id =
            linkOption.uiControlOption_icon = "link";
        register(box.Prompt, "link").sysBean_argument(function () { return [null, linkOption]; });
    }
    box.boxDialog_config = boxDialog_config;
// })(box || (box = {}));
//# sourceMappingURL=dialogconfig.js.map
/// <reference path="../sys/core.ts"/>
/// <reference path="../ui/modal.ts"/>
/// <reference path="dialog/dialogconfig.ts"/>
// var box;
// (function (box) {
    // #boxRoot_config => $1
    function boxRoot_config() {
        var sysPod = sys.Pod;
        var register = sysPod.sysPod_inject;
        register(ui.Modal).sysBean_signleton;
        [box.boxDialog_config, box.boxEdgebar_config,
            box.boxFootbar_config, box.boxFormat_config].forEach(function (x) { return x.call(box, sys.Lazy, box.Lang, register, sysPod.sysPod_depend); });
    }
    box.boxRoot_config = boxRoot_config;
// })(box || (box = {}));
//# sourceMappingURL=boxconfig.js.map
// var __extends = (this && this.__extends) || (function () {
//     var extendStatics = Object.setPrototypeOf ||
//         ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
//         function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
//     return function (d, b) {
//         extendStatics(d, b);
//         function __() { this.constructor = d; }
//         d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
//     };
// })();
// var box;
// (function (box) {
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
// })(box || (box = {}));
//# sourceMappingURL=formathelper.js.map
// var __extends = (this && this.__extends) || (function () {
//     var extendStatics = Object.setPrototypeOf ||
//         ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
//         function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
//     return function (d, b) {
//         extendStatics(d, b);
//         function __() { this.constructor = d; }
//         d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
//     };
// })();
// var box;
// (function (box) {
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
// })(box || (box = {}));
//# sourceMappingURL=diagram.js.map
// var box;
// (function (box) {
    // #boxFormat_config => $f
    function boxFormat_config(lazy, lang, register, resolve) {
        // Resigtser helper
        register(box.Format).sysBean_signleton;
        // Register diagram component
        register(box.Diagram).sysBean_signleton.sysBean_argument(function () {
            return [new lazy(function () { return resolve("frame"); }), resolve(box.Format), lang];
        });
    }
    box.boxFormat_config = boxFormat_config;
})(box || (box = {}));
//# sourceMappingURL=formatconfig.js.map

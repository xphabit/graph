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
    // #$e => $e
    function $e(lazy, lang, register, resolve) {
        // Register pane control
        register(ui.Pane, Edgebar.a).d.c(function () { return [
            null, {
                b: Edgebar.a
            }
        ]; });
        // Register the close button
        register(ui.Button, Edgebar.c).d.c(function () { return [
            resolve(Edgebar.a), {
                b: Edgebar.c,
                i: "unfold",
                c: true
            }
        ]; });
        // Register button list
        register(ui.Toolist, Edgebar.b).d.c(function () { return [
            resolve(Edgebar.a), Edgebar.d, {
                b: Edgebar.b
            }
        ]; });
        // Register edge bar component
        register(Edgebar).d.c(function () {
            return [new lazy(function () { return resolve("frame"); })];
        });
    }
    box.$e = $e;
    var Edgebar = /** @class */ (function (_super) {
        __extends(Edgebar, _super);
        function Edgebar(frame) {
            var _this = _super.call(this) || this;
            _this.f = frame || "edge";
            return _this;
        }
        // #e => e
        Edgebar.prototype.e = function (resolve) {
            var self = this._;
            Edgebar.d.forEach(function (item) { return item.w =
                item.v = item.a; });
            self.g = resolve(Edgebar.b);
            resolve(Edgebar.c).t({ c: function () { return self.f.x.toggleFormatPanel(); } });
            self.g.t({ c: self.$(self.i) });
            return resolve(Edgebar.a).
                v;
        };
        // #i => i
        Edgebar.prototype.i = function (sender, item) {
            var self = this._;
            var frame = self.f.x;
            var index = Edgebar.d.indexOf(item);
            console.log("boxEdgebar::onList - " + item.a + "  =  " + item.sd);
            if (!item.sd &&
                index != -1 && index != self.h) {
                self.j(index, item);
                self.h = index;
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
        // #j => j
        Edgebar.prototype.j = function (index, item) {
            var html = sys.Html;
            var elements = this.l(html);
            [].forEach.call(elements, function (x) { return html.k(1, x, ["checked"]); });
            Edgebar.d.forEach(function (x) { return x.z = false; });
            Edgebar.d[index].z = true;
            html.k(0, elements[index], ["checked"]);
        };
        // #k => k
        // groupId = define.$const_formatXXX
        Edgebar.prototype.k = function (groups, checked) {
            var html = sys.Html;
            var self = this._;
            var items = Edgebar.d;
            var elements = self.l(html);
            [].forEach.call(elements, function (x) { return html.k(1, x, self.h != 5 ? ["disabled", "checked"] : ["disabled"]); });
            for (var index = 0; index < items.length; index++) {
                items[index].sd = false;
                if (groups.indexOf(items[index].e) >= 0) {
                    html.k(0, elements[index], ["disabled"]);
                    items[index].sd = true;
                }
                if (self.h != 5 &&
                    items[index].e == checked) {
                    html.k(0, elements[index], ["checked"]);
                    items[index].z = true;
                    self.h = index;
                    checked = -1;
                }
            }
        };
        // #l => l
        Edgebar.prototype.l = function (html) {
            return html.m("li." + ui.List.$1, this.g.v);
        };
        // #a => a
        Edgebar.a = "_xedge";
        // #c => c
        Edgebar.c = "_xekey";
        // #b => b
        Edgebar.b = "_xelist";
        // #d => d
        Edgebar.d = [
            {
                e: 0,
                z: true,
                a: "digram",
            },
            {
                e: 1,
                a: "string",
            },
            {
                e: 2,
                b: "blank",
                sd: true,
                a: "style",
            },
            {
                e: 2,
                sd: true,
                a: "text",
            },
            {
                e: 2,
                sd: true,
                a: "arrange",
            },
            {
                e: 3,
                b: "blank",
                a: "layer",
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
    // #$t => $t
    function $t(lazy, lang, register, resolve) {
        // Register pane control
        register(ui.Pane, Footbar.a).d.c(function () {
            return [null, { b: Footbar.a }];
        });
        // Register button list
        register(ui.Toolist, Footbar.b).d.c(function () { return [
            resolve(Footbar.a), Footbar.c,
            { b: Footbar.b }
        ]; });
        // Register foot bar component
        register(Footbar).d.c(function () {
            return [new lazy(function () { return resolve("frame"); })];
        });
    }
    box.$t = $t;
    var Footbar = /** @class */ (function (_super) {
        __extends(Footbar, _super);
        function Footbar(frame) {
            var _this = _super.call(this) || this;
            _this.d = frame || "foot";
            _this.i = [
                _this.$(_this.m),
                _this.$(_this.l)
            ];
            return _this;
        }
        ///////////////////////////////////////////////////////////////////////
        // #f => f
        Footbar.prototype.f = function (resolve) {
            var self = this._;
            var item = Footbar.c[0];
            item.u = self.k(resolve);
            item.v = item.a;
            Footbar.c[1].y = self.g.bind(self);
            self.e = resolve(Footbar.b);
            return resolve(Footbar.a).v;
        };
        // #g => g
        Footbar.prototype.g = function (sender, item) {
            alert("boxFootbar::onItem - " + item.a);
        };
        // #k => k
        Footbar.prototype.k = function (resolve) {
            var self = this._;
            return function () {
                var graph = self.d.x.editor.graph;
                var pane = new ui.Pane(null, {
                    b: "_xtline", e: true,
                    f: resolve(ui.Modal)
                });
                self.j =
                    new mxOutline(graph, pane.v);
                sys.Html.i(0, pane.v, // Keep event order
                [0, 6], self.i);
                self.h = pane;
                return pane;
            };
        };
        // #l => l
        Footbar.prototype.l = function (event) {
            var self = this._;
            var graph = self.d.x.editor.graph;
            var outline = self.j;
            console.log("boxFootbar::onHidden - " + outline);
            if (!(event.detail.q())) {
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
                sys.Html.i(1, self.h.v, [0, 6], self.i);
                outline.suspended = true;
                outline.destroy();
            }
        };
        // #m => m
        Footbar.prototype.m = function (event) {
            this.d.x.actions.get(event.deltaY < 0 ? "zoomIn" : "zoomOut").funct();
        };
        // #a => a
        Footbar.a = "_xtail";
        // #b => b
        Footbar.b = "_xtlist";
        // #c => c
        Footbar.c = [
            {
                t: 5,
                a: "outline",
            },
            {
                x: "XXX",
                a: "X"
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
            _this.$03 = [_this.$(_this.$04)];
            return _this;
        }
        // Create body
        Prompt.prototype.$5 = function () {
            _super.prototype.$5.call(this);
            var self = this._;
            var option = self.x;
            // Icon & label band
            var band = self.$3("_xdtip");
            new ui.Image(new ui.Pane(band, { b: "icon" }), {
                i: option.i
            });
            new ui.Text(band, { g: option.$01 });
            // Input band
            self.$00 = new ui.Textbox(self.$3(), {
                $0: option.$00,
                b: "_xdtext"
            });
            // Foot band confirm button
            new ui.Button(self.$1, {
                c: self.$(self.$01),
                g: option.$2,
                b: "ok"
            });
        };
        // #$01 => $01
        Prompt.prototype.$01 = function (sender) {
            var self = this._;
            var option = self.x;
            var input = self.$00.v;
            if (option.c)
                sys.$5(option.c, input.value);
            self.q(true);
        };
        // #$02 => $02
        Prompt.prototype.$02 = function (value) {
            var self = this._;
            self.$00.t({ g: value });
            if (self.v)
                sys.Html.i(0, self.v, [6], self.$03);
            _super.prototype.$4.call(this);
        };
        // #$04 => $04
        Prompt.prototype.$04 = function (event) {
            if (!event.detail.q()) {
                this.$00.v.focus();
            }
        };
        Prompt.prototype.r = function (html) {
            var self = this._;
            html.i(1, self.y, [6], self.$03);
            _super.prototype.r.call(this, html);
        };
        return Prompt;
    }(ui.Dialog));
    box.Prompt = Prompt;
// })(box || (box = {}));
//# sourceMappingURL=prompt.js.map
/// <reference path="prompt.ts"/>
// var box;
// (function (box) {
    // #$d => $d
    function $d(lazy, lang, register, resolve) {
        var uiModal = ui.Modal;
        // Configure link dialog
        var linkOption = {
            e: true,
            g: lang.b,
            $2: lang.c,
            $3: lang.a,
            f: resolve(uiModal),
            $00: "http://www.xphabit.com",
            $01: lang.d,
            $0: 185,
            $1: 460
        };
        linkOption.a =
            linkOption.i = "link";
        register(box.Prompt, "link").c(function () { return [null, linkOption]; });
    }
    box.$d = $d;
// })(box || (box = {}));
//# sourceMappingURL=dialogconfig.js.map
/// <reference path="../sys/core.ts"/>
/// <reference path="../ui/modal.ts"/>
/// <reference path="dialog/dialogconfig.ts"/>
// var box;
// (function (box) {
    // #$1 => $1
    function $1() {
        var sysPod = sys.Pod;
        var register = sysPod.y;
        register(ui.Modal).d;
        [box.$d, box.$e,
            box.$t, box.$f].forEach(function (x) { return x.call(box, sys.Lazy, box.Lang, register, sysPod.x); });
    }
    box.$1 = $1;
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
        // #a => a
        Format.prototype.a = function (language, wrap, items) {
            var classRight = "right";
            var modal = sys.Pod.x(ui.Modal);
            for (var index = 0; index < items.length; index++) {
                var item = items[index];
                var pane = new ui.Pane(null, { b: "_xfband" });
                new ui.Text(pane, { g: item.x });
                var action = item.y;
                item.d = pane;
                // Resuse b here
                switch (item.b) {
                    case 1:
                        new ui.Toggle(pane, {
                            d: item.sd,
                            $0: item.z,
                            g: item.w,
                            a: item.a,
                            b: classRight,
                            c: action,
                        });
                        break;
                    case 3:
                        new ui.DropColor(pane, {
                            c: action,
                            b: classRight,
                            d: item.sd,
                            a: item.a,
                            $1: item.e,
                            $2: 2,
                            $0: function () {
                                return new ui.Color(null, {
                                    $3: language.i,
                                    f: modal,
                                });
                            }
                        });
                        break;
                    case 2:
                        new ui.Spinner(pane, {
                            $0: item.e,
                            a: item.a,
                            d: item.sd,
                            b: classRight,
                        });
                        break;
                    case 4:
                        new ui.Button(pane, {
                            b: classRight,
                            d: item.sd,
                            c: action,
                        });
                        break;
                }
            }
        };
        // #b => b
        Format.prototype.b = function (title) {
            var classPane = ui.Pane;
            var pane = new classPane(null, { b: "_xfpane" });
            new ui.Text(new classPane(pane, { b: "_xfhead" }), { g: title });
            return pane;
        };
        // #c => c
        Format.prototype.c = function (item) {
            var pane = item.d;
            var disabled = item.sd;
            if (pane && pane.z.length > 1) {
                switch (item.b) {
                    case 1:
                        pane.z[1].t({
                            $0: item.z,
                            d: disabled
                        });
                        break;
                    case 3:
                        pane.z[1].t({
                            $1: item.e,
                            d: disabled
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
            // #b => b
            _this.b = [
                {
                    b: 1,
                    a: "connectionArrows",
                },
                {
                    b: 1,
                    a: "connectionPoints",
                },
                {
                    b: 1,
                    a: "guides",
                },
            ];
            // #i => i
            _this.i = [
                {
                    b: 1,
                    a: "grid",
                },
                {
                    b: 3,
                    a: "gridColor",
                },
                {
                    b: 2,
                    a: "gridSize",
                },
                {
                    b: 1,
                    a: "pageView",
                },
                {
                    b: 1,
                    a: "background",
                },
                {
                    b: 3,
                    a: "backgroundColor",
                },
                {
                    b: 4,
                    a: "backgroundImage",
                },
            ];
            _this.a = frame || "diagram";
            _this.h = language;
            _this.d = helper;
            return _this;
        }
        // #c => c
        Diagram.prototype.c = function () {
            var classPane = ui.Pane;
            var self = this._;
            var pane = self.d.b(self.h.e);
            // Create list item
            var list = new ui.List(pane, self.b, { b: "_xflist" });
            var frame = self.a.x;
            var graph = frame.editor.graph;
            // Initialize and bind action
            var isGraphEnabled = graph.isEnabled();
            var checkValue = [graph.connectionArrowsEnabled,
                graph.connectionHandler.isEnabled(), graph.graphHandler.guidesEnabled];
            var textValue = [self.h.f,
                self.h.f, self.h.h];
            for (var index = 0; index < 3; index++) {
                var item = self.b[index];
                item.z = checkValue[index];
                item.sd = !isGraphEnabled;
                item.y = function (sender, value) { frame.actions.get(sender.x.a).funct(); };
                item.x = textValue[index];
            }
            self.d.a(self.h, list, self.b);
            return pane;
        };
        // #e => e
        Diagram.prototype.e = function () {
            var self = this._;
            var frame = self.a.x;
            var optionActions = [
                "connectionArrowsChanged", "connectionPointsChanged", "guidesEnabledChanged"
            ];
            var _loop_1 = function (index) {
                frame.addListener(optionActions[index], function () { self.g(index); });
            };
            for (var index = 0; index < 3; index++) {
                _loop_1(index);
            }
            var viewActions = ["gridEnabledChanged", "gridColorChanged", "none",
                "pageViewChanged", "backgroundColorChanged", "backgroundColorChanged"];
            var _loop_2 = function (index) {
                frame.addListener(viewActions[index], function () { self.k(index); });
            };
            for (var index = 0; index < 5; index++) {
                _loop_2(index);
            }
        };
        // #f => f
        Diagram.prototype.f = function () {
            var self = this._;
            self.b.concat(self.i).forEach(function (x) { delete x.d; });
        };
        // #g => g
        Diagram.prototype.g = function (index) {
            var self = this._;
            var frame = self.a.x;
            var item = self.b[index];
            var graph = frame.editor.graph;
            var checkValue = [graph.connectionArrowsEnabled,
                graph.connectionHandler.isEnabled(), graph.graphHandler.guidesEnabled];
            item.sd = !graph.isEnabled();
            item.z = checkValue[index];
            self.d.
                c(item);
        };
        // #j => j
        Diagram.prototype.j = function () {
            var classPane = ui.Pane;
            var self = this._;
            var pane = self.d.b("View");
            // Create list item
            var list = new ui.List(pane, self.i, { b: "_xflist" });
            var frame = self.a.x;
            var graph = frame.editor.graph;
            // Initialize and bind action
            var isGraphEnabled = graph.isEnabled();
            var textValue = ["Grid", " > color", " > size", "PageView", "Background", " > Color", " > Image"];
            for (var index = 0; index < self.i.length; index++) {
                var item_1 = self.i[index];
                item_1.x = textValue[index];
            }
            // Grid option
            var item = self.i[0];
            var gridEnabled = graph.isGridEnabled();
            item.y = function (sender, value) {
                graph.setGridEnabled(!graph.isGridEnabled());
                frame.fireEvent(new mxEventObject("gridEnabledChanged"));
            };
            item.z = gridEnabled;
            item = self.i[1];
            item.y = function (sender, color) { frame.setGridColor(color); };
            item.e = graph.view.gridColor;
            item.sd = !gridEnabled;
            item = self.i[2];
            item.e = graph.getGridSize();
            item.sd = !gridEnabled;
            // Page view
            item = self.i[3];
            item.y = function (sender, value) { frame.actions.get("pageView").funct(); };
            item.z = graph.pageVisible;
            item.sd = !isGraphEnabled;
            // Background
            item = self.i[4];
            item.y = function (sender, value) {
                self.l(frame, graph, value ? "#ffffff" : "none");
            };
            item.z = graph.background != "none";
            item.sd = !isGraphEnabled;
            // BackgroundColor
            item = self.i[5];
            item.y = function (sender, value) { self.l(frame, graph, value); };
            item.sd = !isGraphEnabled || graph.background == "none";
            item.e = graph.background;
            item = self.i[6];
            item.y = function (sender) { frame.showBackgroundImageDialog(); };
            // Initialize and bind action
            self.d.a(self.h, list, self.i);
            return pane;
        };
        // #k => k
        Diagram.prototype.k = function (index) {
            var self = this._;
            var frame = self.a.x;
            var helper = self.d;
            var graph = frame.editor.graph;
            // Update grid enable
            var isGraphEnabled = graph.isEnabled();
            var isGridEnabled = graph.isGridEnabled();
            var item = self.i[index];
            switch (index) {
                case 0: // Grid enabled
                    item.z = isGridEnabled;
                    helper.c(item);
                    self.k(1);
                    self.k(2);
                    break;
                case 1: // Grid color
                    item.e = graph.view.gridColor;
                    item.sd = !isGridEnabled;
                    helper.c(item);
                    break;
                case 3: // Page view
                    item.z = graph.pageVisible;
                    item.sd = !isGraphEnabled;
                    helper.c(item);
                    break;
                case 4: // Background
                    item.z = graph.background != "none";
                    item.sd = !isGraphEnabled;
                    helper.c(item);
                    self.k(5);
                    break;
                case 5: // Background color
                    item.e = graph.background;
                    item.sd = !isGraphEnabled || graph.background == "none";
                    helper.c(item);
                    break;
            }
        };
        // #l => l
        Diagram.prototype.l = function (frame, graph, color) {
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
    // #$f => $f
    function $f(lazy, lang, register, resolve) {
        // Resigtser helper
        register(box.Format).d;
        // Register diagram component
        register(box.Diagram).d.c(function () {
            return [new lazy(function () { return resolve("frame"); }), resolve(box.Format), lang];
        });
    }
    box.$f = $f;
})(box || (box = {}));
//# sourceMappingURL=formatconfig.js.map

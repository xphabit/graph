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
var sys;
(function (sys) {
    // #$1 => $1
    function $1(param) {
        return typeof param !== "undefined";
    }
    sys.$1 = $1;
    // #$2 => $2
    function $2(param) {
        return typeof param === "function";
    }
    sys.$2 = $2;
    // #$3 => $3
    function $3(param) {
        return typeof param === "string";
    }
    sys.$3 = $3;
    // #$4 => $4
    function $4(unbox, color) {
        return (!color || color == "none" || color.charAt(0) == '#') ? color : (unbox == 0 ? color.substring(1) : "#" + color);
    }
    sys.$4 = $4;
    // #$5 => $5
    function $5(handler) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var what = window;
        if (handler) {
            what.setTimeout(function () {
                if (handler) {
                    handler.apply(what, args);
                }
            }, 0);
        }
    }
    sys.$5 = $5;
    // #$6 => $6
    function $6(url, option) {
        option = option || { d: null };
        option.b = option.b || "POST";
        var xmlRequest = new XMLHttpRequest();
        xmlRequest.open(option.b, url, true);
        if (!option.a && option.b == "POST")
            xmlRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        else
            option.a(xmlRequest);
        xmlRequest.send(option.d);
        xmlRequest.onreadystatechange = function () {
            if (xmlRequest.readyState == 4) {
                if (option.c)
                    option.c(xmlRequest, xmlRequest.response);
                xmlRequest = null;
            }
        };
    }
    sys.$6 = $6;
    ///////////////////////////////////////////////////////////////////////////
    // Export a basic class
    var xObject = /** @class */ (function () {
        function xObject() {
        }
        Object.defineProperty(xObject.prototype, "_", {
            // #_ => _
            get: function () {
                return this;
            },
            enumerable: true,
            configurable: true
        });
        // #$ => $
        xObject.prototype.$ = function (target) {
            return target.bind(this);
        };
        return xObject;
    }());
    sys.xObject = xObject;
    // Export lazy class
    var Lazy = /** @class */ (function (_super) {
        __extends(Lazy, _super);
        // #y => y
        function Lazy(y) {
            var _this = _super.call(this) || this;
            _this.y = y;
            return _this;
        }
        Object.defineProperty(Lazy.prototype, "x", {
            // Return lazy value
            // #x => x
            get: function () {
                var self = this._;
                if (!self.z)
                    self.z = self.y();
                return self.z;
            },
            enumerable: true,
            configurable: true
        });
        return Lazy;
    }(xObject));
    sys.Lazy = Lazy;
    var Bean = /** @class */ (function (_super) {
        __extends(Bean, _super);
        // The default constructor to create a Registion
        function Bean(service) {
            var _this = _super.call(this) || this;
            _this.w = service || new Function();
            return _this;
        }
        // Create an instance
        // #a => a
        Bean.prototype.a = function () {
            var self = this._;
            if (!self.z || !self.v) {
                if (!self.x)
                    self.v = new (Function.prototype.bind.apply(self.w, [{}].concat(self.y ? self.y() : [])))();
                else
                    self.v = self.x();
            }
            return self.v;
        };
        // #b => b
        // The factory used to create instance
        Bean.prototype.b = function (factoryGetter) {
            this.x = factoryGetter;
            return this;
        };
        // #c => c
        // The parameters used to create an instance
        Bean.prototype.c = function (paramGetter) {
            this.y = paramGetter;
            return this;
        };
        Object.defineProperty(Bean.prototype, "d", {
            // #d => d
            // Should be a signleton of DI item
            get: function () {
                this.z = true;
                return this;
            },
            enumerable: true,
            configurable: true
        });
        return Bean;
    }(xObject));
    sys.Bean = Bean;
    // The typescript IOC container
    //
    var Pod = /** @class */ (function () {
        function Pod() {
        }
        // #y => y
        // Register a service into container, service is a class of TypeScript or function of javascript
        Pod.y = function (service, name) {
            var bean = new Bean(service);
            console.log(name ? name : service.toString());
            Pod.z[name ? name :
                window.btoa(service.toString())] = bean;
            return bean;
        };
        // #x => x
        // Resolve an instance of a TypeScript service
        Pod.x = function (service) {
            var hashKey = "#";
            if (sys.$2(service))
                hashKey = window.btoa(service.toString());
            else if (typeof service == "string")
                hashKey = service;
            var bean = Pod.z[hashKey];
            if (bean)
                return bean.a();
            else
                return null;
        };
        // #z => z
        Pod.z = {};
        return Pod;
    }());
    sys.Pod = Pod;
// })(sys || (sys = {}));
//# sourceMappingURL=core.js.map
/// <reference path="core.ts"/>
// var sys;
// (function (sys) {
    var Html = /** @class */ (function () {
        function Html() {
        }
        // #a => a
        Html.a = function () {
            return document.body;
        };
        // #b => b
        Html.b = function () {
            return document.documentElement;
        };
        // #c => c
        Html.c = function (element, target) {
            target = target || Html.a();
            target.appendChild(element);
            return target;
        };
        // #d => d
        Html.d = function (element) {
            var what = window;
            if (element)
                return element.getBoundingClientRect();
            else {
                var body = Html.a();
                var document_1 = Html.b();
                return {
                    left: 0, top: 0, right: (what.innerWidth || document_1.clientWidth || body.clientWidth) - 1,
                    bottom: (what.innerHeight || document_1.clientHeight || body.clientHeight) - 1,
                    height: 0, width: 0
                };
            }
        };
        // #e => e
        Html.e = function (id) {
            return document.getElementById(id);
        };
        // #f => f
        Html.f = function (element, name, value) {
            if (sys.$1(value))
                element.setAttribute(name, value);
            else
                element.removeAttribute(name);
        };
        // #g => g
        Html.g = function (element, style) {
            element.style.cssText = style;
        };
        // #h => h
        Html.h = function (tagName, className) {
            var element = document.createElement(tagName);
            if (className)
                element.className = className;
            return element;
        };
        // #i => i
        // action = define.$constActionRemoveEvent = 0
        // action = define.$constActionAddEvent = 1
        Html.i = function (action, element, eventId, eventBinder) {
            if (element && eventId && eventBinder) {
                var what = Html.y[action % 2] + "EventListener";
                for (var index = 0; index < eventId.length; index++) {
                    element[what](Html.z[eventId[index]], eventBinder[index]);
                }
            }
        };
        // #j => j
        Html.j = function (x, y, element) {
            var r = Html.d(element || Html.b());
            return x >= r.left && x <= r.right &&
                y >= r.top && y <= r.bottom;
        };
        // #k => k
        Html.k = function (action, element, classNames) {
            if (classNames && element) {
                classNames.forEach(function (className) {
                    element.classList[Html.y[action % 2]](className);
                });
            }
        };
        // Has the class
        // #l => l
        Html.l = function (element, className) {
            return element && element.classList.contains(className);
        };
        // #m => m
        Html.m = function (selectors, element) {
            return (element || Html.b()).querySelectorAll(selectors);
        };
        // #n => n
        Html.n = function (id) {
            return (new sys.Svg("svg")).a(id).t;
        };
        // #o => o
        // %place = define.$const_placeWhere
        Html.o = function (place, x, y) {
            var rect = Html.d();
            return place == 2 ? "right:" + (rect.right - x) + "px;top:" + y + "px;" : (place == 3 ? "left:" + x + "px;bottom:" + (rect.bottom - y) + "px;" : (place == 5 ? "right:" + (rect.right - x) + "px;bottom:" + (rect.bottom - y) + "px;" :
                "left:" + x + "px;top:" + y + "px;"));
        };
        // #z => z
        Html.z = [
            "mousewheel", "mousedown", "mouseup", "mousemove", "mouseleave",
            "click", "hidden", "context", "change", "keydown"
        ];
        // #y => y
        Html.y = ["add", "remove"];
        return Html;
    }());
    sys.Html = Html;
// })(sys || (sys = {}));
//# sourceMappingURL=html.js.map
/// <reference path="core.ts"/>
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
// var sys;
// (function (sys) {
    var Svg = /** @class */ (function (_super) {
        __extends(Svg, _super);
        ///////////////////////////////////////////////////////////////////////
        function Svg(tag, parent) {
            var _this = _super.call(this) || this;
            _this.t = parent;
            _this.u = Svg.x(tag);
            if (parent)
                parent.appendChild(_this.u);
            return _this;
        }
        // #z => z
        Svg.z = function () {
            return "http://www.w3.org/2000/svg";
        };
        // #y => y
        Svg.y = function () {
            return "http://www.w3.org/1999/xlink";
        };
        // #x => x
        Svg.x = function (tag) {
            return document.createElementNS(Svg.z(), tag);
        };
        // #w => w
        Svg.w = function (element, name, value, _namespace) {
            if (_namespace === void 0) { _namespace = null; }
            element.setAttributeNS(_namespace, name, value);
        };
        // #a => a
        Svg.prototype.a = function (id) {
            var objUse = new Svg("use", this.u);
            Svg.w(objUse.u, "xlink:href", "#" + id, Svg.y());
            return objUse;
        };
        return Svg;
    }(sys.xObject));
    sys.Svg = Svg;
})(sys || (sys = {}));
//# sourceMappingURL=svg.js.map
/// <reference path="../sys/core.ts"/>
/// <reference path="../sys/html.ts"/>
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
var ui;
(function (ui) {
    var Control = /** @class */ (function (_super) {
        __extends(Control, _super);
        /////////////////////////////////////////////////////////////////////////////
        // The default constructor
        function Control(parent, option) {
            var _this = _super.call(this) || this;
            // The kid list
            // #z => z
            _this.z = [];
            if (parent)
                parent.z.push(_this);
            _this.x = option || {};
            _this.w = parent;
            return _this;
        }
        Object.defineProperty(Control.prototype, "v", {
            // #v => v
            get: function () {
                var self = this._;
                if (!self.y)
                    self.u(sys.Html);
                return self.y;
            },
            enumerable: true,
            configurable: true
        });
        /////////////////////////////////////////////////////////////////////////////
        // Create the control
        // The function will be called by child
        // #u => u
        Control.prototype.u = function (html) {
            var self = this._;
            if (self.y) {
                self.z.forEach(function (kid) {
                    html.c(kid.v, self.y);
                });
                self.m(self, self.x);
            }
        };
        // Update the control accord option
        // #t => t
        Control.prototype.t = function (param) {
            var self = this._;
            var option = self.x;
            ["c", "d",
                "e", "g", "h"].
                forEach(function (item) {
                if (sys.$1(param[item]))
                    option[item] = param[item];
            });
            if (self.y) {
                self.m(self, option);
            }
        };
        // Remove a kid from children list
        // #s => s
        Control.prototype.s = function (kid) {
            var list = this.z;
            var index = list.indexOf(kid);
            if (index >= 0) {
                list.splice(index, 1);
            }
        };
        // Destroy the object
        // #r => r
        Control.prototype.r = function (html) {
            var self = this._;
            if (self.w)
                self.w.s(self);
            while (self.z.length > 0)
                self.z[0].r(html);
        };
        // Hidden of the control
        // #q => q
        Control.prototype.q = function (value) {
            var self = this._;
            var control = self.y;
            if (control) {
                if (sys.$1(value) && control.hidden != value) {
                    control.hidden = value;
                    self.z.forEach(function (kid) { return kid.q(value); });
                    control.dispatchEvent(new CustomEvent("hidden", { "detail": self }));
                }
                return control.hidden;
            }
        };
        /////////////////////////////////////////////////////////////////////////////
        // Setup modal
        // #p => p
        Control.prototype.p = function (on) {
            var self = this._;
            if (self.x.f) {
                on ? sys.Html.c(self.y) :
                    self.y.remove();
            }
        };
        // Display picker at point
        // align - undefine: left, define: right
        // #o => o
        //  %place = define.$const_placeWhere
        Control.prototype.o = function (x, y, place) {
            var html = sys.Html;
            var self = this._;
            var modal = self.x.f;
            if (modal) {
                var element = self.v;
                html.g(element, html.o(place || 0, x, y));
                html.k(0, element, ["_xpopup"]);
                modal.$5(self);
            }
        };
        // Quit modal
        // #n => n
        Control.prototype.n = function () {
            var modal = this.x.f;
            if (modal) {
                modal.$6();
            }
        };
        // #m => m
        Control.prototype.m = function (self, option) {
            self.y["disabled"] = !!option.d;
            self.y.hidden = !!option.e;
            if (option.a) {
                self.y.dataset.id =
                    option.a;
            }
        };
        return Control;
    }(sys.xObject));
    ui.Control = Control;
// })(ui || (ui = {}));
//# sourceMappingURL=control.js.map
// The modal manager control
//
// @Histroy
//   2018/06/20  Heyang  Initial version
//
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
/// <reference path="../sys/html.ts"/>
/// <reference path="control.ts"/>
// var ui;
// (function (ui) {
    var Modal = /** @class */ (function (_super) {
        __extends(Modal, _super);
        ///////////////////////////////////////////////////////////////////////
        // The default constructor
        function Modal(option) {
            var _this = _super.call(this, null, option) || this;
            // #$0 => $0
            _this.$0 = [];
            var html = sys.Html;
            _this.y = html.h("div", "_xmodal");
            _this.$4(_this, html);
            return _this;
        }
        // #$4 => $4
        Modal.prototype.$4 = function (self, html) {
            self.y.hidden = true;
            self.$1 = [self.$(self.$8)];
            self.$3 = [self.$(self.$9), self.$(self.x2)];
            self.$2 = [self.$(self.$7)];
            html.c(self.y);
        };
        // Show target component
        // #$5 => $5
        Modal.prototype.$5 = function (target, mask) {
            var html = sys.Html;
            var self = this._;
            html.k([1,
                0][Number(!!mask)], self.y, ["_xmask"]);
            html.i(0, target.v, [6], self.$2);
            target.q(false);
        };
        // Quit modal state
        // #$6 => $6
        Modal.prototype.$6 = function () {
            this.$0.forEach(function (target) { return target.q(true); });
        };
        // Handle target hidden/show
        // #$7 => $7
        Modal.prototype.$7 = function (event) {
            var html = sys.Html;
            var self = this._;
            if (event.detail.q()) {
                var top_1 = self.$0.pop();
                if (self.$0.length == 0) {
                    self.x1(html);
                    html.i(1, top_1.v, [6], self.$2);
                    top_1.r(html);
                }
            }
            else {
                self.$0.push(event.detail);
                if (self.$0.length == 1)
                    self.x0(html);
            }
        };
        // Keydown on document 
        // #$8 => $8
        Modal.prototype.$8 = function (event) {
            if (event.keyCode == 27) { // ESC to hide the top item
                event.stopPropagation();
                var targets = this.$0;
                if (targets.length > 0) {
                    var index = targets.length - 1;
                    targets[index].q(true);
                }
            }
        };
        // Mouse down handler
        // #$9 => $9
        Modal.prototype.$9 = function (event) {
            var bound = false;
            this.$0.forEach(function (item) { return bound = bound ||
                sys.Html.j(event.pageX, event.pageY, item.v); });
            if (!bound) {
                this.$0.forEach(function (item) {
                    return item.q(true);
                });
            }
        };
        // Hook system event
        // #x0 => x0
        Modal.prototype.x0 = function (html) {
            var self = this._;
            html.i(0, self.y, [1, 7], self.$3);
            html.i(0, html.b(), [9], self.$1);
            self.q(false);
        };
        // Unhook system event
        // #x1 => x1
        Modal.prototype.x1 = function (html) {
            var self = this._;
            html.i(1, self.y, [1, 7], self.$3);
            html.i(1, html.b(), [9], self.$1);
            self.q(true);
        };
        // #x2 => x2
        Modal.prototype.x2 = function (event) {
            this.$0.forEach(function (item) { return item.q(true); });
            return false;
        };
        return Modal;
    }(ui.Control));
    ui.Modal = Modal;
// })(ui || (ui = {}));
//# sourceMappingURL=modal.js.map
/// <reference path="control.ts"/>
/// <reference path="../sys/svg.ts"/>
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
// var ui;
// (function (ui) {
    ///////////////////////////////////////////////////////////////////////////////////////////////
    //
    // Button control
    //
    var Button = /** @class */ (function (_super) {
        __extends(Button, _super);
        // Default constructor
        function Button(parent, option) {
            var _this = _super.call(this, parent, option) || this;
            _this.$0 = [_this.$(_this.$1)]; // Keep event order
            return _this;
        }
        // Create control
        Button.prototype.u = function (html) {
            var self = this._;
            var option = self.x;
            self.y = html.h("button", option.b);
            if (option.c)
                html.i(0, self.y, [5], self.$0);
            if (option.g)
                self.y.innerText = option.g;
            if (option.h)
                html.f(self.y, "title", option.h);
            _super.prototype.u.call(this, html);
        };
        // #$1 => $1
        Button.prototype.$1 = function (event) {
            event.stopPropagation();
            sys.$5(this.x.c, this);
        };
        // Remove the control
        Button.prototype.r = function (html) {
            var self = this._;
            if (self.x.c)
                html.i(1, self.y, [5], self.$0);
            _super.prototype.r.call(this, html);
        };
        return Button;
    }(ui.Control));
    ui.Button = Button;
    ///////////////////////////////////////////////////////////////////////////////////////////////
    //
    // Image control
    //
    var Image = /** @class */ (function (_super) {
        __extends(Image, _super);
        function Image(parent, option) {
            var _this = this;
            option = option || {};
            option.$0 =
                option.$0 || "svg";
            _this = _super.call(this, parent, option) || this;
            return _this;
        }
        Image.prototype.u = function (html) {
            var self = this._;
            var option = self.x;
            if (option.$0 == "svg") {
                self.y = html.n(option.i);
                if (option.b)
                    self.y.className = option.b;
            }
        };
        return Image;
    }(ui.Control));
    ui.Image = Image;
    ///////////////////////////////////////////////////////////////////////////////////////////////
    //
    // Text control
    //
    var Text = /** @class */ (function (_super) {
        __extends(Text, _super);
        // Default constructor
        function Text(parent, option) {
            var _this = this;
            option = option || {};
            option.$0 =
                option.$0 || "span";
            _this = _super.call(this, parent, option) || this;
            return _this;
        }
        // Create the control
        Text.prototype.u = function (html) {
            var self = this._;
            var option = self.x;
            self.y = html.h(option.$0, option.b);
            if (option.g)
                self.y.innerText = option.g;
            _super.prototype.u.call(this, html);
        };
        // Update the control
        Text.prototype.t = function (param) {
            _super.prototype.t.call(this, param);
            var self = this._;
            if (self.y &&
                self.x.g) {
                self.y.innerText = self.x.
                    g;
            }
        };
        return Text;
    }(ui.Control));
    ui.Text = Text;
    ///////////////////////////////////////////////////////////////////////////////////////////////
    //
    // Pane control
    //
    var Pane = /** @class */ (function (_super) {
        __extends(Pane, _super);
        // Default constructor
        function Pane(parent, option) {
            return _super.call(this, parent, option) || this;
        }
        // Create a control
        Pane.prototype.u = function (html) {
            var self = this._;
            self.y = html.h("div", self.x.b);
            self.p(true); // Setup modal
            _super.prototype.u.call(this, html);
        };
        // Remove control
        Pane.prototype.r = function (html) {
            this.p(false);
            _super.prototype.r.call(this, html);
        };
        return Pane;
    }(ui.Control));
    ui.Pane = Pane;
// })(ui || (ui = {}));
//# sourceMappingURL=common.js.map
/// <reference path="Control.ts"/>
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
// var ui;
// (function (ui) {
    var Textbox = /** @class */ (function (_super) {
        __extends(Textbox, _super);
        // Default constructor
        function Textbox(parent, option) {
            var _this = _super.call(this, parent, option) || this;
            _this.$0 = [_this.$(_this.$1)];
            return _this;
        }
        // Create the control
        Textbox.prototype.u = function (html) {
            var self = this._;
            var option = self.x;
            var mutipleLines = option.$2 > 0 || option.$3 > 0;
            self.y = html.h(mutipleLines ? "textarea" : "input", option.b);
            var input = self.y;
            if (option.$0)
                input.placeholder = option.$0;
            if (option.$1)
                input.maxLength = option.$1;
            if (mutipleLines) {
                var area = self.y;
                area.rows = option.$2;
                area.cols = option.$3;
            }
            if (self.x.c)
                html.i(0, input, [8], self.$0);
            if (option.g)
                input.value = option.g;
            _super.prototype.u.call(this, html);
        };
        // Update the control
        Textbox.prototype.t = function (param) {
            _super.prototype.t.call(this, param);
            var self = this._;
            var input = self.y;
            if (input && self.x.g)
                input.value = self.x.
                    g;
        };
        // #$1 => $1
        Textbox.prototype.$1 = function (event) {
            var self = this._;
            sys.$5(self.x.c, self, self.y.value);
        };
        // Remove the control
        Textbox.prototype.r = function (html) {
            var self = this._;
            if (self.x.c)
                html.i(1, self.y, [8], self.$0);
            _super.prototype.r.call(this, html);
        };
        return Textbox;
    }(ui.Control));
    ui.Textbox = Textbox;
// })(ui || (ui = {}));
//# sourceMappingURL=textbox.js.map
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
// var ui;
// (function (ui) {
    var List = /** @class */ (function (_super) {
        __extends(List, _super);
        ////Functions//////////////////////////////////////////////////////////
        // Default constructor
        function List(parent, items, option) {
            var _this = _super.call(this, parent, option) || this;
            _this.$0 = items || [];
            return _this;
        }
        // Create the control
        List.prototype.u = function (html) {
            var self = this._;
            self.y = html.h("ul", self.x.b);
            html.k(0, self.y, ["_xlist"]);
            self.$0.forEach(function (item) { self.$2(html, item); });
            _super.prototype.u.call(this, html);
        };
        // Create an item
        // #$2 => $2
        List.prototype.$2 = function (html, item) {
            var self = this._;
            var listItem = html.h("li", item.b);
            html.k(0, listItem, [List.$1]);
            if (item.a)
                listItem.dataset.id = item.a;
            if (item.d)
                html.c(item.d.v, listItem);
            if (item.c)
                listItem.hidden = true;
            html.c(listItem, self.y);
            return listItem;
        };
        // #$1 => $1
        List.$1 = "_xlitem";
        return List;
    }(ui.Control));
    ui.List = List;
// })(ui || (ui = {}));
//# sourceMappingURL=list.js.map
/// <reference path="../sys/html.ts"/>
/// <reference path="control.ts"/>
/// <reference path="common.ts"/>
/// <reference path="list.ts"/>
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
// var ui;
// (function (ui) {
    var Toolist = /** @class */ (function (_super) {
        __extends(Toolist, _super);
        ////Functions//////////////////////////////////////////////////////////
        // Default constructor
        function Toolist(parent, items, option) {
            var _this = _super.call(this, parent, items, option) || this;
            _this.$00 = [
                _this.$(_this.$7),
                _this.$(_this.$9),
                _this.$(_this.$5)
            ];
            return _this;
        }
        // Create the control
        Toolist.prototype.u = function (html) {
            _super.prototype.u.call(this, html);
            html.i(0, this.y, [5, 4, 3], this.$00);
        };
        Toolist.prototype.$2 = function (html, item) {
            var className = [];
            var listItem = _super.prototype.$2.call(this, html, item);
            var _item = item;
            if (_item.v && !_item.d)
                html.c(html.n(_item.v), listItem);
            if (_item.sd)
                className.push("disabled");
            if (_item.z)
                className.push("checked");
            if (_item.u)
                className.push("drop");
            else if (_item.w)
                className.push("tip");
            if (className.length > 0)
                html.k(0, listItem, className);
            return listItem;
        };
        ////Event Handler//////////////////////////////////////////////////////
        // #$5 => $5
        Toolist.prototype.$5 = function (event) {
            var self = this._;
            var element = self.x2(event.srcElement);
            self.$6(self.x3(element), element);
        };
        // hover on item
        // #$6 => $6
        Toolist.prototype.$6 = function (item, element) {
            this.x1(item, element);
        };
        ///////////////////////////////////////////////////////////////////////
        // #$7 => $7
        Toolist.prototype.$7 = function (event) {
            var self = this._;
            var element = self.x2(event.srcElement);
            var item = self.x3(element);
            if (item && !item.sd &&
                sys.Html.l(element, ui.List.$1)) {
                event.stopPropagation();
                self.$8(item, element);
            }
        };
        // Handle click on item
        // #$8 => $8
        Toolist.prototype.$8 = function (item, element) {
            var self = this._;
            if (item.u) {
                var html = sys.Html;
                var r = self.x7(item.t, html.d(element));
                item.u().o(r.left, r.top, item.t);
            }
            else {
                sys.$5(item.y ? item.y :
                    self.x.c, self, item);
            }
        };
        // #$9 => $9
        Toolist.prototype.$9 = function (event) {
            this.x0();
        };
        // Handle leave on control
        // #x0 => x0
        Toolist.prototype.x0 = function () {
            this.x1();
        };
        ////Additionial function///////////////////////////////////////////////
        // #x1 => x1
        Toolist.prototype.x1 = function (item, element) {
            this.x6(false, true);
            if (item && !item.sd && element)
                sys.Html.k(0, element, ["on"]);
        };
        // #x2 => x2
        Toolist.prototype.x2 = function (element) {
            while (element && element.nodeName && element.nodeName != "LI")
                element = element.parentElement;
            if (element && sys.Html.l(element, ui.List.$1))
                return element;
            return null;
        };
        // #x3 => x3
        Toolist.prototype.x3 = function (element) {
            var items = this.$0;
            for (var index = 0; element && index < items.length; index++) {
                var item = items[index];
                if (item.a == element.dataset.id) {
                    return item;
                }
            }
            return null;
        };
        // #x6 => x6
        Toolist.prototype.x6 = function (down, on) {
            var self = this._;
            console.log("uiList::blank - " + this.x6.caller.toString());
            [].forEach.call(sys.Html.m("li._xlitem", self.y), function (item) {
                var classList = item.classList;
                if (down)
                    classList.remove("down");
                if (on)
                    classList.remove("on");
            });
        };
        // #x7 => x7
        Toolist.prototype.x7 = function (place, rect) {
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
        Toolist.prototype.r = function (html) {
            var self = this._;
            html.i(1, this.y, [5, 4, 3], this.$00);
            _super.prototype.r.call(this, html);
        };
        return Toolist;
    }(ui.List));
    ui.Toolist = Toolist;
// })(ui || (ui = {}));
//# sourceMappingURL=toolist.js.map
/// <reference path="control.ts"/>
/// <reference path="common.ts"/>
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
// var ui;
// (function (ui) {
    var Dialog = /** @class */ (function (_super) {
        __extends(Dialog, _super);
        ////Functions//////////////////////////////////////////////////////////
        // Default constructor
        function Dialog(parent, option) {
            var _this = _super.call(this, parent, option) || this;
            var closebind = _this.$(_this.$8);
            _this.$0 = _this.$6();
            _this.$1 = _this.$7(closebind);
            new ui.Text(new ui.Button(_this, { c: closebind,
                b: "_xdoff" }));
            _this.$5();
            return _this;
        }
        // Create a band
        // #$3 => $3
        Dialog.prototype.$3 = function (className) {
            return new ui.Pane(this.$2, {
                b: "_xdband" + (className ? " " + className : "")
            });
        };
        // Display the dialog
        // #$4 => $4
        Dialog.prototype.$4 = function () {
            var self = this._;
            var option = self.x;
            sys.Html.g(self.v, "width:" + option.$1 + "px;height:" + option.$0 + "px;margin-left:" + -option.$1 / 2 + "px;margin-top:" + -option.$0 * 3 / 4 + "px");
            option.f.$5(self, true);
        };
        // Create the component
        Dialog.prototype.u = function (html) {
            var self = this._;
            var option = self.x;
            var id = option.a;
            self.y = html.h("div", option.b);
            html.k(0, self.y, ["_xdlg"]);
            if (sys.$1(option.e))
                self.y.hidden = option.e;
            self.y.id = id;
            self.p(true); // Setup modal
            _super.prototype.u.call(this, html);
        };
        // Create dialog body
        // #$5 => $5
        Dialog.prototype.$5 = function () {
            this.$2 = new ui.Pane(this, { b: "_xdbody" });
        };
        // #$6 => $6
        Dialog.prototype.$6 = function () {
            var self = this._;
            var title = new ui.Pane(self, { b: "_xdtitle" });
            new ui.Text(title, { g: self.x.g });
            return title;
        };
        // #$7 => $7
        Dialog.prototype.$7 = function (onClosebind) {
            var self = this._;
            var foot = new ui.Pane(self, { b: "_xdfoot" });
            new ui.Button(foot, {
                c: onClosebind,
                g: self.x.$3
            });
            return foot;
        };
        // #$8 => $8
        Dialog.prototype.$8 = function (sender) {
            this.q(true);
        };
        // Destroy the component
        Dialog.prototype.r = function (html) {
            this.p(false);
            _super.prototype.r.call(this, html);
        };
        return Dialog;
    }(ui.Control));
    ui.Dialog = Dialog;
// })(ui || (ui = {}));
//# sourceMappingURL=dialog.js.map
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
// var ui;
// (function (ui) {
    var Color = /** @class */ (function (_super) {
        __extends(Color, _super);
        ///////////////////////////////////////////////////////////////////////
        function Color(parent, option) {
            var _this = _super.call(this, parent, option) || this;
            // #$1 => $1
            _this.$1 = [
                'E6D0DE', 'CDA2BE', 'B5739D', 'E1D5E7', 'C3ABD0', 'A680B8', 'D4E1F5', 'A9C4EB', '7EA6E0', 'D5E8D4', '9AC7BF', '67AB9F',
                'D5E8D4', 'B9E0A5', '97D077', 'FFF2CC', 'FFE599', 'FFD966', 'FFF4C3', 'FFCE9F', 'FFB570', 'F8CECC', 'F19C99', 'EA6B66'
            ];
            // #$2 => $2
            _this.$2 = [
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
            var _option = _this.x;
            _this.$6 = _option.$2;
            _this.$5 = [_this.$(_this.x2)];
            _this.$4 = new ui.Pane(_this, { b: "_xhex" });
            console.log("Color::constructor - " + _option.$2);
            _this.$3 = new ui.Textbox(_this.$4, {
                $1: 6, g: _option.$2
            });
            new ui.Button(_this.$4, {
                g: _option.$1,
                c: function () { return _this.x1(_this.$3.
                    v.value); }
            });
            return _this;
        }
        // Create the control
        Color.prototype.u = function (html) {
            var self = this._;
            var option = self.x;
            var panel = html.h("div", option.b);
            self.y = panel;
            // Create the preset table
            html.k(0, panel, ["_xcolor"]);
            var table = self.$8(html, "T1");
            for (var index = 0; index < 2; index++)
                html.c(self.$7(html, option, self.$1, index * 12), table);
            html.c(table, panel);
            // Create the colored table
            table = self.$8(html, "T2");
            for (var index = 0; index < 10; index++)
                html.c(self.$7(html, option, self.$2, index * 12), table);
            html.c(table, panel);
            // Create history color table
            table = self.$8(html, "T3");
            self.x4 = self.$7(html, option, Color.$0, 0);
            html.c(self.x4, table);
            html.c(table, panel);
            // Create input area
            html.c(self.$4.v, panel);
            html.i(0, self.y, [5], self.$5);
            self.p(true); // setup modal
            _super.prototype.u.call(this, html);
        };
        // #$7 => $7
        Color.prototype.$7 = function (html, option, colorList, offset) {
            var self = this._;
            var row = html.h("tr");
            for (var index = 0; index < 12; index++) {
                var column = html.h("td");
                var colorValue = colorList[offset + index];
                if (colorValue) {
                    column.style.backgroundColor = "#" + colorValue;
                    column.dataset.color = colorValue;
                }
                if (colorValue == "noop" && option.$3)
                    html.f(column, "title", option.$3);
                if (colorValue && colorValue.charAt(0) == "n") {
                    html.c(html.h("span"), column);
                    column.className = colorValue;
                }
                html.c(column, row);
            }
            return row;
        };
        // #$8 => $8
        Color.prototype.$8 = function (html, id) {
            var table = html.h("table");
            table.cellSpacing = "0";
            table.id = id;
            return table;
        };
        // #$9 => $9
        Color.prototype.$9 = function (element) {
            while (element && element.nodeName && element.nodeName != "TD")
                element = element.parentElement;
            return element;
        };
        // #x0 => x0
        Color.prototype.x0 = function (color) {
            var history = Color.$0;
            if (history.indexOf(color) == -1) {
                if (history.length == 12)
                    history.splice(1, 1);
                history.push(color);
            }
        };
        // #x1 => x1
        Color.prototype.x1 = function (color) {
            var self = this._;
            if (self.$6 != color) {
                self.$6 = color;
                sys.$5(self.x.
                    c, self, self.$6);
            }
            self.n();
        };
        // #x2 => x2
        Color.prototype.x2 = function (event) {
            var self = this._;
            var cell = self.$9(event.srcElement);
            if (cell) {
                event.stopPropagation();
                var color = cell.dataset.color;
                if (color == "noop") {
                    self.x5();
                }
                else {
                    if (color != "none")
                        self.x0(color);
                    self.x1(color);
                }
            }
        };
        // #x5 => x5
        Color.prototype.x5 = function () {
            Color.$0.splice(1, Color.$0.length - 1);
            var cells = sys.Html.m("td:not(.noop)", this.x4);
            [].forEach.call(cells, function (x) { return x.style.backgroundColor = ""; });
        };
        Color.prototype.t = function (param) {
            _super.prototype.t.call(this, param);
            var option = this.x;
            option.$2 = param.$2;
            if (sys.$1(option.$2))
                this.$3.t({
                    g: param.$2
                });
        };
        // Destroy the control
        Color.prototype.r = function (html) {
            var self = this._;
            html.i(1, self.y, [5], self.$5);
            self.p(false);
            _super.prototype.r.call(this, html);
        };
        // #$0 => $0
        Color.$0 = ["noop"];
        return Color;
    }(ui.Control));
    ui.Color = Color;
// })(ui || (ui = {}));
//# sourceMappingURL=color.js.map
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
// var ui;
// (function (ui) {
    var DropColor = /** @class */ (function (_super) {
        __extends(DropColor, _super);
        ///////////////////////////////////////////////////////////////////////
        // Default constructor
        function DropColor(parent, option) {
            var _this = _super.call(this, parent, option) || this;
            var param = _this.x;
            _this.$1 = [_this.$(_this.$3)];
            param.$1 = sys.$4(0, param.$1);
            _this.$0 = [_this.$(_this.$6)];
            _this.$2 = new ui.Text(_this, { $0: "label" });
            new ui.Text(_this, { g: param.g });
            new ui.Text(_this, { b: "drop" });
            return _this;
        }
        // Create control
        DropColor.prototype.u = function (html) {
            var self = this._;
            var option = self.x;
            self.y = html.h("button", option.b);
            html.i(0, self.y, [5], self.$0);
            _super.prototype.u.call(this, html);
            self.$2.v.style.background =
                sys.$4(1, option.$1);
            html.k(0, self.y, ["_xdropclr"]);
        };
        // #$5 => $5
        DropColor.prototype.$5 = function (self, color) {
            var option = self.x;
            var style = self.$2.v.style;
            if (option.$1 != color) {
                option.$1 = color;
                if (self.$2) {
                    self.$2.v.style.background =
                        sys.$4(1, color);
                }
                sys.$5(option.c, self, sys.$4(1, option.$1));
            }
        };
        // #$6 => $6
        DropColor.prototype.$6 = function (event) {
            var self = this._;
            var option = self.x;
            var dropper = option.$0();
            self.$4 = dropper;
            if (dropper) {
                dropper.t({
                    $2: option.$1,
                    c: function (sender, color) { self.$5(self, color); },
                    e: true
                });
                var rect = sys.Html.d(self.y);
                dropper.o(rect.left, rect.bottom, option.$2);
                sys.Html.i(0, dropper.v, [6], self.$1);
                sys.Html.k(0, self.y, ["on"]);
            }
        };
        // #$3 => $3
        DropColor.prototype.$3 = function (event) {
            console.log("uiDropColor::onColorHide");
            var self = this._;
            sys.Html.i(1, self.$4.v, [6], self.$1);
            sys.Html.k(0, self.y, ["on"]);
        };
        // Update the color
        DropColor.prototype.t = function (param) {
            _super.prototype.t.call(this, param);
            var self = this._;
            var option = self.x;
            if (sys.$1(param.$1)) {
                var color = sys.$4(0, param.$1);
                if (option.$1 != color) {
                    option.$1 = color;
                    if (self.$2) {
                        self.$2.v.style.background =
                            sys.$4(1, color);
                    }
                }
            }
        };
        // Destroy the button
        DropColor.prototype.r = function (html) {
            var self = this._;
            html.i(1, self.y, [5], self.$0);
            if (self.$4)
                self.$4.q(true);
            _super.prototype.r.call(this, html);
        };
        return DropColor;
    }(ui.Control));
    ui.DropColor = DropColor;
// })(ui || (ui = {}));
//# sourceMappingURL=dropcolor.js.map
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
// var ui;
// (function (ui) {
    var Spinner = /** @class */ (function (_super) {
        __extends(Spinner, _super);
        ///////////////////////////////////////////////////////////////////////
        function Spinner(parent, option) {
            var _this = _super.call(this, parent, option) || this;
            // #$00 => $00
            _this.$00 = ["inc", "dec", "hex"];
            var param = _this.x;
            param.$1 = param.$1 || Number.MAX_VALUE;
            param.$2 = param.$2 || -param.$1;
            param.$0 = param.$0 || 0;
            new ui.Textbox(_this, {
                c: _this.$(_this.$03),
                g: param.$0.toString(),
                b: _this.$00[2]
            });
            new ui.Button(_this, {
                c: _this.$(_this.$02),
                b: _this.$00[0]
            });
            new ui.Button(_this, {
                c: _this.$(_this.$02),
                b: _this.$00[1]
            });
            return _this;
        }
        Spinner.prototype.u = function (html) {
            _super.prototype.u.call(this, html);
            html.k(0, this.y, ["_xspin"]);
        };
        // #$01 => $01
        Spinner.prototype.$01 = function (option) {
            if (option.$2 && option.$0 < option.$2)
                option.$0 = option.$2;
            if (option.$1 && option.$0 > option.$1)
                option.$0 = option.$1;
        };
        Spinner.prototype.t = function (param) {
            _super.prototype.t.call(this, param);
            var self = this._;
            var option = self.x;
            self.z.forEach(function (x) {
                x.t({ d: option.d });
            });
            if (param.$0) {
                option.$0 = param.$0;
                self.z[0].t({
                    g: option.
                        $0.toString()
                });
            }
        };
        // #$02 => $02
        Spinner.prototype.$02 = function (sender) {
            var self = this._;
            var option = self.x;
            if (option.$0 > option.$2 &&
                option.$0 < option.$1) {
                option.$0 +=
                    (sender.x.b == self.$00[0]) ? 1 : -1;
                self.z[0].t({ g: option.$0.toString() });
                sys.$5(self.x.c, self, option.$0);
            }
        };
        // #$03 => $03
        Spinner.prototype.$03 = function (sender, value) {
            var self = this._;
            var option = self.x;
            var tempValue = (+value) | 0;
            if (option.$0 != tempValue) {
                option.$0 = tempValue;
                self.$01(option);
                sys.$5(self.x.c, self, option.$0);
            }
        };
        return Spinner;
    }(ui.Pane));
    ui.Spinner = Spinner;
// })(ui || (ui = {}));
//# sourceMappingURL=spinner.js.map
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
// var ui;
// (function (ui) {
    var Toggle = /** @class */ (function (_super) {
        __extends(Toggle, _super);
        ///////////////////////////////////////////////////////////////////////
        function Toggle(parent, option) {
            var _this = _super.call(this, parent, option) || this;
            _this.$0 = [_this.$(_this.$1)];
            new ui.Text(new ui.Text(_this, { b: "out" }), { b: "in" });
            return _this;
        }
        Toggle.prototype.u = function (html) {
            var self = this._;
            var option = self.x;
            var wrap = html.h("button", option.b);
            self.y = wrap;
            html.k(0, wrap, ["_xcheck"]);
            if (option.h)
                html.f(wrap, "title", option.h);
            if (option.$0)
                html.k(0, wrap, ["on"]);
            if (option.g)
                self.y.dataset.tip = option.g;
            html.i(0, wrap, [5], self.$0);
            _super.prototype.u.call(this, html);
        };
        // #$1 => $1
        Toggle.prototype.$1 = function (event) {
            console.log("uiToggle::onClick - " +
                this.x.$0);
            event.stopPropagation();
            this.$2(!this.x.
                $0);
        };
        // Set checked of the button
        // #$2 => $2
        Toggle.prototype.$2 = function (value) {
            var self = this._;
            var option = self.x;
            if (!sys.$1(value))
                return option.$0;
            option.$0 = value;
            sys.$5(option.c, self, value);
            sys.Html.k([1,
                0][Number(value)], self.y, ["on"]);
        };
        // Update the control
        Toggle.prototype.t = function (param) {
            _super.prototype.t.call(this, param);
            var self = this._;
            var option = this.x;
            if (sys.$1(param.$0)) {
                option.$0 = param.$0;
                sys.Html.k([1,
                    0][Number(option.$0)], self.y, ["on"]);
            }
        };
        // Destroy the button
        Toggle.prototype.r = function (html) {
            var self = this._;
            html.i(1, self.y, [5], self.$0);
            _super.prototype.r.call(this, html);
        };
        return Toggle;
    }(ui.Control));
    ui.Toggle = Toggle;
})(ui || (ui = {}));
//# sourceMappingURL=toggle.js.map

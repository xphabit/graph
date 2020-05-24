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
    // #sysRoot_defined => $1
    function sysRoot_defined(param) {
        return typeof param !== "undefined";
    }
    sys.sysRoot_defined = sysRoot_defined;
    // #sysRoot_function => $2
    function sysRoot_function(param) {
        return typeof param === "function";
    }
    sys.sysRoot_function = sysRoot_function;
    // #sysRoot_string => $3
    function sysRoot_string(param) {
        return typeof param === "string";
    }
    sys.sysRoot_string = sysRoot_string;
    // #sysRoot_color => $4
    function sysRoot_color(unbox, color) {
        return (!color || color == "none" || color.charAt(0) == '#') ? color : (unbox == define.$const_actionUnboxColor ? color.substring(1) : "#" + color);
    }
    sys.sysRoot_color = sysRoot_color;
    // #sysRoot_delay => $5
    function sysRoot_delay(handler) {
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
    sys.sysRoot_delay = sysRoot_delay;
    // #sysRoot_ajax => $6
    function sysRoot_ajax(url, option) {
        option = option || { sysAjax_data: null };
        option.sysAjax_method = option.sysAjax_method || "POST";
        var xmlRequest = new XMLHttpRequest();
        xmlRequest.open(option.sysAjax_method, url, true);
        if (!option.sysAjax_config && option.sysAjax_method == "POST")
            xmlRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        else
            option.sysAjax_config(xmlRequest);
        xmlRequest.send(option.sysAjax_data);
        xmlRequest.onreadystatechange = function () {
            if (xmlRequest.readyState == 4) {
                if (option.sysAjax_done)
                    option.sysAjax_done(xmlRequest, xmlRequest.response);
                xmlRequest = null;
            }
        };
    }
    sys.sysRoot_ajax = sysRoot_ajax;
    ///////////////////////////////////////////////////////////////////////////
    // Export a basic class
    var xObject = /** @class */ (function () {
        function xObject() {
        }
        Object.defineProperty(xObject.prototype, "sysObject_this", {
            // #sysObject_this => _
            get: function () {
                return this;
            },
            enumerable: true,
            configurable: true
        });
        // #sysObject_bind => $
        xObject.prototype.sysObject_bind = function (target) {
            return target.bind(this);
        };
        return xObject;
    }());
    sys.xObject = xObject;
    // Export lazy class
    var Lazy = /** @class */ (function (_super) {
        __extends(Lazy, _super);
        // #sysLazy_getter => y
        function Lazy(sysLazy_getter) {
            var _this = _super.call(this) || this;
            _this.sysLazy_getter = sysLazy_getter;
            return _this;
        }
        Object.defineProperty(Lazy.prototype, "sysLazy_value", {
            // Return lazy value
            // #sysLazy_value => x
            get: function () {
                var self = this.sysObject_this;
                if (!self.sysLazy_boxValue)
                    self.sysLazy_boxValue = self.sysLazy_getter();
                return self.sysLazy_boxValue;
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
            _this.sysBean_service = service || new Function();
            return _this;
        }
        // Create an instance
        // #sysBean_createInstance => a
        Bean.prototype.sysBean_createInstance = function () {
            var self = this.sysObject_this;
            if (!self.sysBean_boxSignleton || !self.sysBean_instance) {
                if (!self.sysBean_boxFactory)
                    self.sysBean_instance = new (Function.prototype.bind.apply(self.sysBean_service, [{}].concat(self.sysBean_paramGetter ? self.sysBean_paramGetter() : [])))();
                else
                    self.sysBean_instance = self.sysBean_boxFactory();
            }
            return self.sysBean_instance;
        };
        // #sysBean_factory => b
        // The factory used to create instance
        Bean.prototype.sysBean_factory = function (factoryGetter) {
            this.sysBean_boxFactory = factoryGetter;
            return this;
        };
        // #sysBean_argument => c
        // The parameters used to create an instance
        Bean.prototype.sysBean_argument = function (paramGetter) {
            this.sysBean_paramGetter = paramGetter;
            return this;
        };
        Object.defineProperty(Bean.prototype, "sysBean_signleton", {
            // #sysBean_signleton => d
            // Should be a signleton of DI item
            get: function () {
                this.sysBean_boxSignleton = true;
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
        // #sysPod_inject => y
        // Register a service into container, service is a class of TypeScript or function of javascript
        Pod.sysPod_inject = function (service, name) {
            var bean = new Bean(service);
            console.log(name ? name : service.toString());
            Pod.sysPod_hash[name ? name :
                window.btoa(service.toString())] = bean;
            return bean;
        };
        // #sysPod_depend => x
        // Resolve an instance of a TypeScript service
        Pod.sysPod_depend = function (service) {
            var hashKey = "#";
            if (sys.sysRoot_function(service))
                hashKey = window.btoa(service.toString());
            else if (typeof service == "string")
                hashKey = service;
            var bean = Pod.sysPod_hash[hashKey];
            if (bean)
                return bean.sysBean_createInstance();
            else
                return null;
        };
        // #sysPod_hash => z
        Pod.sysPod_hash = {};
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
        // #sysHtml_body => a
        Html.sysHtml_body = function () {
            return document.body;
        };
        // #sysHtml_document => b
        Html.sysHtml_document = function () {
            return document.documentElement;
        };
        // #sysHtml_appendTo => c
        Html.sysHtml_appendTo = function (element, target) {
            target = target || Html.sysHtml_body();
            target.appendChild(element);
            return target;
        };
        // #sysHtml_boundRect => d
        Html.sysHtml_boundRect = function (element) {
            var what = window;
            if (element)
                return element.getBoundingClientRect();
            else {
                var body = Html.sysHtml_body();
                var document_1 = Html.sysHtml_document();
                return {
                    left: 0, top: 0, right: (what.innerWidth || document_1.clientWidth || body.clientWidth) - 1,
                    bottom: (what.innerHeight || document_1.clientHeight || body.clientHeight) - 1,
                    height: 0, width: 0
                };
            }
        };
        // #sysHtml_elementById => e
        Html.sysHtml_elementById = function (id) {
            return document.getElementById(id);
        };
        // #sysHtml_attribute => f
        Html.sysHtml_attribute = function (element, name, value) {
            if (sys.sysRoot_defined(value))
                element.setAttribute(name, value);
            else
                element.removeAttribute(name);
        };
        // #sysHtml_css => g
        Html.sysHtml_css = function (element, style) {
            element.style.cssText = style;
        };
        // #sysHtml_element => h
        Html.sysHtml_element = function (tagName, className) {
            var element = document.createElement(tagName);
            if (className)
                element.className = className;
            return element;
        };
        // #sysHtml_event => i
        // action = define.$constActionRemoveEvent = 0
        // action = define.$constActionAddEvent = 1
        Html.sysHtml_event = function (action, element, eventId, eventBinder) {
            if (element && eventId && eventBinder) {
                var what = Html.sysHtml_actionList[action % 2] + "EventListener";
                for (var index = 0; index < eventId.length; index++) {
                    element[what](Html.sysHtml_eventNames[eventId[index]], eventBinder[index]);
                }
            }
        };
        // #sysHtml_contain => j
        Html.sysHtml_contain = function (x, y, element) {
            var r = Html.sysHtml_boundRect(element || Html.sysHtml_document());
            return x >= r.left && x <= r.right &&
                y >= r.top && y <= r.bottom;
        };
        // #sysHtml_class => k
        Html.sysHtml_class = function (action, element, classNames) {
            if (classNames && element) {
                classNames.forEach(function (className) {
                    element.classList[Html.sysHtml_actionList[action % 2]](className);
                });
            }
        };
        // Has the class
        // #sysHtml_has => l
        Html.sysHtml_has = function (element, className) {
            return element && element.classList.contains(className);
        };
        // #sysHtml_query => m
        Html.sysHtml_query = function (selectors, element) {
            return (element || Html.sysHtml_document()).querySelectorAll(selectors);
        };
        // #sysHtml_svgIcon => n
        Html.sysHtml_svgIcon = function (id) {
            return (new sys.Svg("svg")).sysSvg_use(id).sysSvg_parent;
        };
        // #sysHtml_place => o
        // %place = define.$const_placeWhere
        Html.sysHtml_place = function (place, x, y) {
            var rect = Html.sysHtml_boundRect();
            return place == define.$const_placeRightTop ? "right:" + (rect.right - x) + "px;top:" + y + "px;" : (place == define.$const_placeLeftBottom ? "left:" + x + "px;bottom:" + (rect.bottom - y) + "px;" : (place == define.$const_placeRightBottom ? "right:" + (rect.right - x) + "px;bottom:" + (rect.bottom - y) + "px;" :
                "left:" + x + "px;top:" + y + "px;"));
        };
        // #sysHtml_eventNames => z
        Html.sysHtml_eventNames = [
            "mousewheel", "mousedown", "mouseup", "mousemove", "mouseleave",
            "click", "hidden", "context", "change", "keydown"
        ];
        // #sysHtml_actionList => y
        Html.sysHtml_actionList = ["add", "remove"];
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
            _this.sysSvg_parent = parent;
            _this.sysSvg_object = Svg.sysSvg_createElement(tag);
            if (parent)
                parent.appendChild(_this.sysSvg_object);
            return _this;
        }
        // #sysSvg_baseSpace => z
        Svg.sysSvg_baseSpace = function () {
            return "http://www.w3.org/2000/svg";
        };
        // #sysSvg_linkSpace => y
        Svg.sysSvg_linkSpace = function () {
            return "http://www.w3.org/1999/xlink";
        };
        // #sysSvg_createElement => x
        Svg.sysSvg_createElement = function (tag) {
            return document.createElementNS(Svg.sysSvg_baseSpace(), tag);
        };
        // #sysSvg_attribute => w
        Svg.sysSvg_attribute = function (element, name, value, _namespace) {
            if (_namespace === void 0) { _namespace = null; }
            element.setAttributeNS(_namespace, name, value);
        };
        // #sysSvg_use => a
        Svg.prototype.sysSvg_use = function (id) {
            var objUse = new Svg("use", this.sysSvg_object);
            Svg.sysSvg_attribute(objUse.sysSvg_object, "xlink:href", "#" + id, Svg.sysSvg_linkSpace());
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
            // #uiControl_kids => z
            _this.uiControl_kids = [];
            if (parent)
                parent.uiControl_kids.push(_this);
            _this.uiControl_option = option || {};
            _this.uiControl_parent = parent;
            return _this;
        }
        Object.defineProperty(Control.prototype, "uiControl_element", {
            // #uiControl_element => v
            get: function () {
                var self = this.sysObject_this;
                if (!self.uiControl_control)
                    self.uiControl_create(sys.Html);
                return self.uiControl_control;
            },
            enumerable: true,
            configurable: true
        });
        /////////////////////////////////////////////////////////////////////////////
        // Create the control
        // The function will be called by child
        // #uiControl_create => u
        Control.prototype.uiControl_create = function (html) {
            var self = this.sysObject_this;
            if (self.uiControl_control) {
                self.uiControl_kids.forEach(function (kid) {
                    html.sysHtml_appendTo(kid.uiControl_element, self.uiControl_control);
                });
                self.uiControl_state(self, self.uiControl_option);
            }
        };
        // Update the control accord option
        // #uiControl_update => t
        Control.prototype.uiControl_update = function (param) {
            var self = this.sysObject_this;
            var option = self.uiControl_option;
            ["uiControlOption_action", "uiControlOption_disabled",
                "uiControlOption_hidden", "uiControlOption_text", "uiControlOption_tip"].
                forEach(function (item) {
                if (sys.sysRoot_defined(param[item]))
                    option[item] = param[item];
            });
            if (self.uiControl_control) {
                self.uiControl_state(self, option);
            }
        };
        // Remove a kid from children list
        // #uiControl_remove => s
        Control.prototype.uiControl_remove = function (kid) {
            var list = this.uiControl_kids;
            var index = list.indexOf(kid);
            if (index >= 0) {
                list.splice(index, 1);
            }
        };
        // Destroy the object
        // #uiControl_destory => r
        Control.prototype.uiControl_destory = function (html) {
            var self = this.sysObject_this;
            if (self.uiControl_parent)
                self.uiControl_parent.uiControl_remove(self);
            while (self.uiControl_kids.length > 0)
                self.uiControl_kids[0].uiControl_destory(html);
        };
        // Hidden of the control
        // #uiControl_hidden => q
        Control.prototype.uiControl_hidden = function (value) {
            var self = this.sysObject_this;
            var control = self.uiControl_control;
            if (control) {
                if (sys.sysRoot_defined(value) && control.hidden != value) {
                    control.hidden = value;
                    self.uiControl_kids.forEach(function (kid) { return kid.uiControl_hidden(value); });
                    control.dispatchEvent(new CustomEvent("hidden", { "detail": self }));
                }
                return control.hidden;
            }
        };
        /////////////////////////////////////////////////////////////////////////////
        // Setup modal
        // #uiControl_modal => p
        Control.prototype.uiControl_modal = function (on) {
            var self = this.sysObject_this;
            if (self.uiControl_option.uiControlOption_modal) {
                on ? sys.Html.sysHtml_appendTo(self.uiControl_control) :
                    self.uiControl_control.remove();
            }
        };
        // Display picker at point
        // align - undefine: left, define: right
        // #uiControl_pop => o
        //  %place = define.$const_placeWhere
        Control.prototype.uiControl_pop = function (x, y, place) {
            var html = sys.Html;
            var self = this.sysObject_this;
            var modal = self.uiControl_option.uiControlOption_modal;
            if (modal) {
                var element = self.uiControl_element;
                html.sysHtml_css(element, html.sysHtml_place(place || 0, x, y));
                html.sysHtml_class(define.$const_actionAddClass, element, ["_xpopup"]);
                modal.uiModal_show(self);
            }
        };
        // Quit modal
        // #uiControl_quit => n
        Control.prototype.uiControl_quit = function () {
            var modal = this.uiControl_option.uiControlOption_modal;
            if (modal) {
                modal.uiModal_quit();
            }
        };
        // #uiControl_state => m
        Control.prototype.uiControl_state = function (self, option) {
            self.uiControl_control["disabled"] = !!option.uiControlOption_disabled;
            self.uiControl_control.hidden = !!option.uiControlOption_hidden;
            if (option.uiControlOption_id) {
                self.uiControl_control.dataset.id =
                    option.uiControlOption_id;
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
            // #uiModal_target => $0
            _this.uiModal_target = [];
            var html = sys.Html;
            _this.uiControl_control = html.sysHtml_element("div", "_xmodal");
            _this.uiModal_initial(_this, html);
            return _this;
        }
        // #uiModal_initial => $4
        Modal.prototype.uiModal_initial = function (self, html) {
            self.uiControl_control.hidden = true;
            self.uiModal_docBinder = [self.sysObject_bind(self.uiModal_onKeydown)];
            self.uiModal_binder = [self.sysObject_bind(self.uiModal_onMousedown), self.sysObject_bind(self.uiModal_onContext)];
            self.uiModal_targetBinder = [self.sysObject_bind(self.uiModal_onHidden)];
            html.sysHtml_appendTo(self.uiControl_control);
        };
        // Show target component
        // #uiModal_show => $5
        Modal.prototype.uiModal_show = function (target, mask) {
            var html = sys.Html;
            var self = this.sysObject_this;
            html.sysHtml_class([define.$const_actionRemoveClass,
                define.$const_actionAddClass][Number(!!mask)], self.uiControl_control, ["_xmask"]);
            html.sysHtml_event(define.$const_actionAddEvent, target.uiControl_element, [define.$const_eventHidden], self.uiModal_targetBinder);
            target.uiControl_hidden(false);
        };
        // Quit modal state
        // #uiModal_quit => $6
        Modal.prototype.uiModal_quit = function () {
            this.uiModal_target.forEach(function (target) { return target.uiControl_hidden(true); });
        };
        // Handle target hidden/show
        // #uiModal_onHidden => $7
        Modal.prototype.uiModal_onHidden = function (event) {
            var html = sys.Html;
            var self = this.sysObject_this;
            if (event.detail.uiControl_hidden()) {
                var top_1 = self.uiModal_target.pop();
                if (self.uiModal_target.length == 0) {
                    self.uiModal_unhook(html);
                    html.sysHtml_event(define.$const_actionRemoveEvent, top_1.uiControl_element, [define.$const_eventHidden], self.uiModal_targetBinder);
                    top_1.uiControl_destory(html);
                }
            }
            else {
                self.uiModal_target.push(event.detail);
                if (self.uiModal_target.length == 1)
                    self.uiModal_hook(html);
            }
        };
        // Keydown on document 
        // #uiModal_onKeydown => $8
        Modal.prototype.uiModal_onKeydown = function (event) {
            if (event.keyCode == 27) { // ESC to hide the top item
                event.stopPropagation();
                var targets = this.uiModal_target;
                if (targets.length > 0) {
                    var index = targets.length - 1;
                    targets[index].uiControl_hidden(true);
                }
            }
        };
        // Mouse down handler
        // #uiModal_onMousedown => $9
        Modal.prototype.uiModal_onMousedown = function (event) {
            var bound = false;
            this.uiModal_target.forEach(function (item) { return bound = bound ||
                sys.Html.sysHtml_contain(event.pageX, event.pageY, item.uiControl_element); });
            if (!bound) {
                this.uiModal_target.forEach(function (item) {
                    return item.uiControl_hidden(true);
                });
            }
        };
        // Hook system event
        // #uiModal_hook => x0
        Modal.prototype.uiModal_hook = function (html) {
            var self = this.sysObject_this;
            html.sysHtml_event(define.$const_actionAddEvent, self.uiControl_control, [define.$const_eventMouseDown, define.$const_eventContext], self.uiModal_binder);
            html.sysHtml_event(define.$const_actionAddEvent, html.sysHtml_document(), [define.$const_eventKeydown], self.uiModal_docBinder);
            self.uiControl_hidden(false);
        };
        // Unhook system event
        // #uiModal_unhook => x1
        Modal.prototype.uiModal_unhook = function (html) {
            var self = this.sysObject_this;
            html.sysHtml_event(define.$const_actionRemoveEvent, self.uiControl_control, [define.$const_eventMouseDown, define.$const_eventContext], self.uiModal_binder);
            html.sysHtml_event(define.$const_actionRemoveEvent, html.sysHtml_document(), [define.$const_eventKeydown], self.uiModal_docBinder);
            self.uiControl_hidden(true);
        };
        // #uiModal_onContext => x2
        Modal.prototype.uiModal_onContext = function (event) {
            this.uiModal_target.forEach(function (item) { return item.uiControl_hidden(true); });
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
            _this.uiButton_binder = [_this.sysObject_bind(_this.uiButton_onClick)]; // Keep event order
            return _this;
        }
        // Create control
        Button.prototype.uiControl_create = function (html) {
            var self = this.sysObject_this;
            var option = self.uiControl_option;
            self.uiControl_control = html.sysHtml_element("button", option.uiControlOption_class);
            if (option.uiControlOption_action)
                html.sysHtml_event(define.$const_actionAddEvent, self.uiControl_control, [define.$const_eventClick], self.uiButton_binder);
            if (option.uiControlOption_text)
                self.uiControl_control.innerText = option.uiControlOption_text;
            if (option.uiControlOption_tip)
                html.sysHtml_attribute(self.uiControl_control, "title", option.uiControlOption_tip);
            _super.prototype.uiControl_create.call(this, html);
        };
        // #uiButton_onClick => $1
        Button.prototype.uiButton_onClick = function (event) {
            event.stopPropagation();
            sys.sysRoot_delay(this.uiControl_option.uiControlOption_action, this);
        };
        // Remove the control
        Button.prototype.uiControl_destory = function (html) {
            var self = this.sysObject_this;
            if (self.uiControl_option.uiControlOption_action)
                html.sysHtml_event(define.$const_actionRemoveEvent, self.uiControl_control, [define.$const_eventClick], self.uiButton_binder);
            _super.prototype.uiControl_destory.call(this, html);
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
            option.uiImageOption_tag =
                option.uiImageOption_tag || "svg";
            _this = _super.call(this, parent, option) || this;
            return _this;
        }
        Image.prototype.uiControl_create = function (html) {
            var self = this.sysObject_this;
            var option = self.uiControl_option;
            if (option.uiImageOption_tag == "svg") {
                self.uiControl_control = html.sysHtml_svgIcon(option.uiControlOption_icon);
                if (option.uiControlOption_class)
                    self.uiControl_control.className = option.uiControlOption_class;
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
            option.uiTextOption_tag =
                option.uiTextOption_tag || "span";
            _this = _super.call(this, parent, option) || this;
            return _this;
        }
        // Create the control
        Text.prototype.uiControl_create = function (html) {
            var self = this.sysObject_this;
            var option = self.uiControl_option;
            self.uiControl_control = html.sysHtml_element(option.uiTextOption_tag, option.uiControlOption_class);
            if (option.uiControlOption_text)
                self.uiControl_control.innerText = option.uiControlOption_text;
            _super.prototype.uiControl_create.call(this, html);
        };
        // Update the control
        Text.prototype.uiControl_update = function (param) {
            _super.prototype.uiControl_update.call(this, param);
            var self = this.sysObject_this;
            if (self.uiControl_control &&
                self.uiControl_option.uiControlOption_text) {
                self.uiControl_control.innerText = self.uiControl_option.
                    uiControlOption_text;
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
        Pane.prototype.uiControl_create = function (html) {
            var self = this.sysObject_this;
            self.uiControl_control = html.sysHtml_element("div", self.uiControl_option.uiControlOption_class);
            self.uiControl_modal(true); // Setup modal
            _super.prototype.uiControl_create.call(this, html);
        };
        // Remove control
        Pane.prototype.uiControl_destory = function (html) {
            this.uiControl_modal(false);
            _super.prototype.uiControl_destory.call(this, html);
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
            _this.uiTextbox_binder = [_this.sysObject_bind(_this.uiTextbox_onChange)];
            return _this;
        }
        // Create the control
        Textbox.prototype.uiControl_create = function (html) {
            var self = this.sysObject_this;
            var option = self.uiControl_option;
            var mutipleLines = option.uiTextboxOption_rows > 0 || option.uiTextboxOption_cols > 0;
            self.uiControl_control = html.sysHtml_element(mutipleLines ? "textarea" : "input", option.uiControlOption_class);
            var input = self.uiControl_control;
            if (option.uiTextboxOption_placeHolder)
                input.placeholder = option.uiTextboxOption_placeHolder;
            if (option.uiTextboxOption_maxLength)
                input.maxLength = option.uiTextboxOption_maxLength;
            if (mutipleLines) {
                var area = self.uiControl_control;
                area.rows = option.uiTextboxOption_rows;
                area.cols = option.uiTextboxOption_cols;
            }
            if (self.uiControl_option.uiControlOption_action)
                html.sysHtml_event(define.$const_actionAddEvent, input, [define.$const_eventChange], self.uiTextbox_binder);
            if (option.uiControlOption_text)
                input.value = option.uiControlOption_text;
            _super.prototype.uiControl_create.call(this, html);
        };
        // Update the control
        Textbox.prototype.uiControl_update = function (param) {
            _super.prototype.uiControl_update.call(this, param);
            var self = this.sysObject_this;
            var input = self.uiControl_control;
            if (input && self.uiControl_option.uiControlOption_text)
                input.value = self.uiControl_option.
                    uiControlOption_text;
        };
        // #uiTextbox_onChange => $1
        Textbox.prototype.uiTextbox_onChange = function (event) {
            var self = this.sysObject_this;
            sys.sysRoot_delay(self.uiControl_option.uiControlOption_action, self, self.uiControl_control.value);
        };
        // Remove the control
        Textbox.prototype.uiControl_destory = function (html) {
            var self = this.sysObject_this;
            if (self.uiControl_option.uiControlOption_action)
                html.sysHtml_event(define.$const_actionRemoveEvent, self.uiControl_control, [define.$const_eventChange], self.uiTextbox_binder);
            _super.prototype.uiControl_destory.call(this, html);
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
            var closebind = _this.sysObject_bind(_this.uiDialog_onClose);
            _this.uiDialog_title = _this.uiDialog_createTitle();
            _this.uiDialog_foot = _this.uiDialog_createFoot(closebind);
            new ui.Text(new ui.Button(_this, { uiControlOption_action: closebind,
                uiControlOption_class: "_xdoff" }));
            _this.uiDialog_body();
            return _this;
        }
        // Create a band
        // #uiDialog_band => $3
        Dialog.prototype.uiDialog_band = function (className) {
            return new ui.Pane(this.uiDialog_pane, {
                uiControlOption_class: "_xdband" + (className ? " " + className : "")
            });
        };
        // Display the dialog
        // #uiDialog_show => $4
        Dialog.prototype.uiDialog_show = function () {
            var self = this.sysObject_this;
            var option = self.uiControl_option;
            sys.Html.sysHtml_css(self.uiControl_element, "width:" + option.uiDialogOption_width + "px;height:" + option.uiDialogOption_height + "px;margin-left:" + -option.uiDialogOption_width / 2 + "px;margin-top:" + -option.uiDialogOption_height * 3 / 4 + "px");
            option.uiControlOption_modal.uiModal_show(self, true);
        };
        // Create the component
        Dialog.prototype.uiControl_create = function (html) {
            var self = this.sysObject_this;
            var option = self.uiControl_option;
            var id = option.uiControlOption_id;
            self.uiControl_control = html.sysHtml_element("div", option.uiControlOption_class);
            html.sysHtml_class(define.$const_actionAddClass, self.uiControl_control, ["_xdlg"]);
            if (sys.sysRoot_defined(option.uiControlOption_hidden))
                self.uiControl_control.hidden = option.uiControlOption_hidden;
            self.uiControl_control.id = id;
            self.uiControl_modal(true); // Setup modal
            _super.prototype.uiControl_create.call(this, html);
        };
        // Create dialog body
        // #uiDialog_body => $5
        Dialog.prototype.uiDialog_body = function () {
            this.uiDialog_pane = new ui.Pane(this, { uiControlOption_class: "_xdbody" });
        };
        // #uiDialog_createTitle => $6
        Dialog.prototype.uiDialog_createTitle = function () {
            var self = this.sysObject_this;
            var title = new ui.Pane(self, { uiControlOption_class: "_xdtitle" });
            new ui.Text(title, { uiControlOption_text: self.uiControl_option.uiControlOption_text });
            return title;
        };
        // #uiDialog_createFoot => $7
        Dialog.prototype.uiDialog_createFoot = function (onClosebind) {
            var self = this.sysObject_this;
            var foot = new ui.Pane(self, { uiControlOption_class: "_xdfoot" });
            new ui.Button(foot, {
                uiControlOption_action: onClosebind,
                uiControlOption_text: self.uiControl_option.uiDialogOption_cancel
            });
            return foot;
        };
        // #uiDialog_onClose => $8
        Dialog.prototype.uiDialog_onClose = function (sender) {
            this.uiControl_hidden(true);
        };
        // Destroy the component
        Dialog.prototype.uiControl_destory = function (html) {
            this.uiControl_modal(false);
            _super.prototype.uiControl_destory.call(this, html);
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
            var param = _this.uiControl_option;
            _this.uiDropColor_colorBinder = [_this.sysObject_bind(_this.uiDropColor_onColorHide)];
            param.uiDropColorOption_color = sys.sysRoot_color(define.$const_actionUnboxColor, param.uiDropColorOption_color);
            _this.uiDropColor_binder = [_this.sysObject_bind(_this.uiDropColor_onClick)];
            _this.uiDropColor_icon = new ui.Text(_this, { uiTextOption_tag: "label" });
            new ui.Text(_this, { uiControlOption_text: param.uiControlOption_text });
            new ui.Text(_this, { uiControlOption_class: "drop" });
            return _this;
        }
        // Create control
        DropColor.prototype.uiControl_create = function (html) {
            var self = this.sysObject_this;
            var option = self.uiControl_option;
            self.uiControl_control = html.sysHtml_element("button", option.uiControlOption_class);
            html.sysHtml_event(define.$const_actionAddEvent, self.uiControl_control, [define.$const_eventClick], self.uiDropColor_binder);
            _super.prototype.uiControl_create.call(this, html);
            self.uiDropColor_icon.uiControl_element.style.background =
                sys.sysRoot_color(define.$const_actionBoxColor, option.uiDropColorOption_color);
            html.sysHtml_class(define.$const_actionAddClass, self.uiControl_control, ["_xdropclr"]);
        };
        // #uiDropColor_selectColor => $5
        DropColor.prototype.uiDropColor_selectColor = function (self, color) {
            var option = self.uiControl_option;
            var style = self.uiDropColor_icon.uiControl_element.style;
            if (option.uiDropColorOption_color != color) {
                option.uiDropColorOption_color = color;
                if (self.uiDropColor_icon) {
                    self.uiDropColor_icon.uiControl_element.style.background =
                        sys.sysRoot_color(define.$const_actionBoxColor, color);
                }
                sys.sysRoot_delay(option.uiControlOption_action, self, sys.sysRoot_color(define.$const_actionBoxColor, option.uiDropColorOption_color));
            }
        };
        // #uiDropColor_onClick => $6
        DropColor.prototype.uiDropColor_onClick = function (event) {
            var self = this.sysObject_this;
            var option = self.uiControl_option;
            var dropper = option.uiDropColorOption_dropper();
            self.uiDropColor_dropper = dropper;
            if (dropper) {
                dropper.uiControl_update({
                    uiColorOption_color: option.uiDropColorOption_color,
                    uiControlOption_action: function (sender, color) { self.uiDropColor_selectColor(self, color); },
                    uiControlOption_hidden: true
                });
                var rect = sys.Html.sysHtml_boundRect(self.uiControl_control);
                dropper.uiControl_pop(rect.left, rect.bottom, option.uiDropColorOption_place);
                sys.Html.sysHtml_event(define.$const_actionAddEvent, dropper.uiControl_element, [define.$const_eventHidden], self.uiDropColor_colorBinder);
                sys.Html.sysHtml_class(define.$const_actionAddClass, self.uiControl_control, ["on"]);
            }
        };
        // #uiDropColor_onColorHide => $3
        DropColor.prototype.uiDropColor_onColorHide = function (event) {
            console.log("uiDropColor::onColorHide");
            var self = this.sysObject_this;
            sys.Html.sysHtml_event(define.$const_actionRemoveEvent, self.uiDropColor_dropper.uiControl_element, [define.$const_eventHidden], self.uiDropColor_colorBinder);
            sys.Html.sysHtml_class(define.$const_actionAddClass, self.uiControl_control, ["on"]);
        };
        // Update the color
        DropColor.prototype.uiControl_update = function (param) {
            _super.prototype.uiControl_update.call(this, param);
            var self = this.sysObject_this;
            var option = self.uiControl_option;
            if (sys.sysRoot_defined(param.uiDropColorOption_color)) {
                var color = sys.sysRoot_color(define.$const_actionUnboxColor, param.uiDropColorOption_color);
                if (option.uiDropColorOption_color != color) {
                    option.uiDropColorOption_color = color;
                    if (self.uiDropColor_icon) {
                        self.uiDropColor_icon.uiControl_element.style.background =
                            sys.sysRoot_color(define.$const_actionBoxColor, color);
                    }
                }
            }
        };
        // Destroy the button
        DropColor.prototype.uiControl_destory = function (html) {
            var self = this.sysObject_this;
            html.sysHtml_event(define.$const_actionRemoveEvent, self.uiControl_control, [define.$const_eventClick], self.uiDropColor_binder);
            if (self.uiDropColor_dropper)
                self.uiDropColor_dropper.uiControl_hidden(true);
            _super.prototype.uiControl_destory.call(this, html);
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
            _this.uiToggle_binder = [_this.sysObject_bind(_this.uiToggle_onClick)];
            new ui.Text(new ui.Text(_this, { uiControlOption_class: "out" }), { uiControlOption_class: "in" });
            return _this;
        }
        Toggle.prototype.uiControl_create = function (html) {
            var self = this.sysObject_this;
            var option = self.uiControl_option;
            var wrap = html.sysHtml_element("button", option.uiControlOption_class);
            self.uiControl_control = wrap;
            html.sysHtml_class(define.$const_actionAddClass, wrap, ["_xcheck"]);
            if (option.uiControlOption_tip)
                html.sysHtml_attribute(wrap, "title", option.uiControlOption_tip);
            if (option.uiToggleOption_checked)
                html.sysHtml_class(define.$const_actionAddClass, wrap, ["on"]);
            if (option.uiControlOption_text)
                self.uiControl_control.dataset.tip = option.uiControlOption_text;
            html.sysHtml_event(define.$const_actionAddEvent, wrap, [define.$const_eventClick], self.uiToggle_binder);
            _super.prototype.uiControl_create.call(this, html);
        };
        // #uiToggle_onClick => $1
        Toggle.prototype.uiToggle_onClick = function (event) {
            console.log("uiToggle::onClick - " +
                this.uiControl_option.uiToggleOption_checked);
            event.stopPropagation();
            this.uiToggle_checked(!this.uiControl_option.
                uiToggleOption_checked);
        };
        // Set checked of the button
        // #uiToggle_checked => $2
        Toggle.prototype.uiToggle_checked = function (value) {
            var self = this.sysObject_this;
            var option = self.uiControl_option;
            if (!sys.sysRoot_defined(value))
                return option.uiToggleOption_checked;
            option.uiToggleOption_checked = value;
            sys.sysRoot_delay(option.uiControlOption_action, self, value);
            sys.Html.sysHtml_class([define.$const_actionRemoveClass,
                define.$const_actionAddClass][Number(value)], self.uiControl_control, ["on"]);
        };
        // Update the control
        Toggle.prototype.uiControl_update = function (param) {
            _super.prototype.uiControl_update.call(this, param);
            var self = this.sysObject_this;
            var option = this.uiControl_option;
            if (sys.sysRoot_defined(param.uiToggleOption_checked)) {
                option.uiToggleOption_checked = param.uiToggleOption_checked;
                sys.Html.sysHtml_class([define.$const_actionRemoveClass,
                    define.$const_actionAddClass][Number(option.uiToggleOption_checked)], self.uiControl_control, ["on"]);
            }
        };
        // Destroy the button
        Toggle.prototype.uiControl_destory = function (html) {
            var self = this.sysObject_this;
            html.sysHtml_event(define.$const_actionRemoveEvent, self.uiControl_control, [define.$const_eventClick], self.uiToggle_binder);
            _super.prototype.uiControl_destory.call(this, html);
        };
        return Toggle;
    }(ui.Control));
    ui.Toggle = Toggle;
})(ui || (ui = {}));
//# sourceMappingURL=toggle.js.map

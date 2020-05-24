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
})(sys || (sys = {}));
//# sourceMappingURL=core.js.map
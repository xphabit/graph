/// <reference path="core.ts"/>
var sys;
(function (sys) {
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
})(sys || (sys = {}));
//# sourceMappingURL=html.js.map
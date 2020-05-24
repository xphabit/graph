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
    // #boxGuidebar_config => $g
    function boxGuidebar_config(lazy, lang, register, resolve) {
        // Register pane control
        register(ui.Pane, Guidebar.boxGuidebar_key).sysBean_signleton.sysBean_argument(function () {
            return [null, { uiControlOption_class: Guidebar.boxGuidebar_key }];
        });
        // Register button list
        register(ui.List, Guidebar.boxGuidebar_listkey).sysBean_signleton.sysBean_argument(function () { return [
            resolve(box.Footbar.boxFootbar_key), { uiControlOption_class: Guidebar.boxGuidebar_listkey },
            box.Footbar.boxFootbar_right
        ]; });
        // Register foot bar component
        register(box.Footbar).sysBean_signleton.sysBean_argument(function () {
            return [new lazy(function () { return resolve("frame"); })];
        });
    }
    box.boxGuidebar_config = boxGuidebar_config;
    var Guidebar = /** @class */ (function (_super) {
        __extends(Guidebar, _super);
        function Guidebar() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        // #boxGuidebar_start => e
        Guidebar.prototype.boxGuidebar_start = function (resolve) {
            var self = this.sysObject_this;
            self.boxGuidebar_list = resolve(Guidebar.boxGuidebar_listKey);
            return resolve(Guidebar.boxGuidebar_key).uiControl_element;
        };
        // #boxGuidebar_key => a
        Guidebar.boxGuidebar_key = "_x_guidebar";
        // #boxGuidebar_listkey => b
        Guidebar.boxGuidebar_listkey = "_x_guide";
        // #boxGuidebar_items => c
        Guidebar.boxGuidebar_items = [
            {
                uiListItem_id: "outline",
                uiListItem_place: 5,
                uiListItem_text: "feeback"
            },
            {
                uiListItem_id: "underline",
                uiListItem_text: "underline",
            },
        ];
        return Guidebar;
    }(sys.xObject));
    box.Guidebar = Guidebar;
})(box || (box = {}));
//# sourceMappingURL=guidebar.js.map
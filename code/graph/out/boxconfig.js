/// <reference path="../sys/core.ts"/>
/// <reference path="../ui/modal.ts"/>
/// <reference path="dialog/dialogconfig.ts"/>
var box;
(function (box) {
    // #boxRoot_config => $1
    function boxRoot_config() {
        var sysPod = sys.Pod;
        var register = sysPod.sysPod_inject;
        register(ui.Modal).sysBean_signleton;
        [box.boxDialog_config, box.boxEdgebar_config,
            box.boxFootbar_config, box.boxFormat_config].forEach(function (x) { return x.call(box, sys.Lazy, box.Lang, register, sysPod.sysPod_depend); });
    }
    box.boxRoot_config = boxRoot_config;
})(box || (box = {}));
//# sourceMappingURL=boxconfig.js.map
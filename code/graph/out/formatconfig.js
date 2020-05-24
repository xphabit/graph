var box;
(function (box) {
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
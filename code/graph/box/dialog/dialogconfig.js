/// <reference path="prompt.ts"/>
var box;
(function (box) {
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
})(box || (box = {}));
//# sourceMappingURL=dialogconfig.js.map
/// <reference path="prompt.ts"/>
namespace box {

	// #boxDialog_config => $d
	export function boxDialog_config(lazy: any, lang: ILang,
		register: (service: Function, name?: string) => sys.IBean,
		resolve: (service: any) => any): void {
		let uiModal: any = ui.Modal;

		// Configure link dialog
		let linkOption: PromptOption = {
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
		register(Prompt, "link").sysBean_argument(
			() => [null, linkOption]);

	}

}
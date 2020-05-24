/// <reference path="../../ui/dialog.ts"/>
/// <reference path="../../ui/common.ts"/>
/// <reference path="../../ui/textbox.ts"/>

namespace box {

	export class Prompt extends ui.Dialog {

		// #boxPrompt_text => $00
		private boxPrompt_text: ui.Textbox;

		///////////////////////////////////////////////////////////////////////

		constructor(parent: ui.Control, option?: PromptOption) {
			super(parent, option);
			this.boxPromote_binder = [this.sysObject_bind(this.boxPromote_onHidden)];
		}

		// Create body
		protected uiDialog_body(): void {
			super.uiDialog_body();
			let self: Prompt = <Prompt>this.sysObject_this;
			let option: PromptOption = <PromptOption>self.uiControl_option;

			// Icon & label band
			let band: ui.Pane = self.uiDialog_band("_xdtip");
			new ui.Image(new ui.Pane(band, { uiControlOption_class: "icon" }), {
					uiControlOption_icon: option.uiControlOption_icon});
			new ui.Text(band, { uiControlOption_text: option.boxPromptOption_tip });

			// Input band
			self.boxPrompt_text = new ui.Textbox(self.uiDialog_band(), {
				uiTextboxOption_placeHolder: option.boxPromptOption_placeHolder,
				uiControlOption_class: "_xdtext"});

			// Foot band confirm button
			new ui.Button(self.uiDialog_foot, {
				uiControlOption_action: self.sysObject_bind(self.boxPrompt_confirm),
				uiControlOption_text: option.uiDialogOption_confirm,
				uiControlOption_class: "ok"});
		}

		// #boxPrompt_confirm => $01
		private boxPrompt_confirm(sender: ui.Button): void {
			let self: Prompt = <Prompt>this.sysObject_this;
			let option: PromptOption = <PromptOption>self.uiControl_option;
			let input: HTMLInputElement = <HTMLInputElement>self.boxPrompt_text.uiControl_element;
			if (option.uiControlOption_action)
				sys.sysRoot_delay(option.uiControlOption_action, input.value);
			self.uiControl_hidden(true);
		}

		// #boxPrompt_show => $02
		public boxPrompt_show(value: string): void {
			let self: Prompt = <Prompt>this.sysObject_this;
			self.boxPrompt_text.uiControl_update({ uiControlOption_text: value });
			if (self.uiControl_element)
				sys.Html.sysHtml_event(define.$const_actionAddEvent, self.uiControl_element,
					[define.$const_eventHidden], self.boxPromote_binder);
			super.uiDialog_show();
		}

		// #boxPromote_binder => $03
		private boxPromote_binder: any[];

		// #boxPromote_onHidden => $04
		public boxPromote_onHidden(event: CustomEvent): any {
			if (!(<ui.IControl>event.detail).uiControl_hidden()) {
				this.boxPrompt_text.uiControl_element.focus();
			}
		}

		public uiControl_destory(html: sys.IHtml): void {
			let self: Prompt = <Prompt>this.sysObject_this;
			html.sysHtml_event(define.$const_actionRemoveEvent, self.uiControl_control,
				[define.$const_eventHidden], self.boxPromote_binder);
			super.uiControl_destory(html);
		}

	}

	export interface PromptOption extends ui.DialogOption {

		// #boxPromptOption_placeHolder => $00
		boxPromptOption_placeHolder?: string;

		// #boxPromptOption_tip => $01
		boxPromptOption_tip?: string;

	}

}

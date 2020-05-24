/// <reference path="Control.ts"/>

namespace ui {

	export class Textbox extends Control {

		// #uiTextbox_binder => $0
		private uiTextbox_binder: any[];

		// Default constructor
		constructor(parent?: Control, option?: TextboxOption) {
			super(parent, option);
			this.uiTextbox_binder = [this.sysObject_bind(this.uiTextbox_onChange)];
		}

		// Create the control
		protected uiControl_create(html: sys.IHtml): void {
			let self: Textbox = <Textbox>this.sysObject_this;
			let option: TextboxOption = <TextboxOption>self.uiControl_option;
			let mutipleLines: boolean = option.uiTextboxOption_rows > 0 || option.uiTextboxOption_cols > 0;
			self.uiControl_control = html.sysHtml_element(
				mutipleLines ? "textarea" : "input", option.uiControlOption_class);
			let input: HTMLInputElement = <HTMLInputElement>self.uiControl_control;
			if (option.uiTextboxOption_placeHolder)
				input.placeholder = option.uiTextboxOption_placeHolder;
			if (option.uiTextboxOption_maxLength)
				input.maxLength = option.uiTextboxOption_maxLength;
			if (mutipleLines) {
				let area: HTMLTextAreaElement =
					<HTMLTextAreaElement>self.uiControl_control;
				area.rows = option.uiTextboxOption_rows;
				area.cols = option.uiTextboxOption_cols;
			}
			if (self.uiControl_option.uiControlOption_action)
				html.sysHtml_event(define.$const_actionAddEvent,
					input, [define.$const_eventChange], self.uiTextbox_binder);
			if (option.uiControlOption_text)
				input.value = option.uiControlOption_text;
			super.uiControl_create(html);
		}

		// Update the control
		public uiControl_update(param: TextboxOption): void {
			super.uiControl_update(param);
			let self: Textbox = <Textbox>this.sysObject_this;
			let input: HTMLInputElement = <HTMLInputElement>self.uiControl_control;
			if (input && self.uiControl_option.uiControlOption_text)
				input.value = self.uiControl_option.
					uiControlOption_text;
		}

		// #uiTextbox_onChange => $1
		private uiTextbox_onChange(event: Event): any {
			let self: Textbox = <Textbox>this.sysObject_this;
			sys.sysRoot_delay(self.uiControl_option.uiControlOption_action,
				self, (<HTMLInputElement>self.uiControl_control).value);
		}

		// Remove the control
		public uiControl_destory(html: sys.IHtml): void {
			let self: Textbox = <Textbox>this.sysObject_this;
			if (self.uiControl_option.uiControlOption_action)
				html.sysHtml_event(define.$const_actionRemoveEvent, self.uiControl_control,
					[define.$const_eventChange], self.uiTextbox_binder);
			super.uiControl_destory(html);
		}

	}

	export interface TextboxOption extends ControlOption {

		// #uiTextboxOption_placeHolder => $0
		uiTextboxOption_placeHolder?: string;

		// #uiTextboxOption_maxLength => $1
		uiTextboxOption_maxLength?: number;

		// #uiTextboxOption_rows => $2
		uiTextboxOption_rows?: number;

		// #uiTextboxOption_cols => $3
		uiTextboxOption_cols?: number;

	}

}
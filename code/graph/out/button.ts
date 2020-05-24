/// <reference path="control.ts"/>
/// <reference path="../sys/html.ts"/>
/// <reference path="../sys/svg.ts"/>

namespace ui {

	export class Button extends Control {

		// #uiButton_binder => $0
		private uiButton_binder: any[];

		// Default constructor
		constructor(parent?: Control, option?: ControlOption) {
			super(parent, option);
			this.uiButton_binder = [this.sysObject_bind(this.uiButton_onClick)]; // Keep event order
		}

		// #uiButton_span => $1
		protected uiButton_span: HTMLElement;

		// #uiButton_icon => $2
		protected uiButton_icon: Element;

		// Create control
		protected uiControl_create(html: sys.IHtml): void {
			let self: Button = <Button>this.sysObject_this;
			let option: ControlOption = self.uiControl_option;
			self.uiControl_control = html.sysHtml_element("button", option.uiControlOption_class);
			if (option.uiControlOption_icon) {
				self.uiButton_icon = html.sysHtml_svgIcon(option.uiControlOption_icon);
				html.sysHtml_appendTo(self.uiButton_icon,
					self.uiControl_control);
			}

			if (option.uiControlOption_action)
				self.uiControl_onOffEvents(self.uiControl_on,
					[define.$const_eventClick], self.uiButton_binder);
			self.uiButton_span = html.sysHtml_element("span");
			if (option.uiControlOption_text)
				self.uiButton_span.innerText = option.uiControlOption_text;
			html.sysHtml_appendTo(self.uiButton_span,
				self.uiControl_control);

			if (option.uiControlOption_tip)
				html.sysHtml_attribute(self.uiControl_control,
					"title", option.uiControlOption_tip);
			super.uiControl_create(html);
		}

		// #uiButton_onClick => $3
		private uiButton_onClick(event: MouseEvent): any {
			sys.sysRoot_delay(this.uiControl_option.uiControlOption_action, this);
		}

		// Remove the control
		public uiControl_destory(): void {
			let self: Button = <Button>this.sysObject_this;
			if (self.uiControl_option.uiControlOption_action)
				self.uiControl_onOffEvents(self.uiControl_off,
					[define.$const_eventClick], self.uiButton_binder);
			super.uiControl_destory();
		}

	}

}

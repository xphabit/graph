/// <reference path="control.ts"/>

namespace ui {

	export class Label extends Control {

		// Default constructor
		constructor(parent?: Control, option?: ControlOption) {
			super(parent, option);
		}

		// Create the control
		protected uiControl_create(html: sys.IHtml): void {
			let self: Label = <Label>this.sysObject_this;
			let option: ControlOption = self.uiControl_option;
			self.uiControl_control = html.sysHtml_element(
				"label", option.uiControlOption_class);
			if (option.uiControlOption_text)
				self.uiControl_control.innerText = option.uiControlOption_text;
			super.uiControl_create(html);
		}

		// Update the control
		public uiControl_update(param: ControlOption): void {
			super.uiControl_update(param);
			let self: Label = <Label>this.sysObject_this;
			if (self.uiControl_control &&
				self.uiControl_option.uiControlOption_text) {
				self.uiControl_control.innerText = self.uiControl_option.
					uiControlOption_text;
			}
		}

	}

}
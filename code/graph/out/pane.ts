/// <reference path="Control.ts"/>
/// <reference path="../sys/html.ts"/>

namespace ui {

	export class Pane extends Control {

		// Default constructor
		constructor(parent?: Control, option?: ControlOption) {
			super(parent, option);
		}

		// Create a control
		protected uiControl_create(html: sys.IHtml): void {
			let self: Pane = <Pane>this.sysObject_this;
			self.uiControl_control = html.sysHtml_element(
				"div", self.uiControl_option.uiControlOption_class);
			self.uiControl_kids.forEach(kid => {
				html.sysHtml_appendTo(kid.uiControl_element,
					self.uiControl_control)});
			self.uiControl_modal(true); // setup modal
			super.uiControl_create(html);
		}

		// Remove control
		public uiControl_destory(): void {
			this.uiControl_modal(false);
			super.uiControl_destory();
		}

	}

}
/// <reference path="control.ts"/>
/// <reference path="../sys/svg.ts"/>

namespace ui {

	///////////////////////////////////////////////////////////////////////////////////////////////
	//
	// Button control
	//
	export class Button extends Control {

		// #uiButton_binder => $0
		private uiButton_binder: any[];

		// Default constructor
		constructor(parent?: Control, option?: ControlOption) {
			super(parent, option);
			this.uiButton_binder = [this.sysObject_bind(this.uiButton_onClick)]; // Keep event order
		}

		// Create control
		protected uiControl_create(html: sys.IHtml): void {
			let self: Button = <Button>this.sysObject_this;
			let option: ControlOption = self.uiControl_option;
			self.uiControl_control = html.sysHtml_element("button", option.uiControlOption_class);
			if (option.uiControlOption_action)
				html.sysHtml_event(define.$const_actionAddEvent, self.uiControl_control,
					[define.$const_eventClick], self.uiButton_binder);
			if (option.uiControlOption_text)
				self.uiControl_control.innerText = option.uiControlOption_text;
			if (option.uiControlOption_tip)
				html.sysHtml_attribute(self.uiControl_control,
					"title", option.uiControlOption_tip);
			super.uiControl_create(html);
		}

		// #uiButton_onClick => $1
		private uiButton_onClick(event: MouseEvent): any {
			event.stopPropagation();
			sys.sysRoot_delay(this.uiControl_option.uiControlOption_action, this);
		}

		// Remove the control
		public uiControl_destory(html: sys.IHtml): void {
			let self: Button = <Button>this.sysObject_this;
			if (self.uiControl_option.uiControlOption_action)
				html.sysHtml_event(define.$const_actionRemoveEvent, self.uiControl_control,
					[define.$const_eventClick], self.uiButton_binder);
			super.uiControl_destory(html);
		}

	}

	///////////////////////////////////////////////////////////////////////////////////////////////
	//
	// Image control
	//
	export class Image extends Control {

		constructor(parent?: Control, option?: ImageOption) {
			option = option || {};
			option.uiImageOption_tag =
				option.uiImageOption_tag || "svg";
			super(parent, option);
		}

		public uiControl_create(html: sys.IHtml): void {
			let self: Image = <Image>this.sysObject_this;
			let option: ImageOption = <ImageOption>self.uiControl_option;
			if (option.uiImageOption_tag == "svg") {
				self.uiControl_control = <HTMLElement>
					html.sysHtml_svgIcon(<string>option.uiControlOption_icon);
				if (option.uiControlOption_class)
					self.uiControl_control.className = option.uiControlOption_class;
			}
		}

	}

	export interface ImageOption extends ControlOption {

		// #uiImageOption_tag => $0
		uiImageOption_tag?: string;

	}

	///////////////////////////////////////////////////////////////////////////////////////////////
	//
	// Text control
	//
	export class Text extends Control {

		// Default constructor
		constructor(parent?: Control, option?: TextOption) {
			option = option || {};
			option.uiTextOption_tag =
				option.uiTextOption_tag || "span";
			super(parent, option);
		}

		// Create the control
		protected uiControl_create(html: sys.IHtml): void {
			let self: Text = <Text>this.sysObject_this;
			let option: TextOption = self.uiControl_option;
			self.uiControl_control = html.sysHtml_element(
				option.uiTextOption_tag, option.uiControlOption_class);
			if (option.uiControlOption_text)
				self.uiControl_control.innerText = option.uiControlOption_text;
			super.uiControl_create(html);
		}

		// Update the control
		public uiControl_update(param: ControlOption): void {
			super.uiControl_update(param);
			let self: Text = <Text>this.sysObject_this;
			if (self.uiControl_control &&
				self.uiControl_option.uiControlOption_text) {
				self.uiControl_control.innerText = self.uiControl_option.
					uiControlOption_text;
			}
		}

	}

	export interface TextOption extends ControlOption {

		// #uiTextOption_tag => $0
		// The value should be span or label, default is span
		uiTextOption_tag?: string;

	}

	///////////////////////////////////////////////////////////////////////////////////////////////
	//
	// Pane control
	//
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
			self.uiControl_modal(true); // Setup modal
			super.uiControl_create(html);
		}

		// Remove control
		public uiControl_destory(html: sys.IHtml): void {
			this.uiControl_modal(false);
			super.uiControl_destory(html);
		}

	}

}
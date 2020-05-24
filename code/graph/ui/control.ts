/// <reference path="../sys/core.ts"/>
/// <reference path="../sys/html.ts"/>

namespace ui {

	export class Control extends sys.xObject implements IControl {

		// The kid list
		// #uiControl_kids => z
		public uiControl_kids: Array<Control> = [];

		// #uiControl_control => y
		protected uiControl_control: HTMLElement;

		// #uiControl_option => x
		public uiControl_option: ControlOption;

		// The parent
		// #uiControl_parent => w
		public uiControl_parent: Control;

		/////////////////////////////////////////////////////////////////////////////

		// The default constructor
		constructor(parent?: Control, option?: ControlOption) {
			super();
			if (parent) parent.uiControl_kids.push(this);
			this.uiControl_option = option || {};
			this.uiControl_parent = parent;
		}

		// #uiControl_element => v
		public get uiControl_element(): HTMLElement {
			let self: Control = <Control>this.sysObject_this;
			if (!self.uiControl_control) self.uiControl_create(sys.Html);
			return self.uiControl_control;
		}

		/////////////////////////////////////////////////////////////////////////////

		// Create the control
		// The function will be called by child
		// #uiControl_create => u
		protected uiControl_create(html: sys.IHtml): void {
			let self: Control = <Control>this.sysObject_this;
			if (self.uiControl_control) {
				self.uiControl_kids.forEach(kid => {
					html.sysHtml_appendTo(kid.uiControl_element, self.uiControl_control) });
				self.uiControl_state(self,
					self.uiControl_option);
			}
		}

		// Update the control accord option
		// #uiControl_update => t
		public uiControl_update(param: ControlOption): void {
			let self: Control = <Control>this.sysObject_this;
			let option: ControlOption = self.uiControl_option;
			["uiControlOption_action", "uiControlOption_disabled",
				"uiControlOption_hidden", "uiControlOption_text", "uiControlOption_tip"].
				forEach(item => {
					if (sys.sysRoot_defined(param[item]))
						option[item] = param[item]
				});
			if (self.uiControl_control) {
				self.uiControl_state(self, option);
			}
		}

		// Remove a kid from children list
		// #uiControl_remove => s
		private uiControl_remove(kid: IControl): void {
			let list: Array<IControl> = this.uiControl_kids;
			let index: number = list.indexOf(kid);
			if (index >= 0) {
				list.splice(index, 1);
			}
		}

		// Destroy the object
		// #uiControl_destory => r
		public uiControl_destory(html: sys.IHtml): void {
			let self: Control = <Control>this.sysObject_this;
			if (self.uiControl_parent)
				self.uiControl_parent.uiControl_remove(self);
			while (self.uiControl_kids.length > 0)
				self.uiControl_kids[0].uiControl_destory(html);
		}

		// Hidden of the control
		// #uiControl_hidden => q
		public uiControl_hidden(value?: boolean): boolean {
			let self: Control = <Control>this.sysObject_this;
			let control: HTMLElement = self.uiControl_control;
			if (control) {
				if (sys.sysRoot_defined(value) && control.hidden != value) {
					control.hidden = value;
					self.uiControl_kids.forEach(kid => kid.uiControl_hidden(value));
					control.dispatchEvent(new CustomEvent(
						"hidden", { "detail": self }));
				}
				return control.hidden;
			}
		}

		/////////////////////////////////////////////////////////////////////////////

		// Setup modal
		// #uiControl_modal => p
		protected uiControl_modal(on: boolean): void {
			let self: Control = <Control>this.sysObject_this;
			if (self.uiControl_option.uiControlOption_modal) {
				on ? sys.Html.sysHtml_appendTo(self.uiControl_control) :
					self.uiControl_control.remove();
			}
		}

		// Display picker at point
		// align - undefine: left, define: right
		// #uiControl_pop => o
		//  %place = define.$const_placeWhere
		public uiControl_pop(x: number, y: number, place?: number): void {
			let html: sys.IHtml = sys.Html;
			let self: Control = <Control>this.sysObject_this;
			let modal: IModal = self.uiControl_option.uiControlOption_modal;
			if (modal) {
				let element: HTMLElement = self.uiControl_element;
				html.sysHtml_css(element, html.sysHtml_place(place || 0, x, y));
				html.sysHtml_class(define.$const_actionAddClass,
					element, ["_xpopup"]);
				modal.uiModal_show(self);
			}
		}

		// Quit modal
		// #uiControl_quit => n
		public uiControl_quit(): void {
			let modal: IModal =
				this.uiControl_option.uiControlOption_modal;
			if (modal) {
				modal.uiModal_quit();
			}
		}

		// #uiControl_state => m
		protected uiControl_state(self: Control, option: ControlOption): void {
			self.uiControl_control["disabled"] = !!option.uiControlOption_disabled;
			self.uiControl_control.hidden = !!option.uiControlOption_hidden;
			if (option.uiControlOption_id) {
				self.uiControl_control.dataset.id =
					option.uiControlOption_id;
			}
		}

	}

	export interface ControlOption {

		// #uiControlOption_id => a
		uiControlOption_id?: string;

		// #uiControlOption_class => b
		uiControlOption_class?: string;

		// #uiControlOption_action => c
		uiControlOption_action?: (sender: IControl, param: any) => any;

		// #uiControlOption_disabled => d
		uiControlOption_disabled?: boolean;

		// #uiControlOption_hidden => e
		uiControlOption_hidden?: boolean;

		// #uiControlOption_modal => f
		uiControlOption_modal?: IModal;

		// #uiControlOption_text => g
		uiControlOption_text?: string;

		// #uiControlOption_tip => h
		uiControlOption_tip?: string;

		// #uiControlOption_icon => i
		// Any type, can be STRING for icon name or FUNCTION to draw icon
		uiControlOption_icon?: any;

	}

	export interface IControl {

		uiControl_hidden(value?: boolean): boolean;

		uiControl_update(option: ControlOption): void;

		readonly uiControl_option: ControlOption;

		readonly uiControl_element: HTMLElement;

		readonly uiControl_kids: Array<IControl>;

		readonly uiControl_parent: IControl;

		uiControl_destory(html: sys.IHtml): void;

	}


	export interface IModal {

		uiModal_show(target: IControl, mask?: boolean): void;

		uiModal_quit(): void;

	}


}
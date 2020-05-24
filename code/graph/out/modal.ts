// The modal manager control
//
// @Histroy
//   2018/06/20  Heyang  Initial version
//

/// <reference path="../sys/html.ts"/>
/// <reference path="control.ts"/>

namespace ui {

	export class Modal extends Control implements IModal {

		// #uiModal_target => $0
		private uiModal_target: Array<Control> = [];

		// #uiModal_docBinder => $1
		private uiModal_docBinder: any[];

		// #uiModal_targetBinder => $2
		private uiModal_targetBinder: any[];

		// #uiModal_binder => $3
		private uiModal_binder: any[];

		///////////////////////////////////////////////////////////////////////

		// The default constructor
		constructor(option?: ControlOption) {
			super(null, option);
			let html: sys.IHtml = sys.Html;
			this.uiControl_control = html.sysHtml_element("div", "_xmodal");
			this.uiModal_initial(this, html);
		}

		// #uiModal_initial => $4
		private uiModal_initial(self: Modal, html: sys.IHtml): void {
			self.uiControl_control.hidden = true;
			self.uiModal_docBinder = [self.sysObject_bind(self.uiModal_onKeydown)];
			self.uiModal_binder = [self.sysObject_bind(self.uiModal_onMousedown), self.sysObject_bind(self.uiModal_onContext)];
			self.uiModal_targetBinder = [self.sysObject_bind(self.uiModal_onHidden)];
			html.sysHtml_appendTo(self.uiControl_control);
		}

		// Show target component
		// #uiModal_show => $5
		public uiModal_show(target: IControl, mask?: boolean): void {
			let html: sys.IHtml = sys.Html;
			let self: Modal = <Modal>this.sysObject_this;
			html.sysHtml_class([define.$const_actionRemoveClass,
				define.$const_actionAddClass][Number(!!mask)],
				self.uiControl_control, ["_xmask"]);
			html.sysHtml_event(define.$const_actionAddEvent, target.uiControl_element,
				[define.$const_eventHidden], self.uiModal_targetBinder);
			target.uiControl_hidden(false);
		}

		// Quit modal state
		// #uiModal_quit => $6
		public uiModal_quit(): void {
			this.uiModal_target.forEach(target => target.uiControl_hidden(true));
		}

		// Handle target hidden/show
		// #uiModal_onHidden => $7
		private uiModal_onHidden(event: CustomEvent): any {
			let html: sys.IHtml = sys.Html;
			let self: Modal = <Modal>this.sysObject_this;
			if ((<IControl>event.detail).uiControl_hidden()) {
				let top: IControl = self.uiModal_target.pop();
				if (self.uiModal_target.length == 0) {
					self.uiModal_unhook(html);
					html.sysHtml_event(define.$const_actionRemoveEvent, top.uiControl_element,
						[define.$const_eventHidden], self.uiModal_targetBinder);
					top.uiControl_destory(html);
				}
			} else {
				self.uiModal_target.push(event.detail);
				if (self.uiModal_target.length == 1)
					self.uiModal_hook(html);
			}
		}

		// Keydown on document 
		// #uiModal_onKeydown => $8
		private uiModal_onKeydown(event: KeyboardEvent): any {
			if (event.keyCode == 27) { // ESC to hide the top item
				event.stopPropagation();
				let targets: Array<Control> = this.uiModal_target;
				if (targets.length > 0) {
					let index: number = targets.length - 1;
					targets[index].uiControl_hidden(true);
				}
			}
		}

		// Mouse down handler
		// #uiModal_onMousedown => $9
		private uiModal_onMousedown(event: MouseEvent): any {
			let bound: boolean = false;
			this.uiModal_target.forEach(item => bound = bound ||
				sys.Html.sysHtml_contain(event.pageX, event.pageY,
					item.uiControl_element));
			if (!bound) {
				this.uiModal_target.forEach(item =>
					item.uiControl_hidden(true));
			}
		}

		// Hook system event
		// #uiModal_hook => x0
		private uiModal_hook(html: sys.IHtml): void {
			let self: Modal = <Modal>this.sysObject_this;
			html.sysHtml_event(define.$const_actionAddEvent, self.uiControl_control,
				[define.$const_eventMouseDown, define.$const_eventContext], self.uiModal_binder);
			html.sysHtml_event(define.$const_actionAddEvent, <HTMLElement>html.sysHtml_document(),
				[define.$const_eventKeydown], self.uiModal_docBinder);
			self.uiControl_hidden(false);
		}

		// Unhook system event
		// #uiModal_unhook => x1
		private uiModal_unhook(html: sys.IHtml): void {
			let self: Modal = <Modal>this.sysObject_this;
			html.sysHtml_event(define.$const_actionRemoveEvent, self.uiControl_control,
				[define.$const_eventMouseDown, define.$const_eventContext], self.uiModal_binder);
			html.sysHtml_event(define.$const_actionRemoveEvent, <HTMLElement>html.sysHtml_document(),
				[define.$const_eventKeydown], self.uiModal_docBinder);
			self.uiControl_hidden(true);
		}

		// #uiModal_onContext => x2
		private uiModal_onContext(event: PointerEvent): any {
			this.uiModal_target.forEach(item => item.uiControl_hidden(true));
			return false;
		}

	}

}
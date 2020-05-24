/// <reference path="control.ts"/>
/// <reference path="common.ts"/>

namespace ui {

	export class Dialog extends Control {

		// #uiDialog_title => $0
		protected uiDialog_title: Pane;

		// #uiDialog_foot => $1
		protected uiDialog_foot: Pane;

		// #uiDialog_pane => $2
		protected uiDialog_pane: Pane;

		////Functions//////////////////////////////////////////////////////////

		// Default constructor
		constructor(parent?: Control, option?: DialogOption) {
			super(parent, option);
			let closebind: any = this.sysObject_bind(this.uiDialog_onClose);
			this.uiDialog_title = this.uiDialog_createTitle();
			this.uiDialog_foot = this.uiDialog_createFoot(closebind);
			new Text(new Button(this, {uiControlOption_action: closebind,
				uiControlOption_class: "_xdoff" }));
			this.uiDialog_body();
		}

		// Create a band
		// #uiDialog_band => $3
		public uiDialog_band(className?: string): ui.Pane {
			return new ui.Pane(this.uiDialog_pane, {
				uiControlOption_class: "_xdband" + (className ? " " + className : "")
			});
		}

		// Display the dialog
		// #uiDialog_show => $4
		public uiDialog_show(): void {
			let self: Dialog = <Dialog>this.sysObject_this;
			let option: DialogOption = <DialogOption>self.uiControl_option;
			sys.Html.sysHtml_css(self.uiControl_element,
				`width:${option.uiDialogOption_width}px;height:${option.uiDialogOption_height}px;margin-left:${-option.uiDialogOption_width / 2}px;margin-top:${-option.uiDialogOption_height * 3 / 4}px`);
			option.uiControlOption_modal.uiModal_show(self, true);
		}

		// Create the component
		protected uiControl_create(html: sys.IHtml): void {
			let self: Dialog = <Dialog>this.sysObject_this;
			let option: DialogOption = <DialogOption>self.uiControl_option;
			let id: string = option.uiControlOption_id;
			self.uiControl_control = html.sysHtml_element("div", option.uiControlOption_class);
			html.sysHtml_class(define.$const_actionAddClass, self.uiControl_control, ["_xdlg"]);
			if (sys.sysRoot_defined(option.uiControlOption_hidden))
				self.uiControl_control.hidden = option.uiControlOption_hidden;
			self.uiControl_control.id = id;
			self.uiControl_modal(true); // Setup modal
			super.uiControl_create(html);
		}

		// Create dialog body
		// #uiDialog_body => $5
		protected uiDialog_body(): void {
			this.uiDialog_pane = new Pane(this, { uiControlOption_class: "_xdbody" })
		}

		// #uiDialog_createTitle => $6
		private uiDialog_createTitle(): Pane {
			let self: Dialog = <Dialog>this.sysObject_this;
			let title = new Pane(self, { uiControlOption_class: "_xdtitle" });
			new Text(title, { uiControlOption_text:
				self.uiControl_option.uiControlOption_text });
			return title;
		}

		// #uiDialog_createFoot => $7
		private uiDialog_createFoot(onClosebind: any): Pane {
			let self: Dialog = <Dialog>this.sysObject_this;
			let foot: Pane = new Pane(self, {uiControlOption_class: "_xdfoot"});
			new Button(foot, {
				uiControlOption_action: onClosebind,
				uiControlOption_text: (<DialogOption>self.uiControl_option).uiDialogOption_cancel});
			return foot;
		}

		// #uiDialog_onClose => $8
		private uiDialog_onClose(sender: Control): any {
			this.uiControl_hidden(true);
		}

		// Destroy the component
		public uiControl_destory(html: sys.IHtml): void {
			this.uiControl_modal(false);
			super.uiControl_destory(html);
		}
	}

	export interface DialogOption extends ControlOption {

		// #uiDialogOption_height => $0
		uiDialogOption_height?: number;

		// #uiDialogOption_width => $1
		uiDialogOption_width?: number;

		// #uiDialogOption_confirm => $2
		// The title of confirm button title
		uiDialogOption_confirm?: string;

		// #uiDialogOption_cancel => $3
		// The title of cancel button title
		uiDialogOption_cancel?: string;

	}

}
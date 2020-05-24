namespace ui {

	export class Toggle extends Control {

		// #uiToggle_binder => $0
		private uiToggle_binder: any[];

		///////////////////////////////////////////////////////////////////////

		constructor(parent?: Control, option?: ToggleOption) {
			super(parent, option);
			this.uiToggle_binder = [this.sysObject_bind(this.uiToggle_onClick)];
			new Text(new Text(this, { uiControlOption_class: "out" }),
				{ uiControlOption_class: "in" });
		}

		public uiControl_create(html: sys.IHtml): void {
			let self: Toggle = <Toggle>this.sysObject_this;
			let option: ToggleOption = <ToggleOption>self.uiControl_option;
			let wrap: HTMLElement =
				html.sysHtml_element("button", option.uiControlOption_class);
			self.uiControl_control = wrap;
			html.sysHtml_class(define.$const_actionAddClass, wrap, ["_xcheck"]);
			if (option.uiControlOption_tip)
				html.sysHtml_attribute(wrap, "title", option.uiControlOption_tip);
			if (option.uiToggleOption_checked)
				html.sysHtml_class(define.$const_actionAddClass, wrap, ["on"]);
			if (option.uiControlOption_text)
				self.uiControl_control.dataset.tip = option.uiControlOption_text;
			html.sysHtml_event(define.$const_actionAddEvent, wrap,
				[define.$const_eventClick], self.uiToggle_binder);

			super.uiControl_create(html);
		}

		// #uiToggle_onClick => $1
		private uiToggle_onClick(event: MouseEvent): any {
			console.log("uiToggle::onClick - " +
				(<ToggleOption>this.uiControl_option).uiToggleOption_checked);
			event.stopPropagation();
			this.uiToggle_checked(!(<ToggleOption>this.uiControl_option).
				uiToggleOption_checked);
		}

		// Set checked of the button
		// #uiToggle_checked => $2
		private uiToggle_checked(value?: boolean): boolean {
			let self: Toggle = <Toggle>this.sysObject_this;
			let option: ToggleOption = <ToggleOption>self.uiControl_option;
			if (!sys.sysRoot_defined(value))
				return option.uiToggleOption_checked
			option.uiToggleOption_checked = value;
			sys.sysRoot_delay(option.uiControlOption_action, self, value);
			sys.Html.sysHtml_class([define.$const_actionRemoveClass,
				define.$const_actionAddClass][Number(value)],
				self.uiControl_control,
				["on"]);
		}

		// Update the control
		public uiControl_update(param: ToggleOption): void {
			super.uiControl_update(param);
			let self: Toggle = <Toggle>this.sysObject_this;
			let option: ToggleOption = <ToggleOption>this.uiControl_option;
			if (sys.sysRoot_defined(param.uiToggleOption_checked)) {
				option.uiToggleOption_checked = param.uiToggleOption_checked;
				sys.Html.sysHtml_class([define.$const_actionRemoveClass,
					define.$const_actionAddClass][Number(option.uiToggleOption_checked)],
					self.uiControl_control, ["on"]);
			}
		}

		// Destroy the button
		public uiControl_destory(html: sys.IHtml): void {
			let self: Toggle = <Toggle>this.sysObject_this;
			html.sysHtml_event(define.$const_actionRemoveEvent, self.uiControl_control,
				[define.$const_eventClick], self.uiToggle_binder);
			super.uiControl_destory(html);
		}

	}

	// The toggle option
	//
	export interface ToggleOption extends ControlOption {

		// #uiToggleOption_checked => $0
		uiToggleOption_checked?: boolean;

	}

}
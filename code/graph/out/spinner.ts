namespace ui {

	export class Spinner extends Pane {

		// #uiSpinner_class => $00
		private uiSpinner_class: string[] = ["inc", "dec", "hex"];

		///////////////////////////////////////////////////////////////////////

		constructor(parent?: Control, option?: SpinnerOption) {
			super(parent, option);
			let param: SpinnerOption = <SpinnerOption>this.uiControl_option;
			param.uiSpinnerOption_max = param.uiSpinnerOption_max || Number.MAX_VALUE;
			param.uiSpinnerOption_min = param.uiSpinnerOption_min || -param.uiSpinnerOption_max;
			param.uiSpinnerOption_value = param.uiSpinnerOption_value || 0;
			new Textbox(this, { // 0
				uiControlOption_action: this.sysObject_bind(this.uiSpinner_onChange),
				uiControlOption_text: param.uiSpinnerOption_value.toString(),
				uiControlOption_class: this.uiSpinner_class[2]
			});
			new Button(this, { // 1
				uiControlOption_action: this.sysObject_bind(this.uiSpinner_onClick),
				uiControlOption_class: this.uiSpinner_class[0]
			});
			new Button(this, { // 2
				uiControlOption_action: this.sysObject_bind(this.uiSpinner_onClick),
				uiControlOption_class: this.uiSpinner_class[1]
			});
		}

		public uiControl_create(html: sys.IHtml): void {
			super.uiControl_create(html);
			html.sysHtml_class(define.$const_actionAddClass,
				this.uiControl_control, ["_xspin"]);
		}

		// #uiSpinner_adjust => $01
		private uiSpinner_adjust(option: SpinnerOption): void {
			if (option.uiSpinnerOption_min && option.uiSpinnerOption_value < option.uiSpinnerOption_min)
				option.uiSpinnerOption_value = option.uiSpinnerOption_min;
			if (option.uiSpinnerOption_max && option.uiSpinnerOption_value > option.uiSpinnerOption_max)
				option.uiSpinnerOption_value = option.uiSpinnerOption_max;
		}

		public uiControl_update(param: SpinnerOption): void {
			super.uiControl_update(param);
			let self: Spinner = <Spinner>this.sysObject_this;
			let option: SpinnerOption = <SpinnerOption>self.uiControl_option;
			self.uiControl_kids.forEach(x => {
				x.uiControl_update({uiControlOption_disabled: option.uiControlOption_disabled})});
			if (param.uiSpinnerOption_value) {
				option.uiSpinnerOption_value = param.uiSpinnerOption_value;
				self.uiControl_kids[0].uiControl_update({
					uiControlOption_text: option.
						uiSpinnerOption_value.toString()
				});
			}
		}

		// #uiSpinner_onClick => $02
		private uiSpinner_onClick(sender: Button): any {
			let self: Spinner = <Spinner>this.sysObject_this;
			let option: SpinnerOption = <SpinnerOption>self.uiControl_option;
			if (option.uiSpinnerOption_value > option.uiSpinnerOption_min &&
				option.uiSpinnerOption_value < option.uiSpinnerOption_max) {
				option.uiSpinnerOption_value +=
					(sender.uiControl_option.uiControlOption_class == self.uiSpinner_class[0]) ? 1 : -1;
				self.uiControl_kids[0].uiControl_update({ uiControlOption_text: option.uiSpinnerOption_value.toString() });
				sys.sysRoot_delay(self.uiControl_option.uiControlOption_action,
					self, option.uiSpinnerOption_value);
			}
		}

		// #uiSpinner_onChange => $03
		private uiSpinner_onChange(sender: Textbox, value: string): any {
			let self: Spinner = <Spinner>this.sysObject_this;
			let option: SpinnerOption = <SpinnerOption>self.uiControl_option;
			let tempValue: number = (+value) | 0;
			if (option.uiSpinnerOption_value != tempValue) {
				option.uiSpinnerOption_value = tempValue;
				self.uiSpinner_adjust(option);
				sys.sysRoot_delay(self.uiControl_option.uiControlOption_action,
					self, option.uiSpinnerOption_value);
			}
		} 

	}

	export interface SpinnerOption extends ControlOption {

		// #uiSpinnerOption_value => $0
		uiSpinnerOption_value?: number;

		// #uiSpinnerOption_max => $1
		uiSpinnerOption_max?: number;

		// #uiSpinnerOption_min => $2
		uiSpinnerOption_min?: number;

	}

}
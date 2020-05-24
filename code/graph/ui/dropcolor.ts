namespace ui {

	export class DropColor extends Control {

		// #uiDropColor_binder => $0
		private uiDropColor_binder: any[];

		// #uiDropColor_colorBinder => $1
		private uiDropColor_colorBinder: any[];

		// #uiDropColor_icon => $2
		private uiDropColor_icon: Text;

		// #uiDropColor_dropper => $4
		private uiDropColor_dropper: Color;

		///////////////////////////////////////////////////////////////////////

		// Default constructor
		constructor(parent?: Control, option?: DropColorOption) {
			super(parent, option);
			let param: DropColorOption = <DropColorOption>this.uiControl_option;
            this.uiDropColor_colorBinder = [this.sysObject_bind(this.uiDropColor_onColorHide)];
            param.uiDropColorOption_color = sys.sysRoot_color(
                define.$const_actionUnboxColor, param.uiDropColorOption_color);
			this.uiDropColor_binder = [this.sysObject_bind(this.uiDropColor_onClick)];
			this.uiDropColor_icon = new Text(this, { uiTextOption_tag: "label" });
			new Text(this, { uiControlOption_text: param.uiControlOption_text });
			new Text(this, { uiControlOption_class: "drop" });
		}

		// Create control
		protected uiControl_create(html: sys.IHtml): void {
			let self: DropColor = <DropColor>this.sysObject_this;
			let option: DropColorOption = <DropColorOption>self.uiControl_option;
			self.uiControl_control = html.sysHtml_element("button", option.uiControlOption_class);
			html.sysHtml_event(define.$const_actionAddEvent, self.uiControl_control,
				[define.$const_eventClick], self.uiDropColor_binder);
			super.uiControl_create(html);
            self.uiDropColor_icon.uiControl_element.style.background =
                sys.sysRoot_color(define.$const_actionBoxColor, option.uiDropColorOption_color);
			html.sysHtml_class(define.$const_actionAddClass,
				self.uiControl_control, ["_xdropclr"]);
		}

		// #uiDropColor_selectColor => $5
		private uiDropColor_selectColor(self: DropColor, color: string): void {
			let option: DropColorOption = <DropColorOption>self.uiControl_option;
			let style: any = self.uiDropColor_icon.uiControl_element.style;
			if (option.uiDropColorOption_color != color) {
				option.uiDropColorOption_color = color;
                if (self.uiDropColor_icon) {
                    self.uiDropColor_icon.uiControl_element.style.background =
                        sys.sysRoot_color(define.$const_actionBoxColor, color);
                }
                sys.sysRoot_delay(option.uiControlOption_action, self,
                    sys.sysRoot_color(define.$const_actionBoxColor,
                        option.uiDropColorOption_color));
			}
		}

		// #uiDropColor_onClick => $6
		private uiDropColor_onClick(event: MouseEvent): any {
			let self: DropColor = <DropColor>this.sysObject_this;
			let option: DropColorOption = <DropColorOption>self.uiControl_option;
			let dropper: Color = option.uiDropColorOption_dropper();
			self.uiDropColor_dropper = dropper;
			if (dropper) {
				dropper.uiControl_update({
					uiColorOption_color: option.uiDropColorOption_color, 
					uiControlOption_action: (sender, color) => { self.uiDropColor_selectColor(self, color) },
					uiControlOption_hidden: true
				});
				let rect: ClientRect = sys.Html.sysHtml_boundRect(self.uiControl_control);
				dropper.uiControl_pop(rect.left, rect.bottom, option.uiDropColorOption_place);
				sys.Html.sysHtml_event(define.$const_actionAddEvent, dropper.uiControl_element,
					[define.$const_eventHidden], self.uiDropColor_colorBinder);
				sys.Html.sysHtml_class(define.$const_actionAddClass,
					self.uiControl_control, ["on"]);
			}
		}

		// #uiDropColor_onColorHide => $3
		private uiDropColor_onColorHide(event: CustomEvent): any {
			console.log("uiDropColor::onColorHide");
			let self: DropColor = <DropColor>this.sysObject_this;
			sys.Html.sysHtml_event(define.$const_actionRemoveEvent, self.uiDropColor_dropper.uiControl_element,
				[define.$const_eventHidden], self.uiDropColor_colorBinder);
			sys.Html.sysHtml_class(define.$const_actionAddClass,
				self.uiControl_control, ["on"]);
		}

		// Update the color
		public uiControl_update(param: DropColorOption): void {
			super.uiControl_update(param);
			let self: DropColor = <DropColor>this.sysObject_this;
			let option: DropColorOption = <DropColorOption>self.uiControl_option;
            if (sys.sysRoot_defined(param.uiDropColorOption_color)) {
                let color: string = sys.sysRoot_color(
                    define.$const_actionUnboxColor, param.uiDropColorOption_color);
				if (option.uiDropColorOption_color != color) {
					option.uiDropColorOption_color = color;
					if (self.uiDropColor_icon) {
                        self.uiDropColor_icon.uiControl_element.style.background =
                            sys.sysRoot_color(define.$const_actionBoxColor, color);
					}
				}
			}
		}

		// Destroy the button
		public uiControl_destory(html: sys.IHtml): void {
			let self: DropColor = <DropColor>this.sysObject_this;
			html.sysHtml_event(define.$const_actionRemoveEvent, self.uiControl_control,
				[define.$const_eventClick], self.uiDropColor_binder);
			if (self.uiDropColor_dropper)
				self.uiDropColor_dropper.uiControl_hidden(true);
			super.uiControl_destory(html);
		}

	}

	export interface DropColorOption extends ControlOption {

		// #uiDropColorOption_dropper => $0
		uiDropColorOption_dropper?: () => Color;

		// #uiDropColorOption_color => $1
		uiDropColorOption_color?: string;

		// #uiDropColorOption_place => $2
		// define.$const_placeWhere
		uiDropColorOption_place?: number;

	}

}
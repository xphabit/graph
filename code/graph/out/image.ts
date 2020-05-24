/// <reference path="control.ts"/>
/// <reference path="../sys/svg.ts"/>

namespace ui {

	export class Image extends Control {

		constructor(parent?: Control, option?: ImageOption) {
			super(parent, option);
			let param: ImageOption = <ImageOption>this.uiControl_option;
			param.uiImageOption_type =
				param.uiImageOption_type || "svg";
		}

		public uiControl_create(html: sys.IHtml): void {
			let self: Image = <Image>this.sysObject_this;
			let option: ImageOption = <ImageOption>self.uiControl_option;
			if (option.uiImageOption_type == "svg") {
				self.uiControl_control = <HTMLElement>
					html.sysHtml_svgIcon(<string>option.uiControlOption_icon);
				if (option.uiControlOption_class)
					self.uiControl_control.className = option.uiControlOption_class;
			}
		}

	}

	export interface ImageOption extends ControlOption {

		// #uiImageOption_type => $0
		uiImageOption_type?: string;

	}

}
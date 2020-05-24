namespace box {

	export class Format extends sys.xObject {

		// #boxFormat_build => a
		public boxFormat_build(language: ILang, wrap: ui.List, items: ui.ToolItem[]): void {
			let classRight: string = "right";
			let modal: ui.Modal = sys.Pod.sysPod_depend(ui.Modal);
			for (let index = 0; index < items.length; index++) {
				let item: ui.ToolItem = items[index];
				let pane: ui.Pane = new ui.Pane(null, { uiControlOption_class: "_xfband" });
				new ui.Text(pane, { uiControlOption_text: item.uiListItem_text });
				let action: any = item.uiListItem_action;
				item.uiListItem_pane = pane;

				// Resuse uiListItem_class here
				switch (item.uiListItem_class) {
					case define.$const_controlToggle:
						new ui.Toggle(pane, {
							uiControlOption_disabled: item.uiListItem_disabled,
							uiToggleOption_checked: item.uiListItem_checked,
							uiControlOption_text: item.uiListItem_tip,
							uiControlOption_id: item.uiListItem_id,
							uiControlOption_class: classRight,
							uiControlOption_action: action,
						});
						break;
					case define.$const_controlColor:
						new ui.DropColor(pane, {
							uiControlOption_action: action,
							uiControlOption_class: classRight,
							uiControlOption_disabled: item.uiListItem_disabled,
							uiControlOption_id: item.uiListItem_id,
							uiDropColorOption_color: item.uiListItem_tag,
							uiDropColorOption_place: define.$const_placeRightTop,
							uiDropColorOption_dropper: () => {
								return new ui.Color(null, {
									uiColorOption_clearText: language.boxLang_clear,
									uiControlOption_modal: modal,
								});
							}
						});
						break;
					case define.$const_controlSpinner:
						new ui.Spinner(pane, {
							uiSpinnerOption_value: item.uiListItem_tag,
							uiControlOption_id: item.uiListItem_id,
							uiControlOption_disabled: item.uiListItem_disabled,
							uiControlOption_class: classRight,
						});
						break;
					case define.$const_controlButton:
						new ui.Button(pane, {
							uiControlOption_class: classRight,
							uiControlOption_disabled: item.uiListItem_disabled,
							uiControlOption_action: action,
						});
						break;
				}
			}
		}

		// #boxFormat_pane => b
		public boxFormat_pane(title: string): ui.Pane {
			let classPane: any = ui.Pane;
			let pane: ui.Pane = new classPane(null, { uiControlOption_class: "_xfpane" });
			new ui.Text(new classPane(pane, { uiControlOption_class: "_xfhead" }),
				{ uiControlOption_text: title });
			return pane;
		}

		// #boxFormat_update => c
		public boxFormat_update(item: ui.ToolItem): void {
			let pane: ui.Pane = item.uiListItem_pane;
			let disabled: boolean = item.uiListItem_disabled;

			if (pane && pane.uiControl_kids.length > 1) {
				switch (item.uiListItem_class) {
					case define.$const_controlToggle:
						(<ui.Toggle>pane.uiControl_kids[1]).uiControl_update({
							uiToggleOption_checked: item.uiListItem_checked,
							uiControlOption_disabled: disabled
						});
						break;
					case define.$const_controlColor:
						(<ui.DropColor>pane.uiControl_kids[1]).uiControl_update({
							uiDropColorOption_color: item.uiListItem_tag,
							uiControlOption_disabled: disabled
						});
						break;
				}
			}
		}

		constructor() {
			super() || <any>"format";
		}

	}

}
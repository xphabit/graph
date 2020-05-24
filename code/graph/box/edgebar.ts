namespace box {

	// #boxEdgebar_config => $e
	export function boxEdgebar_config(lazy: any, lang: ILang,
		register: (service: Function, name?: string) => sys.IBean,
		resolve: (service: any) => any): void {
		// Register pane control
		register(ui.Pane, Edgebar.boxEdgebar_key).sysBean_signleton.sysBean_argument(() => [
			null, {
				uiControlOption_class: Edgebar.boxEdgebar_key
			}]);

		// Register the close button
		register(ui.Button, Edgebar.boxEdgebar_closekey).sysBean_signleton.sysBean_argument(() => [
			resolve(Edgebar.boxEdgebar_key), {
				uiControlOption_class: Edgebar.boxEdgebar_closekey,
				uiControlOption_icon: "unfold",
				uiControlOption_action: true
			}]);

		// Register button list
		register(ui.Toolist, Edgebar.boxEdgebar_listkey).sysBean_signleton.sysBean_argument(() => [
			resolve(Edgebar.boxEdgebar_key), Edgebar.boxEdgebar_items, {
				uiControlOption_class: Edgebar.boxEdgebar_listkey
			}]);

		// Register edge bar component
		register(Edgebar).sysBean_signleton.sysBean_argument(() =>
			[new lazy(() => resolve("frame"))]);
	}

	export class Edgebar extends sys.xObject {

		// #boxEdgebar_key => a
		static boxEdgebar_key: string = "_xedge";

		// #boxEdgebar_closekey => c
		static boxEdgebar_closekey: string = "_xekey";

		// #boxEdgebar_listkey => b
		static boxEdgebar_listkey: string = "_xelist";

		// #boxEdgebar_items => d
		static boxEdgebar_items: ui.ToolItem[] = [
			{ // 0
				uiListItem_tag: define.$const_formatDigram,
				uiListItem_checked: true,
				uiListItem_id: "digram",
			},
			{ // 1
				uiListItem_tag: define.$const_formatText,
				uiListItem_id: "string",
			},
			{ // 2
				uiListItem_tag: define.$const_formatShape,
				uiListItem_class: "blank",
				uiListItem_disabled: true,
				uiListItem_id: "style",
			},
			{ // 3
				uiListItem_tag: define.$const_formatShape,
				uiListItem_disabled: true,
				uiListItem_id: "text",
			},
			{ // 4
				uiListItem_tag: define.$const_formatShape,
				uiListItem_disabled: true,
				uiListItem_id: "arrange",
			},
			{ // 5
				uiListItem_tag: define.$const_formatLayer,
				uiListItem_class: "blank",
				uiListItem_id: "layer",
			}
		];

		// #boxEdgebar_start => e
		public boxEdgebar_start(resolve: (service: any) => any): Element {
			let self: Edgebar = <Edgebar>this.sysObject_this;
			Edgebar.boxEdgebar_items.forEach(item => item.uiListItem_tip =
				item.uiListItem_icon = item.uiListItem_id);
			self.boxEdgebar_list = resolve(Edgebar.boxEdgebar_listkey);
			resolve(Edgebar.boxEdgebar_closekey).uiControl_update(
				{ uiControlOption_action: () => self.boxEdgebar_frame.sysLazy_value.toggleFormatPanel() });
			self.boxEdgebar_list.uiControl_update(
				{ uiControlOption_action: self.sysObject_bind(self.boxEdgebar_onList) });
			return resolve(Edgebar.boxEdgebar_key).
				uiControl_element;
		}

		// #boxEdgebar_frame => f
		private boxEdgebar_frame: sys.Lazy<any>;

		// #boxEdgebar_list => g
		private boxEdgebar_list: ui.List;

		// #boxEdgebar_lightIndex => h
		private boxEdgebar_lightIndex: number;

		// #boxEdgebar_onList => i
		private boxEdgebar_onList(sender: ui.List, item: ui.ToolItem): void {
			let self: Edgebar = <Edgebar>this.sysObject_this;
			let frame: any = self.boxEdgebar_frame.sysLazy_value;
			let index: number = Edgebar.boxEdgebar_items.indexOf(item);
			console.log("boxEdgebar::onList - " + item.uiListItem_id + "  =  " + item.uiListItem_disabled);
			if (!item.uiListItem_disabled &&
				index != -1 && index != self.boxEdgebar_lightIndex) {
				self.boxEdgebar_lightList(index, item);
				self.boxEdgebar_lightIndex = index;
				if (index <= 1)
					frame.showLayer(false);
				else if (index == 5)
					frame.showLayer(true);
				else if (index >= 2 && index < 5) {
					frame.format.switchPanel(index - 2);
					frame.showLayer(false);
				}	
			}
		}

		// #boxEdgebar_lightList => j
		private boxEdgebar_lightList(index: number, item: ui.ListItem): void {
			let html: sys.IHtml = sys.Html;
			let elements: NodeListOf<Element> = this.boxEdgebar_elements(html);
			[].forEach.call(elements, x => html.sysHtml_class(
				define.$const_actionRemoveClass, x, ["checked"]));
			Edgebar.boxEdgebar_items.forEach(x => x.uiListItem_checked = false);
			Edgebar.boxEdgebar_items[index].uiListItem_checked = true;
			html.sysHtml_class(define.$const_actionAddClass,
				elements[index], ["checked"]);
		}

		// #boxEdgebar_disable => k
		// groupId = define.$const_formatXXX
		public boxEdgebar_disable(groups: number[], checked: number): void {
			let html: sys.IHtml = sys.Html;
			let self: Edgebar = <Edgebar>this.sysObject_this;
			let items: ui.ToolItem[] = Edgebar.boxEdgebar_items;
			let elements: NodeListOf<Element> = self.boxEdgebar_elements(html);
			[].forEach.call(elements, x => html.sysHtml_class(define.$const_actionRemoveClass,
				x, self.boxEdgebar_lightIndex != 5 ? ["disabled", "checked"] : ["disabled"]));
			for (let index = 0; index < items.length; index++) {
				items[index].uiListItem_disabled = false;
				if (groups.indexOf(items[index].uiListItem_tag) >= 0) {
					html.sysHtml_class(define.$const_actionAddClass, elements[index], ["disabled"]);
					items[index].uiListItem_disabled = true;
				}
				if (self.boxEdgebar_lightIndex != 5 &&
					items[index].uiListItem_tag == checked) {
					html.sysHtml_class(define.$const_actionAddClass,
						elements[index], ["checked"]);
					items[index].uiListItem_checked = true;
					self.boxEdgebar_lightIndex = index;
					checked = -1;
				}
			}
		}

		// #boxEdgebar_elements => l
		private boxEdgebar_elements(html: sys.IHtml, ): NodeListOf<Element> {
			return html.sysHtml_query(`li.${ui.List.uiList_itemClass}`,
				this.boxEdgebar_list.uiControl_element);
		}

		constructor(frame: sys.Lazy<any>) {
			super();
			this.boxEdgebar_frame = frame || <any>"edge";
		}

	}

}
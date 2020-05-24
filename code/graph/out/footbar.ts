namespace box {

	declare var mxOutline; // Show the outline window

	// BoxTailbar_config
	// #boxFootbar_config => $t
	export function boxFootbar_config(lazy: any, lang: ILang,
		register: (service: Function, name?: string) => sys.IBean,
		resolve: (service: any) => any): void {
		// Register pane control
		register(ui.Pane, Footbar.boxFootbar_key).sysBean_signleton.sysBean_argument(() =>
			[null, { uiControlOption_class: Footbar.boxFootbar_key }]);
		// Register button list
		register(ui.Toolist, Footbar.boxFootbar_listkey).sysBean_signleton.sysBean_argument(() => [
			resolve(Footbar.boxFootbar_key), Footbar.boxFootbar_right,
			{ uiControlOption_class: Footbar.boxFootbar_listkey }]);
		// Register foot bar component
		register(Footbar).sysBean_signleton.sysBean_argument(() =>
			[new lazy(() => resolve("frame"))]);
	}

	export class Footbar extends sys.xObject {

		// #boxFootbar_key => a
		static boxFootbar_key: string = "_xtail";

		// #boxFootbar_listkey => b
		static boxFootbar_listkey: string = "_xtlist";

		// #boxFootbar_right => c
		static boxFootbar_right: ui.ToolItem[] = [
			{ // 0
				uiListItem_pos: define.$const_placeRightBottom,
				uiListItem_id: "outline",
			},
			{
				uiListItem_text: "XXX",
				uiListItem_id:"X"
			}
		];

		// #boxFootbar_frame => d
		private boxFootbar_frame: sys.Lazy<any>;

		// #boxFootbar_list => e
		private boxFootbar_list: ui.List;

		///////////////////////////////////////////////////////////////////////

		// #boxFootbar_start => f
		public boxFootbar_start(resolve: (service: any) => any): Element {
			let self: Footbar = <Footbar>this.sysObject_this;
			let item: ui.ToolItem = Footbar.boxFootbar_right[0];
			item.uiListItem_pop = self.boxFootbar_createOutline(resolve);
			item.uiListItem_icon = item.uiListItem_id;
			Footbar.boxFootbar_right[1].uiListItem_action = self.boxFootbar_onItem.bind(self);
			self.boxFootbar_list = resolve(Footbar.boxFootbar_listkey);
			return resolve(Footbar.boxFootbar_key).uiControl_element;
		}

		// #boxFootbar_onItem => g
		private boxFootbar_onItem(sender: ui.Control, item: ui.ListItem): any {
			alert("boxFootbar::onItem - " + item.uiListItem_id);
		}

		// #boxFootbar_outlinePane => h
		private boxFootbar_outlinePane: ui.Pane;

		// #boxFootbar_outlineBinder => i
		private boxFootbar_outlineBinder: any[];

		// #boxFootbar_outline => j
		private boxFootbar_outline: any;

		// #boxFootbar_createOutline => k
		private boxFootbar_createOutline(resolve: (service: any) => any): () => ui.Pane {
			let self: Footbar = <Footbar>this.sysObject_this;
			return () => {
				let graph = self.boxFootbar_frame.sysLazy_value.editor.graph;
				let pane: ui.Pane = new ui.Pane(null, {
					uiControlOption_class: "_xtline", uiControlOption_hidden: true,
					uiControlOption_modal: resolve(ui.Modal)});
				self.boxFootbar_outline =
					new mxOutline(graph, pane.uiControl_element);
				sys.Html.sysHtml_event(define.$const_actionAddEvent, pane.uiControl_element, // Keep event order
					[define.$const_eventMouseWheel, define.$const_eventHidden],
					self.boxFootbar_outlineBinder);
				self.boxFootbar_outlinePane = pane;
				return pane;
			}
		}

		// #boxFootbar_onOutlineHidden => l
		private boxFootbar_onOutlineHidden(event: CustomEvent): void {
			let self: Footbar = <Footbar>this.sysObject_this;
			let graph = self.boxFootbar_frame.sysLazy_value.editor.graph;
			let outline: any = self.boxFootbar_outline;
			console.log("boxFootbar::onHidden - " + outline);
			if (!((<ui.IControl>event.detail).uiControl_hidden())) {
				let g: any = outline.outline;
				outline.suspended = false;
				g.pageScale = graph.pageScale;
				g.pageFormat = graph.pageFormat;
				// g.pageVisible = graph.pageVisible;
				let background: any = graph.background;
				g.background = (!graph.background || graph.background == "none") ?
					graph.defaultPageBackgroundColor : graph.background;
				g.gridEnabled = false;
				outline.refresh();
			} else {
				sys.Html.sysHtml_event(define.$const_actionRemoveEvent,
					self.boxFootbar_outlinePane.uiControl_element,
					[define.$const_eventMouseWheel, define.$const_eventHidden],
					self.boxFootbar_outlineBinder);
				outline.suspended = true;
				outline.destroy();
			}
		}

		// #boxFootbar_onOutlineMouseWheel => m
		private boxFootbar_onOutlineMouseWheel(event: MouseWheelEvent): void {
			this.boxFootbar_frame.sysLazy_value.actions.get(
				event.deltaY < 0 ? "zoomIn" : "zoomOut").funct();
		}

		constructor(frame: sys.Lazy<any>) {
			super();
			this.boxFootbar_frame = frame || <any>"foot";
			this.boxFootbar_outlineBinder = [ // Keep event order
				this.sysObject_bind(this.boxFootbar_onOutlineMouseWheel),
				this.sysObject_bind(this.boxFootbar_onOutlineHidden)
				];
		}

	}

}
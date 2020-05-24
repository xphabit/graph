namespace box {

	declare var mxEventObject;
	declare var ChangePageSetup;

	export class Diagram extends sys.xObject {

		// #boxDiagram_frame => a
		private boxDiagram_frame: sys.Lazy<any>;

		constructor(frame: sys.Lazy<any>, helper: Format, language: ILang) {
			super();
			this.boxDiagram_frame = frame || <any>"diagram";
			this.boxDiagram_language = language;
			this.boxDiagram_helper = helper;
		}

		// #boxDiagram_options => b
		private boxDiagram_options: ui.ToolItem[] = [
			{ // 0
				uiListItem_class: define.$const_controlToggle,
				uiListItem_id: "connectionArrows",
			},
			{ // 1
				uiListItem_class: define.$const_controlToggle,
				uiListItem_id: "connectionPoints",
			},
			{ // 2
				uiListItem_class: define.$const_controlToggle,
				uiListItem_id: "guides",
			},
		];

		// #boxDiagram_optionPane => c
		public boxDiagram_optionPane(): ui.Pane {
			let classPane: any = ui.Pane;
			let self: Diagram = <Diagram>this.sysObject_this;
			let pane: ui.Pane = self.boxDiagram_helper.boxFormat_pane(
				self.boxDiagram_language.boxLang_options);

			// Create list item
			let list: ui.List = new ui.List(pane,
				self.boxDiagram_options, { uiControlOption_class: "_xflist" });
			let frame: any = self.boxDiagram_frame.sysLazy_value;
			let graph: any = frame.editor.graph;

			// Initialize and bind action
			let isGraphEnabled: boolean = graph.isEnabled();
			let checkValue: boolean[] = [graph.connectionArrowsEnabled,
				graph.connectionHandler.isEnabled(), graph.graphHandler.guidesEnabled];
			let textValue: string[] = [self.boxDiagram_language.boxLang_connectarrow,
				self.boxDiagram_language.boxLang_connectarrow, self.boxDiagram_language.boxLang_guide];
			for (let index = 0; index < 3; index++) {
				let item: ui.ToolItem = self.boxDiagram_options[index];
				item.uiListItem_checked = checkValue[index];
				item.uiListItem_disabled = !isGraphEnabled;
				item.uiListItem_action = (sender, value) =>
					{ frame.actions.get(sender.uiControl_option.uiControlOption_id).funct() };
				item.uiListItem_text = textValue[index];
			}

			self.boxDiagram_helper.boxFormat_build(
				self.boxDiagram_language, list,
				self.boxDiagram_options);
			return pane;
		}

		// #boxDiagram_helper => d
		private boxDiagram_helper: Format;

		// #boxDiagram_create => e
		public boxDiagram_create(): void {
			let self: Diagram = <Diagram>this.sysObject_this;
			let frame: any = self.boxDiagram_frame.sysLazy_value;
			let optionActions: string[] = [
				"connectionArrowsChanged", "connectionPointsChanged", "guidesEnabledChanged"];
			for (let index: number = 0; index < 3; index++)
				frame.addListener(optionActions[index], () => {self.boxDiagram_updateOption(index)});
			let viewActions = ["gridEnabledChanged", "gridColorChanged", "none",
				"pageViewChanged", "backgroundColorChanged", "backgroundColorChanged"];
			for (let index: number = 0; index < 5; index++)
				frame.addListener(viewActions[index], () =>
					{ self.boxDiagram_updateView(index) });
		}

		// #boxDiagram_destroy => f
		public boxDiagram_destroy(): void {
			let self: Diagram = <Diagram>this.sysObject_this;
			self.boxDiagram_options.concat(self.boxDiagram_views).forEach(
				x => { delete x.uiListItem_pane });
		}

		// #boxDiagram_updateOption => g
		private boxDiagram_updateOption(index: number): void {
			let self: Diagram = <Diagram>this.sysObject_this;
			let frame: any = self.boxDiagram_frame.sysLazy_value;
			let item: ui.ToolItem = self.boxDiagram_options[index];
			let graph: any = frame.editor.graph;
			let checkValue: boolean[] = [graph.connectionArrowsEnabled,
				graph.connectionHandler.isEnabled(), graph.graphHandler.guidesEnabled];
			item.uiListItem_disabled = !graph.isEnabled();
			item.uiListItem_checked = checkValue[index];
			self.boxDiagram_helper.
				boxFormat_update(item);
		}

		// #boxDiagram_language => h
		private boxDiagram_language: ILang;

		// #boxDiagram_views => i
		private boxDiagram_views: ui.ToolItem[] = [
			{ // 0
				uiListItem_class: define.$const_controlToggle,
				uiListItem_id: "grid",
			},
			{ // 1
				uiListItem_class: define.$const_controlColor,
				uiListItem_id: "gridColor",
			},
			{ // 2
				uiListItem_class: define.$const_controlSpinner,
				uiListItem_id: "gridSize",
			},
			{ // 3
				uiListItem_class: define.$const_controlToggle,
				uiListItem_id: "pageView",
			},
			{ // 4
				uiListItem_class: define.$const_controlToggle,
				uiListItem_id: "background",
			},
			{ // 5
				uiListItem_class: define.$const_controlColor,
				uiListItem_id: "backgroundColor",
			},
			{ // 6
				uiListItem_class: define.$const_controlButton,
				uiListItem_id: "backgroundImage",
			},
		];

		// #boxDiagram_viewPane => j
		public boxDiagram_viewPane(): ui.Pane {
			let classPane: any = ui.Pane;
			let self: Diagram = <Diagram>this.sysObject_this;
			let pane: ui.Pane = self.boxDiagram_helper.boxFormat_pane("View");

			// Create list item
			let list: ui.List = new ui.List(pane,
				self.boxDiagram_views, { uiControlOption_class: "_xflist" });
			let frame: any = self.boxDiagram_frame.sysLazy_value;
			let graph: any = frame.editor.graph;

			// Initialize and bind action
			let isGraphEnabled: boolean = graph.isEnabled();
			let textValue: string[] = ["Grid", " > color", " > size", "PageView", "Background", " > Color", " > Image"];
			for (let index = 0; index < self.boxDiagram_views.length; index++) {
				let item: ui.ToolItem = self.boxDiagram_views[index];
				item.uiListItem_text = textValue[index];
			}

			// Grid option
			let item: ui.ToolItem = self.boxDiagram_views[0];
			let gridEnabled: boolean = graph.isGridEnabled();
			item.uiListItem_action = (sender, value) => {
				graph.setGridEnabled(!graph.isGridEnabled());
				frame.fireEvent(new mxEventObject("gridEnabledChanged")) };
			item.uiListItem_checked = gridEnabled;

			item = self.boxDiagram_views[1];
			item.uiListItem_action = (sender, color) => { frame.setGridColor(color) };
			item.uiListItem_tag = graph.view.gridColor;
			item.uiListItem_disabled = !gridEnabled;

			item = self.boxDiagram_views[2];
			item.uiListItem_tag = graph.getGridSize();
			item.uiListItem_disabled = !gridEnabled;

			// Page view
			item = self.boxDiagram_views[3];
			item.uiListItem_action = (sender, value) => { frame.actions.get("pageView").funct() };
			item.uiListItem_checked = graph.pageVisible;
			item.uiListItem_disabled = !isGraphEnabled;

			// Background
			item = self.boxDiagram_views[4];
			item.uiListItem_action = (sender, value) => {
				self.boxDiagram_background(frame, graph, value ? "#ffffff" : "none")};
			item.uiListItem_checked = graph.background != "none";
			item.uiListItem_disabled = !isGraphEnabled;

			// BackgroundColor
			item = self.boxDiagram_views[5];
			item.uiListItem_action = (sender, value) => {self.boxDiagram_background(frame, graph, value)};
			item.uiListItem_disabled = !isGraphEnabled || graph.background == "none";
			item.uiListItem_tag = graph.background;

			item = self.boxDiagram_views[6];
			item.uiListItem_action = (sender) => { frame.showBackgroundImageDialog() };

			// Initialize and bind action
			self.boxDiagram_helper.boxFormat_build(
				self.boxDiagram_language, list,
				self.boxDiagram_views);

			return pane;
		}

		// #boxDiagram_updateView => k
		private boxDiagram_updateView(index: number): void {
			let self: Diagram = <Diagram>this.sysObject_this;
			let frame: any = self.boxDiagram_frame.sysLazy_value;
			let helper: Format = self.boxDiagram_helper;
			let graph: any = frame.editor.graph;

			// Update grid enable
			let isGraphEnabled: boolean = graph.isEnabled();
			let isGridEnabled: boolean = graph.isGridEnabled();
			let item: ui.ToolItem = self.boxDiagram_views[index];
			switch (index) {
				case 0: // Grid enabled
					item.uiListItem_checked = isGridEnabled;
					helper.boxFormat_update(item);
					self.boxDiagram_updateView(1);
					self.boxDiagram_updateView(2);
					break;
				case 1: // Grid color
					item.uiListItem_tag = graph.view.gridColor;
					item.uiListItem_disabled = !isGridEnabled;
					helper.boxFormat_update(item);
					break;
				case 3: // Page view
					item.uiListItem_checked = graph.pageVisible;
					item.uiListItem_disabled = !isGraphEnabled;
					helper.boxFormat_update(item);
					break;
				case 4: // Background
					item.uiListItem_checked = graph.background != "none";
					item.uiListItem_disabled = !isGraphEnabled;
					helper.boxFormat_update(item);
					self.boxDiagram_updateView(5);
					break;
				case 5: // Background color
					item.uiListItem_tag = graph.background;
					item.uiListItem_disabled = !isGraphEnabled || graph.background == "none";
					helper.boxFormat_update(item);
					break;
			}
			
		}

		// #boxDiagram_background => l
		private boxDiagram_background(frame: any, graph: any, color: string): void {
			let change: any = new ChangePageSetup(frame, color);
			change.ignoreImage = true;
			graph.model.execute(change);
		}

	}

}
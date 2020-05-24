namespace ui {

	export class Color extends Control {

		// #uiColor_history => $0
		static uiColor_history: string[] = ["noop"];

		// #uiColor_colorPreset => $1
		private uiColor_colorPreset: string[] = [
			'E6D0DE', 'CDA2BE', 'B5739D', 'E1D5E7', 'C3ABD0', 'A680B8', 'D4E1F5', 'A9C4EB', '7EA6E0', 'D5E8D4', '9AC7BF', '67AB9F',
			'D5E8D4', 'B9E0A5', '97D077', 'FFF2CC', 'FFE599', 'FFD966', 'FFF4C3', 'FFCE9F', 'FFB570', 'F8CECC', 'F19C99', 'EA6B66'
		];

		// #uiColor_colorList => $2
		private uiColor_colorList: string[] = [
			'none',   'FFFFFF', 'E6E6E6', 'CCCCCC', 'B3B3B3', '999999', '808080', '666666', '4D4D4D', '333333', '1A1A1A', '000000',
			'FFCCCC', 'FFE6CC', 'FFFFCC', 'E6FFCC', 'CCFFCC', 'CCFFE6', 'CCFFFF', 'CCE5FF', 'CCCCFF', 'E5CCFF', 'FFCCFF', 'FFCCE6',
			'FF9999', 'FFCC99', 'FFFF99', 'CCFF99', '99FF99', '99FFCC', '99FFFF', '99CCFF', '9999FF', 'CC99FF', 'FF99FF', 'FF99CC',
			'FF6666', 'FFB366', 'FFFF66', 'B3FF66', '66FF66', '66FFB3', '66FFFF', '66B2FF', '6666FF', 'B266FF', 'FF66FF', 'FF66B3',
			'FF3333', 'FF9933', 'FFFF33', '99FF33', '33FF33', '33FF99', '33FFFF', '3399FF', '3333FF', '9933FF', 'FF33FF', 'FF3399',
			'FF0000', 'FF8000', 'FFFF00', '80FF00', '00FF00', '00FF80', '00FFFF', '007FFF', '0000FF', '7F00FF', 'FF00FF', 'FF0080',
			'CC0000', 'CC6600', 'CCCC00', '66CC00', '00CC00', '00CC66', '00CCCC', '0066CC', '0000CC', '6600CC', 'CC00CC', 'CC0066',
			'990000', '994C00', '999900', '4D9900', '009900', '00994D', '009999', '004C99', '000099', '4C0099', '990099', '99004D',
			'660000', '663300', '666600', '336600', '006600', '006633', '006666', '003366', '000066', '330066', '660066', '660033',
			'330000', '331A00', '333300', '1A3300', '003300', '00331A', '003333', '001933', '000033', '190033', '330033', '33001A'
		];

		// #uiColor_textbox => $3
		private uiColor_textbox: Textbox;

		// #uiColor_input => $4
		private uiColor_input: Pane;

		// #uiColor_binder => $5
		private uiColor_binder: any[];

		// #uiColor_color => $6
		private uiColor_color: string;

		///////////////////////////////////////////////////////////////////////

		constructor(parent?: Control, option?: ColorOption) {
			super(parent, option);
			let _option: ColorOption = <ColorOption>this.uiControl_option;
			this.uiColor_color = _option.uiColorOption_color;
			this.uiColor_binder = [this.sysObject_bind(this.uiColor_onClick)];
			this.uiColor_input = new Pane(this, { uiControlOption_class: "_xhex" });
			console.log("Color::constructor - " + _option.uiColorOption_color);
			this.uiColor_textbox = new Textbox(this.uiColor_input, {
				uiTextboxOption_maxLength: 6, uiControlOption_text: _option.uiColorOption_color});
			new Button(this.uiColor_input, {
				uiControlOption_text: _option.uiColorOption_confirm,
				uiControlOption_action: () => this.uiColor_selectColor(
					(<HTMLInputElement>this.uiColor_textbox.
						uiControl_element).value)
			});
		}

		// Create the control
		protected uiControl_create(html: sys.IHtml): void {
			let self: Color = <Color>this.sysObject_this;
			let option: ColorOption = <ColorOption>self.uiControl_option;
			let panel: HTMLElement = html.sysHtml_element(
				"div", option.uiControlOption_class);
			self.uiControl_control = panel;

			// Create the preset table
			html.sysHtml_class(define.$const_actionAddClass, panel, ["_xcolor"]);
			let table: HTMLElement = self.uiColor_createTable(html, "T1");
			for (let index: number = 0; index < 2; index++)
				html.sysHtml_appendTo(self.uiColor_createRow(
					html, option, self.uiColor_colorPreset, index * 12), table);
			html.sysHtml_appendTo(table, panel);

			// Create the colored table
			table = self.uiColor_createTable(html, "T2");
			for (let index: number = 0; index < 10; index++)
				html.sysHtml_appendTo(self.uiColor_createRow(
					html, option, self.uiColor_colorList, index * 12), table);
			html.sysHtml_appendTo(table, panel);

			// Create history color table
			table = self.uiColor_createTable(html, "T3");
			self.uiColor_historyRow = self.uiColor_createRow(html, option,Color.uiColor_history, 0);
			html.sysHtml_appendTo(self.uiColor_historyRow, table);
			html.sysHtml_appendTo(table, panel);

			// Create input area
			html.sysHtml_appendTo(self.uiColor_input.uiControl_element, panel);
			html.sysHtml_event(define.$const_actionAddEvent, self.uiControl_control,
				[define.$const_eventClick], self.uiColor_binder);
			self.uiControl_modal(true); // setup modal
			super.uiControl_create(html);
		}

		// #uiColor_createRow => $7
		private uiColor_createRow(html: sys.IHtml, option: ColorOption, colorList: string[], offset: number): HTMLTableRowElement {
			let self: Color = <Color>this.sysObject_this;
			let row: HTMLTableRowElement = <HTMLTableRowElement>html.sysHtml_element("tr");
			for (let index = 0; index < 12; index++) {
				let column: HTMLElement = html.sysHtml_element("td");
				let colorValue: string = colorList[offset + index];
				if (colorValue) {
					column.style.backgroundColor = "#" + colorValue;
					column.dataset.color = colorValue;
				}
				if (colorValue == "noop" && option.uiColorOption_clearText)
					html.sysHtml_attribute(column, "title", option.uiColorOption_clearText)
				if (colorValue && colorValue.charAt(0) == "n") {
					html.sysHtml_appendTo(
						html.sysHtml_element("span"), column);
					column.className = colorValue;
				}
				html.sysHtml_appendTo(
					column, row);
			}
			return row;
		}

		// #uiColor_createTable => $8
		private uiColor_createTable(html: sys.IHtml, id: string): HTMLTableElement {
			let table: HTMLTableElement =
				<HTMLTableElement>html.sysHtml_element("table");
			table.cellSpacing = "0";
			table.id = id;
			return table;
		}

		// #uiColor_colorItem => $9
		private uiColor_colorItem(element: HTMLElement): HTMLElement {
			while (element && element.nodeName && element.nodeName != "TD")
				element = element.parentElement;
			return element;
		}

		// #uiColor_putHisory => x0
		private uiColor_putHisory(color: string): void {
			let history: string[] = Color.uiColor_history;
			if (history.indexOf(color) == -1) {
				if (history.length == 12) history.splice(1, 1);
				history.push(color);
			}
		}

		// #uiColor_selectColor => x1
		private uiColor_selectColor(color: string): void {
			let self: Color = <Color>this.sysObject_this;
			if (self.uiColor_color != color) {
				self.uiColor_color = color;
				sys.sysRoot_delay(self.uiControl_option.
					uiControlOption_action, self, self.uiColor_color);
			}
			self.uiControl_quit();
		}

		// #uiColor_onClick => x2
		private uiColor_onClick(event: MouseEvent): void {
			let self: Color = <Color>this.sysObject_this;
			let cell: HTMLElement =
				self.uiColor_colorItem(<HTMLElement>event.srcElement);
			if (cell) {
				event.stopPropagation();
				let color: string = cell.dataset.color;
				if (color == "noop") {
					self.uiControl_clearHistory();
				} else {
					if (color != "none")
						self.uiColor_putHisory(color);
					self.uiColor_selectColor(color);
				}
			}
		}

		// #uiColor_historyRow => x4
		private uiColor_historyRow: HTMLTableRowElement;

		// #uiControl_clearHistory => x5
		private uiControl_clearHistory(): void {
			Color.uiColor_history.splice(1, Color.uiColor_history.length - 1);
			let cells: NodeListOf<Element> = sys.Html.sysHtml_query("td:not(.noop)", this.uiColor_historyRow);
			[].forEach.call(cells, x => x.style.backgroundColor = "");
		}

		public uiControl_update(param: ColorOption): void {
			super.uiControl_update(param);
			let option: ColorOption = <ColorOption>this.uiControl_option;
			option.uiColorOption_color = param.uiColorOption_color;
			if (sys.sysRoot_defined(option.uiColorOption_color))
				this.uiColor_textbox.uiControl_update({
					uiControlOption_text: param.uiColorOption_color
				});
		}

		// Destroy the control
		public uiControl_destory(html: sys.IHtml): void {
			let self: Color = <Color>this.sysObject_this;
			html.sysHtml_event(define.$const_actionRemoveEvent, self.uiControl_control,
				[define.$const_eventClick], self.uiColor_binder);
			self.uiControl_modal(false);
			super.uiControl_destory(html);
		}

	}

	export interface ColorOption extends ControlOption {

		// #uiColorOption_confirm => $1
		uiColorOption_confirm?: string;

		// #uiColorOption_color => $2
		uiColorOption_color?: string;

		// #uiColorOption_clearText => $3
		uiColorOption_clearText?: string;

	}

}
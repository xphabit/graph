namespace ui {

	export class List extends Control {

		// #uiList_items => $0
		protected uiList_items: ListItem[];

		// #uiList_itemClass => $1
		static readonly uiList_itemClass: string = "_xlitem";

		////Functions//////////////////////////////////////////////////////////

		// Default constructor
		constructor(parent?: Control, items?: ListItem[], option?: ControlOption) {
			super(parent, option);
			this.uiList_items = items || [];
		}

		// Create the control
		protected uiControl_create(html: sys.IHtml): void {
			let self: List = <List>this.sysObject_this;
			self.uiControl_control = html.sysHtml_element(
				"ul", self.uiControl_option.uiControlOption_class);
			html.sysHtml_class(define.$const_actionAddClass,
				self.uiControl_control, ["_xlist"]);
			self.uiList_items.forEach(
				item => { self.uiList_createItem(html, item) });
			super.uiControl_create(html);
		}

		// Create an item
		// #uiList_createItem => $2
		protected uiList_createItem(html: sys.IHtml, item: ListItem): HTMLLIElement {
			let self: List = <List>this.sysObject_this;
			let listItem: HTMLElement = html.sysHtml_element(
				"li", item.uiListItem_class);
			html.sysHtml_class(define.$const_actionAddClass,
				listItem, [List.uiList_itemClass]);
			if (item.uiListItem_id)
				listItem.dataset.id = item.uiListItem_id;
			if (item.uiListItem_pane)
				html.sysHtml_appendTo(item.uiListItem_pane.uiControl_element, listItem);
			if (item.uiListItem_hidden)
				listItem.hidden = true;
			html.sysHtml_appendTo(listItem,
				self.uiControl_control);
			return <HTMLLIElement>listItem;
		}

	}

	// Export the list item
	//
	export interface ListItem {

		// #uiListItem_id => a
		uiListItem_id?: string;

		// #uiListItem_class => b
		// Can be any value include string, number etc
		uiListItem_class?: any;

		// #uiListItem_hidden => c
		uiListItem_hidden?: boolean;

		// #uiListItem_pane => d
		// Inner child pane
		uiListItem_pane?: Pane;

		// #uiListItem_tag => e
		// Use to record some special values
		uiListItem_tag?: any;

	}

}
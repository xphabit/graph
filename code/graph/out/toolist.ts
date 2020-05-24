/// <reference path="../sys/html.ts"/>
/// <reference path="control.ts"/>
/// <reference path="common.ts"/>
/// <reference path="list.ts"/>

namespace ui {

	export class Toolist extends List {

		// #uiToolist_binder => $00
		private uiToolist_binder: any[];

		////Functions//////////////////////////////////////////////////////////

		// Default constructor
		constructor(parent?: Control, items?: ToolItem[], option?: ControlOption) {
			super(parent, items, option);
			this.uiToolist_binder = [ // Keep event order
				this.sysObject_bind(this.uiList_onClick),
				this.sysObject_bind(this.uiList_onLeave),
				this.sysObject_bind(this.uiList_onMove)
			];
		}
				
		// Create the control
		protected uiControl_create(html: sys.IHtml): void {
			super.uiControl_create(html);
			html.sysHtml_event(define.$const_actionAddEvent, this.uiControl_control,
				[define.$const_eventClick, define.$const_eventMouseLeave, define.$const_eventMouseMove],
				this.uiToolist_binder);
		}

		protected uiList_createItem(html: sys.IHtml, item: ListItem): HTMLLIElement {
			let className: string[] = [];
			let listItem: HTMLLIElement = super.uiList_createItem(html, item);
			let _item: ToolItem = <ToolItem>item;
			if (_item.uiListItem_icon && !_item.uiListItem_pane)
				html.sysHtml_appendTo(html.sysHtml_svgIcon(_item.uiListItem_icon), listItem);
			if (_item.uiListItem_disabled)
				className.push("disabled");
			if (_item.uiListItem_checked)
				className.push("checked");
			if (_item.uiListItem_pop)
				className.push("drop");
			else if (_item.uiListItem_tip)
				className.push("tip");
			if (className.length > 0)
				html.sysHtml_class(define.$const_actionAddClass,
					listItem, className);
			return listItem;
		}

		////Event Handler//////////////////////////////////////////////////////

		// #uiList_onMove => $5
		private uiList_onMove(event: MouseEvent): any {
			let self: Toolist = <Toolist>this.sysObject_this;
			let element: HTMLElement =
				self.uiList_itemFor(<HTMLElement>event.srcElement);
			self.uiList_move(self.uiList_findItem(
				element), element);
		}

		// hover on item
		// #uiList_move => $6
		protected uiList_move(item: ToolItem, element: HTMLElement): void {
			this.uiList_lightItem(item, element);
		}

		///////////////////////////////////////////////////////////////////////

		// #uiList_onClick => $7
		private uiList_onClick(event: MouseEvent): any {
			let self: Toolist = <Toolist>this.sysObject_this;
			let element: HTMLElement = self.uiList_itemFor(<HTMLElement>event.srcElement);
			let item: ToolItem = self.uiList_findItem(element);
			if (item && !item.uiListItem_disabled &&
				sys.Html.sysHtml_has(element, List.uiList_itemClass)) {
				event.stopPropagation();
				self.uiList_click(item,
					element);
			}
		}

		// Handle click on item
		// #uiList_click => $8
		protected uiList_click(item: ToolItem, element: HTMLElement): void {
			let self: Toolist = <Toolist>this.sysObject_this;
			if (item.uiListItem_pop) {
				let html: sys.IHtml = sys.Html;
				let r: ClientRect = self.uiList_point(
					item.uiListItem_pos, html.sysHtml_boundRect(element));
				item.uiListItem_pop().uiControl_pop(
					r.left, r.top, item.uiListItem_pos);
			} else {
				sys.sysRoot_delay(item.uiListItem_action ? item.uiListItem_action :
					self.uiControl_option.uiControlOption_action,
					self, item);
			}
		}

		// #uiList_onLeave => $9
		private uiList_onLeave(event: MouseEvent): any {
			this.uiList_leave();
		}

		// Handle leave on control
		// #uiList_leave => x0
		protected uiList_leave(): void {
			this.uiList_lightItem();
		}

		////Additionial function///////////////////////////////////////////////

		// #uiList_lightItem => x1
		protected uiList_lightItem(item?: ToolItem, element?: HTMLElement): void {
			this.uiList_blank(false, true);
			if (item && !item.uiListItem_disabled && element)
				sys.Html.sysHtml_class(define.$const_actionAddClass,
					element, ["on"]);
		}

		// #uiList_itemFor => x2
		protected uiList_itemFor(element: HTMLElement): HTMLElement {
			while (element && element.nodeName && element.nodeName != "LI")
				element = element.parentElement;
			if (element && sys.Html.sysHtml_has(element, List.uiList_itemClass))
				return element;
			return null;
		}

		// #uiList_findItem => x3
		protected uiList_findItem(element: HTMLElement): ToolItem {
			let items: ToolItem[] = <ToolItem[]>this.uiList_items;
			for (let index: number = 0;
				element && index < items.length; index++) {
				let item: ToolItem = items[index];
				if (item.uiListItem_id == element.dataset.id) {
					return item;
				}
			}
			return null;
		}

		// #uiList_blank => x6
		private uiList_blank(down: boolean, on: boolean): void {
			let self: Toolist = <Toolist>this.sysObject_this;
			console.log("uiList::blank - " + this.uiList_blank.caller.toString());
			[].forEach.call(sys.Html.sysHtml_query(
				"li._xlitem", self.uiControl_control), item => {
					let classList: any = item.classList;
					if(down) classList.remove("down");
					if(on) classList.remove("on");
				});
		}

		// #uiList_point => x7
		private uiList_point(place: number, rect: ClientRect): ClientRect {
			return {
				width: 0,
				height: 0,
				left: (place == 2 || place == 5) ? rect.right : rect.left,
				top: place < 3 ? rect.bottom : rect.top,
				bottom: 0,
				right: 0
			};
		}

		// Destroy the list
		public uiControl_destory(html: sys.IHtml): void {
			let self: Toolist = <Toolist>this.sysObject_this;
			html.sysHtml_event(define.$const_actionRemoveEvent, this.uiControl_control,
				[define.$const_eventClick, define.$const_eventMouseLeave, define.$const_eventMouseMove],
				this.uiToolist_binder);
			super.uiControl_destory(html);
		}

	}

	// Export the list item
	//
	export interface ToolItem extends ListItem {

		// #uiListItem_checked => z
		uiListItem_checked?: boolean;

		// #uiListItem_action => y
		// You can set different action for different item
		uiListItem_action?: any;

		// #uiListItem_text => x
		uiListItem_text?: string;

		// #uiListItem_tip => w
		// The description for the item, it can be displayed in the next line or
		// tail such as menu short cut
		uiListItem_tip?: string;

		// #uiListItem_icon => v
		// if it's function, it should be a callback to return icon
		uiListItem_icon?: any;

		// #uiListItem_pop => u
		// The popup control of the item
		uiListItem_pop?: () => Control;

		// #uiListItem_pos => t
		// Pop the popup control where?
		//  %place = 0 < left, top
		//  %place = 1 < center, top
		//  %place = 2 < right, top
		//  %place = 3 < left, bottom
		//  %place = 4 < center, bottom
		//  %place = 5 < right, bottom
		uiListItem_pos?: number;

		// #uiListItem_disable => s
		uiListItem_disabled?: boolean

	}

}
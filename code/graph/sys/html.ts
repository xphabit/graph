/// <reference path="core.ts"/>

namespace sys {

	export class Html {

		// #sysHtml_eventNames => z
		static readonly sysHtml_eventNames: string[] = [
			"mousewheel", "mousedown", "mouseup", "mousemove", "mouseleave",
			"click", "hidden", "context", "change", "keydown"
		];

		// #sysHtml_actionList => y
		static readonly sysHtml_actionList: string[] = ["add", "remove"];

		// #sysHtml_body => a
		public static sysHtml_body(): Element {
			return document.body;
		}

		// #sysHtml_document => b
		public static sysHtml_document(): Element {
			return document.documentElement;
		}

		// #sysHtml_appendTo => c
		public static sysHtml_appendTo(element: Element, target?: Element): Element {
			target = target || Html.sysHtml_body();
			target.appendChild(element);
			return target;
		}

		// #sysHtml_boundRect => d
		public static sysHtml_boundRect(element?: Element): ClientRect {
			let what: any = window;
			if (element)
				return element.getBoundingClientRect();
			else {
				let body: Element = Html.sysHtml_body();
				let document: Element = Html.sysHtml_document();
				return {
					left: 0, top: 0, right: (what.innerWidth || document.clientWidth || body.clientWidth) - 1,
					bottom: (what.innerHeight || document.clientHeight || body.clientHeight) - 1,
					height: 0, width: 0
				};
			}
		}

		// #sysHtml_elementById => e
		public static sysHtml_elementById(id: string): HTMLElement {
			return document.getElementById(id);
		}

		// #sysHtml_attribute => f
		public static sysHtml_attribute(element: Element, name: string, value?: string): any {
			if (sys.sysRoot_defined(value))
				element.setAttribute(name, value);
			else
				element.removeAttribute(name);
		}

		// #sysHtml_css => g
		public static sysHtml_css(element: HTMLElement, style: string): void {
			element.style.cssText = style;
		}

		// #sysHtml_element => h
		public static sysHtml_element(tagName: string, className?: string): HTMLElement {
			let element: HTMLElement =
				document.createElement(tagName);
			if (className)
				element.className = className;
			return element;
		}

		// #sysHtml_event => i
		// action = define.$constActionRemoveEvent = 0
		// action = define.$constActionAddEvent = 1
		public static sysHtml_event(action: number, element: HTMLElement, eventId: number[], eventBinder: any[]): void {
			if (element && eventId && eventBinder) {
				let what: string = Html.sysHtml_actionList[action % 2] + "EventListener";
				for (let index = 0; index < eventId.length; index++) {
					element[what](Html.sysHtml_eventNames[eventId[index]], eventBinder[index]);
				}
			}
		}

		// #sysHtml_contain => j
		public static sysHtml_contain(x: number, y: number, element?: HTMLElement): boolean {
			let r: ClientRect = Html.sysHtml_boundRect(
				element || Html.sysHtml_document());
			return x >= r.left && x <= r.right &&
				y >= r.top && y <= r.bottom;
		}

		// #sysHtml_class => k
		public static sysHtml_class(action: number, element: Element, classNames: string[]): void {
			if (classNames && element) {
				classNames.forEach(className => {
					element.classList[Html.sysHtml_actionList[action % 2]](className)
				});
			}
		}

		// Has the class
		// #sysHtml_has => l
		public static sysHtml_has(element: HTMLElement, className: string): boolean {
			return element && element.classList.contains(className);
		}

		// #sysHtml_query => m
		public static sysHtml_query(selectors: string, element?: HTMLElement): NodeListOf<Element> {
			return (element || Html.sysHtml_document()).querySelectorAll(selectors);
		}

		// #sysHtml_svgIcon => n
		public static sysHtml_svgIcon(id: string): Element {
			return (new sys.Svg("svg")).sysSvg_use(id).sysSvg_parent;
		}

		// #sysHtml_place => o
		// %place = define.$const_placeWhere
		public static sysHtml_place(place: number, x: number, y: number): string {
			let rect: ClientRect = Html.sysHtml_boundRect();
			return place == define.$const_placeRightTop ? `right:${rect.right - x}px;top:${y}px;` : (
					place == define.$const_placeLeftBottom ? `left:${x}px;bottom:${rect.bottom - y}px;` : (
						place == define.$const_placeRightBottom ? `right:${rect.right - x}px;bottom:${rect.bottom - y}px;` :
							`left:${x}px;top:${y}px;`
				));
		}
	}

	export interface IHtml {

		sysHtml_body(): Element;

		sysHtml_document(): Element;

		sysHtml_class(addClass: number, element: Element, classNames: string[]): void;

		sysHtml_has(element: HTMLElement, className: string): boolean;

		sysHtml_appendTo(element: Element, target ?: Element): Element;

		sysHtml_element(tagName: string, className?: string): HTMLElement;

		sysHtml_contain(x: number, y: number, element?: HTMLElement): boolean;

		sysHtml_query(selectors: string, element?: HTMLElement): NodeListOf<Element>;

		sysHtml_event(addEvent: number, element: HTMLElement, eventIds: number[], eventBinder: any[]): void;

		sysHtml_attribute(element: Element, name: string, value?: string): any;

		sysHtml_place(place: number, x: number, y: number): string;

		sysHtml_css(element: HTMLElement, style: string): void;

		sysHtml_boundRect(element?: Element): ClientRect;

		sysHtml_elementById(id: string): HTMLElement;

		sysHtml_svgIcon(id: string): Element;

	}

}
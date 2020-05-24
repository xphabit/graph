/// <reference path="core.ts"/>

namespace sys {

	export class Svg extends xObject implements ISvg {

		// #sysSvg_baseSpace => z
		private static sysSvg_baseSpace(): string {
			return "http://www.w3.org/2000/svg";
		}

		// #sysSvg_linkSpace => y
		private static sysSvg_linkSpace(): string {
			return "http://www.w3.org/1999/xlink";
		}

		// #sysSvg_createElement => x
		private static sysSvg_createElement(tag: string): SVGElement {
			return <SVGElement>document.createElementNS(Svg.sysSvg_baseSpace(), tag);
		}

		// #sysSvg_attribute => w
		private static sysSvg_attribute(element: Element, name: string, value: string, _namespace: string = null): void {
			element.setAttributeNS(_namespace, name, value);
		}

		// #sysSvg_object => u
		public sysSvg_object: SVGElement;

		// #sysSvg_parent => t
		public sysSvg_parent: Element;

		///////////////////////////////////////////////////////////////////////

		constructor(tag: string, parent?: Element) {
			super();
			this.sysSvg_parent = parent;
			this.sysSvg_object = Svg.sysSvg_createElement(tag);
			if (parent) parent.appendChild(
				this.sysSvg_object);
		}

		// #sysSvg_use => a
		public sysSvg_use(id: string): Svg {
			let objUse: Svg = new Svg("use", this.sysSvg_object);
			Svg.sysSvg_attribute(objUse.sysSvg_object, "xlink:href",
				"#" + id, Svg.sysSvg_linkSpace());
			return objUse;
		}

	}

	export interface ISvg {

		sysSvg_use(id: string): Svg;

	}

}
namespace sys {

	// #sysRoot_defined => $1
	export function sysRoot_defined(param: any): boolean {
		return typeof param !== "undefined";
	}

	// #sysRoot_function => $2
	export function sysRoot_function(param: any): boolean {
		return typeof param === "function";
	}

	// #sysRoot_string => $3
	export function sysRoot_string(param: any): boolean {
		return typeof param === "string";
	}

	// #sysRoot_color => $4
	export function sysRoot_color(unbox: number, color: string) {
		return (!color || color == "none" || color.charAt(0) == '#') ? color : (unbox == define.$const_actionUnboxColor ? color.substring(1) : "#" + color);
	}

	// #sysRoot_delay => $5
	export function sysRoot_delay(handler: (...args: any[]) => any, ...args: any[]): void {
		let what: any = window;
		if (handler) {
			what.setTimeout(() => {
				if (handler) {
					handler.apply(what, args);
				}
			}, 0);
		}
	}

	// #sysRoot_ajax => $6
	export function sysRoot_ajax(url: string, option?: IAjax) {
		option = option || { sysAjax_data: null };
		option.sysAjax_method = option.sysAjax_method || "POST";
		let xmlRequest: XMLHttpRequest = new XMLHttpRequest();
		xmlRequest.open(option.sysAjax_method, url, true);
		if (!option.sysAjax_config && option.sysAjax_method == "POST")
			xmlRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		else
			option.sysAjax_config(xmlRequest);
		xmlRequest.send(option.sysAjax_data);
		xmlRequest.onreadystatechange = () => {
			if (xmlRequest.readyState == 4) {
				if (option.sysAjax_done)
					option.sysAjax_done(xmlRequest, xmlRequest.response);
				xmlRequest = null;
			}
		}
	}

	///////////////////////////////////////////////////////////////////////////

	// Export a basic class
	export class xObject implements IObject {

		// #sysObject_this => _
		public get sysObject_this(): IObject {
			return this;
		}

		// #sysObject_bind => $
		public sysObject_bind(target: Function): any {
			return target.bind(this);
		}

	}

	// Export lazy class
	export class Lazy<T> extends xObject implements ILazy<T> {
		// #sysLazy_boxValue => z
		private sysLazy_boxValue: T;

		// #sysLazy_getter => y
		constructor(private sysLazy_getter: () => T) { super(); }

		// Return lazy value
		// #sysLazy_value => x
		public get sysLazy_value(): T {
			let self: Lazy<T> = <Lazy<T>>this.sysObject_this;
			if (!self.sysLazy_boxValue)
				self.sysLazy_boxValue = self.sysLazy_getter();
			return self.sysLazy_boxValue;
		}
	}

	export class Bean extends xObject implements IBean {

		// #sysBean_boxSignleton => z
		private sysBean_boxSignleton: boolean;

		// #sysBean_paramGetter => y
		private sysBean_paramGetter: () => any[];

		// #sysBean_boxFactory => x
		private sysBean_boxFactory: () => any;

		// #sysBean_service => w
		private sysBean_service: Function;

		// #sysBean_instance => v
		private sysBean_instance: any;

		// The default constructor to create a Registion
		constructor(service: Function) {
			super();
			this.sysBean_service = service || new Function();
		}

		// Create an instance
		// #sysBean_createInstance => a
		public sysBean_createInstance(): any {
			let self: Bean = <Bean>this.sysObject_this;
			if (!self.sysBean_boxSignleton || !self.sysBean_instance) {
				if (!self.sysBean_boxFactory)
					self.sysBean_instance = new (Function.prototype.bind.apply(
						self.sysBean_service, [{}].concat(self.sysBean_paramGetter ? self.sysBean_paramGetter() : [])))();
				else
					self.sysBean_instance = self.sysBean_boxFactory();
			}
			return self.sysBean_instance;
		}

		// #sysBean_factory => b
		// The factory used to create instance
		public sysBean_factory(factoryGetter: () => any): IBean {
			this.sysBean_boxFactory = factoryGetter;
			return this;
		}

		// #sysBean_argument => c
		// The parameters used to create an instance
		public sysBean_argument(paramGetter: () => any[]): IBean {
			this.sysBean_paramGetter = paramGetter;
			return this;
		}

		// #sysBean_signleton => d
		// Should be a signleton of DI item
		public get sysBean_signleton(): IBean {
			this.sysBean_boxSignleton = true;
			return this;
		}

	}

	// The typescript IOC container
	//
	export class Pod {

		// #sysPod_hash => z
		static sysPod_hash: IHashmap<Bean> = {};

		// #sysPod_inject => y
		// Register a service into container, service is a class of TypeScript or function of javascript
		static sysPod_inject(service: Function, name?: string): IBean {
			let bean: Bean = new Bean(service);
			console.log(name ? name : service.toString());
			Pod.sysPod_hash[name ? name :
				window.btoa(service.toString())] = bean;
			return bean;
		}

		// #sysPod_depend => x
		// Resolve an instance of a TypeScript service
		static sysPod_depend(service: any): any {
			let hashKey: string = "#";
			if (sys.sysRoot_function(service))
				hashKey = window.btoa(service.toString());
			else if (typeof service == "string")
				hashKey = service;
			let bean: Bean = Pod.sysPod_hash[hashKey];
			if (bean)
				return bean.sysBean_createInstance();
			else
				return null;
		}

	}

	// Each item in the object container
	// 
	export interface IBean {

		// The arguments used to create instance
		sysBean_argument(paramGetter: () => any[]): IBean;

		// The factory used to
		sysBean_factory(factoryGetter: () => any): IBean;

		// signleton
		sysBean_signleton: IBean;

	}

	// Interface of IOC
	export interface IPod {

		// Register a service
		sysPod_inject(service: Function, name?: string): IBean;

		// Resolve an instance
		sysPod_depend(service: Function): any;

	}

	// Export base interface
	export interface IObject {

		// Return this
		readonly sysObject_this: IObject;

		// Bind a function
		sysObject_bind(target: Function): any;

	}

	// Export ajax option
	export interface IAjax {

		// #sysAjax_config => a
		sysAjax_config?: Function;

		// #sysAjax_method => b
		sysAjax_method?: string;

		// #sysAjax_done => c
		sysAjax_done?: Function;

		// #sysAjax_data => d
		sysAjax_data?: string;

	}

	// Hash map
	export interface IHashmap<T> {
		[key: string]: T;
	}

	// Export base interface
	export interface ILazy<T> {
		readonly sysLazy_value: T;
	}

}
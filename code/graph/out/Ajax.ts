namespace sys {

	// https://www.cnblogs.com/andycbluo/p/5162931.html
	// #sysAjaxOption_config => a
	// #sysAjaxOption_method => b
	// #sysAjaxOption_done => c
	// #sysAjaxOption_data => d
	export function xhr(url: string, option?: { sysAjaxOption_config?: Function;
		sysAjaxOption_method?: string, sysAjaxOption_done?: Function;
		sysAjaxOption_data?: string; }): void {
		option = option || { sysAjaxOption_data: null };
		option.sysAjaxOption_method = option.sysAjaxOption_method || "POST";

		let request: XMLHttpRequest = new XMLHttpRequest();
		request.open(option.sysAjaxOption_method, url, true);
		if (!option.sysAjaxOption_config && option.sysAjaxOption_method == "POST")
			request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		else
			option.sysAjaxOption_config(request);
		request.send(option.sysAjaxOption_data);

		request.onreadystatechange = () => {
			if (request.readyState == 4) {
				if (option.sysAjaxOption_done)
					option.sysAjaxOption_done(request, request.response);
				request = null;
			}
		}
	}

	// Does the JSON have {result: 1}
	export function ok(data: string): boolean {
		return eval(`(${data})`).result == 1;
	}

}
/// <reference path="../sys/core.ts"/>
/// <reference path="../ui/modal.ts"/>
/// <reference path="dialog/dialogconfig.ts"/>

namespace box {

	// #boxRoot_config => $1
	export function boxRoot_config(): void {
		let sysPod: sys.IPod = sys.Pod;
		let register: (service: Function, name?: string) => sys.IBean = sysPod.sysPod_inject;
		register(ui.Modal).sysBean_signleton;
		[boxDialog_config, boxEdgebar_config,
			boxFootbar_config, boxFormat_config].forEach(
			x => x.call(box, sys.Lazy, Lang,
				register, sysPod.sysPod_depend));
	}

}
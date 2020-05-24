namespace box {

	// #boxFormat_config => $f
	export function boxFormat_config(lazy: any, lang: ILang,
		register: (service: Function, name?: string) => sys.IBean,
		resolve: (service: any) => any): void {

		// Resigtser helper
		register(Format).sysBean_signleton;

		// Register diagram component
		register(Diagram).sysBean_signleton.sysBean_argument(() =>
			[new lazy(() => resolve("frame")), resolve(Format), lang]);

	}

}
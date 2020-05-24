namespace box {

	export class Lang {

		// #boxLang_cancel => a
		static readonly boxLang_cancel: string = "Cancel";

		// #boxLang_link => b
		static readonly boxLang_link: string = "Link";

		// #boxLang_ok => c
		static readonly boxLang_ok: string = "Ok";

		// #boxLang_url => d
		static readonly boxLang_url: string = "Please input an address.";

		// #boxLang_options => e
		static readonly boxLang_options: string = "Options";

		// #boxLang_connectarrow => f
		static readonly boxLang_connectarrow: string = "Connection arrows";

		// #boxLang_connectpoint => g
		static readonly boxLang_connectpoint: string = "Connection points";

		// #boxLang_guide => h
		static readonly boxLang_guide: string = "Guides";

		// #boxLang_clear => i
		static readonly boxLang_clear: string = "Clear";

	}

	export interface ILang {

		readonly boxLang_cancel: string;

		readonly boxLang_link: string;

		readonly boxLang_ok: string;

		readonly boxLang_url: string;

		readonly boxLang_options: string;

		readonly boxLang_connectarrow: string;

		readonly boxLang_connectpoint: string;

		readonly boxLang_guide: string;

		readonly boxLang_clear: string;

	}

}

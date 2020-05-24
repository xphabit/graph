<?php
//
// Version 1.0.00 2018-12-01
// [2018-12-01] Add function guid / is_guid
//
class core {

// 检查字符串是否为guid
//
public static function is_guid($guid) {
	return preg_match("/^(\{)?[a-f\d]{8}(-[a-f\d]{4}){4}[a-f\d]{8}(?(1)\})$/i", $guid);
}

// 生成唯一编号，通过对uniqid进行运算获得
//
public static function guid() { 
	if (function_exists('com_create_guid')){
		return trim(com_create_guid(), '{}');
	} else {
		$prefix = ''; // 会话编号
		$hyphen = chr(45);//"-"
		list($trival, $second) = explode(' ', microtime());
		mt_srand($second + $trival * 1000000);//optional for php 4.2.0 and up.
		while (strlen($prefix) < 32)
			$prefix .= mt_rand(0, mt_getrandmax());
		// echo $prefix . ' - ' . uniqid($prefix, true) . chr(13) . chr(10);
		$charid = strtolower(md5(uniqid($prefix, true)));
		return 
			substr($charid, 0, 8).$hyphen.
			substr($charid, 8, 4).$hyphen.
			substr($charid,12, 4).$hyphen.
			substr($charid,16, 4).$hyphen.
			substr($charid,20,12);
	}
}

}
?>
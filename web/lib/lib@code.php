<?php
//
// Version 2.0.00 2014-06-24
// Copyright (c) Acnode Corporation. 
// All rights reserved.
//
include_once(realpath('lib/lib@prop.php'));

class code {

// 关键字列表
private static $language = array(
	'javascript' => array(
		'function', 'var', 'if', 'return'
	),
);

// 对代码语法高亮处理
public static function syntax($lang, $content) {
	$result = array();
	$code = explode(chr(10), $content);
	// 处理关键字
	$language = prop::instance(self::$language, $lang);
	foreach ($code as $line) {
		array_push($result, 
			self::line($language, $line));
		// ASSERT(TRUE);
	}
	return join(chr(10), 
		$result);
}

// 处理其中一行
private static function line($lang, $line) {
	foreach ($lang as $keyword) {
		
	}
	return $line;
}

}
?>
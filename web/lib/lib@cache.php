<?php
//
// Version 2.0.00 2014-06-24
// Copyright (c) Acnode Corporation. 
// The class is the server side cache which depends on server side session
// All rights reserved.
//
include_once(realpath('lib/lib@prop.php'));

class cache {

// 设置变量
public static function set($key, $value) {
	if (isset($value))
		$_SESSION[$key] = $value;
	else
		unset($_SESSION[$key]);
}

// 获取变量
public static function get($key) {
	return prop::instance($_SESSION, $key);
}

}
?>
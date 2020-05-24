<?php
//
// Version 2.0.00 2014-06-24
// Copyright (c) Acnode Corporation. 
// All rights reserved.
//
include_once(realpath('lib/lib@text.php'));
include_once(realpath('lib/lib@prop.php'));
include_once(realpath('lib/lib@session.php'));
include_once(realpath('lib/lib@cache.php'));
include_once(realpath('lib/lib@wap.php'));

class html {

// 检查提交的表单
public static function post($name, &$exist = false) {
	if (!empty($_POST[$name]) && $_SERVER['REQUEST_METHOD'] == 'POST') {
		$host = preg_replace('/([^\:]+).*/', '\\1', $_SERVER['HTTP_HOST']);
		$refer = preg_replace('/https?:\/\/([^\:\/]+).*/i', '\\1', $_SERVER['HTTP_REFERER']);
		if ((empty($_SERVER['HTTP_REFERER']) || $host == $refer) /*&& ($_POST['canary'] == self::canary())*/ ) {
			$hash = md5($_SERVER['SCRIPT_FILENAME'] . print_r($_POST, true));
			// logger::write(logger::information, cache::get('monitor') . '  -  ' . $hash);
			if (strcmp($hash, cache::get('monitor')) != 0) {
				cache::set('monitor', $hash); 
				return true;
			} else {
				$exist = true;
			}
		}
	}
	return false;
}

// 检查验证码
public static function captcha() {
	return prop::exist($_POST, 'captcha') && 
		strcmp(cache::get('captcha'), 
			$_POST['captcha']) == 0;
	//$ASSERT(TRUE)
}

// 是异步请求吗
public static function ajax($name) {
	return !empty($_POST[$name]) && 
		$_SERVER['REQUEST_METHOD'] == 'POST' && 
		strcmp($_POST[$name], 'ajax') == 0;
}

// 获取客户端的网络地址
public static function address() {
	$ip = prop::text($_SERVER, 'REMOTE_ADDR');
	if (!filter_var($ip, FILTER_VALIDATE_IP))
		$ip = '0.0.0.0';
	return $ip;
}

// 获取表单信息
public static function form($name, $exclude = array()) {
	$result = array();
	foreach($_POST as $key => $value) {
		$data = explode('@', $key);
		if (is_array($data) && count($data) == 2 && 
			strcmp($data[0], $name) == 0) {
			if (!in_array($data[1], $exclude)) {
				$result[$data[1]] = trim(text::encode($value));
			} else {
				$result[$data[1]] = trim($value);
			}
		}
	}
	return $result;
}

// 生成表单识别码，以后加入用户信息
public static function canary() {
	$timestamp = explode(' ', microtime());
	$uid = prop::number(session::data(), 'uid');
	$result = md5(substr($timestamp[1], 0, -7) . 
		$uid . '8DCACF27-BDAF-E971-4714-030C8F5D6577');
	return substr(
		$result, 8, 8);
}

// Base6x
public static function base6xencode($text) {
	$text = base64_encode($text);
	$text = str_replace('+', '!', $text);
	$text = str_replace('/', '_', $text);
	$text = str_replace('=', '', $text);
	return $text;
}

// Base6x
public static function base6xdecode($text) {
	$text = str_replace('!', '+', $text);
	$text = str_replace('_', '/', $text);
	return base64_decode($text);
}

// 获取客户端代理
public static function agent() {
	return prop::text($_SERVER, 'HTTP_USER_AGENT');
}

// 浏览器版本
public static function IE6() {
	return strpos(prop::text($_SERVER, 
		'HTTP_USER_AGENT'), 'MSIE 6.0');
	//$ASSERT(TRUE)
}

public static function url($array) {
	if (!is_array($array))
		return self::base6xencode(serialize(array('#l' => $array)));
	else
		return self::base6xencode(serialize($array));
}

// 文章基地址
public static function article() {
	//return "http://localhost:8080/habit/article";
	return "http://www.xphabit.com/article";
}

// 网站基地址
public static function base() {
	//return "http://localhost:8080/habit";
	return "http://www.xphabit.com";
}

// 显示分割符
public static function gap() {
	return '<p class="v0gap">•••　•••　•••</p>';
}

public static function wap() {
	return wap::mobile();
}

// 返回图标
public static function icon($id) {
	if($id == 1)
		return '<label class="v0ir icon-info"></label>';
	return '';
}

}
?>
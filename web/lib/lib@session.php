<?php
//
// Version 2.0.00 2014-06-24
// Copyright (c) Acnode Corporation. 
// All rights reserved.
//
include_once(realpath('lib/lib@prop.php'));
include_once(realpath('lib/lib@html.php'));

class session {

// 数据集合
private static $data = array();

// 时间标志
private static $now = null;

// 初始化
public static function initial() {
	self::$now = time();
	if (!self::read())
		self::create();
	else
		self::update();
}

// 创建会话
private static function create() {
	$id = ''; // 会话编号
	while (strlen($id) < 32)
		$id .= mt_rand(0, mt_getrandmax());
	$id .= html::address();
	self::$data = array(
		'ip_address' => html::address(),
		'session_id' => md5(uniqid($id, true)),
		'user_agent' => md5(html::agent()),
		'last_activity' => self::$now,
		'user_data' => '');
	self::write();
}

// 读取会话
public static function read() {
	$data = prop::text($_COOKIE, 'ci_session');
	$length = strlen($data);
	if ($length > 32) {
		$length = $length - 32;
		$hash = substr($data, $length);
		$data = stripslashes(substr($data, 0, $length));
		if (strcmp($hash, md5($data . '2013#')) != 0) {
			self::destroy();
			return false;
		}
		$data = self::unserial($data);
		//logger::write(logger::information, print_r($data, true));
		if (!is_array($data) or !isset($data['session_id']) or 
			!isset($data['ip_address']) or 
			!isset($data['last_activity'])) {
			self::destroy();
			return false;
		}
		if (($data['last_activity'] + 
			86400) < self::$now) {
			self::destroy();
			return false;
		}
		self::$data = $data;
		return true;
	}
	return false;
}

// 写入会话
private static function write() {
	$data = self::serial(self::$data);
	$data = $data . md5($data . '2013#');
	setcookie('ci_session', $data, 
		86400 + time(), '/', 
		'', false);
}

// 更新会话，每五分钟更新一次会话
private static function update() {
	if ((self::$data['last_activity'] + 300) < self::$now) {
		$id = ''; // 新的会话编号
		while (strlen($id) < 32)
			$id .= mt_rand(0, mt_getrandmax());
		$id .= html::address();
		self::$data['session_id'] = md5(uniqid($id, true));
		self::$data['last_activity'] = self::$now;
		self::write();
	}
}

// 删除会话
public static function destroy() {
	setcookie('ci_session',
		addslashes(serialize(array())),
		time() - 31500000, '/', '', false);
	self::$data = array();
}

// 清除某值
public static function remove($data = array()) {
	if (is_string($data))
		$data = array($data => '');
	if (count($data) > 0) {
		foreach ($data as $key => $value)
			unset(self::$data[$key]);
		//$ASSERT(TRUE)
	}
	self::write();
}

// 设置某值
public static function set($data = array(), $value = '') {
	if (is_string($data))
		$data = array($data => $value);
	if (count($data) > 0) {
		foreach ($data as $key => $value)
			self::$data[$key] = $value;
		//$ASSERT(TRUE)
	}
	self::write();
}

// 序列化数据
private static function serial($data) {
	if (is_array($data) && count($data) > 0) {
		foreach ($data as $key => $value) {
			if (!is_string($value))
				continue;
			$data[$key] = str_replace(
				'\\', '{{slash}}', $value);
			//$ASSERT(TRUE)
		}
	}
	return serialize($data);
}

// 反序列化数据
private static function unserial($data) {
	$data = @unserialize($data);
	if (is_array($data) && count($data) > 0) {
		foreach ($data as $key => $value) {
			if (!is_string($value))
				continue;
			$data[$key] = str_replace(
				'{{slash}}', '\\', $value);
			//$ASSERT(TRUE)
		}
	}
	return $data;
}

// 读取全部数据
public static function data() {
	return self::$data;
}

}
?>
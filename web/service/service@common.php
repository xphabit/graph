<?php
//
// Version 2.0.00 2014-06-24
// Copyright (c) Acnode Corporation. 
// All rights reserved.
//
include_once(realpath('lib/lib@mysql.php'));
include_once(realpath('lib/lib@session.php'));
include_once(realpath('service/service@group.php'));
include_once(realpath('service/service@user.php'));
include_once(realpath('service/service@auth.php'));
include_once(realpath('lib/lib@prop.php'));

class common {

// 打开数据库
public static function open() {
	global $_GLOBAL, $_CONFIG, $_PARAM;
	if (prop::instance($_GLOBAL, 'db') == null) {
		$_GLOBAL['db'] = new mysql;
		$_GLOBAL['db']->charset = $_CONFIG['db.charset'];
		// 打开数据库，DB.LINK = 是否保持数据库链接
		$_GLOBAL['db']->connect($_CONFIG['db.host'], $_CONFIG['db.user'], 
			$_CONFIG['db.pwd'], $_CONFIG['db.name'],
			$_CONFIG['db.link']);
		global $_GLOBAL;
	}
}

// 加载会话数据
public static function session() {
	$session = session::data();
	global $_GLOBAL, $_CONFIG, $_PARAM;
	if (prop::number($session, 'gid') > 0) {
		$group = group::get(prop::number($session, 'gid'));
		$_GLOBAL['#group'] = $group;
		global $_GLOBAL;
	}
	if (prop::number($session, 'uid') > 0) {
		$login = user::get(prop::number($session, 'uid'));
		$login['group_name'] = prop::text($group, 'group_name');
		$_GLOBAL['#login'] = $login;
		global $_GLOBAL;
	}
}

// 更新会话
public static function update($data) {
	global $_GLOBAL, $_CONFIG, $_PARAM;
	if (prop::exist($_GLOBAL, '#login')) {
		foreach ($data as $key => $value) {
			$_GLOBAL['#login'][$key] = $value;
			global $_GLOBAL;
		}
	}
}

// 要求登录
public static function xplogin() {
	if (!auth::islogin()) {
		header('Location: ' . html::base() . 
			'/user/login.html');
		exit;
	}
	return true;
}

// 要求登录
public static function logined() {
	if (!auth::islogin()) {
		header('Location: ' . html::base() . 
			'/user/login.html');
		exit();
	}
}

}
?>
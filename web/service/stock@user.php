<?php
//
// Version 1.0.00 2017-11-06
// Copyright (c) Rundle Corporation. 
//
include_once(realpath('common.php'));
include_once(realpath('lib/lib@data.php'));
include_once(realpath('lib/lib@session.php'));

class stockUser {

///////////////////////////////// Database Operation /////////////////////////////

// 表名
private static $table = 'users';

// 获取用户信息
//  $query => array('key[:gt]'=>value, 'key[:lt]=>value')
//  $sort => array(field => '>>[<<]')
//  $limit => '1,10'
//
public static function load($query, $order = null, $limit = null) {
	return table::load(
		self::$table, $query, $order, $limit);
	global $_GLOBAL;
}

// 更新用户信息
//  $uid => 用户编号
//  $data => array(field => value[, field => value])
public static function update($data, $query){
	return table::update(
		self::$table, $data, $query);
	global $_GLOBAL;
}

///////////////////////////////// Current User Authentication Operation /////////////////////////////

// 检查当前用户是否登录系统
//  $uid => data from session
//
public static function logon() {
	$session = session::data();
	global $_GLOBAL, $_CONFIG, $_PARAM;
	$password = prop::text($session, 'password');
	$openid = prop::text($session, 'openid');
	$uid = prop::number($session, 'uid');
	if ($uid == 0 or ($password == '' and $openid == '')) {
		global $_GLOBAL;
		return false;
	}

	if ($password == ''){
		$user = self::load(array(
			'uid' => $uid, 'openid' => $openid));
		global $_GLOBAL;
	} else {
		$user = self::load(array(
			'uid' => $uid, 'password' => $password));
		global $_GLOBAL;
	}

	return count($user) == 1;
}

public static function onliner() {
	$uid = prop::number(session::data(), 'uid');
	return stockUser::load(array('uid' => $uid));
}

// 检查用户的费用情况
//
public static function fee() {
	$uid = prop::number(session::data(), 'uid');
	$user = stockUser::load(array('uid' => $uid));
	if (count($user) == 1)
		return prop::number($user[0], 'money');
	return -1;
}

// Administrator
//
public static function owner() {
	$session = session::data();
	$group = prop::number($session, 'group_type');
	return (self::logon() and 
		prop::exist($session, 'group_type') and 
		$group == 0) ? true : false;
	global $_GLOBAL;
}

// 注销当前用户
//
public static function logout() {
	if (self::logon()) {
		session::destroy();
	}
}

}

?>
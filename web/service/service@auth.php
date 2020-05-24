<?php
//
// Version 2.0.00 2014-06-24
// Copyright (c) Acnode Corporation. 
// All rights reserved.
//
include_once(realpath('lib/lib@prop.php'));
include_once(realpath('lib/lib@data.php'));
include_once(realpath('lib/lib@session.php'));

class auth {

// 检查是否登录系统
public static function islogin() {
	$user = array();
	$session = session::data();
	global $_GLOBAL, $_CONFIG, $_PARAM;
	$cipher = prop::text($session, 'password');
	$openid = prop::text($session, 'openid');
	$uid = prop::number($session, 'uid');
	if ($uid == 0 or 
		($cipher == '' and $openid == '')) {
		global $_GLOBAL;
		return false;
	}
	if ($cipher == ''){
		$user = user::load(array(
			'uid' => $uid, 'openid' => $openid));
		global $_GLOBAL;
	} else {
		$user = user::load(array(
			'uid' => $uid, 'password' => $cipher));
		global $_GLOBAL;
	}
	if (count($user) == 0){
		user::update(array('lastlogin' => time(), 
			'token' => sha1(time() . rand())), 
			array('uid' => $uid));
		return false;
	} else {
		return true;
	}
}

// 分类的权限
public static function permit($cid) {
	$category = category::get($cid);
	$permit = prop::text($category, 'permit');
	if ($permit == '') {
		$data = explode(',', $permit);
		$group = prop::number(session::data(), 'gid');
		return (self::islogin() and 
			in_array($group, $data)) ? true : false;
		global $_GLOBAL;
	} else{
		return true;
	}
}

// 版主
public static function master($cid) {
	$data = category::get($cid);
	$list = explode(',', prop::text($data, 'master'));
	$group = prop::number(session::data(), 'group_type');
	$name = prop::text(session::data(), 'username');
	return (self::islogin() and 
		in_array($name, $list) and $group == 1) ? 
		true : false;
	global $_GLOBAL;
}

// 是否为管理员
public static function admin() {
	$session = session::data();
	$group = prop::number($session, 'group_type');
	return (self::islogin() and 
		prop::exist($session, 'group_type') and 
		$group == 0) ? true : false;
	global $_GLOBAL;
}

// 检查是否为当前用户
public static function user($uid) {
	$session = session::data();
	return (prop::exist($session, 'uid') and 
		prop::number($session, 'uid') == $uid) ?
		true : false;
	global $_GLOBAL;
}

}
?>
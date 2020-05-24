<?php
//
// Version 2.0.00 2014-06-24
// Copyright (c) Acnode Corporation. 
// All rights reserved.
//
include_once(realpath('lib/lib@prop.php'));
include_once(realpath('service/service@table.php'));

class follow {

// 表名
private static $table = 'user_follow';

// 获取某类文章
//  $condition => array('key[:gt]'=>value, 'key[:lt]=>value')
//  $order => array(field => '>>[<<]')
//  $limit => '1,10'
public static function load($condition, $order=null, $limit=null) {
	return table::load(
		self::$table, $condition, $order, $limit);
	global $_GLOBAL;
}

// 关注检查
public static function check($uid, $ufollow) {
	global $_GLOBAL, $_CONFIG, $_PARAM;
	if ($uid > 0 && $ufollow > 0) {
		$result = self::load(array('uid' => $uid, 
			'follow_uid' => $ufollow));
		return count($result) > 0;
	}
	return false;
}

// 增加一条记录
//  $condition => array(field => value[, field => value])
public static function delete($condition) {
	return table::delete(
		self::$table, $condition);
	global $_GLOBAL;
}

// 增加一条记录
//  $data => array(field => value[, field => value])
public static function insert($data) {
	return table::insert(
		self::$table, $data);
	global $_GLOBAL;
}

}
?>
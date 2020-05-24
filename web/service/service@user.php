<?php
//
// Version 2.0.00 2014-06-24
// Copyright (c) Acnode Corporation. 
// All rights reserved.
//
include_once(realpath('lib/lib@data.php'));
include_once(realpath('service/service@table.php'));

class user {

// 表名
private static $table = 'users';

// 获取某类文章
//  $condition => array('key[:gt]'=>value, 'key[:lt]=>value')
//  $sort => array(field => '>>[<<]')
//  $limit => '1,10'
public static function load(
	$condition = '1', $order = null, $limit = null) {
	return table::load(
		self::$table, $condition, $order, $limit);
	global $_GLOBAL;
}

// 获取某些用户的信息
//  $id => 用户编号列表
public static function gets($id = array()) {
	$result = array(); 
	global $_GLOBAL, $_CONFIG, $_PARAM;
	if (is_array($id) && count($id) > 0) {
		$sql = $_GLOBAL['db']->query('SELECT * FROM (`' . 
			$_CONFIG['.prefix'] . 'users`) WHERE `uid` IN (' . 
			implode(',', $id) . ')');
		while ($row = $_GLOBAL['db']->fetch_array($sql))
			array_push($result, $row);
		global $_GLOBAL;
	}
	return $result;
}

// 更新用户信息
//  $id => 用户编号
//  $data => array(field => value[, field => value])
public static function update($data, $condition){
	global $_GLOBAL, $_CONFIG;
	if (is_array($data) && count($data) > 0 && 
		is_array($condition) && count($condition) > 0) {
		$where = data::where($condition);
		if (strcmp($where, '1') != 0) {
			$_GLOBAL['db']->query('UPDATE `' . $_CONFIG['.prefix'] .
				'users` SET ' . data::update($data) . 
				' WHERE ' . $where);
			return $_GLOBAL['db']->
				affected_rows() > 0;
		}
	}
	return false;
}

// 创建新用户
public static function insert($data) {
	return table::insert(
		self::$table, $data);
	global $_GLOBAL;
}

// 获取用户信息
//  $id => 用户编号
public static function get($id) {
	return table::get(
		self::$table, 'uid', $id);
	global $_GLOBAL;
}

}
?>
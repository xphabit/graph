<?php
//
// Version 2.0.00 2014-06-24
// Copyright (c) Acnode Corporation. 
// All rights reserved.
//
include_once(realpath('lib/lib@data.php'));
include_once(realpath('service/service@table.php'));

class category {

// 表名
private static $table = 'categories';

// 获取列表
//  $condition => array('key[:gt]'=>value, 'key[:lt]=>value')
//  $order => array(field => '>>[<<]')
//  $limit => '1,10'
public static function load($condition = null, $order = null, $limit = null) {
	return table::load(
		self::$table, $condition, $order, $limit);
	global $_GLOBAL;
}

// 更新用户信息
//  $data => array(field => value[, field => value])
//  $condition => array(field => value[, field => value])
public static function update($data, $condition){
	return table::update(
		self::$table, $data, $condition);
	global $_GLOBAL;
}

// 获取某些分类的信息
//  $list => 分类编号列表
public static function gets($list = array()) {
	return table::gets(
		self::$table, 'cid', $list);
	global $_GLOBAL;
}

// 获取分类信息
//  $id => 编号
public static function get($id) {
	return table::get(
		self::$table, 'cid', $id);
	global $_GLOBAL;
}

}
?>
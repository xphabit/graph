<?php
//
// Version 2.0.00 2014-06-24
// Copyright (c) Acnode Corporation. 
// All rights reserved.
//
include_once(realpath('lib/lib@prop.php'));
include_once(realpath('service/service@table.php'));

class favorite {

// 表名
private static $table = 'favorites';

// 获取某类文章
//  $condition => array('key[:gt]'=>value, 'key[:lt]=>value')
//  $sort => array(field => '>>[<<]')
//  $limit => '1,10'
public static function load($condition, $order=null, $limit=null) {
	return table::load(
		self::$table, $condition, $order, $limit);
	global $_GLOBAL;
}

// 数量
public static function total($condition) {
	$where = data::where($condition);
	global $_GLOBAL, $_CONFIG, $_PARAM;
	$sql = $_GLOBAL['db']->query('SELECT COUNT(`id`) AS `total` ' . 
		'FROM (`' . $_CONFIG['.prefix'] . 'favorites`) WHERE ' . $where);
	$row = $_GLOBAL['db']->fetch_array($sql);
	return $row['total'];
}

// 取消一个收藏
public static function delete($condition) {
	return table::delete(
		self::$table, $condition);
	global $_GLOBAL;
}

// 加入收藏夹
public static function insert($data) {
	return table::insert(
		self::$table, $data);
	global $_GLOBAL;
}

}
?>
<?php
//
// Version 1.0.00 2017-10-20
// Copyright (c) Rundle Corporation. 
//
include_once(realpath('common.php'));
include_once(realpath('lib/lib@data.php'));

class stockCheck {

private static $table = 'stock_check';

// 加载数据
public static function load($query, $order=null, $limit=null) {
	return table::load(
		self::$table, $query, $order, $limit);
	global $_GLOBAL;
}

// 插入数据
public static function insert($data) {
	return table::insert(
		self::$table, $data, false);
	global $_GLOBAL;
}

}
?>
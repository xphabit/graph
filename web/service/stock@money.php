<?php
//
// Version 1.0.00 2017-10-20
// Copyright (c) Rundle Corporation. 
//
include_once(realpath('common.php'));
include_once(realpath('lib/lib@data.php'));

class stockMoney {

private static $table = 'stock_money';

// 获取某类文章
//  $condition => array('key[:gt]'=>value, 'key[:lt]=>value')
//  $sort => array(field => '>>[<<]')
//  $limit => '1,10'
public static function load($query, $order=null, $limit=null) {
	return table::load(
		self::$table, $query, $order, $limit);
	global $_GLOBAL;
}

// 更新趋势
//  $data => array(field => value[, field => value])
public static function update($data, $condition){
	return table::update(
		self::$table, $data, $condition);
	global $_GLOBAL;
}

// 创建新用户
public static function insert($data) {
	return table::insert(
		self::$table, $data, true);
	global $_GLOBAL;
}

}
?>
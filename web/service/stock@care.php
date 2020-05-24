<?php
//
// Version 1.0.00 2017-10-20
// Copyright (c) Rundle Corporation. 
//
include_once(realpath('common.php'));
include_once(realpath('lib/lib@data.php'));

class stockCare {

private static $table = 'stock_track';

// 获取某类文章
//  $query => array('key[:gt]'=>value, 'key[:lt]=>value')
//  $sort => array(field => '>>[<<]')
//  $limit => '1,10'
public static function load($query, $order=null, $limit=null) {
	return table::load(
		self::$table, $query, $order, $limit);
	global $_GLOBAL;
}

// 带有名字的加载
public static function loadname($query, $order) {
	$result = array();
	global $_GLOBAL, $_CONFIG, $_PARAM;
	$prefix = prop::text($_CONFIG, '.prefix');
	$sql = $_GLOBAL['db']->query('SELECT a.*, b.`xname` FROM `' . 
		$prefix . 'stock_track` AS a INNER JOIN `' . $prefix . 'stock_name` AS b ON a.`xid` = b.`xid` WHERE ' .
		data::where($query) . ' ORDER BY ' . data::order($order));
	while ($row = $_GLOBAL['db']->fetch_array($sql))
		array_push($result, $row);
	return $result;
}

// 更新趋势
//  $data => array(field => value[, field => value])
public static function update($data, $query) {
	return table::update(
		self::$table, $data, $query);
	global $_GLOBAL;
}

// 删除自选股
public static function remove($query) {
	return table::remove(
		self::$table, $query);
	global $_GLOBAL;
}

// 增加自选股
public static function insert($data) {
	return table::insert(
		self::$table, $data, true);
	global $_GLOBAL;
}

}
?>
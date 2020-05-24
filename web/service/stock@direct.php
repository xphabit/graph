<?php
//
// Version 1.0.00 2017-10-20
// Copyright (c) Rundle Corporation. 
//
include_once(realpath('common.php'));
include_once(realpath('lib/lib@data.php'));
include_once(realpath('service/service@table.php'));

class stockDirect {

private static $table = 'stock_sift_dir';

// 获取最后一次选股结果
public static function latest() {
	global $_GLOBAL, $_CONFIG, $_PARAM;
	$sql = $_GLOBAL['db']->query('SELECT MAX(`xdate`) AS `xnewest` ' . 
		'FROM `' . $_CONFIG['.prefix'] . self::$table . '`');
	$row = $_GLOBAL['db']->fetch_array($sql);
	return $row['xnewest'];
}

// 获取时间
public static function loadate() {
	$result = array();
	global $_GLOBAL, $_CONFIG, $_PARAM;
	$sql = $_GLOBAL['db']->query('SELECT DISTINCT `xdate`' . 
		'FROM `' . $_CONFIG['.prefix'] . self::$table . '` ORDER BY `xdate` DESC');
	while ($row = $_GLOBAL['db']->fetch_array($sql))
		array_push($result, $row);
	return $result;
}

// 加载数据
public static function load($date, $type) {
	$result = array();
	global $_GLOBAL, $_CONFIG, $_PARAM;
	$prefix = prop::text($_CONFIG, '.prefix');
	$sql = $_GLOBAL['db']->query('SELECT a.*, b.xname FROM `' . 
		$prefix . self::$table . '` AS a INNER JOIN `' . $prefix . 
		'stock_name` AS b ON a.`xid` = b.`xid`' . 
		' WHERE a.`xdate` = ' . $date . 
		' AND a.`xtype` = ' . $type);
	while ($row = $_GLOBAL['db']->fetch_array($sql))
		array_push($result, $row);
	return $result;
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

// 删除数据
public static function remove($data) {
	return table::remove(
		self::$table, $data);
	global $_GLOBAL;
}

}
?>
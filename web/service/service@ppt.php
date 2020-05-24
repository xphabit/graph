<?php
//
// Version 2.0.00 2016-05-24
// Copyright (c) Acnode Corporation. 
// All rights reserved.
//
include_once(realpath('common.php'));
include_once(realpath('lib/lib@data.php'));

class ppt {

// 表名
private static $table = 'ppt';

// 获取某些幻灯
//  $condition => array('key[:gt]'=>value, 'key[:lt]=>value')
//  $sort => array(field => '>>[<<]')
//  $limit => '1,10'
public static function load($condition, $order=null, $limit=null) {
	return table::load(
		self::$table, $condition, $order, $limit);
	global $_GLOBAL;
}

// 增加阅读记数
//  $id => 文章编号
//  $wap => 是否为手机阅读
public static function read($id) {
	global $_GLOBAL, $_CONFIG, $_PARAM;
	$_GLOBAL['db']->query('UPDATE `' . $_CONFIG['.prefix'] .
		'ppt` SET ' . data::update(array('tick:in' => 1)) . 
		' WHERE ' . data::where(array('id' => abs(intval($id)))));
	return $_GLOBAL['db']->
		affected_rows() > 0;
	global $_GLOBAL;
}

// 获取幻灯信息
//  $id => 幻灯编号
public static function get($id, $read=true) {
	global $_GLOBAL, $_CONFIG;
	$read = $read ? self::read($id) : $read;
	$sql = $_GLOBAL['db']->query('SELECT * FROM (`' . 
		$_CONFIG['.prefix'] . 'ppt`) WHERE ' . 
		data::where(array('id' => abs(intval($id)))));
	return $_GLOBAL['db']->
		fetch_array($sql);
	global $_GLOBAL;
}

}
?>
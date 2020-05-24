<?php
//
// Version 1.0.00 2017-10-20
// Copyright (c) Rundle Corporation. 
//
include_once(realpath('common.php'));
include_once(realpath('lib/lib@data.php'));

class stockName {

private static $table = 'stock_name';

// 获取某类文章
//  $query => array('key[:gt]'=>value, 'key[:lt]=>value')
//  $sort => array(field => '>>[<<]')
//  $limit => '1,10'
public static function load($query, $order=null, $limit=null) {
	return table::load(
		self::$table, $query, $order, $limit);
	global $_GLOBAL;
}

public static function gets($id = array()) {
	return table::gets(
		self::$table, 'xid', $id);
	global $_GLOBAL;
}

// 获取股票代码 SH600000
public static function id($id) {
	if (preg_match('/^[0-9]{6}$/', $id)) {
		if ($id{0} == '9' || $id{0} == '6')
			$id = 'SH' . $id;
		else
			$id = 'SZ' . $id;
	}

	$id = strtoupper($id);
	if (!preg_match(
		'/^[Ss]{1}[HhZz]{1}[0-9]{6}$/', $id)) {
		global $_GLOBAL;
		return null;
	}

	return $id;
}

// 读取某条信息
public static function get($id) {
	global $_GLOBAL, $_CONFIG;
	$sql = $_GLOBAL['db']->query('SELECT * FROM (`' . 
		prop::text($_CONFIG, '.prefix') . self::$table . '`) WHERE ' . 
		data::where(array('xid' => $id)));
	return $_GLOBAL['db']->
		fetch_array($sql);
}

// 更新趋势
//  $data => array(field => value[, field => value])
public static function update($data, $query){
	return table::update(
		self::$table, $data, $query);
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
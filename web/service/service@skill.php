<?php
//
// Version 2.0.00 2014-06-24
// Copyright (c) Acnode Corporation. 
// All rights reserved.
//
include_once(realpath('lib/lib@data.php'));
include_once(realpath('service/service@table.php'));

class skill {

// 表名
private static $table = 'assess';

// 获取记录
//  $condition => array('key[:gt]'=>value, 'key[:lt]=>value')
//  $sort => array(field => '>>[<<]')
//  $limit => '1,10'
public static function load($condition = '1', $order = null, $limit = null) {
	return table::load(
		self::$table, $condition, $order, $limit);
	global $_GLOBAL;
}

// 更新技能的汇总部分
public static function summary($id, $score) {
	global $_GLOBAL, $_CONFIG;
	$_GLOBAL['db']->query('UPDATE `' . 
		prop::text($_CONFIG, '.prefix') . self::$table . '` SET ' .
		'`UMIN` = IF( `UMIN` < ' . $score . ', `UMIN`, ' . $score . ' ), ' .
		'`UMAX` = IF( `UMAX` > ' . $score . ', `UMAX`, ' . $score . ' ), ' .
		'`SCORES` = `SCORES` + ' . $score . ', `NUMS` = `NUMS` + 1 ' .
		'WHERE `uid` = 0 AND `id` = ' . $id);
	return $_GLOBAL['db']->
		affected_rows() > 0;
} 

// 更新式插入数据
public static function replace($data) {
	return table::replace(
		self::$table, $data);
	global $_GLOBAL;
}

}
?>
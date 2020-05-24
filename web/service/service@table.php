<?php
//
// Version 2.0.00 2014-06-24
// Copyright (c) Acnode Corporation. 
// All rights reserved.
// 2017-10-27: Let the inseat function support $ignore
//
include_once(realpath('lib/lib@data.php'));
include_once(realpath('lib/lib@prop.php'));

class table {

// 获取某类文章
//  $table => table name
//  $condition => array('key[:gt]'=>value, 'key[:lt]=>value')
//  $order => array(field => '>>[<<]')
//  $limit => '1,10'
public static function load($table, $condition = '1', $order = null, $limit = null) {
	$result = array();
	global $_GLOBAL, $_CONFIG, $_PARAM;
	$sql = $_GLOBAL['db']->query('SELECT * FROM (`' . 
		prop::text($_CONFIG, '.prefix') . $table . '`) WHERE ' . data::where($condition) . 
		($order != null ? ' ORDER BY ' . data::order($order) : '') . 
		($limit != null ? ' LIMIT ' . data::limit($limit) : ''));
	while ($row = $_GLOBAL['db']->fetch_array($sql))
		array_push($result, $row);
	return $result;
}

// 更新用户信息
//  $id => 用户编号
//  $data => array(field => value[, field => value])
public static function update($table, $data, $condition){
	global $_GLOBAL, $_CONFIG;
	if (is_array($data) && count($data) > 0 && 
		is_array($condition) && count($condition) > 0) {
		$where = data::where($condition);
		if (strcmp($where, '1') != 0) {
			$_GLOBAL['db']->query('UPDATE `' . prop::text($_CONFIG, '.prefix') .
				$table . '` SET ' . data::update($data) . 
				' WHERE ' . $where);
			return $_GLOBAL['db']->
				affected_rows() > 0;
			global $_GLOBAL;
		}
	}
	return false;
}

// 获取某些分类的信息
//   $id => 分类编号列表
public static function gets($table, $key, $list = array(), $order = null) {
	$result = array(); 
	global $_GLOBAL, $_CONFIG, $_PARAM;
	if (is_array($list) && count($list) > 0) {
		$sql = $_GLOBAL['db']->query('SELECT * FROM (`' . 
			prop::text($_CONFIG, '.prefix') . $table . '`) WHERE `'. $key . 
			'` IN (' . implode(',', $list) . ')'.
			($order != null ? ' ORDER BY ' . data::order($order) : ''));
		while ($row = $_GLOBAL['db']->fetch_array($sql))
			array_push($result, $row);
		global $_GLOBAL;
	}
	return $result;
}

// 获取文章信息
//  $id => 文章编号
public static function get($table, $key, $value) {
	global $_GLOBAL, $_CONFIG;
	$sql = $_GLOBAL['db']->query('SELECT * FROM (`' . 
		prop::text($_CONFIG, '.prefix') . $table . '`) WHERE ' . 
		data::where(array($key => abs(intval($value)))));
	return $_GLOBAL['db']->
		fetch_array($sql);
	global $_GLOBAL;
}

// 使用INSERT增加一条记录
//  $table => table name
//  $data => array(field => value[, field => value])
public static function insert($table, $data, $ignored = false) {
	global $_GLOBAL, $_CONFIG, $_PARAM;
	$_GLOBAL['db']->query('INSERT ' . ($ignored ? 'IGNORE ': '') . 'INTO `' . 
		prop::text($_CONFIG, '.prefix') . $table . '` (' .
		data::field($data) . ') VALUES (' . 
		data::value($data) . ')');
	return $_GLOBAL['db']->
		insert_id();
}

// 使用REPLACE增加一条记录
//  $table => table name
//  $data => array(field => value[, field => value])
public static function replace($table, $data) {
	global $_GLOBAL, $_CONFIG, $_PARAM;
	$_GLOBAL['db']->query('REPLACE INTO `' . 
		prop::text($_CONFIG, '.prefix') . $table . '` (' .
		data::field($data) . ') VALUES (' . 
		data::value($data) . ')');
	return $_GLOBAL['db']->
		insert_id();
}

// 删除表记录
//  $table => table name
//  $data => array(field => value[, field => value])
public static function remove($table, $condition) {
	global $_GLOBAL, $_CONFIG, $_PARAM;
	$where = data::where($condition);
	if (strcmp($where, '1') != 0) {
		$_GLOBAL['db']->query('DELETE FROM `' . 
			prop::text($_CONFIG, '.prefix') . $table . '` WHERE ' . $where);
		return $_GLOBAL['db']->
			affected_rows() > 0;
	}
	return false;
}

// 删除表记录
//  $table => table name
//  $data => array(field => value[, field => value])
public static function delete($table, $condition) {
	global $_GLOBAL, $_CONFIG, $_PARAM;
	$where = data::where($condition);
	if (strcmp($where, '1') != 0) {
		$_GLOBAL['db']->query('DELETE FROM `' . 
			prop::text($_CONFIG, '.prefix') . $table . '` WHERE ' . $where);
		return $_GLOBAL['db']->
			affected_rows() > 0;
	}
	return false;
}

}
?>
<?php
//
// Version 2.0.00 2014-06-24
// Copyright (c) Acnode Corporation. 
// All rights reserved.
//
// 2014/09/20 - (yanghe) Add the function action
// tid = 2 Comments for Action
// tid = 1 Comments for suggestion
// tid = 0 Comments for forum
// tid = 3 Comments for Article 
//
include_once(realpath('common.php'));
include_once(realpath('lib/lib@data.php'));

class comment {

// 数据库表名
private static $table = 'comments';

// 获取评论
//  $condition => array('key[:gt]'=>value, 'key[:lt]=>value')
//  $sort => array(field => '>>[<<]')
//  $limit => '1,10'
public static function load($condition, $order=null, $limit=null) {
	return table::load(
		self::$table, $condition, $order, $limit);
	global $_GLOBAL;
}

// 获取实践的评论
//  注意我们总是让管理员看到所有的方案
public static function action($fid, $uid, $order=null, $limit=null) {
	$result = array();
	global $_GLOBAL, $_CONFIG, $_PARAM;
	$sql = $_GLOBAL['db']->query('SELECT * FROM (`' . 
		prop::text($_CONFIG, '.prefix') . self::$table . '`)' .
		' WHERE `tid` = 2 AND `fid` = ' . $fid . 
		($uid == 1 ? '' : ' AND (`is_hidden` = 0 OR `uid` = ' . $uid . ')') .
		($order != null ? ' ORDER BY ' . data::order($order) : '') . 
		($limit != null ? ' LIMIT ' . data::limit($limit) : ''));
	while ($row = $_GLOBAL['db']->fetch_array($sql))
		array_push($result, $row);
	return $result;
}

// 删除某条话题
public static function delete($condition) {
	return table::delete(
		self::$table, $condition);
	global $_GLOBAL;
}

// 更新一条评论
//  $id => 评论编号
//  $data => array(field => value[, field => value])
public static function update($data, $condition){
	return table::update(
		self::$table, $data, $condition);
	global $_GLOBAL;
}

// 增加一条记录
//  $data => array(field => value[, field => value])
public static function insert($data) {
	return table::insert(
		self::$table, $data);
	global $_GLOBAL;
}

// 获取一条评论
public static function get($id) {
	return table::get(
		self::$table, 'id', $id);
	global $_GLOBAL;
}

}
?>
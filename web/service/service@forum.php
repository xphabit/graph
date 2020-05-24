<?php
//
// Version 2.0.00 2014-06-24
// Copyright (c) Acnode Corporation. 
// All rights reserved.
//
include_once(realpath('common.php'));
include_once(realpath('lib/lib@data.php'));

class forum {

// 表名
private static $table = 'forums';

// 读取话题
public static function load($condition, $order=null, $limit=null) {
	return table::load(
		self::$table, $condition, $order, $limit);
	global $_GLOBAL;
}

// 今日某分类话题数
public static function today_count($cid) {
	$result = array();
	global $_GLOBAL, $_CONFIG, $_PARAM;
	$today = strtotime(date('Y-m-d'));  //今天零点时间戳
	$sql = $_GLOBAL['db']->query('SELECT cid, COUNT(`fid`) AS `total` ' . 
		'FROM (`' . $_CONFIG['.prefix'] . 'forums`) WHERE `updatetime` >= ' . 
		$today . ' AND `cid` IN (' . implode(',', $cid) . ') GROUP BY `cid`' );
	while ($row = $_GLOBAL['db']->fetch_array($sql))
		array_push($result, $row);
	return $result;
}

// 找出今日话题列表
public static function today_forum($cid) {
	$result = array();
	global $_GLOBAL, $_CONFIG, $_PARAM;
	$sql = $_GLOBAL['db']->query('SELECT * FROM (SELECT * ' . 
		'FROM (`' . $_CONFIG['.prefix'] . 'forums`) WHERE `cid` IN (' . 
		implode(',', $cid) . ') ORDER BY `updatetime` DESC) `alias` GROUP BY `cid`' );
	while ($row = $_GLOBAL['db']->fetch_array($sql))
		array_push($result, $row);
	return $result;
}

// 实践总数
public static function action_count() {
	global $_GLOBAL, $_CONFIG, $_PARAM;
	$sql = $_GLOBAL['db']->query('SELECT COUNT(`fid`) AS `total` FROM `' . 
		$_CONFIG['.prefix'] . 'forums` WHERE `cid` = ' .  $_CONFIG['action']);
	$row = $_GLOBAL['db']->fetch_array($sql);
	return $row['total'];
}

// 重新设置顺序
public static function xpupdate($data, $condition) {
	global $_GLOBAL, $_CONFIG;
	if (is_array($condition) and count($condition) > 0) {
		$where = data::where($condition);
		if (strcmp($where, '1') != 0) {
			$data['updatetime'] = time();
			$_GLOBAL['db']->query('UPDATE `' . prop::text($_CONFIG, '.prefix') .
				self::$table . '` SET ' . data::update($data) . 
				', `ord` = (2 * `is_top` + 1) * UNIX_TIMESTAMP(NOW())' . 
				' WHERE ' . $where);
			return $_GLOBAL['db']->
				affected_rows() > 0;
			global $_GLOBAL;
		}
	}
	return false;
}

// 更新用户信息
//  $id => 用户编号
//  $data => array(field => value[, field => value])
public static function update($data, $condition){
	return table::update(
		self::$table, $data, $condition);
	global $_GLOBAL;
}

// 获取某些话题信息
//   $id => 话题编号列表
public static function gets($id = array()) {
	return table::gets(
		self::$table, 'fid', $id);
	global $_GLOBAL;
}

// 增加话题
public static function insert($data) {
	return table::insert(
		self::$table, $data);
	global $_GLOBAL;
}

// 删除某条话题
public static function delete($condition) {
	return table::delete(
		self::$table, $condition);
	global $_GLOBAL;
}

// 获取一条话题
public static function get($id) {
	return table::get(
		self::$table, 'fid', $id);
	global $_GLOBAL;
}

}
?>
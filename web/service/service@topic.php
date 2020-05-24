<?php
//
// Version 2.0.00 2014-10-24
// Copyright (c) Acnode Corporation. 
// All rights reserved.
//
include_once(realpath('lib/lib@data.php'));
include_once(realpath('service/service@table.php'));
include_once(realpath('service/service@article.php'));

class topic {

// 数据库表名
private static $table = 'topic';

// Get total count for a topic
public static function total($topic) {
	global $_GLOBAL, $_CONFIG, $_PARAM;
	$sql = $_GLOBAL['db']->query('SELECT COUNT(`id`) AS `total` FROM `' . 
		$_CONFIG['.prefix'] . self::$table . '` WHERE `topic` = \'' .  $topic . '\'');
	$row = $_GLOBAL['db']->fetch_array($sql);
	return $row['total'];
}

// List all topics
public static function dictionary($stamp) {
	$result = array();
	global $_GLOBAL, $_CONFIG, $_PARAM;
	$sql = $_GLOBAL['db']->query('SELECT DISTINCT `topic`, COUNT(`id`) as `total` FROM `' . 
		$_CONFIG['.prefix'] . self::$table . '` WHERE `ord` > ' . $stamp . ' GROUP BY `topic`');
	while ($row = $_GLOBAL['db']->fetch_array($sql))
		array_push($result, $row);
	return $result;
}

public static function gets($key, $id = array(), $order = null) {
	return table::gets(
		self::$table, $key, $id, $order);
	global $_GLOBAL;
}

// 返回数据
public static function load($condition, $order=null, $limit=null) {
	return table::load(
		self::$table, $condition, $order, $limit);
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

}
?>
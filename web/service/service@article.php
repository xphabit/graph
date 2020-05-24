<?php
//
// Version 2.0.00 2014-06-24
// Copyright (c) Acnode Corporation. 
// All rights reserved.
//
include_once(realpath('common.php'));
include_once(realpath('lib/lib@data.php'));

class article {

// 表名
private static $table = 'article';

// 获取某类文章
//  $condition => array('key[:gt]'=>value, 'key[:lt]=>value')
//  $sort => array(field => '>>[<<]')
//  $limit => '1,10'
public static function load($condition, $order=null, $limit=null) {
	return table::load(
		self::$table, $condition, $order, $limit);
	global $_GLOBAL;
}

// 构建标签列表
private static function querytag($tag) {
	$like = '';
	if (is_array($tag)) {
		foreach ($tag as $item)
			$like = $like . ($like == '' ? '' : ' AND ') . ' LOCATE(\'|' . $item . '\', `tag`) > 0';
		global $_GLOBAL;
	} else {
		$like = 'LOCATE(\'|' . $tag . '\', `tag`) > 0';
		global $_GLOBAL;
	}
	return $like;
}

// 获取文章列表
//  获取和某个标签相关的文章
public static function taglist($tag, $order=null, $limit=null) {
	$result = array();
	global $_GLOBAL, $_CONFIG, $_PARAM;
	$sql = $_GLOBAL['db']->query('SELECT * FROM (`' . 
		prop::text($_CONFIG, '.prefix') . self::$table . '`) WHERE ' . self::querytag($tag) .
		($order != null ? ' ORDER BY ' . data::order($order) : '') .
		($limit != null ? ' LIMIT ' . data::limit($limit) : ''));
	while ($row = $_GLOBAL['db']->fetch_array($sql))
		array_push($result, $row);
	return $result;
}

// 获取文章总数
//  获取和某个标签相关的文章总数
public static function tagtotal($tag) {
	global $_GLOBAL, $_CONFIG, $_PARAM;
	$sql = $_GLOBAL['db']->query('SELECT COUNT(*) AS `total` FROM (`' . 
		prop::text($_CONFIG, '.prefix') . self::$table . '`) WHERE ' . self::querytag($tag));
	$row = $_GLOBAL['db']->fetch_array($sql);
	return $row['total'];
}

// 随机获取文章
public static function random($limit) {
	$result = array();
	global $_GLOBAL, $_CONFIG, $_PARAM;
	$sql = $_GLOBAL['db']->query('SELECT * FROM (`' . 
		prop::text($_CONFIG, '.prefix') . self::$table . '`) WHERE `id` > 1500 ORDER BY RAND()' . 
		($limit != null ? ' LIMIT ' . data::limit($limit) : ''));
	while ($row = $_GLOBAL['db']->fetch_array($sql))
		array_push($result, $row);
	return $result;
}

// 获取文章总数
public static function total($condition) {
	$where = data::where($condition);
	global $_GLOBAL, $_CONFIG, $_PARAM;
	$sql = $_GLOBAL['db']->query('SELECT COUNT(`id`) AS `total` ' . 
		'FROM (`' . $_CONFIG['.prefix'] . 'article`) WHERE ' . $where);
	$row = $_GLOBAL['db']->fetch_array($sql);
	return $row['total'];
}

// 获取某用户某分类的特定文章
//  $id => 文章编号列表
public static function gets($id = array()) {
	$result = array(); 
	global $_GLOBAL, $_CONFIG, $_PARAM;
	if (is_array($id) && count($id) > 0) {
		$sql = $_GLOBAL['db']->query('SELECT * FROM (`' . 
			$_CONFIG['.prefix'] . 'article`) WHERE `id` IN (' . 
			implode(',', $id) . ')');
		while ($row = $_GLOBAL['db']->fetch_array($sql))
			array_push($result, $row);
		global $_GLOBAL;
	}
	return $result;
}

// 增加阅读记数
//  $id => 文章编号
//  $wap => 是否为手机阅读
public static function read($id, $wap = false) {
	global $_GLOBAL, $_CONFIG, $_PARAM;
	$_GLOBAL['db']->query('UPDATE `' . $_CONFIG['.prefix'] .
		'article` SET ' . data::update(array('tick:in' => 1, 'mobile:in' => ($wap ? 1 : 0))) . 
		' WHERE ' . data::where(array('id' => abs(intval($id)))));
	return $_GLOBAL['db']->
		affected_rows() > 0;
	global $_GLOBAL;
}

// 获取文章信息
//  $id => 文章编号
public static function get($id, $read=true, $wap=false) {
	global $_GLOBAL, $_CONFIG;
	$read = $read ? self::read($id, $wap) : $read;
	$sql = $_GLOBAL['db']->query('SELECT * FROM (`' . 
		$_CONFIG['.prefix'] . 'article`) WHERE ' . 
		data::where(array('id' => abs(intval($id)))));
	return $_GLOBAL['db']->
		fetch_array($sql);
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
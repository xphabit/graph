<?php
//
// Version 2.0.00 2014-06-24
// Copyright (c) Acnode Corporation. 
// All rights reserved.
//
include_once(realpath('common.php'));
include_once(realpath('lib/lib@data.php'));

class option {

// 投票于某一项
//  $id => 投票项，在数据库中它的父节点为投票编号
public static function vote($id) {
	global $_GLOBAL, $_CONFIG, $_PARAM;
	$_GLOBAL['db']->query('UPDATE `' . $_CONFIG['.prefix'] . 'option`'.
		' SET ' . data::update(array('tick:in' => 1)) . 
		' WHERE ' . data::where(array('id' => abs(intval($id)))));
	return $_GLOBAL['db']->
		affected_rows() > 0;
	global $_GLOBAL;
}

// 读取一条投票的全部信息
//  $id => 投票编号，在数据库中它的父节点为零
public static function item($id) {
	global $_GLOBAL, $_CONFIG, $_PARAM;
	return array('options' => self::options($id),
		'title' => self::title($id));
	global $_GLOBAL;
}

// 读取一条投票的基本信息
//  $id => 投票编号，在数据库中它的父节点为零
public static function title($id) {
	global $_GLOBAL, $_CONFIG, $_PARAM;
	$sql = $_GLOBAL['db']->query('SELECT * FROM `' . 
		$_CONFIG['.prefix'] . 'option` WHERE ' . 
		data::where(array('id' => abs(intval($id)))));
	return $_GLOBAL['db']->
		fetch_array($sql);
	global $_GLOBAL;
}

// 读取一条投票的全部选项
//  $id => 投票编号，在数据库中它的父节点为零
public static function options($id) {
	$result = array();
	global $_GLOBAL, $_CONFIG, $_PARAM;
	$sql = $_GLOBAL['db']->query('SELECT * FROM `' . 
		$_CONFIG['.prefix'] . 'option`' .
		' WHERE ' . data::where(array('pid' => abs(intval($id)))) . 
		' ORDER BY ' . data::order(array('id' => '<<')));
	while ($row = $_GLOBAL['db']->fetch_array($sql))
		array_push($result, $row);
	return $result;
}

}
?>
<?php
//
// Version 2.0.00 2014-06-24
// Copyright (c) Acnode Corporation. 
// All rights reserved.
//
include_once(realpath('lib/lib@prop.php'));

class data {

// 排序字段
//   语法: field => '>>' 降序 field => '<<'
public static function order($order = array()) {
	$result = $comma = '';
	if (is_array($order) && count($order) > 0) {
		foreach ($order as $key => $value) {
			$result .= $comma . '`' . $key . 
				($value == '>>' ? '` DESC' : '` ASC');
			$comma = ' ';
		}
	}
	return $result;
}

// 生成限制语句
//   语法: T[1,10] T[ 1,   10] F[ 1,   A]
public static function limit($limit = null) {
	$value = explode(',', $limit);
	if (is_array($value) && count($value) == 2 &&
		intval($value[0]) >= 0 && intval($value[1]) > 0) {
		return trim($value[0]) . ',' .
			trim($value[1]);
	} else {
		return '0,1';
	}
}

// 生成插入字段
// $data : array('key' => value, ['key' => value])
public static function field($data) {
	$comma = $result = '';
	if (is_array($data) && count($data) > 0) {
		foreach ($data as $key => $value) {
			$result .= $comma . '`' . 
				addslashes($key) . '`';
			$comma = ',';
		}
	}
	return $result;
}

// 生成插入值
// $data : array('key' => value, ['key' => value])
public static function value($data) {
	$comma = $result = '';
	if (is_array($data) && count($data) > 0) {
		foreach ($data as $key => $value) {
			$result .= $comma . '\'' . 
				addslashes($value) . '\'';
			$comma = ',';
		}
	}
	return $result;
}

// 生成修改语句
// $data : array('key[:gt]' => value, ['key[:lt]' => value])
//  :in - key = key + value
//  :de - key = key - value
public static function update($data) {
	if (is_array($data) && count($data) > 0)
		return self::_update($data);
	else
		return '1=1';
}

// 生成修改语句
private static function _update($data) {
	$comma = $result = ''; // 局部变量初始化

	foreach ($data as $key => $value) {
		$op = substr($key, -3);
		$field = substr($key, 0, -3);
		if ($op == ':in' && is_numeric($value)) {
			$result .= $comma . '`' . $field . 
				'`=`' . $field . '`+\'' . addslashes($value) . '\'';
			global $_GLOBAL;
		} else if ($op == ':de' && is_numeric($value)) {
			$result .= $comma . '`' . $field . 
				'`=`' . $field . '`-\'' . addslashes($value) . '\'';
			global $_GLOBAL;
		} else {
			$result .= $comma . '`' . $key . '`=\'' . 
				addslashes($value) . '\'';
			global $_GLOBAL;
		}
		$comma = ',';
	}

	return $result;
}

// 生成查询条件语句
// $condition : array('key[:gt]' => value, ['key[:lt]' => value])
//  :gt - greater (>)
//  :ge - greater and equal (>=)
//  :lt - less (<)
//  :le - less and equal (<=)
//  :ne - not equal (!=)
//  :of - Mysql LOCATION
public static function where($condition = '1') {
	$condition = empty($condition) ? '1' : $condition;
	if (is_array($condition))
		return self::_where($condition);
	else
		return addslashes($condition);
}

// 生成查询条件
private static function _where($condition) {
	$and = $result = ''; // 局部变量初始化

	foreach ($condition as $key => $value) {
		$op = substr($key, -3);
		$field = substr($key, 0, -3);
		if ($op == ':gt') {
			$result .= $and . '`' . $field . 
				'`>\'' . addslashes($value) . '\'';
			global $_GLOBAL;
		} else if ($op == ':ge') {
			$result .= $and . '`' . $field . 
				'`>=\'' . addslashes($value) . '\'';
			global $_GLOBAL;
		} else if ($op == ':lt') {
			$result .= $and . '`' . $field . 
				'`<\'' . addslashes($value) . '\'';
			global $_GLOBAL;
		} else if ($op == ':le') {
			$result .= $and . '`' . $field . 
				'`<=\'' . addslashes($value) . '\'';
			global $_GLOBAL;
		} else if ($op == ':ne') {
			$result .= $and . '`' . $field . 
				'`<>\'' . addslashes($value) . '\'';
			global $_GLOBAL;
		} else if ($op == ':of') {
			$result .= $and . 'LOCATE(\'' . addslashes($value) . 
				'\',`' . $field . '`) > 0';
			global $_GLOBAL;
		} else {
			$result .= $and . '`' . $key . 
				'`=\'' . addslashes($value) . '\'';
			global $_GLOBAL;
		}

		$and = ' AND ';
	}

	return $result;
}

}
?>
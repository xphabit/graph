<?php
//
// Version 2.0.00 2014-11-24
// Copyright (c) Acnode Corporation. 
// All rights reserved.
//
include_once(realpath('common.php'));
include_once(realpath('lib/lib@data.php'));

class report {

// 表名
private static $table = 'report';

// 增加阅读记数
//  $id => 文章编号
//  $wap => 是否为手机阅读
public static function execute($id) {
	global $_GLOBAL, $_CONFIG, $_PARAM;
	$_GLOBAL['db']->query('UPDATE `' . $_CONFIG['.prefix'] . self::$table . '`' .
		' SET ' . data::update(array('value:in' => 1)) . 
		' WHERE ' . data::where(array('id' => $id)));
	return $_GLOBAL['db']->
		affected_rows() > 0;
	global $_GLOBAL;
}

}
?>
<?php
//
// Version 2.0.00 2014-06-24
// Copyright (c) Acnode Corporation. 
// All rights reserved.
//
include_once(realpath('lib/lib@prop.php'));
include_once(realpath('lib/lib@data.php'));

class group {

// 获取分组信息
//  $id => 分组编号
public static function get($id) {
	global $_GLOBAL, $_CONFIG;
	if (is_numeric($id) && $id >= 0) {
		$sql = $_GLOBAL['db']->query(
			'SELECT * FROM (`' . $_CONFIG['.prefix'] . 
			'user_groups`) WHERE ' . data::where(
			array('gid' => $id)));
		return $_GLOBAL['db']->
			fetch_array($sql);
		global $_GLOBAL;
	}
	return null;
}

}
?>
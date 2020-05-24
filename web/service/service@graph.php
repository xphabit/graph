<?php

include_once(realpath('lib/lib@data.php'));

class graph {

// 打开绘图
// $id => 绘图编号，应该是GUID编号
public static function get($id) {
	global $_GLOBAL, $_CONFIG;
	$sql = $_GLOBAL['db']->query('SELECT * FROM (`' . 
		$_CONFIG['.prefix'] . 'graph`) WHERE ' . 
		data::where(array('id' => $id)));
	return $_GLOBAL['db']->
		fetch_array($sql);
	global $_GLOBAL;
}

// 保存新的绘图
// $table => table name
// $data => array(field => value[, field => value])
public static insert($data) {
	return table::insert(
		self::$table, $data);
	global $_GLOBAL;
}

// 数据库表格名称
private static $table = 'graph';

}

?>
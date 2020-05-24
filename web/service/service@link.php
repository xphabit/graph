<?php
include_once(realpath('common.php'));
include_once(realpath('lib/lib@core.php'));
include_once(realpath('lib/lib@data.php'));

class link {

// 加载
//  $condition => array('key[:gt]'=>value, 'key[:lt]=>value')
//  $sort => array(field => '>>[<<]')
//  $limit => '1,10'
public static function load($condition, $order=null, $limit=null) {
	$result = array();
	global $_GLOBAL, $_CONFIG;
	$sql = $_GLOBAL['db']->query('SELECT * FROM (`' . 
		$_CONFIG['.prefix'] . 'links`) WHERE ' . data::where($condition) . 
		($order != null ? ' ORDER BY ' . data::order($order) : '') . 
		($limit != null ? ' LIMIT ' . data::limit($limit) : ''));
	while ($row = $_GLOBAL['db']->fetch_array($sql))
		array_push($result, $row);
	return $result;
}

// 增加一条记录
//  $data => array(field => value[, field => value])
public static function insert($data) {
	global $_GLOBAL, $_CONFIG, $_PARAM;
	$_GLOBAL['db']->query('INSERT INTO `' . 
		$_CONFIG['.prefix'] . 'links` (' .
		data::field($data) . ') VALUES (' . 
		data::value($data) . ')');
	return $_GLOBAL['db']->
		insert_id();
}

}
?>
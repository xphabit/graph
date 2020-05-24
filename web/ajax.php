<?php
//
// Version 1.0.00 2018-12-01
// [2018-12-01] Add function graph_save
//
include_once(realpath('common.php'));
include_once(realpath('lib/lib@html.php'));
include_once(realpath('lib/lib@prop.php'));
include_once(realpath('ajax@graph.php'));

class ajaxXp {

// 控制器处理函数
public static function handler() {
	global $_CONFIG, $_GLOBAL;
	$op = prop::text($_POST, 'ajax');
	// Check login
	if (html::post('ajax')) {
		$data = html::form('data', array('xml'));
		$list = array('test', 'graph_save', 'graph_title');
		if (in_array($op, $list)) {
			call_user_func(
				array('self', $op), $data);
			global $_GLOBAL;
		} else {
			exit('该操作无法执行！');
			global $_GLOBAL;
		}
	}
}

// 测试
private static function test($data) {
	exit(json_encode(array(
		'result' => 1, 'test' => prop::number($data, 'value'))));
}

// 文章标签
private static function graph_save($data) {
	graphAjax::save($data);
}

// 文章标签
private static function graph_title($data) {
	graphAjax::title($data);
}

}

ajaxXp::handler();

echo json_encode(array(
	'result' => 0));
?>
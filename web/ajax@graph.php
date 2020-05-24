<?php

include_once(realpath('lib@core.php'));
include_once(realpath('service/service@table.php'));

class graphAjax {

// 文章标签
public static function save($data) {
	global $_CONFIG, $_GLOBAL;
	$id = core::guid(); // 新建编号，作为扩展：为用户分表
	if (!prop::exist($data, 'id')) {
		table::insert('graph', array('id' => $id,
			'title' => prop::text($data, 'filename'),
			'content' => urldecode(prop::text($data, 'xml'))));
		exit(json_encode(array(
			'result' => 1, 'id' => $id)));
	} else {
		$id = prop::text($data, 'id');
		table::update('graph', array(
			'title' => prop::text($data, 'filename'),
			'content' => urldecode(prop::text($data, 'xml'))),
			array('id' => $id));
		exit(json_encode(array(
			'result' => 1)));
	}
}

// 更新文件标题
public static function title($data) {
	if (prop::exist($data, 'id')) {
		table::update('graph', array('title' => prop::text($data, 'filename')),
			array('id' => prop::text($data, 'id')));
		exit(json_encode(array(
			'result' => 1)));
	}
}

}

?>
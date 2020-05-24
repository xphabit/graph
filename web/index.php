<?php
include_once(realpath('common.php'));
include_once(realpath('lib@core.php'));
include_once(realpath('lib/lib@prop.php'));
include_once(realpath('service/service@table.php'));

class indexXp {

public static function handler() {
	global $_GLOBAL, $_PARAMS;
	$id = prop::text($_PARAMS, 'id');
	$v = prop::has($_PARAMS, 'v');
	if ($id != '' and core::is_guid($id)) {
		$id = prop::text($_PARAMS, 'id');
		$data = table::load('graph', array('id' => $id));
		// echo print_r($data, true);
		if(count($data) > 0)
			$_GLOBAL['#graph'] = $data[0];
		include_once(realpath($v ? 
			'index0.html' : 'index1.html'));
	} else {
		$id = core::guid();
		table::insert('graph', array('id' => $id, 
			'title' => '未命名'));
		header('Location: index.php?id=' . 
			$id);
	}
}

}

indexXp::handler();

?>
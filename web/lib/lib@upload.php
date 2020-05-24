<?php
//
// Version 2.0.00 2014-06-24
// Copyright (c) Acnode Corporation. 
// All rights reserved.
//
include_once(realpath('lib/lib@core.php'));

class upload {

// 保存文件
public static function save($name, $cfg) {
	$result = array();
	foreach($_FILES as $key => $value) {
		$data = explode('@', $key);
		if (is_array($data) && count($data) == 2 && 
			strcmp($data[0], $name) == 0) {
			if (!self::item($value, $cfg))
				$result[$data[1]] = array();
			else
				$result[$data[1]] = $value;
		}
	}
	return $result;
}

// 保存某文件
public static function item(&$item, $config) {
	self::image($item);
	$key = array_keys($config);
	if ($item['error'] > 0) {
		// assert(true);
		return false;
	}

	if (in_array('type', $key) &&
		!in_array($item['type'], $config['type'])) {
		// assert(true);
		return false;
	}

	if (in_array('size', $key) &&
		$item['size'] > $config['size']) {
		// assert(true);
		return false;
	}

	if (in_array('filename', $key)) {
		$config['filename'] = $config['filename'] . 
			self::extension($item['type']);
		// assert(true);
	} else {
		if (in_array('path', $key)) {
			$config['filename'] = 
				$config['path'] . $item['name'];
			// assert(true);
		}
	}

	if (in_array('filename', $key)) {
		if (!copy($item['tmp_name'], $config['filename'])) {
			if (!move_uploaded_file($item['tmp_name'], 
				$config['filename'])) {
				return false;
			}
		}
	}

	$item['filename'] = 
		$config['filename'];
	return true;
}

// 生成文件扩展名
private static function extension($type) {
	if (strcmp($type, 'image/jpeg') == 0) {
		return '.jpg';
	} else if (strcmp($type, 'image/png') == 0) {
		return '.png';
	} else if (strcmp($type, 'image/gif') == 0) {
		return '.gif';
	} else {
		return '.bin';
	}
}

// 是否为图片
public static function image(&$item) {
	$item['image'] = false;
	$pngs = array('image/png', 'image/x-png');
	$jpgs = array('image/jpeg', 'image/jpg', 'image/jpe', 'image/pjpeg');
	if (strcmp($item['type'], 'image/gif') == 0) {
		$item['image'] = true;
	} else if (in_array($item['type'], $pngs)) {
		$item['type'] = $pngs[0];
		$item['image'] = true;
	} else if (in_array($item['type'], $jpgs)) {
		$item['type'] = $jpgs[0];
		$item['image'] = true;
	}
}

}
?>
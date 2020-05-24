<?php
include_once(realpath('lib/lib@upload.php'));
include_once(realpath('lib/lib@image.php'));
include_once(realpath('lib/lib@html.php'));

class avatar {

// 根据用户获取头像
public static function xicon($user, $size = 'small') {
	if (is_array($user)) {
		$uid = prop::number($user, 'uid');
		$avatar = prop::text($user, 'avatar');
		if ($avatar != '' and $uid != '') {
			return avatar::base() . 
				avatar::url($uid, $size);
			global $_GLOBAL;
		}
	}
	return avatar::base() . 
		'avatar_' . $size . '.jpg'; 
	global $_GLOBAL;
}

// 根据编号获取头像
public static function icon($id, $size = 'small') {
	if ($id > 0) {
		$file = self::path() . 
			'/' . self::url($id, $size);
		if (file_exists($file)) {
			return avatar::base() . 
				avatar::url($id, $size);
			global $_GLOBAL;
		}
	}
	return avatar::base() . 
		'avatar_' . $size . '.jpg';
	global $_GLOBAL;
} 

// 获取某用户的头像
//  $id => 用户编号
public static function url($id, $size = 'big') {
	$uid = abs(intval($id));
	$list = array('big', 'middle', 'small');
	$size = !in_array($size, $list) ? $list[0] : $size;
	$url = self::dir($uid) . $uid . 
		'_avatar_' . $size . '.jpg';
	return $url;
}

// 获取技能图片保存路径
public static function skill_path($uid, $number) {
	$path = self::mkdir($uid);
	$path = self::path() . '/' . self::dir($uid);
	$path = $path . $uid . '_skill_' . 
		$number . '.png';
	return $path;
}

// 获取技能图片保存路径
public static function skill_url($uid, $number) {
	$url = self::base() . self::dir($uid);
	$url = $url . $uid . '_skill_' . $number . '.png';
	return $url;
}

// 保存头像，调用上传组件和图像组件
public static function save($id) {
	$result = false;
	$path = self::mkdir($id);
	$temp = self::path() . '/tmp/' . uniqid();
	$result = upload::save('avatar', array(
		'type' => array('image/gif', 'image/png', 'image/jpeg'),
		'filename' => $temp, 'size' => '819200'));
	foreach ($result as $file => $item) {
		if (in_array('image', array_keys($item))) {
			$big = self::path() . 
				'/' . self::url($id, 'big');
			image::resize($item, 
				array('width' => 100, 'height' => 100,
				'file' => $big));
			$middle = self::path() . 
				'/' . self::url($id, 'middle');
			image::resize($item, 
				array('width' => 48, 'height' => 48,
				'file' => $middle));
			$small = self::path() . 
				'/' . self::url($id, 'small');
			image::resize($item, 
				array('width' => 24, 'height' => 24,
				'file' => $small));
			$result = true;
		}
		@unlink($item['filename']);
		global $_GLOBAL;
	}
	return $result;
}

// 创建目录
public static function mkdir($id) {
	if (intval($id) > 0) {
		$path = self::path(). '/tmp';
		if (!file_exists($path))
			mkdir($path, 0777, true);
		$path = self::path() . '/' . self::dir($id);
		if (!file_exists($path))
			mkdir($path, 0777, true);
		return $path;
	}
	return null;
}

// 基本路径
public static function base() {
	return html::base() . '/uploads/avatar/';
}

// 基本路径
public static function path() {
	return realpath('uploads/avatar/');
}

// 获得目录
//  $id => 用户编号
public static function dir($id) {
	$text = sprintf('%02d', $id);
	$path = substr($text, -1, 1) . '/' . 
		substr($text, -2, 2) . '/';
	return $path;
}

}
?>
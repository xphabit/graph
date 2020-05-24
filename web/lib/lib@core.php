<?php
// version 2.0.001
//
class core {

// 加上斜杠符号
public static function slash($text) {
	if (!empty($text))
		return addslashes($text);
	return $text;
}

// 获取页号
public static function page($page) {
	return isset($page) && (int)$page >= 0 ? $page : 0;
}

// 检查辨识的正确性
public static function id($id) {
	return isset($id) && (int)$id > 0;
}

}
?>
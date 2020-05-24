<?php
class prop {

// 检测属性是否存在
public static function has($hashMap, $key) {
	return is_array($hashMap) and count($hashMap) > 0 and
		in_array($key, array_keys($hashMap));
}

// 获取数值属性
public static function number($hashMap, $key) {
	return self::value($hashMap, $key);
}

// 获取数值属性
public static function value($hashMap, $key) {
	if (self::has($hashMap, $key))
		return $hashMap[$key] + 0;
	else
		return 0;
}

// 获取对象属性
public static function instance($hashMap, $key) {
	if (self::has($hashMap, $key))
		return $hashMap[$key];
	else
		return null;
}

// 检测属性是否存在
public static function exist($hashMap, $key) {
	return self::has($hashMap, $key);
}

// 获取文字属性
public static function text($hashMap, $key) {
	if (self::has($hashMap, $key)) 
		return $hashMap[$key];
	else
		return '';
}

}
?>
<?php
//
// Version 2.0.00 2014-06-24
// Copyright (c) Acnode Corporation. 
// All rights reserved.
//
class text {

// Base64-encode
public static function xurl_encode($url) {
	$url = base64_encode($url);
	$url = str_replace('+', '!', $url);
	$url = str_replace('/', '_', $url);
	$url = str_replace('=', '', $url);
	return $url;
}

// Base64-decode
public static function xurl_decode($url) {
	$url = str_replace('!', '+', $url);
	$url = str_replace('_', '/', $url);
	return base64_decode($url);
}

// 取部分文字 
public static function ellipsis($text, $length) {
	$text = self::pure($text);
	if (mb_strlen($text, 'UTF8') > $length)
		return mb_substr($text, 0, $length, 'UTF8') . '...'; 
	else
		return $text;
}

// 获取文字长度
public static function length($text) {
	return mb_strlen(self::pure($text), 'UTF8');
}

// 进行网页编码
public static function encode($text) {
	return htmlspecialchars($text, ENT_QUOTES);
}

// 去除文本中的网页标签
public static function pure($text) {
	return strip_tags($text);
}

}
?>
<?php
//
// Version 2.0.00 2014-06-24
// Copyright (c) Acnode Corporation. 
// All rights reserved.
//
class logger {

// 写日志
public static function write($type, $message) {
	$message = date("M d H:i:s") . 
		self::gettype($type) . $message . "\n";
	if (@file_exists(self::file) && 
		($fp = @fopen(self::file, "a"))) {
		flock($fp, LOCK_EX);
		fputs($fp, $message);
		fclose($fp);
	}
}

// 日志类型
private static function gettype($type) {
	switch ($type) {
	case self::information :
		return "[Information]";
	case self::warning :
		return "[Warning]";
	default :
		return "[Error]";
	}
}

const file = "c:/temp/logger.txt";
const information = 1;
const warning = 2;
const error = 3;

}

?>
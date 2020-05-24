<?php

class clock {

// 保存当前时间
private static $now = null;

// 生成友好时间形式
public static function readable($date) {
	self::$now == null && self::$now = time();
	!is_numeric($date) && $date = strtotime($date);
	$seconds = self::$now - $date;
	$minutes = floor($seconds / 60);
	$hours   = floor($seconds / 3600);
	$day     = round((strtotime(date('Y-m-d', self::$now)) - strtotime(date('Y-m-d', $date))) / 86400);
	if ($seconds == 0) {
		return '刚刚';
	}
	if (($seconds >= 0) && ($seconds <= 60)) {
		return $seconds . '秒前';
	}
	if (($minutes >= 0) && ($minutes <= 60)) {
		return $minutes . '分钟前';
	}
	if (($hours >= 0) && ($hours <= 24)){
		return $hours . '小时前';
	}
	if ((date('Y') - date('Y', $date)) > 0) {
		return date('Y-m-d', $date);
	}

	switch ($day){
	case 0:
		return date('今天H:i', $date);
		break;
	case 1:
		return date('昨天H:i', $date);
		break;
	default:
		//$day += 1;
		return $day . '天前';
		break;
	}
}

}
?>
<?php
include_once(realpath('lib/lib@prop.php'));

class qq {

// 配置信息
private static $appId = '100546213';
private static $appKey = '971be4adeaeab4f82d5233a4f09c0cfb';
private static $appScope = 'get_user_info';

//登陆函数
public static function login($state, $callback){
	$url = 'https://graph.qq.com/oauth2.0/authorize?response_type=code' .
		'&redirect_uri=' . urlencode($callback) . 
		'&client_id=' . self::$appId . 
		'&scope=' . self::$appScope .
		'&state=' . $state;
	header('Location: ' . $url);
}

//登陆返回
public static function callback($code, $callback) {
	$params = array();
	$tokenUrl = 'https://graph.qq.com/oauth2.0/token?grant_type=authorization_code' .
		'&redirect_uri=' . urlencode($callback) .
		'&client_secret=' . self::$appKey . 
		'&client_id=' . self::$appId .
		'&code=' . $code;
	$response = file_get_contents($tokenUrl);
	parse_str($response, $params);
	if (strpos($response, 'callback') !== false) {
		$lpos = strpos($response, '(');
		$rpos = strrpos($response, ')');
		$response = substr($response, $lpos + 1, $rpos - $lpos -1);
		$msg = json_decode($response);
		if (isset($msg->error)) {
			echo '错误@CALLBACk: ' . $msg->error;
			return null;
		}
	} else {
		return prop::text($params, 
			'access_token');
		$params = null;
	}
}

// 开放标识
public static function openid($accessToken) {
	$graphUrl = 'https://graph.qq.com/oauth2.0/me?access_token=' . $accessToken;
	$response = file_get_contents($graphUrl);
	if (strpos($response, 'callback') !== false) {
		$lpos = strpos($response, '(');
		$rpos = strrpos($response, ')');
		$response  = substr($response, $lpos + 1, 
			$rpos - $lpos -1);
	}
	$user = json_decode($response);
	if (isset($user->error)) {
		echo '错误@OPENID: ' . $user->error;
		return null;
	}
	return $user->openid;
}

//获取用户信息
public static function userinfo($accessToken, $openId) {
	$infoUrl = 'https://graph.qq.com/user/get_user_info?' . 
		'access_token=' . $accessToken .
		'&oauth_consumer_key=' . self::$appId .
		'&openid=' . $openId .
		'&format=json';
	$data = file_get_contents($infoUrl);
	$arr = json_decode($data, true);
	return $arr;
}

}
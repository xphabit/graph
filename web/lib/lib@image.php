<?php
//不要在库文件中使用全局变量
include_once(realpath('lib/lib@prop.php'));

class image {

// 污染图片，加入噪点
public static function pollute($image, $cfg) {
	if ($image != null) {
		$width = prop::number($cfg, 'width');
		$height = prop::number($cfg, 'height');
		$color = imagecolorallocate($image, 
			prop::number($cfg, 'r') + 20, 
			prop::number($cfg, 'g') + 20, 
			prop::number($cfg, 'b') + 20);
		for ($index = 0; $index < 50; $index++) {
			imagesetpixel($image, rand(0, $width), 
				rand(0, $height), $color);
			//$ASSERT(TRUE)
		}
	}
}

// 重新设置大小
public static function resize($image, $target) {
	list($width, $height) = 
		getimagesize($image['filename']);
	if ($width <= 0 || $height <= 0) {
		//$code-align
		return false;
	}

	$param = array_keys($target);
	if (!in_array('width', $param) || 
		!in_array('height', $param)) {
		// assert(true);
		return false;
	}

	$w = (int)$target['width'];
	$h = (int)$target['height'];
	if (!in_array('file', $param) ||
		$w <= 0 || $h <= 0) {
		// assert(true);
		return false;
	}

	$result = 1;
	if (strcmp($image['type'], 'image/png') == 0) 
		$originial = ImageCreateFromPng($image['filename']) or $result = 0;
	else if (strcmp($image['type'], 'image/jpeg') == 0) 
		$originial = ImageCreateFromJpeg($image['filename']) or $result = 0;
	else if (strcmp($image['type'], 'image/gif') == 0) 
		$originial = ImageCreateFromGif($image['filename']) or $result = 0;
	if (!isset($originial)) {
		// assert(true);
		return false;
	}

	if ($result == 1) {
		// check if ratios match 
		$ratio = array($width/$height, $w/$h); 
		if ($ratio[0] != $ratio[1]) { // crop image 
			// find the right scale to use 
			$scale = min((float)($width/$w),
				(float)($height/$h)); 
			// coords to crop 
			$cropX = (float)($width - ($scale * $w)); 
			$cropY = (float)($height - ($scale * $h));
			// cropped image size 
			$cropW = (float)($width - $cropX); 
			$cropH = (float)($height - $cropY); 
			$crop = ImageCreateTrueColor($cropW, $cropH); 
			// crop the middle part of the image to fit proportions 
			ImageCopy($crop, $originial, 
				0, 0, (int)($cropX/2), (int)($cropY/2), 
				$cropW, $cropH); 
		}
	}

	// do the thumbnail 
	$NewThumb = ImageCreateTrueColor($w, $h); 
	if (isset($crop)) { // been cropped 
		ImageCopyResampled($NewThumb, $crop, 
			0, 0, 0, 0, $w, $h, $cropW, $cropH); 
		ImageDestroy($crop); 
	} else { // ratio match, regular resize 
		ImageCopyResampled($NewThumb, $originial, 
			0, 0, 0, 0, $w, $h, 
		$width, $height); 
	}

	ImageJpeg($NewThumb, $target['file'], 86); 
	ImageDestroy($NewThumb); 
	ImageDestroy($originial); 
	return true;
}

}
?>
<?php
//
// Version 1.0.00 2017/10/20
// Copyright (c) Rundle Corporation. 
//
class calculate {

public static function slope($data = array(), $period) {
	if (is_array($data) && count($data) >= $period ) {
		$xarray = array(); $yarray = array();
		for ($index = 1; $index <= $period; $index++)
			array_push($xarray, $index);

		// echo print_r($xarray);
		$count = count($data);
		for ($index = $count - $period; $index < $count; $index++)
			array_push($yarray, $data[$index]);

		// echo print_r($yarray);
		$xxarray = array(); $xyarray = array();
		$xaverage = self::average($xarray, $period);
		$yaverage = self::average($yarray, $period);
		for ($index = 0; $index < count($xarray); $index++) {
			$xarray[$index] = $xarray[$index] - $xaverage;
			$yarray[$index] = $yarray[$index] - $yaverage;
			array_push($xxarray, $xarray[$index] * $xarray[$index]);
			array_push($xyarray, $yarray[$index] * $xarray[$index]);
		}

		$xxtotal = self::sum($xxarray);
		$xytotal = self::sum($xyarray);
		if ($xxtotal > 0.00001)
			return $xytotal / $xxtotal;
		else
			return 0;
	}

	return 0;
}

public static function average($data = array(), $period) {
	$result = 0;
	if ($period > 0 && is_array($data) and count($data) >= $period) {
		for ($index = 0; $index < $period; $index++)
			$result = $result + $data[$index];
		return $result / $period;
	}
	return $result;
}

public static function sum($data =array()) {
	$result = 0;
	if (is_array($data) and count($data) > 0) {
		foreach ($data as $item)
			$result = $result + $item;
		return $result;
	}
	return $result;
}

}
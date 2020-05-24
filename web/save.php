<?php

include_once(realpath('common.php'));
include_once(realpath('service@graph.php'));

class saveXp {

public static function handler() {

	
	$myfile = fopen($_POST['filename'], 'w');
	fwrite($myfile, urldecode($_POST['xml']));
	fclose($myfile);
}

}

saveXp::handler();

?>
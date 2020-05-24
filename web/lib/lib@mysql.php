<?phpinclude_once(realpath('lib/lib@except.php'));include_once(realpath('lib/lib@logger.php'));
//// Helper class to access mysql//class mysql {var $link;var $charset;var $querycount = 0;function connect($dbhost, $dbuser, $dbpw, $dbname = '', $pconnect = 0) {	if ($pconnect) {		if (!$this->link = @mysql_pconnect($dbhost, $dbuser, $dbpw)) {			logger::write(logger::error, 				'Can not connect to MySQL server' . $dbname);			return null;		}	} else {		if (!$this->link = @mysql_connect($dbhost, $dbuser, $dbpw, 1)) {			logger::write(logger::error, 				'Can not connect to MySQL server' . $dbname);			return null;		}	}
	if ($this->version() > '4.1') {		if ($this->charset) {			$ci = $this->charset . "_general_ci";			@mysql_query("SET character_set_connection=$this->charset, collation_connection=$ci, collation_database=$ci, collation_server=$ci, character_set_server=$this->charset, character_set_database=$this->charset, character_set_results=$this->charset, character_set_client=$this->charset, autocommit=1", $this->link);		}
		if ($this->version() > '5.0.1') {			@mysql_query("SET sql_mode=''", $this->link);		}	}
	if ($dbname) {		mysql_select_db($dbname, $this->link);	}}
function query($sql, $type = '') {	$func = $type == 'UNBUFFERED' && @function_exists('mysql_unbuffered_query') ? 'mysql_unbuffered_query' : 'mysql_query';	logger::write(logger::information, $sql);	if (!($query = $func($sql, $this->link)) && $type != 'SLIENT') {		// echo "<strong style='color:red'>Error occur, please use logger file to track this issue.</strong><br>";		logger::write(logger::error, "Error[" . 			$this->errno() . "]:" . $this->error());		throw new DbException($this->error());		logger::write(logger::error, $sql);		exit();	}
	$this->querycount++;	return $query;}
function insert_id() {	return ($id = mysql_insert_id($this->link)) >= 0 ? $id : $this->result($this->query("SELECT last_insert_id()"), 0);}
function errno() {	return intval(($this->link) ? mysql_errno($this->link) : mysql_errno());}
function error() {	return (($this->link) ? mysql_error($this->link) : mysql_error());}
function fetch_array($query, $result_type = MYSQL_ASSOC) {	return mysql_fetch_array($query, $result_type);}
function select_db($dbname) {	return mysql_select_db($dbname, $this->link);}
function version() {	return mysql_get_server_info($this->link);}
function affected_rows() {	return mysql_affected_rows($this->link);}
function result($query, $row) {	$query = @mysql_result($query, $row);	return $query;}
function free_result($query) {	return mysql_free_result($query);}
function num_fields($query) {	return mysql_num_fields($query);}
function num_rows($query) {	$query = mysql_num_rows($query);	return $query;}
function fetch_row($query) {	$query = mysql_fetch_row($query);	return $query;}
function fetch_fields($query) {	return mysql_fetch_field($query);}
function close() {	return mysql_close($this->link);}
}?>
<?php

include_once './config.php';

$userName = $_POST['userName'];

$link = mysqli_connect($host, $user, $pwd, $dbname, $port);

$sql = "SELECT * FROM `user` WHERE `name` = '{$userName}' ";

$result = mysqli_query($link, $sql);

$arr = mysqli_fetch_all($result , MYSQLI_ASSOC);

if(count($arr) == 0){
    echo json_encode(['result'=>1,'msg'=>'账号可用']);
}else{
    echo json_encode(['result'=>0,'msg'=>'账号重复']);
}
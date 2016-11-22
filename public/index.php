<?php
include("./includes/overall_header.php");
include("./includes/body.php");
include("./includes/functions.php");

$header = getHeader();
$body = getBody();

// page-information
// do some db and backend magic to get those variables
$current_page = '11'; //index_page
$arr_menu = array(
    array(
        'label'=>'Admin',
        'href'=>'admin.html',
        'submenu' => array(
                        array(
                          'label'=>'admincart',
                          'href'=>'admincart.html'
                        ),
                        array(
                          'label'=>'adminprofile',
                          'href'=>'admincart.html'
                        )
                    )
      )
);
$arr_login = array(
    'username'=>'niki',
    'avatar'=>'./images/nikiavatr.png',
    'profilepage' => "./profile.php?user=12"
);
$arr_component_props = array();
$arr_regex = array(
    'username' => '/^.{4,12}$/g',
    'password' => '/^.{4,12}$/g'
);
$exttra_content = '';
//-end page-information


$body = replace_macros($body, $current_page, $arr_menu, $arr_login, $arr_component_props ,$arr_regex, $exttra_content);
echo $header;
echo $body;
?>

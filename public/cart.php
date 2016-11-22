<?php
include("./includes/overall_header.php");
include("./includes/body.php");
include("./includes/functions.php");

$header = getHeader();
$body = getBody();

// page-information
// do some db and backend magic to get those variables
$current_page = '12';
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
$arr_regex = array(
    'username' => '/^.{4,12}$/g',
    'password' => '/^.{4,12}$/g'
);
$arr_component_props = array();
$exttra_content = '<table width="100%" border="0"> <tr> <td colspan="2" bgcolor="#b5dcb3"> <h1>This is Web Page Main title</h1> </td></tr><tr valign="top"> <td bgcolor="#aaa" width="50"> <b>Main Menu</b><br/> HTML<br/> PHP<br/> PERL... </td><td bgcolor="#eee" width="100" height="200"> Technical and Managerial Tutorials </td></tr><tr> <td colspan="2" bgcolor="#b5dcb3"> <center> Copyright © 2007 Tutorialspoint.com </center> </td></tr></table>';
//-end page-information


$body = replace_macros($body, $current_page, $arr_menu, $arr_login, $arr_component_props ,$arr_regex, $exttra_content);
echo $header;
echo $body;
?>
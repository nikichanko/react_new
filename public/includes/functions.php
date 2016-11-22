<?php
function replace_macros($body, $current_page='', $arr_menu=array(), $arr_login=array(), $arr_compenent_props=array() ,$arr_regex=array(), $exttra_content=''){
  return str_replace(
        array('%CURREN_PAGE%','%EXTRA_MENU%', '%LOGGIN_INFO%', '%COMPONENT_PROPS%' ,'%REGEX%', '%EXTRA_CONTENT%'), 
        array($current_page, json_encode($arr_menu), json_encode($arr_login), json_encode($arr_compenent_props) ,json_encode($arr_regex), str_replace("'","\'",$exttra_content)),
        $body);
}

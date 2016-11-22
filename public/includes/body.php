<?php
function getBody(){
    $body = '
        <body>
            <div id="root"></div>
            <script>
                var current_page = "%CURREN_PAGE%";
                var extra_menu = %EXTRA_MENU%;
                var login_info = %LOGGIN_INFO%;
                var component_props = %COMPONENT_PROPS%;
                var regex = %REGEX%;
                var extra_page_content = \'%EXTRA_CONTENT%\';
            </script>
            <script src="client.min.js"></script>
        </body>
    </html>';
    return $body;
}
const that = {
    regex: {
        username : /^.{4,12}$/g,
        password : /^.{4,12}$/g
    },
    current_page : window.current_page,
    logged : window.login_info,
    extraMenu : window.extra_menu,
    extra_page_content : window.extra_page_content,
    component_props : window.component_props
};

module.exports = that;

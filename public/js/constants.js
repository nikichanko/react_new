import func from "./globalFunctions";
const that = {
    regex: func.extend(window.regex, {}),
    current_page : String(window.current_page),
    logged : window.login_info,
    extraMenu : window.extra_menu,
    extra_page_content : String(window.extra_page_content),
    component_props : window.component_props
};

module.exports = that;

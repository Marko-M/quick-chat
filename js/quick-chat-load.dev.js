// Quick Chat 4.12 - load
var quick_chat = jQuery.extend(quick_chat || {}, {
    script_suffix: (quick_chat.debug_mode == 1) ? '.dev' : '',
    private_current_name: 'quick_chat_private_current_'+quick_chat.user_id,
    get_script: function(url, callback, options) {
        options = jQuery.extend(options || {}, {
            crossDomain: (quick_chat.debug_mode == 1)? true : false,
            dataType: "script",
            cache: true,
            success: callback,
            url: url
        });

        return jQuery.ajax(options);
    },
    load: function(){
        if(jQuery('div.quick-chat-container').length != 0 || (jQuery.cookie(quick_chat.private_current_name) && jQuery.cookie(quick_chat.private_current_name) != '{}'))
            quick_chat.get_script(quick_chat.url+'js/quick-chat-init'+quick_chat.script_suffix+'.js?'+quick_chat.version);
    }
});

if (jQuery.browser.webkit) {
    // Webkit bug workaround: http://code.google.com/p/chromium/issues/detail?id=41726
    jQuery(window).load(quick_chat.load());
}else{
    jQuery(document).ready(quick_chat.load());
}
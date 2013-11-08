/* Quick Chat 4.20
 * http://www.techytalk.info/wordpress/quick-chat/
 */
function quick_chat_clean_private(){
    jQuery.post(quick_chat_admin.ajaxurl, {
        action: 'quick-chat-ajax-clean-private'},
        function(data) {
            alert(quick_chat_admin.i18n.clean_private_done)
        });
}

jQuery(window).load(function(){
    jQuery("a#quick_chat_clean_private").on('click', function(e) {
        e.preventDefault();

        if (confirm(quick_chat_admin.i18n.clean_private_confirm)){
            quick_chat_clean_private();
        }
    });

    jQuery("a.quick_chat_show_hide").on('click', function(e) {
        e.preventDefault();
        if(jQuery(this).text() == quick_chat_admin.i18n.slide_up){
            jQuery(this).text(quick_chat_admin.i18n.slide_down).siblings('textarea').slideDown('slow');
        }else {
            jQuery(this).text(quick_chat_admin.i18n.slide_up).siblings('textarea').slideUp('slow');
        }
    });
});
// Quick Chat 4.13 - admin
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
        if(jQuery(this).text() == 'Show'){
            jQuery(this).text('Hide').siblings('textarea').slideDown('slow');
        }else {
            jQuery(this).text('Show').siblings('textarea').slideUp('slow');
        }
    });
});
// Quick Chat 4.13 - power
var quick_chat = jQuery.extend(quick_chat || {}, {
    toggle: false,
    delete_messages: function(chat_id, to_delete_ids){
        var room_name = quick_chat.data[chat_id]['room_name'];
        jQuery.post(quick_chat.ajaxurl, {
            action: 'quick-chat-ajax-delete',
            to_delete_ids: to_delete_ids,
            to_delete_room_name: room_name},
            function(data) {
                if(data.rows_affected == to_delete_ids.length){
                    for(var current_chat_id in quick_chat.data){
                        if(quick_chat.data[current_chat_id]['room_name'] == room_name){
                            for (var i=0;typeof(to_delete_ids[i]) != 'undefined';i++){
                                jQuery('div[data-quick-chat-id='+current_chat_id+'] input[type=checkbox][value="'+to_delete_ids[i]+'"]').parents('.quick-chat-history-message-alias-container').remove();
                            }
                        }
                    }
                } else{
                    location.reload(true);
                }
            });
    },
    clean_messages: function(chat_id){
        var room_name = quick_chat.data[chat_id]['room_name'];
        var history_container = jQuery('div[data-quick-chat-id='+chat_id+'] div.quick-chat-history-container');
        var total_count = jQuery(history_container).children().size();

        if(total_count > quick_chat.clean_target){
            jQuery.post(quick_chat.ajaxurl, {
                action: 'quick-chat-ajax-clean',
                to_clean_room_name: room_name},
                function(data) {
                    var to_delete_count = total_count-quick_chat.clean_target;
                    if(data.rows_affected == to_delete_count){
                        for(var current_chat_id in quick_chat.data){
                            if(quick_chat.data[current_chat_id]['room_name'] == room_name){
                                var current_to_delete_count = to_delete_count;
                                var current_history_container = jQuery('div[data-quick-chat-id='+current_chat_id+'] div.quick-chat-history-container');
                                for(var i=current_to_delete_count; i>0; i--){
                                    jQuery(current_history_container).children(":first").remove();
                                }
                            }
                        }
                    }else{
                        location.reload(true);
                    }
                });
        }
    },
    ban_users: function(chat_id, to_ban_ips){
        var this_chat = jQuery.find('div[class=quick-chat-container][data-quick-chat-id="'+chat_id+'"]');
        jQuery.post(quick_chat.ajaxurl, {
            action: 'quick-chat-ajax-ban',
            to_ban_ips: to_ban_ips},
            function(data) {;
                jQuery(this_chat).find('.quick-chat-users-container input[type=checkbox]').each(function(){
                    jQuery(this).attr('checked', false);
                });
            });
    },
    transcript: function(chat_id){
        var room_name = quick_chat.data[chat_id]['room_name'];
        jQuery.post(quick_chat.ajaxurl, {
            action: 'quick-chat-ajax-transcript',
            room_name: room_name},
            function(data) {
                window.open(quick_chat.stripslashes(data.transcript_url));
            });
    }
});

jQuery("div.quick-chat-delete-link a").on('click', function(e) {
    e.preventDefault();

    var chat_id = jQuery(this).parents('.quick-chat-container').attr('data-quick-chat-id');
    var this_element = jQuery(this);

    var to_delete_ids = [];
    jQuery(this).parents('.quick-chat-container').find('.quick-chat-history-container input[type=checkbox]:checked').each(function(){
        to_delete_ids.push(jQuery(this).val());
    });

    jQuery(this).fadeTo(100, 0, function() {
        if(to_delete_ids == ""){
            alert(quick_chat.i18n.delete_what_s);
        } else{
            if (confirm(quick_chat.i18n.delete_confirm_s)){
                quick_chat.delete_messages(chat_id, to_delete_ids);
            }
        }
        jQuery(this_element).fadeTo(100, 1);
    });
});

jQuery("div.quick-chat-clean-link a").on('click', function(e) {
    e.preventDefault();

    var chat_id = jQuery(this).parents('.quick-chat-container').attr('data-quick-chat-id');
    var this_element = jQuery(this);

    jQuery(this).fadeTo(100, 0, function() {
        if (confirm(quick_chat.i18n.clean_confirm_s.replace('%s',quick_chat.clean_target))){
            quick_chat.clean_messages(chat_id);
        }
        jQuery(this_element).fadeTo(100, 1);
    });
});

jQuery("div.quick-chat-ban-link a").on('click', function(e) {
    e.preventDefault();

    var chat_id = jQuery(this).parents('.quick-chat-container').attr('data-quick-chat-id');
    var this_element = jQuery(this);

    var to_ban_ips = [];
    jQuery(this).parents('.quick-chat-container').find('.quick-chat-users-container input[type=checkbox]:checked').each(function(){
        to_ban_ips.push(jQuery(this).val());
    });

    jQuery(this).fadeTo(100, 0, function() {
        if(to_ban_ips == ""){
            alert(quick_chat.i18n.ban_who_s);
        } else{
            if (confirm(quick_chat.i18n.ban_confirm_s)){
                quick_chat.ban_users(chat_id, to_ban_ips);
            }
        }
        jQuery(this_element).fadeTo(100, 1);
    });
});

jQuery(document).on('click', "div.quick-chat-transcript-link a", function(e) {
    e.preventDefault();

    var chat_id = jQuery(this).parents('.quick-chat-container').attr('data-quick-chat-id');
    var this_element = jQuery(this);

    jQuery(this).fadeTo(100, 0, function() {
        quick_chat.transcript(chat_id);
        jQuery(this_element).fadeTo(100, 1);
    });
});

jQuery("div.quick-chat-select-all-link a").on('click', function(e){
    e.preventDefault();
    var this_element = jQuery(this);

    jQuery(this).fadeTo(100, 0, function() {
        jQuery(this_element).parents('.quick-chat-container').find('.quick-chat-history-container input[type=checkbox]').prop('checked',!quick_chat.toggle);
        quick_chat.toggle = !quick_chat.toggle;
        jQuery(this_element).fadeTo(100, 1);
    });
});
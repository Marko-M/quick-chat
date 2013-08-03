// Quick Chat 4.13 - init
var quick_chat = jQuery.extend(quick_chat || {}, {
    data: []
});

jQuery.post(
    quick_chat.ajaxurl,
    {action: 'quick-chat-ajax-init'},
    function(data) {
        quick_chat = jQuery.extend(true, quick_chat || {}, data.js_vars);

        jQuery("div.quick-chat-container").each(function(){
            var height = jQuery(this).attr('data-quick-chat-height');
            var userlist = jQuery(this).attr('data-quick-chat-userlist');
            var userlist_position = jQuery(this).attr('data-quick-chat-userlist-position');
            var smilies = jQuery(this).attr('data-quick-chat-smilies');
            var send_button = jQuery(this).attr('data-quick-chat-send-button');
            var loggedin_visible = jQuery(this).attr('data-quick-chat-loggedin-visible');
            var guests_visible = jQuery(this).attr('data-quick-chat-guests-visible');
            var counter = jQuery(this).attr('data-quick-chat-counter');

            var string = '';

            if(
            quick_chat.user_status == 0
            ||
            (quick_chat.user_status < 2 && loggedin_visible == 1)
            ||
            (quick_chat.user_status == 2 && guests_visible == 1)
            ){
                string += '<div class="quick-chat-top">';
                    if(userlist == 1){
                        if(userlist_position == 'right')
                            string += '<div class="quick-chat-users-container quick-chat-users-container-right" style="height:'+height+'px;">';
                        else if (userlist_position == 'top')
                            string += '<div class="quick-chat-users-container quick-chat-users-container-top">';
                        else if (userlist_position == 'left')
                            string += '<div class="quick-chat-users-container quick-chat-users-container-left" style="height:'+height+'px;">';

                        string += '</div>';
                    }

                    string += '<div class="quick-chat-history-container" style="height:'+height+'px;"></div></div>';

                string += '  <div class="quick-chat-links">';
                    if (quick_chat.user_status == 0){
                        string += '<div class="quick-chat-left-link quick-chat-ban-link"><a title="'+quick_chat.i18n.add_blocklist_s+'" href="">'+quick_chat.i18n.ban_s+'</a></div>';
                        string += '<div class="quick-chat-left-link quick-chat-transcript-link"><a title="'+quick_chat.i18n.fetch_transcript_s+'" href="">'+quick_chat.i18n.transcript_s+'</a></div>';
                    }

                    if (quick_chat.user_status == 0)
                        string += '<div class="quick-chat-right-link quick-chat-select-all-link"><a title="'+quick_chat.i18n.all_toggle_s+'" href="">'+quick_chat.i18n.toggle_s+'</a></div><div class="quick-chat-right-link quick-chat-delete-link"><a title="'+quick_chat.i18n.delete_selected_s+'" href="">'+quick_chat.i18n.delete_s+'</a></div><div class="quick-chat-right-link quick-chat-clean-link"><a title="'+quick_chat.i18n.clean_all_except_s.replace('%s', quick_chat.clean_target)+'" href="">'+quick_chat.i18n.clean_s+'</a></div>';

                    string += '<div class="quick-chat-right-link quick-chat-scroll-link"><a style="text-decoration: none;" title="'+quick_chat.i18n.scroll_toggle_s+'" href="">'+quick_chat.i18n.scroll_s+'</a></div><div style="display: none;" class="quick-chat-right-link quick-chat-sound-link"><a title="'+quick_chat.i18n.sound_toggle_s+'" href="">'+quick_chat.i18n.sound_s+'</a></div></div>';

                if(quick_chat.no_participation == 1){
                    if(quick_chat.ip_blocked == 1){
                        string += '<div class="quick-chat-bootom-notice">'+quick_chat.i18n.ip_banned_s+'</div>';
                    } else if(quick_chat.must_login == 1){
                        string += '<div class="quick-chat-bootom-notice">'+quick_chat.i18n.must_login_s+'</div>';
                    }
                }else {
                    string += '<div class="quick-chat-alias-container"><input class="quick-chat-alias" type="text" autocomplete="off" maxlength="20" value="'+quick_chat.user_name+'"';

                        if(quick_chat.user_status != 0 && quick_chat.allow_change_username == 0)
                            string += 'readonly="readonly"';

                        string += '/>';

                        if(quick_chat.user_status != 0 && counter == 1)
                            string += '<span class="quick-chat-counter">'+quick_chat.message_maximum_number_chars+'</span>';
                        string += '<span class="quick-chat-username-status"></span></div>';

                    if(quick_chat.adsense_content != '')
                        string += '<div class="quick-chat-adsense">'+quick_chat.adsense_content+'</div>';

                    string += '<textarea class="quick-chat-message"></textarea>';

                    if(smilies == 1){
                        string += '<div class="quick-chat-smilies-container">';
                        for(var smile in quick_chat['smilies'])
                            string += '<div class="quick-chat-smile-container quick-chat-smile quick-chat-smile-'+quick_chat['smilies'][smile]+'" title="'+smile+'"></div>';
                        string += '</div>';
                    }

                    if(send_button == 1)
                        string += '<input class="quick-chat-send-button" type="button" value="'+quick_chat.i18n.send_s+'">';
                }
            }

            jQuery(this).append(string);

            var loading = jQuery('div.quick-chat-loading');
            if(loading.is(':visible'))
                loading.hide();

            var chat_data = {};
            chat_data['room_name'] = jQuery(this).attr('data-quick-chat-room-name');
            chat_data['userlist_position'] = userlist_position;
            chat_data['avatars'] = jQuery(this).attr('data-quick-chat-avatars');
            chat_data['scroll_enable'] = 1;

            quick_chat.data[jQuery(this).attr('data-quick-chat-id')] = chat_data;
        });

        quick_chat.get_script(quick_chat.url+'js/jquery.json'+quick_chat.script_suffix+'.js?'+quick_chat.version, function(){
            quick_chat.get_script(quick_chat.url+'js/quick-chat-core'+quick_chat.script_suffix+'.js?'+quick_chat.version);
        });

        if(quick_chat.user_status == 0)
            quick_chat.get_script(quick_chat.url+'js/quick-chat-power'+quick_chat.script_suffix+'.js?'+quick_chat.version);
});
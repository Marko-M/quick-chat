// Quick Chat 4.13 - core
jQuery.fn.quick_chat_insert_at_caret = function(myValue) {

    return this.each(function() {

        if (document.selection) {

        this.focus();
        sel = document.selection.createRange();
        sel.text = myValue;
        this.focus();

        } else if (this.selectionStart || this.selectionStart == '0') {
            var startPos = this.selectionStart;
            var endPos = this.selectionEnd;
            var scrollTop = this.scrollTop;
            this.value = this.value.substring(0, startPos)+ myValue+ this.value.substring(endPos,this.value.length);
            this.focus();
            this.selectionStart = startPos + myValue.length;
            this.selectionEnd = startPos + myValue.length;
            this.scrollTop = scrollTop;
        } else {
            this.value += myValue;
            this.focus();
        }
    });
};

var quick_chat = jQuery.extend(quick_chat || {}, {
    last_timestamp:  0,
    rooms : [],
    private_queue: {},
    private_current: {},
    private_count: 0,
    audio_support: 0,
    play_audio: 0,
    audio_element: document.createElement('audio'),
    update_users_limit: Math.floor( quick_chat.inactivity_timeout / quick_chat.timeout_refresh_users),
    update_users_counter: 0,
    private_queue_name: 'quick_chat_private_queue_'+quick_chat.user_id,
    random_string: function(length) {
        var iteration = 0;
        var string = "";
        var randomNumber;

        while(iteration < length){
                randomNumber = (Math.floor((Math.random() * 100)) % 94) + 33;
                if ((randomNumber >=33) && (randomNumber <=47)) continue;
                if ((randomNumber >=58) && (randomNumber <=64)) continue;
                if ((randomNumber >=91) && (randomNumber <=96)) continue;
                if ((randomNumber >=123) && (randomNumber <=126)) continue;
                iteration++;
                string += String.fromCharCode(randomNumber);
        }
        return 'quick_chat_'+string;
    },
    is_user_inactive: function(){
        return (quick_chat.update_users_counter == quick_chat.update_users_limit && quick_chat.user_status != 0)? true: false;
    },
    is_private_eq: function(private1, private2){
        return ((private1['private_from'] == private2['private_from']) && (private1['private_to'] == private2['private_to'])
                ||
                (private1['private_to'] == private2['private_from']) && (private1['private_from'] == private2['private_to']))? true: false;
    },
    spawn_private_chat: function(chat_id, username_him, state){
        var chat_data = {};
        chat_data['room_name'] = chat_id;
        chat_data['userlist_position'] = 'top';
        chat_data['scroll_enable'] = 1;
        chat_data['avatars'] = 1;
        chat_data['him'] = username_him;

        if(state == 'o')
            chat_data['state'] = 'o';
        else
            chat_data['state'] = 'm';

        quick_chat.data[chat_id] = chat_data;

        var string = '<div class="quick-chat-container quick-chat-container-private" data-quick-chat-id="'+chat_id+'"><div class="quick-chat-container-private-titlebar"><div class="quick-chat-container-private-title">'+quick_chat.i18n.private_title_s+'</div><div class="quick-chat-container-private-close"><a href="" title="'+quick_chat.i18n.private_close_s+'">x</a></div><div class="quick-chat-container-private-minimize-restore"><a href="" title="';

        if(state == 'o')
            string += quick_chat.i18n.private_minimize_s;
        else
            string += quick_chat.i18n.private_restore_s;

        string += '">'+((state == 'o')?'-':'o')+'</a></div></div><div class="quick-chat-users-container quick-chat-users-container-top"></div><div class="quick-chat-history-container" style="height: 300px;"></div>';

        if (quick_chat.user_status == 0)
            string += '<div class="quick-chat-links"><div class="quick-chat-left-link quick-chat-transcript-link"><a title="'+quick_chat.i18n.fetch_transcript_s+'" href="">'+quick_chat.i18n.transcript_s+'</a></div></div>';

        string += '<div class="quick-chat-alias-container"><input class="quick-chat-alias" type="text" autocomplete="off" maxlength="20" value="'+quick_chat.user_name+'" readonly="readonly" /></div><textarea class="quick-chat-message"></textarea></div>';

        jQuery('body').append(string);

        var private_chat_element = jQuery('div[data-quick-chat-id="'+chat_id+'"]');

        quick_chat.private_right_position(private_chat_element);

        quick_chat.private_bottom_position(private_chat_element, state);
    },
    private_right_position: function(private_chat_element){
        var right_position = private_chat_element.outerWidth(true) * quick_chat.private_count;
        quick_chat.private_count++;

        private_chat_element.css('right', right_position);
    },
    private_bottom_position: function(private_chat_element, state){
        if(state == 'o'){
            jQuery(private_chat_element).animate({bottom: 0}, 500);
        } else if(state == 'm'){
            jQuery(private_chat_element).animate({bottom: -(jQuery(private_chat_element).outerHeight(true)-jQuery(private_chat_element).find('div.quick-chat-history-container').position().top)}, 500);
        }
    },
    update_private_cookie: function(cookie_name, cookie_value){
        jQuery.cookie(cookie_name, jQuery.toJSON(cookie_value), {path: quick_chat.cookiepath, domain: quick_chat.cookie_domain});
    }
    ,
    preg_quote: function(str){
        var specials = new RegExp("[.*+?|()\\[\\]{}\\\\]", "g");
        return str.replace(specials, "\\$&");
    },
    stripslashes: function(str){
        str = str.replace(/\\'/g,'\'');
        str = str.replace(/\\"/g,'"');
        str = str.replace(/\\\\/g,'\\');
        str = str.replace(/\\0/g,'\0');
        return str;
    },
    flag_html: function(single_user){
        return (single_user.c != null && single_user.m != null)?' <img class="quick-chat-flags" title="'+single_user.m+'" src="'+quick_chat.quick_flag_url+'/'+single_user.c+'.gif" />':'';
    },
    update_rooms: function(){
        quick_chat.rooms = [];
        for(var chat_id in quick_chat.data)
            if(jQuery.inArray(quick_chat.data[chat_id]['room_name'], quick_chat.rooms) == -1)
                quick_chat.rooms.push(quick_chat.data[chat_id]['room_name']);
    },
    update_sound_state: function(){
        if(quick_chat.play_audio == 0)
            jQuery("div.quick-chat-sound-link a").css('text-decoration','line-through');
        else
            jQuery("div.quick-chat-sound-link a").css('text-decoration','none');
    },
    user_status_class: function(user_status){
        var user_status_class = '';

        if(user_status == 0)
            user_status_class = 'quick-chat-admin';
        else if(user_status == 1)
            user_status_class = 'quick-chat-loggedin';
        else if(user_status == 2)
            user_status_class = 'quick-chat-guest';

        return user_status_class;
    },
    is_private_allowed: function(user_status){
        if  (
            user_status == 0
            ||
            (user_status == 1 &&
            quick_chat.loggedin_initiate_private == 1)
            ||
            (user_status == 2 &&
            quick_chat.guests_initiate_private == 1)
            ){
                return true;
        }else{
            return false;
        }
    },
    single_message_html: function(single_message, avatars, sys_mes){
        if(sys_mes == false){
            var alias = quick_chat.stripslashes(single_message.alias);
            var status_class = quick_chat.user_status_class(single_message.status);
        }else if(sys_mes == true){
            alias = quick_chat.i18n.notice_s;
            status_class = 'quick-chat-notice';
        }

        var message_with_smile = quick_chat.stripslashes(single_message.message);
        for (var smile in quick_chat['smilies']){
            var replace = '<div class="quick-chat-smile quick-chat-smile-'+quick_chat['smilies'][smile]+'" title="'+smile+'"></div>';
            message_with_smile = message_with_smile.replace(new RegExp(quick_chat.preg_quote(smile), 'g'), replace);
        }
        var string = '<div class="quick-chat-history-message-alias-container '+status_class+'"><div class="quick-chat-history-header">';

        if(avatars == 1 && single_message.avatar != false)
            string += quick_chat.stripslashes(single_message.avatar);

        string += '<div class="quick-chat-history-alias">';

        if(alias == quick_chat.user_name || sys_mes == true  || quick_chat.no_participation == 1)
            string += alias;
        else
            string += '<a href="" title="'+quick_chat.i18n.reply_to_s.replace('%s', alias)+'">'+alias+'</a>';

        string += '</div>';

        string += '<div class="quick-chat-history-timestring">'+single_message.timestring+'</div></div><div class="quick-chat-history-message">'+message_with_smile+'</div>';

        if(quick_chat.user_status == 0)
            string += '<div class="quick-chat-history-links">';

        if(quick_chat.user_status == 0 && sys_mes == false)
            string += '<input class="quick-chat-to-delete-boxes" type="checkbox" name="quick-chat-to-delete[]" value="'+single_message.id+'" />';

        if(quick_chat.user_status == 0)
            string += '</div>';

        string += '</div>';
        return string;
    },
    check_username: function(chat_id, username_check, username_status_element){

        if (typeof(quick_chat.data[chat_id]['username_timeout']) != 'undefined')
            clearTimeout(quick_chat.data[chat_id]['username_timeout']);

        quick_chat.data[chat_id]['username_timeout'] = setTimeout(function(){
            jQuery.ajax({
                type: 'POST',
                url: quick_chat.ajaxurl,
                data: {action: 'quick-chat-ajax-username-check', username_check: username_check},
                cache: false,
                dataType: 'json',

                success: function(data){
                    if(quick_chat.no_participation == 0 && data.no_participation == 1)
                        location.reload(true);

                    jQuery(username_status_element).html('');
                    if(data.username_invalid == 1) {
                        jQuery(username_status_element).addClass('quick-chat-error');
                        jQuery(username_status_element).html(quick_chat.i18n.username_invalid_s);
                    }else if(data.username_bad_words == 1){
                        jQuery(username_status_element).addClass('quick-chat-error');
                        jQuery(username_status_element).html(quick_chat.i18n.username_bad_words_s);
                    }else if(data.username_exists == 1){
                        jQuery(username_status_element).addClass('quick-chat-error');
                        jQuery(username_status_element).html(quick_chat.i18n.username_exists_s);
                    } else if(data.username_blocked == 1){
                        jQuery(username_status_element).addClass('quick-chat-error');
                        jQuery(username_status_element).html(quick_chat.i18n.username_blocked_s);
                    }else if(data.username_exists == 0 || data.username_blocked == 0 || data.username_invalid == 0){
                        jQuery(username_status_element).html('');
                        quick_chat.user_name = data.username;
                        jQuery('input.quick-chat-alias').val(data.username);
                    }
                },
                beforeSend: function(){
                    jQuery(username_status_element).html('');
                    jQuery(username_status_element).removeClass('quick-chat-error');
                    jQuery(username_status_element).html(quick_chat.i18n.username_check_wait_s);
                }
            });
            delete quick_chat.data[chat_id]['username_timeout'];
        }, 1500);
    },
    update_messages: function(){
        jQuery.post(quick_chat.ajaxurl, {
                action: 'quick-chat-ajax-update-messages',
                last_timestamp: quick_chat.last_timestamp,
                rooms: quick_chat.rooms
            },
            function(data){
                if((quick_chat.no_participation == 0 && data.no_participation == 1)
                    ||
                    (quick_chat.no_participation == 1 && data.no_participation == 0))
                    location.reload(true);

                if(data.success == 1){
                    var updates = data.messages;
                    jQuery('div.quick-chat-container').each(function(){
                        var already_notified = 0;
                        var chat_id = jQuery(this).attr('data-quick-chat-id');
                        var room_name = quick_chat.data[chat_id]['room_name'];
                        var avatars = quick_chat.data[chat_id]['avatars'];
                        var scroll_enable = quick_chat.data[chat_id]['scroll_enable'];
                        var history_container = jQuery(this).find('.quick-chat-history-container');
                        var state = quick_chat.data[chat_id]['state'];

                        for(var i=0;typeof(updates[i])!='undefined';i++){
                            if(room_name == updates[i].room){
                                if(updates[i].alias != 'quick_chat'){
                                    if( already_notified == 0
                                        &&
                                        quick_chat.play_audio == 1
                                        &&
                                        quick_chat.user_name != quick_chat.stripslashes(updates[i].alias)
                                        &&
                                        quick_chat.last_timestamp != 0) {
                                        quick_chat.audio_element.play();
                                        already_notified = 1;
                                    }

                                    if( quick_chat.last_timestamp != 0
                                        &&
                                        typeof(state) != 'undefined'
                                        && state == 'm'){
                                        jQuery(this).find('div.quick-chat-container-private-minimize-restore a').click();
                                    }

                                    jQuery(history_container).append(quick_chat.single_message_html(updates[i], avatars, false));
                                } else if(quick_chat.last_timestamp != 0){
                                    var sys_mes = jQuery.parseJSON(quick_chat.stripslashes(updates[i].message));
                                    for (var mes_room_name in sys_mes){
                                        if(sys_mes[mes_room_name]['private_to'] == quick_chat.user_name && sys_mes[mes_room_name]['type'] == 'INV'){ // Receiver
                                            if(quick_chat.is_private_allowed(updates[i].status)){
                                                quick_chat.private_queue[mes_room_name] = sys_mes[mes_room_name];
                                                quick_chat.update_private_cookie(quick_chat.private_queue_name, quick_chat.private_queue);

                                                var invitation_received = jQuery.extend(true, {}, updates[i]);
                                                invitation_received.message = quick_chat.i18n.invitation_received_s.replace('%s', sys_mes[mes_room_name]['private_from']);

                                                jQuery(history_container).append(quick_chat.single_message_html(invitation_received, 0, true));
                                            }
                                        } else if(sys_mes[mes_room_name]['private_from'] == quick_chat.user_name){ // Sender
                                            var private_queue_found = false;
                                            for (var pq_room_name in quick_chat.private_queue){
                                                if(quick_chat.is_private_eq(quick_chat.private_queue[pq_room_name], sys_mes[mes_room_name])){
                                                    quick_chat.spawn_private_chat(pq_room_name, sys_mes[mes_room_name]['private_to'], 'o');
                                                    quick_chat.update_rooms();

                                                    delete quick_chat.private_queue[pq_room_name];
                                                    quick_chat.update_private_cookie(quick_chat.private_queue_name, quick_chat.private_queue);

                                                    quick_chat.private_current[pq_room_name] = quick_chat.data[pq_room_name];
                                                    quick_chat.update_private_cookie(quick_chat.private_current_name, quick_chat.private_current);
                                                    private_queue_found = true;
                                                }
                                            }

                                            if(private_queue_found == false){
                                                if(quick_chat.is_private_allowed(updates[i].status)){
                                                    quick_chat.spawn_private_chat(mes_room_name, sys_mes[mes_room_name]['private_to'], 'o');
                                                    quick_chat.update_rooms();

                                                    quick_chat.private_current[mes_room_name] = quick_chat.data[mes_room_name];
                                                    quick_chat.update_private_cookie(quick_chat.private_current_name, quick_chat.private_current);

                                                    var invitation_sent = jQuery.extend(true, {}, updates[i]);
                                                    invitation_sent.message = quick_chat.i18n.invitation_sent_s.replace('%s', sys_mes[mes_room_name]['private_to']);

                                                    jQuery(history_container).append(quick_chat.single_message_html(invitation_sent, 0, true));
                                                }else{
                                                    alert(quick_chat.i18n.not_allowed_to_initiate_s);
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }

                        if(scroll_enable == 1)
                            jQuery(history_container).animate({scrollTop: jQuery(history_container)[0].scrollHeight}, 500);
                    });

                    quick_chat.last_timestamp = updates[updates.length-1].unix_timestamp;
                }

                if(!quick_chat.is_user_inactive())
                    quick_chat.update_messages();
            },
            'json'
        );
    },
    update_users: function(){
        quick_chat.update_users_counter++;
        if(quick_chat.is_user_inactive()){
            clearInterval(quick_chat.users_interval);
            jQuery('div.quick-chat-container').html('<div style="quick-chat-bootom-notice">'+quick_chat.i18n.dropped_inactivity_s+'</div>');
        }else{
            jQuery.post(quick_chat.ajaxurl, {
                    action: 'quick-chat-ajax-update-users',
                    rooms: quick_chat.rooms},
                    function(data){
                        if((quick_chat.no_participation == 0 && data.no_participation == 1)
                        ||
                        (quick_chat.no_participation == 1 && data.no_participation == 0))
                            location.reload(true);

                        if(typeof(quick_chat.users_interval) == 'undefined'){
                            quick_chat.users_interval = setInterval(function(){
                                quick_chat.update_users();
                            }, quick_chat.timeout_refresh_users * 1000);
                        }

                        var users = data.users;
                        jQuery("div.quick-chat-container").each(function(){
                            var chat_id = jQuery(this).attr('data-quick-chat-id');
                            var userlist_position = quick_chat.data[chat_id]['userlist_position'];
                            var room_name = quick_chat.data[chat_id]['room_name'];
                            var string = '';

                            for(var i=0;typeof(users[i])!='undefined';i++){
                                if(room_name == users[i].room){
                                    if(quick_chat.user_status == 0){
                                        var checked_ids = [];
                                        jQuery(this).find('.quick-chat-users-container input[type=checkbox]:checked').each(function(){
                                            checked_ids.push(jQuery(this).attr('data-user-id'));
                                        });
                                    }
                                    var alias = quick_chat.stripslashes(users[i].alias);

                                    string += '<div class="quick-chat-single-user '+quick_chat.user_status_class(users[i].status)+'">';

                                    if(alias == quick_chat.user_name || quick_chat.no_participation == 1)
                                        string += alias;
                                    else{
                                        if(quick_chat.user_status == 0)
                                            string += '<input class="quick-chat-to-ban-boxes" type="checkbox" name="quick-chat-to-ban[]" value="'+users[i].ip+'" data-user-id="'+users[i].id+'"'+((jQuery.inArray(users[i].id, checked_ids) == 0) ? ' checked="checked"':'')+'/>';

                                        string += '<a href="" title="'+quick_chat.i18n.private_with_s.replace('%s',alias)+'">'+alias+'</a>';
                                    }

                                    string += quick_chat.flag_html(users[i]);

                                    string += '</div>';

                                    if(userlist_position == 'top')
                                        string += ', ';
                                }
                            }
                            jQuery(this).find('.quick-chat-users-container').html((userlist_position == 'top') ? string.substring(0, string.length-2): string);
                        });
                    },
                    'json'
                );
        }
    },
    new_message: function(chat_id, message_text, sys_mes){
        var room_name = quick_chat.data[chat_id]['room_name'];
        quick_chat.update_users_counter = 0;

        jQuery.post(
            quick_chat.ajaxurl,{
                action: 'quick-chat-ajax-new-message',
                sys_mes: sys_mes,
                message: message_text,
                room: room_name
            },
            function(data) {
                if(quick_chat.no_participation == 0 && data.no_participation == 1)
                    location.reload(true);
            });
    }
});

if(quick_chat.audio_element.canPlayType){
    if(quick_chat.audio_element.canPlayType('audio/ogg; codecs="vorbis"')) {
        quick_chat.audio_element.setAttribute('src', quick_chat.url+'/sounds/message-sound.ogg');
        quick_chat.audio_element.setAttribute('preload', 'auto');
        quick_chat.audio_support = 1;
    } else if(quick_chat.audio_element.canPlayType('audio/mpeg;')){
        quick_chat.audio_element.setAttribute('src', quick_chat.url+'sounds/message-sound.mp3');
        quick_chat.audio_element.setAttribute('preload', 'auto');
        quick_chat.audio_support = 1;
    } else if(quick_chat.audio_element.canPlayType('audio/wav; codecs="1"')){
        quick_chat.audio_element.setAttribute('src', quick_chat.url+'sounds/message-sound.wav');
        quick_chat.audio_element.setAttribute('preload', 'auto');
        quick_chat.audio_support = 1;
    }
}

if(quick_chat.audio_support == 1){
    if(jQuery.cookie('quick_chat_sound_state'))
        quick_chat.play_audio = jQuery.cookie('quick_chat_sound_state');
    else
        quick_chat.play_audio = quick_chat.audio_enable;
}

if(quick_chat.no_participation == 0){
    if(jQuery.cookie(quick_chat.private_queue_name) != null)
        quick_chat.private_queue = jQuery.parseJSON(jQuery.cookie(quick_chat.private_queue_name));

    if(jQuery.cookie(quick_chat.private_current_name) != null)
        quick_chat.private_current = jQuery.parseJSON(jQuery.cookie(quick_chat.private_current_name));

    for (var quick_chat_pc_room_name in quick_chat.private_current)
        quick_chat.spawn_private_chat(quick_chat_pc_room_name, quick_chat.private_current[quick_chat_pc_room_name]['him'], quick_chat.private_current[quick_chat_pc_room_name]['state']);
}

quick_chat.update_rooms();

if(quick_chat.audio_support){
    jQuery("div.quick-chat-sound-link").css('display','block');
    quick_chat.update_sound_state();
}

quick_chat.update_users();

jQuery(document).on('keypress', "textarea.quick-chat-message", function(e) {
    code = e.keyCode ? e.keyCode : e.which;
    if(code.toString() == 13) {
        e.preventDefault();

        var message_text = jQuery.trim(jQuery(this).val());
        if(message_text != ''){
            var chat_id = jQuery(this).parents('.quick-chat-container').attr('data-quick-chat-id');
            jQuery(this).val('');
            quick_chat.new_message(chat_id, message_text, false);
        }
    }
});

jQuery("input.quick-chat-send-button").on('click', function(e) {
    e.preventDefault();

    var textarea = jQuery(this).siblings('textarea.quick-chat-message');
    var message_text = jQuery.trim(jQuery(textarea).val());
    if(message_text != ''){
        var chat_id = jQuery(this).parents('.quick-chat-container').attr('data-quick-chat-id');
        jQuery(textarea).val('');
        quick_chat.new_message(chat_id, message_text, false);
    }
    jQuery(this).prev().focus();
});

jQuery("div.quick-chat-smile").on('click', function() {
    var input_textarea = jQuery(this).parents('.quick-chat-container').find('.quick-chat-message');
    var this_element = jQuery(this);

    jQuery(this).fadeTo(100, 0, function() {
        jQuery(input_textarea).quick_chat_insert_at_caret(jQuery(this_element).attr('title')).trigger('change');
        jQuery(this_element).fadeTo(100, 1);
    });
});

jQuery(document).on('click', "div.quick-chat-history-alias a", function(e) {
    e.preventDefault();
    var input_textarea = jQuery(this).parents('.quick-chat-container').find('.quick-chat-message');
    var this_element = jQuery(this);

    jQuery(this).fadeTo(100, 0, function() {
        jQuery(input_textarea).quick_chat_insert_at_caret('@'+jQuery(this_element).text()+': ');
        jQuery(this_element).fadeTo(100, 1);
    });
});

jQuery(document).on('click', "div.quick-chat-single-user a", function(e) {
    e.preventDefault();

    var chat_id = jQuery(this).parents('.quick-chat-container').attr('data-quick-chat-id');
    var this_element = jQuery(this);

    jQuery(this).fadeTo(100, 0, function() {
        var mes_room_name = quick_chat.random_string(12);
        var sys_mes = jQuery.parseJSON('{"'+mes_room_name+'":{"private_from":"'+quick_chat.user_name+'","private_to":"'+jQuery(this_element).text()+'"}}');
        var sys_mes_type = 'INV';
        var question = quick_chat.i18n.private_invite_confirm_s.replace('%s',jQuery(this_element).text());

        for (var pq_room_name in quick_chat.private_queue){
            if(quick_chat.is_private_eq(quick_chat.private_queue[pq_room_name], sys_mes[mes_room_name]))
                sys_mes_type = 'ACK';

            question = quick_chat.i18n.private_accept_confirm_s.replace('%s',jQuery(this_element).text());
            break;
        }

        if (confirm(question)){
            sys_mes[mes_room_name]['type'] = sys_mes_type;
            quick_chat.new_message(chat_id, jQuery.toJSON(sys_mes), true);
        }
        jQuery(this_element).fadeTo(100, 1);
    });
});

jQuery(document).on('click', "div.quick-chat-container-private-close a", function(e) {
    e.preventDefault();
    var this_element = jQuery(this);
    var chat_id = jQuery(this).parents('.quick-chat-container').attr('data-quick-chat-id');

    jQuery(this).fadeTo(100, 0, function() {
        delete quick_chat.data[chat_id];

        delete quick_chat.private_current[chat_id];
        quick_chat.update_private_cookie(quick_chat.private_current_name, quick_chat.private_current);
        quick_chat.private_count--;

        quick_chat.update_rooms();
        jQuery(this).parents('.quick-chat-container').remove();
        jQuery(this_element).fadeTo(100, 1);
    });
});

jQuery(document).on('click', "div.quick-chat-container-private-minimize-restore a", function(e) {
    e.preventDefault();
    var chat_id = jQuery(this).parents('.quick-chat-container').attr('data-quick-chat-id');
    var private_chat_element = jQuery(this).parents('.quick-chat-container');
    var state = quick_chat.data[chat_id]['state'];
    var this_element = jQuery(this);

    jQuery(this).fadeTo(100, 0, function() {
        if(state == 'o'){
            jQuery(this_element).attr('title',quick_chat.private_restore);
            quick_chat.data[chat_id]['state'] = 'm';
            quick_chat.private_current[chat_id]['state'] = 'm';
            quick_chat.update_private_cookie(quick_chat.private_current_name, quick_chat.private_current);
            jQuery(this_element).text('o');

            quick_chat.private_bottom_position(private_chat_element, 'm');
        } else if(state == 'm'){
            jQuery(this_element).attr('title',quick_chat.private_minimize);
            quick_chat.data[chat_id]['state'] = 'o';
            quick_chat.private_current[chat_id]['state'] = 'o';
            quick_chat.update_private_cookie(quick_chat.private_current_name, quick_chat.private_current);
            jQuery(this_element).text('-');

            quick_chat.private_bottom_position(private_chat_element, 'o');
        }
        jQuery(this_element).fadeTo(100, 1);
    });
});

jQuery("div.quick-chat-sound-link a").on('click', function(e) {
    e.preventDefault();
    var this_element = jQuery(this);

    jQuery(this).fadeTo(100, 0, function() {
        if(quick_chat.play_audio == 1)
            quick_chat.play_audio = 0;
            else
            quick_chat.play_audio = 1;

        jQuery.cookie('quick_chat_sound_state', quick_chat.play_audio, {path: quick_chat.cookiepath, domain: quick_chat.cookie_domain});

        quick_chat.update_sound_state();

        jQuery(this_element).fadeTo(100, 1);
    });
});

jQuery("div.quick-chat-scroll-link a").on('click', function(e) {
    e.preventDefault();

    var chat_id = jQuery(this).parents('.quick-chat-container').attr('data-quick-chat-id');
    var scroll_enable = quick_chat.data[chat_id]['scroll_enable'];
    var this_element = jQuery(this);

    jQuery(this).fadeTo(100, 0, function() {
        if(scroll_enable == 0){
            quick_chat.data[chat_id]['scroll_enable'] = 1;
            jQuery(this_element).css('text-decoration','none');
        } else{
            quick_chat.data[chat_id]['scroll_enable'] = 0;
            jQuery(this_element).css('text-decoration','line-through');
        }
        jQuery(this_element).fadeTo(100, 1);
    });
});

if(quick_chat.user_status == 0 || quick_chat.allow_change_username == 1){
    jQuery("input.quick-chat-alias").on('keyup change', function(){
        var username_check = jQuery.trim(jQuery(this).val());
        if(username_check != ''){
            var chat_id = jQuery(this).parents('.quick-chat-container').attr('data-quick-chat-id');
            var username_status_element = jQuery(this).parents('.quick-chat-container').find('span.quick-chat-username-status');

            quick_chat.check_username(chat_id, username_check, username_status_element);
        }
    });
}

if(quick_chat.user_status != 0){
    jQuery('textarea.quick-chat-message').on('keyup change input paste', function() {
        var counter = jQuery(this).parents('.quick-chat-container').attr('data-quick-chat-counter');
        if(counter == 1){
            var counter_element = jQuery(this).parents('.quick-chat-container').find('span.quick-chat-counter');
            var count = jQuery(this).val().length;
            var available = quick_chat.message_maximum_number_chars - count;
            if(available <= 25 && available >= 0)
                jQuery(counter_element).addClass('quick-chat-warning');
            else
                jQuery(counter_element).removeClass('quick-chat-warning');

            if(available < 0)
                jQuery(counter_element).addClass('quick-chat-exceeded');
            else
                jQuery(counter_element).removeClass('quick-chat-exceeded');

            jQuery(counter_element).html(available);
        }
    });
}

quick_chat.update_messages();
/* Quick Chat 4.20
 * http://www.techytalk.info/wordpress/quick-chat/
 */
function quick_chat_clean_private(){jQuery.post(quick_chat_admin.ajaxurl,{action:"quick-chat-ajax-clean-private"},function(a){alert(quick_chat_admin.i18n.clean_private_done)})}
jQuery(window).load(function(){jQuery("a#quick_chat_clean_private").on("click",function(a){a.preventDefault();confirm(quick_chat_admin.i18n.clean_private_confirm)&&quick_chat_clean_private()});jQuery("a.quick_chat_show_hide").on("click",function(a){a.preventDefault();jQuery(this).text()==quick_chat_admin.i18n.slide_up?jQuery(this).text(quick_chat_admin.i18n.slide_down).siblings("textarea").slideDown("slow"):jQuery(this).text(quick_chat_admin.i18n.slide_up).siblings("textarea").slideUp("slow")})});
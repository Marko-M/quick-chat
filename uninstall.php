<?php
if (!defined( 'WP_UNINSTALL_PLUGIN' )){
    exit;
}
global $wpdb;
$quick_chat_messages_table_name = $wpdb->prefix . 'quick_chat_messages';
$quick_chat_users_table_name = $wpdb->prefix . 'quick_chat_users';

if(get_option('quick_chat_options')) delete_option('quick_chat_options');
if(get_option('quick_chat_db_version')) delete_option('quick_chat_db_version');
if(get_option('widget_quick-chat-widget')) delete_option('widget_quick-chat-widget');
$query = $wpdb->query('DROP TABLE IF EXISTS '.$quick_chat_messages_table_name.';');
$query = $wpdb->query('DROP TABLE IF EXISTS '.$quick_chat_users_table_name.';');
?>

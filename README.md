# Quick Chat #
**Contributors:** Marko-M
  
**Donate link:** https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=CZQW2VZNHMGGN
  
**Tags:** chat, ajax chat, simple chat, live chat
  
**Requires at least:** 3.3
  
**Tested up to:** 3.6
  
**License:** GPL2
  
**Stable tag:** trunk
  

Self hosted WordPress chat plugin supporting private chat, chat rooms, avatars, user list, words filtering, smilies, caching plugins and more.

## Description ##
WordPress chat plugin supporting private chat, chat rooms, avatars, user list, words filtering, smilies, caching plugins and more. Quick Chat is self hosted chat solution. This means that your chat messages are stored inside your local WordPress database and are totally under your control. Because of that there are no limits or monthly fees for number of chat users or messages, these are limited only by your web server capabilities.

<strong>Before you install Quick Chat please check is you web server sufficiently capable to support number of users you expect visiting your chat at the same time.</strong>

<h4>Quick Chat feature highlights</h4>

***   **New in v4.10**:** Implement automatic private messages and chat rooms daily cleanup using WordPress cron API
  
*   Add PHP caching WordPress plugins like WP Super Cache or W3 Total Cache compatibility (See FAQ for more)
*   Add feature to configure which WordPress user role has Quick Chat moderator capability
*   Avoid losing CSS customizations after Quick Chat update (See FAQ for more)
*   Supports [Quick Flag](http://www.techytalk.info/wordpress-plugins/quick-flag/) WordPress plugin to display country flag icons next to chat nicknames
*   You can set timeout for disabling updates to inactive user
*   Translating Quick Chat into your language is simple using Quick Chat [online translation interface](http://www.techytalk.info/glotpress/projects/quick-chat)
*   Supports multiple private 1 on 1 chat sessions
*   Can filter bad words from your chat rooms
*   Admin users can easily download chat room transcripts
*   Besides gravatar.com avatars, local avatar plugins are also supported
*   Includes admin dashboard widget to chat with other admin users from your site backend
*   Has message input box character counter to limit message size
*   Allows admin users to instantly ban chat participant IP from chat
*   Has chat participants list for both sidebar and embedded chat
*   Site registered users can have their chat nicknames reserved
*   Site admins can reserve additional list of chat nicknames
*   Supports incoming messages sound notification for modern browsers
*   Supports unlimited number of separate chat rooms
*   User interface is translation friendly (translation template, Croatian, Italian, Czech, Romanian, Spanish, Dutch, Chinese, Russian, Brazilian Portuguese, Danish, German, Slovenian, Ukrainian, Estonian, French, Finnish and Welsh (some partial) translation files provided)
*   Integrates with WordPress user accounts to use login name as chat nickname
*   Comes with quality set of emoticons to spice up your chat experience
*   Saves your website bandwidth by sending AJAX requests only when there are new messages

<h4>My other WordPress plugins</h4>

*   Voting polls plugin [Quick Poll](http://www.techytalk.info/wordpress-plugins/quick-poll/)
*   Who is online plugin [Quick Count](http://www.techytalk.info/wordpress-plugins/quick-count/)
*   Geolocation plugin [Quick Flag](http://www.techytalk.info/wordpress-plugins/quick-flag/)
*   Browser capabilities plugin [Quick Browscap](http://www.techytalk.info/wordpress-plugins/quick-browscap/)

For more information and Quick Chat demo please visit [Quick Chat demo](http://www.techytalk.info/wordpress-plugins/quick-chat/) page at [TechyTalk.info](http://www.techytalk.info/).

## Upgrade Notice ##
### 4.00 ###
If you are upgrading from 2.xx or 3.xx release to 4.00, upgrade your Quick Chat version as usual. For upgrading from 1.xx release to 4.00 please take a look at upgrade notice for version 2.00.

### 3.00 ###
If you are using PHP to embed Quick Chat to your WordPress template keep in mind that Quick Chat 3.00 has changed PHP function name and parameters. Please consult FAQ for new function name and parameters list. Note that because of added support for local avatar plugins existing messages will not have their authors avatar. Messages posted after successful upgrade will have correct author avatar.

### 2.00 ###
Quick Chat 2.xx has new features like list of online users that couldn't be successfully implemented on top of Quick Chat 1.xx. Because of that it isn't possible to preserve old messages and settings when upgrading Quick Chat 1.xx to Quick Chat 2.xx. If you need your old messages you should backup your data from "wp_quick_chat" table inside your WordPress database using Phpmyadmin before upgrading to Quick Chat 2.xx.

## Installation ##
Quick Chat can be installed using integrated WordPress plugin installer or manually.

### Integrated WordPress plugin installer method ###

1.  Go to Plugins > Add New.
1.  Under Search, type in ’Quick Chat’.
1.  Click Install Now to install the WordPress Plugin.
1.  A popup window will ask you to confirm your wish to install the Plugin.
1.  If this is the first time you've installed a WordPress Plugin, enter the FTP login credential information. If you've installed a Plugin before, it will still have the login information.
1.  Click Proceed to continue with the installation. The resulting installation screen will list the installation as successful or note any problems during the install.
1.  If successful, click Activate Plugin to activate it, or Return to Plugin Installer for further actions.
1.  Have fun showing people new chat on your web site/blog.

### Manual method ###

1.  Upload ’quick-chat’ folder from quick-chat.zip file downloaded from [Quick Chat WordPress plugin directory page](http://wordpress.org/extend/plugins/quick-chat/) to the ’/wp-content/plugins/’ directory.
1.  Activate ’Quick Chat’ plugin through the ’Plugins’ menu in WordPress.
1.  Add Quick Chat widget through ’Appearance’ -> ’Widgets’ and/or add [quick-chat] shortcode inside the post or page where you want Quick Chat to appear. Also you can control chat room by editing ’Appearance’ -> ’Widgets’ page for sidebar chat, and by using [quick-chat room="your_room_name"] shortcode for in-post chat (check FAQ page for more info).
1.  Go to ’Settings’ -> ’Quick Chat’ to tweak chat options.
1.  Have fun showing people new chat on your web site/blog.

## Frequently Asked Questions ##
### I've installed Quick Chat and it doesn't appear to be working. What should I do? ###
From my experience most of time Quick Chat isn't working due to old jQuery library version being loaded by your WordPress theme or some other miss-behaving WordPress plugin. Loading old jQuery version is considered poor development practice by WordPress developer who created miss-behaving plugin because it breaks other plugins that require recent jQuery version for their normal operation. This isn't large issue and can be easily resolved. This way you will fix problems with all modern WordPress plugins not only Quick Chat.

If your jQuery version is up to date then there is conflict with your theme or other plugins with Quick Chat. You can test this by changing your theme and/or disabling other plugins one by one until you find the one that conflicts with Quick Chat. Then you can report your findings to me and if I have some spare time I will do all I can to provide workaround.

Last possible problem is server misconfiguration. This one is hard to track down and and even harder to resolve especially if you are on shared hosting. You should ask your hosting provider for support.

### I'm unable to resolve my Quick Chat related problem myself / I need features added to Quick Chat. What should I do? ###
You can find someone who knows thing or two about WordPress plugin development. You can also hire me to track down your issue and resolve it if possible or to implement features you need. To contact me you can use [my contact form](http://www.techytalk.info/contact/).

### After upgrading Quick Chat 1.xx, 2.xx or 3.xx to 4.xx what will happen with my old chat messages and settings? ###
If you are upgrading from 3.xx release to 4.00, all messages and settings will be preserved. For upgrading from 1.xx release to 4.00  please take a look at upgrade notices for versions 2.xx and 3.xx.

### After upgrading Quick Chat 2.xx to 3.xx what will happen with my old chat messages and settings? ###
All messages and settings will be preserved. Note that because of added support for local avatar plugins existing messages will not have their authors avatar set. Messages posted after successful upgrade will have correct author avatar.

### After upgrading Quick Chat 1.xx to 2.xx what will happen with my old chat messages and settings? ###
Quick Chat 2.xx has new features like list of online users that couldn't be successfully implemented on top of Quick Chat 1.xx. Because of that it isn't possible to preserve old messages and settings when upgrading Quick Chat 1.xx to Quick Chat 2.xx. If you need your old messages you should backup your data from "wp_quick_chat" table inside your WordPress database using Phpmyadmin before upgrading to Quick Chat 2.xx.

### What is Quick Chat shortcode for embedding chat room into post or page? ###
You can do that by placing [quick-chat] (including [] brackets) inside post or page where you want your chat to appear. This short code will use all default options. If you need to change some of default options you can use shortcode attributes. Here's Quick Chat shortcode with all atributes and their default values included.

[quick-chat height="400" room="default" userlist="1" userlist_position="left" smilies="1" send_button="0" loggedin_visible="1" guests_visible="1" avatars="1" counter="1"]

Shortcode attributes details:

* height - You control Quick Chat height by giving height attribute to the [quick-chat] shortcode. For example to have 600 pixels high Quick Chat message history container embedded on your page you would add [quick-chat height="600"] inside page where you want your chat to appear. If you omit height attribute default height is 400 pixels.
*** room - You can give room attribute to the [quick-chat] shortcode. So if you want your embedded chat to show chat room identified by word "musictalk" you will display this chat like this:** [quick-chat room="musictalk"]. Every chat (sidebar or in-post) with "musictalk" room attribute will show this same content. If you omit room shortcode attribute, default behavior is to show predefined chat room identified by the "default" word.
  
* userlist - If you wan't to hide user list you can set this shortcode attribute value to 0 like this [quick-chat userlist="0"].
* userlist_position - To use embedded chat with user list on the left side of your chat room you can embedd it into your post or page using [quick-chat userlist_position="left"] shortcode. You can also use "top" and "right" values for userlist_position shortcode attribute.
* smilies - If you wan't to hide emoticons container you can set this shortcode attribute value to 0 like this [quick-chat smilies="0"].
* send_button - Messages are submited using Enter key on your keyboard. Additionally to control send button visibility you can use "send_button" shortcode attribute. To embed Quick Chat with send button displayed you can use [quick-chat send_button="1"] shortcode.
* loggedin_visible, guests_visible - When using embedded chat you can use "loggedin_visible" and "guests_visible" shortcode attributes whose value can be "0" to hide chat room for specified user group or "1" to display it. Default value for both "loggedin_visible" and "guests_visible" shortcode atributes is "1", so this means that if you omit this shortcode attributes chat will be displayed to all users. For example to display chat room only to logged in users and hide it for guests you can use [quick-chat loggedin_visible="1" guests_visible="0"] shortcode.
* avatars - You use "avatars" shortcode attribute whose value can be "0" to hide avatars or "1" to show them. To embed Quick Chat with avatars hidden you can use following shortcode [quick-chat avatars="0"].
* counter - You use "counter" shortcode attribute whose value can be "0" to hide characters left counter or "1" to show it. To embed Quick Chat with counter hidden you can use following shortcode [quick-chat counter="0"].

### How do I configure chat room options when using Quick Chat sidebar widget? ###
Every short code attribute setting has equivalent widget option setting. This way you can control all sidebar widget options available to chat room embedded to page or post using shortcode.

### Can you tell me more about Quick Chat PHP caching plugins support? ###
Caching plugin support is tested with WP Super Cache and W3 Total Cache and my custom caching solution where Quick Chat automatically clears cache when necessary. If you use some other caching plugin you should manually clear cache every time you change any of quick chat options, modify shortcode, sidebar widget options or similar. PHP caching compatibility is achieved using AJAX to load and operate chat.

### Can you tell me more about Quick Chat Avatar support ###
Quick Chat supports both local avatars supplied by local avatar plugins and gravatar.com avatars. I recommend [Simple Local Avatars](http://wordpress.org/extend/plugins/simple-local-avatars/) WordPress plugin for local avatar support.

### My theme has no widget support. How can I embed Quick Chat into my web site using PHP? ###
To embed Quick Chat on your page using PHP you can use following PHP code:

`<?php
global $quick_chat;
if(is_object($quick_chat) && method_exists($quick_chat, 'quick_chat')){
    echo $quick_chat->quick_chat(400, 'default', 1, 'left', 0, 0, 1, 1, 1, 1); ?>
}
?>
`

You can replace "400" with wanted Quick Chat message history window height and 'default' with your chat room name. The third parameter should be 1 when you want to display user list (0 otherwise) and fourth parameter will decide where will user list be placed ('right', 'left' or 'top'). Fifth parameter will decide will smilies be displayed (1) or hidden (0). Sixth parameter can take value (0) to hide send button and (1) to display it. Last two parameters can take value (0) to hide chat for logged in users (7th parameter) or guests (8th parameter) and (1) to display it. Last two parameters determine will avatars and character counter be displayed (1) or hidden (0).

### What are the requirements for Quick Chat audio notification features? ###
Quick Chat can use sound to notify you of incoming messages. For this feature to work you need modern HTML5 audio tag enabled browser like Mozilla Firefox 3.5+, Google Chrome 6+, Opera 10.5+ or Internet Explorer 9 (IE works but not recommended).

### Can I change messages notification sound? ###
Sure you can. You just replace "message-sound.mp3", "message-sound.ogg" and "message-sound.wav" from your "wp-content/plugins/quick-chat/sounds" directory with your own message notification sound files. Three sound file types are necessary because not all HTML5 audio tag enabled browsers support all audio file formats.

### How should I configure timeout options inside General section of Quick Chat admin options? ###
Generally the lower you go with timing options the more stress is put to your server but your chat is more responsive. Default values are optimal so please don't go overboard with making them much lower.

### How do I use private chat? ###
To initiate private chat with another chat user click his chat user name on the list of chat users. Simultaneously you can have multiple one on one private chat sessions. Quick Chat administrator users can control who is allowed to initiate private chat session (logged in users and/or guests) from Quick Chat admin options.

### Where can I find my chat room transcripts? ###
You can find all of your chat room transcript files inside your "wp-content/plugins/quick-chat/transcripts" directory.

### What's up with the private message clean up available from the inside of Quick Chat options, private chat options section? ###
Even if you can't see them, Quick Chat private chat invitations and private chat messages are left inside your WordPress database after private chat sessions and can in time pile up to slow down your Quick Chat. You should periodically clean those to keep Quick Chat database sparkling clean (preferably when no private chat sessions are in progress).

### What happened to Quick Chat translating abilities? ###
Translation feature has been removed as of Quick Chat 4.00 version because Microsoft has converted its translation service into paid service

### 30. How do I enable or disable country flags on my chat user list? ###
Quick Chat is using [Quick Flag](http://www.techytalk.info/wordpress-plugins/quick-flag/) WordPress plugin to resolve IP address to country flag so to enable this feature you must install and activate Quick Flag plugin. To hide country flag display you can deactivate Quick Flag plugin or enable "Disable Quick Flag WordPress plugin integration" checkbox in Quick Count admin options.

### 31. How do I Avoid losing CSS customizations after Quick Chat update? ###
After Quick Chat loads its own CSS file it will search for quick-chat.css file inside your current theme directory. If this file exists Quick Chat will load it after its own CSS file. CSS customizations placed inside quick-chat.css file inside your theme directory wont be lost after Quick Chat upgrade (be aware that your theme upgrade will probably delete this file).

## Screenshots ##
###1.  Quick Chat embedded in post using shortcode
###
![ Quick Chat embedded in post using shortcode
](http://s.wordpress.org/extend/plugins/quick-chat/screenshot-1.png)

###2.  Quick Chat placed on sidebar using sidebar widget
###
![ Quick Chat placed on sidebar using sidebar widget
](http://s.wordpress.org/extend/plugins/quick-chat/screenshot-2.png)

###3.  Quick Chat admin dashboard widget
###
![ Quick Chat admin dashboard widget
](http://s.wordpress.org/extend/plugins/quick-chat/screenshot-3.png)

###4.  Private one-on-one chat session
###
![ Private one-on-one chat session
](http://s.wordpress.org/extend/plugins/quick-chat/screenshot-4.png)

###5.  Quick Chat sidebar widget options
###
![ Quick Chat sidebar widget options
](http://s.wordpress.org/extend/plugins/quick-chat/screenshot-5.png)

###6.  Quick Chat admin options
###
![ Quick Chat admin options
](http://s.wordpress.org/extend/plugins/quick-chat/screenshot-6.png)


## Changelog ##
### 4.13 (04.08.2013.) ###
*   Update PHP code to comply with latest WordPress changes
*   Update Javascript code to comply with latest jQuery changes
*   Bump minimum WordPress version to 3.3
*   Fix chat user name input box bug with Twenty Thirteen theme
*   Add back missing admin user options screenshot
*   Update Persian, Swedish, Portuguese (Brasil), German, French and Russian translation files

### 4.12 (19.12.2012.) ###
*   Fix bug where user list in 'top' position doesn't use comma to separate users

### 4.11 (16.12.2012.) ###
*   Fix bug where chat was not working if back-end uses SSL
*   Fix bug where clicking smilies would not trigger counter
*   Fix bug where private chat window would show up even after users logs out
*   Include updated translations since last version

### 4.10 (22.08.2012.) ###
*   Add chat room loading indicator
*   Implement automatic private messages and chat rooms daily cleanup using WordPress cron API
*   Add "Do automatic daily cleanup to delete messages older than target number of messages" admin checkbox
*   Add "Automatically delete all messages from all private chat rooms as well as old private chat invitations daily" admin checkbox
*   For webkit load chat container on window load event, for other browsers on DOM ready
*   Rename jquery.cookie.js into jquery.c00kie.js to avoid apache mod_security module 950004 rule
*   Upgrade country flags feature to Quick Flag 2.00 API
*   Improve cleaning chat room to target number of messages when having multiple containers with same chat room on the same page
*   Improve deleting messages when having multiple containers with same chat room on the same page
*   Improve frontend counter code to detect pasting characters into textarea
*   Fix bug where send button wasn't working when smilies are hidden
*   Fix incorrect FAQ documentation (PHP embedding using FAQ code works again)
*   Fix quick_flag_capable() PHP warning
*   Fix Quick Flag capability admin notice
*   Fix translation files code and name mess according to [WordPress in Your Language Documentation](http://codex.wordpress.org/WordPress_in_Your_Language)
*   Update to latest translation files from [TechyTalk.info Glotpress](http://www.techytalk.info/glotpress/)

### 4.01 (18.06.2012.) ###
*   Fix bug where sidebar widget would cause site not to load

### 4.00 (18.06.2012.) ###
*   Add PHP caching WordPress plugins compatibility (see FAQ for more)
*   Add "WordPress user roles allowed to access moderation tools" checkboxes into Security section of admin options
*   After Quick Chat loads its own CSS file it will search for quick-chat.css file inside your current theme directory (See FAQ for more)
*   Rewrote PHP code with Object Oriented approach
*   Rewrote Javascript code namespaced using object literal notation
*   Add "counter" shortcode attribute with possible values "0" and "1" (default)
*   Add "Include counter" check box to Quick Chat widget settings
*   Add hash suffix to dashboard admin chat room name to prevent evesdropping on admin conversation by non admin users
*   Remove Bing Translator API translation support because Microsoft has converted its translation service into paid service
*   Notify admin user with error message when validation of some admin option fails during save operation
*   Fixes and improvements for deleting messages and cleaning rooms and private messages
*   Improve security from SQL injections for all SQL queries (big thanks to Teemu Muikku)
*   Restructure readme.txt file to make it more informative
*   Many other fixes and improvements

### 3.41 (31.03.2012.) ###
*   Fix bug where Dashboard -> Settings -> Discussion -> Don't show Avatars would cause Quick Chat to stop working

### 3.40 (06.03.2012.) ###
*   Add support for Quick Flag WordPress plugin to display country flag icons next to user name
*   Add "Disable Quick Flag WordPress plugin integration" checkbox to admin dashboard options (default unchecked)
*   Add "Timeout for disabling updates to inactive user (seconds)" input box to admin dashboard options (default 1800)
*   By default hide all textarea elements in admin dashboard options until user clicks on "Show" link to make admin options more compact and by default hide that possibly offensive bad words list
*   Move send button bellow smilies container
*   Add French translation by grossebaff
*   Add Finnish translation by robfa

### 3.32 (25.02.2012.) ###
*   Fix bug where admin dashboard widget was present for all logged in users instead of only for admin users
*   Modify CSS to preventing line of text escaping chat container with very long words without spaces
*   Add link to Quick Chat settings on dashboard plugin list page
*   Other minor CSS tweaks
*   Add Polish translation
*   Add Welsh translation (incomplete)

### 3.31 (16.02.2012.) ###
*   Fix bug where message select checkboxes disappeared after last update

### 3.30 (16.02.2012.) ###
*   Fix bug where an extra private chat invitation would be sent after user accepts existing private chat invitation
*   Add minimize/restore ability to private chat box
*   Add hover help on minimize/restore and close private chat links
*   Add feature where minimized chat will restore it self on incoming message
*   Add current username input box inside private chat (disabled state)
*   No need to reload page after chat room message clean operation
*   Updated German translation by Artur

### 3.20 (10.02.2012.) ###
*   Fix bug with fade effects when clicking links and smilies with some plugins like TubePress
*   Fix `.'$quick_chat_users_table'.` instead of wp_quick_chat_users inside quick_chat_update_users_ajax_handler() reported by Art4
*   Add "Clean button will delete messages older than following number of messages per chat room" input box to Quick Chat admin options
*   Add "Clean" button to Quick Chat user interface for admin users to clean old messages considering threshold specified in admin options
*   Add "Clean all messages from all private chat rooms as well as old private chat invitations" link to Quick Chat admin settings
*   Add "Allow users to change their chat user name" checkbox to Quick Chat admin option
*   Rename quick-chat-admin.js into quick-chat-power.js and use quick-chat-admin.js script for backend Javascript code
*   Modify some of the interface strings to make some actions more easier to understand
*   Add Estonian translation by Igor Dubilei

### 3.11 (09.02.2012.) ###
*   Enable avatars for private chat
*   Add Ukrainian translation by Ted Mosby

### 3.10 (09.02.2012.) ###
*   Remove "hide_smilies" shortcode attribute for embedded chat and replace it with "smilies" shortcode attribute (see FAQ No.24 for more)
*   Remove "Hide smilies" check box from Quick Chat widget settings and replace it with "Include smilies container" check box (see FAQ No.25 for more)
*   Add "avatar" shortcode attribute (see FAQ No.27 for more)
*   Add "Include avatars" checkbox to Quick Chat widget settings (see FAQ No.28 for more)
*   Modify order of Quick Chat widget options

### 3.00 (08.02.2012.) ###
*   Implement private chat feature  (see FAQ No.23 for more)
*   Implement download chat room transcript feature (see FAQ No.26 for more)
*   Implement message input box character counter
*   Implement support for local avatars uploaded using local avatars plugins
*   Implement admin dashboard widget to chat with other admin users
*   Add "Private chat options" admin options section
*   Add "Logged in users can initiate private chat" admin option checkbox (default disabled)
*   Add "Guest users can initiate private chat" admin option checkbox (default disabled)
*   Add "Maximum number of characters for each message" admin option (default 250)
*   Add "User avatar size (pixels)" admin option (default 250)
*   Add "hide_smilies" shortcode attribute for embedded chat (see FAQ No.24 for more)
*   Add "Hide smilies" check box to Quick Chat widget settings (see FAQ No.25 for more)
*   Rewrite translation feature to work without using additional jQuery translation plugins
*   Move destination language for translation next to the chat user name input box
*   Temporarily remove "Keep total number of messages inside every chat room automatically around this value" admin option because of conflict with private chat code
*   Make string comparison when checking usernames case insensitive
*   Fetch messages and users exclusively using AJAX calls after page is loaded to increase page loading time
*   Optimize user update Ajax code for users with multiple chat rooms on the same page (one call total instead of one call per chat room)
*   Prevent users from having separate chat user names when having multiple chat rooms on one page
*   Split Javascript code into multiple files and load separate parts based on user status and enabled features
*   Fix a bug with translation language select with multiple chat rooms on same page not in sync
*   Most of Quick Chat code rewritten to support new features and to increase performance
*   Add Slovenian translation by Špela

### 2.41 (19.11.2011.) ###
*   Minor CSS layout bugs fixed
*   Make Quick Chat more friendly towards Microsoft's broken web browsers (IE7, IE8, IE9)
*   "Keep total number of messages inside every chat room automatically around this value" not working correctly bug fixed

### 2.40 (30.10.2011.) ###
*   Add message translation using Bing Translator API (requires Bing Translator AppID) (see FAQ for more)
*   Add "Bing Translator AppID" admin option
*   Add "Manual timestamp offset when displaying messages " admin option
*   Change "Timeout for refreshing list of messages" admin option from 1 to 2 seconds and default "Timeout for refreshing list of online users" admin option from 15 to 30 seconds (performance)
*   Remove "Keep first and last letter of filtered word" admin option (performance)
*   Remove "Allow guest users to choose their chat user names" admin option, hardcode enabled (performance)
*   Remove "Allow logged in users to choose their chat user names" admin option, hardcode enabled (performance)
*   Remove special behavior for room named "unique" (performance)
*   Single user name cookie for all logged in users, tie user name cookie with WordPress user id, some cookies simplifications (performance)
*   Add German translation by Art4

### 2.33 (06.09.2011.) ###
*   Add "loggedin_visible" and "guests_visible" shortcode attributess for embedded chat (see FAQ for more)
*   Add "Visible to logged in users" and "Visible to guest users" check boxes to Quick Chat widget settings (see FAQ for more)
*   Change "Hide Quick Chat sidebar widget on pages where Quick Chat is embedded in post" into "Hide Quick Chat sidebar widget on pages where same chat room is embedded using shortcode"
*   Function quick_chat_display_chat() renamed to quick_chat(), backward compatibility preserved
*   File quickchat.js renamed to quick-chat.js and quickchat.min.js renamed to quick-chat.min.js for consistency
*   Revert "Web spiders are now completely blocked from indexing chat rooms" because of reported problems with some bots
*   Updated Russian translation by DreamJunkie

### 2.32 (01.09.2011.) ###
*   Upcoming WordPress 3.3 compatibility
*   Web spiders are now completely blocked from indexing chat rooms (better SEO in most cases, better chat performance)
*   Fix bug where chat user names weren't checked for bad words
*   Prevent possibility of tampering with chat user name cookie
*   Add explanation tooltips for Ban, Sound, Scroll, Delete and Toggle control links
*   Danish translation by Per Bovbjerg

### 2.31 (23.08.2011.) ###
*   Revert to sound toggle scheme with one global audio notifications enable/disable switch and cookie to remember state between pages
*   Optional send message button for browsing using touchscreen device (off by default for both widget and embedded chat)
*   Add "send_button" shortcode attribute for embedded chat (see FAQ for more)
*   Add "Include send button" input box to Quick Chat widget settings (see FAQ for more)
*   Add "Debug mode" admin option to load devel version of Quick Chat Javascript for easier debugging
*   Make input textarea verticaly resizable
*   Fix some audio notification bugs
*   Brazilian Portuguese translation by Hajiro

### 2.30 (12.08.2011.) ###
*   Users now go instantly into no participation mode when their IP is banned. When user IP is unblocked by admin, user instantly gets participation rights back (be aware that admin users IP can be baned but admin isn't affected by being IP banned).
*   Guest users now go instantly into no participation mode when admin enables "Only logged in users can use chat" admin option.  When this option is again disabled by admin, guest users instantly get participation rights.
*   Add "Ban" link for admin users to add chat participants IP address automatically to the IP blocklist
*   Block web spiders from being shown on the users list (set them into no participation mode)
*   "Audio" link is renamed to "Sound" and if user has multiple chat rooms on the same page he can turn the sound on/off for every chat room individually (but no more cookies to remember on/off state)
*   Add "Scroll" link for all users to disable chat history auto scroll when new messages arrive (useful when reading old messages)
*   Add "Timeout for refreshing list of messages" admin option
*   Remove "Timeout after user is considered gone from chat" and hard code it as 2x "Timeout for refreshing list of online users"
*   Remove Modernizr HTML5 features detection library dependancy
*   Updated Croatian, Italian, Romanian, Spanish, Dutch and Russian translations

### 2.20 (07.08.2011.) ###
*   Add gravatar support for both embedded chat and sidebar widget
*   Add "gravatar" and "gravatar_size" shortcode attributes (see FAQ for more)
*   Add "Include gravatars" checkbox to Quick Chat widget settings (see FAQ for more)
*   Add "Gravatars size" input box to Quick Chat widget settings (see FAQ for more)
*   Change default history container box height for shortcode from 300px to 400px
*   Change default history container box height for sidebar widget from 310px to 400px
*   Up minimum requirements for WordPress version to 3.0 (mainly because of WordPress included jQuery version).

### 2.10 (05.08.2011.) ###
*   Add feature into Quick Chat options to paste advertisement code for ads that will be shown between chat user name input box and message text input box
*   Chat user names color defaults to blue color for guests, green for loggedin users and red for admin users (can be changed in quick-chat.css)
*   Disable adding links to users own name on message history and users list
*   Disable adding other users links for users on IP block list or when the "only logged in can participate" option is turned on and user is guest
*   Increase typing timeout to check user name from 1000 ms to 1500ms
*   Add Russian translation by DreamJunkie

### 2.09 (30.07.2011.) ###
*   Tweak long polling code to send headers to disable browsers caching message update requests
*   Implement alternative way of storing and fetching chat ID using HTML5 "data-" way

### 2.08 (29.07.2011.) ###
*   Use CSS sprites instead of separate images for smilies to improve page load times even more
*   Optimize fetching messages to conserve bandwidth by monitoring only chat rooms user has on current page.
*   Rewrote Quick Chat PHP and jQuery in a way to make upcoming private messages functionality possible
*   Rewrote user name check functionality to simplify jQuery code
*   Rewrote the delete messages functionality

### 2.01 (22.07.2011.) ###
*   Fix bug where users could use white spaces for user name
*   Fix chat user name prefix not being translated when using localized Quick Chat
*   In Quick chat 2.00 I've removed "Filter URLs to the following domains" admin option. Now I've removed obsolete "keep in mind that URLs filter has priority" sentence from admin options.

### 2.00 (21.07.2011.) ###
*   Add list of online users feature (can be positioned at the top, left or right of the chat)
*   Add "userlist" shortcode attribute with value "1" to turn user list on and "0" to turn user list off when using embedded chat. Default is "1"
*   Add "userlist_position" shortcode attribute with possible values "left", "right", "top". Default is "left".
*   Add "Include user list" checkbox for sidebar widget to turn user list for that widget instance on and off
*   Add "User list position" select box with with possible values "left", "right", "top". Default is "top".
*   Add "Disallow using special characters inside chat user names" admin option
*   Add code for making impossible for two users to use same name in same chat room
*   Add links for Quick Chat FAQ, Quick Chat support page, changelog and Quich Chat version number to the Quick Chat admin options
*   Remove "Maximum length of guest chat user name" option. Hard coding the user alias length to the 30 characters
*   Remove "Filter URLs to the following domains" admin option to improve performance
*   Audio notification isn't dependant on ip address anymore, it checks for chat user names in the chat room before playing
*   Admin users are not affected by any of the Quick Chat security or filter restrictions

### 1.84 (11.07.2011.) ###
*   Chinese translation by Victor
*   Add "Deny chat access to the following IP addresses" admin option
*   Add "quick-chat-admin", "quick-chat-loggedin" and "quick-chat-guest" CSS classes so you can style admin, loggedin users and guest users messages separately

### 1.83 (09.07.2011.) ###
*   Romanian translation provided by Dragiša
*   Play messages notification sound only on incoming message (checked by message sender IP address)
*   Some work on ajax calls security to hopefully minimize probability that legitimate ajax calls will be blocked

### 1.82 (07.07.2011.) ###
*   Czech translation provided by Petr
*   Fix CSS layout bug when option "Only logged in users can use chat" is enabled

### 1.81 (04.07.2011.) ###
*   Fix CSS bug where message input box wouldn't wrap text on some browsers

### 1.80 (04.07.2011.) ###
*   Add "Protect registered users user names from being used by other users" admin option (admin users are not affected by this restriction)
*   Add "Reserved chat user names list (comma separated)" admin option, with "admin" and "moderator" as default reserved names (admin users are not affected by this restriction)
*   Additional steps to protect chat against malicious usersA
*   Ajax logic rewritten to use admin-ajax.php
*   Ajax calls secured using WordPress nounces
*   When word "unique" is used for chat room name for any sidebar chat widget, this widget shows unique chat on every post/page except on home page where it shows the "default" chat room
*   Add PayPal donate button at the end of Quick Chat admin option list

### 1.73 (31.06.2011.) ###
*   Quick Chat Javascript logic disabled on pages without chat window to improve performance
*   Use minified Javascript code for faster page loading
*   General code cleanup

### 1.72 (24.06.2011.) ###
*   Add possibility to automatically convert URLs inside messages to hyperlinks and admin option to toggle this on and off
*   Work on preventing Google Chrome/Chromium browser from displaying spinning circle after Quick Chat is loaded

### 1.71 (23.06.2011.) ###
*   Add click chat user name to mark as reply using @username:
*   Tiny CSS tweaks

### 1.70 (21.06.2011.) ###
*   Full upcoming WordPress 3.2 compatibility
*   Incoming/outgoing messages notification sound for any modern HTML5 audio tag enabled browser
*   Explicitly remove borders and padding from smilies (some themes add these what makes smilies look funny)
*   Delete messages without reloading page using ajax
*   Dozen of minor tweaks and bug fixes

### 1.62 (09.06.2011.) ###
*   Fix potential database bug with TEXT field incorrectly having default value (thanks Freeman for pointing this out)

### 1.61 (02.06.2011.) ###
*   Fix upgrade problem with sidebar not showing anything

### 1.60 (02.06.2011.) ###
*   Modify database, php and Javascript code for multiple separate chat rooms feature
*   Add "room" shortcode and sidebar options for multiple chatroom names
*   Add index on "timestamp" and "room" database fields for performance

### 1.52 (27.05.2011.) ###
*   Fix periodic automatic scrolling behavior when reviewing chat history
*   Italian translation by Alex Camilleri

### 1.51 (20.05.2011.) ###
*   Some users report multiple messages after single message has been sent, hopefully this will workaround this problem

### 1.50 (19.05.2011.) ###
*   Add administrator interface for deleting messages
*   Now every message has timestamp received through ajax instead of last message timestamp from last page refresh.
*   Fix bug with jQuery 1.6 where chat history container doesn't scroll to the bottom
*   Quick chat Javascript can now be added to the header or the footer
*   Million of other small tweaks and fixes

### 1.45 (07.05.2011.) ###
*   Add "Keep first and last letter of filtered word" option
*   Chat user name is no longer limited to 10 characters
*   Add "Maximum length of guest chat user name" option
*   Fix bug with wrong IP address inside Quick Chat message database
*   Tweaks to the Quick Chat jQuery code

### 1.44 (05.05.2011.) ###
*   Divide admin settings into general, filter, security and appearance sections
*   Add "Hide Quick Chat sidebar widget on pages where Quick Chat is embeded in post" option

### 1.43 (05.05.2011.) ###
*   Fix "can't save certan admin settings" bug
*   Update screenshots to the newest version

### 1.41 (30.04.2011.) ###
*   Improve message filtering with option to disable filtering of bad words found inside other words
*   Add admin option to keep number of messages inside database around given number
*   Administrator can forbidd guest users to actively participate in chat
*   It is possible to restrict chat user name to site login name for logged in users, and special unique name like "Guest_123" for guest users.
*   Improve Quick Chat installation and deinstallation process
*   Split Javascript from PHP, should improve compatibility

### 1.28 (28.04.2011.) ###
*   Remove colon after user name input box as suggested by some users
*   A few of the CSS tweaks

### 1.27 (28.04.2011.) ###
*   Load WordPress included jQuery version instead Google's to increase compatibility with other plugins and themes

*   Fix monkey smiley not working correctly
*   Fix CSS for smilies container that caused overflow for some themes and layouts
*   Use logged in user name for alias instead logged in user first name because user name is unique and first name isn't
*   Filter user name for bad words and links to forbidden domains

### 1.26 (27.04.2011.) ###
*   Simplify jQuery for selecting active textarea when there are multiple Quick Chat instances on the same page

### 1.25 (27.04.2011.) ###
*   Quick Chat now removes its WordPress options and database when being deleted

### 1.23 (27.04.2011.) ###
*   Make Quick Chat load jquery.min.js instead jquery.js

### 1.22 (26.04.2011.) ###
*   Fix chat auto scrolling in certan scenarios with multiple Quick Chat instances on the same page

### 1.21 (26.04.2011.) ###
*   Fix missing jquery.focused.js because of the SVN upload problem with file permissions

### 1.20 (26.04.2011.) ###
*   Support unlimited multiple instances of the Quick Chat on the same page
*   Quick Chat can be added to the posts or pages by placing WordPress shortcode [quick-chat height="your_integer"]
*   Add insert from smilies repository fade-in and fade-out effects
*   Set textarea and smilies repository width to 100% of available space

### 1.14 (24.04.2011.) ###
*   Fix display of local server time

### 1.13 (24.04.2011.) ###
*   More work on the readme.txt

### 1.12 (21.04.2011.) ###
*   Fix devil smilie not working
*   Fix chat not working with empty bad words filter
*   Remove unnecessary checkbox from admin
*   Many other bug fixes

### 1.1 (21.04.2011.) ###
*   Add option to disable posting URLs to specified domains (posted as text, true links are transformed to text)
*   Message input text becomes textarea
*   Smilies can be teleported from smilies repository in the middle of the sentence.
*   Add smilies textual representation on smilies repository images hover
*   Add removable ’Powered by Quick Chat’ link to spread the word about Quick Chat

### 1.0 (20.04.2011.) ###
*   Initial release

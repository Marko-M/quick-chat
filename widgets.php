<?php
class Quick_Chat_Widget extends WP_Widget {
    public $name = 'Quick Chat';
    /* Widget control settings. */
    public $control_options = array(
       'width' => 250,
       'height' => 300,
       'id_base' => 'quick-chat-widget');

    public function __construct() {
        $widget_options = array(
          'classname' => __CLASS__,
          'description' => __('Quick Chat is quick and elegant WordPress chat plugin that does not waste your bandwidth.','quick-chat'));

        parent::__construct($this->control_options['id_base'], $this->name, $widget_options);
    }

    function form ($instance) {
        $defaults = array('title'=>'Quick Chat','height' => 400, 'room' => 'default','userlist' => 1, 'userlist_position' => 'Top', 'smilies' => 1, 'loggedin_visible' => 1, 'guests_visible' => 1, 'avatars' => 1, 'counter' => 1);
        $instance = wp_parse_args( (array) $instance, $defaults );
        ?>
        <p>
        <label for="<?php echo $this->get_field_id('title'); ?>"><?php echo __('Title','quick-chat') ?>:</label>
        <input type="text" name="<?php echo $this->get_field_name('title') ?>" id="<?php echo $this->get_field_id('title') ?> " value="<?php echo $instance['title'] ?>" size="10">
        </p>

        <p>
        <label for="<?php echo $this->get_field_id('room'); ?>"><?php echo __('Chat room name:','quick-chat') ?></label>
        <input type="text" name="<?php echo $this->get_field_name('room') ?>" id="<?php echo $this->get_field_id('room') ?> " value="<?php echo $instance['room'] ?>" size="10">
        </p>

        <p>
        <label for="<?php echo $this->get_field_id('height'); ?>"><?php echo __('Message container height:','quick-chat') ?></label>
        <input type="text" name="<?php echo $this->get_field_name('height') ?>" id="<?php echo $this->get_field_id('height') ?> " value="<?php echo $instance['height'] ?>" size="2">
        px
        </p>

        <p>
        <label for="<?php echo $this->get_field_id('userlist'); ?>"><?php echo __('Include user list:','quick-chat') ?></label>
        <input id="<?php echo $this->get_field_id('userlist') ?>" name="<?php echo $this->get_field_name('userlist') ?>" type="checkbox" value="1"
        <?php if(isset($instance['userlist'])) echo 'checked="checked"' ?> />
        </p>

        <p>
        <label for="<?php echo $this->get_field_id('userlist_position'); ?>"><?php echo __('User list position:','quick-chat') ?></label>
        <select id="<?php echo $this->get_field_id('userlist_position') ?>" name="<?php echo $this->get_field_name('userlist_position') ?>">
            <option <?php if(isset($instance['userlist_position']) && $instance['userlist_position'] == 'Right') echo 'selected="selected"' ?> >Right</option>
            <option <?php if(isset($instance['userlist_position']) && $instance['userlist_position'] == 'Left') echo 'selected="selected"' ?> >Left</option>
            <option <?php if(isset($instance['userlist_position']) && $instance['userlist_position'] == 'Top') echo 'selected="selected"' ?> >Top</option>
        </select>
        </p>

        <p>
        <label for="<?php echo $this->get_field_id('loggedin_visible'); ?>"><?php echo __('Visible to logged in users:','quick-chat') ?></label>
        <input id="<?php echo $this->get_field_id('loggedin_visible') ?>" name="<?php echo $this->get_field_name('loggedin_visible') ?>" type="checkbox" value="1"
        <?php if(isset($instance['loggedin_visible'])) echo 'checked="checked"' ?> />
        </p>

        <p>
        <label for="<?php echo $this->get_field_id('guests_visible'); ?>"><?php echo __('Visible to guest users:','quick-chat') ?></label>
        <input id="<?php echo $this->get_field_id('guests_visible') ?>" name="<?php echo $this->get_field_name('guests_visible') ?>" type="checkbox" value="1"
        <?php if(isset($instance['guests_visible'])) echo 'checked="checked"' ?> />
        </p>

        <p>
        <label for="<?php echo $this->get_field_id('avatars'); ?>"><?php echo __('Include avatars:','quick-chat') ?></label>
        <input id="<?php echo $this->get_field_id('avatars') ?>" name="<?php echo $this->get_field_name('avatars') ?>" type="checkbox" value="1"
        <?php if(isset($instance['avatars'])) echo 'checked="checked"' ?> />
        </p>

        <p>
        <label for="<?php echo $this->get_field_id('smilies'); ?>"><?php echo __('Include smilies container:','quick-chat') ?></label>
        <input id="<?php echo $this->get_field_id('smilies') ?>" name="<?php echo $this->get_field_name('smilies') ?>" type="checkbox" value="1"
        <?php if(isset($instance['smilies'])) echo 'checked="checked"' ?> />
        </p>

        <p>
        <label for="<?php echo $this->get_field_id('send_button'); ?>"><?php echo __('Include send button:','quick-chat') ?></label>
        <input id="<?php echo $this->get_field_id('send_button') ?>" name="<?php echo $this->get_field_name('send_button') ?>" type="checkbox" value="1"
        <?php if(isset($instance['send_button'])) echo 'checked="checked"' ?> />
        </p>

        <p>
        <label for="<?php echo $this->get_field_id('counter'); ?>"><?php echo __('Include counter:','quick-chat') ?></label>
        <input id="<?php echo $this->get_field_id('counter') ?>" name="<?php echo $this->get_field_name('counter') ?>" type="checkbox" value="1"
        <?php if(isset($instance['counter'])) echo 'checked="checked"' ?> />
        </p>
        <?php
    }

    function update ($new_instance, $old_instance) {
        global $quick_chat;
        $instance = $old_instance;

        if(is_numeric($new_instance['height']) && $new_instance['height'] != 0){
            $instance['height'] = $new_instance['height'];
        }
        $instance['title'] = $new_instance['title'];

        $instance['avatars'] = $new_instance['avatars'];

        $instance['userlist'] = $new_instance['userlist'];

        $instance['smilies'] = $new_instance['smilies'];

        $instance['send_button'] = $new_instance['send_button'];

        $instance['counter'] = $new_instance['counter'];

        $instance['loggedin_visible'] = $new_instance['loggedin_visible'];

        $instance['guests_visible'] = $new_instance['guests_visible'];

        $instance['userlist_position'] = $new_instance['userlist_position'];

        if($new_instance['room'] != ''){
            $instance['room'] = $new_instance['room'];
        }

        $quick_chat->clear_cache();

        return $instance;
    }

    function widget ($args,$instance) {
        global $quick_chat;

        extract($args);
        $title = $instance['title'];
        $height = $instance['height'];
        $userlist = (isset($instance['userlist']))? 1: 0;
        $userlist_position = strtolower($instance['userlist_position']);
        $room = $instance['room'];
        $avatars = (isset($instance['avatars']))? 1: 0;
        $smilies = (isset($instance['smilies']))? 1: 0;
        $send_button = (isset($instance['send_button']))? 1: 0;
        $loggedin_visible = (isset($instance['loggedin_visible']))? 1: 0;
        $guests_visible = (isset($instance['guests_visible']))? 1: 0;
        $counter = (isset($instance['counter']))? 1: 0;

        if  (
                !isset($quick_chat->options['hide_widget_if_embedded'])
                ||
                !isset($quick_chat->embedded_rooms[$room])
            ){
            echo $before_widget;
            echo $before_title.$title.$after_title;


            echo $quick_chat->quick_chat($height, $room, $userlist, $userlist_position, $smilies, $send_button, $loggedin_visible, $guests_visible, $avatars, $counter);

            echo $after_widget;
        }
    }
}
?>

<template>
<v-card class="pa-4">
    <v-breadcrumbs :items="for_breadcrumd" divider="/"></v-breadcrumbs>
         <v-layout>                
                <v-flex xs6 sm6 md4 class="mt">
                    <v-btn
                        @click="dialog=!dialog"
                        small
                        dark
                        class="mb-4"
                        color="primary">
                        <v-icon >add</v-icon>
                        добавить                         
                    </v-btn>
                    <v-dialog v-model="dialog" max-width="500px" scrollable class="white-dialog">
                        <v-card>
                            <v-card-title>
                                <h1 class="title mt-3">Добавить новую категорию</h1>
                            </v-card-title>
                            <v-divider></v-divider>
                            <v-card-text>
                                <v-form  v-model="valid" lazy-validation ref="form">
                                    <v-text-field 
                                        label="Имя категории" 
                                        v-model="name"
                                        ref="nameref"
                                        counter="15"
                                        required
                                        :rules="nameRules"></v-text-field>
                                </v-form>
                                <p class="">Выберите иконку</p>
                                <vue-select  :options="options" v-model="icon">
                                    <template slot="option" slot-scope="option">
                                        <v-icon class="mr-3">{{option.label}}</v-icon>
                                        {{ option.label }} <br>
                                    </template>                                
                                </vue-select> 
                                <sub class="red--text" v-if="errorSelect==true">Выберите иконку</sub>  
                                <v-switch
                                    :label="hiddenText"
                                    color="primary"
                                    v-model="hidden"></v-switch>
                            </v-card-text>
                            <v-divider></v-divider>
                            <v-card-actions class="pa-3">
                                <v-spacer></v-spacer>
                                <v-btn color="primary" flat @click="dialog=!dialog">Закрыть</v-btn>
                                <v-btn color="primary" flat @click="saveItem()">Сохранить</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>                       
                </v-flex> 
         </v-layout>         
         <v-data-table
            :headers="headers"
            :items="categories"
            :loading="getSuccess"
            class="elevation-1 "
            no-results-text="К сожалению нет данных :("
            no-data-text="К сожалению нет данных :("
            rows-per-page-text="Количество записей">
            <v-progress-linear 
                slot="progress" 
                color="blue" 
                indeterminate
            ></v-progress-linear>
            <template  
                slot="items" 
                slot-scope="props">
                <td>{{ props.item.name }}</td>               
                <td><v-icon> {{ props.item.icon }}</v-icon></td>
                <td>{{ props.item.hidden }}</td>
                <td>
                    <v-tooltip bottom>
                        <v-icon
                            slot="activator"
                            class="edit_hover"
                            @click="editItem(props.item)">
                            edit
                        </v-icon>
                        <span>Редактировать</span>
                    </v-tooltip>
                    <span>&#160;&#160;</span>
                    <v-tooltip bottom>
                        <v-icon
                           slot="activator"                            
                            class="delete_hover"
                            @click="deleteItem(props.item)">
                            delete
                        </v-icon>
                        <span>Удалить</span>
                    </v-tooltip>
                </td>
            </template>
         </v-data-table>
<v-dialog v-model="editDialog" max-width="500px" scrollable class="white-dialog">
    <v-card>
        <v-card-title>
            <h1 class="title mt-3">Редактировать категорию</h1>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
            <v-form  v-model="valid" lazy-validation ref="editform">
                <v-text-field 
                    label="Имя категории" 
                    v-model="editName"
                    ref="nameref"
                    counter="15"
                    required
                    :rules="nameRules"></v-text-field>
            </v-form>
            <p class="">Выберите иконку</p>
            <vue-select  :options="options" v-model="editIcon">
                <template slot="option" slot-scope="option">
                    <v-icon class="mr-3">{{option.label}}</v-icon>
                    {{ option.label }} <br>
                </template>                                
            </vue-select> 
            <sub class="red--text" v-if="errorSelect==true">Выберите иконку</sub>  
            <v-switch
                :label="editHiddenText"
                color="primary"
                v-model="editHidden"></v-switch>
            <v-spacer></v-spacer>            
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions class="pa-2">
            <v-spacer></v-spacer>
            <v-btn color="primary" flat @click="editDialog=!editDialog">Закрыть</v-btn>
            <v-btn color="primary" flat @click="updateItem()">Обновить</v-btn>
        </v-card-actions>
    </v-card>
</v-dialog>  
<v-dialog
    v-model="errorDialog"
    width="500px">
    <v-card>
        <v-card-title
            class="headline red--text lighten-1"
            primary-title>
            Ошибка
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
            <h1 class="display-1 font-weight-bold text-xs-center">Ошибка {{requestErrorStatus}}</h1>
            <p  class="title text-xs-center">{{requestErrorText}}</p>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions class="pa-3">
            <v-spacer></v-spacer>
            <v-btn 
                color="primary"
                flat
                @click="errorDialog=!errorDialog">Закрыть</v-btn>
        </v-card-actions>
    </v-card>
</v-dialog> 
<v-dialog 
    v-model="deleteDialog"
    max-width="500"
    >
    <v-card>
    <v-card-title><h1 class="title">Потвердите действие</h1></v-card-title>
    <v-divider></v-divider>
    <v-card-text>
        Вы действительно хотите удалить категорию "<b>{{deletedItem.name}}</b>" ?
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn 
            flat 
            color="green lighten-1"
            @click="destroyItem()">
            Да
            </v-btn>
        <v-btn 
            flat 
            @click="deleteDialog=!deleteDialog"
            color="green lighten-1">
            Нет
            </v-btn>
    </v-card-actions>
    </v-card>
</v-dialog>             
<v-snackbar
    top
    v-model="snackbar"
    class="text-xs-center">
        Ваша операция успешно завершена!
    <v-btn
        color="pink"
        flat
        small
        @click="snackbar = false">Закрыть</v-btn>
</v-snackbar>     
</v-card>
</template>
<script>
import StoreBreadCrumbs from '~/components/StoreBreadCrumbs.vue'
export default{
    head:{
        title: "Категория товаров"
    },
    layout: 'admin',
    data(){
        return{
            for_breadcrumd: [
                {href: "/admin/", text:"Главная"},
                {href: "/admin/catalog/category", text: "Категории", disabled: true}
            ], 
            headers:[
                {
                    text: "Имя категории",
                    align: "left",
                    sortable: true,
                    value: "name"
                },
                {
                    text: "Иконка для категории",
                    value: "icon"
                },
                {
                    text: "Скрытый",
                    value: "hidden",
                    sortable: true
                },
                {
                    text: "Действие",
                    value: "action"
                }
            ],
            categories:[],
            dialog: false,
            options: ['3d_rotation','ac_unit','access_alarm','access_alarms','access_time','accessibility','accessible','account_balance','account_balance_wallet','account_box','account_circle','adb','add','add_a_photo','add_alarm','add_alert','add_box','add_circle','add_circle_outline','add_location','add_shopping_cart','add_to_photos','add_to_queue','adjust','airline_seat_flat','airline_seat_flat_angled','airline_seat_individual_suite','airline_seat_legroom_extra','airline_seat_legroom_normal','airline_seat_legroom_reduced','airline_seat_recline_extra','airline_seat_recline_normal','airplanemode_active','airplanemode_inactive','airplay','airport_shuttle','alarm','alarm_add','alarm_off','alarm_on','album','all_inclusive','all_out','android','announcement','apps','archive','arrow_back','arrow_downward','arrow_drop_down','arrow_drop_down_circle','arrow_drop_up','arrow_forward','arrow_upward','art_track','aspect_ratio','assessment','assignment','assignment_ind','assignment_late','assignment_return','assignment_returned','assignment_turned_in','assistant','assistant_photo','attach_file','attach_money','attachment','audiotrack','autorenew','av_timer','backspace','backup','battery_alert','battery_charging_full','battery_full','battery_std','battery_unknown','beach_access','beenhere','block','bluetooth','bluetooth_audio','bluetooth_connected','bluetooth_disabled','bluetooth_searching','blur_circular','blur_linear','blur_off','blur_on','book','bookmark','bookmark_border','border_all','border_bottom','border_clear','border_color','border_horizontal','border_inner','border_left','border_outer','border_right','border_style','border_top','border_vertical','branding_watermark','brightness_1','brightness_2','brightness_3','brightness_4','brightness_5','brightness_6','brightness_7','brightness_auto','brightness_high','brightness_low','brightness_medium','broken_image','brush','bubble_chart','bug_report','build','burst_mode','business','business_center','cached','cake','call','call_end','call_made','call_merge','call_missed','call_missed_outgoing','call_received','call_split','call_to_action','camera','camera_alt','camera_enhance','camera_front','camera_rear','camera_roll','cancel','card_giftcard','card_membership','card_travel','casino','cast','cast_connected','center_focus_strong','center_focus_weak','change_history','chat','chat_bubble','chat_bubble_outline','check','check_box','check_box_outline_blank','check_circle','chevron_left','chevron_right','child_care','child_friendly','chrome_reader_mode','class','clear','clear_all','close','closed_caption','cloud','cloud_circle','cloud_done','cloud_download','cloud_off','cloud_queue','cloud_upload','code','collections','collections_bookmark','color_lens','colorize','comment','compare','compare_arrows','computer','confirmation_number','contact_mail','contact_phone','contacts','content_copy','content_cut','content_paste','control_point','control_point_duplicate','copyright','create','create_new_folder','credit_card','crop','crop_16_9','crop_3_2','crop_5_4','crop_7_5','crop_din','crop_free','crop_landscape','crop_original','crop_portrait','crop_rotate','crop_square','dashboard','data_usage','date_range','dehaze','delete','delete_forever','delete_sweep','description','desktop_mac','desktop_windows','details','developer_board','developer_mode','device_hub','devices','devices_other','dialer_sip','dialpad','directions','directions_bike','directions_boat','directions_bus','directions_car','directions_railway','directions_run','directions_subway','directions_transit','directions_walk','disc_full','dns','do_not_disturb','do_not_disturb_alt','do_not_disturb_off','do_not_disturb_on','dock','domain','done','done_all','donut_large','donut_small','drafts','drag_handle','drive_eta','dvr','edit','edit_location','eject','email','enhanced_encryption','equalizer','error','error_outline','euro_symbol','ev_station','event','event_available','event_busy','event_note','event_seat','exit_to_app','expand_less','expand_more','explicit','explore','exposure','exposure_neg_1','exposure_neg_2','exposure_plus_1','exposure_plus_2','exposure_zero','extension','face','fast_forward','fast_rewind','favorite','favorite_border','featured_play_list','featured_video','feedback','fiber_dvr','fiber_manual_record','fiber_new','fiber_pin','fiber_smart_record','file_download','file_upload','filter','filter_1','filter_2','filter_3','filter_4','filter_5','filter_6','filter_7','filter_8','filter_9','filter_9_plus','filter_b_and_w','filter_center_focus','filter_drama','filter_frames','filter_hdr','filter_list','filter_none','filter_tilt_shift','filter_vintage','find_in_page','find_replace','fingerprint','first_page','fitness_center','flag','flare','flash_auto','flash_off','flash_on','flight','flight_land','flight_takeoff','flip','flip_to_back','flip_to_front','folder','folder_open','folder_shared','folder_special','font_download','format_align_center','format_align_justify','format_align_left','format_align_right','format_bold','format_clear','format_color_fill','format_color_reset','format_color_text','format_indent_decrease','format_indent_increase','format_italic','format_line_spacing','format_list_bulleted','format_list_numbered','format_paint','format_quote','format_shapes','format_size','format_strikethrough','format_textdirection_l_to_r','format_textdirection_r_to_l','format_underlined','forum','forward','forward_10','forward_30','forward_5','free_breakfast','fullscreen','fullscreen_exit','functions','g_translate','gamepad','games','gavel','gesture','get_app','gif','golf_course','gps_fixed','gps_not_fixed','gps_off','grade','gradient','grain','graphic_eq','grid_off','grid_on','group','group_add','group_work','hd','hdr_off','hdr_on','hdr_strong','hdr_weak','headset','headset_mic','healing','hearing','help','help_outline','high_quality','highlight','highlight_off','history','home','hot_tub','hotel','hourglass_empty','hourglass_full','http','https','image','image_aspect_ratio','import_contacts','import_export','important_devices','inbox','indeterminate_check_box','info','info_outline','input','insert_chart','insert_comment','insert_drive_file','insert_emoticon','insert_invitation','insert_link','insert_photo','invert_colors','invert_colors_off','iso','keyboard','keyboard_arrow_down','keyboard_arrow_left','keyboard_arrow_right','keyboard_arrow_up','keyboard_backspace','keyboard_capslock','keyboard_hide','keyboard_return','keyboard_tab','keyboard_voice','kitchen','label','label_outline','landscape','language','laptop','laptop_chromebook','laptop_mac','laptop_windows','last_page','launch','layers','layers_clear','leak_add','leak_remove','lens','library_add','library_books','library_music','lightbulb_outline','line_style','line_weight','linear_scale','link','linked_camera','list','live_help','live_tv','local_activity','local_airport','local_atm','local_bar','local_cafe','local_car_wash','local_convenience_store','local_dining','local_drink','local_florist','local_gas_station','local_grocery_store','local_hospital','local_hotel','local_laundry_service','local_library','local_mall','local_movies','local_offer','local_parking','local_pharmacy','local_phone','local_pizza','local_play','local_post_office','local_printshop','local_see','local_shipping','local_taxi','location_city','location_disabled','location_off','location_on','location_searching','lock','lock_open','lock_outline','looks','looks_3','looks_4','looks_5','looks_6','looks_one','looks_two','loop','loupe','low_priority','loyalty','mail','mail_outline','map','markunread','markunread_mailbox','memory','menu','merge_type','message','mic','mic_none','mic_off','mms','mode_comment','mode_edit','monetization_on','money_off','monochrome_photos','mood','mood_bad','more','more_horiz','more_vert','motorcycle','mouse','move_to_inbox','movie','movie_creation','movie_filter','multiline_chart','music_note','music_video','my_location','nature','nature_people','navigate_before','navigate_next','navigation','near_me','network_cell','network_check','network_locked','network_wifi','new_releases','next_week','nfc','no_encryption','no_sim','not_interested','note','note_add','notifications','notifications_active','notifications_none','notifications_off','notifications_paused','offline_pin','ondemand_video','opacity','open_in_browser','open_in_new','open_with','pages','pageview','palette','pan_tool','panorama','panorama_fish_eye','panorama_horizontal','panorama_vertical','panorama_wide_angle','party_mode','pause','pause_circle_filled','pause_circle_outline','payment','people','people_outline','perm_camera_mic','perm_contact_calendar','perm_data_setting','perm_device_information','perm_identity','perm_media','perm_phone_msg','perm_scan_wifi','person','person_add','person_outline','person_pin','person_pin_circle','personal_video','pets','phone','phone_android','phone_bluetooth_speaker','phone_forwarded','phone_in_talk','phone_iphone','phone_locked','phone_missed','phone_paused','phonelink','phonelink_erase','phonelink_lock','phonelink_off','phonelink_ring','phonelink_setup','photo','photo_album','photo_camera','photo_filter','photo_library','photo_size_select_actual','photo_size_select_large','photo_size_select_small','picture_as_pdf','picture_in_picture','picture_in_picture_alt','pie_chart','pie_chart_outlined','pin_drop','place','play_arrow','play_circle_filled','play_circle_outline','play_for_work','playlist_add','playlist_add_check','playlist_play','plus_one','poll','polymer','pool','portable_wifi_off','portrait','power','power_input','power_settings_new','pregnant_woman','present_to_all','print','priority_high','public','publish','query_builder','question_answer','queue','queue_music','queue_play_next','radio','radio_button_checked','radio_button_unchecked','rate_review','receipt','recent_actors','record_voice_over','redeem','redo','refresh','remove','remove_circle','remove_circle_outline','remove_from_queue','remove_red_eye','remove_shopping_cart','reorder','repeat','repeat_one','replay','replay_10','replay_30','replay_5','reply','reply_all','report','report_problem','restaurant','restaurant_menu','restore','restore_page','ring_volume','room','room_service','rotate_90_degrees_ccw','rotate_left','rotate_right','rounded_corner','router','rowing','rss_feed','rv_hookup','satellite','save','scanner','schedule','school','screen_lock_landscape','screen_lock_portrait','screen_lock_rotation','screen_rotation','screen_share','sd_card','sd_storage','search','security','select_all','send','sentiment_dissatisfied','sentiment_neutral','sentiment_satisfied','sentiment_very_dissatisfied','sentiment_very_satisfied','settings','settings_applications','settings_backup_restore','settings_bluetooth','settings_brightness','settings_cell','settings_ethernet','settings_input_antenna','settings_input_component','settings_input_composite','settings_input_hdmi','settings_input_svideo','settings_overscan','settings_phone','settings_power','settings_remote','settings_system_daydream','settings_voice','share','shop','shop_two','shopping_basket','shopping_cart','short_text','show_chart','shuffle','signal_cellular_4_bar','signal_cellular_connected_no_internet_4_bar','signal_cellular_no_sim','signal_cellular_null','signal_cellular_off','signal_wifi_4_bar','signal_wifi_4_bar_lock','signal_wifi_off','sim_card','sim_card_alert','skip_next','skip_previous','slideshow','slow_motion_video','smartphone','smoke_free','smoking_rooms','sms','sms_failed','snooze','sort','sort_by_alpha','spa','space_bar','speaker','speaker_group','speaker_notes','speaker_notes_off','speaker_phone','spellcheck','star','star_border','star_half','stars','stay_current_landscape','stay_current_portrait','stay_primary_landscape','stay_primary_portrait','stop','stop_screen_share','storage','store','store_mall_directory','straighten','streetview','strikethrough_s','style','subdirectory_arrow_left','subdirectory_arrow_right','subject','subscriptions','subtitles','subway','supervisor_account','surround_sound','swap_calls','swap_horiz','swap_vert','swap_vertical_circle','switch_camera','switch_video','sync','sync_disabled','sync_problem','system_update','system_update_alt','tab','tab_unselected','tablet','tablet_android','tablet_mac','tag_faces','tap_and_play','terrain','text_fields','text_format','textsms','texture','theaters','thumb_down','thumb_up','thumbs_up_down','time_to_leave','timelapse','timeline','timer','timer_10','timer_3','timer_off','title','toc','today','toll','tonality','touch_app','toys','track_changes','traffic','train','tram','transfer_within_a_station','transform','translate','trending_down','trending_flat','trending_up','tune','turned_in','turned_in_not','tv','unarchive','undo','unfold_less','unfold_more','update','usb','verified_user','vertical_align_bottom','vertical_align_center','vertical_align_top','vibration','video_call','video_label','video_library','videocam','videocam_off','videogame_asset','view_agenda','view_array','view_carousel','view_column','view_comfy','view_compact','view_day','view_headline','view_list','view_module','view_quilt','view_stream','view_week','vignette','visibility','visibility_off','voice_chat','voicemail','volume_down','volume_mute','volume_off','volume_up','vpn_key','vpn_lock','wallpaper','warning','watch','watch_later','wb_auto','wb_cloudy','wb_incandescent','wb_iridescent','wb_sunny','wc','web','web_asset','weekend','whatshot','widgets','wifi','wifi_lock','wifi_tethering','work','wrap_text','youtube_searched_for','zoom_in','zoom_out','zoom_out_map'          
            ],
            errorSelect: false,
            name: '',
            valid: false,
            nameref: null,
            nameRules: [
                v => !!v || 'Поле имя обязателен',
                v => v.length <= 15 || 'Длина не должен превышать 15 символов'
            ],  
            icon: '',
            hidden: true,
            hiddenText: 'Видимый',
            getSuccess: true,
            snackbar: false,
            editDialog: false,
            editName:'',
            editIcon:'',
            editHidden: true,
            editHiddenText: 'Видимый',
            editID: 0,
            editedItem:[],
            errorDialog: false,
            requestErrorStatus:'',
            requestErrorText: '',
            deletedItem: [],
            deleteDialog: false
        }
    },
    components:{
        StoreBreadCrumbs
    },
    watch:{
        hidden: function(val){
            if(val==true) this.hiddenText ="Видимый";
            else this.hiddenText="Скрытый";
        },
        editHidden: function(val){
            if(val==true) this.editHiddenText ="Видимый";
            else this.editHiddenText="Скрытый";
        },    
    },
    created(){
        this.getCategories();
    },
    methods:{
        getCategories(){
            this.$axios.$get(this.$store.getters.base_url+"catalog")
                .then(response => {
                    this.categories=response.catalogs;
                    this.getSuccess=false;
                    console.log(response.catalogs);
                })
                .catch(e=>{
                    this.getSuccess=false;
                    console.log(e);
                })
        },
        saveItem(){
            var name, icon;
            var hidden = 0;
            if(this.$refs.form.validate()){
                if(this.hidden==true)   hidden=0;  
                    else hidden=1;
                name=this.name;
                icon=this.icon;
                if(this.icon=='') {
                    this.errorSelect=true;
                    return;
                }
                this.$axios.post(this.$store.getters.base_url+'catalog', {
                        name: name,
                        icon: icon,
                        hidden: hidden
                    })
                    .then(response=>{
                        this.dialog=false; 
                        this.getCategories();
                        this.snackbar=true;                                               
                    })
                    .catch(error=>{
                        this.dialog=false;
                        this.requestErrorStatus=error.response.status;
                        this.requestErrorText=error.response.data.message;
                        this.errorDialog=true;
                    });
            }
        },
        editItem(editedItem){
            this.editName=editedItem.name;
            this.editIcon=editedItem.icon;
            this.editID=editedItem.id;
            if(editedItem.hidden==1) {
                this.editHidden=false;
                this.editHiddenText="Скрытый";
            }else{
                this.editHidden=true;
                this.editHiddenText="Видимый";
            }
            this.editDialog=true;
            
        },
        updateItem(){
            var name, icon;
            var hidden = 0;
            if(this.$refs.editform.validate()){
                if(this.editHidden==true)   hidden=0;  
                    else hidden=1;
                name=this.editName;
                icon=this.editIcon;
                if(this.editIcon=='') {
                    this.errorSelect=true;
                    return;
                }  
                this.$axios.$put(this.$store.getters.base_url+'catalog/'+this.editID,{
                        id: this.editID,
                        name: name,
                        icon: icon,
                        hidden: hidden
                    })    
                    .then(response=>{
                        this.snackbar=true;
                        this.editDialog=false; 
                        this.getCategories();                         
                    })
                    .catch(error=>{
                        this.editDialog=false;
                        this.requestErrorStatus=error.response.status;
                        this.requestErrorText=error.response.data.message;
                        this.errorDialog=true;
                    });             
            }            
        },
        deleteItem(deletedItem){
            this.deletedItem = deletedItem;
            this.deleteDialog=true;
        },
        destroyItem(){
            var id = this.deletedItem.id;
            this.$axios.$delete(this.$store.getters.base_url+'catalog/'+id)
                .then(response=>{
                    this.deleteDialog = false;
                    this.getCategories();
                    this.snackbar=true;
                })
                .catch(error=>{
                    this.errorDialog = true;
                    this.requestErrorStatus =error.status;
                    this.requestErrorText=error.data;
                });
        }
    }
}
</script>
<style scoped>
.edit_hover:hover{
    color: blue;
}
.delete_hover:hover{
    color: red;
}
.white-dialog{
    background-color: white;
}
</style>

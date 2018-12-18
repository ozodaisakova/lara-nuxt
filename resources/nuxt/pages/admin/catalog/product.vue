<template>
<v-card class="pa-4">
    <v-breadcrumbs :items="for_breadcrumd" divider="/"></v-breadcrumbs>
    <v-card class="pa-2">
        <v-layout
            row
            wrap>
                <v-flex xs6 sm6 md8>          
                    <v-card-text>                        
                        <p class="text-xs-left title">Продукты</p>                
                    </v-card-text>                   
                </v-flex>
                <v-flex xs6 sm6 md4 class="text-xs-right">
                    <v-btn
                        @click="create('create', null)"
                        small
                        dark
                        color="primary">
                        <v-icon >add</v-icon>
                        добавить                         
                    </v-btn>
                </v-flex>
        </v-layout>  
         <v-data-table
            :headers="headers"
            :items="products"
            :pagination.sync="pagination"
            :rows-per-page-items="pagination.rowsPerPageItems"
            :total-items="pagination.totalItems"
            :loading="getSuccess"
            class="elevation-1 "
            no-results-text="К сожалению нет данных :("
            no-data-text="К сожалению нет данных :("
            rows-per-page-text="Количество записей">
            <v-progress-linear 
                slot="progress" 
                color="blue" 
                indeterminate>
            </v-progress-linear>
            <template  
                slot="items" 
                slot-scope="props">  
                <td >{{ props.item.name }}</td>               
                <td class="text-xs-center">{{ props.item.catalog.name }}</td>
                <td class="text-xs-center">{{ props.item.price }} тг</td>  
                <td class="text-xs-center">
                     <v-tooltip bottom>
                        <v-icon
                            slot="activator"
                            class="vision_hover"
                            @click="show(props.item)">
                            visibility
                        </v-icon>
                        <span>Посмотреть</span>
                    </v-tooltip>
                    <span>&#160;&#160;</span>
                    <v-tooltip bottom>
                        <v-icon
                            slot="activator"
                            class="edit_hover"
                            @click="create('edit',props.item)">
                            edit
                        </v-icon>
                        <span>Редактировать</span>
                    </v-tooltip>
                    <span>&#160;&#160;</span>
                    <v-tooltip bottom>
                        <v-icon
                           slot="activator"                            
                            class="delete_hover"
                            @click="del(props.item)">
                            delete
                        </v-icon>
                        <span>Удалить</span>
                    </v-tooltip>
                </td>             
            </template>
         </v-data-table>
    </v-card>
<v-dialog 
    v-model="createDialog" 
    fullscreen 
    hide-overlay 
    transition="dialog-bottom-transition">
    <v-card>
    <v-toolbar dark color="primary">
        <v-btn icon dark @click="createDialog = false">
        <v-icon>close</v-icon>
        </v-btn>
        <v-toolbar-title>{{ action_title  }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
        <v-btn 
            v-if="action_type=='create'"
            dark 
            flat 
            @click="store()">
            Сохранить
        </v-btn>
        <v-btn 
            v-else
            dark 
            flat 
            @click="update()">
            Обновить
        </v-btn>
        </v-toolbar-items>
    </v-toolbar>  
    <v-form ref="createform">  
    <v-layout row wrap class="mx-3  mt-4">
        <v-flex xs12 sm12 md4 class="pa-3">
            <v-text-field
                v-model="c_name"
                label="Наименование"
                :counter="50"
                :rules="c_name_r"
                hint="Обязательно для  всех видов продукта"
                required>
            </v-text-field>
            <v-text-field
                v-model="c_price"
                label="Цена"
                :rules="c_price_r"
                hint="В цифрах без пробелов"
                required>
            </v-text-field>
            <v-select
                label="Выберите категорию"
                v-model="c_category"
                :rules="[v => !!v || 'Выберите категорию продукта']"
                :items="c_category_items"
                item-text="name"
                item-value="id"
                return-object
                required
                >
            </v-select>   
            <v-combobox
                v-model="c_colors"
                hint="Максимум 20 цвета"
                label="Цвета"
                multiple
                small-chips>
            </v-combobox>    
            <v-textarea
                v-model="c_description"
                :rules="c_description_r"
                label="Описание продукта"
                rows="9">
            </v-textarea> 
        </v-flex>
        <v-flex xs12 sm12 md4 class="pa-3">            
            <v-text-field
                v-model="c_width"
                label="Ширина"
                :rules="c_height_r"
                hint="Напишите в милиметрах (1 метр = 1000 милиметр)">
            </v-text-field>
            <v-text-field
                v-model="c_height"
                :rules="c_height_r"
                label="Высота"
                hint="Напишите в милиметрах (1 метр = 1000 милиметр)">
            </v-text-field>
            <v-text-field
                v-model="c_length"
                :rules="c_height_r"
                label="Длина"
                hint="Напишите в милиметрах (1 метр = 1000 милиметр)">
            </v-text-field>
            <v-text-field
                v-model="c_material"
                label="Материал"
                hint="Укажите материалы сборки продукции (карагач, стальные болты)">                    
            </v-text-field>
            <v-text-field
                v-model="c_complect"
                label="Комплектация"
                hint="Комлектации данного продукта">                    
            </v-text-field>
            <v-text-field
                v-model="c_compound"
                label="Соединение"
                hint="Например, болты, стержни">                    
            </v-text-field>
            <v-text-field
                v-model="c_karkas"
                label="Каркас"
                hint="Кратко опишите как устроен каркас продукта">
            </v-text-field>
        </v-flex>
        <v-flex xs12 sm12 md4 class="pa-5">
            <vue-upload-multiple-image
                @upload-success="uploadImageSuccess"
                @before-remove="beforeRemove"
                @edit-image="editImage"
                @data-change="dataChange"
                :data-images="c_images"
                dragText="Выберите изображения"
                browseText="Выбрать"
                accept="image/jpeg,image/png,image/jpg"
                primaryText="По умолчанию"
                markIsPrimaryText="Установить по умолчанию"
                popupText="Это изображение будет показано по умолчанию"
                dropText="Оставить файл здесь">
            </vue-upload-multiple-image>
            <v-switch 
                class="mt-5"
                color="primary"
                v-model="c_hidden"
                :label="c_hidden_text">
            </v-switch>
            <v-switch 
                v-model="c_available"
                color="primary"
                :label="c_available_text">
            </v-switch>
            <v-switch 
                v-model="c_recommendation"
                color="primary"
                :label="c_recommendation_text">
            </v-switch>
        </v-flex>
    </v-layout>
    </v-form>
    </v-card>
<v-dialog
      v-model="loadingDialog"
      hide-overlay
      persistent
      width="300">
    <v-card
    color="primary"
    dark>
        <v-card-text>
            Пожалуйста, подаждите....
            <v-progress-linear
            indeterminate
            color="white"
            class="mb-0"
            ></v-progress-linear>
        </v-card-text>
    </v-card>
</v-dialog>
</v-dialog>
<v-dialog v-model="openShowDialog"
    width="500px"
    scrollable>
    <v-card>
        <v-card-title
            class="title">
            Продукт 
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
            <b>Наименование:</b><span>&#160;&#160;&#160; {{ product.name  }}</span><br>
            <b>Категория:</b><span>&#160;&#160;&#160; {{product.catalog.name}}</span><br>
            <b>Цена:</b><span>&#160;&#160;&#160; {{product.price}}</span><br>
            <b>Цвета:</b>
            <span 
                :key="i"
                v-for="(color, i) in colors">
                {{color.color}},
            </span> 
            <br>
            <b>Описание:</b><span>&#160;&#160;&#160; {{product.description}}</span><br>
            <b>Ширина:</b><span>&#160;&#160;&#160; {{product.width}}</span><br>
            <b>Высота:</b><span>&#160;&#160;&#160; {{product.height}}</span><br>
            <b>Длина:</b><span>&#160;&#160;&#160; {{product.length}}</span><br>
            <b>Материал:</b><span>&#160;&#160;&#160; {{product.material}}</span><br>
            <b>Комлектация:</b><span>&#160;&#160;&#160; {{product.complect}}</span><br>            
            <b>Соединение:</b><span>&#160;&#160;&#160; {{product.compound}}</span><br>
            <b>Рекомендация:</b><span>&#160;&#160;&#160; {{product.recommendation}}</span><br>
            <b>Видимость:</b><span>&#160;&#160;&#160; {{product.hidden}}</span><br>
            <b>Наличие:</b><span>&#160;&#160;&#160; {{product.available}}</span><br>               
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn 
                color="primary"
                flat
                @click = "closeShowDialog()">
                Закрыть
            </v-btn>
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
        Вы действительно хотите удалить продукт "<b>{{deletedItem.name}}</b>" ?
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
</v-card>
</template>
<script>
import VueUploadMultipleImage from 'vue-upload-multiple-image'
export default{
    layout: 'admin',
    data(){
        return{
            for_breadcrumd: [
                {href: "/admin/panel", text:"Главная"},
                {href: "/admin/catalog/product", text: "Товары", disabled: true}
            ], 
            headers:[               
                {
                    text: "Наименование",
                    align: "left",
                    value: "name"
                },
                {
                    text: "Категория",
                    value: "catalog_id",
                    align: "center"
                },
                {
                    text: "Цена",
                    value: "price",
                    align: "center"
                },
                {
                    text: "Действие",
                    value: "action",
                    sortable: false,
                    align: "center"
                },              
            ],
            getSuccess: true,
            products:[],   
            pagination: {
                descending: true,
                page: 1,
                rowsPerPage: 4,
                sortBy: "name",
                totalItems: 0,
                rowsPerPageItems: [4,8,12,16]
            },
            openShowDialog: false,
            product: {
                id:0,
                name:"",
                catalog_id:0,
                price:23114,
                colors:[
                    {color: ""}
                ],
                catalog: {
                    name: ""
                },
                description:"",
                width:420,
                height:920,
                length:400,
                material:"",
                complect:"",
                karkas:"",
                images:[
                    {image: ""}
                ],
                compound:"",
                recommendation:0,
                hidden:0,
                available:1
            },
            images: [],
            colors: [],
            createDialog: false,
            c_id: 0,
            c_name: "",
            c_name_r:[
                v => !!v || "Поле наименование обязателен",
                v => (v && v.length <= 50) || "Длина не должен превышать 50 символов"
            ],
            c_price: "",
            c_price_r: [
                v =>!!v || "Поле цена продукта обзателен" ,
                v => /^[0-9]+$/.test(v) || 'Допускаются только цифры без пробела'               
            ],
            c_category: { name: "Hello", id: 0},
            c_category_items:[
                { name: "Ramazan", id: "1"},
                { name: "Almas", id: "2"}
            ],
            c_colors:[],
            c_description: "",
            c_description_r:[
                v => !!v || "Поле описание продукта обязателен"
            ],
            c_images:[],
            c_images_data: [],
            c_height:"",
            c_height_r: [
                
            ],
            c_width:"",
            c_length:"",
            c_material: "",
            c_complect: "",
            c_karkas: "",
            c_compound:"",
            c_hidden: true,
            c_hidden_text: "Видимый",
            c_hidden_number: 0,
            c_available: true,
            c_available_text: "Есть в наличии",
            c_available_number: 1,
            c_recommendation: false,
            c_recommendation_text: "Не добавлено в список рекоммендуемых товаров",
            c_recommendation_number: 0,
            catalog: [],
            formData: [],
            action_title: "Создать новый продукт",
            action_type: 'create',
            loadingDialog: false,
            snackbar: false,
            string_base:"",
            deletedItem:[],
            deleteDialog:false,
             errorDialog: false,
            requestErrorStatus:'',
            requestErrorText: '',
        }
    },
    components: {
        VueUploadMultipleImage
    },
    watch:{
        pagination: {
            handler(){
                this.getSuccess = true;
                 Promise.resolve(this.getProducts(this.pagination.rowsPerPage, this.pagination.page, this.pagination.sortBy, this.pagination.descending))
                .then(response=>{
                        this.products = response.data;                
                        this.pagination.totalItems = response.total; 
                        console.log(response)
                        this.getSuccess = false;               
                    })
                .catch(error=>{
                    console.log(error);
                    this.getSuccess = false;
                });   
            }
        },
        c_colors(val){
            if(val.length>20){
                this.$nextTick(() => this.c_colors.pop())
            }
        },
        c_hidden(val){
            if(val==true) {
                this.c_hidden_text="Видимый";
                this.c_hidden_number=0;
            }
            else {
                this.c_hidden_text="Скрытый";
                this.c_hidden_number=1;
            }
        },
        c_available(val){
            if(val==true) {
                this.c_available_text="Есть в наличии";
                this.c_available_number=1;
            }
            else {
                this.c_available_text="Нет в наличии";
                this.c_available_number=0;
            }
        },
        c_recommendation(val){
            if(val==true){
                this.c_recommendation_text="Добавлено в список рекомендуемых товаров";
                this.c_recommendation_number=1;
                }else{
                this.c_recommendation_text="Не добавлено в список рекмендуемых товаров";
                this.c_recommendation_number=0;
            }
        }

    },
    computed:{
        computedPagination:{
            get(){
                return this.pagination
            },
            set(value){
                this.$emit('update:pagination', value)
            }
        }

    },
    mounted(){    
        Promise.resolve(this.getProducts(this.pagination.rowsPerPage, this.pagination.page, this.pagination.sortBy, this.pagination.descending))
         .then(response=>{
                this.products = response.data;                
                this.pagination.totalItems = response.total; 
                console.log(response)
                this.getSuccess = false;               
            })
            .catch(error=>{
                console.log(error);
                this.getSuccess = false;
            });   
    },
    methods:{
        create(tip, item){
            this.getCatalog();
            if(tip=='create'){
                this.action_type='create';
                this.action_title="Добавить новый продукт";
                this.createDialog=true;
                this.c_images=[];
                this.$refs.createform.reset();
            }else if(tip=='edit'){
                this.c_images=[];
                this.$refs.createform.reset();
                this.loadingDialog=true;
                this.action_type='edit';  
                this.action_title="Обновить данные";   
                Promise.resolve(this.getProduct(item.id))
                .then(response=>{
                        this.c_id=response[0].id;         
                        this.c_name=response[0].name;
                        this.c_category=response[0].catalog_id;
                        console.log(this.c_category);
                        this.c_price=response[0].price;
                        this.c_description=response[0].description;
                        this.c_height=response[0].height;
                        this.c_width=response[0].width;
                        this.c_length=response[0].length;
                        this.c_material=response[0].material;
                        this.c_complect=response[0].complect;
                        this.c_compound=response[0].compound;
                        this.c_karkas=response[0].karkas;
                        if(response[0].hidden==0) this.c_hidden=true;
                        else this.c_hidden=false;
                        if(response[0].available==1) 
                        {
                            this.c_available=true;
                            this.c_available_number=1;
                        }
                        else {
                            this.c_available=false;
                            this.c_available_number=0;
                        }
                        if(response[0].recommendation==0) 
                        {
                            this.c_recommendation=false;
                            this.c_recommendation_number=0;
                        }
                        else {
                            this.c_recommendation=true;
                            this.c_recommendation_number=1;
                            }
                        var images=[];
                        var im =[];
                        var json_images=JSON.parse(response[0].images);
                        if(json_images!=null){
                            json_images.forEach(element=>{   
                                this.getBase64Image(element.image, function(myBase64) {
                                    im ={
                                        "path" : myBase64,
                                        "caption" : ""
                                        }    
                                        images.push(im);
                                });
                            });
                            this.c_images=images;
                        }
                        var colors=[];
                        var json_colors = JSON.parse(response[0].colors);
                        if(json_colors!=null){
                            json_colors.forEach(element => {
                                colors.push(element.color);                            
                            }); 
                            this.c_colors=colors;   
                        }  
                        this.loadingDialog=false;                      
                })                               
                this.createDialog=true;  
            }else{
                this.action_type='unknown';
                alert("Error!");
            }
            
        },
        store(){
            if(this.$refs.createform.validate()){
                this.loadingDialog=true;                
                this.$axios.$post(this.$store.state.base_url+"product",{
                    "name": this.c_name,
                    "catalog_id": this.c_category.id,
                    "price": this.c_price,
                    "description": this.c_description,
                    "width": this.c_width,
                    "height": this.c_height,
                    "length": this.c_length,
                    "material": this.c_material,
                    "complect": this.c_complect,
                    "karkas": this.c_karkas,
                    "compound": this.c_compound,
                    "recommendation": this.c_recommendation_number,
                    "hidden": this.c_hidden_number,
                    "available": this.c_available_number,
                    "images": this.c_images_data,
                    "colors": this.c_colors
                })  
                .then(response=>{
                    this.loadingDialog=false;                    
                    this.snackbar=true;
                    this.c_images=[];
                    this.$refs.createform.reset();
                    console.log(response);
                })
                .catch(error=>{
                    this.loadingDialog=false;
                    this.errorDialog = true;
                    this.requestErrorStatus =error.status;
                    this.requestErrorText=error.data+error.message;
                });    
            }else{    
               alert(this.c_category.id);
            }
        },
        show(product){            
            this.product=product;
            this.colors=JSON.parse(product.colors);
            this.openShowDialog=true;
        },
        closeShowDialog(){
            this.openShowDialog=false;
        },
        update(){
            if(this.$refs.createform.validate()){
                this.loadingDialog=true;
                this.$axios.$put(this.$store.state.base_url+"product/"+this.c_id,{
                    "id": this.c_id,
                    "name": this.c_name,
                    "catalog_id": this.c_category,
                    "price": this.c_price,
                    "description": this.c_description,
                    "width": this.c_width,
                    "height": this.c_height,
                    "length": this.c_length,
                    "material": this.c_material,
                    "complect": this.c_complect,
                    "karkas": this.c_karkas,
                    "compound": this.c_compound,
                    "recommendation": this.c_recommendation_number,
                    "hidden": this.c_hidden_number,
                    "available": this.c_available_number,
                    "images": this.c_images_data,
                    "colors": this.c_colors
                })  
                .then(response=>{
                    this.loadingDialog=false;
                    this.snackbar=true;
                    this.c_images=[];
                    this.createDialog=false;
                    this.$refs.createform.reset();
                    console.log(response);
                })
                .catch(error=>{
                    this.loadingDialog=false;
                   this.errorDialog = true;
                    this.requestErrorStatus =error.status;
                    this.requestErrorText=error.data+error.message;
                });    
            }else{    
                }

        },
        del(item){
            this.deletedItem = item;
            this.deleteDialog=true;
        },
        destroyItem(){
            var id = this.deletedItem.id;
            this.$axios.$delete(this.$store.getters.base_url+'product/'+id)
                .then(response=>{

                    this.deleteDialog = false;
                     Promise.resolve(this.getProducts(this.pagination.rowsPerPage, this.pagination.page, this.pagination.sortBy, this.pagination.descending))
                            .then(response=>{
                                    this.products = response.data;                
                                    this.pagination.totalItems = response.total; 
                                    console.log(response)
                                    this.getSuccess = false;               
                                })
                                .catch(error=>{
                                    console.log(error);
                                    this.getSuccess = false;
                                }); 
                    this.snackbar=true;
                })
                .catch(error=>{
                    this.deleteDialog = false;
                    this.errorDialog = true;
                    this.requestErrorStatus =error.status;
                    this.requestErrorText=error.data+error.message;
                });
        },
        getCatalog(){
            this.$axios.$get(this.$store.state.base_url+"catalog")
            .then(response=>{
                this.c_category_items=response.catalogs;
            })
            .catch(error=>{
                console.log(error);
            })
        },
        async getProducts(rowsPerPage, page, sortBy, descending){
            var products = await this.$axios.$get(this.$store.state.base_url+"product_for_admin_table"+"?rowsPerPage="+rowsPerPage+
                            "&page="+page+"&descending="+descending+"&sortBy="+sortBy);
            return products;           
        },
        async getProduct(id){
            const response = await this.$axios.$get(this.$store.state.base_url+'product/'+id); 
            return response;
        },
        uploadImageSuccess(formData, index, fileList) {
            this.c_images_data = fileList;
            this.formData = formData;
        },
        beforeRemove (index, done, fileList) {
            var r = confirm("Удалить изображение")
            if (r == true) {
                done();
                this.c_images_data = fileList;
                console.log(this.c_images_data);
            } else {
            }
        },
        editImage (formData, index, fileList) {
             this.c_images_data = fileList;
            this.formData = formData;
        },
        dataChange (data) {
            console.log(data)
        },
        getBase64Image(url, callback){
            if(process.browser){
                var str="";
                var xhr = new XMLHttpRequest();
                xhr.onload = function() {
                    var reader = new FileReader();
                    reader.onloadend = function() {
                        callback(reader.result);
                    }
                    reader.readAsDataURL(xhr.response);
                };
                xhr.open('GET', url);
                xhr.responseType = 'blob';
                xhr.send();
            }else{
                alert("Browser is SERVER");
            }
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
.vision_hover:hover{
    color: green;
}
.white-dialog{
    background-color: white;
}
</style>

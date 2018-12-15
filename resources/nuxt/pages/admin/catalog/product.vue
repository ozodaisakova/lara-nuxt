<template>
<div>
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
                        @click="create()"
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
                            @click="edit(props.item)">
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
<v-dialog v-model="createDialog" fullscreen hide-overlay transition="dialog-bottom-transition">
    <v-card>
    <v-toolbar dark color="primary">
        <v-btn icon dark @click="createDialog = false">
        <v-icon>close</v-icon>
        </v-btn>
        <v-toolbar-title>Добавить новый продукт</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
        <v-btn dark flat @click="store()">Сохранить</v-btn>
        </v-toolbar-items>
    </v-toolbar>  
    <v-form ref="createform">  
    <v-layout row wrap class="mx-3  mt-4">
        <v-flex xs12 sm12 md4 class="pa-3">
            <v-text-field
                v-model="c_name"
                label="Наименование"
                :counter="30"
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
                label="Описание продукта">
            </v-textarea> 
        </v-flex>
        <v-flex xs12 sm12 md4 class="pa-3">            
            <v-text-field
                v-model="c_width"
                label="Ширина"
                hint="Напишите в милиметрах (1 метр = 1000 милиметр)">
            </v-text-field>
            <v-text-field
                v-model="c_height"
                label="Высота"
                hint="Напишите в милиметрах (1 метр = 1000 милиметр)">
            </v-text-field>
            <v-text-field
                v-model="c_length"
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
        </v-flex>
    </v-layout>
    </v-form>
    </v-card>
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
            <b>Картинки:</b>
            <v-layout>
            <v-flex xs12 sm6 offset-sm3>
            <v-card>
                <v-container grid-list-sm fluid>
                <v-layout row wrap>
                    <v-flex
                        v-for="(item, i) in images"
                        :key="i">
                    <v-card flat tile class="d-flex">
                        <v-img
                        :src="item.image"
                        aspect-ratio="1"
                        class="grey lighten-2">
                        <v-layout
                            slot="placeholder"
                            fill-height
                            align-center
                            justify-center
                            ma-0>
                            <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                        </v-layout>
                        </v-img>
                    </v-card>
                    </v-flex>
                </v-layout>
                </v-container>
            </v-card>
            </v-flex>
        </v-layout>                  
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn 
                color="primary"
                flat
                @click = "openShowDialog=!openShowDialog">
                Закрыть
            </v-btn>
        </v-card-actions>
    </v-card>
</v-dialog>
</div>
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
                id:3,
                name:"",
                catalog_id:1,
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
                complect:null,
                karkas:"",
                images:[
                    {image: ""}
                ],
                compound:null,
                recommendation:null,
                hidden:0,
                available:1
            },
            images: [],
            colors: [],
            createDialog: false,
            c_name: "",
            c_name_r:[
                v => !!v || "Поле наименование обязателен",
                v => v.length <= 30 || "Длина не должен превышать 30 символов"
            ],
            c_price: "",
            c_price_r: [
                v =>!!v || "Поле цена продукта обзателен" ,
                v => /^[0-9]+$/.test(v) || 'Допускаются только цифры'               
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
            c_width:"",
            c_length:"",
            c_material: "",
            c_complect: "",
            c_compound:"",
            c_hidden: true,
            c_hidden_text: "Видимый",
            c_available: true,
            c_available_text: "Есть в наличии",
            catalog: [],
            formData: []
        }
    },
    components: {
        VueUploadMultipleImage
    },
    watch:{
        pagination: {
            handler(){
                this.getProducts(this.pagination.rowsPerPage, this.pagination.page, this.pagination.sortBy, this.pagination.descending);
            }
        },
        c_colors(val){
            if(val.length>20){
                this.$nextTick(() => this.c_colors.pop())
            }
        },
        c_hidden(val){
            if(val==true) this.c_hidden_text="Видимый";
            else this.c_hidden_text="Скрытый";
        },
        c_available(val){
            if(val==true) this.c_available_text="Есть в наличии";
            else this.c_available_text="Нет в наличии";
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
        this.getProducts(this.pagination.rowsPerPage, this.pagination.page, this.pagination.sortBy, this.pagination.descending);
    },
    methods:{
        create(){
            this.createDialog=true;
            this.getCatalog();
        },
        store(){
            if(this.$refs.createform.validate()){
                // this.$axios({
                //     method: "POST",
                //     url: this.$store.state.base_url+"product",
                //     data:{
                //         hello: "hello",
                //         files: this.c_images
                //     }
                // })
                // .then(response=>{
                //     console.log(response);
                // })
                // .catch(error=>{
                //     console.log(error);
                // });  
                this.$axios.$post(this.$store.state.base_url+"product",{
                    "myfiles": this.fileList,
                    hello: "hello",
                })  
                .then(response=>{
                    console.log(response);
                })
                .catch(error=>{
                    console.log(error);
                });    



                // this.$axios.$post(this.$store.state.base_url+"product",
                // {
                //     name=this.c_name,
                //     price=this.c_price,
                //     category_id=this.c_category.id,
                //     colors=this.c_colors,
                //     description=this.c_description,
                //     width=this.c_width,
                //     height=this.c_height,
                //     length=this.c_length,
                //     material=this.c_material,
                //     complect=this.c_complect,
                //     compound=this.c_compound,
                //     images=this.c_images,

                // })
            }else{    
                console.log(this.formdata);  
                console.log("ERROR")
            }
        },
        show(product){
            this.openShowDialog=true;
            this.getProduct(product.id);
        },
        edit(){

        },
        del(){

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
        getProducts(rowsPerPage, page, sortBy, descending){
            this.$axios.$get(this.$store.state.base_url+"product_for_admin_table"+"?rowsPerPage="+rowsPerPage+
                            "&page="+page+"&descending="+descending+"&sortBy="+sortBy)
            .then(response=>{
                this.products = response.data;                
                this.pagination.totalItems = response.total; 
                this.getSuccess = false;               
            })
            .catch(error=>{
                console.log(error);
                this.getSuccess = false;
            });                 
        },
        getProduct(id){
            this.$axios.$get(this.$store.state.base_url+'product/'+id)
            .then(response=>{
                this.product=response[0];
                this.images=JSON.parse(response[0].images);
                this.colors=JSON.parse(response[0].colors);
            })
            .catch(error=>{
                console.log(error);
            })
        },
        uploadImageSuccess(formData, index, fileList) {
            console.log('FORMDATA = ', formData,', \n INDEX = ', index, ', \n FILELIST = ',fileList)
            this.c_images_data = fileList;
            this.formData = formData;
            // console.log(index);
            console.log(fileList);
            // Upload image api
            // axios.post('http://your-url-upload', { data: formData }).then(response => {
            //   console.log(response)
            // })
        },
        beforeRemove (index, done, fileList) {
            console.log('index', index, fileList)
            var r = confirm("Удалить изображение")
            if (r == true) {
                done()
            } else {
            }
        },
        editImage (formData, index, fileList) {
            console.log('edit data', formData, index, fileList)
        },
        dataChange (data) {
            console.log(data)
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

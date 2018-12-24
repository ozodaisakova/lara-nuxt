<template>
<div>
  <v-breadcrumbs
      class="hidden-sm-and-down"
      v-bind:items="for_breadcrumd">                        
  </v-breadcrumbs>
  <v-layout v-if="preloader==true"  align-center   style="height:80vh;">
        <v-flex d-flex>
            <div class="text-xs-center">
                <v-progress-circular
                    :size="70"
                    :width="7"
                    color="primary"
                    indeterminate></v-progress-circular>
            </div>
        </v-flex>
    </v-layout>
    <any-error v-if="error==true" v-bind:error_code="error_code" v-bind:error_name="error_name"></any-error>
  <div v-else>
    <div v-if="products.length==[]">
      <v-card class="pa-2 text-xs-center">
        <v-alert :value="true"
      type="error">Ваша корзина пустая</v-alert>
      </v-card>
    </div>
    <v-stepper xs12 sm12 md12 v-else  v-model="e6"  >
      <div v-if="hidden_header==false">
        <span></span>
      </div>
  <v-stepper-header v-else>
    <v-stepper-step  
      
        :complete="e6 > 1" 
        step="1"
        >
      Шаг 1: Выбор продукта 
      <small>Выберите количество и цвет продукта</small>
    </v-stepper-step>
    <v-stepper-step 
        :complete="e6 > 2" 
            step="2"
            >
        Шаг 2 : Заполнение данных
         <small>Заполните следующие формы </small>
    </v-stepper-step> 
    <v-stepper-step 
        :complete="e6 > 3" 
            step="3"
            >
        Шаг 3 : Оплата
        <small>Оплата продукта</small>
    </v-stepper-step>
    <v-stepper-step
        step="4"
        >
        Шаг 4 : Завершение
        <small>Завершение заказа</small>
    </v-stepper-step>
  </v-stepper-header>    
    <v-stepper-content step="1">
        <cart-product 
            v-for="product in products"
            :key="product.id"
            v-bind:product="product"
            @vals="onVals"
            @delItem="deleteItem"
            />       
          <p class="ml-2 mt-4 title">
            <b>Итоговая цена:</b> 
            {{total_price}}тг
            </p> 
      <v-btn color="primary" @click="e6 = 2">Оформить заказ</v-btn>
    </v-stepper-content>       
    <v-stepper-content step="2">
          <v-layout row wrap>
           <v-flex xs12 sm3 md3 d-flex ></v-flex>
        <v-flex xs12 sm6 md6 class="">
          <v-card class="my-1 ">
             <div class="text-xs-center py-4 "><v-icon x-large >edit</v-icon></div>
        <v-form  v-model="valid" class="pa-2" lazy-validation ref="form">
            <v-text-field
            v-model="client_name"       
            :rules="nameRules"
            :counter="30"
            outline
            append-icon="person"
            label="Ф. И. О."
            required></v-text-field>
            <v-text-field
              v-model="client_phone"
              :rules="phoneRules"
              outline
              label="Номер телефона"
              mask="phone"
              append-icon="phone">
            </v-text-field>           
          <v-text-field  
            v-model="client_email"    
            :rules="emailRules"
            append-icon="email"
            label="Адрес вашей электронной почты"
            outline
            required></v-text-field>
          <v-textarea
              v-model="client_adress"
              :rules="adressRules"
              name="input-7-1"
              label="Ваш адрес"
              value=""
              hint="Область, город, дом"
              outline
              required></v-textarea>
        </v-form>
         </v-card>
        </v-flex>
        <v-flex xs12 sm3 md3 d-flex></v-flex>
        </v-layout>
        <v-dialog
          v-model="dialog"
          max-width="290">
          <v-card>
            <v-card-title class="headline red--text">Ошибка</v-card-title>
            <v-card-text class="red--text lighten-2 text-xs-jsutify">
              Вы должны заполнить и проверить  все поля. Ошибки показаны в нижнем краю текстого поле
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="error"
                flat="flat"
                @click="dialog = false">
                Закрыть
              </v-btn>              
            </v-card-actions>
          </v-card>
    </v-dialog>
      <v-btn color="primary" @click="checkForm()">Следующий</v-btn>
      <v-btn flat  @click="e6=1">Предыдущий</v-btn>
    </v-stepper-content>    
    <v-stepper-content step="3">
      <div color="grey lighten-5" class="mb-5 "  >
        <v-layout row wrap>
           <v-flex xs12 sm3 md3 d-flex ></v-flex>
        <v-flex xs12 sm6 md6 class="pt-3">
          <v-card>
            <div class="text-xs-center pt-5"><v-icon x-large >edit</v-icon></div>
            <v-form v-model="cardValid" lazy-validation ref="payload">                     
                <v-text-field
                  v-model="card_person"
                  :rules="cardPersonRules"
                  outline
                  d-flex
                  label="Держатель карты"
                  append-icon="person"
                  hint="Напишите  имю и фамилию  с латинскими буквами через пробел, как в карточке"
                  class="px-2 pt-4 pb-3"
                  required>
                </v-text-field>
                <v-text-field
                  v-model="card_number"
                  :rules="cardNumberRules"
                  outline
                  d-flex
                  mask="credit-card"
                  label="Номер карты"
                  append-icon="credit_card"
                  class="px-2"
                  required>
                </v-text-field>
                <h5 class="pl-2 mb-3 subheading">Срок действия карты и CSV код</h5>
                <v-layout row wrap>
                  <v-flex xs4 md4 sm4>
                    <v-select
                        v-model="card_month"
                        :rules="cardMonthRules"
                        :items="month"
                        label="Месяц"
                        outline
                        class="pl-2 "
                        required>
                    </v-select>
                  </v-flex>
                  <v-flex xs4 md4 sm4>
                    <v-select
                        v-model="card_year"
                        :rules="cardYearRules"
                        :items="year"
                        label="Год"
                        outline
                        class="pr-2 pl-2"
                        required>
                    </v-select>
                  </v-flex>
                  <v-flex xs4 md4 sm4>
                    <v-text-field
                      v-model="card_csv"
                      :rules="cardCSVRules"
                      outline
                      hint="На обратном стороне карты"
                      d-flex
                      :counter="3"
                      label="CSV-код"
                      class="pr-2"
                      required>
                    </v-text-field>             
              </v-flex>
            </v-layout>              
            </v-form> 
          </v-card>
        </v-flex>
        <v-flex xs12 sm3 md3 d-flex></v-flex>
        </v-layout>
      </div>
      <v-btn :disabled="pay" :loading="pay" color="primary" @click.native="doPay()">Следующий</v-btn>
      <v-btn flat @click="e6=2">Предыдущий</v-btn>
    </v-stepper-content>    
    <v-stepper-content step="4">
      <v-card color="" class="mb-5">
        <v-layout row wrap class="pa-4">
          <v-flex xs12 sm12 md12>
            <v-alert
              type="success"
              :value="success_pay">
              Ваш заказ принят!
            </v-alert>
            <v-alert
              type="error"
              :value="error_pay">
              Что-то пошло не так, попробуйте позднее!
            </v-alert>
          </v-flex>          
                   
        </v-layout>
      </v-card>
    </v-stepper-content>
  </v-stepper>
  </div>
</div>  
</template>
<script>
import CartProduct from '~/components/CartProduct.vue'
import AnyError from '~/components/errors/AnyError.vue'
  export default {
    head:{
      title: 'Ваша корзина'

    },
    data () {
      return {
        e6: 1,
        count: 1,
        color: '',
        urla: '', 
        product:[],
        images:[],
        colors:[{"color":"Нет вариантов"}],
        preloader: true,
        item: 1,
        valid: false,
        cardValid: false,   
        client_phone: '',        
        nameRules: [
          v => !!v || 'Поле имя обязателен',
          v => v.length <= 30 || 'Длина не должен превышать 30 символов'
        ], 
        phoneRules:[
          v => !!v || 'Поле номер телефона обязателен',
        ] ,    
        surnameRules: [
          v => !!v || 'Поле фамилия обязателен',
          v => v.length <= 30 || 'Длина не должен превышать 30 символов'
        ],       
        adressRules: [
          v => !!v || 'Поле адресс обязателен',
        ],        
        emailRules: [
          v => !!v || 'Поле почта обязателен',
          v => /.+@.+/.test(v) || 'Некорректный адрес почты'
        ],
        cardPersonRules: [
          v => !!v || 'Поле держатель карты обязателен',
          v => /^[A-Za-z]+\s/.test(v) || 'Напишите  имю и фамилию  с латинскими буквами через пробел, как в карточке'
        ],
        cardNumberRules:[
          v => !!v|| 'Поле номер карты обязателен',
          v => /^[0-9]+$/.test(v) || 'Допускаются только цифры'
        ],
        cardMonthRules:[
          v => !!v || 'Выберите месяц'
        ],
        cardYearRules:[
          v => !!v || 'Выберите год'
        ],
        cardCSVRules: [
          v => !!v || 'Заполните этот поле',
          v => /^[0-9]+$/.test(v) || 'Допускаются только цифры',
          v => v.length == 3 || 'Длина CSV кода должен быть равен на 3 символа'
        ],
        month: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
        year: ['2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025'],
        dialog:false,
        pay: false,
        product_color:'',
        product_id: 0,
        product_count: 0,
        client_name: '',
        client_surname: '',
        client_email: '',
        client_adress:'',
        card_person:'',
        card_number:'',
        card_month:'',
        card_year: '',
        card_csv: '',
        error: false,
        error_name: 'Не определен',
        error_code: '',
        todos: [
          { name: "title",  description: "sdcsdc"},
          { name: "title",  description: "sdcsdc"},
          { name: "title",  description: "sdcsdc"},
        ],
        success_pay: false,
        error_pay: false,
        products: [],
        order_products:[],
        for_breadcrumd: [
          {href: "/", text:"Главная"},
          {href: "/cart", text:"Ваша корзина", disabled: true},
          ],
        cart_products: [],
        user: null,
        user_id: 0,
        hidden_header: false
      }
    },
    components:{
      AnyError,
      CartProduct
    },
    computed:{
        total_price: function(){
            var str = this.$store.getters.total_price.toString();
            return str.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
        }
    },
    watch:{
      e6: function(val){
        if(val!=1) this.hidden_header=true;
        else this.hidden_header=false;
      }
    },
    mounted(){
        if(localStorage.user) {
          this.user = JSON.parse(localStorage.getItem('user'));
          this.user_id = this.user.id;
        }
        this.$store.state.total_price=0;
        var arr =[];
        arr= JSON.parse(localStorage.getItem('cart_product_list'));        
        if(arr.length>0){
          arr.forEach(element => {
            var product = {
              id: element,
              count: 1,
              color: 'Не выбрано'
            }
            this.cart_products.push(product);            
          });
        }
        console.log("CART PRODUCTS", this.cart_products);
        Promise.resolve(this.getProduct(arr))
            .then(response=>{
                this.products = response;  
                this.preloader = false;              
            })
            .catch(error=>{
              this.error_code="---"
              this.error_name="Потерено соединение с сервером";
              this.error=true;
              this.preloader=false;
            })
        
    },
    methods:{
        onVals(data){
          this.cart_products.forEach(i=>{
            if(data.id == i.id){
              i.color = data.color;
              i.count = data.count
            }
            console.log("CART PRODUCTS CHANGE ",  this.cart_products)
          })                     
        },
        deleteItem(data){
          this.cart_products.forEach((product, index)=>{
            if(product.id==data.id){
              this.cart_products.splice(index, 1);
              console.log("CART PRODUCTS DELETE ",  this.cart_products)
            }
          })
            var price = data.price*data.count;
            this.$store.dispatch('decrement_price', price);
            this.products= this.products.filter(function(value, index, arr){
                return value.id!=data.id
            })
            this.$store.dispatch("removeCart", data.id);
            },
        arrayRemove(arr, value) {
            return arr.filter(function(ele){
                return ele != value;
            });
        },
        exportToPDF(){
          var columns = [
            {title: "Name", dataKey: "name" },
            {title: "Description", dataKey: "description"}
          ];
        },
        doPay(){
          if(this.$refs.payload.validate()){
            this.$axios.$post(this.$store.getters.base_url+'productorder',{
              'user_id': this.user_id,
              'cart_products': this.cart_products,
              'user_name': this.client_name,
              'user_phone': this.client_phone,
              'user_email': this.client_email,
              'user_adress': this.client_adress,
              'total_price': this.$store.getters.total_price
            })
            .then(response=>{
             this.success_pay=true;
             var str = '[]';
                       this.e6=4;
             localStorage.setItem('cart_product_list', str);
             localStorage.setItem('cart_product_count', '0');
             this.$store.state.cart_count =0;
           })
           .catch(e=>{
              this.e6=4;
             this.error_pay = true;
             if(e.response.status==400){
               this.error_code='400';
               this.error_name="ОШИБКА ЗАПРОСА!";
               this.error=true;
             }else if(e.response.status==404){
               this.error_code="404";
               this.error_name="СТРАНИЦА НЕ НАЙДЕНО!";
               this.error=true;
             }else{
               this.error_code=e.response.status;
               this.error_name="ОШИБКА СЕРВЕРА!";
               this.error=true;
             }
           });
            
          }else{
            this.dialog=true;
          }
        },
       checkForm(){
         if(this.$refs.form.validate()){
           this.e6=3;
           console.log(this.product.id+"|"+this.item+"|"
           +this.product_color +"|"+this.client_name +"|"+this.client_surname+
           "|"+this.client_email+"|"+this.client_adress);
         }else{
           this.pay=true;
           this.dialog = true;
           this.pay=false;
         }          
        },
       plusItem(item){
                if(item<20)
                this.item=item+1;
            },
        minusItem(item){
            if(item>1){
                this.item=item-1;
            }
        },
        async getProduct(arr){
              const response = await this.$axios.$post(this.$store.getters.base_url+"cart", {
                  'arr': arr});
              return response;     
            }
      
      },
  }
</script>

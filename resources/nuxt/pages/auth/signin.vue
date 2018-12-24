<template>
<v-layout row align-center style="height: 90vh;">
    <!-- <v-flex xs12 md4 sm3  class="hidden-s-and-down"></v-flex> -->
    <v-spacer></v-spacer>
    <v-flex xs12 md4 sm6  >
        <v-card class="pa-4  ozi-box">
            <v-form v-model="valid" ref="form" lazy-validation>
                <div class="text-xs-center">
                    <v-icon 
                    size="50px"
                    >edit</v-icon>
                </div>
                <v-text-field
                    v-model="form.email"
                    :rules="emailRules"
                    label="Email"
                    append-icon="email"
                    required
                    :counter="30"
                    ></v-text-field>
                <v-text-field
                    v-model="form.password"
                    :append-icon="passwordShow ? 'visibility' : 'visibility_off'"
                    :type="passwordShow ? 'text':'password'"
                    label="Пароль"
                    :rules="passwordRules"
                    counter="30"
                    required
                    @click:append="passwordShow = !passwordShow">
                </v-text-field>
        </v-form>
        <v-layout class="mt-4" >
            <v-btn  
                flat    
                :to="'\signup'"                    
                color="primary">
                Регистрация
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn    
                :loading="loading"                          
                color="error"
                @click="submit">
                Вход
            </v-btn>
        </v-layout>                 
    </v-card>
    </v-flex>
    <v-spacer></v-spacer>
<v-snackbar
top
v-model="snackbar"
class="text-xs-center">
    Неправильный email или пароль!
<v-btn
    color="pink"
    flat
    small
    @click="snackbar = false">Закрыть</v-btn>
</v-snackbar>
</v-layout>
</template>
<script>
export default {
    layout: 'particle',
    middleware:'guest',
	head(){
	   return {
	     titleTemplate: "Авторизация поьзователя"
	   }
	},
    data: () => ({
        valid: false,
        form:{
            email:'',
            password:''
        },
        email: '',
        emailRules: [
        v => !!v || 'Поле email обязателен',
        v => /.+@.+/.test(v) || 'Некорректный адрес почты',
        v => v.length <= 30 || 'Адрес электронный почты не должен превышать 30 символов'
        ],
        password: '',
        passwordRules: [
        v => !!v || 'Поле пароль обязателен',
        v => v.length <= 30 || 'Пароль не должен превышать 30 символов',
        v => v.length >= 6 || 'Пароль должен быть не менее 6 символов'
        ],
        passwordShow: false,
        loading: false,
        snackbar: false
    }),
    methods:{
        submit(){
            if(this.$refs.form.validate()){
                this.login();
            }else{
                alert("No")
            }
        },
        login(){
			let formData = this.form;
			this.loading = true;
			this.$store.dispatch('login',formData).then((res)=>{
				this.loading = false;
				this.$router.push('/');
			},(error)=>{
                this.loading = false;
                this.snackbar = true;
			});
		}
    }

}
</script>
<style >
.ozi-box{
  border-radius: 10px;
  box-shadow: 0px 0px 90px rgba(0, 0, 0, 0.30);
  /* box-shadow: 11px 10px 16px 0px rgba(0, 0, 0, 0.18); */
  background-color: rgba(255, 255, 255, 0.97) !important;

}
</style>


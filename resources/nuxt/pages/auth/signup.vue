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
                    v-model="form.name"
                    :rules="nameRules"
                    :counter="30"
                    label="Имя"
                    append-icon="person"
                    required
                    ></v-text-field>
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
                <v-text-field
                    v-model="passwordConf"
                    :append-icon="passwordConfShow ? 'visibility' : 'visibility_off'"
                    :type="passwordConfShow ? 'text':'password'"
                    label="Повторите пароль"
                    :error-messages='passConf()'
                    :rules="passwordConfRules"
                    counter="30"
                    required
                    @click:append="passwordConfShow = !passwordConfShow">
                </v-text-field>
        </v-form>
        <v-layout class="mt-4" >
            <v-btn  
                flat    
                :to="`\signin`"                    
                color="primary">
                Войти
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn  
                :loading="loading"                           
                color="error"
                @click="submit">
                Регистрация
            </v-btn>
        </v-layout>                 
    </v-card>
    </v-flex>
    <v-spacer></v-spacer>
<v-snackbar
    top
    v-model="snackbar"
    class="text-xs-center">
    Пользователь с таким email уже зарегистровован!
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
	     titleTemplate: "Регистрация пользователя"
	   }
	},
    data: () => ({
        loading: false,
        valid: false,
        form:{
				name:'',
				email:'',
				password:''
			},
        nameRules: [
        v => !!v || 'Поле имя пользователя обязателен',
        v => v.length <= 30 || 'Имя не должен превышать 30 символов'
        ],
        emailRules: [
        v => !!v || 'Поле email обязателен',
        v => /.+@.+/.test(v) || 'Некорректный адрес почты',
        v => v.length <= 30 || 'Адрес электронный почты не должен превышать 30 символов'
        ],
        passwordRules: [
        v => !!v || 'Поле пароль обязателен',
        v => v.length <= 30 || 'Пароль не должен превышать 30 символов',
        v => v.length >= 6 || 'Пароль должен быть не менее 6 символов'
        ],
        passwordShow: false,
        passwordConf: '',
        passwordConfRules: [
        v => !!v || 'Поле пароль обязателен',
        v => v.length <= 30 || 'Пароль не должен превышать 30 символов',
        v => v.length >= 6 || 'Пароль должен быть не менее 6 символов',
        ],
        passwordConfShow: false,
        snackbar: false,
    }),
    methods:{
        submit(){
            if(this.$refs.form.validate()){
                this.register();
            }
        },
        register(){
			let formData = this.form;
			this.loading = true;
			this.$store.dispatch('register',formData).then((res)=>{
				this.loading = false;
				this.$router.push('/auth/signin');
			},(error)=>{
                this.loading = false;
                this.snackbar=true;                
			});
        },
        passConf(){
            return (this.form.password === this.passwordConf) ? '' : 'Пароли не совпадают'
        }
    }

}
</script>
<style>
.ozi-box{
  border-radius: 10px;
  box-shadow: 0px 0px 90px rgba(0, 0, 0, 0.30);
  /* box-shadow: 11px 10px 16px 0px rgba(0, 0, 0, 0.18); */
  background-color: rgba(255, 255, 255, 0.97) !important;

}
</style>


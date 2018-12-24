<template>
<div>
<v-breadcrumbs :items="for_breadcrumd" divider="/"></v-breadcrumbs>
<v-card class="pa-2">
    <v-layout row wrap>
        <v-flex class="hidden-sm-and-down" md7>
            <v-img src="/img/user-register.svg" aspect-ratio="1.4"></v-img>
        </v-flex>
        <v-flex xs12 sm12 md5 class="px-2">
           <v-form v-model="valid" ref="form" lazy-validation>
                <div class="text-xs-center">
                    <v-icon 
                    size="80px"
                    >account_circle</v-icon>
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
                <v-btn 
                    color="primary"
                    @click="submit"
                    class="my-2 mb-5"
                    block>
                    Обновить профиль
                </v-btn>
        </v-flex>
    </v-layout>    
</v-card>
</div>
</template>
<script>
export default {
    head:{
        title:'Профиль пользователя'
    },
    data(){
        return{
                for_breadcrumd: [
                {href: "/", text:"Главная"},
                {href: "/user/profiel", text: "Профиль пользователя", disabled: true}
            ],
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
        user: []
        }
    },
    mounted(){
        if(localStorage.user){
            this.user=JSON.parse(localStorage.getItem('user'));
            this.form.name=this.user.name;
            this.form.email=this.user.email;
        }else{
            this.$router.push('/');
        }

    },
    methods:{
        submit(){
            if(this.$refs.form.validate()){
                this.update();
            }
        },
        
        update(){
			let formData = this.form;
			this.loading = true;
            this.$axios.$put('/api/auth/update',
            {
                'id': this.user.id,
                'name': formData.name,
                'email': formData.email,
                'password': formData.password
            },
            {
                headers:{
                    "Authorization":"Bearer "+this.user.token
                },
            },
            )
            .then((res)=>{
				this.loading = false;
                localStorage.removeItem('user');
                if(process.browser){
                    window.location.href="/auth/signin";
                }
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

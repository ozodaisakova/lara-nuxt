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
                    v-model="name"
                    :rules="nameRules"
                    :counter="30"
                    label="Имя"
                    append-icon="person"
                    required
                    ></v-text-field>
                <v-text-field
                    v-model="surname"
                    :rules="surnameRules"
                    :counter="30"
                    label="Фамилия"
                    append-icon="person"
                    required
                    ></v-text-field>
                <v-text-field
                    v-model="email"
                    :rules="emailRules"
                    label="Email"
                    append-icon="email"
                    required
                    :counter="30"
                    ></v-text-field>
                <v-text-field
                    v-model="password"
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
                color="error"
                @click="submit">
                Регистрация
            </v-btn>
        </v-layout>                 
    </v-card>
    </v-flex>
    <v-spacer></v-spacer>
</v-layout>
</template>
<script>
export default {
    layout: 'particle',
    data: () => ({
        valid: false,
        name: '',
        nameRules: [
        v => !!v || 'Поле имя пользователя обязателен',
        v => v.length <= 30 || 'Имя не должен превышать 30 символов'
        ],
        surname: '',
        surnameRules: [
        v => !!v || 'Поле фамилия пользователя обязателен',
        v => v.length <= 30 || 'Фамилия не должен превышать 30 символов'
        ],
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
        passwordConf: '',
        passwordConfRules: [
        v => !!v || 'Поле пароль обязателен',
        v => v.length <= 30 || 'Пароль не должен превышать 30 символов',
        v => v.length >= 6 || 'Пароль должен быть не менее 6 символов',
        ],
        passwordConfShow: false,
    }),
    methods:{
        submit(){
            if(this.$refs.form.validate()){
                alert("Yes");
            }
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


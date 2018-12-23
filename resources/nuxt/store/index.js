import { getLocalUser } from '../helpers/auth';
import Vuex from 'vuex'
const user = getLocalUser();
import axios from 'axios';

/*
for API calls on Guarded routes use Authorization Header
Example:
axios.get('/some/route',{
	headers:{
		"Authorization":"Bearer "+context.state.currentUser.token
	}
})
.then((response)=>{
	console.log(response);
});
*/


const createStore = () => {
  return new Vuex.Store({
		state:{
			currentUser:user,
			isLoggedIn:!!user,
			loading:false,
			authErr:null,
			alert:{
				msg:'',
				status:'primary'
			},
			base_url: 'api/v1/',
			cart_count: 0,
			total_price: 0
		},
		getters:{
			base_url:state=>{
				return state.base_url;
			},
			isLoading(state){
				return state.loading;
			},
			isLoggedIn(state){
				return state.isLoggedIn;
			},
			currentUser(state){
				return state.currentUser;
			},
			authError(state){
				return state.authErr;
			},
			getMessage(state){
				return state.alert;
			},
			cart_count:state=>{
				return state.cart_count;
			},
			total_price:state=>{
				return state.total_price
			}
		},
		mutations:{
			loginSuccess(state,payload){
				state.authErr = null;
				state.isLoggedIn = true;
				state.loading = false;
				state.alert.msg = "Howdy! You have been Logged in...";
				state.alert.status = "success";
				state.currentUser = Object.assign({},payload.user,{token:payload.access_token});
				localStorage.setItem("user",JSON.stringify(state.currentUser));
			},
			setUser(state){
				localStorage.setItem("user",JSON.stringify(state.currentUser));
			},
			setToken(state,payload){
				state.currentUser.token = payload;
			},
			loginFailed(state){
				state.loading = false;
				state.authErr = true;
				state.alert.msg = "Login failed, Please try again";
				state.alert.status = "error";
			},
			logout(state){
				state.alert.msg = "You have been Logged out...";
				state.alert.status = "primary";
				localStorage.removeItem("user");
				state.isLoggedIn = false;
				state.currentUser = null;
				state.loading = false;
			},
			toggleLoading(state,bool){
				state.loading = bool;
			},
			setAlert(state,payload){
				state.alert.msg = payload.msg;
				state.alert.status = payload.status;
				setTimeout(()=>{
					state.alert.msg=''
					state.alert.status=''
				},5000)
			},
			setAuthError(state,payload){
				state.authErr = payload;
			},
			INCREMENT_TOTAL_PRICE(state, value){
				state.total_price = state.total_price+value
			},
			DECREMENT_TOTAL_PRICE(state, value){
				state.total_price = state.total_price-value
			},
			INCREMENT_CART(state, value){
				state.cart_count = state.cart_count+value;
			},
			DECREMENT_CART(state, value){
				state.cart_count = state.cart_count-value;
			},
			SET_LANG(state, locale){
				if(state.locales.indexOf(locale)!==-1){
					state.locale = locale
				}
			}
		},
		actions:{	
			to_cart(store, id){
				if(process.browser){
					var arr = [];
					var i=0;
					arr = JSON.parse(localStorage.getItem('cart_product_list'));
					if(arr!=null){
						for(var element in arr){
							if(parseInt(arr[element])==parseInt(id)) {
								i=1;
							}
						}
					}
					if(i==0){
						arr.push(id);
						var str = JSON.stringify(arr);
						localStorage.removeItem['cart_product_list'];
						localStorage.setItem('cart_product_list', str);
						var count = parseInt(localStorage.getItem('cart_product_count'));
						count++;
						localStorage.setItem('cart_product_count', count.toString());
						store.commit('INCREMENT_CART', 1);
					}					
				}
			},	
			removeCart(store, id){
				if(process.browser){
					var arr = [];
					var i=0;
					arr = JSON.parse(localStorage.getItem('cart_product_list'));
					if(arr!=null){
						for(var element in arr){
							if(parseInt(arr[element])==parseInt(id)) {
								arr.splice(element, 1);
							}
						}
					}
					var str="";
					localStorage.removeItem('cart_product_list');
					str = JSON.stringify(arr);
					localStorage.setItem('cart_product_list', str);
					var count = localStorage.getItem('cart_product_count');
					count--;
					localStorage.setItem('cart_product_count', count);					
					store.commit('DECREMENT_CART', 1);					
				}
			},
			increment_price(store, value){
				store.commit('INCREMENT_TOTAL_PRICE', value);
			},
			decrement_price(store, value){
				store.commit('DECREMENT_TOTAL_PRICE', value);
			},
			increment_cart(store, value){
				store.commit('INCREMENT_CART', value);
			},
			decrement_cart(store, value){
				store.commit('DECREMENT_CART', value);
			},
			showAlert(context,payload){
				context.commit('setAlert',payload);
			},
			isImAlive(context){
				if(context.getters.isLoggedIn){
					return new Promise((resolve, reject) => {
						axios.post('/api/auth/me',{
							checkAuth:'checkAuth'
						},{
							headers:{
								"Authorization":"Bearer "+context.state.currentUser.token
							}
						}).then((res) => {
							resolve("authorised")
						},(error)=>{
							// context.commit('logout');
							reject("unauthorized")
						});
					});
				}
			},
			postLogIn(context,payload){
				context.commit('toggleLoading',true);
				axios.post('/api/auth/signedin',{
					credentialsId:payload.user.id,
					credentialsType:payload.type
				}).then((response)=>{
					// console.log(response)
					context.commit('loginSuccess',response.data);
				},(error)=>{
					// console.log(error)
					context.commit('loginFailed',error);
				})

			},
			getSignOut(context){
				context.commit('toggleLoading',true);
				context.commit('logout');
			},
			login(context,payload){
				return new Promise((resolve, reject) => {
					axios.post('/api/auth/login',payload).then((response)=>{
						context.commit('loginSuccess',response.data)
						resolve('success')
					},(error)=>{
						context.commit('loginFailed')
						reject('failed')
					});
				});
			},
			register(context,payload){
				return new Promise((resolve, reject) => {
					axios.post('/api/auth/register',payload).then((response)=>{
						console.log(response)
						context.commit('setAlert',{
							msg:response.data.user.name+" Registered Success, Proceed for login",
							status:"success"
						})
						resolve('success')
					},(error)=>{
						context.commit('setAlert',{
							msg:"Registration failed",
							status:"error"
						})
						reject('failed')
					});
				});
			},
			refreshToken(context){
				return new Promise((resolve, reject) => {
					axios.post('/api/auth/refresh',{
						refresh:true
					},{
						headers:{
							"Authorization":"Bearer "+context.state.currentUser.token
						}
					}).then((response)=>{
						context.commit('setToken',response.data.access_token);
						context.commit('setUser');
						resolve('success')
					},(error)=>{
						reject('failed')
					});
				});
			},
			postFormData(context,payload){
				context.commit('toggleUpLoading',true);
				var form = new FormData();
				form.append('title',payload.title);
				form.append('body',payload.body);
				for(let i=0; i<payload.images.length;i++){
					form.append('image'+i,payload.images[i]);
				}
				axios.post('/api/post/save',form,{
					onUploadProgress:(e) => {
						if(e.lengthComputable)
						{
							context.commit('updateProgress',e);
						}
					},
					headers:{
						"Authorization":"Bearer "+context.state.currentUser.token,
						'content-type': 'multipart/form-data'
					}
				}).then((res) => {
					context.commit('showAlert',"Data Stored success");
					context.dispatch('getItems',1);
					context.commit('dataStored',true);
					context.commit('toggleUpLoading',false);
					// console.log(res)

				},(error) => {
					context.commit('toggleUpLoading',false);
					
					context.commit('showAlert',"Failed to store data, Check inputs");
				});
			}
		}
	})
}
export default createStore;
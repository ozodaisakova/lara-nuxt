export default function({redirect}){
    if(process.browser){        
        if(localStorage.user){
            var user = JSON.parse(localStorage.getItem('user'));
            if(user.role!='admin') return  redirect('/auth/signin');
        }else{
            return  redirect('/auth/signin');
        }
    }
}
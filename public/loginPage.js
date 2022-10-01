const userForm = new UserForm;
userForm.loginFormCallback = data => {
    ApiConnector.login(data, respons => {
        if(respons.success) {
            location.reload();
        }else{
            userForm.setLoginErrorMessage(respons.error)
        }
    });
}

userForm.registerFormCallback = data => {
    ApiConnector.register(data, respons => {
        if(respons.success) {
            location.reload();
        }else{
            userForm.setRegisterErrorMessage(respons.error)
        }
    })
}
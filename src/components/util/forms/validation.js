const validation = (value, rules, form) => {
    let valid = true;
    //loop the each rule and check against the input value
    for (let rule in rules) {
        switch (rule) {
            case "isRequired":
                valid = valid && validateRequired(value)
                break
            case "isEmail":
                valid = valid && validateEmail(value)
                break
            case "minLength":
                valid = valid && validMinLength(value, rules[rule])
                break
            case "maxLength":
                valid = valid && validMaxLength(value, rules[rule])
                break
            case "confirmPass":
                valid = valid && validConfirmPassword(value, form[rules.confirmPass].value)
                break
            default:
                valid = true
        }
    }

    return valid;
}

//return true if the value is not empty
const validateRequired = (value) => {
    if (value !== '') {
        return true
    }

    return false;
}

//return true if the email is valid email
const validateEmail = (email) => {
    const regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(String(email).toLowerCase());
}

//return true if the password is longer than minLength chars
const validMinLength = (password, minLength) => {
    if (password.length >= minLength) {
        return true
    }

    return false;
}

//return ture if the password is longer than maxLength chars
const validMaxLength = (password, minLength) => {
    if (password.length <= minLength) {
        return true
    }

    return false;
}

//
const validConfirmPassword = (confirmPassword, password) => {
    return confirmPassword === password
}




export default validation;
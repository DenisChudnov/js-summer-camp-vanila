/**
 * This is func for check email valid, and entered with
 * pattern *@*.*
 * If email is valid - return true. Else - return false
 * @param email - string
 */
export function isEmailValid(email){
    let mailValidFormat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if(email.match(mailValidFormat)){
        return true
    }
    return false
}

/**
 * this func check field value lenght
 * return true, if value lenght is >=5 and <=80
 * @param fieldValue
 * @returns {boolean}
 */
export function isFieldValueLengthValid(fieldValue){
    return (fieldValue.length >= 5 && fieldValue.length <= 80)
}

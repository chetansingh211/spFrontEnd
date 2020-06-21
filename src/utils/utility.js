import moment from 'moment';

const dateformat = /^(0?[1-9]|[12][0-9]|3[01])[/-](0?[1-9]|1[012])[/-]\d{4}$/;
const dateTimeFormat = /^(0?[1-9]|[12][0-9]|3[01])[/-](0?[1-9]|1[012])[/-]\d{4}[\s](?:2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]$/;

export const responseHandler = (response) => {
	switch(response.status) {
		case 201: // create
		case 200: // get
		    return Promise.resolve(response.data || {message: 'Success'});
		case 204: // no contents
		    return Promise.reject({response});
		default:
		    return Promise.resolve({message: 'Success'});
	}
}

export const errorHandler = (error) => {
	if(error.response && error.response.status) {
    	switch(error.response.status) {
    		case 404: // not found
    		    return Promise.reject({message: error.response.data.message || "Record not found"});    
    		case 400:
    		case 409:
    		    // console.log('error message==='+error.response.data);
    		    return Promise.reject({message: error.response.data.message || "Invalid request body"});    
    		case 204: 
    		    // console.log('===error 204===');
                return Promise.reject({message: 'No contents'});
            case 422:
                let errText = error.response.data.errors[0].path + ' ' +error.response.data.errors[0].message;              
                return Promise.reject({message:errText});
    		default:
    		    return Promise.reject({message: 'Invalid request body'});
    	}
    }else {
		return Promise.reject({message: 'Network error'});
	}
}

// user pool token
export function clearToken() {
    // console.log('== == ==');
    window.localStorage.removeItem('access_token');
    window.localStorage.removeItem('user_info');
}

export function getToken() {
    try {
        const accessToken = window.localStorage.getItem('access_token');
        // console.log('accessToken==='+accessToken);
        return accessToken;
    } catch (err) {
        clearToken();
        return null;
    }
}

export function saveToken(token, userInfo) {
    try {
        // console.log('== == =='+token);
        window.localStorage.setItem('access_token', JSON.stringify(token));
        window.localStorage.setItem('user_info', JSON.stringify(userInfo));
    } catch (err) {
        clearToken();
    }
}

export function getUserInfo() {
    try {
        const userInfo = window.localStorage.getItem('user_info');
        return userInfo;
    } catch (err) {
        return null;
    }
}

export function combineStyles(...styles) {
    return function CombineStyles(theme) {
        const outStyles = styles.map((arg) => {
            // Apply the "theme" object for style functions.
            if (typeof arg === 'function') {
              return arg(theme);
            }
            // Objects need no change.
            return arg;
        });
        return outStyles.reduce((acc, val) => Object.assign(acc, val));
    };
}

export function validateAUMobile(mobile) {
    const reg = /^(\+\d{2}[ ]{0,1}){0,1}(((\({0,1}[ ]{0,1})0{0,1}\){0,1}[2|3|7|8]{1}\){0,1}[ ]*(\d{4}[ ]{0,1}\d{4}))|(1[ ]{0,1}(300|800|900|902)[ ]{0,1}((\d{6})|(\d{3}[ ]{0,1}\d{3})))|(13[ ]{0,1}([\d ]{5})|((\({0,1}[ ]{0,1})0{0,1}\){0,1}4{1}[\d ]{8,10})))$|^$/;
    return reg.test(String(mobile));
}

export function validateEmail(email) {
    // console.log('===validateEmail===');
    const reg = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    // console.log(re.test(String(email).toLowerCase()));
    return reg.test(String(email).toLowerCase());
}

export function convertNumberToUnit(labelValue) {
    // Nine Zeroes for Billions
    return Math.abs(Number(labelValue)) >= 1.0e+9

      ? Number((Math.abs(Number(labelValue)) / 1.0e+9).toFixed(2)) + "B"
      // Six Zeroes for Millions 
      : Math.abs(Number(labelValue)) >= 1.0e+6  

      ? Number((Math.abs(Number(labelValue)) / 1.0e+6).toFixed(2)) + "M"
      // Three Zeroes for Thousands
      : Math.abs(Number(labelValue)) >= 1.0e+3  

      ? Number((Math.abs(Number(labelValue)) / 1.0e+3).toFixed(2)) + "K"  

      : Math.abs(Number(labelValue));
}

export const convertDateFormat = (dateStr) => {
    if(dateStr) {
        if(dateformat.test(dateStr)) {
            const dt = moment(dateStr, 'DD-MM-YYYY');
            return dt.format('YYYY-MM-DD');
        }else {
            return dateStr;
        }
    }else {
        return null;
    }
}

export const convertDateTimeFormat = (dateStr) => {
    if(dateStr) {
        if(dateTimeFormat.test(dateStr)) {
            const dt = moment(dateStr, 'DD-MM-YYYY HH:mm:ss');
            return dt.format('YYYY-MM-DD HH:mm:ss');
        }else {
            return dateStr;
        }
    }else {
        return null;
    }
}


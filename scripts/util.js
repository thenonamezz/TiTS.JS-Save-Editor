//note: since email is static, stuff like name and gender references inside of the email content itself is not as simple to change as the header name and address, will look into it
//update mail state with new value
function updateMailState(saveObj, mailKey, value) {
    const mailObj = saveObj.mailState.mails;
    for (const [key] of Object.entries(mailObj)) {
        const mail = mailObj[key];
        if (mail.hasOwnProperty(mailKey)) {
            mail[mailKey] = value;
        }
    }
}

class EventEmitter {
    on(name, callback) {
        var callbacks = this[name];
        if (!callbacks) this[name] = [callback];
        else callbacks.push(callback);
    }

    dispatch(name, event) {
        var callbacks = this[name];
        if (callbacks) callbacks.forEach(callback => callback(event));
    }
}
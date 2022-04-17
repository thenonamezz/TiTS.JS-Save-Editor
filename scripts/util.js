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
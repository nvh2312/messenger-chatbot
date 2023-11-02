require("dotenv").config();
import homepageService from "./homepageService";
import request from "request";
import templateMessage from "./templateMessage";

const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;

let sendMessageWelcomeNewUser = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let username = await homepageService.getFacebookUsername(sender_psid);
            let response1 = {
                "attachment": {
                    "type": "image",
                    "payload": {
                        "url": "https://bit.ly/imageWelcome"
                    }
                }
            };
            let response2 = {
                "text": `Hi ${username}! Welcome to HC.VN.`
            };

            let response3= await templateMessage.backToMainMenuTemplate();


            await sendMessage(sender_psid, response1);
            await sendMessage(sender_psid, response2);
            await sendMessage(sender_psid, response3);
            resolve("done");
        } catch (e) {
            reject(e);
        }
    });
};
let backToMainMenu = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response= await templateMessage.backToMainMenuTemplate();
            await sendMessage(sender_psid, response);
            resolve("done");
        } catch (e) {
            reject(e);
        }
    });
};

let sendMessage = (sender_psid, response) => {
    return new Promise(async (resolve, reject) => {
        try {
            await homepageService.markMessageRead(sender_psid);
            await homepageService.sendTypingOn(sender_psid);
            // Construct the message body
            let request_body = {
                "recipient": {
                    "id": sender_psid
                },
                "message": response
            };

            // Send the HTTP request to the Messenger Platform
            request({
                "uri": "https://graph.facebook.com/v18.0/me/messages",
                "qs": { "access_token": PAGE_ACCESS_TOKEN },
                "method": "POST",
                "json": request_body
            }, (err, res, body) => {
                if (!err) {
                    resolve('message sent!')
                } else {
                    reject("Unable to send message:" + err);
                }
            });
        } catch (e) {
            reject(e);
        }
    });
};

let sendListProduct = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {
            //send a generic template message
            let response1 = templateMessage.sendProductTemplate();
            let response2 = templateMessage.toMainMenu();
            await sendMessage(sender_psid, response1);
            await sendMessage(sender_psid, response2);
            resolve("done");
        } catch (e) {
            reject(e);
        }
    });
};

let sendListPayment = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {
            //send a generic template message
            let response1 = {
                "text": `COD || PAYPAL || VNPAY || BALANCE`
            };
            let response2 = templateMessage.toMainMenu();
            await sendMessage(sender_psid, response1);
            await sendMessage(sender_psid, response2);
            resolve("done");
        } catch (e) {
            reject(e);
        }
    });
};
let sendGuildline = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {
            //send a generic template message
            let response1 = templateMessage.sendGuildline();
            let response2 = templateMessage.toMainMenu();
            await sendMessage(sender_psid, response1);
            await sendMessage(sender_psid, response2);
            resolve("done");
        } catch (e) {
            reject(e);
        }
    });
};



module.exports = {
    sendMessage: sendMessage,
    sendMessageWelcomeNewUser: sendMessageWelcomeNewUser,
    sendListProduct: sendListProduct,
    sendListPayment: sendListPayment,
};

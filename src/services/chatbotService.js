require("dotenv").config();
import request from "request";

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
                "text": `Hi ${username}! Welcome to HC.VN, Can i help you.`
            };

            await sendMessage(sender_psid, response1);
            await sendMessage(sender_psid, response2);
            resolve("done");
        } catch (e) {
            reject(e);
        }
    });
};

let sendMessage = (sender_psid, response) => {
    return new Promise(async (resolve, reject) => {
        try {
            // Construct the message body
            let request_body = {
                "recipient": {
                    "id": sender_psid
                },
                "message": response
            };

            // Send the HTTP request to the Messenger Platform
            request({
                "uri": "https://graph.facebook.com/v6.0/me/messages",
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


module.exports = {
    sendMessage: sendMessage,
    sendMessageWelcomeNewUser: sendMessageWelcomeNewUser,
};

require("dotenv").config();
import request from "request";

const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;

let getFacebookUsername = (sender_psid) => {
  return new Promise((resolve, reject) => {
    try {
      // Send the HTTP request to the Messenger Platform
      let url = `https://graph.facebook.com/${sender_psid}?fields=first_name,last_name,profile_pic&access_token=${PAGE_ACCESS_TOKEN}`;
      request(
        {
          uri: url,
          method: "GET",
        },
        (err, res, body) => {
          if (!err) {
            //convert string to json object
            body = JSON.parse(body);
            let username = `${body.last_name} ${body.first_name}`;
            resolve(username);
          } else {
            reject("Unable to send message:" + err);
          }
        }
      );
    } catch (e) {
      reject(e);
    }
  });
};

let handleSetupProfileAPI = () => {
  return new Promise((resolve, reject) => {
    try {
      let url = `https://graph.facebook.com/v18.0/me/messenger_profile?access_token=${PAGE_ACCESS_TOKEN}`;
      let request_body = {
        get_started: {
          payload: "GET_STARTED",
        },
        persistent_menu: [
          {
            locale: "default",
            composer_input_disabled: false,
            call_to_actions: [
              {
                type: "postback",
                title: "Restart this conversation",
                payload: "RESTART_CONVERSATION",
              },

              {
                type: "web_url",
                title: "View Facebook Fan Page",
                url: "https://www.facebook.com/profile.php?id=61552326521342",
                webview_height_ratio: "full",
              },
              {
                type: "web_url",
                title: "View Website Ecommerce",
                url: "https://hctech.onrender.com",
                webview_height_ratio: "full",
              },
            ],
          },
        ],
        whitelisted_domains: [
          "https://hctech.onrender.com/",
          "https://hc-chatbot.onrender.com",
        ],
      };
      // Send the HTTP request to the Messenger Platform
      request(
        {
          uri: url,
          method: "POST",
          json: request_body,
        },
        (err, res, body) => {
          console.log(body);
          if (!err) {
            console.log("ok");
            resolve("Done!");
          } else {
            reject("Unable to send message:" + err);
          }
        }
      );
    } catch (e) {
      reject(e);
    }
  });
};

let sendTypingOn = (sender_psid) => {
    return new Promise((resolve, reject) => {
        try {
            let request_body = {
                "recipient": {
                    "id": sender_psid
                },
                "sender_action": "typing_on"
            };

            let url = `https://graph.facebook.com/v18.0/me/messages?access_token=${PAGE_ACCESS_TOKEN}`;
            request({
                "uri": url,
                "method": "POST",
                "json": request_body

            }, (err, res, body) => {
                if (!err) {
                    resolve("done!");
                } else {
                    reject("Unable to send message:" + err);
                }
            });

        } catch (e) {
            reject(e);
        }
    });
};

let markMessageRead = (sender_psid) => {
    return new Promise((resolve, reject) => {
        try {
            let request_body = {
                "recipient": {
                    "id": sender_psid
                },
                "sender_action": "mark_seen"
            };

            let url = `https://graph.facebook.com/v18.0/me/messages?access_token=${PAGE_ACCESS_TOKEN}`;
            request({
                "uri": url,
                "method": "POST",
                "json": request_body

            }, (err, res, body) => {
                if (!err) {
                    resolve("done!");
                } else {
                    reject("Unable to send message:" + err);
                }
            });
        } catch (e) {
            reject(e);
        }
    })
};


module.exports = {
    handleSetupProfileAPI: handleSetupProfileAPI,
    getFacebookUsername: getFacebookUsername,
    markMessageRead: markMessageRead,
    sendTypingOn: sendTypingOn
};

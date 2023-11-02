require("dotenv").config();
import chatbotService from "../services/chatbotService";
import homepageService from "../services/homepageService";

const MY_VERIFY_TOKEN = process.env.MY_VERIFY_TOKEN;

let getWebhook = (req, res) => {
  // Your verify token. Should be a random string.
  let VERIFY_TOKEN = MY_VERIFY_TOKEN;

  // Parse the query params
  let mode = req.query["hub.mode"];
  let token = req.query["hub.verify_token"];
  let challenge = req.query["hub.challenge"];

  // Checks if a token and mode is in the query string of the request
  if (mode && token) {
    // Checks the mode and token sent is correct
    if (mode === "subscribe" && token === VERIFY_TOKEN) {
      // Responds with the challenge token from the request
      console.log("WEBHOOK_VERIFIED");
      res.status(200).send(challenge);
    } else {
      // Responds with '403 Forbidden' if verify tokens do not match
      res.sendStatus(403);
    }
  }
};

let postWebhook = (req, res) => {
  let body = req.body;
  // Checks this is an event from a page subscription
  if (body.object === "page") {
    // Iterates over each entry - there may be multiple if batched
    body.entry.forEach(function (entry) {
      // Gets the body of the webhook event
      let webhook_event = entry.messaging[0];

      // Get the sender PSID
      let sender_psid = webhook_event.sender.id;

      // Check if the event is a message or postback and
      // pass the event to the appropriate handler function
      if (webhook_event.message) {
        handleMessage(sender_psid, webhook_event.message);
      } else if (webhook_event.postback) {
        handlePostback(sender_psid, webhook_event.postback);
      }
    });

    // Returns a '200 OK' response to all requests
    res.status(200).send("EVENT_RECEIVED");
  } else {
    // Returns a '404 Not Found' if event is not from a page subscription
    res.sendStatus(404);
  }
};

// Handles messages events
let handleMessage = async (sender_psid, received_message) => {
  //check the incoming message is a quick reply?
  if (
    received_message &&
    received_message.quick_reply &&
    received_message.quick_reply.payload
  ) {
    let payload = received_message.quick_reply.payload;
    if (payload === "MAIN_MENU") {
      await chatbotService.backToMainMenu(sender_psid);
    } else if (payload === "OUR_PRODUCTS") {
      await chatbotService.sendListProduct(sender_psid);
    } else if (payload === "PAYMENTS") {
      await chatbotService.sendListPayment(sender_psid);
    } else if (payload === "HOW_TO_ORDER") {
      await chatbotService.sendGuildline(sender_psid);
    }
    return;
  }

  let response;

  // Check if the message contains text
  if (received_message.text) {
    // Create the payload for a basic text message
    response = {
      text: `Please wait. We will reply your question soon!!!`,
    };
  } else if (received_message.attachments) {
    // Get the URL of the message attachment
    let attachment_url = received_message.attachments[0].payload.url;
    response = {
      attachment: {
        type: "template",
        payload: {
          template_type: "generic",
          elements: [
            {
              title: "Please provide your question?",
              subtitle: "",
              image_url: attachment_url,
            },
          ],
        },
      },
    };
  }

  // Sends the response message
  await chatbotService.sendMessage(sender_psid, response);
};

let getHomePage = (req, res) => {
  let facebookAppId = process.env.FACEBOOK_APP_ID;
  return res.render("homepage.ejs", {
    facebookAppId: facebookAppId,
  });
};

// Handles messaging_postbacks events
let handlePostback = async (sender_psid, received_postback) => {
  // Get the payload for the postback

  let payload = received_postback.payload;

  // Set the response based on the postback payload
  await chatbotService.sendMessageWelcomeNewUser(sender_psid);
};
let handleSetupProfile = async (req, res) => {
  try {
    await homepageService.handleSetupProfileAPI();
    return res.redirect("/");
  } catch (e) {
    console.log(e);
  }
};
let getSetupProfilePage = (req, res) => {
  return res.render("profile.ejs");
};
module.exports = {
  getHomePage: getHomePage,
  getWebhook: getWebhook,
  postWebhook: postWebhook,
  handleSetupProfile: handleSetupProfile,
  getSetupProfilePage: getSetupProfilePage,
};

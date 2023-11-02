let sendProductTemplate = () =>{
    return {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": [
                    {
                        "title": "MacBook Pro 2022 ",
                        "image_url": "https://res.cloudinary.com/dbekkzxtt/image/upload/v1668854508/ibq2qc0vivrbh9dnmlv2.webp",
                        "subtitle": "13.3 inch MNEJ3SA/A (M2/ 8GB/ SSD 512GB)",
                    },
                    {
                        "title": "Laptop ASUS ",
                        "image_url": "https://res.cloudinary.com/dbekkzxtt/image/upload/v1668577514/m66rp6om9yy6ntheqyqq.webp",
                        "subtitle": "X515EA-BQ1006W (i3-1115G4/RAM 4GB/512GB SSD/ Windows 11)",
                    },
                    {
                        "title": "Playstation",
                        "image_url": "https://bit.ly/imagePlaystation",
                        "subtitle": "Incredible games & Endless entertainment",
                    },
                ]
            }
        }
    };
};

let sendGuildline = () =>{
    return {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": [
                    {
                        "title": "Đăng ký / Đăng nhập",
                        "image_url": "https://res.cloudinary.com/dbekkzxtt/image/upload/v1677837969/Screenshot_from_2023-03-03_16-59-49_orzmfq.png",
                        "subtitle": "",
                    },
                    {
                        "title": "Chọn sản phẩm",
                        "image_url": "https://res.cloudinary.com/dbekkzxtt/image/upload/v1677837970/Screenshot_from_2023-03-03_17-00-09_btplie.png",
                        "subtitle": "",
                    },
                    {
                        "title": "Thêm địa chỉ, phương thức thanh toán",
                        "image_url": "https://res.cloudinary.com/dbekkzxtt/image/upload/v1677837967/Screenshot_from_2023-03-03_17-03-25_bptpla.png",
                        "subtitle": "",
                    },
                    {
                        "title": "Thanh toán",
                        "image_url": "https://res.cloudinary.com/dbekkzxtt/image/upload/v1677837968/Screenshot_from_2023-03-03_17-02-43_trks35.png",
                        "subtitle": "",
                    },
                    {
                        "title": "Kiểm tra đơn hàng",
                        "image_url": "https://res.cloudinary.com/dbekkzxtt/image/upload/v1677837967/Screenshot_from_2023-03-03_17-03-18_zp1yfs.png",
                        "subtitle": "",
                    },
                ]
            }
        }
    };
};

let sendLookupOrderTemplate = () =>{
    return {
        "attachment":{
            "type":"template",
            "payload":{
                "template_type":"button",
                "text":"OK. Let's set info about your order, so I won't need to ask for them in the future.",
                "buttons":[
                    {
                        "type": "web_url",
                        "url": `${process.env.URL_WEB_VIEW_ORDER}`,
                        "title": "Set info",
                        "webview_height_ratio": "tall",
                        "messenger_extensions": true //false: open the webview in new tab
                    },
                    {
                        "type": "postback",
                        "title": "Main menu",
                        "payload": "BACK_TO_MAIN_MENU"
                    }
                ]
            }
        }
    };
};

let backToMainMenuTemplate = ()=>{
    return {
        "text": "Our Menu?",
        "quick_replies": [
            {
                "content_type": "text",
                "title": "Our Product",
                "payload": "OUR_PRODUCTS",
            },
            {
                "content_type": "text",
                "title": "Payments",
                "payload": "PAYMENTS",
            },
            {
                "content_type": "text",
                "title": "How to order",
                "payload": "HOW_TO_ORDER",
            },
        ]
    };
};

let setInfoOrderTemplate = ()=>{
    return {
        "attachment":{
            "type":"template",
            "payload":{
                "template_type":"button",
                "text":"We're checking your order. We will send you a message when the process is complete." +
                    "\nThank you!",
                "buttons":[
                    {
                        "type": "postback",
                        "title": "Main menu",
                        "payload": "BACK_TO_MAIN_MENU"
                    }
                ]
            }
        }
    };
};

let toMainMenu = () =>{
    return {
        "quick_replies": [
            {
                "content_type": "text",
                "title": "Main menu",
                "payload": "MAIN_MENU",
            }
        ]
    };
}

module.exports = {
    sendProductTemplate: sendProductTemplate,
    backToMainMenuTemplate: backToMainMenuTemplate,
    sendGuildline: sendGuildline,
    toMainMenu: toMainMenu
};

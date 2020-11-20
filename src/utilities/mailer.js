const { MAIL_CHIMP_API_KEY } = require('../../variables');

const mailchimpClient = require("@mailchimp/mailchimp_transactional")(
    MAIL_CHIMP_API_KEY
);


async function sendWelcomeMail(recipientMail, recipeintName){
    /**
     * A welcome message sent to newly registered users of prodeus
    **/
    const message = {
        from_email: "Hello@prodeus.co",
        subject: "Welcome to Prodeus",
        text: "Welcome to Prodeus!",
        to: [{
            email: recipientMail,
            type: "to"
        }],
        "merge_vars": [{
            "rcpt": recipientMail,
            "vars": [{
                    "name": "FNAME",
                    "content": recipeintName
                }]
        }],
    };

   const response = await mailchimpClient.messages.sendTemplate({
    template_name: "mail-signup",
    template_content: [],
    message:message,

  });
}

module.exports = {
    sendWelcomeMail
}
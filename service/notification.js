const admin = require('firebase-admin');

function sendNotification(token, title, body) {
    const message = {
        notification: {
            title: title,
            body: body,
        },
        token: token,
    };

    admin.messaging().send(message)
        .then((response) => {
            console.log('Successfully sent notification:', response);
        })
        .catch((error) => {
            console.error('Error sending notification:', error);
        });
}

module.exports = sendNotification;
require('dotenv').config();
const axios = require('axios');
const data = require('./test-data.json');
const interval = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const sendMessage = async (phoneNumber, templateName, invitationName) => {
  const baseUrl = process.env.WHATSAPP_BASE_URL;
  const endpoint = '/messages';
  const url = baseUrl + endpoint;
  const headers = {
    Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
    'Content-Type': 'application/json'
  };
  const requestData = {
    messaging_product: 'whatsapp',
    recipient_type: 'individual',
    to: phoneNumber,
    type: 'template',
    template: {
      name: templateName,
      language: {
        code: 'en_US'
      },
      components: [
        {
          type: 'button',
          sub_type: 'url',
          index: '0',
          parameters: [
            {
              type: 'text',
              text: invitationName
            }
          ]
        }
      ]
    }
  };

  try {
    const response = await axios.post(url, requestData, { headers: headers });
    console.log(`Message sent to ${phoneNumber}: `, response.data);
    return true;
  } catch (error) {
    console.error(`Error sending message to ${phoneNumber}: `, error);
    return false;
  }
};

const sendMessagesSequentially = async (data, templateName) => {
  for (let i = 0; i < data.length; i++) {
    if (data[i].status !== 'pending') {
      console.log(`Skipping ${data[i].phoneNumber} as status is not pending`);
      continue;
    }

    console.log(`Sending message to ${data[i].phoneNumber}`);
    const success = await sendMessage(
      data[i].phoneNumber,
      templateName,
      data[i].invitationName
    );

    if (!success) {
      console.log(`Failed to send message to ${data[i].phoneNumber}`);
      break;
    }

    console.log(`Message successfully sent to ${data[i].phoneNumber}`);
    // await interval(2000);
  }
};

const templateName = 'wed_invitation'; // Replace with your actual template name

sendMessagesSequentially(data, templateName)
  .then(() => console.log('All messages sent successfully'))
  .catch((err) => console.error('An error occurred:', err));

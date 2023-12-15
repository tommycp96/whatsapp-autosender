require('dotenv').config();
const fs = require('fs').promises;
const axios = require('axios');
const path = require('path');
const filePath = path.join(__dirname, 'test-data.json');
const data = require(filePath);
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
    console.log(
      `Message sent to ${phoneNumber} - ${decodeURI(invitationName)}: `,
      response.data
    );
    return true;
  } catch (error) {
    console.error(`Error sending message to ${phoneNumber}: `, error);
    return false;
  }
};

/*
  NOTE: Since JSON is a static file format, this involves reading the entire file,
  modifying the relevant entry in memory, and then writing the entire modified data back to the file.
  This process can be resource-intensive for very large files, but for a moderate number of entries, it should work fine.
*/
const updateStatusInJson = async (data) => {
  const jsonData = JSON.stringify(data, null, 2);
  await fs.writeFile(filePath, jsonData, 'utf8');
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

    if (success) {
      console.log(`Message successfully sent to ${data[i].phoneNumber}`);
      data[i].status = 'sent';
      await updateStatusInJson(data);
    } else {
      console.log(`Failed to send message to ${data[i].phoneNumber}`);
    }

    // await interval(2000);
  }
};

const templateName = process.env.TEMPLATE_NAME;

sendMessagesSequentially(data, templateName)
  .then(() => console.log('All messages sent successfully'))
  .catch((err) => console.error('An error occurred:', err));

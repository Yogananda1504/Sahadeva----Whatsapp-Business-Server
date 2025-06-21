/**
 * Function to send a text message via WhatsApp Cloud API.
 *
 * @param {Object} args - Arguments for sending the message.
 * @param {string} args.phoneNumberId - The ID of the phone number to send the message to.
 * @param {string} args.recipientPhoneNumber - The recipient's phone number.
 * @param {string} args.messageContent - The content of the message to be sent.
 * @returns {Promise<Object>} - The response from the WhatsApp API.
 */
const sendTextMessage = async ({ phoneNumberId, recipientPhoneNumber, messageContent }) => {
  const version = 'v13.0'; // Specify the API version
  const token = process.env.WHATSAPP_BUSINESS_PLATFORM_API_KEY;
  const url = `https://graph.facebook.com/${version}/${phoneNumberId}/messages`;

  const body = {
    messaging_product: "whatsapp",
    recipient_type: "individual",
    to: recipientPhoneNumber,
    type: "text",
    text: {
      preview_url: false,
      body: messageContent
    }
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error sending text message:', error);
    return { error: 'An error occurred while sending the text message.' };
  }
};

/**
 * Tool configuration for sending text messages via WhatsApp Cloud API.
 * @type {Object}
 */
const apiTool = {
  function: sendTextMessage,
  definition: {
    type: 'function',
    function: {
      name: 'send_text_message',
      description: 'Send a text message via WhatsApp Cloud API.',
      parameters: {
        type: 'object',
        properties: {
          phoneNumberId: {
            type: 'string',
            description: 'The ID of the phone number to send the message to.'
          },
          recipientPhoneNumber: {
            type: 'string',
            description: 'The recipient\'s phone number.'
          },
          messageContent: {
            type: 'string',
            description: 'The content of the message to be sent.'
          }
        },
        required: ['phoneNumberId', 'recipientPhoneNumber', 'messageContent']
      }
    }
  }
};

export { apiTool };
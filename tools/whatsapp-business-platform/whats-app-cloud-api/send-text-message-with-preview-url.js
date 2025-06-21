/**
 * Function to send a text message with a preview URL using the WhatsApp Cloud API.
 *
 * @param {Object} args - Arguments for sending the message.
 * @param {string} args.recipientPhoneNumber - The recipient's phone number in international format.
 * @param {string} args.body - The message body to be sent.
 * @returns {Promise<Object>} - The result of the message sending operation.
 */
const executeFunction = async ({ recipientPhoneNumber, body }) => {
  const version = ''; // will be provided by the user
  const phoneNumberId = ''; // will be provided by the user
  const token = process.env.WHATSAPP_BUSINESS_PLATFORM_API_KEY;
  const url = `https://graph.facebook.com/${version}/${phoneNumberId}/messages`;
  
  const messageData = {
    messaging_product: "whatsapp",
    to: recipientPhoneNumber,
    text: {
      preview_url: true,
      body: body
    }
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(messageData)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error sending message:', error);
    return { error: 'An error occurred while sending the message.' };
  }
};

/**
 * Tool configuration for sending text messages via WhatsApp Cloud API.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'send_text_message',
      description: 'Send a text message with a preview URL using WhatsApp Cloud API.',
      parameters: {
        type: 'object',
        properties: {
          recipientPhoneNumber: {
            type: 'string',
            description: 'The recipient\'s phone number in international format.'
          },
          body: {
            type: 'string',
            description: 'The message body to be sent.'
          }
        },
        required: ['recipientPhoneNumber', 'body']
      }
    }
  }
};

export { apiTool };
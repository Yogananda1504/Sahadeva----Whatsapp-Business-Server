/**
 * Function to send a sticker message via WhatsApp Cloud API.
 *
 * @param {Object} args - Arguments for sending the sticker message.
 * @param {string} args.phoneNumberId - The Phone Number ID associated with the WhatsApp Business Account.
 * @param {string} args.recipientPhoneNumber - The recipient's phone number in international format.
 * @param {string} args.stickerUrl - The URL of the sticker to be sent.
 * @returns {Promise<Object>} - The result of the sticker message sending operation.
 */
const executeFunction = async ({ phoneNumberId, recipientPhoneNumber, stickerUrl }) => {
  const version = 'v13.0'; // Set the appropriate API version
  const token = process.env.WHATSAPP_BUSINESS_PLATFORM_API_KEY;
  const url = `https://graph.facebook.com/${version}/${phoneNumberId}/messages`;

  const body = {
    messaging_product: "whatsapp",
    recipient_type: "individual",
    to: recipientPhoneNumber,
    type: "sticker",
    sticker: {
      link: stickerUrl
    }
  };

  try {
    // Set up headers for the request
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };

    // Perform the fetch request
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(body)
    });

    // Check if the response was successful
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData);
    }

    // Parse and return the response data
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error sending sticker message:', error);
    return { error: 'An error occurred while sending the sticker message.' };
  }
};

/**
 * Tool configuration for sending sticker messages via WhatsApp Cloud API.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'send_sticker_message',
      description: 'Send a sticker message to a recipient via WhatsApp.',
      parameters: {
        type: 'object',
        properties: {
          phoneNumberId: {
            type: 'string',
            description: 'The Phone Number ID associated with the WhatsApp Business Account.'
          },
          recipientPhoneNumber: {
            type: 'string',
            description: 'The recipient\'s phone number in international format.'
          },
          stickerUrl: {
            type: 'string',
            description: 'The URL of the sticker to be sent.'
          }
        },
        required: ['phoneNumberId', 'recipientPhoneNumber', 'stickerUrl']
      }
    }
  }
};

export { apiTool };
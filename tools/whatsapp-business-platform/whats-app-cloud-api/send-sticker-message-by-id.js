/**
 * Function to send a sticker message via WhatsApp Cloud API.
 *
 * @param {Object} args - Arguments for sending the sticker message.
 * @param {string} args.phoneNumberId - The ID of the phone number to send the message to.
 * @param {string} args.recipientPhoneNumber - The recipient's phone number.
 * @param {string} args.mediaObjectId - The ID of the sticker object to be sent.
 * @returns {Promise<Object>} - The response from the WhatsApp API.
 */
const executeFunction = async ({ phoneNumberId, recipientPhoneNumber, mediaObjectId }) => {
  const version = 'v13.0'; // Specify the WhatsApp API version
  const token = process.env.WHATSAPP_BUSINESS_PLATFORM_API_KEY;
  const url = `https://graph.facebook.com/${version}/${phoneNumberId}/messages`;

  const body = {
    messaging_product: "whatsapp",
    recipient_type: "individual",
    to: recipientPhoneNumber,
    type: "sticker",
    sticker: {
      id: mediaObjectId
    }
  };

  try {
    // Set up headers for the request
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
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
 * Tool configuration for sending a sticker message via WhatsApp Cloud API.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'send_sticker_message',
      description: 'Send a sticker message via WhatsApp Cloud API.',
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
          mediaObjectId: {
            type: 'string',
            description: 'The ID of the sticker object to be sent.'
          }
        },
        required: ['phoneNumberId', 'recipientPhoneNumber', 'mediaObjectId']
      }
    }
  }
};

export { apiTool };
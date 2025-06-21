/**
 * Function to send a reply to a sticker message using the WhatsApp Cloud API.
 *
 * @param {Object} args - Arguments for sending the sticker reply.
 * @param {string} args.recipientPhoneNumber - The phone number of the recipient.
 * @param {string} args.messageId - The message ID of the message you are replying to.
 * @param {string} args.stickerUrl - The URL of the sticker to send.
 * @param {string} args.phoneNumberId - The ID of the phone number associated with the WhatsApp Business Account.
 * @param {string} args.version - The API version to use.
 * @returns {Promise<Object>} - The response from the WhatsApp API.
 */
const executeFunction = async ({ recipientPhoneNumber, messageId, stickerUrl, phoneNumberId, version }) => {
  const baseUrl = `https://graph.facebook.com/${version}/${phoneNumberId}/messages`;
  const token = process.env.WHATSAPP_BUSINESS_PLATFORM_API_KEY;

  const body = {
    messaging_product: "whatsapp",
    recipient_type: "individual",
    to: recipientPhoneNumber,
    context: {
      message_id: messageId
    },
    type: "sticker",
    sticker: {
      link: stickerUrl
    }
  };

  try {
    // Set up headers for the request
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };

    // Perform the fetch request
    const response = await fetch(baseUrl, {
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
    console.error('Error sending sticker reply:', error);
    return { error: 'An error occurred while sending the sticker reply.' };
  }
};

/**
 * Tool configuration for sending a reply to a sticker message using WhatsApp Cloud API.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'send_reply_to_sticker_message',
      description: 'Send a reply to a sticker message on WhatsApp.',
      parameters: {
        type: 'object',
        properties: {
          recipientPhoneNumber: {
            type: 'string',
            description: 'The phone number of the recipient.'
          },
          messageId: {
            type: 'string',
            description: 'The message ID of the message you are replying to.'
          },
          stickerUrl: {
            type: 'string',
            description: 'The URL of the sticker to send.'
          },
          phoneNumberId: {
            type: 'string',
            description: 'The ID of the phone number associated with the WhatsApp Business Account.'
          },
          version: {
            type: 'string',
            description: 'The API version to use.'
          }
        },
        required: ['recipientPhoneNumber', 'messageId', 'stickerUrl', 'phoneNumberId', 'version']
      }
    }
  }
};

export { apiTool };
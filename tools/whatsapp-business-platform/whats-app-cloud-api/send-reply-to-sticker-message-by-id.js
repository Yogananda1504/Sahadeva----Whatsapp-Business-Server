/**
 * Function to send a reply to a sticker message on WhatsApp.
 *
 * @param {Object} args - Arguments for sending the reply.
 * @param {string} args.recipientPhoneNumber - The phone number of the recipient.
 * @param {string} args.messageId - The message ID of the message you are replying to.
 * @param {string} args.stickerId - The ID of the sticker object you are sending.
 * @returns {Promise<Object>} - The result of the send message operation.
 */
const executeFunction = async ({ recipientPhoneNumber, messageId, stickerId }) => {
  const version = ''; // will be provided by the user
  const phoneNumberId = ''; // will be provided by the user
  const token = process.env.WHATSAPP_BUSINESS_PLATFORM_API_KEY;
  const url = `https://graph.facebook.com/${version}/${phoneNumberId}/messages`;

  const body = {
    messaging_product: "whatsapp",
    recipient_type: "individual",
    to: recipientPhoneNumber,
    context: {
      message_id: messageId
    },
    type: "sticker",
    sticker: {
      id: stickerId
    }
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
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
    console.error('Error sending reply to sticker message:', error);
    return { error: 'An error occurred while sending the reply.' };
  }
};

/**
 * Tool configuration for sending a reply to a sticker message on WhatsApp.
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
          stickerId: {
            type: 'string',
            description: 'The ID of the sticker object you are sending.'
          }
        },
        required: ['recipientPhoneNumber', 'messageId', 'stickerId']
      }
    }
  }
};

export { apiTool };
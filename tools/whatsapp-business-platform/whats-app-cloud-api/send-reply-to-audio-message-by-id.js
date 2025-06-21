/**
 * Function to send a reply to an audio message by ID using the WhatsApp Cloud API.
 *
 * @param {Object} args - Arguments for sending the reply.
 * @param {string} args.recipientPhoneNumber - The phone number of the recipient.
 * @param {string} args.messageId - The message ID of the message you are replying to.
 * @param {string} args.audioId - The ID of the audio object you are sending.
 * @returns {Promise<Object>} - The result of the message sending operation.
 */
const executeFunction = async ({ recipientPhoneNumber, messageId, audioId }) => {
  const version = 'v13.0'; // API version, adjust as necessary
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
    type: "audio",
    audio: {
      id: audioId
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
    console.error('Error sending reply to audio message:', error);
    return { error: 'An error occurred while sending the reply to the audio message.' };
  }
};

/**
 * Tool configuration for sending a reply to an audio message by ID using the WhatsApp Cloud API.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'send_reply_audio_message',
      description: 'Send a reply to an audio message by ID.',
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
          audioId: {
            type: 'string',
            description: 'The ID of the audio object you are sending.'
          }
        },
        required: ['recipientPhoneNumber', 'messageId', 'audioId']
      }
    }
  }
};

export { apiTool };
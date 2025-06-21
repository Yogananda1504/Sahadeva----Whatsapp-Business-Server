/**
 * Function to send a reply with a reaction message via WhatsApp Cloud API.
 *
 * @param {Object} args - Arguments for sending the reaction message.
 * @param {string} args.recipientPhoneNumber - The phone number of the recipient.
 * @param {string} args.messageId - The ID of the message to react to.
 * @param {string} args.emoji - The emoji to use for the reaction.
 * @returns {Promise<Object>} - The response from the WhatsApp API.
 */
const sendReplyWithReaction = async ({ recipientPhoneNumber, messageId, emoji }) => {
  const version = 'v14.0'; // API version
  const phoneNumberId = ''; // will be provided by the user
  const token = process.env.WHATSAPP_BUSINESS_PLATFORM_API_KEY;

  const url = `https://graph.facebook.com/${version}/${phoneNumberId}/messages`;
  const body = {
    messaging_product: "whatsapp",
    recipient_type: "individual",
    to: recipientPhoneNumber,
    type: "reaction",
    reaction: {
      message_id: messageId,
      emoji: emoji
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
    console.error('Error sending reaction message:', error);
    return { error: 'An error occurred while sending the reaction message.' };
  }
};

/**
 * Tool configuration for sending a reply with a reaction message via WhatsApp Cloud API.
 * @type {Object}
 */
const apiTool = {
  function: sendReplyWithReaction,
  definition: {
    type: 'function',
    function: {
      name: 'send_reply_with_reaction',
      description: 'Send a reply with a reaction message via WhatsApp Cloud API.',
      parameters: {
        type: 'object',
        properties: {
          recipientPhoneNumber: {
            type: 'string',
            description: 'The phone number of the recipient.'
          },
          messageId: {
            type: 'string',
            description: 'The ID of the message to react to.'
          },
          emoji: {
            type: 'string',
            description: 'The emoji to use for the reaction.'
          }
        },
        required: ['recipientPhoneNumber', 'messageId', 'emoji']
      }
    }
  }
};

export { apiTool };
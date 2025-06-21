/**
 * Function to send a reply button message via WhatsApp Cloud API.
 *
 * @param {Object} args - Arguments for sending the reply button message.
 * @param {string} args.recipientPhoneNumber - The recipient's phone number in international format.
 * @param {string} args.buttonText - The text to display on the button.
 * @param {string} args.uniqueButtonId1 - The unique ID for the first button reply.
 * @param {string} args.buttonTitle1 - The title for the first button.
 * @param {string} args.uniqueButtonId2 - The unique ID for the second button reply.
 * @param {string} args.buttonTitle2 - The title for the second button.
 * @returns {Promise<Object>} - The response from the WhatsApp Cloud API.
 */
const executeFunction = async ({ recipientPhoneNumber, buttonText, uniqueButtonId1, buttonTitle1, uniqueButtonId2, buttonTitle2 }) => {
  const version = 'v13.0'; // API version
  const phoneNumberId = ''; // will be provided by the user
  const token = process.env.WHATSAPP_BUSINESS_PLATFORM_API_KEY;

  const url = `https://graph.facebook.com/${version}/${phoneNumberId}/messages`;

  const messageData = {
    messaging_product: "whatsapp",
    recipient_type: "individual",
    to: recipientPhoneNumber,
    type: "interactive",
    interactive: {
      type: "button",
      body: {
        text: buttonText
      },
      action: {
        buttons: [
          {
            type: "reply",
            reply: {
              id: uniqueButtonId1,
              title: buttonTitle1
            }
          },
          {
            type: "reply",
            reply: {
              id: uniqueButtonId2,
              title: buttonTitle2
            }
          }
        ]
      }
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
    console.error('Error sending reply button message:', error);
    return { error: 'An error occurred while sending the reply button message.' };
  }
};

/**
 * Tool configuration for sending reply button messages via WhatsApp Cloud API.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'send_reply_button',
      description: 'Send a reply button message via WhatsApp Cloud API.',
      parameters: {
        type: 'object',
        properties: {
          recipientPhoneNumber: {
            type: 'string',
            description: 'The recipient\'s phone number in international format.'
          },
          buttonText: {
            type: 'string',
            description: 'The text to display on the button.'
          },
          uniqueButtonId1: {
            type: 'string',
            description: 'The unique ID for the first button reply.'
          },
          buttonTitle1: {
            type: 'string',
            description: 'The title for the first button.'
          },
          uniqueButtonId2: {
            type: 'string',
            description: 'The unique ID for the second button reply.'
          },
          buttonTitle2: {
            type: 'string',
            description: 'The title for the second button.'
          }
        },
        required: ['recipientPhoneNumber', 'buttonText', 'uniqueButtonId1', 'buttonTitle1', 'uniqueButtonId2', 'buttonTitle2']
      }
    }
  }
};

export { apiTool };
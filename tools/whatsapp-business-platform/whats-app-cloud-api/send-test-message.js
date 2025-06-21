/**
 * Function to send a test message via WhatsApp Cloud API.
 *
 * @param {Object} args - Arguments for sending the message.
 * @param {string} args.recipientPhoneNumber - The phone number of the recipient.
 * @param {string} args.version - The API version to use.
 * @param {string} args.phoneNumberId - The phone number ID associated with the WhatsApp Business Account.
 * @returns {Promise<Object>} - The response from the WhatsApp API after sending the message.
 */
const executeFunction = async ({ recipientPhoneNumber, version, phoneNumberId }) => {
  const token = process.env.WHATSAPP_BUSINESS_PLATFORM_API_KEY;
  const url = `https://graph.facebook.com/${version}/${phoneNumberId}/messages`;
  
  const messageData = {
    messaging_product: "whatsapp",
    to: recipientPhoneNumber,
    type: "template",
    template: {
      name: "hello_world",
      language: {
        code: "en_US"
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
    console.error('Error sending test message:', error);
    return { error: 'An error occurred while sending the test message.' };
  }
};

/**
 * Tool configuration for sending a test message via WhatsApp Cloud API.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'send_test_message',
      description: 'Send a test message via WhatsApp Cloud API.',
      parameters: {
        type: 'object',
        properties: {
          recipientPhoneNumber: {
            type: 'string',
            description: 'The phone number of the recipient.'
          },
          version: {
            type: 'string',
            description: 'The API version to use.'
          },
          phoneNumberId: {
            type: 'string',
            description: 'The phone number ID associated with the WhatsApp Business Account.'
          }
        },
        required: ['recipientPhoneNumber', 'version', 'phoneNumberId']
      }
    }
  }
};

export { apiTool };
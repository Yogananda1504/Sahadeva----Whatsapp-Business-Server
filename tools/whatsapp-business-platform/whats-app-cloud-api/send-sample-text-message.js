/**
 * Function to send a sample text message using the WhatsApp Cloud API.
 *
 * @param {Object} args - Arguments for sending the message.
 * @param {string} args.recipientId - The WhatsApp ID of the recipient.
 * @param {string} args.phoneNumberId - The phone number ID associated with the WhatsApp Business Account.
 * @param {string} args.version - The API version to use.
 * @returns {Promise<Object>} - The response from the WhatsApp API after sending the message.
 */
const executeFunction = async ({ recipientId, phoneNumberId, version }) => {
  const baseUrl = `https://graph.facebook.com/${version}/${phoneNumberId}/messages`;
  const token = process.env.WHATSAPP_BUSINESS_PLATFORM_API_KEY;

  const messageData = {
    messaging_product: "whatsapp",
    to: recipientId,
    type: "template",
    template: {
      name: "hello_world",
      language: {
        code: "en_US"
      }
    }
  };

  try {
    // Set up headers for the request
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };

    // Perform the fetch request
    const response = await fetch(baseUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify(messageData)
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
    console.error('Error sending message:', error);
    return { error: 'An error occurred while sending the message.' };
  }
};

/**
 * Tool configuration for sending a sample text message using the WhatsApp Cloud API.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'send_sample_text_message',
      description: 'Send a sample text message using WhatsApp Cloud API.',
      parameters: {
        type: 'object',
        properties: {
          recipientId: {
            type: 'string',
            description: 'The WhatsApp ID of the recipient.'
          },
          phoneNumberId: {
            type: 'string',
            description: 'The phone number ID associated with the WhatsApp Business Account.'
          },
          version: {
            type: 'string',
            description: 'The API version to use.'
          }
        },
        required: ['recipientId', 'phoneNumberId', 'version']
      }
    }
  }
};

export { apiTool };
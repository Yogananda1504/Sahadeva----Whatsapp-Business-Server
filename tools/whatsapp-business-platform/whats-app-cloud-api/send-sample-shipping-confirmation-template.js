/**
 * Function to send a sample shipping confirmation template via WhatsApp.
 *
 * @param {Object} args - Arguments for sending the message.
 * @param {string} args.recipientPhoneNumber - The recipient's phone number.
 * @param {string} args.version - The API version to use.
 * @param {string} args.phoneNumberId - The phone number ID associated with the WhatsApp Business Account.
 * @returns {Promise<Object>} - The result of the message sending operation.
 */
const executeFunction = async ({ recipientPhoneNumber, version, phoneNumberId }) => {
  const baseUrl = 'https://graph.facebook.com';
  const token = process.env.WHATSAPP_BUSINESS_PLATFORM_API_KEY;

  const messageData = {
    messaging_product: "whatsapp",
    to: recipientPhoneNumber,
    type: "template",
    template: {
      name: "sample_shipping_confirmation",
      language: {
        code: "en_US",
        policy: "deterministic"
      },
      components: [
        {
          type: "body",
          parameters: [
            {
              type: "text",
              text: "2"
            }
          ]
        }
      ]
    }
  };

  try {
    // Set up headers for the request
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };

    // Perform the fetch request
    const response = await fetch(`${baseUrl}/${version}/${phoneNumberId}/messages`, {
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
 * Tool configuration for sending a sample shipping confirmation template via WhatsApp.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'send_sample_shipping_confirmation',
      description: 'Send a sample shipping confirmation template via WhatsApp.',
      parameters: {
        type: 'object',
        properties: {
          recipientPhoneNumber: {
            type: 'string',
            description: 'The recipient\'s phone number.'
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
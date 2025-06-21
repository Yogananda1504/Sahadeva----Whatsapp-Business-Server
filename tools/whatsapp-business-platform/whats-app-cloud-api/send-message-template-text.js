/**
 * Function to send a message template via WhatsApp Cloud API.
 *
 * @param {Object} args - Arguments for sending the message.
 * @param {string} args.recipientPhoneNumber - The phone number of the recipient.
 * @param {string} args.templateName - The name of the message template to use.
 * @param {string} args.languageCode - The language and locale code for the template.
 * @param {Array} args.components - The components of the message template.
 * @returns {Promise<Object>} - The response from the WhatsApp API.
 */
const executeFunction = async ({ recipientPhoneNumber, templateName, languageCode, components }) => {
  const baseUrl = 'https://graph.facebook.com';
  const version = 'v13.0'; // Specify the API version
  const phoneNumberId = ''; // will be provided by the user
  const token = process.env.WHATSAPP_BUSINESS_PLATFORM_API_KEY;

  const messageData = {
    messaging_product: "whatsapp",
    recipient_type: "individual",
    to: recipientPhoneNumber,
    type: "template",
    template: {
      name: templateName,
      language: {
        code: languageCode
      },
      components: components
    }
  };

  try {
    const response = await fetch(`${baseUrl}/${version}/${phoneNumberId}/messages`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
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
    console.error('Error sending message template:', error);
    return { error: 'An error occurred while sending the message template.' };
  }
};

/**
 * Tool configuration for sending message templates via WhatsApp Cloud API.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'send_message_template',
      description: 'Send a message template via WhatsApp Cloud API.',
      parameters: {
        type: 'object',
        properties: {
          recipientPhoneNumber: {
            type: 'string',
            description: 'The phone number of the recipient.'
          },
          templateName: {
            type: 'string',
            description: 'The name of the message template to use.'
          },
          languageCode: {
            type: 'string',
            description: 'The language and locale code for the template.'
          },
          components: {
            type: 'array',
            description: 'The components of the message template.'
          }
        },
        required: ['recipientPhoneNumber', 'templateName', 'languageCode', 'components']
      }
    }
  }
};

export { apiTool };
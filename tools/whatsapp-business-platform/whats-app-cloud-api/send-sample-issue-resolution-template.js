/**
 * Function to send a sample issue resolution template via WhatsApp Cloud API.
 *
 * @param {Object} args - Arguments for sending the message.
 * @param {string} args.recipientPhoneNumber - The recipient's phone number.
 * @param {string} args.version - The API version to use.
 * @param {string} args.phoneNumberId - The phone number ID associated with the WhatsApp Business Account.
 * @returns {Promise<Object>} - The response from the WhatsApp API.
 */
const executeFunction = async ({ recipientPhoneNumber, version, phoneNumberId }) => {
  const url = `https://graph.facebook.com/${version}/${phoneNumberId}/messages`;
  const token = process.env.WHATSAPP_BUSINESS_PLATFORM_API_KEY;

  const payload = {
    messaging_product: "whatsapp",
    to: recipientPhoneNumber,
    type: "template",
    template: {
      name: "sample_issue_resolution",
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
              text: "*Mr. Jones*"
            }
          ]
        },
        {
          type: "button",
          sub_type: "quick_reply",
          index: 0,
          parameters: [
            {
              type: "text",
              text: "Yes"
            }
          ]
        },
        {
          type: "button",
          sub_type: "quick_reply",
          index: 1,
          parameters: [
            {
              type: "text",
              text: "No"
            }
          ]
        }
      ]
    }
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error sending message:', error);
    return { error: 'An error occurred while sending the message.' };
  }
};

/**
 * Tool configuration for sending a sample issue resolution template via WhatsApp.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'send_sample_issue_resolution_template',
      description: 'Send a sample issue resolution template via WhatsApp.',
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
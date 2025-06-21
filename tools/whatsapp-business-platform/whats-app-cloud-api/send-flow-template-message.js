/**
 * Function to send a flow template message via WhatsApp Cloud API.
 *
 * @param {Object} args - Arguments for sending the message.
 * @param {string} args.recipientPhoneNumber - The recipient's phone number.
 * @param {string} args.templateName - The name of the template to use.
 * @param {string} args.flowToken - The flow token for the action.
 * @param {Object} args.customData - Custom key-value pairs to send with the flow action.
 * @returns {Promise<Object>} - The result of the message sending operation.
 */
const executeFunction = async ({ recipientPhoneNumber, templateName, flowToken, customData }) => {
  const version = ''; // will be provided by the user
  const phoneNumberId = ''; // will be provided by the user
  const token = process.env.WHATSAPP_BUSINESS_PLATFORM_API_KEY;

  const url = `https://graph.facebook.com/${version}/${phoneNumberId}/messages`;
  
  const body = {
    messaging_product: "whatsapp",
    to: recipientPhoneNumber,
    type: "template",
    template: {
      name: templateName,
      language: {
        code: "en_US"
      },
      components: [
        {
          type: "button",
          sub_type: "flow",
          index: "0",
          parameters: [
            {
              type: "action",
              action: {
                flow_token: flowToken,
                flow_action_data: customData
              }
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
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
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
    console.error('Error sending flow template message:', error);
    return { error: 'An error occurred while sending the message.' };
  }
};

/**
 * Tool configuration for sending flow template messages via WhatsApp Cloud API.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'send_flow_template_message',
      description: 'Send a flow template message via WhatsApp Cloud API.',
      parameters: {
        type: 'object',
        properties: {
          recipientPhoneNumber: {
            type: 'string',
            description: 'The recipient\'s phone number.'
          },
          templateName: {
            type: 'string',
            description: 'The name of the template to use.'
          },
          flowToken: {
            type: 'string',
            description: 'The flow token for the action.'
          },
          customData: {
            type: 'object',
            description: 'Custom key-value pairs to send with the flow action.'
          }
        },
        required: ['recipientPhoneNumber', 'templateName', 'flowToken']
      }
    }
  }
};

export { apiTool };
/**
 * Function to send a published flow message via WhatsApp Cloud API.
 *
 * @param {Object} args - Arguments for sending the flow message.
 * @param {string} args.recipientPhoneNumber - The recipient's phone number.
 * @param {string} args.headerText - The header text for the message.
 * @param {string} args.bodyText - The body text for the message.
 * @param {string} args.footerText - The footer text for the message.
 * @param {string} args.flowToken - The flow token for the interactive message.
 * @param {string} args.flowName - The name of the flow to be triggered.
 * @param {string} args.screenId - The screen ID for the flow action.
 * @param {Object} args.customData - Custom data to be sent with the flow action.
 * @returns {Promise<Object>} - The result of the send message operation.
 */
const executeFunction = async ({ recipientPhoneNumber, headerText, bodyText, footerText, flowToken, flowName, screenId, customData }) => {
  const baseUrl = 'https://graph.facebook.com';
  const version = ''; // will be provided by the user
  const phoneNumberId = ''; // will be provided by the user
  const token = process.env.WHATSAPP_BUSINESS_PLATFORM_API_KEY;

  const messageData = {
    messaging_product: "whatsapp",
    to: recipientPhoneNumber,
    recipient_type: "individual",
    type: "interactive",
    interactive: {
      type: "flow",
      header: {
        type: "text",
        text: headerText
      },
      body: {
        text: bodyText
      },
      footer: {
        text: footerText
      },
      action: {
        name: "flow",
        parameters: {
          flow_message_version: "3",
          flow_action: "navigate",
          flow_token: flowToken,
          flow_name: flowName,
          flow_cta: "Open Flow!",
          flow_action_payload: {
            screen: screenId,
            data: customData
          }
        }
      }
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
    console.error('Error sending flow message:', error);
    return { error: 'An error occurred while sending the flow message.' };
  }
};

/**
 * Tool configuration for sending a published flow message via WhatsApp Cloud API.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'send_published_flow',
      description: 'Send a published flow message via WhatsApp Cloud API.',
      parameters: {
        type: 'object',
        properties: {
          recipientPhoneNumber: {
            type: 'string',
            description: 'The recipient\'s phone number.'
          },
          headerText: {
            type: 'string',
            description: 'The header text for the message.'
          },
          bodyText: {
            type: 'string',
            description: 'The body text for the message.'
          },
          footerText: {
            type: 'string',
            description: 'The footer text for the message.'
          },
          flowToken: {
            type: 'string',
            description: 'The flow token for the interactive message.'
          },
          flowName: {
            type: 'string',
            description: 'The name of the flow to be triggered.'
          },
          screenId: {
            type: 'string',
            description: 'The screen ID for the flow action.'
          },
          customData: {
            type: 'object',
            description: 'Custom data to be sent with the flow action.'
          }
        },
        required: ['recipientPhoneNumber', 'flowToken', 'flowName']
      }
    }
  }
};

export { apiTool };
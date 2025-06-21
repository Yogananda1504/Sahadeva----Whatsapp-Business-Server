/**
 * Function to send a published flow message via WhatsApp Cloud API.
 *
 * @param {Object} args - Arguments for sending the message.
 * @param {string} args.recipientPhoneNumber - The phone number of the recipient.
 * @param {string} args.flowId - The ID of the flow to be sent.
 * @param {string} args.headerText - The header text for the message.
 * @param {string} args.bodyText - The body text for the message.
 * @param {string} args.footerText - The footer text for the message.
 * @param {string} args.flowToken - The flow token for the interactive message.
 * @param {string} args.screenId - The screen ID for the flow action payload.
 * @param {Object} [args.customData] - Optional custom data to include in the message.
 * @returns {Promise<Object>} - The result of the message sending operation.
 */
const executeFunction = async ({ recipientPhoneNumber, flowId, headerText, bodyText, footerText, flowToken, screenId, customData = {} }) => {
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
          flow_id: flowId,
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
            description: 'The phone number of the recipient.'
          },
          flowId: {
            type: 'string',
            description: 'The ID of the flow to be sent.'
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
          screenId: {
            type: 'string',
            description: 'The screen ID for the flow action payload.'
          },
          customData: {
            type: 'object',
            description: 'Optional custom data to include in the message.'
          }
        },
        required: ['recipientPhoneNumber', 'flowId', 'headerText', 'bodyText', 'footerText', 'flowToken', 'screenId']
      }
    }
  }
};

export { apiTool };
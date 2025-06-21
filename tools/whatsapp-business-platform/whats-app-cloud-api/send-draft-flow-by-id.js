/**
 * Function to send a draft flow message via WhatsApp Cloud API.
 *
 * @param {Object} args - Arguments for sending the draft flow.
 * @param {string} args.recipientPhoneNumber - The phone number of the recipient.
 * @param {string} args.flowId - The ID of the flow to be sent.
 * @param {string} args.version - The API version to use.
 * @param {string} args.phoneNumberId - The phone number ID associated with the WhatsApp Business Account.
 * @param {string} [args.flowToken] - The flow token for the interactive message.
 * @param {string} [args.screenId] - The screen ID for the flow action payload.
 * @param {Object} [args.customData] - Custom data to be sent with the flow action payload.
 * @returns {Promise<Object>} - The result of the API call to send the draft flow.
 */
const executeFunction = async ({ recipientPhoneNumber, flowId, version, phoneNumberId, flowToken = '', screenId = '', customData = {} }) => {
  const url = `https://graph.facebook.com/${version}/${phoneNumberId}/messages`;
  const token = process.env.WHATSAPP_BUSINESS_PLATFORM_API_KEY;

  const body = {
    messaging_product: "whatsapp",
    to: recipientPhoneNumber,
    recipient_type: "individual",
    type: "interactive",
    interactive: {
      type: "flow",
      header: {
        type: "text",
        text: "Not shown in draft mode"
      },
      body: {
        text: "Not shown in draft mode"
      },
      footer: {
        text: "Not shown in draft mode"
      },
      action: {
        name: "flow",
        parameters: {
          flow_message_version: "3",
          flow_action: "navigate",
          flow_token: flowToken,
          flow_id: flowId,
          flow_cta: "Not shown in draft mode",
          mode: "draft",
          flow_action_payload: {
            screen: screenId,
            data: customData
          }
        }
      }
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
    console.error('Error sending draft flow:', error);
    return { error: 'An error occurred while sending the draft flow.' };
  }
};

/**
 * Tool configuration for sending a draft flow message via WhatsApp Cloud API.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'send_draft_flow',
      description: 'Send a draft flow message via WhatsApp Cloud API.',
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
          version: {
            type: 'string',
            description: 'The API version to use.'
          },
          phoneNumberId: {
            type: 'string',
            description: 'The phone number ID associated with the WhatsApp Business Account.'
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
            description: 'Custom data to be sent with the flow action payload.'
          }
        },
        required: ['recipientPhoneNumber', 'flowId', 'version', 'phoneNumberId']
      }
    }
  }
};

export { apiTool };
/**
 * Function to create a flow template message in WhatsApp Cloud API.
 *
 * @param {Object} args - Arguments for creating the flow template message.
 * @param {string} args.templateName - The name of the template to be created.
 * @param {string} args.flowName - The name of the flow to navigate to.
 * @param {string} args.screenId - The ID of the screen to navigate to.
 * @param {string} args.version - The API version to use.
 * @param {string} args.wabaId - The WhatsApp Business Account ID.
 * @returns {Promise<Object>} - The result of the template creation.
 */
const executeFunction = async ({ templateName, flowName, screenId, version, wabaId }) => {
  const baseUrl = 'https://graph.facebook.com';
  const token = process.env.WHATSAPP_BUSINESS_PLATFORM_API_KEY;

  const requestBody = {
    name: templateName,
    language: 'en_US',
    category: 'MARKETING',
    components: [
      {
        type: 'body',
        text: 'Check out this new offer'
      },
      {
        type: 'BUTTONS',
        buttons: [
          {
            type: 'FLOW',
            text: 'Check out this offer!',
            flow_name: flowName,
            navigate_screen: screenId,
            flow_action: 'navigate'
          }
        ]
      }
    ]
  };

  try {
    // Set up headers for the request
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };

    // Perform the fetch request
    const response = await fetch(`${baseUrl}/${version}/${wabaId}/message_templates`, {
      method: 'POST',
      headers,
      body: JSON.stringify(requestBody)
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
    console.error('Error creating flow template message:', error);
    return { error: 'An error occurred while creating the flow template message.' };
  }
};

/**
 * Tool configuration for creating a flow template message in WhatsApp Cloud API.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'create_flow_template_message',
      description: 'Create a flow template message in WhatsApp Cloud API.',
      parameters: {
        type: 'object',
        properties: {
          templateName: {
            type: 'string',
            description: 'The name of the template to be created.'
          },
          flowName: {
            type: 'string',
            description: 'The name of the flow to navigate to.'
          },
          screenId: {
            type: 'string',
            description: 'The ID of the screen to navigate to.'
          },
          version: {
            type: 'string',
            description: 'The API version to use.'
          },
          wabaId: {
            type: 'string',
            description: 'The WhatsApp Business Account ID.'
          }
        },
        required: ['templateName', 'flowName', 'screenId', 'version', 'wabaId']
      }
    }
  }
};

export { apiTool };
/**
 * Function to create a flow template message using the WhatsApp Cloud API.
 *
 * @param {Object} args - Arguments for creating the flow template message.
 * @param {string} args.templateName - The name of the template.
 * @param {string} args.language - The language of the template (default is "en_US").
 * @param {string} args.category - The category of the template (default is "MARKETING").
 * @param {string} args.bodyText - The text for the body component of the template.
 * @returns {Promise<Object>} - The result of the template creation.
 */
const executeFunction = async ({ templateName, language = 'en_US', category = 'MARKETING', bodyText }) => {
  const baseUrl = 'https://graph.facebook.com';
  const version = ''; // will be provided by the user
  const wabaId = ''; // will be provided by the user
  const token = process.env.WHATSAPP_BUSINESS_PLATFORM_API_KEY;

  try {
    // Construct the URL for the API request
    const url = `${baseUrl}/${version}/${wabaId}/message_templates`;

    // Prepare the request body
    const requestBody = {
      name: templateName,
      language: language,
      category: category,
      components: [
        {
          type: 'body',
          text: bodyText
        },
        {
          type: 'BUTTONS',
          buttons: [
            {
              type: 'FLOW',
              text: 'Check out this offer!',
              flow_json: JSON.stringify({
                version: '5.0',
                screens: [
                  {
                    id: 'WELCOME_SCREEN',
                    layout: {
                      type: 'SingleColumnLayout',
                      children: [
                        { type: 'TextHeading', text: 'Hello World' },
                        { type: 'Footer', label: 'Complete', 'on-click-action': { name: 'complete', payload: {} } }
                      ]
                    },
                    title: 'Welcome',
                    terminal: true,
                    success: true,
                    data: {}
                  }
                ]
              }),
              navigate_screen: 'WELCOME_SCREEN',
              flow_action: 'navigate'
            }
          ]
        }
      ]
    };

    // Set up headers for the request
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };

    // Perform the fetch request
    const response = await fetch(url, {
      method: 'POST',
      headers: headers,
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
 * Tool configuration for creating flow template messages using the WhatsApp Cloud API.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'create_flow_template_message',
      description: 'Create a flow template message using the WhatsApp Cloud API.',
      parameters: {
        type: 'object',
        properties: {
          templateName: {
            type: 'string',
            description: 'The name of the template.'
          },
          language: {
            type: 'string',
            description: 'The language of the template.'
          },
          category: {
            type: 'string',
            description: 'The category of the template.'
          },
          bodyText: {
            type: 'string',
            description: 'The text for the body component of the template.'
          }
        },
        required: ['templateName', 'bodyText']
      }
    }
  }
};

export { apiTool };
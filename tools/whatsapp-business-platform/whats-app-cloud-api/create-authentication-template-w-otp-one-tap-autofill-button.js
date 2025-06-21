/**
 * Function to create an authentication template with an OTP one-tap autofill button on WhatsApp Cloud API.
 *
 * @param {Object} args - Arguments for creating the authentication template.
 * @param {string} args.name - The name of the authentication template.
 * @param {string} args.language - The language for the template.
 * @param {string} args.category - The category of the template.
 * @param {Array} args.components - The components of the template.
 * @param {string} args.version - The API version.
 * @param {string} args.wabaId - The WhatsApp Business Account ID.
 * @returns {Promise<Object>} - The result of the template creation.
 */
const executeFunction = async ({ name, language, category, components, version, wabaId }) => {
  const baseUrl = 'https://graph.facebook.com';
  const token = process.env.WHATSAPP_BUSINESS_PLATFORM_API_KEY;
  try {
    // Construct the URL for the API request
    const url = `${baseUrl}/${version}/${wabaId}/message_templates`;

    // Set up headers for the request
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };

    // Prepare the request body
    const body = JSON.stringify({
      name,
      language,
      category,
      components
    });

    // Perform the fetch request
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body
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
    console.error('Error creating authentication template:', error);
    return { error: 'An error occurred while creating the authentication template.' };
  }
};

/**
 * Tool configuration for creating an authentication template on WhatsApp Cloud API.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'create_auth_template',
      description: 'Create an authentication template with an OTP one-tap autofill button on WhatsApp Cloud API.',
      parameters: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
            description: 'The name of the authentication template.'
          },
          language: {
            type: 'string',
            description: 'The language for the template.'
          },
          category: {
            type: 'string',
            description: 'The category of the template.'
          },
          components: {
            type: 'array',
            description: 'The components of the template.'
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
        required: ['name', 'language', 'category', 'components', 'version', 'wabaId']
      }
    }
  }
};

export { apiTool };
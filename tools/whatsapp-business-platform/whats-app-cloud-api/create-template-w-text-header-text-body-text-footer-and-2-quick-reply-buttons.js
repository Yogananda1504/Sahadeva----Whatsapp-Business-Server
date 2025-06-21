/**
 * Function to create a message template in WhatsApp Cloud API.
 *
 * @param {Object} args - Arguments for creating the message template.
 * @param {string} args.name - The name of the template.
 * @param {string} args.language - The language of the template.
 * @param {string} args.category - The category of the template.
 * @param {Array} args.components - The components of the template.
 * @returns {Promise<Object>} - The result of the template creation.
 */
const executeFunction = async ({ name, language, category, components }) => {
  const version = ''; // will be provided by the user
  const wabaId = ''; // will be provided by the user
  const token = process.env.WHATSAPP_BUSINESS_PLATFORM_API_KEY;

  const url = `https://graph.facebook.com/${version}/${wabaId}/message_templates`;
  
  const body = {
    name,
    language,
    category,
    components
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
    console.error('Error creating message template:', error);
    return { error: 'An error occurred while creating the message template.' };
  }
};

/**
 * Tool configuration for creating a message template in WhatsApp Cloud API.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'create_message_template',
      description: 'Create a message template in WhatsApp Cloud API.',
      parameters: {
        type: 'object',
        properties: {
          name: {
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
          components: {
            type: 'array',
            description: 'The components of the template.'
          }
        },
        required: ['name', 'language', 'category', 'components']
      }
    }
  }
};

export { apiTool };
/**
 * Function to update flow metadata in the WhatsApp Cloud API.
 *
 * @param {Object} args - Arguments for updating flow metadata.
 * @param {string} args.flowId - The ID of the flow to update.
 * @param {string} args.version - The API version to use.
 * @param {string} args.name - The new name for the flow.
 * @param {Array<string>} args.categories - A list of flow categories.
 * @param {string} args.endpoint_uri - The endpoint URI for the flow.
 * @returns {Promise<Object>} - The result of the update operation.
 */
const executeFunction = async ({ flowId, version, name, categories, endpoint_uri }) => {
  const baseUrl = 'https://graph.facebook.com';
  const token = process.env.WHATSAPP_BUSINESS_PLATFORM_API_KEY;
  try {
    // Construct the URL for the request
    const url = `${baseUrl}/${version}/${flowId}`;

    // Set up headers for the request
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };

    // Prepare the body of the request
    const body = JSON.stringify({
      name,
      categories,
      endpoint_uri
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
    console.error('Error updating flow metadata:', error);
    return { error: 'An error occurred while updating flow metadata.' };
  }
};

/**
 * Tool configuration for updating flow metadata in the WhatsApp Cloud API.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'update_flow_metadata',
      description: 'Update flow metadata in the WhatsApp Cloud API.',
      parameters: {
        type: 'object',
        properties: {
          flowId: {
            type: 'string',
            description: 'The ID of the flow to update.'
          },
          version: {
            type: 'string',
            description: 'The API version to use.'
          },
          name: {
            type: 'string',
            description: 'The new name for the flow.'
          },
          categories: {
            type: 'array',
            items: {
              type: 'string'
            },
            description: 'A list of flow categories.'
          },
          endpoint_uri: {
            type: 'string',
            description: 'The endpoint URI for the flow.'
          }
        },
        required: ['flowId', 'version', 'name', 'categories', 'endpoint_uri']
      }
    }
  }
};

export { apiTool };
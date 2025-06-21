/**
 * Function to list assets attached to a specific flow in the WhatsApp Cloud API.
 *
 * @param {Object} args - Arguments for the asset listing.
 * @param {string} args.version - The API version to use.
 * @param {string} args.flowId - The ID of the flow for which to list assets.
 * @returns {Promise<Object>} - The result of the asset listing.
 */
const executeFunction = async ({ version, flowId }) => {
  const baseUrl = 'https://graph.facebook.com';
  const token = process.env.WHATSAPP_BUSINESS_PLATFORM_API_KEY;
  try {
    // Construct the URL for the request
    const url = `${baseUrl}/${version}/${flowId}/assets`;

    // Set up headers for the request
    const headers = {
      'Authorization': `Bearer ${token}`
    };

    // Perform the fetch request
    const response = await fetch(url, {
      method: 'GET',
      headers
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
    console.error('Error listing assets:', error);
    return { error: 'An error occurred while listing assets.' };
  }
};

/**
 * Tool configuration for listing assets attached to a flow in the WhatsApp Cloud API.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'list_assets',
      description: 'List assets attached to a specific flow in the WhatsApp Cloud API.',
      parameters: {
        type: 'object',
        properties: {
          version: {
            type: 'string',
            description: 'The API version to use.'
          },
          flowId: {
            type: 'string',
            description: 'The ID of the flow for which to list assets.'
          }
        },
        required: ['version', 'flowId']
      }
    }
  }
};

export { apiTool };
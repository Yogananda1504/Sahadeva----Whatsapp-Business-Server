/**
 * Function to deprecate a flow in the WhatsApp Cloud API.
 *
 * @param {Object} args - Arguments for the deprecation.
 * @param {string} args.version - The API version to use.
 * @param {string} args.flowId - The ID of the flow to deprecate.
 * @returns {Promise<Object>} - The result of the deprecation request.
 */
const executeFunction = async ({ version, flowId }) => {
  const baseUrl = 'https://graph.facebook.com';
  const token = process.env.WHATSAPP_BUSINESS_PLATFORM_API_KEY;
  try {
    // Construct the URL for the deprecation request
    const url = `${baseUrl}/${version}/${flowId}/deprecate`;

    // Set up headers for the request
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };

    // Perform the fetch request
    const response = await fetch(url, {
      method: 'POST',
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
    console.error('Error deprecating flow:', error);
    return { error: 'An error occurred while deprecating the flow.' };
  }
};

/**
 * Tool configuration for deprecating a flow in the WhatsApp Cloud API.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'deprecate_flow',
      description: 'Deprecate a flow in the WhatsApp Cloud API.',
      parameters: {
        type: 'object',
        properties: {
          version: {
            type: 'string',
            description: 'The API version to use.'
          },
          flowId: {
            type: 'string',
            description: 'The ID of the flow to deprecate.'
          }
        },
        required: ['version', 'flowId']
      }
    }
  }
};

export { apiTool };
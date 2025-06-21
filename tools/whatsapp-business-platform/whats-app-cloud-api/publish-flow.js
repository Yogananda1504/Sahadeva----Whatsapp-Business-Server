/**
 * Function to publish a flow in the WhatsApp Cloud API.
 *
 * @param {Object} args - Arguments for publishing the flow.
 * @param {string} args.version - The API version to use.
 * @param {string} args.flowId - The ID of the flow to publish.
 * @returns {Promise<Object>} - The result of the publish operation.
 */
const executeFunction = async ({ version, flowId }) => {
  const baseUrl = 'https://graph.facebook.com';
  const token = process.env.WHATSAPP_BUSINESS_PLATFORM_API_KEY;
  try {
    // Construct the URL for the publish request
    const url = `${baseUrl}/${version}/${flowId}/publish`;

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
    console.error('Error publishing flow:', error);
    return { error: 'An error occurred while publishing the flow.' };
  }
};

/**
 * Tool configuration for publishing a flow in the WhatsApp Cloud API.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'publish_flow',
      description: 'Publish a flow in the WhatsApp Cloud API.',
      parameters: {
        type: 'object',
        properties: {
          version: {
            type: 'string',
            description: 'The API version to use.'
          },
          flowId: {
            type: 'string',
            description: 'The ID of the flow to publish.'
          }
        },
        required: ['version', 'flowId']
      }
    }
  }
};

export { apiTool };
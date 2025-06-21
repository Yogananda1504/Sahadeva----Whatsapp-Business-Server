/**
 * Function to delete a flow in the WhatsApp Cloud API.
 *
 * @param {Object} args - Arguments for the delete flow operation.
 * @param {string} args.version - The API version to use.
 * @param {string} args.flowId - The ID of the flow to delete.
 * @returns {Promise<Object>} - The result of the delete operation.
 */
const executeFunction = async ({ version, flowId }) => {
  const baseUrl = 'https://graph.facebook.com';
  const token = process.env.WHATSAPP_BUSINESS_PLATFORM_API_KEY;
  try {
    // Construct the URL for the delete request
    const url = `${baseUrl}/${version}/${flowId}`;

    // Set up headers for the request
    const headers = {
      'Authorization': `Bearer ${token}`
    };

    // Perform the fetch request
    const response = await fetch(url, {
      method: 'DELETE',
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
    console.error('Error deleting the flow:', error);
    return { error: 'An error occurred while deleting the flow.' };
  }
};

/**
 * Tool configuration for deleting a flow in the WhatsApp Cloud API.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'delete_flow',
      description: 'Delete a flow in the WhatsApp Cloud API.',
      parameters: {
        type: 'object',
        properties: {
          version: {
            type: 'string',
            description: 'The API version to use.'
          },
          flowId: {
            type: 'string',
            description: 'The ID of the flow to delete.'
          }
        },
        required: ['version', 'flowId']
      }
    }
  }
};

export { apiTool };
/**
 * Function to get a specific flow from the WhatsApp Cloud API.
 *
 * @param {Object} args - Arguments for the flow retrieval.
 * @param {string} args.version - The API version to use.
 * @param {string} args.flowId - The ID of the flow to retrieve.
 * @returns {Promise<Object>} - The result of the flow retrieval.
 */
const executeFunction = async ({ version, flowId }) => {
  const baseUrl = 'https://graph.facebook.com';
  const token = process.env.WHATSAPP_BUSINESS_PLATFORM_API_KEY;
  try {
    // Construct the URL with query parameters
    const url = new URL(`${baseUrl}/${version}/${flowId}`);
    url.searchParams.append('fields', 'id,name,categories,preview,status,validation_errors,json_version,data_api_version,data_channel_uri,health_status,whatsapp_business_account,application');

    // Set up headers for the request
    const headers = {
      'Authorization': `Bearer ${token}`
    };

    // Perform the fetch request
    const response = await fetch(url.toString(), {
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
    console.error('Error retrieving flow:', error);
    return { error: 'An error occurred while retrieving the flow.' };
  }
};

/**
 * Tool configuration for retrieving a flow from the WhatsApp Cloud API.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_flow',
      description: 'Retrieve a specific flow from the WhatsApp Cloud API.',
      parameters: {
        type: 'object',
        properties: {
          version: {
            type: 'string',
            description: 'The API version to use.'
          },
          flowId: {
            type: 'string',
            description: 'The ID of the flow to retrieve.'
          }
        },
        required: ['version', 'flowId']
      }
    }
  }
};

export { apiTool };
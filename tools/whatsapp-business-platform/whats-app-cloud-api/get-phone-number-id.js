/**
 * Function to get the phone number ID associated with a WhatsApp Business Account (WABA).
 *
 * @param {Object} args - Arguments for the request.
 * @param {string} args.version - The API version to use.
 * @param {string} args.wabaId - The ID of the WhatsApp Business Account.
 * @returns {Promise<Object>} - The response containing the phone number ID(s).
 */
const executeFunction = async ({ version, wabaId }) => {
  const baseUrl = 'https://graph.facebook.com';
  const token = process.env.WHATSAPP_BUSINESS_PLATFORM_API_KEY;
  try {
    // Construct the URL for the API request
    const url = `${baseUrl}/${version}/${wabaId}/phone_numbers`;

    // Set up headers for the request
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
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
    console.error('Error getting phone number ID:', error);
    return { error: 'An error occurred while getting the phone number ID.' };
  }
};

/**
 * Tool configuration for getting phone number ID from WhatsApp Cloud API.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_phone_number_id',
      description: 'Get the phone number ID associated with a WhatsApp Business Account (WABA).',
      parameters: {
        type: 'object',
        properties: {
          version: {
            type: 'string',
            description: 'The API version to use.'
          },
          wabaId: {
            type: 'string',
            description: 'The ID of the WhatsApp Business Account.'
          }
        },
        required: ['version', 'wabaId']
      }
    }
  }
};

export { apiTool };
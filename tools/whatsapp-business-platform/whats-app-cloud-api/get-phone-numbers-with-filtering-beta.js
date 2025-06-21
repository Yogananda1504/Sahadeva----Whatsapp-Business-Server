/**
 * Function to get phone numbers from WhatsApp Business Account with filtering options.
 *
 * @param {Object} args - Arguments for the phone number retrieval.
 * @param {string} args.version - The API version to use.
 * @param {string} args.wabaId - The WhatsApp Business Account ID.
 * @returns {Promise<Object>} - The result of the phone number retrieval.
 */
const executeFunction = async ({ version, wabaId }) => {
  const baseUrl = 'https://graph.facebook.com';
  const token = process.env.WHATSAPP_BUSINESS_PLATFORM_API_KEY;
  try {
    // Construct the URL with query parameters
    const url = `${baseUrl}/${version}/${wabaId}/phone_numbers?fields=id,is_official_business_account,display_phone_number,verified_name&filtering=[{'field':'account_mode','operator':'EQUAL','value':'SANDBOX'}]`;

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
    console.error('Error retrieving phone numbers:', error);
    return { error: 'An error occurred while retrieving phone numbers.' };
  }
};

/**
 * Tool configuration for retrieving phone numbers from WhatsApp Business Account.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_phone_numbers',
      description: 'Retrieve phone numbers from WhatsApp Business Account with filtering options.',
      parameters: {
        type: 'object',
        properties: {
          version: {
            type: 'string',
            description: 'The API version to use.'
          },
          wabaId: {
            type: 'string',
            description: 'The WhatsApp Business Account ID.'
          }
        },
        required: ['version', 'wabaId']
      }
    }
  }
};

export { apiTool };
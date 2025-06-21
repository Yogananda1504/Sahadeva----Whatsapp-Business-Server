/**
 * Function to get owned WhatsApp Business Accounts (WABAs).
 *
 * @param {Object} args - Arguments for the request.
 * @param {string} args.version - The API version to use.
 * @param {string} args.businessId - The ID of the business to retrieve WABAs for.
 * @returns {Promise<Object>} - The response containing owned WABAs.
 */
const executeFunction = async ({ version, businessId }) => {
  const baseUrl = 'https://graph.facebook.com';
  const token = process.env.WHATSAPP_BUSINESS_PLATFORM_API_KEY;
  try {
    // Construct the URL for the request
    const url = `${baseUrl}/${version}/${businessId}/owned_whatsapp_business_accounts`;

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
    console.error('Error getting owned WABAs:', error);
    return { error: 'An error occurred while getting owned WABAs.' };
  }
};

/**
 * Tool configuration for getting owned WhatsApp Business Accounts (WABAs).
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_owned_wabas',
      description: 'Get owned WhatsApp Business Accounts (WABAs).',
      parameters: {
        type: 'object',
        properties: {
          version: {
            type: 'string',
            description: 'The API version to use.'
          },
          businessId: {
            type: 'string',
            description: 'The ID of the business to retrieve WABAs for.'
          }
        },
        required: ['version', 'businessId']
      }
    }
  }
};

export { apiTool };
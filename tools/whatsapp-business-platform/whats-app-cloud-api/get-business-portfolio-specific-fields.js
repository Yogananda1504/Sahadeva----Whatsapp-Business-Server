/**
 * Function to get business portfolio details from the WhatsApp Cloud API.
 *
 * @param {Object} args - Arguments for the request.
 * @param {string} args.version - The API version to use.
 * @param {string} args.businessId - The ID of the business portfolio.
 * @returns {Promise<Object>} - The details of the business portfolio.
 */
const executeFunction = async ({ version, businessId }) => {
  const token = process.env.WHATSAPP_BUSINESS_PLATFORM_API_KEY;
  const baseUrl = 'https://graph.facebook.com';
  
  try {
    // Construct the URL with the provided version and business ID
    const url = `${baseUrl}/${version}/${businessId}?fields=id,name,timezone_id`;

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
    console.error('Error fetching business portfolio:', error);
    return { error: 'An error occurred while fetching the business portfolio.' };
  }
};

/**
 * Tool configuration for getting business portfolio details from the WhatsApp Cloud API.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_business_portfolio',
      description: 'Get details of a business portfolio from the WhatsApp Cloud API.',
      parameters: {
        type: 'object',
        properties: {
          version: {
            type: 'string',
            description: 'The API version to use.'
          },
          businessId: {
            type: 'string',
            description: 'The ID of the business portfolio.'
          }
        },
        required: ['version', 'businessId']
      }
    }
  }
};

export { apiTool };
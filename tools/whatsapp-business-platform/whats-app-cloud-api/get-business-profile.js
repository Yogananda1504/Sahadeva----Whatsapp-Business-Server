/**
 * Function to get the business profile from WhatsApp Cloud API.
 *
 * @param {Object} args - Arguments for the request.
 * @param {string} args.phoneNumberId - The ID of the phone number associated with the business.
 * @param {string} args.version - The API version to use.
 * @returns {Promise<Object>} - The business profile information.
 */
const executeFunction = async ({ phoneNumberId, version }) => {
  const baseUrl = 'https://graph.facebook.com';
  const token = process.env.WHATSAPP_BUSINESS_PLATFORM_API_KEY;

  try {
    // Construct the URL for the request
    const url = `${baseUrl}/${version}/${phoneNumberId}/whatsapp_business_profile`;

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
    console.error('Error getting business profile:', error);
    return { error: 'An error occurred while retrieving the business profile.' };
  }
};

/**
 * Tool configuration for getting the business profile from WhatsApp Cloud API.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_business_profile',
      description: 'Get information about a business profile from WhatsApp Cloud API.',
      parameters: {
        type: 'object',
        properties: {
          phoneNumberId: {
            type: 'string',
            description: 'The ID of the phone number associated with the business.'
          },
          version: {
            type: 'string',
            description: 'The API version to use.'
          }
        },
        required: ['phoneNumberId', 'version']
      }
    }
  }
};

export { apiTool };
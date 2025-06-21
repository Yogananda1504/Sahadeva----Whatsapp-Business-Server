/**
 * Function to get a phone number by its ID from the WhatsApp Cloud API.
 *
 * @param {Object} args - Arguments for the request.
 * @param {string} args.phoneNumberId - The ID of the phone number to retrieve.
 * @param {string} args.version - The API version to use.
 * @returns {Promise<Object>} - The details of the phone number.
 */
const executeFunction = async ({ phoneNumberId, version }) => {
  const baseUrl = 'https://graph.facebook.com';
  const token = process.env.WHATSAPP_BUSINESS_PLATFORM_API_KEY;

  try {
    // Construct the URL for the request
    const url = `${baseUrl}/${version}/${phoneNumberId}`;

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
    console.error('Error retrieving phone number:', error);
    return { error: 'An error occurred while retrieving the phone number.' };
  }
};

/**
 * Tool configuration for getting a phone number by ID from the WhatsApp Cloud API.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_phone_number_by_id',
      description: 'Get details of a phone number by its ID from the WhatsApp Cloud API.',
      parameters: {
        type: 'object',
        properties: {
          phoneNumberId: {
            type: 'string',
            description: 'The ID of the phone number to retrieve.'
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
/**
 * Function to get the encryption public key for a WhatsApp Business Account.
 *
 * @param {Object} args - Arguments for the request.
 * @param {string} args.version - The API version to use.
 * @param {string} args.phoneNumberId - The ID of the phone number associated with the WhatsApp Business Account.
 * @returns {Promise<Object>} - The response containing the encryption public key.
 */
const executeFunction = async ({ version, phoneNumberId }) => {
  const baseUrl = 'https://graph.facebook.com';
  const token = process.env.WHATSAPP_BUSINESS_PLATFORM_API_KEY;

  try {
    // Construct the URL for the request
    const url = `${baseUrl}/${version}/${phoneNumberId}/whatsapp_business_encryption`;

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
    console.error('Error getting encryption public key:', error);
    return { error: 'An error occurred while getting the encryption public key.' };
  }
};

/**
 * Tool configuration for getting the encryption public key for a WhatsApp Business Account.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_encryption_public_key',
      description: 'Get the encryption public key for a WhatsApp Business Account.',
      parameters: {
        type: 'object',
        properties: {
          version: {
            type: 'string',
            description: 'The API version to use.'
          },
          phoneNumberId: {
            type: 'string',
            description: 'The ID of the phone number associated with the WhatsApp Business Account.'
          }
        },
        required: ['version', 'phoneNumberId']
      }
    }
  }
};

export { apiTool };
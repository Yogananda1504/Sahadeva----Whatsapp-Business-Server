/**
 * Function to set the encryption public key for WhatsApp Business API.
 *
 * @param {Object} args - Arguments for setting the encryption public key.
 * @param {string} args.business_public_key - The public key used for encrypting the data channel requests.
 * @param {string} args.version - The API version to use.
 * @param {string} args.phoneNumberId - The phone number ID associated with the WhatsApp Business Account.
 * @returns {Promise<Object>} - The result of the public key setting operation.
 */
const executeFunction = async ({ business_public_key, version, phoneNumberId }) => {
  const baseUrl = 'https://graph.facebook.com';
  const token = process.env.WHATSAPP_BUSINESS_PLATFORM_API_KEY;
  try {
    // Construct the URL for the request
    const url = `${baseUrl}/${version}/${phoneNumberId}/whatsapp_business_encryption`;

    // Set up headers for the request
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };

    // Prepare the request body
    const body = JSON.stringify({
      business_public_key
    });

    // Perform the fetch request
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body
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
    console.error('Error setting encryption public key:', error);
    return { error: 'An error occurred while setting the encryption public key.' };
  }
};

/**
 * Tool configuration for setting the encryption public key for WhatsApp Business API.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'set_encryption_public_key',
      description: 'Set the encryption public key for WhatsApp Business API.',
      parameters: {
        type: 'object',
        properties: {
          business_public_key: {
            type: 'string',
            description: 'The public key used for encrypting the data channel requests.'
          },
          version: {
            type: 'string',
            description: 'The API version to use.'
          },
          phoneNumberId: {
            type: 'string',
            description: 'The phone number ID associated with the WhatsApp Business Account.'
          }
        },
        required: ['business_public_key', 'version', 'phoneNumberId']
      }
    }
  }
};

export { apiTool };
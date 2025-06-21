/**
 * Function to deregister a phone number from the WhatsApp Cloud API.
 *
 * @param {Object} args - Arguments for the deregistration.
 * @param {string} args.phoneNumberId - The ID of the phone number to deregister.
 * @param {string} args.version - The API version to use.
 * @returns {Promise<Object>} - The result of the deregistration request.
 */
const executeFunction = async ({ phoneNumberId, version }) => {
  const baseUrl = `https://graph.facebook.com/${version}/${phoneNumberId}/deregister`;
  const token = process.env.WHATSAPP_BUSINESS_PLATFORM_API_KEY;

  try {
    // Set up headers for the request
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };

    // Perform the fetch request
    const response = await fetch(baseUrl, {
      method: 'POST',
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
    console.error('Error deregistering phone:', error);
    return { error: 'An error occurred while deregistering the phone.' };
  }
};

/**
 * Tool configuration for deregistering a phone number from the WhatsApp Cloud API.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'deregister_phone',
      description: 'Deregister a phone number from the WhatsApp Cloud API.',
      parameters: {
        type: 'object',
        properties: {
          phoneNumberId: {
            type: 'string',
            description: 'The ID of the phone number to deregister.'
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
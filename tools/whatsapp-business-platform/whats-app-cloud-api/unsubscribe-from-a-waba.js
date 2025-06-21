/**
 * Function to unsubscribe from a WhatsApp Business Account (WABA).
 *
 * @param {Object} args - Arguments for the unsubscribe request.
 * @param {string} args.version - The API version to use.
 * @param {string} args.wabaId - The ID of the WhatsApp Business Account to unsubscribe from.
 * @returns {Promise<Object>} - The result of the unsubscribe operation.
 */
const executeFunction = async ({ version, wabaId }) => {
  const token = process.env.WHATSAPP_BUSINESS_PLATFORM_API_KEY;
  const baseUrl = 'https://graph.facebook.com';
  
  try {
    // Construct the URL for the unsubscribe request
    const url = `${baseUrl}/${version}/${wabaId}/subscribed_apps`;

    // Set up headers for the request
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };

    // Perform the fetch request
    const response = await fetch(url, {
      method: 'DELETE',
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
    console.error('Error unsubscribing from WABA:', error);
    return { error: 'An error occurred while unsubscribing from the WABA.' };
  }
};

/**
 * Tool configuration for unsubscribing from a WhatsApp Business Account (WABA).
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'unsubscribe_from_waba',
      description: 'Unsubscribe from a WhatsApp Business Account (WABA).',
      parameters: {
        type: 'object',
        properties: {
          version: {
            type: 'string',
            description: 'The API version to use.'
          },
          wabaId: {
            type: 'string',
            description: 'The ID of the WhatsApp Business Account to unsubscribe from.'
          }
        },
        required: ['version', 'wabaId']
      }
    }
  }
};

export { apiTool };
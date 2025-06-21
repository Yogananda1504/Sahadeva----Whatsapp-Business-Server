/**
 * Function to get all subscriptions for a WhatsApp Business Account (WABA).
 *
 * @param {Object} args - Arguments for the request.
 * @param {string} args.version - The API version to use.
 * @param {string} args.wabaId - The ID of the WhatsApp Business Account.
 * @returns {Promise<Object>} - The response containing the list of subscribed apps.
 */
const executeFunction = async ({ version, wabaId }) => {
  const token = process.env.WHATSAPP_BUSINESS_PLATFORM_API_KEY;
  const baseUrl = `https://graph.facebook.com/${version}/${wabaId}/subscribed_apps`;

  try {
    // Set up headers for the request
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };

    // Perform the fetch request
    const response = await fetch(baseUrl, {
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
    console.error('Error getting subscriptions for WABA:', error);
    return { error: 'An error occurred while getting subscriptions for WABA.' };
  }
};

/**
 * Tool configuration for getting all subscriptions for a WABA.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_all_subscriptions_for_waba',
      description: 'Get all subscriptions for a WhatsApp Business Account (WABA).',
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
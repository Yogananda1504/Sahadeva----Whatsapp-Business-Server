/**
 * Function to subscribe an app to a WhatsApp Business Account (WABA).
 *
 * @param {Object} args - Arguments for the subscription.
 * @param {string} args.version - The API version to use.
 * @param {string} args.wabaId - The ID of the WhatsApp Business Account to subscribe to.
 * @returns {Promise<Object>} - The result of the subscription request.
 */
const executeFunction = async ({ version, wabaId }) => {
  const baseUrl = 'https://graph.facebook.com';
  const token = process.env.WHATSAPP_BUSINESS_PLATFORM_API_KEY;
  try {
    // Construct the URL for the subscription request
    const url = `${baseUrl}/${version}/${wabaId}/subscribed_apps`;

    // Set up headers for the request
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };

    // Perform the fetch request
    const response = await fetch(url, {
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
    console.error('Error subscribing to WABA:', error);
    return { error: 'An error occurred while subscribing to the WhatsApp Business Account.' };
  }
};

/**
 * Tool configuration for subscribing to a WhatsApp Business Account.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'subscribe_to_waba',
      description: 'Subscribe an app to a WhatsApp Business Account.',
      parameters: {
        type: 'object',
        properties: {
          version: {
            type: 'string',
            description: 'The API version to use.'
          },
          wabaId: {
            type: 'string',
            description: 'The ID of the WhatsApp Business Account to subscribe to.'
          }
        },
        required: ['version', 'wabaId']
      }
    }
  }
};

export { apiTool };
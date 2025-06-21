/**
 * Function to subscribe an app to a WhatsApp Business Account (WABA).
 *
 * @param {Object} args - Arguments for the subscription.
 * @param {string} args.WABA_ID - The ID of the WhatsApp Business Account to subscribe.
 * @param {string} args.Version - The version of the WhatsApp API to use.
 * @returns {Promise<Object>} - The result of the subscription request.
 */
const executeFunction = async ({ WABA_ID, Version }) => {
  const token = process.env.WHATSAPP_BUSINESS_PLATFORM_API_KEY;
  const baseUrl = `https://graph.facebook.com/${Version}/${WABA_ID}/subscribed_apps`;

  try {
    // Set up headers for the request
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
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
    console.error('Error subscribing to WABA:', error);
    return { error: 'An error occurred while subscribing to WABA.' };
  }
};

/**
 * Tool configuration for subscribing to a WhatsApp Business Account (WABA).
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'subscribe_to_waba',
      description: 'Subscribe an app to a WhatsApp Business Account (WABA).',
      parameters: {
        type: 'object',
        properties: {
          WABA_ID: {
            type: 'string',
            description: 'The ID of the WhatsApp Business Account to subscribe.'
          },
          Version: {
            type: 'string',
            description: 'The version of the WhatsApp API to use.'
          }
        },
        required: ['WABA_ID', 'Version']
      }
    }
  }
};

export { apiTool };
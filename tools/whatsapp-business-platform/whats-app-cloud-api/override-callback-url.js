/**
 * Function to override the callback URL for WhatsApp Webhooks.
 *
 * @param {Object} args - Arguments for the override callback URL.
 * @param {string} args.override_callback_uri - The alternate webhook endpoint URL.
 * @param {string} args.verify_token - The verification token for the alternate webhook endpoint.
 * @param {string} args.WABA_ID - The WhatsApp Business Account ID.
 * @param {string} args.Version - The API version to use.
 * @returns {Promise<Object>} - The result of the override callback URL request.
 */
const executeFunction = async ({ override_callback_uri, verify_token, WABA_ID, Version }) => {
  const baseUrl = 'https://graph.facebook.com';
  const token = process.env.WHATSAPP_BUSINESS_PLATFORM_API_KEY;

  try {
    // Construct the URL for the request
    const url = `${baseUrl}/${Version}/${WABA_ID}/subscribed_apps`;

    // Set up headers for the request
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };

    // Prepare the request body
    const body = JSON.stringify({
      override_callback_uri,
      verify_token
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
    console.error('Error overriding callback URL:', error);
    return { error: 'An error occurred while overriding the callback URL.' };
  }
};

/**
 * Tool configuration for overriding the callback URL for WhatsApp Webhooks.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'override_callback_url',
      description: 'Override the callback URL for WhatsApp Webhooks.',
      parameters: {
        type: 'object',
        properties: {
          override_callback_uri: {
            type: 'string',
            description: 'The alternate webhook endpoint URL.'
          },
          verify_token: {
            type: 'string',
            description: 'The verification token for the alternate webhook endpoint.'
          },
          WABA_ID: {
            type: 'string',
            description: 'The WhatsApp Business Account ID.'
          },
          Version: {
            type: 'string',
            description: 'The API version to use.'
          }
        },
        required: ['override_callback_uri', 'verify_token', 'WABA_ID', 'Version']
      }
    }
  }
};

export { apiTool };
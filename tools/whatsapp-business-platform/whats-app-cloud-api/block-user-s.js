/**
 * Function to block users on WhatsApp using the Cloud API.
 *
 * @param {Object} args - Arguments for blocking users.
 * @param {string} args.phoneNumberId - The ID of the WhatsApp Business Phone Number.
 * @param {string} args.version - The API version to use.
 * @param {Array<string>} args.users - An array of phone numbers to block.
 * @returns {Promise<Object>} - The result of the block users request.
 */
const executeFunction = async ({ phoneNumberId, version, users }) => {
  const baseUrl = 'https://graph.facebook.com';
  const token = process.env.WHATSAPP_BUSINESS_PLATFORM_API_KEY;

  try {
    // Construct the URL for the API request
    const url = `${baseUrl}/${version}/${phoneNumberId}/block_users`;

    // Prepare the request body
    const body = {
      messaging_product: "whatsapp",
      block_users: users.map(user => ({ user }))
    };

    // Set up headers for the request
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };

    // Perform the fetch request
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(body)
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
    console.error('Error blocking users:', error);
    return { error: 'An error occurred while blocking users.' };
  }
};

/**
 * Tool configuration for blocking users on WhatsApp.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'block_users',
      description: 'Block user(s) on WhatsApp.',
      parameters: {
        type: 'object',
        properties: {
          phoneNumberId: {
            type: 'string',
            description: 'The ID of the WhatsApp Business Phone Number.'
          },
          version: {
            type: 'string',
            description: 'The API version to use.'
          },
          users: {
            type: 'array',
            items: {
              type: 'string',
              description: 'The phone number of the user to block.'
            },
            description: 'An array of phone numbers to block.'
          }
        },
        required: ['phoneNumberId', 'version', 'users']
      }
    }
  }
};

export { apiTool };
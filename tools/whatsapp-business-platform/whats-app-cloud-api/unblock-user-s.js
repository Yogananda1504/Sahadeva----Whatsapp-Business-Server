/**
 * Function to unblock user(s) on WhatsApp using the Cloud API.
 *
 * @param {Object} args - Arguments for unblocking users.
 * @param {string} args.phoneNumberId - The ID of the phone number associated with the WhatsApp Business Account.
 * @param {Array<string>} args.blockUsers - An array of phone numbers to unblock.
 * @returns {Promise<Object>} - The result of the unblock operation.
 */
const executeFunction = async ({ phoneNumberId, blockUsers }) => {
  const baseUrl = 'https://graph.facebook.com';
  const version = ''; // will be provided by the user
  const token = process.env.WHATSAPP_BUSINESS_PLATFORM_API_KEY;

  try {
    // Construct the URL for the API request
    const url = `${baseUrl}/${version}/${phoneNumberId}/block_users`;

    // Prepare the request body
    const body = JSON.stringify({
      messaging_product: "whatsapp",
      block_users: blockUsers.map(user => ({ user }))
    });

    // Set up headers for the request
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };

    // Perform the fetch request
    const response = await fetch(url, {
      method: 'DELETE',
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
    console.error('Error unblocking users:', error);
    return { error: 'An error occurred while unblocking users.' };
  }
};

/**
 * Tool configuration for unblocking users on WhatsApp.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'unblock_users',
      description: 'Unblock user(s) on WhatsApp.',
      parameters: {
        type: 'object',
        properties: {
          phoneNumberId: {
            type: 'string',
            description: 'The ID of the phone number associated with the WhatsApp Business Account.'
          },
          blockUsers: {
            type: 'array',
            items: {
              type: 'string',
              description: 'The phone number to unblock.'
            },
            description: 'An array of phone numbers to unblock.'
          }
        },
        required: ['phoneNumberId', 'blockUsers']
      }
    }
  }
};

export { apiTool };
/**
 * Function to mark a message as read in WhatsApp Cloud API.
 *
 * @param {Object} args - Arguments for marking the message as read.
 * @param {string} args.message_id - The ID of the incoming message to mark as read.
 * @returns {Promise<Object>} - The result of the mark message as read operation.
 */
const executeFunction = async ({ message_id }) => {
  const baseUrl = 'https://graph.facebook.com';
  const version = ''; // will be provided by the user
  const phoneNumberId = ''; // will be provided by the user
  const token = process.env.WHATSAPP_BUSINESS_PLATFORM_API_KEY;

  try {
    // Construct the URL for the API request
    const url = `${baseUrl}/${version}/${phoneNumberId}/messages`;

    // Set up the request body
    const body = JSON.stringify({
      messaging_product: 'whatsapp',
      status: 'read',
      message_id: message_id
    });

    // Set up headers for the request
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };

    // Perform the fetch request
    const response = await fetch(url, {
      method: 'PUT',
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
    console.error('Error marking message as read:', error);
    return { error: 'An error occurred while marking the message as read.' };
  }
};

/**
 * Tool configuration for marking a message as read in WhatsApp Cloud API.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'mark_message_as_read',
      description: 'Mark a message as read in WhatsApp Cloud API.',
      parameters: {
        type: 'object',
        properties: {
          message_id: {
            type: 'string',
            description: 'The ID of the incoming message to mark as read.'
          }
        },
        required: ['message_id']
      }
    }
  }
};

export { apiTool };
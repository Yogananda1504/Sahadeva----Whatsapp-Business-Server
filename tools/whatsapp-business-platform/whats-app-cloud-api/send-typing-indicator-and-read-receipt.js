/**
 * Function to send a typing indicator and read receipt via WhatsApp Cloud API.
 *
 * @param {Object} args - Arguments for sending the typing indicator and read receipt.
 * @param {string} args.message_id - The ID of the WhatsApp message to mark as read.
 * @param {string} args.version - The API version to use.
 * @param {string} args.phone_number_id - The phone number ID associated with the WhatsApp Business Account.
 * @returns {Promise<Object>} - The result of the API request.
 */
const executeFunction = async ({ message_id, version, phone_number_id }) => {
  const token = process.env.WHATSAPP_BUSINESS_PLATFORM_API_KEY;
  const url = `https://graph.facebook.com/${version}/${phone_number_id}/messages`;
  
  const body = {
    messaging_product: "whatsapp",
    status: "read",
    message_id: message_id,
    typing_indicator: {
      type: "text"
    }
  };

  try {
    // Set up headers for the request
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };

    // Perform the fetch request
    const response = await fetch(url, {
      method: 'POST',
      headers: headers,
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
    console.error('Error sending typing indicator and read receipt:', error);
    return { error: 'An error occurred while sending the typing indicator and read receipt.' };
  }
};

/**
 * Tool configuration for sending typing indicator and read receipt via WhatsApp Cloud API.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'send_typing_indicator_and_read_receipt',
      description: 'Send a typing indicator and read receipt via WhatsApp Cloud API.',
      parameters: {
        type: 'object',
        properties: {
          message_id: {
            type: 'string',
            description: 'The ID of the WhatsApp message to mark as read.'
          },
          version: {
            type: 'string',
            description: 'The API version to use.'
          },
          phone_number_id: {
            type: 'string',
            description: 'The phone number ID associated with the WhatsApp Business Account.'
          }
        },
        required: ['message_id', 'version', 'phone_number_id']
      }
    }
  }
};

export { apiTool };
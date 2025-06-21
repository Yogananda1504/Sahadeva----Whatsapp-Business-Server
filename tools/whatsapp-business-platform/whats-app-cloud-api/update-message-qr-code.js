/**
 * Function to update the message QR code in WhatsApp Cloud API.
 *
 * @param {Object} args - Arguments for updating the message QR code.
 * @param {string} args.prefilled_message - The message to prefill in the QR code.
 * @param {string} args.code - The code associated with the QR code.
 * @returns {Promise<Object>} - The result of the QR code update.
 */
const executeFunction = async ({ prefilled_message, code }) => {
  const baseUrl = 'https://graph.facebook.com';
  const version = ''; // will be provided by the user
  const phoneNumberId = ''; // will be provided by the user
  const token = process.env.WHATSAPP_BUSINESS_PLATFORM_API_KEY;

  try {
    // Construct the URL for the API request
    const url = `${baseUrl}/${version}/${phoneNumberId}/message_qrdls`;

    // Set up headers for the request
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };

    // Create the request body
    const body = JSON.stringify({
      prefilled_message,
      code
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
    console.error('Error updating message QR code:', error);
    return { error: 'An error occurred while updating the message QR code.' };
  }
};

/**
 * Tool configuration for updating the message QR code in WhatsApp Cloud API.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'update_message_qr_code',
      description: 'Update the message QR code in WhatsApp Cloud API.',
      parameters: {
        type: 'object',
        properties: {
          prefilled_message: {
            type: 'string',
            description: 'The message to prefill in the QR code.'
          },
          code: {
            type: 'string',
            description: 'The code associated with the QR code.'
          }
        },
        required: ['prefilled_message', 'code']
      }
    }
  }
};

export { apiTool };
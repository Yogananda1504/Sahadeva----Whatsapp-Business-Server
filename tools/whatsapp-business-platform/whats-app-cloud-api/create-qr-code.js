/**
 * Function to create a QR code using the WhatsApp Cloud API.
 *
 * @param {Object} args - Arguments for creating the QR code.
 * @param {string} args.prefilled_message - The message that will be prefilled in the chat.
 * @param {string} args.generate_qr_image - The format of the QR code image (e.g., "SVG").
 * @returns {Promise<Object>} - The result of the QR code creation.
 */
const executeFunction = async ({ prefilled_message, generate_qr_image }) => {
  const baseUrl = 'https://graph.facebook.com';
  const version = ''; // will be provided by the user
  const phoneNumberId = ''; // will be provided by the user
  const token = process.env.WHATSAPP_BUSINESS_PLATFORM_API_KEY;

  try {
    // Construct the URL for the request
    const url = `${baseUrl}/${version}/${phoneNumberId}/message_qrdls`;

    // Set up headers for the request
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };

    // Prepare the request body
    const body = JSON.stringify({
      prefilled_message,
      generate_qr_image
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
    console.error('Error creating QR code:', error);
    return { error: 'An error occurred while creating the QR code.' };
  }
};

/**
 * Tool configuration for creating a QR code using the WhatsApp Cloud API.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'create_qr_code',
      description: 'Create a QR code using the WhatsApp Cloud API.',
      parameters: {
        type: 'object',
        properties: {
          prefilled_message: {
            type: 'string',
            description: 'The message that will be prefilled in the chat.'
          },
          generate_qr_image: {
            type: 'string',
            description: 'The format of the QR code image (e.g., "SVG").'
          }
        },
        required: ['prefilled_message', 'generate_qr_image']
      }
    }
  }
};

export { apiTool };
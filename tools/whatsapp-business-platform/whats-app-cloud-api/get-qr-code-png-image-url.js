/**
 * Function to get the QR code PNG image URL from WhatsApp Cloud API.
 *
 * @param {Object} args - Arguments for the QR code request.
 * @param {string} args.version - The API version to use.
 * @param {string} args.phoneNumberId - The ID of the WhatsApp Business phone number.
 * @param {string} args.qrCodeId - The ID of the QR code to retrieve.
 * @returns {Promise<Object>} - The response containing the QR code details.
 */
const executeFunction = async ({ version, phoneNumberId, qrCodeId }) => {
  const baseUrl = 'https://graph.facebook.com';
  const token = process.env.WHATSAPP_BUSINESS_PLATFORM_API_KEY;
  try {
    // Construct the URL with query parameters
    const url = new URL(`${baseUrl}/${version}/${phoneNumberId}/message_qrdls`);
    url.searchParams.append('fields', 'prefilled_message,deep_link_url,qr_image_url.format(PNG)');
    url.searchParams.append('code', qrCodeId);

    // Set up headers for the request
    const headers = {
      'Authorization': `Bearer ${token}`
    };

    // Perform the fetch request
    const response = await fetch(url.toString(), {
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
    console.error('Error getting QR code PNG image URL:', error);
    return { error: 'An error occurred while retrieving the QR code PNG image URL.' };
  }
};

/**
 * Tool configuration for getting QR code PNG image URL from WhatsApp Cloud API.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_qr_code_png_url',
      description: 'Get the QR code PNG image URL from WhatsApp Cloud API.',
      parameters: {
        type: 'object',
        properties: {
          version: {
            type: 'string',
            description: 'The API version to use.'
          },
          phoneNumberId: {
            type: 'string',
            description: 'The ID of the WhatsApp Business phone number.'
          },
          qrCodeId: {
            type: 'string',
            description: 'The ID of the QR code to retrieve.'
          }
        },
        required: ['version', 'phoneNumberId', 'qrCodeId']
      }
    }
  }
};

export { apiTool };
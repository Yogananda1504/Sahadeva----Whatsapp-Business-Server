/**
 * Function to get the QR code SVG image URL from WhatsApp Cloud API.
 *
 * @param {Object} args - Arguments for the QR code request.
 * @param {string} args.version - The API version to use.
 * @param {string} args.phoneNumberId - The WhatsApp Business phone number ID.
 * @param {string} args.code - The QR code ID to retrieve the SVG image URL.
 * @returns {Promise<Object>} - The result containing the QR code details.
 */
const executeFunction = async ({ version, phoneNumberId, code }) => {
  const baseUrl = 'https://graph.facebook.com';
  const token = process.env.WHATSAPP_BUSINESS_PLATFORM_API_KEY;

  try {
    // Construct the URL for the API request
    const url = `${baseUrl}/${version}/${phoneNumberId}/message_qrdls?fields=prefilled_message,deep_link_url,qr_image_url.format(SVG)&code=${code}`;

    // Set up headers for the request
    const headers = {
      'Authorization': `Bearer ${token}`
    };

    // Perform the fetch request
    const response = await fetch(url, {
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
    console.error('Error fetching QR code SVG image URL:', error);
    return { error: 'An error occurred while fetching the QR code SVG image URL.' };
  }
};

/**
 * Tool configuration for getting QR code SVG image URL from WhatsApp Cloud API.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_qr_code_svg',
      description: 'Get the QR code SVG image URL from WhatsApp Cloud API.',
      parameters: {
        type: 'object',
        properties: {
          version: {
            type: 'string',
            description: 'The API version to use.'
          },
          phoneNumberId: {
            type: 'string',
            description: 'The WhatsApp Business phone number ID.'
          },
          code: {
            type: 'string',
            description: 'The QR code ID to retrieve the SVG image URL.'
          }
        },
        required: ['version', 'phoneNumberId', 'code']
      }
    }
  }
};

export { apiTool };
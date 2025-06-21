/**
 * Function to get all QR codes for a specified WhatsApp Business phone number.
 *
 * @param {Object} args - Arguments for the QR code retrieval.
 * @param {string} args.version - The API version to use.
 * @param {string} args.phoneNumberId - The ID of the WhatsApp Business phone number.
 * @returns {Promise<Object>} - The response containing QR codes and related information.
 */
const executeFunction = async ({ version, phoneNumberId }) => {
  const baseUrl = 'https://graph.facebook.com';
  const token = process.env.WHATSAPP_BUSINESS_PLATFORM_API_KEY;
  try {
    // Construct the URL with query parameters
    const url = `${baseUrl}/${version}/${phoneNumberId}/message_qrdls?fields=code,prefilled_message,qr_image_url.format(SVG)`;

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
    console.error('Error retrieving QR codes:', error);
    return { error: 'An error occurred while retrieving QR codes.' };
  }
};

/**
 * Tool configuration for retrieving QR codes from WhatsApp Cloud API.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_all_qr_codes',
      description: 'Retrieve all QR codes for a specified WhatsApp Business phone number.',
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
          }
        },
        required: ['version', 'phoneNumberId']
      }
    }
  }
};

export { apiTool };
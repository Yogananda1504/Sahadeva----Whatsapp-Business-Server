/**
 * Function to get a QR code from the WhatsApp Cloud API.
 *
 * @param {Object} args - Arguments for the QR code retrieval.
 * @param {string} args.version - The API version to use.
 * @param {string} args.phoneNumberId - The ID of the WhatsApp Business phone number.
 * @param {string} args.qrCodeId - The ID of the QR code to retrieve.
 * @returns {Promise<Object>} - The result of the QR code retrieval.
 */
const executeFunction = async ({ version, phoneNumberId, qrCodeId }) => {
  const baseUrl = 'https://graph.facebook.com';
  const token = process.env.WHATSAPP_BUSINESS_PLATFORM_API_KEY;
  try {
    // Construct the URL for the QR code retrieval
    const url = `${baseUrl}/${version}/${phoneNumberId}/message_qrdls/${qrCodeId}`;

    // Set up headers for the request
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
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
    console.error('Error retrieving QR code:', error);
    return { error: 'An error occurred while retrieving the QR code.' };
  }
};

/**
 * Tool configuration for retrieving QR codes from the WhatsApp Cloud API.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_qr_code',
      description: 'Retrieve a QR code from the WhatsApp Cloud API.',
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
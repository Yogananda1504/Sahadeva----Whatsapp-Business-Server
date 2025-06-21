/**
 * Function to delete a QR code from the WhatsApp Business API.
 *
 * @param {Object} args - Arguments for the delete operation.
 * @param {string} args.version - The API version to use.
 * @param {string} args.phoneNumberId - The ID of the WhatsApp Business phone number.
 * @param {string} args.qrCodeId - The ID of the QR code to delete.
 * @returns {Promise<Object>} - The result of the delete operation.
 */
const executeFunction = async ({ version, phoneNumberId, qrCodeId }) => {
  const baseUrl = 'https://graph.facebook.com';
  const token = process.env.WHATSAPP_BUSINESS_PLATFORM_API_KEY;
  try {
    // Construct the URL for the DELETE request
    const url = `${baseUrl}/${version}/${phoneNumberId}/message_qrdls/${qrCodeId}`;

    // Set up headers for the request
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };

    // Perform the fetch request
    const response = await fetch(url, {
      method: 'DELETE',
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
    console.error('Error deleting QR code:', error);
    return { error: 'An error occurred while deleting the QR code.' };
  }
};

/**
 * Tool configuration for deleting a QR code from the WhatsApp Business API.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'delete_qr_code',
      description: 'Delete a QR code from the WhatsApp Business API.',
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
            description: 'The ID of the QR code to delete.'
          }
        },
        required: ['version', 'phoneNumberId', 'qrCodeId']
      }
    }
  }
};

export { apiTool };
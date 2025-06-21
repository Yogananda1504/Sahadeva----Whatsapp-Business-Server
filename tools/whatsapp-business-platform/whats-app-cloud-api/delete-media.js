/**
 * Function to delete media from WhatsApp Cloud API.
 *
 * @param {Object} args - Arguments for the delete media request.
 * @param {string} args.mediaId - The ID of the media to be deleted.
 * @param {string} args.phoneNumberId - The phone number ID associated with the media.
 * @returns {Promise<Object>} - The result of the delete media operation.
 */
const executeFunction = async ({ mediaId, phoneNumberId }) => {
  const baseUrl = 'https://graph.facebook.com';
  const version = 'v8.0'; // specify the API version
  const token = process.env.WHATSAPP_BUSINESS_PLATFORM_API_KEY;

  try {
    // Construct the URL for the DELETE request
    const url = `${baseUrl}/${version}/${mediaId}?phone_number_id=${phoneNumberId}`;

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
    console.error('Error deleting media:', error);
    return { error: 'An error occurred while deleting media.' };
  }
};

/**
 * Tool configuration for deleting media from WhatsApp Cloud API.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'delete_media',
      description: 'Delete media from WhatsApp Cloud API.',
      parameters: {
        type: 'object',
        properties: {
          mediaId: {
            type: 'string',
            description: 'The ID of the media to be deleted.'
          },
          phoneNumberId: {
            type: 'string',
            description: 'The phone number ID associated with the media.'
          }
        },
        required: ['mediaId', 'phoneNumberId']
      }
    }
  }
};

export { apiTool };
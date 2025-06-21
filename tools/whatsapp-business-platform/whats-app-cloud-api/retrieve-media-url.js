/**
 * Function to retrieve the media URL from WhatsApp Cloud API.
 *
 * @param {Object} args - Arguments for the media retrieval.
 * @param {string} args.mediaId - The ID of the media to retrieve.
 * @param {string} [args.phoneNumberId] - The phone number ID to check if the media belongs to it.
 * @returns {Promise<Object>} - The result of the media URL retrieval.
 */
const executeFunction = async ({ mediaId, phoneNumberId }) => {
  const version = ''; // will be provided by the user
  const token = process.env.WHATSAPP_BUSINESS_PLATFORM_API_KEY;
  try {
    // Construct the URL with the media ID and optional phone number ID
    const url = new URL(`https://graph.facebook.com/${version}/${mediaId}`);
    if (phoneNumberId) {
      url.searchParams.append('phone_number_id', phoneNumberId);
    }

    // Set up headers for the request
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
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
    console.error('Error retrieving media URL:', error);
    return { error: 'An error occurred while retrieving the media URL.' };
  }
};

/**
 * Tool configuration for retrieving media URL from WhatsApp Cloud API.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'retrieve_media_url',
      description: 'Retrieve the media URL from WhatsApp Cloud API.',
      parameters: {
        type: 'object',
        properties: {
          mediaId: {
            type: 'string',
            description: 'The ID of the media to retrieve.'
          },
          phoneNumberId: {
            type: 'string',
            description: 'The phone number ID to check if the media belongs to it.'
          }
        },
        required: ['mediaId']
      }
    }
  }
};

export { apiTool };
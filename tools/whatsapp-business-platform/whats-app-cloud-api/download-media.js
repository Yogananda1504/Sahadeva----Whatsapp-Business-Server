/**
 * Function to download media from WhatsApp Cloud API.
 *
 * @param {Object} args - Arguments for the media download.
 * @param {string} args.mediaUrl - The media URL to download.
 * @param {string} args.version - The API version to use.
 * @returns {Promise<Object>} - The binary data of the media file or an error message.
 */
const executeFunction = async ({ mediaUrl, version }) => {
  const baseUrl = 'https://graph.facebook.com';
  const token = process.env.WHATSAPP_BUSINESS_PLATFORM_API_KEY;
  try {
    // Construct the URL for the media download
    const url = `${baseUrl}/${version}/${mediaUrl}`;

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
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    // Get the content type from the response headers
    const contentType = response.headers.get('Content-Type');

    // Return the binary data and content type
    const mediaData = await response.arrayBuffer();
    return {
      mediaData,
      contentType
    };
  } catch (error) {
    console.error('Error downloading media:', error);
    return { error: 'An error occurred while downloading media.' };
  }
};

/**
 * Tool configuration for downloading media from WhatsApp Cloud API.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'download_media',
      description: 'Download media from WhatsApp Cloud API.',
      parameters: {
        type: 'object',
        properties: {
          mediaUrl: {
            type: 'string',
            description: 'The media URL to download.'
          },
          version: {
            type: 'string',
            description: 'The API version to use.'
          }
        },
        required: ['mediaUrl', 'version']
      }
    }
  }
};

export { apiTool };
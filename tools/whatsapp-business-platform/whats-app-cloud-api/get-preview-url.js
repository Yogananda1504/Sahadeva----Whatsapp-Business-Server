/**
 * Function to get the preview URL for a WhatsApp flow.
 *
 * @param {Object} args - Arguments for the request.
 * @param {string} args.version - The API version to use.
 * @param {string} args.flowId - The ID of the flow to get the preview for.
 * @param {boolean} [args.invalidate=false] - Set to true to generate a new preview link and expire the old link.
 * @returns {Promise<Object>} - The response containing the preview URL and expiration time.
 */
const executeFunction = async ({ version, flowId, invalidate = false }) => {
  const baseUrl = 'https://graph.facebook.com';
  const token = process.env.WHATSAPP_BUSINESS_PLATFORM_API_KEY;

  try {
    // Construct the URL with query parameters
    const url = new URL(`${baseUrl}/${version}/${flowId}`);
    url.searchParams.append('fields', `preview.invalidate(${invalidate})`);

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
    console.error('Error getting preview URL:', error);
    return { error: 'An error occurred while getting the preview URL.' };
  }
};

/**
 * Tool configuration for getting the preview URL for a WhatsApp flow.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_preview_url',
      description: 'Get the preview URL for a WhatsApp flow.',
      parameters: {
        type: 'object',
        properties: {
          version: {
            type: 'string',
            description: 'The API version to use.'
          },
          flowId: {
            type: 'string',
            description: 'The ID of the flow to get the preview for.'
          },
          invalidate: {
            type: 'boolean',
            description: 'Set to true to generate a new preview link and expire the old link.'
          }
        },
        required: ['version', 'flowId']
      }
    }
  }
};

export { apiTool };
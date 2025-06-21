/**
 * Function to get conversation analytics from the WhatsApp Cloud API.
 *
 * @param {Object} args - Arguments for the analytics request.
 * @param {string} args.version - The API version to use.
 * @param {string} args.wabaId - The WhatsApp Business Account ID.
 * @param {number} args.start - The start timestamp for the analytics data.
 * @param {number} args.end - The end timestamp for the analytics data.
 * @returns {Promise<Object>} - The result of the conversation analytics request.
 */
const executeFunction = async ({ version, wabaId, start, end }) => {
  const baseUrl = 'https://graph.facebook.com';
  const token = process.env.WHATSAPP_BUSINESS_PLATFORM_API_KEY;

  try {
    // Construct the URL with query parameters
    const url = new URL(`${baseUrl}/${version}/${wabaId}`);
    url.searchParams.append('fields', `conversation_analytics.start(${start}).end(${end}).granularity(MONTHLY).conversation_directions(["business_initiated"]).dimensions(["conversation_type", "conversation_direction"])`);

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
    console.error('Error getting conversation analytics:', error);
    return { error: 'An error occurred while getting conversation analytics.' };
  }
};

/**
 * Tool configuration for getting conversation analytics from WhatsApp Cloud API.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_conversation_analytics',
      description: 'Get conversation analytics from WhatsApp Cloud API.',
      parameters: {
        type: 'object',
        properties: {
          version: {
            type: 'string',
            description: 'The API version to use.'
          },
          wabaId: {
            type: 'string',
            description: 'The WhatsApp Business Account ID.'
          },
          start: {
            type: 'integer',
            description: 'The start timestamp for the analytics data.'
          },
          end: {
            type: 'integer',
            description: 'The end timestamp for the analytics data.'
          }
        },
        required: ['version', 'wabaId', 'start', 'end']
      }
    }
  }
};

export { apiTool };
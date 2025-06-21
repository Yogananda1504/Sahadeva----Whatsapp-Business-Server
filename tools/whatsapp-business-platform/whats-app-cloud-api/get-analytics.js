/**
 * Function to get analytics from the WhatsApp Cloud API.
 *
 * @param {Object} args - Arguments for the analytics request.
 * @param {string} args.version - The API version to use.
 * @param {string} args.wabaId - The WhatsApp Business Account ID.
 * @param {number} args.start - The start timestamp for the analytics.
 * @param {number} args.end - The end timestamp for the analytics.
 * @param {Array<string>} args.countryCodes - The country codes to filter the analytics.
 * @returns {Promise<Object>} - The result of the analytics request.
 */
const executeFunction = async ({ version, wabaId, start, end, countryCodes }) => {
  const token = process.env.WHATSAPP_BUSINESS_PLATFORM_API_KEY;
  const baseUrl = `https://graph.facebook.com/${version}/${wabaId}`;
  
  try {
    // Construct the URL with query parameters
    const url = new URL(baseUrl);
    url.searchParams.append('fields', `analytics.start(${start}).end(${end}).granularity(DAY).phone_numbers([]).country_codes(${JSON.stringify(countryCodes)})`);

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
    console.error('Error fetching analytics:', error);
    return { error: 'An error occurred while fetching analytics.' };
  }
};

/**
 * Tool configuration for getting analytics from the WhatsApp Cloud API.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_analytics',
      description: 'Get analytics from the WhatsApp Cloud API.',
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
            description: 'The start timestamp for the analytics.'
          },
          end: {
            type: 'integer',
            description: 'The end timestamp for the analytics.'
          },
          countryCodes: {
            type: 'array',
            items: {
              type: 'string'
            },
            description: 'The country codes to filter the analytics.'
          }
        },
        required: ['version', 'wabaId', 'start', 'end', 'countryCodes']
      }
    }
  }
};

export { apiTool };
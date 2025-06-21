/**
 * Function to get the endpoint request error rate metric from the WhatsApp Cloud API.
 *
 * @param {Object} args - Arguments for the request.
 * @param {string} args.version - The API version to use.
 * @param {string} args.flowId - The Flow ID for the request.
 * @param {string} [args.since='2024-01-28'] - The start date for the metric data.
 * @param {string} [args.until='2024-01-30'] - The end date for the metric data.
 * @returns {Promise<Object>} - The result of the metric request.
 */
const executeFunction = async ({ version, flowId, since = '2024-01-28', until = '2024-01-30' }) => {
  const baseUrl = 'https://graph.facebook.com';
  const token = process.env.WHATSAPP_BUSINESS_PLATFORM_API_KEY;
  try {
    // Construct the URL with query parameters
    const url = new URL(`${baseUrl}/${version}/${flowId}`);
    url.searchParams.append('fields', `metric.name(ENDPOINT_REQUEST_ERROR_RATE).granularity(LIFETIME).since(${since}).until(${until})`);

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
    console.error('Error fetching endpoint request error rate metric:', error);
    return { error: 'An error occurred while fetching the metric.' };
  }
};

/**
 * Tool configuration for getting the endpoint request error rate metric from the WhatsApp Cloud API.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_endpoint_request_error_rate_metric',
      description: 'Get the endpoint request error rate metric from the WhatsApp Cloud API.',
      parameters: {
        type: 'object',
        properties: {
          version: {
            type: 'string',
            description: 'The API version to use.'
          },
          flowId: {
            type: 'string',
            description: 'The Flow ID for the request.'
          },
          since: {
            type: 'string',
            description: 'The start date for the metric data.'
          },
          until: {
            type: 'string',
            description: 'The end date for the metric data.'
          }
        },
        required: ['version', 'flowId']
      }
    }
  }
};

export { apiTool };
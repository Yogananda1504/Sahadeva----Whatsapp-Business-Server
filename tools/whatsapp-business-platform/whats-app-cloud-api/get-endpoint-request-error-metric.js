/**
 * Function to get the endpoint request error metric from the WhatsApp Cloud API.
 *
 * @param {Object} args - Arguments for the request.
 * @param {string} args.version - The API version to use.
 * @param {string} args.flowId - The ID of the flow to query.
 * @param {string} args.since - The start date for the metric data.
 * @param {string} args.until - The end date for the metric data.
 * @returns {Promise<Object>} - The result of the metric request.
 */
const executeFunction = async ({ version, flowId, since, until }) => {
  const baseUrl = 'https://graph.facebook.com';
  const token = process.env.WHATSAPP_BUSINESS_PLATFORM_API_KEY;

  try {
    // Construct the URL with query parameters
    const url = new URL(`${baseUrl}/${version}/${flowId}`);
    url.searchParams.append('fields', `metric.name(ENDPOINT_REQUEST_ERROR).granularity(DAY).since(${since}).until(${until})`);

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
    console.error('Error getting endpoint request error metric:', error);
    return { error: 'An error occurred while getting the endpoint request error metric.' };
  }
};

/**
 * Tool configuration for getting endpoint request error metric from WhatsApp Cloud API.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_endpoint_request_error_metric',
      description: 'Get the endpoint request error metric from WhatsApp Cloud API.',
      parameters: {
        type: 'object',
        properties: {
          version: {
            type: 'string',
            description: 'The API version to use.'
          },
          flowId: {
            type: 'string',
            description: 'The ID of the flow to query.'
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
        required: ['version', 'flowId', 'since', 'until']
      }
    }
  }
};

export { apiTool };
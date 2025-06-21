/**
 * Function to get endpoint request latencies metric from WhatsApp Cloud API.
 *
 * @param {Object} args - Arguments for the request.
 * @param {string} args.version - The API version to use.
 * @param {string} args.flowId - The ID of the flow to query.
 * @returns {Promise<Object>} - The response containing the latencies metric.
 */
const executeFunction = async ({ version, flowId }) => {
  const baseUrl = 'https://graph.facebook.com';
  const token = process.env.WHATSAPP_BUSINESS_PLATFORM_API_KEY;

  try {
    // Construct the URL with query parameters
    const url = new URL(`${baseUrl}/${version}/${flowId}`);
    url.searchParams.append('fields', 'metric.name(ENDPOINT_REQUEST_LATENCY_SECONDS_CEIL).granularity(DAY).since(2024-01-28).until(2024-01-30)');

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
    console.error('Error getting endpoint request latencies metric:', error);
    return { error: 'An error occurred while getting endpoint request latencies metric.' };
  }
};

/**
 * Tool configuration for getting endpoint request latencies metric from WhatsApp Cloud API.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_endpoint_request_latencies_metric',
      description: 'Get endpoint request latencies metric from WhatsApp Cloud API.',
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
          }
        },
        required: ['version', 'flowId']
      }
    }
  }
};

export { apiTool };
/**
 * Function to query the status of a file upload session in the WhatsApp Cloud API.
 *
 * @param {Object} args - Arguments for querying the upload status.
 * @param {string} args.uploadId - The ID of the upload session to query.
 * @param {string} args.version - The API version to use in the request.
 * @returns {Promise<Object>} - The result of the upload status query.
 */
const executeFunction = async ({ uploadId, version }) => {
  const baseUrl = 'https://graph.facebook.com';
  const token = process.env.WHATSAPP_BUSINESS_PLATFORM_API_KEY;

  try {
    // Construct the URL for the request
    const url = `${baseUrl}/${version}/${uploadId}`;

    // Set up headers for the request
    const headers = {
      'Cache-Control': 'no-cache',
      'Authorization': `OAuth ${token}`
    };

    // Perform the fetch request
    const response = await fetch(url, {
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
    console.error('Error querying upload status:', error);
    return { error: 'An error occurred while querying the upload status.' };
  }
};

/**
 * Tool configuration for querying file upload status in the WhatsApp Cloud API.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'query_upload_status',
      description: 'Query the status of a file upload session in the WhatsApp Cloud API.',
      parameters: {
        type: 'object',
        properties: {
          uploadId: {
            type: 'string',
            description: 'The ID of the upload session to query.'
          },
          version: {
            type: 'string',
            description: 'The API version to use in the request.'
          }
        },
        required: ['uploadId', 'version']
      }
    }
  }
};

export { apiTool };
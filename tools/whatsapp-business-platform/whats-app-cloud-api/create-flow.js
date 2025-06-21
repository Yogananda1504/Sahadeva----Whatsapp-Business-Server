/**
 * Function to create a new flow in the WhatsApp Cloud API.
 *
 * @param {Object} args - Arguments for creating the flow.
 * @param {string} args.name - The name of the flow.
 * @param {Array<string>} args.categories - A list of Flow categories. At least one is required.
 * @param {string} [args.clone_flow_id] - The ID of an existing flow to clone.
 * @param {string} [args.endpoint_uri] - The endpoint URI for the flow.
 * @returns {Promise<Object>} - The result of the flow creation.
 */
const executeFunction = async ({ name, categories, clone_flow_id, endpoint_uri }) => {
  const baseUrl = 'https://graph.facebook.com';
  const version = ''; // will be provided by the user
  const wabaId = ''; // will be provided by the user
  const token = process.env.WHATSAPP_BUSINESS_PLATFORM_API_KEY;

  try {
    // Construct the URL for the API request
    const url = `${baseUrl}/${version}/${wabaId}/flows`;

    // Set up headers for the request
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };

    // Prepare the request body
    const body = JSON.stringify({
      name,
      categories,
      ...(clone_flow_id && { clone_flow_id }),
      ...(endpoint_uri && { endpoint_uri })
    });

    // Perform the fetch request
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body
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
    console.error('Error creating flow:', error);
    return { error: 'An error occurred while creating the flow.' };
  }
};

/**
 * Tool configuration for creating a new flow in the WhatsApp Cloud API.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'create_flow',
      description: 'Create a new flow in the WhatsApp Cloud API.',
      parameters: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
            description: 'The name of the flow.'
          },
          categories: {
            type: 'array',
            items: {
              type: 'string'
            },
            description: 'A list of Flow categories. At least one is required.'
          },
          clone_flow_id: {
            type: 'string',
            description: 'The ID of an existing flow to clone.'
          },
          endpoint_uri: {
            type: 'string',
            description: 'The endpoint URI for the flow.'
          }
        },
        required: ['name', 'categories']
      }
    }
  }
};

export { apiTool };
/**
 * Function to upload a flow JSON file to the WhatsApp Cloud API.
 *
 * @param {Object} args - Arguments for the upload.
 * @param {string} args.version - The API version to use.
 * @param {string} args.flowId - The ID of the flow to which the asset will be uploaded.
 * @param {File} args.file - The flow JSON file to upload.
 * @param {string} [args.name="flow.json"] - The name of the file being uploaded.
 * @param {string} [args.asset_type="FLOW_JSON"] - The type of asset being uploaded.
 * @returns {Promise<Object>} - The result of the upload operation.
 */
const executeFunction = async ({ version, flowId, file, name = 'flow.json', asset_type = 'FLOW_JSON' }) => {
  const url = `https://graph.facebook.com/${version}/${flowId}/assets`;
  const token = process.env.WHATSAPP_BUSINESS_PLATFORM_API_KEY;

  const formData = new FormData();
  formData.append('file', file);
  formData.append('name', name);
  formData.append('asset_type', asset_type);

  try {
    // Set up headers for the request
    const headers = {
      'Authorization': `Bearer ${token}`
    };

    // Perform the fetch request
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: formData
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
    console.error('Error uploading flow JSON:', error);
    return { error: 'An error occurred while uploading the flow JSON.' };
  }
};

/**
 * Tool configuration for uploading a flow JSON file to the WhatsApp Cloud API.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'update_flow_json',
      description: 'Upload a flow JSON file to the WhatsApp Cloud API.',
      parameters: {
        type: 'object',
        properties: {
          version: {
            type: 'string',
            description: 'The API version to use.'
          },
          flowId: {
            type: 'string',
            description: 'The ID of the flow to which the asset will be uploaded.'
          },
          file: {
            type: 'string',
            description: 'The flow JSON file to upload.'
          },
          name: {
            type: 'string',
            description: 'The name of the file being uploaded.'
          },
          asset_type: {
            type: 'string',
            description: 'The type of asset being uploaded.'
          }
        },
        required: ['version', 'flowId', 'file']
      }
    }
  }
};

export { apiTool };
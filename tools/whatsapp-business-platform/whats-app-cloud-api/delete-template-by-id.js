/**
 * Function to delete a message template by its ID in the WhatsApp Cloud API.
 *
 * @param {Object} args - Arguments for the deletion.
 * @param {string} args.hsm_id - The ID of the template to be deleted.
 * @param {string} args.name - The name of the template to be deleted.
 * @returns {Promise<Object>} - The result of the deletion request.
 */
const executeFunction = async ({ hsm_id, name }) => {
  const version = ''; // will be provided by the user
  const wabaId = ''; // will be provided by the user
  const token = process.env.WHATSAPP_BUSINESS_PLATFORM_API_KEY;

  try {
    // Construct the URL for the DELETE request
    const url = `https://graph.facebook.com/${version}/${wabaId}/message_templates?hsm_id=${hsm_id}&name=${name}`;

    // Set up headers for the request
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };

    // Perform the fetch request
    const response = await fetch(url, {
      method: 'DELETE',
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
    console.error('Error deleting message template:', error);
    return { error: 'An error occurred while deleting the message template.' };
  }
};

/**
 * Tool configuration for deleting a message template in the WhatsApp Cloud API.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'delete_template_by_id',
      description: 'Delete a message template by its ID in the WhatsApp Cloud API.',
      parameters: {
        type: 'object',
        properties: {
          hsm_id: {
            type: 'string',
            description: 'The ID of the template to be deleted.'
          },
          name: {
            type: 'string',
            description: 'The name of the template to be deleted.'
          }
        },
        required: ['hsm_id', 'name']
      }
    }
  }
};

export { apiTool };
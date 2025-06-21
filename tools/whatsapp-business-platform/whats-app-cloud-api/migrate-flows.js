/**
 * Function to migrate flows from a source WABA to a destination WABA in the WhatsApp Cloud API.
 *
 * @param {Object} args - Arguments for the migration.
 * @param {string} args.source_waba_id - The ID of the source WABA from which the flows will be copied.
 * @param {Array<string>} [args.source_flow_names] - The names of the flows that will be copied from the source WABA. If not specified, all flows will be copied.
 * @returns {Promise<Object>} - The result of the flow migration.
 */
const executeFunction = async ({ source_waba_id, source_flow_names }) => {
  const version = ''; // will be provided by the user
  const wabaId = ''; // will be provided by the user
  const token = process.env.WHATSAPP_BUSINESS_PLATFORM_API_KEY;

  try {
    const url = `https://graph.facebook.com/${version}/${wabaId}/migrate_flows`;

    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };

    const body = {
      source_waba_id,
      source_flow_names: source_flow_names ? JSON.parse(source_flow_names) : undefined
    };

    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error migrating flows:', error);
    return { error: 'An error occurred while migrating flows.' };
  }
};

/**
 * Tool configuration for migrating flows in the WhatsApp Cloud API.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'migrate_flows',
      description: 'Migrate flows from a source WABA to a destination WABA.',
      parameters: {
        type: 'object',
        properties: {
          source_waba_id: {
            type: 'string',
            description: 'The ID of the source WABA from which the flows will be copied.'
          },
          source_flow_names: {
            type: 'array',
            items: {
              type: 'string'
            },
            description: '[Optional] The names of the flows that will be copied from the source WABA.'
          }
        },
        required: ['source_waba_id']
      }
    }
  }
};

export { apiTool };
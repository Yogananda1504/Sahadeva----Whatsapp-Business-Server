/**
 * Function to migrate a WhatsApp account to the Cloud API.
 *
 * @param {Object} args - Arguments for the account migration.
 * @param {string} args.pin - A 6-digit pin for two-step verification.
 * @param {string} args.backupData - The backup data from the on-premise deployment.
 * @param {string} args.backupPassword - The password used in the backup API of the on-premise deployment.
 * @param {string} args.phoneNumberId - The phone number ID for the account being migrated.
 * @param {string} args.version - The API version to use.
 * @returns {Promise<Object>} - The result of the account migration.
 */
const executeFunction = async ({ pin, backupData, backupPassword, phoneNumberId, version }) => {
  const url = `https://graph.facebook.com/${version}/${phoneNumberId}/register`;
  const token = process.env.WHATSAPP_BUSINESS_PLATFORM_API_KEY;

  const body = JSON.stringify({
    messaging_product: "whatsapp",
    pin: pin,
    backup: {
      data: backupData,
      password: backupPassword
    }
  });

  try {
    // Set up headers for the request
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };

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
    console.error('Error migrating account:', error);
    return { error: 'An error occurred while migrating the account.' };
  }
};

/**
 * Tool configuration for migrating a WhatsApp account to the Cloud API.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'migrate_account',
      description: 'Migrate a WhatsApp account to the Cloud API.',
      parameters: {
        type: 'object',
        properties: {
          pin: {
            type: 'string',
            description: 'A 6-digit pin for two-step verification.'
          },
          backupData: {
            type: 'string',
            description: 'The backup data from the on-premise deployment.'
          },
          backupPassword: {
            type: 'string',
            description: 'The password used in the backup API of the on-premise deployment.'
          },
          phoneNumberId: {
            type: 'string',
            description: 'The phone number ID for the account being migrated.'
          },
          version: {
            type: 'string',
            description: 'The API version to use.'
          }
        },
        required: ['pin', 'backupData', 'backupPassword', 'phoneNumberId', 'version']
      }
    }
  }
};

export { apiTool };
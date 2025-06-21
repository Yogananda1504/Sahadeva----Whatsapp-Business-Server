/**
 * Function to set or update commerce settings for a WhatsApp Business Account.
 *
 * @param {Object} args - Arguments for the commerce settings.
 * @param {string} args.version - The API version to use.
 * @param {string} args.phoneNumberId - The ID of the WhatsApp Business phone number.
 * @param {boolean} [args.isCartEnabled=true] - Whether the cart feature is enabled.
 * @param {boolean} [args.isCatalogVisible=true] - Whether the catalog is visible.
 * @returns {Promise<Object>} - The result of the commerce settings update.
 */
const executeFunction = async ({ version, phoneNumberId, isCartEnabled = true, isCatalogVisible = true }) => {
  const token = process.env.WHATSAPP_BUSINESS_PLATFORM_API_KEY;
  const url = `https://graph.facebook.com/${version}/${phoneNumberId}/whatsapp_commerce_settings?is_cart_enabled=${isCartEnabled}&is_catalog_visible=${isCatalogVisible}`;

  try {
    // Set up headers for the request
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };

    // Perform the fetch request
    const response = await fetch(url, {
      method: 'POST',
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
    console.error('Error updating commerce settings:', error);
    return { error: 'An error occurred while updating commerce settings.' };
  }
};

/**
 * Tool configuration for setting or updating commerce settings on WhatsApp.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'set_update_commerce_settings',
      description: 'Set or update commerce settings for a WhatsApp Business Account.',
      parameters: {
        type: 'object',
        properties: {
          version: {
            type: 'string',
            description: 'The API version to use.'
          },
          phoneNumberId: {
            type: 'string',
            description: 'The ID of the WhatsApp Business phone number.'
          },
          isCartEnabled: {
            type: 'boolean',
            description: 'Whether the cart feature is enabled.'
          },
          isCatalogVisible: {
            type: 'boolean',
            description: 'Whether the catalog is visible.'
          }
        },
        required: ['version', 'phoneNumberId']
      }
    }
  }
};

export { apiTool };
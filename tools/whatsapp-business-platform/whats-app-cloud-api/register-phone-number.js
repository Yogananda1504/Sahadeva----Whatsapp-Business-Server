/**
 * Function to register a phone number with the WhatsApp Cloud API.
 *
 * @param {Object} args - Arguments for the registration.
 * @param {string} args.phoneNumberId - The ID of the phone number to register.
 * @param {string} args.pin - The 6-digit pin for two-step verification.
 * @returns {Promise<Object>} - The result of the phone number registration.
 */
const executeFunction = async ({ phoneNumberId, pin }) => {
  const baseUrl = 'https://graph.facebook.com';
  const version = ''; // will be provided by the user
  const token = process.env.WHATSAPP_BUSINESS_PLATFORM_API_KEY;

  try {
    // Construct the URL for the registration endpoint
    const url = `${baseUrl}/${version}/${phoneNumberId}/register`;

    // Set up the request body
    const body = JSON.stringify({
      messaging_product: 'whatsapp',
      pin: pin
    });

    // Set up headers for the request
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
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
    console.error('Error registering phone number:', error);
    return { error: 'An error occurred while registering the phone number.' };
  }
};

/**
 * Tool configuration for registering a phone number with the WhatsApp Cloud API.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'register_phone_number',
      description: 'Register a phone number with the WhatsApp Cloud API.',
      parameters: {
        type: 'object',
        properties: {
          phoneNumberId: {
            type: 'string',
            description: 'The ID of the phone number to register.'
          },
          pin: {
            type: 'string',
            description: 'The 6-digit pin for two-step verification.'
          }
        },
        required: ['phoneNumberId', 'pin']
      }
    }
  }
};

export { apiTool };
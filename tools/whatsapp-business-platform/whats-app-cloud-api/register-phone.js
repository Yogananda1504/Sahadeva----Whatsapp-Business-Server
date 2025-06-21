/**
 * Function to register a phone number with the WhatsApp Cloud API.
 *
 * @param {Object} args - Arguments for the registration.
 * @param {string} args.phoneNumberId - The phone number ID to register.
 * @param {string} args.pin - A 6-digit pin previously set up.
 * @returns {Promise<Object>} - The result of the registration request.
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
      messaging_product: "whatsapp",
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
    console.error('Error registering phone:', error);
    return { error: 'An error occurred while registering the phone.' };
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
      name: 'register_phone',
      description: 'Register a phone number with the WhatsApp Cloud API.',
      parameters: {
        type: 'object',
        properties: {
          phoneNumberId: {
            type: 'string',
            description: 'The phone number ID to register.'
          },
          pin: {
            type: 'string',
            description: 'A 6-digit pin previously set up.'
          }
        },
        required: ['phoneNumberId', 'pin']
      }
    }
  }
};

export { apiTool };
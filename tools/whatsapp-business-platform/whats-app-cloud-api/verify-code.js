/**
 * Function to verify the code received via SMS or Voice for WhatsApp Cloud API.
 *
 * @param {Object} args - Arguments for the verification.
 * @param {string} args.code - The verification code received.
 * @param {string} args.phoneNumberId - The ID of the phone number associated with the WhatsApp Business Account.
 * @param {string} args.version - The API version to use.
 * @returns {Promise<Object>} - The result of the verification request.
 */
const executeFunction = async ({ code, phoneNumberId, version }) => {
  const baseUrl = 'https://graph.facebook.com';
  const token = process.env.WHATSAPP_BUSINESS_PLATFORM_API_KEY;

  try {
    // Construct the URL for the verification request
    const url = `${baseUrl}/${version}/${phoneNumberId}/verify_code`;

    // Set up headers for the request
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };

    // Prepare the request body
    const body = JSON.stringify({ code });

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
    console.error('Error verifying code:', error);
    return { error: 'An error occurred while verifying the code.' };
  }
};

/**
 * Tool configuration for verifying the code on WhatsApp Cloud API.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'verify_code',
      description: 'Verify the code received for WhatsApp Cloud API.',
      parameters: {
        type: 'object',
        properties: {
          code: {
            type: 'string',
            description: 'The verification code received.'
          },
          phoneNumberId: {
            type: 'string',
            description: 'The ID of the phone number associated with the WhatsApp Business Account.'
          },
          version: {
            type: 'string',
            description: 'The API version to use.'
          }
        },
        required: ['code', 'phoneNumberId', 'version']
      }
    }
  }
};

export { apiTool };
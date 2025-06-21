/**
 * Function to request a verification code for a phone number using the WhatsApp Cloud API.
 *
 * @param {Object} args - Arguments for the request.
 * @param {string} args.phoneNumberId - The ID of the phone number to verify.
 * @param {string} [args.codeMethod="SMS"] - The method for verification, either "SMS" or "VOICE".
 * @param {string} [args.locale="en_US"] - The locale for the request.
 * @returns {Promise<Object>} - The result of the verification code request.
 */
const executeFunction = async ({ phoneNumberId, codeMethod = 'SMS', locale = 'en_US' }) => {
  const baseUrl = 'https://graph.facebook.com';
  const token = process.env.WHATSAPP_BUSINESS_PLATFORM_API_KEY;
  const version = ''; // will be provided by the user

  try {
    // Construct the URL for the request
    const url = `${baseUrl}/${version}/${phoneNumberId}/request_code`;

    // Set up the request body
    const body = JSON.stringify({
      code_method: codeMethod,
      locale: locale
    });

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
    console.error('Error requesting verification code:', error);
    return { error: 'An error occurred while requesting the verification code.' };
  }
};

/**
 * Tool configuration for requesting a verification code using the WhatsApp Cloud API.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'request_verification_code',
      description: 'Request a verification code for a phone number using the WhatsApp Cloud API.',
      parameters: {
        type: 'object',
        properties: {
          phoneNumberId: {
            type: 'string',
            description: 'The ID of the phone number to verify.'
          },
          codeMethod: {
            type: 'string',
            enum: ['SMS', 'VOICE'],
            description: 'The method for verification.'
          },
          locale: {
            type: 'string',
            description: 'The locale for the request.'
          }
        },
        required: ['phoneNumberId']
      }
    }
  }
};

export { apiTool };
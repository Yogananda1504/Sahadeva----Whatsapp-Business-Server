/**
 * Function to send an image message via WhatsApp Cloud API.
 *
 * @param {Object} args - Arguments for sending the image message.
 * @param {string} args.phoneNumberId - The ID of the phone number to send the message to.
 * @param {string} args.recipientPhoneNumber - The recipient's phone number.
 * @param {string} args.imageUrl - The URL of the image to send.
 * @returns {Promise<Object>} - The response from the WhatsApp API.
 */
const executeFunction = async ({ phoneNumberId, recipientPhoneNumber, imageUrl }) => {
  const baseUrl = 'https://graph.facebook.com';
  const token = process.env.WHATSAPP_BUSINESS_PLATFORM_API_KEY;
  const version = ''; // will be provided by the user

  try {
    // Construct the URL for the API request
    const url = `${baseUrl}/${version}/${phoneNumberId}/messages`;

    // Create the message payload
    const payload = {
      messaging_product: "whatsapp",
      recipient_type: "individual",
      to: recipientPhoneNumber,
      type: "image",
      image: {
        link: imageUrl
      }
    };

    // Set up headers for the request
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };

    // Perform the fetch request
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(payload)
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
    console.error('Error sending image message:', error);
    return { error: 'An error occurred while sending the image message.' };
  }
};

/**
 * Tool configuration for sending an image message via WhatsApp Cloud API.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'send_image_message',
      description: 'Send an image message via WhatsApp Cloud API.',
      parameters: {
        type: 'object',
        properties: {
          phoneNumberId: {
            type: 'string',
            description: 'The ID of the phone number to send the message to.'
          },
          recipientPhoneNumber: {
            type: 'string',
            description: 'The recipient\'s phone number.'
          },
          imageUrl: {
            type: 'string',
            description: 'The URL of the image to send.'
          }
        },
        required: ['phoneNumberId', 'recipientPhoneNumber', 'imageUrl']
      }
    }
  }
};

export { apiTool };
/**
 * Function to send a reply to an image message via WhatsApp Cloud API.
 *
 * @param {Object} args - Arguments for sending the reply.
 * @param {string} args.phoneNumberId - The ID of the phone number to send the message from.
 * @param {string} args.recipientPhoneNumber - The recipient's phone number.
 * @param {string} args.messageId - The message ID of the previous message to reply to.
 * @param {string} args.imageUrl - The URL of the image to send.
 * @returns {Promise<Object>} - The response from the WhatsApp API.
 */
const executeFunction = async ({ phoneNumberId, recipientPhoneNumber, messageId, imageUrl }) => {
  const baseUrl = 'https://graph.facebook.com';
  const token = process.env.WHATSAPP_BUSINESS_PLATFORM_API_KEY;
  const version = 'v13.0'; // replace with the desired API version

  try {
    // Construct the URL for the API request
    const url = `${baseUrl}/${version}/${phoneNumberId}/messages`;

    // Create the payload for the request
    const payload = {
      messaging_product: 'whatsapp',
      recipient_type: 'individual',
      to: recipientPhoneNumber,
      context: {
        message_id: messageId
      },
      type: 'image',
      image: {
        link: imageUrl
      }
    };

    // Set up headers for the request
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
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
    console.error('Error sending reply to image message:', error);
    return { error: 'An error occurred while sending the reply.' };
  }
};

/**
 * Tool configuration for sending a reply to an image message via WhatsApp Cloud API.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'send_reply_to_image_message',
      description: 'Send a reply to an image message on WhatsApp.',
      parameters: {
        type: 'object',
        properties: {
          phoneNumberId: {
            type: 'string',
            description: 'The ID of the phone number to send the message from.'
          },
          recipientPhoneNumber: {
            type: 'string',
            description: 'The recipient\'s phone number.'
          },
          messageId: {
            type: 'string',
            description: 'The message ID of the previous message to reply to.'
          },
          imageUrl: {
            type: 'string',
            description: 'The URL of the image to send.'
          }
        },
        required: ['phoneNumberId', 'recipientPhoneNumber', 'messageId', 'imageUrl']
      }
    }
  }
};

export { apiTool };
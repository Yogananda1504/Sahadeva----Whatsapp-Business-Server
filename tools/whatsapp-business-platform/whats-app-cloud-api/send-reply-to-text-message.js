/**
 * Function to send a reply to a text message on WhatsApp using the Cloud API.
 *
 * @param {Object} args - Arguments for sending the message.
 * @param {string} args.phoneNumberId - The ID of the phone number to send the message from.
 * @param {string} args.recipientPhoneNumber - The recipient's phone number.
 * @param {string} args.messageId - The ID of the previous message to which you are replying.
 * @param {string} args.textMessage - The content of the text message to send.
 * @returns {Promise<Object>} - The response from the WhatsApp API.
 */
const executeFunction = async ({ phoneNumberId, recipientPhoneNumber, messageId, textMessage }) => {
  const baseUrl = 'https://graph.facebook.com';
  const token = process.env.WHATSAPP_BUSINESS_PLATFORM_API_KEY;
  const version = 'v13.0'; // specify the API version

  try {
    // Construct the URL for the API request
    const url = `${baseUrl}/${version}/${phoneNumberId}/messages`;

    // Prepare the message payload
    const payload = {
      messaging_product: 'whatsapp',
      recipient_type: 'individual',
      to: recipientPhoneNumber,
      context: {
        message_id: messageId
      },
      type: 'text',
      text: {
        preview_url: false,
        body: textMessage
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
    console.error('Error sending reply to text message:', error);
    return { error: 'An error occurred while sending the reply.' };
  }
};

/**
 * Tool configuration for sending a reply to a text message on WhatsApp.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'send_reply_to_text_message',
      description: 'Send a reply to a text message on WhatsApp.',
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
            description: 'The ID of the previous message to which you are replying.'
          },
          textMessage: {
            type: 'string',
            description: 'The content of the text message to send.'
          }
        },
        required: ['phoneNumberId', 'recipientPhoneNumber', 'messageId', 'textMessage']
      }
    }
  }
};

export { apiTool };
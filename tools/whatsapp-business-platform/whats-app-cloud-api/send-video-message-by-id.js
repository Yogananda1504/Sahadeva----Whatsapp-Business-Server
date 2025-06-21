/**
 * Function to send a video message via WhatsApp Cloud API.
 *
 * @param {Object} args - Arguments for sending the video message.
 * @param {string} args.phoneNumberId - The ID of the phone number to send the message to.
 * @param {string} args.recipientPhoneNumber - The recipient's phone number.
 * @param {string} args.videoId - The ID of the video object to send.
 * @param {string} [args.caption] - The caption for the video message.
 * @returns {Promise<Object>} - The response from the API after sending the message.
 */
const sendVideoMessage = async ({ phoneNumberId, recipientPhoneNumber, videoId, caption = '' }) => {
  const baseUrl = 'https://graph.facebook.com';
  const version = ''; // will be provided by the user
  const token = process.env.WHATSAPP_BUSINESS_PLATFORM_API_KEY;

  try {
    // Construct the URL for the API request
    const url = `${baseUrl}/${version}/${phoneNumberId}/messages`;

    // Create the message payload
    const payload = {
      messaging_product: 'whatsapp',
      recipient_type: 'individual',
      to: recipientPhoneNumber,
      type: 'video',
      video: {
        caption,
        id: videoId
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
    console.error('Error sending video message:', error);
    return { error: 'An error occurred while sending the video message.' };
  }
};

/**
 * Tool configuration for sending video messages via WhatsApp Cloud API.
 * @type {Object}
 */
const apiTool = {
  function: sendVideoMessage,
  definition: {
    type: 'function',
    function: {
      name: 'send_video_message',
      description: 'Send a video message via WhatsApp Cloud API.',
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
          videoId: {
            type: 'string',
            description: 'The ID of the video object to send.'
          },
          caption: {
            type: 'string',
            description: 'The caption for the video message.'
          }
        },
        required: ['phoneNumberId', 'recipientPhoneNumber', 'videoId']
      }
    }
  }
};

export { apiTool };
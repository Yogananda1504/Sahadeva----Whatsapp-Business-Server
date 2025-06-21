/**
 * Function to send a video message via WhatsApp Cloud API.
 *
 * @param {Object} args - Arguments for sending the video message.
 * @param {string} args.phoneNumberId - The Phone Number ID associated with the WhatsApp Business Account.
 * @param {string} args.recipientPhoneNumber - The recipient's phone number.
 * @param {string} args.videoUrl - The URL of the video to be sent.
 * @param {string} args.caption - The caption for the video message.
 * @returns {Promise<Object>} - The response from the WhatsApp API.
 */
const sendVideoMessage = async ({ phoneNumberId, recipientPhoneNumber, videoUrl, caption }) => {
  const version = 'v13.0'; // Specify the API version
  const token = process.env.WHATSAPP_BUSINESS_PLATFORM_API_KEY;
  const url = `https://graph.facebook.com/${version}/${phoneNumberId}/messages`;

  const body = {
    messaging_product: "whatsapp",
    recipient_type: "individual",
    to: recipientPhoneNumber,
    type: "video",
    video: {
      link: videoUrl,
      caption: caption
    }
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData);
    }

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
            description: 'The Phone Number ID associated with the WhatsApp Business Account.'
          },
          recipientPhoneNumber: {
            type: 'string',
            description: 'The recipient\'s phone number.'
          },
          videoUrl: {
            type: 'string',
            description: 'The URL of the video to be sent.'
          },
          caption: {
            type: 'string',
            description: 'The caption for the video message.'
          }
        },
        required: ['phoneNumberId', 'recipientPhoneNumber', 'videoUrl']
      }
    }
  }
};

export { apiTool };
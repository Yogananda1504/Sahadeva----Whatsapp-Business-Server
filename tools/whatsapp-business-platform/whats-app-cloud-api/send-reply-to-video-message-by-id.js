/**
 * Function to send a reply to a video message on WhatsApp.
 *
 * @param {Object} args - Arguments for the reply.
 * @param {string} args.recipientPhoneNumber - The phone number of the recipient.
 * @param {string} args.messageId - The ID of the message you are replying to.
 * @param {string} args.videoCaption - The caption for the video.
 * @param {string} args.videoId - The ID of the video object you are sending.
 * @returns {Promise<Object>} - The result of the send reply operation.
 */
const executeFunction = async ({ recipientPhoneNumber, messageId, videoCaption, videoId }) => {
  const baseUrl = 'https://graph.facebook.com';
  const version = ''; // will be provided by the user
  const phoneNumberId = ''; // will be provided by the user
  const token = process.env.WHATSAPP_BUSINESS_PLATFORM_API_KEY;

  const payload = {
    messaging_product: "whatsapp",
    recipient_type: "individual",
    to: recipientPhoneNumber,
    context: {
      message_id: messageId
    },
    type: "video",
    video: {
      caption: videoCaption,
      id: videoId
    }
  };

  try {
    const response = await fetch(`${baseUrl}/${version}/${phoneNumberId}/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error sending reply to video message:', error);
    return { error: 'An error occurred while sending the reply.' };
  }
};

/**
 * Tool configuration for sending a reply to a video message on WhatsApp.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'send_reply_video_message',
      description: 'Send a reply to a video message on WhatsApp.',
      parameters: {
        type: 'object',
        properties: {
          recipientPhoneNumber: {
            type: 'string',
            description: 'The phone number of the recipient.'
          },
          messageId: {
            type: 'string',
            description: 'The ID of the message you are replying to.'
          },
          videoCaption: {
            type: 'string',
            description: 'The caption for the video.'
          },
          videoId: {
            type: 'string',
            description: 'The ID of the video object you are sending.'
          }
        },
        required: ['recipientPhoneNumber', 'messageId', 'videoCaption', 'videoId']
      }
    }
  }
};

export { apiTool };
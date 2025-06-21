/**
 * Function to send a reply to a video message on WhatsApp.
 *
 * @param {Object} args - Arguments for sending the video message.
 * @param {string} args.phoneNumberId - The phone number ID to send the message to.
 * @param {string} args.recipientPhoneNumber - The recipient's phone number.
 * @param {string} args.messageId - The message ID of the message you are replying to.
 * @param {string} args.videoUrl - The URL of the video to send.
 * @param {string} [args.videoCaption] - The caption for the video (optional).
 * @returns {Promise<Object>} - The response from the WhatsApp API.
 */
const executeFunction = async ({ phoneNumberId, recipientPhoneNumber, messageId, videoUrl, videoCaption }) => {
  const baseUrl = 'https://graph.facebook.com';
  const token = process.env.WHATSAPP_BUSINESS_PLATFORM_API_KEY;
  const version = ''; // will be provided by the user

  try {
    // Construct the URL for the request
    const url = `${baseUrl}/${version}/${phoneNumberId}/messages`;

    // Create the request payload
    const payload = {
      messaging_product: "whatsapp",
      recipient_type: "individual",
      to: recipientPhoneNumber,
      context: {
        message_id: messageId
      },
      type: "video",
      video: {
        link: videoUrl,
        caption: videoCaption || ""
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
          phoneNumberId: {
            type: 'string',
            description: 'The phone number ID to send the message to.'
          },
          recipientPhoneNumber: {
            type: 'string',
            description: 'The recipient\'s phone number.'
          },
          messageId: {
            type: 'string',
            description: 'The message ID of the message you are replying to.'
          },
          videoUrl: {
            type: 'string',
            description: 'The URL of the video to send.'
          },
          videoCaption: {
            type: 'string',
            description: 'The caption for the video (optional).'
          }
        },
        required: ['phoneNumberId', 'recipientPhoneNumber', 'messageId', 'videoUrl']
      }
    }
  }
};

export { apiTool };
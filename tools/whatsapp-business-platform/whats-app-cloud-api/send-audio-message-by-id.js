/**
 * Function to send an audio message via WhatsApp Cloud API.
 *
 * @param {Object} args - Arguments for sending the audio message.
 * @param {string} args.phoneNumberId - The ID of the phone number to send the message to.
 * @param {string} args.recipientPhoneNumber - The recipient's phone number.
 * @param {string} args.audioObjectId - The ID of the audio object to be sent.
 * @returns {Promise<Object>} - The result of the audio message sending operation.
 */
const executeFunction = async ({ phoneNumberId, recipientPhoneNumber, audioObjectId }) => {
  const baseUrl = 'https://graph.facebook.com';
  const token = process.env.WHATSAPP_BUSINESS_PLATFORM_API_KEY;
  const version = ''; // will be provided by the user

  try {
    // Construct the URL for sending the message
    const url = `${baseUrl}/${version}/${phoneNumberId}/messages`;

    // Create the message payload
    const payload = {
      messaging_product: "whatsapp",
      recipient_type: "individual",
      to: recipientPhoneNumber,
      type: "audio",
      audio: {
        id: audioObjectId
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
    console.error('Error sending audio message:', error);
    return { error: 'An error occurred while sending the audio message.' };
  }
};

/**
 * Tool configuration for sending audio messages via WhatsApp Cloud API.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'send_audio_message',
      description: 'Send an audio message via WhatsApp Cloud API.',
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
          audioObjectId: {
            type: 'string',
            description: 'The ID of the audio object to be sent.'
          }
        },
        required: ['phoneNumberId', 'recipientPhoneNumber', 'audioObjectId']
      }
    }
  }
};

export { apiTool };
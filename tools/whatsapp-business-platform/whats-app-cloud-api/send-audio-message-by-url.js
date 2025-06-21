/**
 * Function to send an audio message via WhatsApp Cloud API.
 *
 * @param {Object} args - Arguments for sending the audio message.
 * @param {string} args.phoneNumberId - The Phone Number ID associated with the WhatsApp Business Account.
 * @param {string} args.recipientPhoneNumber - The recipient's phone number in international format.
 * @param {string} args.audioUrl - The URL of the audio file to send.
 * @returns {Promise<Object>} - The response from the WhatsApp API after sending the message.
 */
const sendAudioMessage = async ({ phoneNumberId, recipientPhoneNumber, audioUrl }) => {
  const version = 'v13.0'; // Specify the API version
  const token = process.env.WHATSAPP_BUSINESS_PLATFORM_API_KEY;
  const url = `https://graph.facebook.com/${version}/${phoneNumberId}/messages`;

  const body = JSON.stringify({
    messaging_product: 'whatsapp',
    recipient_type: 'individual',
    to: recipientPhoneNumber,
    type: 'audio',
    audio: {
      link: audioUrl
    }
  });

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData);
    }

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
  function: sendAudioMessage,
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
            description: 'The Phone Number ID associated with the WhatsApp Business Account.'
          },
          recipientPhoneNumber: {
            type: 'string',
            description: 'The recipient\'s phone number in international format.'
          },
          audioUrl: {
            type: 'string',
            description: 'The URL of the audio file to send.'
          }
        },
        required: ['phoneNumberId', 'recipientPhoneNumber', 'audioUrl']
      }
    }
  }
};

export { apiTool };
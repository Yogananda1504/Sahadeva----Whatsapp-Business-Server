/**
 * Function to send a location message via WhatsApp Cloud API.
 *
 * @param {Object} args - Arguments for sending the location message.
 * @param {string} args.phoneNumberId - The phone number ID to send the message to.
 * @param {string} args.recipientPhoneNumber - The recipient's phone number.
 * @param {number} args.latitude - The latitude of the location.
 * @param {number} args.longitude - The longitude of the location.
 * @param {string} args.locationName - The name of the location.
 * @param {string} args.locationAddress - The address of the location.
 * @returns {Promise<Object>} - The response from the WhatsApp API.
 */
const executeFunction = async ({ phoneNumberId, recipientPhoneNumber, latitude, longitude, locationName, locationAddress }) => {
  const baseUrl = 'https://graph.facebook.com';
  const token = process.env.WHATSAPP_BUSINESS_PLATFORM_API_KEY;
  const version = 'v13.0'; // specify the API version

  const messageData = {
    messaging_product: "whatsapp",
    recipient_type: "individual",
    to: recipientPhoneNumber,
    type: "location",
    location: {
      latitude: latitude.toString(),
      longitude: longitude.toString(),
      name: locationName,
      address: locationAddress
    }
  };

  try {
    const response = await fetch(`${baseUrl}/${version}/${phoneNumberId}/messages`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(messageData)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error sending location message:', error);
    return { error: 'An error occurred while sending the location message.' };
  }
};

/**
 * Tool configuration for sending location messages via WhatsApp Cloud API.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'send_location_message',
      description: 'Send a location message via WhatsApp Cloud API.',
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
          latitude: {
            type: 'number',
            description: 'The latitude of the location.'
          },
          longitude: {
            type: 'number',
            description: 'The longitude of the location.'
          },
          locationName: {
            type: 'string',
            description: 'The name of the location.'
          },
          locationAddress: {
            type: 'string',
            description: 'The address of the location.'
          }
        },
        required: ['phoneNumberId', 'recipientPhoneNumber', 'latitude', 'longitude', 'locationName', 'locationAddress']
      }
    }
  }
};

export { apiTool };
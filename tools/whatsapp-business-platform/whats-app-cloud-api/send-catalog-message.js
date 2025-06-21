/**
 * Function to send a catalog message via WhatsApp Cloud API.
 *
 * @param {Object} args - Arguments for sending the message.
 * @param {string} args.recipientPhoneNumber - The phone number of the recipient.
 * @param {string} args.version - The API version to use.
 * @param {string} args.phoneNumberId - The phone number ID to send the message from.
 * @returns {Promise<Object>} - The response from the WhatsApp API.
 */
const executeFunction = async ({ recipientPhoneNumber, version, phoneNumberId }) => {
  const baseUrl = 'https://graph.facebook.com';
  const token = process.env.WHATSAPP_BUSINESS_PLATFORM_API_KEY;

  const messageData = {
    messaging_product: "whatsapp",
    recipient_type: "individual",
    to: recipientPhoneNumber,
    type: "interactive",
    interactive: {
      type: "catalog_message",
      body: {
        text: "Hello! Thanks for your interest. Ordering is easy. Just visit our catalog and add items to purchase."
      },
      action: {
        name: "catalog_message",
        parameters: {
          thumbnail_product_retailer_id: "2lc20305pt"
        }
      },
      footer: {
        text: "Best grocery deals on WhatsApp!"
      }
    }
  };

  try {
    const response = await fetch(`${baseUrl}/${version}/${phoneNumberId}/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
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
    console.error('Error sending catalog message:', error);
    return { error: 'An error occurred while sending the catalog message.' };
  }
};

/**
 * Tool configuration for sending catalog messages via WhatsApp Cloud API.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'send_catalog_message',
      description: 'Send a catalog message via WhatsApp Cloud API.',
      parameters: {
        type: 'object',
        properties: {
          recipientPhoneNumber: {
            type: 'string',
            description: 'The phone number of the recipient.'
          },
          version: {
            type: 'string',
            description: 'The API version to use.'
          },
          phoneNumberId: {
            type: 'string',
            description: 'The phone number ID to send the message from.'
          }
        },
        required: ['recipientPhoneNumber', 'version', 'phoneNumberId']
      }
    }
  }
};

export { apiTool };
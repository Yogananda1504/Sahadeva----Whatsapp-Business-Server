/**
 * Function to send a single product message via WhatsApp Cloud API.
 *
 * @param {Object} args - Arguments for sending the message.
 * @param {string} args.recipientPhoneNumber - The phone number of the recipient.
 * @param {string} [args.bodyText] - Optional body text for the message.
 * @param {string} [args.footerText] - Optional footer text for the message.
 * @param {string} args.catalogId - The catalog ID associated with the product.
 * @param {string} args.productRetailerId - The retailer ID of the product to send.
 * @returns {Promise<Object>} - The response from the WhatsApp API.
 */
const sendSingleProductMessage = async ({ recipientPhoneNumber, bodyText = '', footerText = '', catalogId, productRetailerId }) => {
  const version = ''; // will be provided by the user
  const phoneNumberId = ''; // will be provided by the user
  const token = process.env.WHATSAPP_BUSINESS_PLATFORM_API_KEY;
  const url = `https://graph.facebook.com/${version}/${phoneNumberId}/messages`;

  const messageData = {
    messaging_product: "whatsapp",
    recipient_type: "individual",
    to: recipientPhoneNumber,
    type: "interactive",
    interactive: {
      type: "product",
      body: {
        text: bodyText
      },
      footer: {
        text: footerText
      },
      action: {
        catalog_id: catalogId,
        product_retailer_id: productRetailerId
      }
    }
  };

  try {
    const response = await fetch(url, {
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
    console.error('Error sending product message:', error);
    return { error: 'An error occurred while sending the product message.' };
  }
};

/**
 * Tool configuration for sending a single product message via WhatsApp Cloud API.
 * @type {Object}
 */
const apiTool = {
  function: sendSingleProductMessage,
  definition: {
    type: 'function',
    function: {
      name: 'send_single_product_message',
      description: 'Send a single product message via WhatsApp Cloud API.',
      parameters: {
        type: 'object',
        properties: {
          recipientPhoneNumber: {
            type: 'string',
            description: 'The phone number of the recipient.'
          },
          bodyText: {
            type: 'string',
            description: 'Optional body text for the message.'
          },
          footerText: {
            type: 'string',
            description: 'Optional footer text for the message.'
          },
          catalogId: {
            type: 'string',
            description: 'The catalog ID associated with the product.'
          },
          productRetailerId: {
            type: 'string',
            description: 'The retailer ID of the product to send.'
          }
        },
        required: ['recipientPhoneNumber', 'catalogId', 'productRetailerId']
      }
    }
  }
};

export { apiTool };
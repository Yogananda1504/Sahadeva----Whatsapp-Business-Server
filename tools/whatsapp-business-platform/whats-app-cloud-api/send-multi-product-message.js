/**
 * Function to send a multi-product message via WhatsApp Cloud API.
 *
 * @param {Object} args - Arguments for sending the message.
 * @param {string} args.recipientPhoneNumber - The phone number of the recipient.
 * @param {string} args.headerType - The type of the header for the message.
 * @param {string} args.headerText - The text content of the header.
 * @param {string} args.bodyText - The text content of the body.
 * @param {string} args.footerText - The text content of the footer.
 * @param {Array<Object>} args.productSections - An array of product sections, each containing title and product items.
 * @returns {Promise<Object>} - The response from the WhatsApp API after sending the message.
 */
const executeFunction = async ({ recipientPhoneNumber, headerType, headerText, bodyText, footerText, productSections }) => {
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
      type: "product_list",
      header: {
        type: headerType,
        text: headerText
      },
      body: {
        text: bodyText
      },
      footer: {
        text: footerText
      },
      action: {
        catalog_id: "146265584024623",
        sections: productSections
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
    console.error('Error sending multi-product message:', error);
    return { error: 'An error occurred while sending the multi-product message.' };
  }
};

/**
 * Tool configuration for sending multi-product messages via WhatsApp Cloud API.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'send_multi_product_message',
      description: 'Send a multi-product message via WhatsApp Cloud API.',
      parameters: {
        type: 'object',
        properties: {
          recipientPhoneNumber: {
            type: 'string',
            description: 'The phone number of the recipient.'
          },
          headerType: {
            type: 'string',
            description: 'The type of the header for the message.'
          },
          headerText: {
            type: 'string',
            description: 'The text content of the header.'
          },
          bodyText: {
            type: 'string',
            description: 'The text content of the body.'
          },
          footerText: {
            type: 'string',
            description: 'The text content of the footer.'
          },
          productSections: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                title: {
                  type: 'string',
                  description: 'The title of the product section.'
                },
                product_items: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      product_retailer_id: {
                        type: 'string',
                        description: 'The SKU of the product in the catalog.'
                      }
                    },
                    required: ['product_retailer_id']
                  }
                }
              },
              required: ['title', 'product_items']
            },
            description: 'An array of product sections to include in the message.'
          }
        },
        required: ['recipientPhoneNumber', 'headerType', 'headerText', 'bodyText', 'footerText', 'productSections']
      }
    }
  }
};

export { apiTool };
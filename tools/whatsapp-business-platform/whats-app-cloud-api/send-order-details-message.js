/**
 * Function to send order details message via WhatsApp Cloud API.
 *
 * @param {Object} args - Arguments for sending the message.
 * @param {string} args.recipientId - The WhatsApp ID of the recipient.
 * @param {string} args.imageLink - The URL of the image to be included in the message.
 * @param {string} args.providerName - The name of the provider for the image.
 * @param {string} args.bodyText - The text content for the body of the message.
 * @param {string} args.footerText - The text content for the footer of the message.
 * @param {string} args.referenceId - A unique reference ID for the order.
 * @param {number} args.totalAmountValue - The total amount for the order.
 * @param {number} args.subtotalValue - The subtotal amount for the order.
 * @param {number} args.taxValue - The tax amount for the order.
 * @param {number} args.shippingValue - The shipping amount for the order.
 * @param {number} args.discountValue - The discount amount for the order.
 * @returns {Promise<Object>} - The result of the message sending operation.
 */
const sendOrderDetailsMessage = async ({
  recipientId,
  imageLink,
  providerName,
  bodyText,
  footerText,
  referenceId,
  totalAmountValue,
  subtotalValue,
  taxValue,
  shippingValue,
  discountValue
}) => {
  const token = process.env.WHATSAPP_BUSINESS_PLATFORM_API_KEY;
  const version = ''; // will be provided by the user
  const phoneNumberId = ''; // will be provided by the user
  const url = `https://graph.facebook.com/${version}/${phoneNumberId}/messages`;

  const messageData = {
    messaging_product: "whatsapp",
    recipient_type: "individual",
    to: recipientId,
    type: "interactive",
    interactive: {
      type: "order_details",
      order_details: {
        header: {
          type: "image",
          image: {
            link: imageLink,
            provider: {
              name: providerName
            }
          }
        },
        body: {
          text: bodyText
        },
        footer: {
          text: footerText
        },
        action: {
          reference_id: referenceId,
          type: "digital-goods",
          payment_type: "p2m-lite:stripe",
          payment_configuration: "my-payment-config-name",
          currency: "SGD",
          total_amount: {
            value: totalAmountValue,
            offset: 100
          },
          order: {
            status: "pending",
            items: [
              {
                retailer_id: "1234567",
                name: "bread",
                amount: {
                  value: 10000,
                  offset: 100
                },
                sale_amount: {
                  value: 100,
                  offset: 100
                },
                quantity: 1
              }
            ],
            subtotal: {
              value: subtotalValue,
              offset: 100
            },
            tax: {
              value: taxValue,
              offset: 100,
              description: "optional_text"
            },
            shipping: {
              value: shippingValue,
              offset: 100,
              description: "optional_text"
            },
            discount: {
              value: discountValue,
              offset: 100,
              description: "optional_text",
              discount_program_name: "optional_text"
            },
            catalog_id: "optional-catalog_id",
            expiration: {
              timestamp: "utc_timestamp_in_seconds",
              description: "cancellation-explanation"
            }
          }
        }
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
    console.error('Error sending order details message:', error);
    return { error: 'An error occurred while sending the message.' };
  }
};

/**
 * Tool configuration for sending order details messages via WhatsApp Cloud API.
 * @type {Object}
 */
const apiTool = {
  function: sendOrderDetailsMessage,
  definition: {
    type: 'function',
    function: {
      name: 'send_order_details_message',
      description: 'Send order details message via WhatsApp Cloud API.',
      parameters: {
        type: 'object',
        properties: {
          recipientId: {
            type: 'string',
            description: 'The WhatsApp ID of the recipient.'
          },
          imageLink: {
            type: 'string',
            description: 'The URL of the image to be included in the message.'
          },
          providerName: {
            type: 'string',
            description: 'The name of the provider for the image.'
          },
          bodyText: {
            type: 'string',
            description: 'The text content for the body of the message.'
          },
          footerText: {
            type: 'string',
            description: 'The text content for the footer of the message.'
          },
          referenceId: {
            type: 'string',
            description: 'A unique reference ID for the order.'
          },
          totalAmountValue: {
            type: 'number',
            description: 'The total amount for the order.'
          },
          subtotalValue: {
            type: 'number',
            description: 'The subtotal amount for the order.'
          },
          taxValue: {
            type: 'number',
            description: 'The tax amount for the order.'
          },
          shippingValue: {
            type: 'number',
            description: 'The shipping amount for the order.'
          },
          discountValue: {
            type: 'number',
            description: 'The discount amount for the order.'
          }
        },
        required: ['recipientId', 'imageLink', 'bodyText', 'referenceId', 'totalAmountValue', 'subtotalValue']
      }
    }
  }
};

export { apiTool };
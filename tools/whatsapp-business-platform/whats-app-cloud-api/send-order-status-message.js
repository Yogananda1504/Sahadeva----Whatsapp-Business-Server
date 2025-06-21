/**
 * Function to send an order status message via WhatsApp Cloud API.
 *
 * @param {Object} args - Arguments for sending the message.
 * @param {string} args.recipientId - The WhatsApp ID of the recipient.
 * @param {string} args.referenceId - The unique reference ID from the order details message.
 * @param {string} [args.status="processing"] - The status of the order.
 * @param {string} [args.description="optional-text"] - An optional description of the order status.
 * @returns {Promise<Object>} - The response from the WhatsApp API after sending the message.
 */
const executeFunction = async ({ recipientId, referenceId, status = 'processing', description = 'optional-text' }) => {
  const baseUrl = 'https://graph.facebook.com';
  const token = process.env.WHATSAPP_BUSINESS_PLATFORM_API_KEY;
  const version = ''; // will be provided by the user
  const phoneNumberId = ''; // will be provided by the user

  try {
    // Construct the URL for the API request
    const url = `${baseUrl}/${version}/${phoneNumberId}/messages`;

    // Create the message payload
    const payload = {
      messaging_product: "whatsapp",
      recipient_type: "individual",
      to: recipientId,
      type: "interactive",
      interactive: {
        type: "order_status",
        body: {
          text: "your-text-body-content"
        },
        action: {
          name: "review_order",
          parameters: {
            reference_id: referenceId,
            order: {
              status: status,
              description: description
            }
          }
        }
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
      headers: headers,
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
    console.error('Error sending order status message:', error);
    return { error: 'An error occurred while sending the order status message.' };
  }
};

/**
 * Tool configuration for sending order status messages via WhatsApp.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'send_order_status_message',
      description: 'Send an order status message via WhatsApp Cloud API.',
      parameters: {
        type: 'object',
        properties: {
          recipientId: {
            type: 'string',
            description: 'The WhatsApp ID of the recipient.'
          },
          referenceId: {
            type: 'string',
            description: 'The unique reference ID from the order details message.'
          },
          status: {
            type: 'string',
            description: 'The status of the order.'
          },
          description: {
            type: 'string',
            description: 'An optional description of the order status.'
          }
        },
        required: ['recipientId', 'referenceId']
      }
    }
  }
};

export { apiTool };
/**
 * Function to send a document message via WhatsApp Cloud API.
 *
 * @param {Object} args - Arguments for sending the document message.
 * @param {string} args.phoneNumberId - The phone number ID to send the message to.
 * @param {string} args.recipientPhoneNumber - The recipient's phone number.
 * @param {string} args.documentUrl - The URL of the document to send.
 * @param {string} args.caption - The caption for the document.
 * @returns {Promise<Object>} - The response from the WhatsApp API.
 */
const executeFunction = async ({ phoneNumberId, recipientPhoneNumber, documentUrl, caption }) => {
  const baseUrl = 'https://graph.facebook.com';
  const version = ''; // will be provided by the user
  const token = process.env.WHATSAPP_BUSINESS_PLATFORM_API_KEY;

  try {
    // Construct the URL for the API request
    const url = `${baseUrl}/${version}/${phoneNumberId}/messages`;

    // Create the message payload
    const payload = {
      messaging_product: "whatsapp",
      recipient_type: "individual",
      to: recipientPhoneNumber,
      type: "document",
      document: {
        link: documentUrl,
        caption: caption
      }
    };

    // Perform the fetch request
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
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
    console.error('Error sending document message:', error);
    return { error: 'An error occurred while sending the document message.' };
  }
};

/**
 * Tool configuration for sending document messages via WhatsApp Cloud API.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'send_document_message',
      description: 'Send a document message via WhatsApp Cloud API.',
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
          documentUrl: {
            type: 'string',
            description: 'The URL of the document to send.'
          },
          caption: {
            type: 'string',
            description: 'The caption for the document.'
          }
        },
        required: ['phoneNumberId', 'recipientPhoneNumber', 'documentUrl']
      }
    }
  }
};

export { apiTool };
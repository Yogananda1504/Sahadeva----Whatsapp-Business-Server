/**
 * Function to send a reply to a document message via WhatsApp Cloud API.
 *
 * @param {Object} args - Arguments for sending the document reply.
 * @param {string} args.phoneNumberId - The phone number ID to send the message to.
 * @param {string} args.recipientPhoneNumber - The recipient's phone number.
 * @param {string} args.messageId - The message ID of the message you are replying to.
 * @param {string} args.documentUrl - The URL of the document to send.
 * @param {string} [args.documentCaption] - The caption for the document.
 * @returns {Promise<Object>} - The response from the WhatsApp API.
 */
const executeFunction = async ({ phoneNumberId, recipientPhoneNumber, messageId, documentUrl, documentCaption }) => {
  const url = `https://graph.facebook.com/{{Version}}/${phoneNumberId}/messages`;
  const token = process.env.WHATSAPP_BUSINESS_PLATFORM_API_KEY;

  const payload = {
    messaging_product: "whatsapp",
    recipient_type: "individual",
    to: recipientPhoneNumber,
    context: {
      message_id: messageId
    },
    type: "document",
    document: {
      link: documentUrl,
      caption: documentCaption || ''
    }
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error sending document reply:', error);
    return { error: 'An error occurred while sending the document reply.' };
  }
};

/**
 * Tool configuration for sending a reply to a document message on WhatsApp.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'send_reply_to_document_message',
      description: 'Send a reply to a document message on WhatsApp.',
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
          documentUrl: {
            type: 'string',
            description: 'The URL of the document to send.'
          },
          documentCaption: {
            type: 'string',
            description: 'The caption for the document.'
          }
        },
        required: ['phoneNumberId', 'recipientPhoneNumber', 'messageId', 'documentUrl']
      }
    }
  }
};

export { apiTool };
/**
 * Function to send a reply to a document message on WhatsApp.
 *
 * @param {Object} args - Arguments for sending the reply.
 * @param {string} args.recipientPhoneNumber - The phone number of the recipient.
 * @param {string} args.messageId - The ID of the message you are replying to.
 * @param {string} args.documentId - The ID of the document object you are replying to.
 * @param {string} args.documentCaption - The caption for the document to send.
 * @param {string} args.documentFilename - The filename of the document to send.
 * @returns {Promise<Object>} - The result of the send message operation.
 */
const executeFunction = async ({ recipientPhoneNumber, messageId, documentId, documentCaption, documentFilename }) => {
  const version = ''; // will be provided by the user
  const phoneNumberId = ''; // will be provided by the user
  const token = process.env.WHATSAPP_BUSINESS_PLATFORM_API_KEY;
  const url = `https://graph.facebook.com/${version}/${phoneNumberId}/messages`;

  const body = {
    messaging_product: "whatsapp",
    recipient_type: "individual",
    to: recipientPhoneNumber,
    context: {
      message_id: messageId
    },
    type: "document",
    document: {
      id: documentId,
      caption: documentCaption,
      filename: documentFilename
    }
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error sending reply to document message:', error);
    return { error: 'An error occurred while sending the reply to the document message.' };
  }
};

/**
 * Tool configuration for sending replies to document messages on WhatsApp.
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
          recipientPhoneNumber: {
            type: 'string',
            description: 'The phone number of the recipient.'
          },
          messageId: {
            type: 'string',
            description: 'The ID of the message you are replying to.'
          },
          documentId: {
            type: 'string',
            description: 'The ID of the document object you are replying to.'
          },
          documentCaption: {
            type: 'string',
            description: 'The caption for the document to send.'
          },
          documentFilename: {
            type: 'string',
            description: 'The filename of the document to send.'
          }
        },
        required: ['recipientPhoneNumber', 'messageId', 'documentId']
      }
    }
  }
};

export { apiTool };
/**
 * Function to send a document message via WhatsApp Cloud API.
 *
 * @param {Object} args - Arguments for sending the document message.
 * @param {string} args.phoneNumberId - The phone number ID to send the message to.
 * @param {string} args.recipientPhoneNumber - The recipient's phone number.
 * @param {string} args.documentId - The ID of the document to send.
 * @param {string} args.caption - The caption for the document.
 * @param {string} args.filename - The filename of the document.
 * @returns {Promise<Object>} - The response from the WhatsApp API.
 */
const executeFunction = async ({ phoneNumberId, recipientPhoneNumber, documentId, caption, filename }) => {
  const accessToken = ''; // will be provided by the user
  const version = 'v13.0'; // specify the API version
  const url = `https://graph.facebook.com/${version}/${phoneNumberId}/messages`;

  const messageData = {
    messaging_product: "whatsapp",
    recipient_type: "individual",
    to: recipientPhoneNumber,
    type: "document",
    document: {
      id: documentId,
      caption: caption,
      filename: filename
    }
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
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
    console.error('Error sending document message:', error);
    return { error: 'An error occurred while sending the document message.' };
  }
};

/**
 * Tool configuration for sending a document message via WhatsApp Cloud API.
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
          documentId: {
            type: 'string',
            description: 'The ID of the document to send.'
          },
          caption: {
            type: 'string',
            description: 'The caption for the document.'
          },
          filename: {
            type: 'string',
            description: 'The filename of the document.'
          }
        },
        required: ['phoneNumberId', 'recipientPhoneNumber', 'documentId']
      }
    }
  }
};

export { apiTool };
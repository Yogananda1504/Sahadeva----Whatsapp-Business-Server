/**
 * Function to send a reply to a contact message using the WhatsApp Cloud API.
 *
 * @param {Object} args - Arguments for sending the message.
 * @param {string} args.phoneNumberId - The phone number ID to send the message to.
 * @param {string} args.recipientPhoneNumber - The recipient's phone number.
 * @param {string} args.messageId - The message ID of the previous message for context.
 * @param {Array<Object>} args.contacts - An array of contact objects to send.
 * @returns {Promise<Object>} - The response from the WhatsApp API.
 */
const executeFunction = async ({ phoneNumberId, recipientPhoneNumber, messageId, contacts }) => {
  const url = `https://graph.facebook.com/v13.0/${phoneNumberId}/messages`;
  const token = process.env.WHATSAPP_BUSINESS_PLATFORM_API_KEY;

  const body = {
    messaging_product: "whatsapp",
    to: recipientPhoneNumber,
    context: {
      message_id: messageId
    },
    type: "contacts",
    contacts: contacts
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
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
    console.error('Error sending reply to contact message:', error);
    return { error: 'An error occurred while sending the reply.' };
  }
};

/**
 * Tool configuration for sending a reply to a contact message using the WhatsApp Cloud API.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'send_reply_to_contact_message',
      description: 'Send a reply to a contact message using the WhatsApp Cloud API.',
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
            description: 'The message ID of the previous message for context.'
          },
          contacts: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                addresses: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      street: { type: 'string' },
                      city: { type: 'string' },
                      state: { type: 'string' },
                      zip: { type: 'string' },
                      country: { type: 'string' },
                      country_code: { type: 'string' },
                      type: { type: 'string', enum: ['HOME', 'WORK'] }
                    }
                  }
                },
                birthday: { type: 'string' },
                emails: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      email: { type: 'string' },
                      type: { type: 'string', enum: ['WORK', 'HOME'] }
                    }
                  }
                },
                name: {
                  type: 'object',
                  properties: {
                    formatted_name: { type: 'string' },
                    first_name: { type: 'string' },
                    last_name: { type: 'string' },
                    middle_name: { type: 'string' },
                    suffix: { type: 'string' },
                    prefix: { type: 'string' }
                  }
                },
                org: {
                  type: 'object',
                  properties: {
                    company: { type: 'string' },
                    department: { type: 'string' },
                    title: { type: 'string' }
                  }
                },
                phones: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      phone: { type: 'string' },
                      wa_id: { type: 'string' },
                      type: { type: 'string', enum: ['HOME', 'WORK'] }
                    }
                  }
                },
                urls: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      url: { type: 'string' },
                      type: { type: 'string', enum: ['HOME', 'WORK'] }
                    }
                  }
                }
              }
            },
            description: 'An array of contact objects to send.'
          }
        },
        required: ['phoneNumberId', 'recipientPhoneNumber', 'messageId', 'contacts']
      }
    }
  }
};

export { apiTool };
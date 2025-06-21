/**
 * Function to send a list message via WhatsApp Cloud API.
 *
 * @param {Object} args - Arguments for sending the list message.
 * @param {string} args.recipientPhoneNumber - The phone number of the recipient.
 * @param {string} args.headerText - The header text for the list message.
 * @param {string} args.bodyText - The body text for the list message.
 * @param {string} args.footerText - The footer text for the list message.
 * @param {string} args.buttonText - The button text for the list message.
 * @param {Array} args.listSections - An array of sections for the list message, each containing title and rows.
 * @returns {Promise<Object>} - The response from the WhatsApp API after sending the message.
 */
const executeFunction = async ({ recipientPhoneNumber, headerText, bodyText, footerText, buttonText, listSections }) => {
  const url = 'https://graph.facebook.com/{{Version}}/{{Phone-Number-ID}}/messages';
  const token = process.env.WHATSAPP_BUSINESS_PLATFORM_API_KEY;

  const messageData = {
    messaging_product: "whatsapp",
    recipient_type: "individual",
    to: recipientPhoneNumber,
    type: "interactive",
    interactive: {
      type: "list",
      header: {
        type: "text",
        text: headerText
      },
      body: {
        text: bodyText
      },
      footer: {
        text: footerText
      },
      action: {
        button: buttonText,
        sections: listSections
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
    console.error('Error sending list message:', error);
    return { error: 'An error occurred while sending the list message.' };
  }
};

/**
 * Tool configuration for sending list messages via WhatsApp Cloud API.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'send_list_message',
      description: 'Send a list message via WhatsApp Cloud API.',
      parameters: {
        type: 'object',
        properties: {
          recipientPhoneNumber: {
            type: 'string',
            description: 'The phone number of the recipient.'
          },
          headerText: {
            type: 'string',
            description: 'The header text for the list message.'
          },
          bodyText: {
            type: 'string',
            description: 'The body text for the list message.'
          },
          footerText: {
            type: 'string',
            description: 'The footer text for the list message.'
          },
          buttonText: {
            type: 'string',
            description: 'The button text for the list message.'
          },
          listSections: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                title: {
                  type: 'string',
                  description: 'The title of the list section.'
                },
                rows: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      id: {
                        type: 'string',
                        description: 'The ID of the row.'
                      },
                      title: {
                        type: 'string',
                        description: 'The title of the row.'
                      },
                      description: {
                        type: 'string',
                        description: 'The description of the row.'
                      }
                    },
                    required: ['id', 'title']
                  }
                }
              },
              required: ['title', 'rows']
            },
            description: 'An array of sections for the list message.'
          }
        },
        required: ['recipientPhoneNumber', 'headerText', 'bodyText', 'footerText', 'buttonText', 'listSections']
      }
    }
  }
};

export { apiTool };
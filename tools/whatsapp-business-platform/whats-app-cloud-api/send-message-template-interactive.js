/**
 * Function to send an interactive message template via WhatsApp Cloud API.
 *
 * @param {Object} args - Arguments for sending the message.
 * @param {string} args.phoneNumberId - The phone number ID to send the message to.
 * @param {string} args.recipientPhoneNumber - The recipient's phone number.
 * @param {string} args.templateName - The name of the template to use.
 * @param {string} args.languageCode - The language and locale code for the template.
 * @param {string} args.imageUrl - The URL of the image to include in the message.
 * @param {string} args.textString - The text to include in the message body.
 * @param {number} args.amount - The amount for the currency parameter.
 * @param {string} args.currencyCode - The currency code (e.g., USD).
 * @returns {Promise<Object>} - The result of the message sending operation.
 */
const executeFunction = async ({ phoneNumberId, recipientPhoneNumber, templateName, languageCode, imageUrl, textString, amount, currencyCode }) => {
  const url = `https://graph.facebook.com/v13.0/${phoneNumberId}/messages`;
  const token = process.env.WHATSAPP_BUSINESS_PLATFORM_API_KEY;

  const messageData = {
    messaging_product: "whatsapp",
    recipient_type: "individual",
    to: recipientPhoneNumber,
    type: "template",
    template: {
      name: templateName,
      language: {
        code: languageCode
      },
      components: [
        {
          type: "header",
          parameters: [
            {
              type: "image",
              image: {
                link: imageUrl
              }
            }
          ]
        },
        {
          type: "body",
          parameters: [
            {
              type: "text",
              text: textString
            },
            {
              type: "currency",
              currency: {
                fallback_value: `$${amount}`,
                code: currencyCode,
                amount_1000: amount * 1000
              }
            },
            {
              type: "date_time",
              date_time: {
                fallback_value: "February 25, 1977",
                day_of_week: 5,
                year: 1977,
                month: 2,
                day_of_month: 25,
                hour: 15,
                minute: 33,
                calendar: "GREGORIAN"
              }
            }
          ]
        },
        {
          type: "button",
          sub_type: "quick_reply",
          index: "0",
          parameters: [
            {
              type: "payload",
              payload: "aGlzIHRoaXMgaXMgY29v"
            }
          ]
        },
        {
          type: "button",
          sub_type: "quick_reply",
          index: "1",
          parameters: [
            {
              type: "payload",
              payload: "9rwnB8RbYmPF5t2Mn09x4h"
            }
          ]
        }
      ]
    }
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
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
    console.error('Error sending message template:', error);
    return { error: 'An error occurred while sending the message template.' };
  }
};

/**
 * Tool configuration for sending an interactive message template via WhatsApp.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'send_message_template_interactive',
      description: 'Send an interactive message template via WhatsApp Cloud API.',
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
          templateName: {
            type: 'string',
            description: 'The name of the template to use.'
          },
          languageCode: {
            type: 'string',
            description: 'The language and locale code for the template.'
          },
          imageUrl: {
            type: 'string',
            description: 'The URL of the image to include in the message.'
          },
          textString: {
            type: 'string',
            description: 'The text to include in the message body.'
          },
          amount: {
            type: 'number',
            description: 'The amount for the currency parameter.'
          },
          currencyCode: {
            type: 'string',
            description: 'The currency code (e.g., USD).'
          }
        },
        required: ['phoneNumberId', 'recipientPhoneNumber', 'templateName', 'languageCode']
      }
    }
  }
};

export { apiTool };
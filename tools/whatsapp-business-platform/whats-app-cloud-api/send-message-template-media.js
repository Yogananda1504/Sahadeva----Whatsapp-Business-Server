/**
 * Function to send a message template media via WhatsApp Cloud API.
 *
 * @param {Object} args - Arguments for sending the message.
 * @param {string} args.phoneNumberId - The phone number ID to send the message to.
 * @param {string} args.recipientPhoneNumber - The recipient's phone number.
 * @param {string} args.templateName - The name of the template to use.
 * @param {string} args.languageCode - The language and locale code for the template.
 * @param {string} args.imageUrl - The URL of the image to include in the message.
 * @param {string} args.textString - The text to include in the message body.
 * @param {string} args.currencyFallbackValue - The fallback value for the currency.
 * @param {string} args.currencyCode - The currency code (e.g., USD).
 * @param {number} args.amount1000 - The amount in cents (e.g., $100.99 would be 100990).
 * @param {Object} args.dateTime - The date and time object for the message.
 * @returns {Promise<Object>} - The response from the API after sending the message.
 */
const executeFunction = async ({
  phoneNumberId,
  recipientPhoneNumber,
  templateName,
  languageCode,
  imageUrl,
  textString,
  currencyFallbackValue,
  currencyCode,
  amount1000,
  dateTime
}) => {
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
                fallback_value: currencyFallbackValue,
                code: currencyCode,
                amount_1000: amount1000
              }
            },
            {
              type: "date_time",
              date_time: dateTime
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
    console.error('Error sending message template media:', error);
    return { error: 'An error occurred while sending the message template media.' };
  }
};

/**
 * Tool configuration for sending message template media via WhatsApp Cloud API.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'send_message_template_media',
      description: 'Send a media message template via WhatsApp Cloud API.',
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
          currencyFallbackValue: {
            type: 'string',
            description: 'The fallback value for the currency.'
          },
          currencyCode: {
            type: 'string',
            description: 'The currency code (e.g., USD).'
          },
          amount1000: {
            type: 'integer',
            description: 'The amount in cents (e.g., $100.99 would be 100990).'
          },
          dateTime: {
            type: 'object',
            description: 'The date and time object for the message.'
          }
        },
        required: ['phoneNumberId', 'recipientPhoneNumber', 'templateName', 'languageCode']
      }
    }
  }
};

export { apiTool };
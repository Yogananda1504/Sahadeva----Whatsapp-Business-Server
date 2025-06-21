/**
 * Function to send a contact message via WhatsApp Cloud API.
 *
 * @param {Object} args - Arguments for sending the contact message.
 * @param {string} args.phoneNumberId - The Phone Number ID to send the message to.
 * @param {string} args.recipientPhoneNumber - The recipient's phone number.
 * @param {Object} args.contact - The contact object containing contact details.
 * @returns {Promise<Object>} - The response from the WhatsApp API.
 */
const executeFunction = async ({ phoneNumberId, recipientPhoneNumber, contact }) => {
  const baseUrl = 'https://graph.facebook.com';
  const token = process.env.WHATSAPP_BUSINESS_PLATFORM_API_KEY;

  try {
    // Construct the URL for the API request
    const url = `${baseUrl}/${phoneNumberId}/messages`;

    // Prepare the message payload
    const messagePayload = {
      messaging_product: "whatsapp",
      to: recipientPhoneNumber,
      type: "contacts",
      contacts: [contact]
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
      body: JSON.stringify(messagePayload)
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
    console.error('Error sending contact message:', error);
    return { error: 'An error occurred while sending the contact message.' };
  }
};

/**
 * Tool configuration for sending contact messages via WhatsApp Cloud API.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'send_contact_message',
      description: 'Send a contact message via WhatsApp Cloud API.',
      parameters: {
        type: 'object',
        properties: {
          phoneNumberId: {
            type: 'string',
            description: 'The Phone Number ID to send the message to.'
          },
          recipientPhoneNumber: {
            type: 'string',
            description: 'The recipient\'s phone number.'
          },
          contact: {
            type: 'object',
            description: 'The contact object containing contact details.',
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
            },
            required: ['addresses', 'name', 'phones']
          }
        },
        required: ['phoneNumberId', 'recipientPhoneNumber', 'contact']
      }
    }
  }
};

export { apiTool };
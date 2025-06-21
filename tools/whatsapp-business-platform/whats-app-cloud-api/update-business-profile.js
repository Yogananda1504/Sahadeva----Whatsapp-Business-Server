/**
 * Function to update the business profile on WhatsApp Cloud API.
 *
 * @param {Object} args - Arguments for updating the business profile.
 * @param {string} args.phoneNumberId - The phone number ID associated with the business.
 * @param {string} args.address - The address of the business.
 * @param {string} args.description - The description of the business.
 * @param {string} args.vertical - The industry type of the business.
 * @param {string} args.about - The text to display in the business profile's About section.
 * @param {string} args.email - The contact email address of the business.
 * @param {Array<string>} args.websites - The URLs associated with the business.
 * @param {string} args.profilePictureHandle - The handle of the profile picture.
 * @returns {Promise<Object>} - The result of the business profile update.
 */
const executeFunction = async ({ phoneNumberId, address, description, vertical, about, email, websites, profilePictureHandle }) => {
  const baseUrl = 'https://graph.facebook.com';
  const token = process.env.WHATSAPP_BUSINESS_PLATFORM_API_KEY;
  const version = ''; // will be provided by the user

  try {
    // Construct the URL for the request
    const url = `${baseUrl}/${version}/${phoneNumberId}/whatsapp_business_profile`;

    // Prepare the request body
    const body = {
      messaging_product: "whatsapp",
      address,
      description,
      vertical,
      about,
      email,
      websites,
      profile_picture_handle: profilePictureHandle
    };

    // Set up headers for the request
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };

    // Perform the fetch request
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(body)
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
    console.error('Error updating business profile:', error);
    return { error: 'An error occurred while updating the business profile.' };
  }
};

/**
 * Tool configuration for updating the business profile on WhatsApp Cloud API.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'update_business_profile',
      description: 'Update the business profile on WhatsApp Cloud API.',
      parameters: {
        type: 'object',
        properties: {
          phoneNumberId: {
            type: 'string',
            description: 'The phone number ID associated with the business.'
          },
          address: {
            type: 'string',
            description: 'The address of the business.'
          },
          description: {
            type: 'string',
            description: 'The description of the business.'
          },
          vertical: {
            type: 'string',
            description: 'The industry type of the business.'
          },
          about: {
            type: 'string',
            description: 'The text to display in the business profile\'s About section.'
          },
          email: {
            type: 'string',
            description: 'The contact email address of the business.'
          },
          websites: {
            type: 'array',
            items: {
              type: 'string'
            },
            description: 'The URLs associated with the business.'
          },
          profilePictureHandle: {
            type: 'string',
            description: 'The handle of the profile picture.'
          }
        },
        required: ['phoneNumberId']
      }
    }
  }
};

export { apiTool };
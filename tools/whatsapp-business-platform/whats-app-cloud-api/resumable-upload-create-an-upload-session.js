/**
 * Function to create an upload session for profile pictures on WhatsApp Cloud API.
 *
 * @param {Object} args - Arguments for creating the upload session.
 * @param {number} args.file_length - The size of the file in bytes.
 * @param {string} [args.file_type="image/jpeg"] - The MIME type of the file.
 * @param {string} [args.file_name="myprofile.jpg"] - The name of the file.
 * @returns {Promise<Object>} - The response from the API containing the upload session ID.
 */
const createUploadSession = async ({ file_length, file_type = 'image/jpeg', file_name = 'myprofile.jpg' }) => {
  const baseUrl = 'https://graph.facebook.com';
  const version = ''; // will be provided by the user
  const token = process.env.WHATSAPP_BUSINESS_PLATFORM_API_KEY;

  try {
    // Construct the URL with query parameters
    const url = new URL(`${baseUrl}/${version}/app/uploads`);
    url.searchParams.append('file_length', file_length);
    url.searchParams.append('file_type', file_type);
    url.searchParams.append('file_name', file_name);

    // Set up headers for the request
    const headers = {
      'Authorization': `OAuth ${token}`,
      'Content-Type': 'application/json'
    };

    // Perform the fetch request
    const response = await fetch(url.toString(), {
      method: 'POST',
      headers
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
    console.error('Error creating upload session:', error);
    return { error: 'An error occurred while creating the upload session.' };
  }
};

/**
 * Tool configuration for creating an upload session on WhatsApp Cloud API.
 * @type {Object}
 */
const apiTool = {
  function: createUploadSession,
  definition: {
    type: 'function',
    function: {
      name: 'create_upload_session',
      description: 'Create an upload session for profile pictures on WhatsApp Cloud API.',
      parameters: {
        type: 'object',
        properties: {
          file_length: {
            type: 'integer',
            description: 'The size of the file in bytes.'
          },
          file_type: {
            type: 'string',
            description: 'The MIME type of the file.'
          },
          file_name: {
            type: 'string',
            description: 'The name of the file.'
          }
        },
        required: ['file_length']
      }
    }
  }
};

export { apiTool };
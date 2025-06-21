/**
 * Function to upload audio to WhatsApp Cloud API.
 *
 * @param {Object} args - Arguments for the audio upload.
 * @param {string} args.filePath - The local path to the audio file to upload.
 * @param {string} args.messaging_product - The messaging product, should be "whatsapp".
 * @returns {Promise<Object>} - The result of the audio upload.
 */
const executeFunction = async ({ filePath, messaging_product = 'whatsapp' }) => {
  const baseUrl = 'https://graph.facebook.com';
  const version = ''; // will be provided by the user
  const phoneNumberId = ''; // will be provided by the user
  const token = process.env.WHATSAPP_BUSINESS_PLATFORM_API_KEY;

  try {
    const url = `${baseUrl}/${version}/${phoneNumberId}/media`;

    // Prepare form data
    const formData = new FormData();
    formData.append('file', fs.createReadStream(filePath));
    formData.append('messaging_product', messaging_product);

    // Set up headers for the request
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'multipart/form-data'
    };

    // Perform the fetch request
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: formData
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
    console.error('Error uploading audio:', error);
    return { error: 'An error occurred while uploading audio.' };
  }
};

/**
 * Tool configuration for uploading audio to WhatsApp Cloud API.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'upload_audio',
      description: 'Upload audio to WhatsApp Cloud API.',
      parameters: {
        type: 'object',
        properties: {
          filePath: {
            type: 'string',
            description: 'The local path to the audio file to upload.'
          },
          messaging_product: {
            type: 'string',
            description: 'The messaging product, should be "whatsapp".'
          }
        },
        required: ['filePath']
      }
    }
  }
};

export { apiTool };
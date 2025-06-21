/**
 * Function to upload an image to WhatsApp Cloud API.
 *
 * @param {Object} args - Arguments for the image upload.
 * @param {string} args.messaging_product - The messaging product, should be "whatsapp".
 * @param {string} args.filePath - The path to the image file to be uploaded.
 * @returns {Promise<Object>} - The result of the image upload.
 */
const executeFunction = async ({ messaging_product, filePath }) => {
  const baseUrl = 'https://graph.facebook.com';
  const version = ''; // will be provided by the user
  const phoneNumberId = ''; // will be provided by the user
  const token = process.env.WHATSAPP_BUSINESS_PLATFORM_API_KEY;

  try {
    const url = `${baseUrl}/${version}/${phoneNumberId}/media`;

    // Create a FormData object for the file upload
    const formData = new FormData();
    formData.append('messaging_product', messaging_product);
    formData.append('file', fs.createReadStream(filePath));

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
    console.error('Error uploading image:', error);
    return { error: 'An error occurred while uploading the image.' };
  }
};

/**
 * Tool configuration for uploading an image to WhatsApp Cloud API.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'upload_image',
      description: 'Upload an image to WhatsApp Cloud API.',
      parameters: {
        type: 'object',
        properties: {
          messaging_product: {
            type: 'string',
            description: 'The messaging product, should be "whatsapp".'
          },
          filePath: {
            type: 'string',
            description: 'The path to the image file to be uploaded.'
          }
        },
        required: ['messaging_product', 'filePath']
      }
    }
  }
};

export { apiTool };
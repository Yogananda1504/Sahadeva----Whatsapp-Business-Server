/**
 * Function to upload a sticker to WhatsApp Cloud API.
 *
 * @param {Object} args - Arguments for the upload.
 * @param {string} args.messaging_product - The messaging product, should be "whatsapp".
 * @param {string} args.file - The file path of the sticker to be uploaded.
 * @returns {Promise<Object>} - The result of the upload operation.
 */
const executeFunction = async ({ messaging_product, file }) => {
  const version = ''; // will be provided by the user
  const phoneNumberId = ''; // will be provided by the user
  const token = process.env.WHATSAPP_BUSINESS_PLATFORM_API_KEY;
  
  const url = `https://graph.facebook.com/${version}/${phoneNumberId}/media`;
  
  const formData = new FormData();
  formData.append('messaging_product', messaging_product);
  formData.append('file', fs.createReadStream(file));

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: formData
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error uploading sticker:', error);
    return { error: 'An error occurred while uploading the sticker.' };
  }
};

/**
 * Tool configuration for uploading a sticker to WhatsApp Cloud API.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'upload_sticker',
      description: 'Upload a sticker to WhatsApp Cloud API.',
      parameters: {
        type: 'object',
        properties: {
          messaging_product: {
            type: 'string',
            description: 'The messaging product, should be "whatsapp".'
          },
          file: {
            type: 'string',
            description: 'The file path of the sticker to be uploaded.'
          }
        },
        required: ['messaging_product', 'file']
      }
    }
  }
};

export { apiTool };
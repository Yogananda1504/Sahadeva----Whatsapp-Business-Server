/**
 * Function to upload a file to the WhatsApp Cloud API.
 *
 * @param {Object} args - Arguments for the file upload.
 * @param {string} args.uploadId - The ID received from the upload session.
 * @param {string} args.version - The API version to use.
 * @param {Buffer} args.fileData - The binary data of the file to upload.
 * @returns {Promise<Object>} - The result of the file upload.
 */
const executeFunction = async ({ uploadId, version, fileData }) => {
  const baseUrl = 'https://graph.facebook.com';
  const token = process.env.WHATSAPP_BUSINESS_PLATFORM_API_KEY;
  const url = `${baseUrl}/${version}/${uploadId}`;
  
  try {
    // Set up headers for the request
    const headers = {
      'Content-Type': 'image/jpeg',
      'file_offset': '0',
      'Authorization': `OAuth ${token}`
    };

    // Perform the fetch request
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: fileData
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
    console.error('Error uploading file:', error);
    return { error: 'An error occurred while uploading the file.' };
  }
};

/**
 * Tool configuration for uploading files to the WhatsApp Cloud API.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'upload_file',
      description: 'Upload a file to the WhatsApp Cloud API.',
      parameters: {
        type: 'object',
        properties: {
          uploadId: {
            type: 'string',
            description: 'The ID received from the upload session.'
          },
          version: {
            type: 'string',
            description: 'The API version to use.'
          },
          fileData: {
            type: 'string',
            description: 'The binary data of the file to upload.'
          }
        },
        required: ['uploadId', 'version', 'fileData']
      }
    }
  }
};

export { apiTool };
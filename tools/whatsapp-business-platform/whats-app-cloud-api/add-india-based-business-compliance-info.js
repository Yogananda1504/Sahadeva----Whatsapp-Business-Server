/**
 * Function to add India-based business compliance information to WhatsApp.
 *
 * @param {Object} args - Arguments for the compliance information.
 * @param {string} args.entity_name - The name of the entity.
 * @param {string} args.entity_type - The type of the entity.
 * @param {boolean} args.is_registered - Indicates if the entity is registered.
 * @param {Object} args.grievance_officer_details - Details of the grievance officer.
 * @param {string} args.grievance_officer_details.name - Name of the grievance officer.
 * @param {string} args.grievance_officer_details.email - Email of the grievance officer.
 * @param {string} args.grievance_officer_details.landline_number - Landline number of the grievance officer.
 * @param {string} args.grievance_officer_details.mobile_number - Mobile number of the grievance officer.
 * @param {Object} args.customer_care_details - Details of customer care.
 * @param {string} args.customer_care_details.email - Email of customer care.
 * @param {string} args.customer_care_details.landline_number - Landline number of customer care.
 * @param {string} args.customer_care_details.mobile_number - Mobile number of customer care.
 * @returns {Promise<Object>} - The result of the compliance information addition.
 */
const executeFunction = async ({ entity_name, entity_type, is_registered, grievance_officer_details, customer_care_details }) => {
  const token = process.env.WHATSAPP_BUSINESS_PLATFORM_API_KEY;
  const version = ''; // will be provided by the user
  const phoneNumberId = ''; // will be provided by the user
  const url = `https://graph.facebook.com/${version}/${phoneNumberId}/business_compliance_info`;

  const data = {
    messaging_product: "whatsapp",
    entity_name,
    entity_type,
    is_registered,
    grievance_officer_details,
    customer_care_details
  };

  try {
    // Set up headers for the request
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };

    // Perform the fetch request
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(data)
    });

    // Check if the response was successful
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData);
    }

    // Parse and return the response data
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error('Error adding business compliance info:', error);
    return { error: 'An error occurred while adding business compliance info.' };
  }
};

/**
 * Tool configuration for adding business compliance information to WhatsApp.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'add_business_compliance_info',
      description: 'Add India-based business compliance information to WhatsApp.',
      parameters: {
        type: 'object',
        properties: {
          entity_name: {
            type: 'string',
            description: 'The name of the entity.'
          },
          entity_type: {
            type: 'string',
            description: 'The type of the entity.'
          },
          is_registered: {
            type: 'boolean',
            description: 'Indicates if the entity is registered.'
          },
          grievance_officer_details: {
            type: 'object',
            properties: {
              name: {
                type: 'string',
                description: 'Name of the grievance officer.'
              },
              email: {
                type: 'string',
                description: 'Email of the grievance officer.'
              },
              landline_number: {
                type: 'string',
                description: 'Landline number of the grievance officer.'
              },
              mobile_number: {
                type: 'string',
                description: 'Mobile number of the grievance officer.'
              }
            },
            required: ['name', 'email', 'landline_number', 'mobile_number']
          },
          customer_care_details: {
            type: 'object',
            properties: {
              email: {
                type: 'string',
                description: 'Email of customer care.'
              },
              landline_number: {
                type: 'string',
                description: 'Landline number of customer care.'
              },
              mobile_number: {
                type: 'string',
                description: 'Mobile number of customer care.'
              }
            },
            required: ['email', 'landline_number', 'mobile_number']
          }
        },
        required: ['entity_name', 'entity_type', 'is_registered', 'grievance_officer_details', 'customer_care_details']
      }
    }
  }
};

export { apiTool };
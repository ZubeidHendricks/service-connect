export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const response = await fetch('https://emailoctopus.com/api/1.6/lists/cdef3810d1/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        api_key: 'eo_cdef3810d13e21b94561c0874bf0920dc0557d021a0aaff4701b0a48c7f9cd6f',
        email_address: req.body.email,
        fields: {
          Category: req.body.category,
          SubCategory: req.body.subCategory,
          Address: req.body.address,
          Budget: req.body.budget,
          TimePeriod: req.body.timePeriod,
          Details: req.body.details,
          Phone: req.body.phone
        }
      })
    });

    if (!response.ok) {
      throw new Error('Failed to submit to EmailOctopus');
    }

    res.status(200).json({ message: 'Successfully submitted' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Error submitting form' });
  }
}
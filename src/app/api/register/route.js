const GOOGLE_FORM_ACTION =
  'https://docs.google.com/forms/d/e/1FAIpQLSeIDIvHm6LIU_19tYpmOqtAk034QK6u0LHdFyqn8dqssEz4yw/formResponse';

const FIELD_IDS = {
  email: 'entry.371099452',
  firstName: 'entry.937928410',
  lastName: 'entry.1326941354',
  country: 'entry.2089979659',
  city: 'entry.440325706',
  regionalHub: 'entry.1965342502',
  roleDescription: 'entry.256287034',
  affiliation: 'entry.1067502460',
  newsletter: 'entry.11884566',
};

const HUB_MAPPING = {
  'Australia, New Zealand & South Pacific': 'Australia, New Zealand & South Pacific',
  'Japan, Korea, Taiwan & Northeast Asia (Kyoto)': 'Japan, Korea, Taiwan & Northeast Asia',
  'Japan, Korea, Taiwan & Northeast Asia': 'Japan, Korea, Taiwan & Northeast Asia',
  'Southeast Asia (Youth Hub / Singapore)': 'Southeast Asia',
  'Southeast Asia': 'Southeast Asia',
  'South Asia': 'South Asia',
  'Middle East, Caucasus & Central Asia': 'Middle East, Caucasus & Central Asia',
  'East Africa, Southern Africa & Central Europe': 'East Africa, Southern Africa & Central Europe',
  'UK, Ireland, Iberia & West Africa': 'UK, Ireland, Iberia & West Africa',
  'Eastern & Southern South America & Caribbean': 'Eastern & Southern South America & Caribbean',
  'Eastern United States and Southern United States': 'Eastern United States and Southern United States',
  'Eastern North America & Northern South America': 'Eastern United States and Southern United States',
  'Midwestern United States & Mexico': 'Midwestern United States & Mexico',
  'Central North America & Mexico': 'Midwestern United States & Mexico',
  'Western North America': 'Western North America',
  'Hawaii, Alaska & Pacific Islands': 'Hawaii, Alaska & Pacific Islands',
};

export async function POST(request) {
  try {
    const body = await request.json();
    const {
      email,
      firstName,
      lastName,
      country,
      city,
      regionalHubs = [],
      roles = [],
      affiliation,
      newsletter = 'Yes',
    } = body;

    if (!email || !firstName || !lastName || !country || !city || !affiliation) {
      return Response.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const formParams = new URLSearchParams();

    // Standard text fields
    formParams.append('emailAddress', email.trim());
    formParams.append(FIELD_IDS.email, email.trim());
    formParams.append(FIELD_IDS.firstName, firstName.trim());
    formParams.append(FIELD_IDS.lastName, lastName.trim());
    formParams.append(FIELD_IDS.country, country.trim());
    formParams.append(FIELD_IDS.city, city.trim());
    formParams.append(FIELD_IDS.affiliation, affiliation.trim());
    formParams.append(FIELD_IDS.newsletter, newsletter === 'No' ? 'No' : 'Yes');

    // Multi-select Checkboxes: Regional Hubs
    const hubsArray = Array.isArray(regionalHubs)
      ? regionalHubs
      : typeof regionalHubs === 'string'
      ? regionalHubs.split(',').map((s) => s.trim())
      : [];

    const mappedHubs = hubsArray
      .map((h) => HUB_MAPPING[h] || h)
      .filter(Boolean);

    if (mappedHubs.length === 0) {
      // Default to Northeast Asia if none selected
      formParams.append(FIELD_IDS.regionalHub, 'Japan, Korea, Taiwan & Northeast Asia');
    } else {
      mappedHubs.forEach((hub) => {
        formParams.append(FIELD_IDS.regionalHub, hub);
      });
    }

    // Multi-select Checkboxes: Roles
    const rolesArray = Array.isArray(roles)
      ? roles
      : typeof roles === 'string'
      ? roles.split(',').map((s) => s.trim())
      : [];

    if (rolesArray.length === 0) {
      formParams.append(FIELD_IDS.roleDescription, 'Working professional');
    } else {
      rolesArray.forEach((role) => {
        if (role === 'Other' || role.startsWith('Other:')) {
          formParams.append(FIELD_IDS.roleDescription, '__other_option__');
          const customText = role.startsWith('Other:') ? role.replace('Other:', '').trim() : 'Other';
          formParams.append(`${FIELD_IDS.roleDescription}.other_option_response`, customText);
        } else {
          formParams.append(FIELD_IDS.roleDescription, role);
        }
      });
    }

    formParams.append('fvv', '1');
    formParams.append('pageHistory', '0');

    // Submit directly to Google Forms backend
    const gResponse = await fetch(GOOGLE_FORM_ACTION, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      },
      body: formParams.toString(),
    });

    if (gResponse.ok || gResponse.status === 200 || gResponse.status === 302) {
      return Response.json({ success: true });
    }

    const responseText = await gResponse.text();
    console.error('Google Form submission failed with status:', gResponse.status, responseText.slice(0, 300));

    return Response.json(
      { error: 'Failed to record response in Google Form', status: gResponse.status },
      { status: 500 }
    );
  } catch (error) {
    console.error('Server error during registration submission:', error);
    return Response.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

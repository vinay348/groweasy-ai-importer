export const buildPrompt = (records) => `
You are an expert CRM data extraction AI.

Convert the following CSV records into this exact JSON schema.

Schema:

[
  {
    "created_at": "",
    "name": "",
    "email": "",
    "country_code": "",
    "mobile_without_country_code": "",
    "company": "",
    "city": "",
    "state": "",
    "country": "",
    "lead_owner": "",
    "crm_status": "",
    "crm_note": "",
    "data_source": "",
    "possession_time": "",
    "description": ""
  }
]

Rules

1. Use ONLY these CRM status values:

- GOOD_LEAD_FOLLOW_UP
- DID_NOT_CONNECT
- BAD_LEAD
- SALE_DONE

Determine crm_status from remarks, comments, notes, follow-up text, or similar fields.

2. Use ONLY these data_source values:

- leads_on_demand
- meridian_tower
- eden_park
- varah_swamy
- sarjapur_plots

If none match confidently, return an empty string.

3. Email Rules

- Use the first email as email.
- If additional emails exist, append them to crm_note.

4. Phone Rules

- If a phone contains a country code (for example +91, +1, +44), extract it into country_code.
- Store only the remaining digits in mobile_without_country_code.
- If multiple phone numbers exist, use the first one and append the remaining numbers to crm_note.
- Never modify phone numbers.

5. CRM Notes

Store the ORIGINAL remarks/comments/follow-up text inside crm_note.

Examples:
Interested
Call next week
Requested demo
No response
Busy
Requested pricing

Do NOT lose the original remark.

6. Description

If there is an "Extra Info", "Description", "Additional Details", or similar column containing useful information that does not fit another field, store it in description.

Otherwise return an empty string.

7. created_at

If a date exists, preserve it in a JavaScript-compatible date format.

If no date exists, return an empty string.

8. Skip any record that has neither an email nor a phone number.

9. Never hallucinate.

- Never invent values.
- Never invent companies.
- Never invent cities.
- Never invent countries.
- Never invent dates.
- Never invent lead owners.
- If a value is missing, return an empty string.

10. Preserve all original data.

- Never modify email addresses.
- Never modify phone numbers.
- Preserve original remarks in crm_note.
- Preserve additional information in description.

11. Return ONLY valid JSON.

No markdown.

No explanation.

No code block.

Return only the JSON array.

Records:

${JSON.stringify(records)}
`;
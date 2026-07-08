export const buildPrompt = (records) => `
You are an expert CRM data extraction AI.

Convert the following CSV records into this exact JSON schema.

Schema:

[
{
created_at:"",
name:"",
email:"",
country_code:"",
mobile_without_country_code:"",
company:"",
city:"",
state:"",
country:"",
lead_owner:"",
crm_status:"",
crm_note:"",
data_source:"",
possession_time:"",
description:""
}
]

Rules

1.
Use ONLY these statuses

GOOD_LEAD_FOLLOW_UP

DID_NOT_CONNECT

BAD_LEAD

SALE_DONE

2.

Use ONLY these data sources

leads_on_demand

meridian_tower

eden_park

varah_swamy

sarjapur_plots

Otherwise keep blank.

3.

If multiple emails exist

Use first

Append remaining into crm_note.

4.

If multiple phones exist

Use first

Append remaining into crm_note.

5.

Skip records without email AND phone.

6.

Return ONLY valid JSON.

Records

7.

Never hallucinate.

Never invent values.

If unsure leave empty string.

Never change phone numbers.

Never change emails.

Return valid JSON only.

Preserve original data.

${JSON.stringify(records)}
`;
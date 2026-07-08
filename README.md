# AI CSV Importer

An AI-powered CSV Importer built as part of the **GrowEasy Software Developer Assignment**.

The application intelligently extracts CRM lead information from CSV files with different column names, layouts, and formats using Google's Gemini AI.

---

## Features

* Upload any valid CSV file
* CSV Preview before processing
* Responsive UI built with Next.js
* Intelligent AI-based field mapping
* CRM data extraction using Gemini AI
* Confirmation step before AI processing
* Display parsed CRM records
* Import summary

  * Total Records
  * Processed Records
  * Imported Records
  * Skipped Records
* Error handling
* Drag & Drop CSV Upload

---

## Tech Stack

### Frontend

* Next.js
* React
* Tailwind CSS
* PapaParse

### Backend

* Node.js
* Express.js
* Multer
* csv-parser
* dotenv

### AI

* Google Gemini 2.5 Flash
* @google/generative-ai

---

## Project Structure

```
AI-CSV-Importer
│
├── frontend
│   ├── app
│   ├── components
│   ├── public
│   └── package.json
│
├── backend
│   ├── controllers
│   ├── routes
│   ├── services
│   ├── uploads
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

## Installation

### Clone Repository

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
```

```
cd AI-CSV-Importer
```

---

## Backend Setup

```
cd backend
```

Install dependencies

```bash
npm install
```

Create a `.env` file

```
GEMINI_API_KEY=YOUR_GEMINI_API_KEY
PORT=5000
```

Run the backend

```bash
npm start
```

or

```bash
node server.js
```

Backend runs at

```
http://localhost:5000
```

---

## Frontend Setup

Open another terminal

```
cd frontend
```

Install dependencies

```bash
npm install
```

Run the application

```bash
npm run dev
```

Frontend runs at

```
http://localhost:3000
```

---

## API

### Upload CSV

**POST**

```
/upload
```

Request

```
multipart/form-data
```

Field

```
file
```

Example using Postman

* Method: POST
* URL: http://localhost:5000/upload
* Body → form-data
* Key = file
* Type = File
* Select CSV

---

## Application Workflow

### Step 1

Upload a CSV file.

Example:

```
Customer Name,Contact Mail,Phone Number,Remarks
John,john@gmail.com,9999999999,Interested
Sarah,sarah@gmail.com,8888888888,Call next week
```

---

### Step 2

Preview the uploaded CSV before processing.

---

### Step 3

Click **Confirm Import**.

The frontend sends the CSV to the backend.

---

### Step 4

Backend

* Parses the CSV
* Sends records to Gemini AI
* AI intelligently maps fields
* Returns structured CRM JSON

---

### Step 5

Frontend displays

* Parsed CRM records
* Total imported
* Total skipped
* Processing summary

---

## AI Field Mapping

The AI can intelligently recognize different column names.

Example

| CSV Column    | CRM Field                   |
| ------------- | --------------------------- |
| Customer Name | name                        |
| Full Name     | name                        |
| Lead Name     | name                        |
| Contact Mail  | email                       |
| Email Address | email                       |
| Mobile        | mobile_without_country_code |
| Phone         | mobile_without_country_code |
| Remarks       | crm_note                    |
| Notes         | crm_note                    |

---

## Supported CRM Fields

* created_at
* name
* email
* country_code
* mobile_without_country_code
* company
* city
* state
* country
* lead_owner
* crm_status
* crm_note
* data_source
* possession_time
* description

---

## CRM Status Mapping

The AI only returns one of the following values:

* GOOD_LEAD_FOLLOW_UP
* DID_NOT_CONNECT
* BAD_LEAD
* SALE_DONE

---

## Example Output

```json
[
  {
    "name": "John",
    "email": "john@gmail.com",
    "mobile_without_country_code": "9999999999",
    "crm_status": "GOOD_LEAD_FOLLOW_UP",
    "crm_note": "Interested"
  },
  {
    "name": "Sarah",
    "email": "sarah@gmail.com",
    "mobile_without_country_code": "8888888888",
    "crm_status": "GOOD_LEAD_FOLLOW_UP",
    "crm_note": "Call next week"
  }
]
```

---

## Error Handling

The application handles

* Invalid CSV files
* Empty CSV files
* Missing API key
* AI response errors
* Invalid JSON responses
* Network failures

---

## Assumptions

* Only valid CSV files are accepted.
* AI extracts as many CRM fields as possible from the available data.
* Fields not present in the CSV are returned as empty values.
* Records without both an email and a phone number can be skipped based on business rules.

---

## Future Improvements

* Batch processing for very large CSV files
* Streaming AI processing
* Progress indicator
* Retry mechanism for failed AI requests
* Dark mode
* Unit tests
* Docker support
* Database integration
* Authentication
* Export processed CRM records

---

## Screenshots

Add screenshots of:

* Upload Page
* CSV Preview
* Parsed CRM Result
* Import Summary

---

## Deployment

Frontend

```
<YOUR_FRONTEND_URL>
```

Backend

```
<YOUR_BACKEND_URL>
```

---

## Author

**Vinay Kumar**

Software Developer

---

## Assignment

Submitted for the **GrowEasy Software Developer Assignment**.

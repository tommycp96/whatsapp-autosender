# WhatsApp Auto-Sender

This Node.js application automates the process of sending WhatsApp messages using the WhatsApp Business API. It sends templated messages to a list of recipients based on their status.

## Setup

### Requirements

- Node.js
- A WhatsApp Business API client
- An `.env` file with the following variables set:
  - `WHATSAPP_BASE_URL`: The base URL for the WhatsApp API.
  - `ACCESS_TOKEN`: Your WhatsApp API access token.
  - `TEMPLATE_NAME`: Your WhatsApp message template name

### Installation

1. Clone the repository:
```bash
git clone git@github.com:tommycp96/whatsapp-autosender.git
```
2. Navigate to the project directory:
```bash
cd whatsapp-autosender
```
3. Install dependencies:
```bash
npm install
```

### Usage

1. Add your recipient data to `test-data.json` in the following format:
```json
[
  {
    "phoneNumber": "123456789",
    "invitationName": "John Doe",
    "status": "pending"
  }
  // ... more entries
]
```
2. Run the script:
```bash
node index.js
```
3. The script will send messages to all recipients with a status of "pending" and update their status to "sent" upon successful delivery.

### Notes
- The script introduces a delay between message sends to comply with rate limiting and ensure reliability.
- Ensure compliance with WhatsApp's policies and terms of use when sending messages.

### Contributing

Contributions, issues, and feature requests are welcome. If you have suggestions, feedback, or ideas, please follow these guidelines when contributing:

1. **Feedback**: Provide clear and constructive feedback about the tools or any potential improvements.

2. **Suggestions**: If you have suggestions for new features or enhancements, please describe them in detail.

3. **Bug Reports**: If you encounter any issues or bugs while using the tools, please report them with steps to reproduce and any relevant screenshots.

4. **Documentation**: If you notice any gaps or inaccuracies in this documentation, feel free to suggest improvements.

5. **Security**: When reporting security vulnerabilities, please follow responsible disclosure practices.

6. **Branching model and merging flow**:
   - Create a new branch that branch-off `main`
   - make a PR against `main`

## License

This project is licensed under the [MIT License](https://github.com/tommycp96/whatsapp-autosender/blob/main/LICENSE).

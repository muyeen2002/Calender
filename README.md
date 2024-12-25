# Calendar Application for Communication Tracking

## Overview
This React-based Calendar Application is designed to help organizations efficiently track communication with companies, ensuring timely and consistent follow-ups. The tool provides a centralized platform to log past interactions, plan future communications, and manage the frequency of engagement based on predefined schedules.

### Live Application
Access the live version of the application [here](https://rainbow-llama-9eea9f.netlify.app).

## Features

### Admin Module
- **Company Management**
  - Add, edit, and delete company details, including:
    - Name
    - Location
    - LinkedIn Profile
    - Emails
    - Phone Numbers
    - Comments
    - Communication Periodicity
- **Communication Method Management**
  - Define communication methods, including:
    - Name
    - Description
    - Sequence
    - Mandatory flag

### User Module
- **Dashboard**
  - Grid view with:
    - Company Name
    - Last five communications
    - Next scheduled communication
    - Color-coded highlights for overdue and due communications
- **Interactive Features**
  - Hover effect for communication details
  - Multi-select communication actions
- **Notifications**
  - Overdue and due communication grids
  - Notification badge with counts
- **Calendar View**
  - View past and upcoming communications

### Reporting and Analytics Module (Optional)
- Communication frequency reports
- Engagement effectiveness dashboard
- Overdue communication trends
- Downloadable reports (PDF/CSV)
- Real-time activity logs

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/calendar-communication-app.git
   cd calendar-communication-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Access the application at `http://localhost:3000`.

## Deployment

The application can be deployed on platforms like Vercel, Netlify, or GitHub Pages. For example, to deploy on Vercel:

1. Install the Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Deploy the project:
   ```bash
   vercel
   ```

3. Follow the on-screen instructions to complete the deployment.

## Sample Data
Include sample data in `src/data/sampleData.js` for demonstration purposes. Example:

```javascript
export const companies = [
  {
    id: 1,
    name: "Company A",
    location: "New York",
    linkedIn: "https://linkedin.com/company-a",
    emails: ["contact@companya.com"],
    phoneNumbers: ["123-456-7890"],
    comments: "Important client",
    periodicity: "2 weeks",
  },
  // More sample companies...
];
```

## Usage

1. Log in as an Admin to manage companies and communication methods.
2. Use the User Dashboard to view and manage communications.
3. Access the Calendar view to track past and upcoming interactions.
4. (Optional) Use the Reporting module for insights and analytics.

## Libraries and Frameworks

- **React**: Core framework for building the application.
- **React Router**: For navigation.
- **Redux** (optional): For state management.
- **Tailwind CSS**: For styling.
- **FullCalendar**: For calendar view.
- **Chart.js**: For analytics and reports.

## Testing

1. Run unit tests:
   ```bash
   npm test
   ```

2. Perform end-to-end testing using tools like Cypress.

## Known Limitations

- Reporting module is optional and may require additional setup.
- Calendar view may not support advanced features like drag-and-drop without further development.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request with your changes.

## License

This project is licensed under the MIT License. See `LICENSE` for more details.

## Contact

For any questions or clarifications, please contact us at hr@entnt.in.
## Photos
![Screenshot (213)](https://github.com/user-attachments/assets/2b70dedb-ce2b-4247-b710-abe10c5bdc34)
https://github.com/user-attachments/assets/4a2dc42f-0de3-4060-bd95-5e0c31db414e

## Credentials for Testing

- **Admin Login**
  - Username: `admin`
  - Password: `admin123`

- **User Login**
  - Username: `user`
  - Password: `user123`

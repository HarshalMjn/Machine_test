# MERN Employee Management System

This project is a MERN (MongoDB, Express.js, React.js, Node.js) based Employee Management System. It allows users to perform CRUD operations on employee records. This project is created as part of a machine test for the MERN Developer position at DealsDray Online Pvt. Ltd.

## Description

The application provides the following functionalities:

- Add a new employee
- Edit employee details
- Delete an employee
- Search for employees by name or email
- View a list of all employees

## Installation

To run this project locally, follow these steps:

1. **Clone the repository:**

    ```bash
    git clone https://github.com/HarshalMjn/Machine_test
    cd Machine_test
    ```

2. **Install server dependencies:**

    ```bash
    npm install
    ```

3. **Install client dependencies:**

    ```bash
    cd ../client
    npm install
    ```

4. **Set up environment variables:**

    Create a `.env` file in the `server` directory and add the following:

    ```plaintext
    MONGODB_URI=your_mongodb_connection_string
    PORT=4000
    JWT_SECRET=your_jwt_secret
    ```

5. **Start the development server:**

    In the `root` directory for server:

    ```bash
    npm start
    ```

    In the `client` directory:

    ```bash
    npm start
    ```

## Usage

- **Dashboard:** View a list of all employees and search for employees.
- **Add Employee:** Fill in the form to add a new employee.
- **Edit Employee:** Update the details of an existing employee.
- **Delete Employee:** Remove an employee from the list.

### Screenshots

Include screenshots of your application here.

## Features

- CRUD operations on employee records
- Real-time search functionality
- Responsive design with Tailwind CSS

## Security

### Securing JWT Secrets

To ensure the security of your application, follow these best practices:

1. **Store JWT secrets and other sensitive information in environment variables.** Never hardcode them in your source code.

    Example `.env` file:
    ```plaintext
    JWT_SECRET=your_jwt_secret
    ```

2. **Do not commit the `.env` file to your version control system.** Use a `.gitignore` file to exclude it.

    Example `.gitignore` entry:
    ```plaintext
    .env
    ```

3. **Rotate secrets periodically** and update your environment variables accordingly.

4. **Use HTTPS** to encrypt data in transit between the client and server.

## Contributing

If you wish to contribute to this project, please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a pull request

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgments

- This project is a part of the machine test for the MERN Developer position at DealsDray Online Pvt. Ltd.
- Special thanks to the team at DealsDray for providing this opportunity.

### Video Demonstration


https://github.com/user-attachments/assets/880214a8-819a-44dc-b67c-3619f8f0778e





### GitHub Repository

[GitHub Repository](https://github.com/HarshalMjn/Machine_test)

### Contact Information

For any queries regarding the project, you can reach out to me at [mahajanh006@gmail.com].

# HRM-system
Application for application for distributing personnel to projects
The repository is a comprehensive Human Resource Management (HRM) application designed to streamline personnel distribution across projects within an organization. Built using Spring Boot for the backend and React with TypeScript for the frontend, this full-stack application offers a robust solution for managing employee data, assignments, and career progression.

---

### 🔧 Key Features

* **User Authentication & Authorization**: Secure login system with role-based access control, ensuring that users can only access data pertinent to their roles.

* **Personal Account Management**: Users can set up and manage their personal accounts, view their career progression, and track contract durations and approval stages.

* **Project Assignment**: Efficiently distribute personnel to various projects, monitor their assignments, and manage project timelines.

* **User & Staff Editors**: Administrative tools to edit user profiles and manage staff assignments, providing flexibility in personnel management.

* **Career Tracking**: A dedicated "Career" tab allows users to view positions in projects, contract durations, and approval stages, facilitating transparent career development.

---

### 🛠️ Technologies Used

* **Frontend**: React with TypeScript

* **Backend**: Spring Boot

* **Database**: MySQL (with the provided `employee_management.sql` file for schema setup)

* **Authentication**: Spring Security for secure login and role-based access control

---

### 🚀 Getting Started

To run this application locally:

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/KateHalitsa/HRM-system-spring-react.git
   ```

2. **Set Up the Backend**:

   * Navigate to the `SpringCurseWork` directory.

   * Import the project into your IDE (e.g., IntelliJ IDEA, Eclipse).

   * Configure your database connection settings in the `application.properties` file.

   * Run the Spring Boot application.

3. **Set Up the Frontend**:

   * Navigate to the `reactfrontendtypescript` directory.

   * Install the necessary dependencies:

     ```bash
     npm install
     ```

   * Run the React development server:

     ```bash
     npm start
     ```

   * Access the application at `http://localhost:3000`.

---

### 📄 Database Setup

The repository includes the `employee_management.sql` file containing the database schema and sample data. This can be imported into your MySQL database to set up the necessary tables and initial data for the application.

---

## Interface

This project serves as an excellent example of integrating Spring Boot and React to create a full-stack HRM application, providing organizations with the tools to manage their human resources efficiently.

[1]: https://alex-xjk.github.io/project/hrmanserv/?utm_source=chatgpt.com "alex-xjk.github.io/proje..."
[2]: https://www.sourcecodeexamples.net/2021/12/spring-boot-reactjs-redux-crud-app.html?utm_source=chatgpt.com "Source Code Examples"
[3]: https://hoangsonww.github.io/Employee-Management-Fullstack-App/?utm_source=chatgpt.com "Employee Management Full-Stack Application | Employee-Management-Fullstack-App"
[4]: https://www.scribd.com/document/736317908/FinalProjectReport-Sakshi-Sharma?utm_source=chatgpt.com "FinalProjectReport (Sakshi Sharma) | PDF | Human Resource Management | Analytics"
[5]: https://github.com/gunesserkan/SpringReactEmployeeApp?utm_source=chatgpt.com "GitHub - gunesserkan/SpringReactEmployeeApp: A personnel management system developed using Spring Boot and React."

### Home page
![HomePage](docs/Main_window.png)
### Authorization
![Authorization](docs/authorization.png)
### Personal account
1. Any authorized user has access to their personal account, where they can set up an account
![SettingUpAPersonalAccount](docs/Setting_up_a_personal_account.png)
2. In the "Career"("Карьера") tab you can see positions in projects and the duration of the contract and its approval stage
![Career](docs/career.png)
### List of users
![ListOfUsers](docs/List_of_users.png)
### User editor
![UserEditor](docs/User_editor.png)
### Staff editor
![StaffEditor](docs/Staff_editor.png)
### Editor of the profession
![EditorOfTheProfession](docs/Editor_of_the_profession.png)
### Position editor
![PositionEditor](docs/Position_editor.png)
### List of characteristics
![ListOfCharacteristics](docs/List_of_characteristics.png)
### Characteristic editor
![CharacteristicEditor](docs/Characteristic_editor.png)
### Project editor
![ProjectEditor](docs/Project_editor.png)
### Assignment editor
![AssignmentEditor](docs/Assignment_editor.png)
### Recruitment for the project
![RecruitmentForTheProject](docs/Recruitment_for_the_project.png)
### Calculation result
![Calculation Result](docs/Calculation_result.png)




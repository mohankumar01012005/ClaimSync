# About ClaimSync  

## Overview  
ClaimSync is a comprehensive web application designed to streamline the insurance claims process for both patients and insurers. The platform provides an intuitive and efficient way for patients to submit claims and track their statuses while enabling insurers to review, manage, and process claims seamlessly.  

## Access the Client : https://claim-sync-client.vercel.app
## Access the Backend :https://claim-sync-server.vercel.app


## 📸 Screenshots / Demo  
![image](https://github.com/user-attachments/assets/a0db9628-cb96-4bc9-b1db-7e67722018e9)
![image](https://github.com/user-attachments/assets/a6605545-4f7f-43e0-b4d7-6a5e6945599c)
![image](https://github.com/user-attachments/assets/1846528c-a82d-4484-bbf7-2d366cae05de)

## Key Features  

## Important Note :
  - There is only one Insurer in the Application if you want to login as a Insurer use the below credentials
  - email:insurer@gmail.com
  - password:123456

### 🏥 Patient Portal  
- **Submit a Claim**:  
  - Patients can submit insurance claims by providing necessary details such as name, email, claim amount, and a description.  
  - Secure document upload functionality for receipts, prescriptions, or other supporting documents.  

- **Track Claims**:  
  - A user-friendly dashboard to view submitted claims along with their status (Pending, Approved, Rejected).  
  - Displays submission dates and approved claim amounts when applicable.  

### 🏢 Insurer Dashboard  
- **Claims Management**:  
  - Insurers can view all submitted claims with filtering options based on status, date, and claim amount.  
  - A detailed review panel allows insurers to analyze claim details and attached documents before making a decision.  

- **Claim Approval & Rejection**:  
  - Insurers can approve or reject claims, specifying the approved amount and adding comments.  
  - Real-time status updates to keep both parties informed.  

### 🔒 Authentication & Security  
- Basic login system to differentiate between patients and insurers.  
- Secure API endpoints to handle claims processing.  

## 🛠️ Tech Stack  
- **Frontend**: React.js (MUI for UI Components)  
- **Backend**: Node.js with Express
- **Database**: MongoDB  


## 🚀 Deployment  
ClaimSync is hosted and accessible via:  
- **Frontend**: Vercel  
- **Backend**: Vercel  

## 📂 Project Structure  
- **Frontend**: React.js-based UI with MUI for styling.  
- **Backend**: NestJS API with MongoDB integration.  
- **Database**: Claims stored securely with essential fields (ID, Name, Email, Amount, Description, Status, Date, Comments).  

## 📜 How to Run Locally  

### Prerequisites  
- Node.js & npm/yarn  
- MongoDB instance  

### Steps  
1. **Clone the repository**  
   ```sh  
   git clone https://github.com/mohankumar01012005/ClaimSync
   cd ClaimSync  
   ```  

2. **Install Dependencies**  
   - **Backend**  
     ```sh  
     cd backend  
     npm install  
     ```  
   - **Frontend**  
     ```sh  
     cd frontend  
     npm install  
     ```  

3. **Setup Environment Variables**  
   - Backend: Create a `.env` file inside the `backend` folder with:  
     ```env  
     DATABASE_URL=mongodb+srv://your-db-uri  
     JWT_SECRET=your_secret_key  
     ```  

4. **Run the Application**  
   - **Backend**  
     ```sh  
     npm run dev  
     ```  
   - **Frontend**  
     ```sh  
     npm run dev  
     ```  




## 🤝 Contributing  
Feel free to raise issues or submit pull requests to enhance ClaimSync.  

## 📧 Contact  
For any queries or collaborations, reach out via mohankumar.work12@gmail.com  




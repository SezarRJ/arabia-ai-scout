# Software Requirements Specification (SRS) for SharkVest

**Version 1.0**

**Date: 2025-10-02**

---

## 1. Introduction

### 1.1 Purpose
This document provides a detailed description of the requirements for the SharkVest platform. Its purpose is to serve as a guide for developers, testers, and project managers, outlining the full scope of the application's functionality, features, and constraints.

### 1.2 Scope
SharkVest is a comprehensive web application designed to be a trust and intelligence infrastructure for the MENA startup ecosystem. It connects founders with investors through a secure, AI-driven platform. Key features include verified user identities, AI-powered project analysis, a trust scoring system, and intelligent deal matching.

### 1.3 Definitions, Acronyms, and Abbreviations
- **SRS**: Software Requirements Specification
- **MENA**: Middle East and North Africa
- **AI**: Artificial Intelligence
- **UI/UX**: User Interface / User Experience
- **KYC**: Know Your Customer
- **SWOR**: Strengths, Weaknesses, Opportunities, Risks (variant of SWOT)
- **E2E**: End-to-End Encryption

---

## 2. Overall Description

### 2.1 Product Perspective
SharkVest is a self-contained, cloud-native web application. It operates as a Software-as-a-Service (SaaS) platform, accessible via modern web browsers. It relies on Supabase for its backend services, including database, authentication, and storage.

### 2.2 User Classes and Characteristics
1.  **Founder**: Entrepreneurs seeking funding. They can create a project, upload documents, receive an AI-driven analysis of their venture, and get matched with potential investors.
2.  **Investor**: Individuals or firms looking to invest in startups. They can browse curated startup profiles, view AI analysis, and connect with founders.
3.  **Administrator**: Platform managers responsible for user management, content moderation, system configuration, and overseeing platform health.

### 2.3 Operating Environment
The application is a web-based platform and must be compatible with the latest versions of major web browsers (Chrome, Firefox, Safari, Edge). It is designed to be fully responsive, providing a seamless experience on desktops, tablets, and mobile devices.

---

## 3. System Features

### 3.1 User Authentication & Authorization
- **3.1.1 Registration**: Users can register as a 'Founder' or 'Investor', providing their name, email, password, country, and city.
- **3.1.2 Login**: Registered users can log in using their email and password.
- **3.1.3 Role-Based Access Control (RBAC)**: The system restricts access to features based on user roles (Founder, Investor, Admin).
- **3.1.4 Profile Management**: Users can view and edit their profile information, including name, location, and profile picture.

### 3.2 Trust & Verification (Trust Hub)
- **3.2.1 Trust Score**: A quantifiable score (0-100) for both founders and investors, calculated based on profile completeness, identity verification, and platform activity.
- **3.2.2 Verification Tasks**: Users are guided through a series of tasks to increase their Trust Score, such as email verification, phone verification, ID upload, and connecting social profiles.
- **3.2.3 Badge System**: Users earn badges ('Starter', 'Explorer', 'Investor-Ready') as their Trust Score increases.

### 3.3 Founder-Specific Features
- **3.3.1 Founder Dashboard**: A central hub displaying key metrics like Trust Score, AI Project Score, investor matches, and messages.
- **3.3.2 Project Onboarding**: A guided process for founders to submit their project concept and upload essential documents (Pitch Deck, Financials, etc.).
- **3.3.3 AI Project Score**: An AI-generated score (0-100) based on the uploaded project concept and documents. The score is derived from a 10-factor model (Team, Market, Product, etc.).
- **3.3.4 AI SWOR Analysis**: The AI provides a Strengths, Weaknesses, Opportunities, and Risks analysis based on project data.
- **3.3.5 AI Risk Assessment**: A detailed risk matrix identifying potential business risks.

### 3.4 Investor-Specific Features
- **3.4.1 Investor Dashboard**: A central hub showing portfolio overview, suggested startups, and deal flow pipeline.
- **3.4.2 Suggested Startups**: A list of AI-curated startups that match the investor's preferences.
- **3.4.3 Pipeline View**: A Kanban-style view to track investments through various stages (Sourcing, Screening, Due Diligence, etc.).
- **3.4.4 Data Room Access**: Investors can request access to a founder's secure data room after a connection is made.

### 3.5 Core Platform Features
- **3.5.1 Secure Messaging**: An E2E encrypted messaging system for founders and investors to communicate.
- **3.5.2 Intelligent Matching**: The platform's algorithm matches founders and investors based on industry, stage, funding goals, and location.
- **3.5.3 Notifications**: A system to alert users of new messages, match requests, and other important events.

### 3.6 Administrator Features
- **3.6.1 Admin Dashboard**: An overview of platform statistics, recent activities, and quick actions.
- **3.6.2 User Management**: Admins can view, edit, and manage all user accounts.
- **3.6.3 Content Control**: Tools for moderating platform content and reviewing flagged documents.
- **3.6.4 System Configuration**: Settings to manage application parameters, subscription plans, and integrations.

---

## 4. Non-Functional Requirements

### 4.1 Performance
- Page load times for primary dashboards should be under 3 seconds.
- The system should handle at least 1,000 concurrent users without significant degradation in performance.

### 4.2 Security
- All user data must be encrypted at rest and in transit.
- The application must be protected against common web vulnerabilities (XSS, CSRF, SQL Injection).
- User authentication must be secure, with password hashing and secure session management.

### 4.3 Usability
- The UI must be intuitive, modern, and easy to navigate.
- The platform must be fully responsive and accessible on all major devices.
- The design should adhere to a consistent theme (light/dark modes).

### 4.4 Reliability
- The platform should have an uptime of 99.9%.
- All critical data (user profiles, documents) must be backed up regularly.

### 4.5 Internationalization (i18n)
- The platform supports multiple languages, including English, Arabic, Kurdish, and Turkish.
- The UI should be designed to accommodate Right-to-Left (RTL) languages.
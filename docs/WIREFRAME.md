# SharkVest Application Wireframes (Textual Representation)

**Version 1.0**

**Date: 2025-10-02**

---

## Introduction

This document provides a textual wireframe for the key screens of the SharkVest application. It outlines the layout and primary components of each page.

---

## 1. Global Components

### 1.1 Main Navigation (Sidebar)
- App Logo
- Navigation Links:
  - Dashboard
  - Matches
  - Messages
  - Data Room
  - AI Copilot
  - Trust Hub
  - Settings
  - Logout

### 1.2 Header
- Hamburger Menu (Mobile)
- Page Title / Search Bar
- Notification Bell Icon
- User Profile Dropdown

---

## 2. Public Pages

### 2.1 Landing Page (`/`)
```
+------------------------------------------------------+
| Header: [Logo] [Nav Links] [Login] [Sign Up Button]   |
+------------------------------------------------------+
|                                                      |
|                  [HERO SECTION]                      |
|    Headline: Trust & Intelligence for MENA Startups  |
|    Sub-headline: Connect, Verify, and Grow.          |
|    [Get Started Button]                              |
|                                                      |
+------------------------------------------------------+
|                                                      |
|                  [FEATURES SECTION]                  |
|    [Feature 1: Trust Score] [Feature 2: AI Analysis] |
|                                                      |
+------------------------------------------------------+
|                                                      |
|                  [CALL TO ACTION]                    |
|    Join SharkVest Today!                             |
|                                                      |
+------------------------------------------------------+
|                                                      |
|                  [FOOTER]                            |
|                                                      |
+------------------------------------------------------+
```

### 2.2 Registration Page (`/register`)
```
+------------------------------------------------------+
|                                                      |
|    [Logo]                                            |
|    Create Your Account                               |
|                                                      |
|    [First Name Input]      [Last Name Input]         |
|    [Email Input]                                     |
|    [Password Input]                                  |
|    [Country Dropdown]      [City Input]              |
|    [Role Selection: Founder / Investor]              |
|                                                      |
|    [Register Button]                                 |
|    Already have an account? [Login Link]             |
|                                                      |
+------------------------------------------------------+
```

---

## 3. Authenticated Pages

### 3.1 Founder Dashboard (`/founder-dashboard`)
```
+--------------------------------------------------------------------+
| Header: [Menu] [Dashboard Title] [Notifications] [Profile]         |
+--------------------------------------------------------------------+
| Sidebar (Nav) |                                                    |
|---------------|                  [Welcome Message]                 |
|               |                                                    |
|               | [Founder's Hub: Project Concept & Document Center] |
|               | +----------------------+-------------------------+ |
|               | | [Concept Text Area]  | [KYC Upload]            | |
|               | | [Enhance with AI Btn]| [Pitch Deck Upload]     | |
|               | +----------------------+-------------------------+ |
|               |                                                    |
|               | +----------------+----------------+----------------+ |
|               | | [Trust Score]  | [Matches Card] | [Messages Card]| |
|               | | Score: 85      | Count: 3       | Unread: 1      | |
|               | +----------------+----------------+----------------+ |
|               |                                                    |
|               | [AI Project Score Card]                            |
|               | +----------------------+-------------------------+ |
|               | | Score: 92 (Platinum) | [Radar Chart of Factors]| |
|               | +----------------------+-------------------------+ |
|               |                                                    |
|               | [AI SWOR Analysis & Risk Assessment]               |
|               |                                                    |
+--------------------------------------------------------------------+
```

### 3.2 Investor Dashboard (`/investor-dashboard`)
```
+--------------------------------------------------------------------+
| Header: [Menu] [Dashboard Title] [Notifications] [Profile]         |
|--------------------------------------------------------------------|
| Sidebar (Nav) |                                                    |
|---------------|                  [Welcome Message]                 |
|               |                                                    |
|               | +----------------------+-------------------------+ |
|               | | [Trust Score Card]   | [Pipeline View Card]    | |
|               | | Score: 95            | [Sourcing|Screening|...] | |
|               | +----------------------+-------------------------+ |
|               |                                                    |
|               | [Suggested Startups Card (Locked if score low)]    |
|               | +------------------------------------------------+ |
|               | | [Startup 1: Name, Industry, Match %] [View]    | |
|               | | [Startup 2: Name, Industry, Match %] [View]    | |
|               | +------------------------------------------------+ |
|               |                                                    |
|               | [Connection History Card]                          |
|               |                                                    |
+--------------------------------------------------------------------+
```

### 3.3 Messages Page (`/messages`)
```
+--------------------------------------------------------------------+
| Header: [Menu] [Messages Title] [Notifications] [Profile]          |
|--------------------------------------------------------------------|
| Sidebar (Nav) | [Conversations List] | [Active Chat Window]        |
|---------------|----------------------|-----------------------------|
|               | [Search Bar]         | [Chat Header: User Name]    |
|               |                      |                             |
|               | [Convo 1]            |                             |
|               | [Convo 2]            | [Message History]           |
|               | [Convo 3]            | - Hi there!                 |
|               |                      | - Hello! How are you?       |
|               |                      |                             |
|               |                      | [AI Suggestion Bar]         |
|               |                      | [Message Input Box] [Send]  |
|               |                      |                             |
+--------------------------------------------------------------------+
```
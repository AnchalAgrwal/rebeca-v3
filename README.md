# Tasks

### Main focus
will be to enhance the website's frontend with animations and all.

### backend required for 
- user login
- user profile mgmt
- user registration for an event
- AI chatbot
- using nodemailer to send notific to user for successful login/update/registration.

### Simplifications Adopted
- Committee members data and events data everything hardcoded (will be fed from a json), will update via code
- No image upload for user as we dont need one. User login's will be via google, the pic used in that google ac will suffice
- For a event that needs team registration, we will take emailid of the members only.

### Coding practices
- for creating a component or a page
```
ComponentNameOrPageName
    |-ComponentNameOrPageName.jsx
    |-CompoenntNameOrPageName.css
```
- Use **decendent selectors** for writing css files

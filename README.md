To Figure Out:
 - sometimes not properly loading javascript files?
 - How to Hosting
    - Use ND hosting
    - Use Firebase Hosting
    - determine necessity of firebase info in html based on hosting
 - Backup of database?
 - How to Match Students and Alumni
    - user done:
        - Provide students with a list of potential and let them choose
        - then the alumni
        - perhaps need to "limit" the number of student requests
    - Automation:
        - weighted bipartite matching
            - Majors --> Department ... a cloud
            - Geography --> distance
 - Possible Expiration for user accounts
    - student who become alumni
    - alumni who are no longer active
 - Account Management
    - Managing email preferences?
    - Deleting an account
 - Session Management
 - Ordering of pages
 - Database Setup
    - if by name, then how to resolve same names
    - perhaps then, by uid?
 - Alumni Careers
    - How many careers to let them have?
    - Drop down List of Careers

To-Do:
 - fix login/out button with font-awesome icon
 - allow users to update info in the account settings page
 - remove the unnecessary parts of the initApp in the google quickstart sign in
 - ?prevent users from directly going to main.html
 - ?put limitations on the openly visible details in firebase.js
 - finalize read/write rules based on functions and use
    - see google keep


Future:
 - Implement a populated map and show location of alumni
 - Implement data and analytics


Database Structure:
aaandconnect
    alumni
        uid
            Name
            Occupation
            Location
                City
                State
                Country
            maxNumOfStudents
    student
        uid
            Name
            Major
            Location Preference
            numOfMentors

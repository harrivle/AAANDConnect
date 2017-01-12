Implemented code:
    JoSoWhit
    FireBase
    Bootstrap
    SweetAlert

Javascript dependencies:
    main.js: jQuery and firebase
    boostrap.min.js: jQuery

To Figure Out:
 - sometimes not properly loading javascript files?
 - How to Host
    - Use ND hosting
    - Use Firebase Hosting
    - determine necessity of firebase info in html based on hosting
 - Prevent login of invalid email
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
 - Database Setup
    - if by name, then how to resolve same names
    - perhaps then, by uid?
 - main.html
    - UI
    - update user info
 - Alumni Careers
    - How many careers to let them have?
    - Drop down List of Careers


To-Do:
 - fix login/out button with font-awesome icon
 - allow users to update info in the account settings page
 - prevent authentication of users of non-ND emails (although they cant use the app they are still added to the authenticated users db)
 - ?prevent users from directly going to main.html - currently gimicky
 - ?put limitations on the openly visible details in firebase.js
 - Restrict users to @nd.edu and @alumni.nd.edu
    - ?later add smc and hocro?
 - !fix submit profile button and error checking!
 - !load up user data when entering update page!
 - finalize read/write rules based on functions and use
    - see google keep


Future:
 - Implement a populated map and show location of alumni
 - Implement data and analytics


Database Structure:
    alumni
            Name
            Careers
            Location
                City
                State
                Country
            maxNumOfStudents
    student
            Name
            Major
            Location Preference
            numOfMentors

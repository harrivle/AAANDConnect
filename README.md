To Figure Out:
 - sometimes not properly loading javascript files?
 - Hosting
    - Use ND hosting
    - Use Firebase Hosting
    - determine necessity of firebase info in html based on hosting
 - Expiration
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
 - main.html
    - UI
    - update user info

To-Do:
 - fix login/out button with font-awesome icon
 - remove the unnecessary parts of the initApp in the google quickstart sign in
 - ?prevent users from directly going to main.html
 - ?put limitations on the openly visible details in firebase.js
 - Restrict users to @nd.edu and @alumni.nd.edu
    - ?later add smc and hocro?
 - Algorithm and Matching
    - weighted bipartite matching
        - Majors --> Department ... a cloud
        - Geography --> distance


Future:
 - Implement a populated map and show location of alumni


Database Structure:
aaandconnect
    alumni
        uid
            Name
            Occupation
            Location

    student
        uid
            Name
            Major
            Location Preference

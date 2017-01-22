Implemented code:
    JoSoWhit
    FireBase
    Bootstrap
    SweetAlert

Javascript dependencies:
    main.js: jQuery and firebase
    boostrap.min.js: jQuery

To Figure Out:
 - loading text data into a dropdown selection
 - How to Host
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
    - what should be in the user settings
    - how to delete an "account"?

To-Do:
 - fix login/out button with font-awesome icon
 - prevent authentication of users of non-ND emails (although they cant use the app they are still added to the authenticated users db)
 - ?prevent users from directly going to main.html - currently gimicky b/c it checks if they are authenticated. if not, they are redirected to index.html
 - ?put limitations on the openly visible details in firebase.js
 - Restrict users to @nd.edu and @alumni.nd.edu
    - ?later add smc and hocro?
 - finalize read/write rules based on functions and use
    - see google keep
 - implement CSS Reset? see bookmarks
 - new 404.html error page with submit error link?
 - !security issues with scripts - check vulnerabilities with all scripts!

Future:
 - Implement a populated map and show location of alumni
 - Implement data and analytics

# Chirp It Up, Full Stack Style!
The purpose of this lab is to take your `chirpr` schema, connect it to your Chirper Half Stack app, and utilize the database instead of `chirpsstore.ts` or `chirps.json`!

## Required Steps
### Database
1. Create a database user named chirprapp
2. Grant all privileges to your chirpr database.
    **Hint**: use `chirpr.*` in the `ON` part of the `GRANT` statement.
### Node
1. In your chirpr API, use your database to store chirps instead of a file
2. Install and save the `mysql @types/mysql` NodeJS package using NPM
3. Configure your connection using `createConnection`
4. In each API method, make the appropriate database call to create, read, update, and delete chirps
4. Test all the REST API endpoints in Postman to confirm they all work
### React
1. Adjust your frontend React components to use the same API endpoints from above to achieve the same functionality it had reading a `json` file. It should display all chirps, view one chirp, delete or edit that, and the ability to add new chirps.
## Advanced Steps
1. Create a table named `Mentions` with the following fields/columns, if you don't have one already:
```
Mentions
  userid
  chirpid
```
2. Create a stored procedure named `spUserMentions` that returns all chirps a user is mentioned in
    * Parameters: `userid`
    * The result set should contain: chirpid, chip text, chirp date
    * **Tip:** be sure to insert some fake mentions so that you can test the procedure!
3. When a chirp is created, check to see if there are mentions in the chirp text and add it to the database
    * Mentions should be put in chirps with the format `@username`.
    * **Example Chirp:** `hi @matt it was good to see you in class!`
4. If it does, add a mention to the database as well as the chirp
    * Create a new API method that inserts mentions
    * Hint: You'll have to parse the string and lookup the user by name (use like!)
    * If you don't have a username on your table, you can use `userid` (i.e. `@1` instead of `@matt`)
5. Add the ability in your app to click a username and view all of the chirps that user is mentioned in
    * Create a new API method that retrieves chirps that a user is mentioned in
        * **Important:** There is some creativity that will be needed on your part to put a good interface together that works for this!
# m149-311ci
Web App (Interaction with Chicago Incidents database)


**Build instructions**
1. Create a postgress database with name <dbname>
2. Run ```psql -U <dbusername> <dbname> < {root folder of project}/database/dump/chicago_requests.sql ```
3. Create a file `credentials.json` and put it inside {root folder of project}/database/config
```
{
    "user": <dbusername>,
    "host": <dbhost>,
    "password": <dbpassword>
    "database": <dbname>,
    "port": "5432"
}
```
4. Put appropriate csv files inside {root folder of project}/database/data
5. Run ```npm install inside root folder```
6. You can fill the database with the corresponding csv file. Run `npm run fill [1-11]`. For example, if you want to insert Abandoned_Vehicle_Requests
  ```
npm run fill 1  
  ```
7. Create a file `security.json` and put it inside {root folder of project}/server/config
```
{
    "jwt-key": <somePasswordForSigning>
}
```
8. Run `npm run build`
9. Browse to ip:8000 

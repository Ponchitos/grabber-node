# grabber-api

1) Create a database in Postgresql named "grabber"
(Ubuntu: sudo -u postgres createdb <dbname>)

2) Create a user in Postgresql named "grabber"
(Ubuntu: sudo -u postgres createuser <username>)

3) Create a password for the user - "grabber"
(Ubuntu: sudo -u postgres psql
psql=# alter user <username> with encrypted password '<password>';)

4) Provide access to the database for the user
(Ubuntu: psql=# grant all privileges on database <dbname> to <username> ;)

5) java - service: run grabber/Grabber.java

6) node - service: npm install

7) node - service: npm start

8) API: http://localhost:8000/swagger-docs/?url=spec

9) node - service: npm test

-Developed by Logan Kulesus
-Last updated May 5th, 2022


INFO
----------
The React webapp 'final-project' runs on port 3000. to start, open the final-project
directory in a Command Line Interface (current directory would be ".../final-project/")
and run the webapp with the command "npm start".

The REST API 'usersapi' runs on port 3400.. To start the API, open the usersapi
directory in a CLI (directory would be ".../usersapi/") and run the API using the
command "npm start". The API should be up and running after the "Server and database
initialized" message is displayed.


WARNINGS
----------
I have noticed that frequently, port 3400 is already in use on my computer, so
the API will refuse to initialize, and give an "elevated privileges" error, which
from my experience is most easily solved by restarting the computer, ensuring that
the port will be available.

The React webapp can take quite some time to initialize, so only assume the webapp
has crashed when an error message is displayed.

MongoDB requires IP authorization from the database-end, so anybody who attempts to
use the API from a computer that isn't on the allowed IP list will fail to run the API,
and the API will fail to run. However, the website should still run fine. There are also
error messages in the browser console when visiting the website, and this is to be expected,
and the app still runs fine. If you wish to run the web app and API locally, feel free to
change the DB environmental variable for the API to connect to your own personal MongoDB
cluster, and you can also change your preferred ports for both the web app and API as well.


Digital Ocean React App Instance link:
----------
https://bacs-495-final-xco5f.ondigitalocean.app/
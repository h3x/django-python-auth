## Setup

Make sure you have node and npm installed

#### Clone the repo

`git clone git@github.com:h3x/django-python-auth.git`

#### CD into the directory
`cd django-python-auth`

#### Create your venv and activate
`python3 -m venv venv`

`source venv/bin/activate`

#### Install required packages

`pip install -t requirements.txt`

#### Make migrations and migrate the database

`python manage.py makemigrations`

`python manage.py migrate`

#### Set up the .env file

`cd mysite && cp env-template .env`
`cd ..`

#### Install node requirements

`cd frontend`

`npm install`

#### Start the development server
`npm run dev`

#### Create a superuser and Start the django server
open a new terminal and navigate to the project folder ( this should contain the manage.py file)

activate the venv 

`source venv/bin/activate`

create a superuser. Follow the prompts

`python manage.py createsuperuser`

start the python server

`python manage.py runserver`

the server should now be running on localhost:8000

If there is a warning about unapplied migrations, migrate again

`python manage.py migrate`


## Routes
/admin

/login

/submit

/register

/
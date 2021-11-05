import mysql.connector
from datetime import datetime
import string
import random

mydb = mysql.connector.connect(
    host="localhost",
    user="root",
    password="password",
    database='ducdat'
)


NUMBER_DOCUMENTS = 10000


def create_table_student():
    cursor = mydb.cursor()
    cursor.execute(
        'CREATE TABLE IF NOT EXISTS student(name VARCHAR(20) NOT NULL)'
    )


def init_database_student():
    create_table_student()
    cursor = mydb.cursor()
    count = 0
    while count < NUMBER_DOCUMENTS:
        student_name = ''.join(random.choices(
            string.ascii_uppercase + string.digits, k=10))

        query = 'INSERT INTO student (name) VALUES (%s)'
        cursor.execute(query, (student_name,))
        mydb.commit()

        count += 1


def search_student():
    cursor = mydb.cursor()
    start_time = datetime.now()
    cursor.execute('SELECT * FROM student')
    cursor.fetchall()
    end_time = datetime.now()

    timing = (end_time - start_time).microseconds
    print('Timing query = ', timing)


search_student()

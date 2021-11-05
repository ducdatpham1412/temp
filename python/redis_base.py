import random
import string
import redis
from datetime import datetime

redis = redis.Redis(
    host='localhost',
    port=6379,
    db=0
)

NUMBER_DOCUMENTS = 10000


def init_database_student():
    count = 0
    while count < NUMBER_DOCUMENTS:
        student_name = ''.join(random.choices(
            string.ascii_uppercase + string.digits, k=10))

        redis.set('student:{}'.format(student_name), student_name)

        count += 1


def search_student():
    start_time = datetime.now()
    redis.keys('*{}*'.format('FT'))
    end_time = datetime.now()

    timing = (end_time - start_time).microseconds
    print('Timing query = ', timing)


search_student()

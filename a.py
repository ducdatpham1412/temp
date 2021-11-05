from dateutil import parser
from dateutil.tz import gettz
from datetime import datetime, timedelta, time
from dateutil import tz
import pytz


start = "2022-06-21T13:05:13.000+00:00"
temp = parser.parse(start)
temp_3 = temp.astimezone(pytz.timezone('Asia/Ho_Chi_Minh'))
check = datetime.strftime(temp_3, '%Y-%m-%d %H:%M:%S')

print(check)

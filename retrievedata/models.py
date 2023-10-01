from datetime import datetime
from django.db import models


class Places(models.Model):
    Places_id = models.AutoField(primary_key=True)
    meters = models.IntegerField()
    year = models.IntegerField()
    price = models.BigIntegerField()
    rooms = models.IntegerField()
    floor = models.IntegerField()
    url = models.URLField(max_length=200)
    code = models.CharField(max_length=20, unique=True)
    created_on = models.DateTimeField(blank=True, default=datetime.now)

    class Meta:
        db_table = 'Places'

from django.db import models


class DataModel(models.Model):
    row_id = models.AutoField(primary_key=True)
    a = models.FloatField()
    b = models.FloatField()
    c = models.FloatField()
    d = models.FloatField()


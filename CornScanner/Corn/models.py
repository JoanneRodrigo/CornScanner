from django.db import models

# Create your models here.
class Corn(models.Model):
    corn_name = models.CharField(max_length=50)
    corn_desc = models.CharField(max_length=150)
    corn_disease = models.CharField(max_length=150, null=True)
    corn_cure = models.CharField(max_length=150, null=True)


    def __str__(self):
        return self.corn_name
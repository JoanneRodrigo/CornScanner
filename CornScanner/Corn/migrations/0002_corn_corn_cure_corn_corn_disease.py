# Generated by Django 4.1 on 2023-12-06 11:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Corn', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='corn',
            name='corn_cure',
            field=models.CharField(max_length=150, null=True),
        ),
        migrations.AddField(
            model_name='corn',
            name='corn_disease',
            field=models.CharField(max_length=150, null=True),
        ),
    ]

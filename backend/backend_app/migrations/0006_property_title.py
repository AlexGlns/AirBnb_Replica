# Generated by Django 3.2.19 on 2023-09-20 14:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend_app', '0005_auto_20230920_1138'),
    ]

    operations = [
        migrations.AddField(
            model_name='property',
            name='title',
            field=models.CharField(default='Property', max_length=100),
        ),
    ]

# Generated by Django 3.2.19 on 2023-08-24 09:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend_app', '0005_auto_20230819_1006'),
    ]

    operations = [
        migrations.AddField(
            model_name='customuser',
            name='phone_number',
            field=models.IntegerField(default=0, max_length=30),
        ),
        migrations.AlterField(
            model_name='customuser',
            name='email',
            field=models.EmailField(max_length=254, unique=True),
        ),
        migrations.AlterField(
            model_name='customuser',
            name='first_name',
            field=models.CharField(max_length=30),
        ),
        migrations.AlterField(
            model_name='customuser',
            name='last_name',
            field=models.CharField(max_length=30),
        ),
        migrations.AlterField(
            model_name='customuser',
            name='user_type',
            field=models.CharField(choices=[('admin', 'Admin'), ('host', 'Host'), ('renter', 'Renter')], default='renter', max_length=20),
        ),
    ]

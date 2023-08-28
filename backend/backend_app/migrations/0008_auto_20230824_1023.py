# Generated by Django 3.2.19 on 2023-08-24 10:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend_app', '0007_alter_customuser_phone_number'),
    ]

    operations = [
        migrations.AddField(
            model_name='property',
            name='bathroom_number',
            field=models.IntegerField(default=1),
        ),
        migrations.AddField(
            model_name='property',
            name='bed_number',
            field=models.IntegerField(default=1),
        ),
        migrations.AddField(
            model_name='property',
            name='description',
            field=models.CharField(default='-', max_length=1000),
        ),
        migrations.AddField(
            model_name='property',
            name='events',
            field=models.CharField(choices=[('Yes', 'Yes'), ('No', 'No'), ('Unknown', 'Unknown')], default='No', max_length=20),
        ),
        migrations.AddField(
            model_name='property',
            name='lat',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='property',
            name='living_room',
            field=models.CharField(choices=[('Yes', 'Yes'), ('No', 'No'), ('Unknown', 'Unknown')], default='No', max_length=20),
        ),
        migrations.AddField(
            model_name='property',
            name='lng',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='property',
            name='min_number_reservation',
            field=models.IntegerField(default=1),
        ),
        migrations.AddField(
            model_name='property',
            name='pets',
            field=models.CharField(choices=[('Yes', 'Yes'), ('No', 'No'), ('Unknown', 'Unknown')], default='No', max_length=20),
        ),
        migrations.AddField(
            model_name='property',
            name='smoking',
            field=models.CharField(choices=[('Yes', 'Yes'), ('No', 'No'), ('Unknown', 'Unknown')], default='No', max_length=20),
        ),
        migrations.AlterField(
            model_name='property',
            name='size',
            field=models.IntegerField(default=0),
        ),
    ]

# Generated by Django 3.2.19 on 2023-09-06 17:24

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('backend_app', '0003_comment'),
    ]

    operations = [
        migrations.AlterField(
            model_name='rating',
            name='property',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='ratings', to='backend_app.property'),
        ),
    ]

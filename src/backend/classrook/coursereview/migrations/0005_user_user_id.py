# Generated by Django 3.0.6 on 2020-05-12 12:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('coursereview', '0004_auto_20200510_1618'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='user_id',
            field=models.IntegerField(null=True),
        ),
    ]

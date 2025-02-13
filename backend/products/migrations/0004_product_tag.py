# Generated by Django 5.1.5 on 2025-02-13 08:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("products", "0003_alter_category_thumbnail"),
    ]

    operations = [
        migrations.AddField(
            model_name="product",
            name="tag",
            field=models.CharField(
                choices=[
                    ("new_arrivals", "New Arrivals"),
                    ("trending", "Trending"),
                    ("top_rated", "Top Rated"),
                ],
                default="new_arrivals",
                max_length=50,
            ),
        ),
    ]

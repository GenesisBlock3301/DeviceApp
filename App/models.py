from django.db import models


class Device(models.Model):
    name = models.CharField(max_length=255)
    device_type = models.CharField(max_length=255)
    status = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

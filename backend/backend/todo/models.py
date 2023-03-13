from django.db import models


class Todo(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField(max_length=1000, blank=True, default='')
    isCompleted = models.BooleanField(default=False)

    def __str__(self) -> str:
        return self.title

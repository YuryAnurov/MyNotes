from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils import timezone


class User(AbstractUser):
    pass


class Section(models.Model):
    section = models.CharField(max_length=64)
    author = models.ForeignKey(User, on_delete=models.CASCADE)    
    status = models.CharField(max_length=16, default='active')
    def __str__(self):
        return f'{self.section}'


class Category(models.Model):
    category = models.CharField(max_length=64)
    section = models.ForeignKey(Section, on_delete=models.CASCADE)
    author = models.ForeignKey(User, on_delete=models.CASCADE)    
    class Meta:
        verbose_name_plural = "Categories"
    def __str__(self):
        return f'{self.category} in {self.section}'


class Note(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    created = models.DateTimeField(default=timezone.now)
    crshown = models.DateField()
    content = models.TextField()
    status = models.CharField(max_length=8, default='active')
    url = models.URLField(editable=True, blank=True)
    section = models.ForeignKey(Section, on_delete=models.CASCADE)
    category = models.ManyToManyField(Category, blank=True, related_name='notecat')
    def __str__(self):
        return f'{self.content} made {self.created}'

    


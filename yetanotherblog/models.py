from django.db import models


class Blogpost(models.Model):
    title = models.CharField(max_length=100)
    date = models.DateField()
    topic = models.CharField(max_length=20)
    content_file = models.FileField(upload_to='blogposts%Y/')

    def __str__(self):
        return self.title


class Comments(models.Model):
    post_id = models.IntegerField()
    author = models.CharField(max_length=20)
    comment_text = models.TextField()

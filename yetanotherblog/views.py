from django.shortcuts import render, redirect
from yetanotherblog.models import Blogpost,Comments
from django.db.models import Count
from django.http import JsonResponse
from django.core import serializers


# Create your views here.
def home(request):
    total = Blogpost.objects.all().count
    topics = Blogpost.objects.values('topic').annotate(count=Count('topic'))
    return render(request, 'home.html', {'total': total, 'topics': topics})


def view_post(request, post_id):
    blogpost = Blogpost.objects.get(id=post_id)
    comments = Comments.objects.filter(post_id=post_id)
    file_path = blogpost.content_file.url
    file = open('data/'+file_path)
    content = file.read()
    return render(request, 'blogpost.html', {'content': content,'post': blogpost,
                                             'comments': comments})


def allBlogs(request):
    data = Blogpost.objects.all()
    blog_data = serializers.serialize('json', data)
    return JsonResponse({"blogs": blog_data})


def get_comments(request):
    postId = request.GET['id']
    comments = Comments.objects.filter(post_id=postId)
    comments_data = serializers.serialize('json', comments)
    return JsonResponse({"comments": comments_data})


def add_comment(request):
    postId = request.POST['id']
    commentAuthor = request.POST['author']
    commentText = request.POST['text']
    c = Comments(post_id=postId,
                 author=commentAuthor, comment_text=commentText)
    c.save()
    return redirect('/blogpost/'+postId)

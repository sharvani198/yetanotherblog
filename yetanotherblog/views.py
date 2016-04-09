from django.shortcuts import render
from yetanotherblog.models import Blogpost
from django.db.models import Count
from django.http import JsonResponse, HttpResponse
from django.template import Context, Template


# Create your views here.
def home(request):
    blogs = Blogpost.objects.all()
    topics = Blogpost.objects.values('topic').annotate(count=Count('topic'))
    return render(request, 'home.html', {'blogs': blogs, 'topics': topics})


def view_post(request, post_id):
    blogpost = Blogpost.objects.get(id=post_id)
    file_path = blogpost.content_file.url
    file = open('data/'+file_path)
    content = file.read()
    return render(request, 'blogpost.html', {'content': content,
                                             'post': blogpost})


def about(request):
    return render(request, 'about.html')


def filter(request, topic):
    filtered_blogs = Blogpost.objects.filter(topic=topic)
    topics = Blogpost.objects.values('topic').annotate(count=Count('topic'))
    return render(request, 'home.html', {'blogs': filtered_blogs, 'topics': topics})


def filterjs(request):
    topic = request.GET['topic']
    if topic == "all":
        filtered_blogs = Blogpost.objects.all().values()
    else:
        filtered_blogs = Blogpost.objects.filter(topic=topic).values()
    blogs = []
    for i in filtered_blogs:
        date = i['date'].ctime().split(' ')
        i['date'] = date[1] + " " + date[3] + " " + date[5]
        blogs.append(i)
    return JsonResponse({"blogs": blogs})

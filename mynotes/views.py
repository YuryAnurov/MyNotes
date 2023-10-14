from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render
from django.urls import reverse
from django.http import JsonResponse
import datetime
import json


from .models import User, Section, Category, Note


def note(request, section_id):
    if request.method == "POST":
        new_note = Note()
        new_note.author = request.user
        new_note.content = request.POST.get('content')
        new_note.url = request.POST.get('url')
        new_note.created = datetime.datetime.now()
        new_note.crshown = new_note.created.date()
        new_note.section = Section.objects.get(pk=section_id)
        new_note.save()
        return HttpResponseRedirect(reverse("sectionnotes", args=(section_id,)))


def category(request, section_id):
    if request.method == "POST":
        new_cat = Category()
        new_cat.author = request.user
        new_cat.category = request.POST.get('category')
        new_cat.section = Section.objects.get(pk=section_id)
        new_cat.save()
        return HttpResponseRedirect(reverse("sectionnotes", args=(section_id,)))


def addsection(request):
    sections = Section.objects.filter(author=request.user, status='active')
    return render(request, "mynotes/addsection.html", {"sections": sections})


def rename(request, section_id):
    try:
        section = Section.objects.get(pk=section_id)
    except Section.DoesNotExist:
        return JsonResponse({"error": "Section not found."}, status=404)

    if request.method == "PUT":
        data = json.loads(request.body)
        section.section = data["edtext"]
        section.save()
        return HttpResponse(status=204)

    else:
        return JsonResponse({"error": "PUT request required."}, status=400)


def newsection(request):
    if request.method == "POST":
        sections = Section.objects.filter(author=request.user, status='active')
        new_section = Section()
        new_section.section = request.POST.get('section')
        new_section.author = request.user
        new_section.save()
        return render(request, "mynotes/index.html", {"section": new_section, "sections": sections})


def edit(request, note_id):
    try:
        ednote = Note.objects.get(pk=note_id)
    except Note.DoesNotExist:
        return JsonResponse({"error": "Note not found."}, status=404)

    if request.method == "PUT":
        data = json.loads(request.body)
        ednote.content = data["edtext"]
        ednote.url = data["edurl"]
        ednote.save()
        return HttpResponse(status=204)

    else:
        return JsonResponse({"error": "PUT request required."}, status=400)


def edcat(request, cat_id):
    try:
        edcat = Category.objects.get(pk=cat_id)
    except Note.DoesNotExist:
        return JsonResponse({"error": "Note not found."}, status=404)

    if request.method == "PUT":
        data = json.loads(request.body)
        edcat.category = data["edtext"]
        edcat.save()
        return HttpResponse(status=204)

    else:
        return JsonResponse({"error": "PUT request required."}, status=400)


def pick(request, note_id):
    try:
        ednote = Note.objects.get(pk=note_id)
    except Note.DoesNotExist:
        return JsonResponse({"error": "Note not found."}, status=404)

    if request.method == "PUT":
        data = json.loads(request.body)
        category = Category.objects.get(pk=int(data['category']))
        if category in ednote.category.all():
            ednote.category.remove(category)
        else:
            ednote.category.add(category)
        return HttpResponse(status=204)

    else:
        return JsonResponse({"error": "PUT request required."}, status=400)


def delete(request, note_id):
    try:
        ednote = Note.objects.get(pk=note_id)
    except Note.DoesNotExist:
        return JsonResponse({"error": "Note not found."}, status=404)

    if request.method == "PUT":
        data = json.loads(request.body)
        ednote.status = data["status"]
        ednote.save()
        return HttpResponse(status=204)

    else:
        return JsonResponse({"error": "PUT request required."}, status=400)


def delcat(request, cat_id):
    try:
        todel = Category.objects.get(pk=cat_id)
    except Category.DoesNotExist:
        return JsonResponse({"error": "Note not found."}, status=404)

    if request.method == "PUT":
        todel.delete()
        return HttpResponse(status=204)

    else:
        return JsonResponse({"error": "PUT request required."}, status=400)


def sectionnotes(request, section_id):
    section = Section.objects.get(pk=section_id)
    if section.status == 'archived':
        section.status = 'active'
        section.save()
    sections = Section.objects.filter(author=request.user, status='active')
    categories = Category.objects.filter(section=section)
    notes = Note.objects.filter(section=section, status='active').order_by('created').reverse()
    not1 = notes[0::2]
    not2 = notes[1::2]
    return render(request, "mynotes/index.html", {
        "section": section, "categories": categories, "sections": sections, "not1": not1, "not2": not2
        })


def archive(request, section_id):
    section = Section.objects.get(pk=section_id)
    section.status = 'archived'
    section.save()
    return HttpResponseRedirect(reverse("index"))


def archived(request):
    sections = Section.objects.filter(author=request.user, status='active')
    archived = Section.objects.filter(author=request.user, status='archived')
    notes = Note.objects.filter(
        author=request.user, section__in=archived, status='active'
        ).order_by('created').reverse()
    not1 = notes[0::2]
    not2 = notes[1::2]
    deleted = Note.objects.filter(author=request.user, status='deleted').order_by('created').reverse()
    del1 = deleted[0::2]
    del2 = deleted[1::2]
    return render(request, "mynotes/archived.html", {
        "sections": sections, "archived": archived, "not1": not1, "not2": not2, "del1": del1, "del2": del2
        })


def index(request):
    if request.user.is_authenticated:
        sections = Section.objects.filter(author=request.user, status='active')
        notes = Note.objects.filter(
            author=request.user, section__in=sections, status='active'
            ).order_by('created').reverse()
        not1 = notes[0::2]
        not2 = notes[1::2]
        return render(request, "mynotes/index.html", {"sections": sections, "not1": not1, "not2": not2})
    return render(request, "mynotes/index.html")


def login_view(request):
    if request.method == "POST":

        # Attempt to sign user in
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)

        # Check if authentication successful
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("index"))
        else:
            return render(request, "mynotes/login.html", {"message": "Invalid username and/or password."})
    else:
        return render(request, "mynotes/login.html")


def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("index"))


def register(request):
    if request.method == "POST":
        username = request.POST["username"]
        email = request.POST["email"]

        # Ensure password matches confirmation
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        if password != confirmation:
            return render(request, "mynotes/register.html", {
                "message": "Passwords must match."
            })

        # Attempt to create new user
        try:
            user = User.objects.create_user(username, email, password)
            user.save()
        except IntegrityError:
            return render(request, "mynotes/register.html", {
                "message": "Username already taken."
            })
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "mynotes/register.html")

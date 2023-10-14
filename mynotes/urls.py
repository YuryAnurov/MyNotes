from django.urls import path
from django.contrib.staticfiles.storage import staticfiles_storage
from django.views.generic.base import RedirectView
from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("section/<int:section_id>", views.sectionnotes, name="sectionnotes"),
    path("addsection", views.addsection, name="addsection"),
    path("newsection", views.newsection, name="newsection"),
    path("archive/<int:section_id>", views.archive, name="archive"),
    path("archived", views.archived, name="archived"),
    path("note/<int:section_id>", views.note, name="note"),
    path("category/<int:section_id>", views.category, name="category"),
    path("edit/<int:note_id>", views.edit, name="edit"),
    path("pick/<int:note_id>", views.pick, name="pick"),
    path("delete/<int:note_id>", views.delete, name="delete"),
    path("edcat/<int:cat_id>", views.edcat, name="edcat"),
    path("delcat/<int:cat_id>", views.delcat, name="delcat"),
    path("rename/<int:section_id>", views.rename, name="rename"),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register, name="register"),
    path("favicon.ico", RedirectView.as_view(url=staticfiles_storage.url("favicon.ico")),),
    ]

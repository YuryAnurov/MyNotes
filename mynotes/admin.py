from django.contrib import admin
from .models import Note, User, Section, Category


class NoteAdmin(admin.ModelAdmin):
    filter_horizontal=['category']


admin.site.register(Note, NoteAdmin)
admin.site.register(Section)
admin.site.register(Category)
admin.site.register(User)



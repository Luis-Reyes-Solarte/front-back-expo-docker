from django.contrib import admin

# Register your models here.
from .models import Item

class ItemAdmin(admin.ModelAdmin):
    list_display = ('name', 'done')
    list_filter = ('done',)
    search_fields = ('name',)
    ordering = ('name',)
    actions = ['mark_done', 'mark_undone']

    def mark_done(self, request, queryset):
        queryset.update(done=True)

    def mark_undone(self, request, queryset):
        queryset.update(done=False)

admin.site.register(Item, ItemAdmin)

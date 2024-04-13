from django.contrib import admin
from django.urls import path, include
from . import views

urlpatterns = [
    path('login/', views.loginView, name='login'),
    path('logout/', views.logoutView, name='logout'),
    path('register/', views.registerView, name='register'),
    path('update/<int:id>', views.updateView, name='update'),
    path('create/', views.createView, name='create'),
    path('view/', views.getNotes, name='view'),
    path('get/<int:id>', views.getNote, name='get'),
    path('delete/<int:id>', views.deleteView, name='delete'),
]
"""classrook URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import include, path
from rest_framework import routers
from coursereview import views

router = routers.DefaultRouter()

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path('', include(router.urls)),
    path('admin/', admin.site.urls),
    path('courses/', views.course_list),
    path('user/', views.user_info),
    path('review/', views.post_review),
    path('upvote/', views.upvote_review),
    path('add_user/', views.post_user),
    path('get_by_email/', views.user_info_by_email),
    path('course_by_code/',views.course_info_by_code),
    path('get_exact_course/', views.get_exact_course),
    path('review_by_course_id/', views.review_info_by_course_id),
    path('upload_document/', views.upload_file),
    path('download_document/', views.download_file),
    path('get_files/', views.files_by_course_id),
    #path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
]

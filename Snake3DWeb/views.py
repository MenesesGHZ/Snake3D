from django.shortcuts import render, redirect
from django.views import View

class Snake3D(View):
    def get(self,request):
        return render(request, 'snake3D.html', context=None)

    def post(self,request):
        pass

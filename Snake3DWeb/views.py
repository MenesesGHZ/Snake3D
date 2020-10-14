from django.shortcuts import render
from django.views import View

class Snake3D(View):
    def get(self,request):
        return render(request, 'snake3D.html', context=None)

    def post(self,request):
        pass

#tresstogo api
from rest_framework.decorators import api_view
from rest_framework import views
from django.core.mail import send_mail
from django.template.loader import render_to_string
from django.core.exceptions import ValidationError
from django.core.validators import validate_email
from Snake3D import settings


@api_view(['POST'])
def api_email(request):
    data = request.data
    data_is_valid, report = api_email_data_validation(data)
    if request.method == 'POST' and data_is_valid:
        subject = data.get("subject")
        message = data.get("message")
        recipient_list = [data.get("to_email")]
        from_email = settings.EMAIL_HOST_USER

        if data.get("type") == "welcome":
            html_message = render_to_string('tresstogo/welcome_email.html',context={'name':data.get("to_email")}),
        elif data.get("type") == "receipt":
            html_message = render_to_string('tresstogo/receipt.html',context=data.get("context"))

        send_mail(subject=subject,message=message,html_message=html_message,from_email=from_email,recipient_list=recipient_list,fail_silently=False)
    return views.Response(report)


def api_email_data_validation(data):
    try:
        assert data.get("api_key") is not None
        assert data.get("subject") is not None
        assert data.get("message") is not None
        assert data.get("to_email") is not None
        assert data.get("api_key") == settings.EMAIL_API_KEY
        assert isinstance(data.get("subject"),str)
        assert isinstance(data.get("message"),str)
        assert data.get("type") in ["welcome","receipt"]
        validate_email(data.get("to_email"))

    except AssertionError as e:
        return (False,"An error has ocurred: {}".format(e))

    except ValidationError as e:
        return (False,"Invalid Email: {}".format(e))

    else:
        return (True,"EMAIL HAS BEEN SUCCESSFULLY SENT")





from django import template
from django.templatetags.static import static
from collections import defaultdict

## Metodos capaces de ser usados dentro de HTML = {{ value|split:"," }}
register = template.Library()


def split(value, arg):
    return value.split(arg)


def index(array, i):
    return array[i]

def get_url(img_name):
    url = static("mysteryBoxWeb/imgs/" + img_name)
    return url

def hidden_package(array):
    d = defaultdict()
    d["option"] = array[0]
    d["icon"] = array[1]
    return d


register.filter('split', split, is_safe=False)  ## is_safe = True,  manda en crudo la informacion
register.filter('get_url', get_url, is_safe=False)
register.filter('index',index,is_safe=False)
register.filter('hidden_package',hidden_package,is_safe=False)

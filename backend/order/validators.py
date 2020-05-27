import re
from django.core.exceptions import ValidationError
from django.utils.translation import ugettext_lazy as _

def validate_phone(value):
    match = re.search("^(\+380\d{9})|(\+7\d{10})", value)
    if  match != None and match.group() == value: 
        return value
    raise ValidationError(_("Sorry,phone isn't correct"), code='invalid')



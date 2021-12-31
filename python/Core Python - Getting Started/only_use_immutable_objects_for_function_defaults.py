import time
time.ctime()
# prints:
# 'Thu Dec 30 19:43:48 2021'


def show_default(arg=time.ctime()):
    print(arg)


show_default()
# prints:
# 'Thu Dec 30 19:43:48 2021'
show_default()
# prints:
# 'Thu Dec 30 19:43:48 2021'
show_default()
# prints:
# 'Thu Dec 30 19:43:48 2021'

# default arguments are evaluated only once when the "def" function is bound


def add_spam_no_no(menu=[]): # bad practice - setting a default arg to a mutable object
    menu.append("spam")
    return menu


breakfast = ['bacon', 'eggs']
add_spam_no_no(breakfast)
# ['bacon', 'eggs', 'spam']
# looks good

lunch = ['baked beans']
add_spam_no_no(lunch)
# ['baked beans', 'spam']
# looks good

# but
add_spam_no_no()
# ['spam']
add_spam_no_no()
# ['spam', 'spam']
add_spam_no_no()
# ['spam', 'spam', 'spam']
add_spam_no_no()
# ['spam', 'spam', 'spam', 'spam']
# ruh-oh


# fixed by
def add_spam(menu=None):
    if menu is None:
        menu = []
    menu.append('spam')
    return menu


add_spam()
# ['spam']
add_spam()
# ['spam']
add_spam()
# ['spam']
# that's better

t = ("Norway", 4.953, 3)
print(t)
# ('Norway', 4.953, 3)

# access tuple elements by index
print(t[0])
# 'Norway'
print(t[2])
# 3

# how many tuple attributes
print(len(t))
# 3

# iterate over tuple attributes
for item in t:
    print(item)
# Norway
# 4.953
# 3

# append to a tuple with the + operator
print(t + (338186.0, 265e9))
# ('Norway', 4.953, 3, 338186.0, 265000000000.0)

# multiply the elements in a tuple with the * operator
print(t * 3)
# ('Norway', 4.953, 3, 'Norway', 4.953, 3, 'Norway', 4.953, 3)

# nested tuples
a = ((220, 284), (1184, 1210), (2620, 2924), (5020, 5564), (6232, 6368))

# access a nested tuple like a multi-dimensional array
print(a[2][1])
# 2924

# not a tuple
h = (391)
print(h)
# 391
# because in this case the parens are treated as an expression grouping
print(type(h))
# <class 'int'>

# instead use a trailing comma to create a tuple with a single attribute
k = (391,)
print(k)
# (391,)
print(type(k))
# <class 'tuple'>

# creating an empty tuple
e = ()
print(e)
# ()
print(type(e))
# <class 'tuple'>

# creating a tuple without parens by just using comma delimited values
p = 1, 1, 1, 4, 6, 19
print(p)
# (1, 1, 1, 4, 6, 19)
print(type(p))
# <class 'tuple'>

# using a return statement to generate a tuple from function
def minmax(items):
    return min(items), max(items)
print(minmax([83, 33, 84, 32, 85, 31, 86]))
# (31, 86)

# tuple unpacking to named variables
lower, upper = minmax([83, 33, 84, 32, 85, 31, 86])
print(lower, upper)
# 31 86

# nested unpacking
(a, (b, (c, d))) = (4, (3, (2, 1)))
print(a, b, c, d)
# 4 3 2 1

# swapping variables with tuples
a = 'jelly'
b = 'bean'
a, b = b, a
print(a, b)
# bean jelly
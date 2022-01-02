
print(len("This string's length"))

print("string" + " concatenation")

# concatenting with the augmented assignment operator
stringBuiltWithAugmentedAssignment = "word1 "
stringBuiltWithAugmentedAssignment += "part2 "
stringBuiltWithAugmentedAssignment += "and3"
print(stringBuiltWithAugmentedAssignment)
# word1 part2 and3

# prefer the str.join() method for concatenating strings
separator = '-separator-'
joinedString = separator.join(['Word1', 'Word2', 'Word3'])
print(joinedString)
# Word1-separator-Word2-separator-Word3

# using str.split()
print(joinedString.split(separator))
# ['Word1', 'Word2', 'Word3']

# using str.partition('-separator-')
print(joinedString.partition(separator))
# ('Word1', '-separator-', 'Word2-separator-Word3')

# .partition() with unpacking
departure, separator, arrival = "London:Edinburgh".partition(':')
print(departure, arrival)
# London Edinburgh

# underscore convention for values we don't intend to use
origin, _, destination = "Seattle>Boston".partition('>')
print(origin, 'to', destination)
# Seattle to Boston

# str.format()
print("The age of {0} is {1}.".format('Jim', 32))
# The age of Jim is 32
print("The age of {0} is {1}. {0}'s birthday is on {2}".format('Fred', 24, 'October 31st'))
# The age of Fred is 24. Fred's birthday is on October 31st

# Indexes can be excluded if each format variable is used only once
print("Reticulating spline {} of {}.".format(4, 23))
# Reticulating spline 4 of 23.

# format with named fields
print("Current position {latitude} {longitude}".format(latitude="60N", longitude="5E"))
# Current position 60N 5E

# format with tuple indexes
print("Galactic position x={pos[0]}, y={pos[1]}, z={pos[2]}".format(pos=(65.2, 23.1, 82.2)))
# Galactic position x=65.2, y=23.1, z=82.2

# format with an object's attributes
import math
print("Math constants: pi={m.pi}, e={m.e}".format(m=math))
# Math constants: pi=3.141592653589793, e=2.718281828459045

# format control limiting decimal places
print("Math constants: pi={m.pi:.3f}, e={m.e:.3f}".format(m=math))
# Math constants: pi=3.142, e=2.718

# f-strings for literal string interpolation with expressions
print(f"one plus one is {1 + 1}")
# one plus one is 2

# f-strings with named variables
value = 4 * 20
print(f'The value is {value}')
# The value is 80

# f-string expression evaluation
import datetime
print(f'The current time is {datetime.datetime.now().isoformat()}.')
# The current time is 2022-01-02T13:00:06.340619.

# f-strings with formatting
print(f'Math constants: pi={math.pi:.3f}, e={math.e:.3f}')
# Math constants: pi=3.142, e=2.718

# investigate further string methods
print(help('string'))
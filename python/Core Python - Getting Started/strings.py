
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


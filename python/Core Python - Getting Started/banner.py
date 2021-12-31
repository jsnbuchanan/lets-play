def banner(message, border='-'):
    line = border * len(message)
    print(line)
    print(message)
    print(line)


banner('Norwegian Blue')
# prints:
# --------------
# Norwegian Blue
# --------------

banner("Sun, Moon and Stars", "*")
# prints:
# *******************
# Sun, Moon and Stars
# *******************

banner("you are my sunshine", border="#")
# prints:
# ###################
# you are my sunshine
# ###################



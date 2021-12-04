# Single Meeting Room Scheduler
Implement a way to schedule a meetings, it should have two methods:

1. Should be able to query for the availability of the rooms
2. Book a room

## Code
For simplicity, in such a simplistic system I have put all functionality 
in one file [src/main/kotlin/Main.kt](src/main/kotlin/Main.kt)

*Example for `checkAvailability(start, end)`*

```
    val room = Room()
        room.schedule(Room.Meeting(7_00, 8_00))

    val availability = room.checkAvailability(Room.Meeting(7_30, 8_30))
    
    // Prints "unavailable"
    println(availability.status)
```


## Further Examples:
For examples please see [src/test/kotlin/MainTest.kt](src/test/kotlin/MainTest.kt)
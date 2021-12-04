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
*Example for `schedule(meeting)`*

```
    val room = Room()
    room.schedule(Room.Meeting(7_00, 8_00))

    val proposedMeeting = Room.Meeting(8_00, 8_30)

    when(room.checkAvailability(proposedMeeting)) {
        is Available -> {
            when (room.schedule(proposedMeeting)) {
                is Success -> println("$proposedMeeting was scheduled!")
                is FailedToSchedule -> println("Failed to schedule... :(")
            }
        }
        is Unavailable -> println("Meeting time unavailable.")
    }

    // prints "Meeting from 800 to 830 was scheduled!"
```

## Further Examples:
For examples please see [src/test/kotlin/MainTest.kt](src/test/kotlin/MainTest.kt)
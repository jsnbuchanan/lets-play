import Response.Availability.Available
import Response.Availability.Unavailable
import Response.Scheduled.FailedToSchedule
import Response.Scheduled.Success

/**
 * For more examples, please see
 * src/test/kotlin/MainTest.kt
 */
fun main() {
    // Example:
    val room = Room()
    room.schedule(Room.Meeting(7_00, 8_00))

    val conflictingMeeting = Room.Meeting(7_30, 8_30)
    val unavailable = room.checkAvailability(conflictingMeeting)

    // Prints "Meeting from 730 to 830 is unavailable."
    println("$conflictingMeeting is ${unavailable.status}.")

    val nonConflictingMeeting = Room.Meeting(8_00, 8_30)
    val available = room.checkAvailability(nonConflictingMeeting)

    // Prints "Meeting from 800 to 830 is available."
    println("$nonConflictingMeeting is ${available.status}.")

    val result = room.schedule(nonConflictingMeeting)

    // Prints "scheduled successfully!"
    println(result.status)
}

sealed class Response {
    abstract val status: String
    sealed class Availability : Response() {
        data class Available(override val status: String = "available") : Availability()
        data class Unavailable(override val status: String = "unavailable") : Availability()
    }
    sealed class Scheduled : Response() {
        data class Success(override val status: String = "scheduled successfully!") : Scheduled()
        data class FailedToSchedule(override val status: String) : Scheduled()
    }
}

class Room {
    private val meetings = mutableListOf<Meeting>()

    fun checkAvailability(proposed: Meeting) = when {
        isNotAvailable(proposed) -> Unavailable()
        else -> Available()
    }

    fun schedule(newMeeting: Meeting) = when {
        isAvailable(newMeeting) -> when {
            meetings.add(newMeeting) -> Success()
            else -> FailedToSchedule("Was available to schedule, but failed for some other reason.")
        }
        else -> FailedToSchedule("Meeting time is no longer available.")
    }

    private fun isAvailable(proposed: Meeting) = !isNotAvailable(proposed)

    private fun isNotAvailable(proposed: Meeting) = meetings.any(conflictWith(proposed))

    private fun conflictWith(proposed: Meeting) = { scheduled: Meeting ->
        (proposed.start >= scheduled.start && proposed.start < scheduled.end)
                || (proposed.end < scheduled.end && proposed.end > scheduled.start)
                || (proposed.start <= scheduled.start && proposed.end >= scheduled.end )
    }

    data class Meeting(val start: Long, val end: Long) {
        override fun toString(): String {
            return "Meeting from ${start} to $end"
        }
    }
}

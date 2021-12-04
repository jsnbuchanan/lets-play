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

    val availability = room.checkAvailability(Room.Meeting(7_30, 8_30))

    // Prints "unavailable"
    println(availability.status)
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

    /**
     * Check availability
     *
     * scenarios A:
     *
     * proposed 8 -> 9am
     *
     * 8 -> 9 am
     * 10 -> 11 am
     * 12 -> 1 pm
     *
     * should return false
     *
     * @param proposed
     * @return
     */
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

    data class Meeting(val start: Long, val end: Long)
}


fun main() {

}

sealed class Availability {
    data class Available(val message: String = "available") : Availability()
    data class Unavailable(val message: String = "unavailable") : Availability()
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
        meetings.any(conflictWith(proposed)) -> Availability.Unavailable()
        else -> Availability.Available()
    }


    fun schedule(meeting: Meeting) : Boolean {
        return meetings.add(meeting)
    }

    private fun conflictWith(proposed: Meeting) = { scheduled: Meeting ->
        (proposed.start >= scheduled.start && proposed.start < scheduled.end)
                || (proposed.end < scheduled.end && proposed.end > scheduled.start)
    }

    data class Meeting(val start: Long, val end: Long)
}

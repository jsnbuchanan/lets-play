import Availability.Available
import Availability.Unavailable
import io.kotest.core.spec.style.StringSpec
import io.kotest.matchers.shouldBe


class Main : StringSpec({

    val available = Available()
    val unavailable = Unavailable()

    "A proposed Meeting starting in the middle of a scheduled Meeting should report as unavailable" {
        val room = Room()
        room.schedule(Room.Meeting(7_00, 8_00))

        val availability = room.checkAvailability(Room.Meeting(7_30, 8_30))

        availability shouldBe unavailable
    }

    "A proposed Meeting ending in the middle of a scheduled Meeting should report as unavailable" {
        val room = Room()
        room.schedule(Room.Meeting(7_00, 8_00))

        val availability = room.checkAvailability(Room.Meeting(6_30, 7_30))

        availability shouldBe unavailable
    }

    "A proposed Meeting ending at the same time as scheduled Meeting's start time should report as available" {
        val room = Room()
        room.schedule(Room.Meeting(7_00, 8_00))

        val availability = room.checkAvailability(Room.Meeting(6_00, 7_00))

        availability shouldBe available
    }

    "A proposed Meeting starting at a scheduled Meeting's end time should report as available" {
        val room = Room()
        room.schedule(Room.Meeting(7_00, 8_00))

        val availability = room.checkAvailability(Room.Meeting(8_00, 9_00))

        availability shouldBe available
    }

    "A proposed Meeting that starts and ends within a scheduled Meeting should report as unavailable" {
        val room = Room()
        room.schedule(Room.Meeting(7_00, 8_00))

        val availability = room.checkAvailability(Room.Meeting(7_15, 7_30))

        availability shouldBe unavailable
    }

    "A proposed Meeting that starts before and ends after a scheduled meeting should report as unavailable" {
        val room = Room()
        room.schedule(Room.Meeting(7_00, 8_00))

        val availability = room.checkAvailability(Room.Meeting(6_00, 9_00))

        availability shouldBe unavailable
    }
})
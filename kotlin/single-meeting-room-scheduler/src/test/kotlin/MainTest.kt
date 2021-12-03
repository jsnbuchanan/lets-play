import Availability.Unavailable
import io.kotest.core.spec.style.StringSpec
import io.kotest.matchers.shouldBe

class Main : StringSpec({

    "Meetings starting in the middle of another should report as unavailable" {
        val room = Room()
        room.schedule(Room.Meeting(7_00, 8_00))

        val availability = room.checkAvailability(Room.Meeting(7_30, 8_30))

        availability shouldBe Unavailable()
    }
})
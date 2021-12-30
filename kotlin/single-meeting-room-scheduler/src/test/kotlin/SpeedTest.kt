import io.kotest.core.spec.style.StringSpec
import kotlin.system.measureNanoTime
import kotlin.system.measureTimeMillis

class SpeedTest : StringSpec({

    "check availability should be fast" {
        val room = Room()

        val scheduleTime = measureTimeMillis {
            for(start in 1_00..50_000_000 step 200) {
                room.schedule(Room.Meeting(start.toLong(), start + 1_00L))
            }
        }
        println("scheduleTime $scheduleTime")

        val availability = room.checkAvailability(Room.Meeting(49_000_000, 50_000_000))
        println("availability $availability")
    }

})
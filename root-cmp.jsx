import { AnimalsApp } from "./cmps/animal-list.jsx"
import { CountDownApp } from "./cmps/count-down.jsx"
import { MouseMonitorApp } from "./cmps/mouse-monitor.jsx"
import { SeasonClockApp } from "./cmps/season-clock.jsx"
import { WatcherApp } from "./cmps/watcher.jsx"


export function App() {
    return (
        <section className="app">
            <header className="app-header">
                <h1>My App</h1>
            </header>
            <main>
                {/* <AnimalsApp /> */}
                {/* <SeasonClockApp /> */}
                {/* < CountDownApp startFrom={10} onDone={() => {
                    console.log('Done!')
                }} /> */}
                <WatcherApp />
                {/* <MouseMonitorApp /> */}
            </main>
        </section>
    )
}
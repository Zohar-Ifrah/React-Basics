import { storageService } from "../services/async-storage.service.js"
import { WatcherPreview } from "./watcher-preview.jsx"

const { useState, useEffect } = React

export function WatcherApp() {
    // DB
    const WATCHERS_STORAGE_KEY = "watchersDB"
    const [watchers, setWatchers] = useState([])
    // for modal's display
    const [currWatcher, setCurrWatcher] = useState() // current watcher displayed on modal
    const [isHide, setIsHide] = useState(true)
    const hideClass = isHide ? 'hide' : ''

    // first load of DB (saved DB or Demo)
    useEffect(() => {
        console.log('mounted')
        storageService.query(WATCHERS_STORAGE_KEY)
            .then(setWatchers)
    }, [])

    // removes a watcher from DB and from DOM by id
    function onRemove(id) {
        storageService.remove(WATCHERS_STORAGE_KEY, id)
        .then(res => {
            setWatchers(prevWatchers => prevWatchers.filter(watcher => watcher.id !== id))
        })
    }

    // sets the "picked watcher" to current watcher. so it will render its info to the modal
    // toggle modal
    function onSelect(id) {
        const watcher = watchers.find(watcher => watcher.id === id)
        setCurrWatcher(watcher) // current watcher = picked watcher
        setIsHide(!isHide) // toggle Modal
    }

    // prompt name and movieS for new watcher
    // update the DB and the DOM
    function onAddWatcher() {
        const movies = []

        const watcherName = prompt('Please insert name')
        // runs until add nothing or cancel
        while (true) {
            let movie = prompt('Please insert a movie title (or press Cancel to finish)')
            if (!movie) break // before adding nothing

            movies.push(movie)
        }

        // if didnt enter name or any movie
        if (!watcherName || movies.length === 0) return

        const newWatcher = {
            fullname: watcherName,
            movies
        }

        // update DB and DOM
        storageService.post(WATCHERS_STORAGE_KEY, newWatcher)
            .then(storageWatchers => {
                setWatchers(storageWatchers)
            })
    }

    console.log('render')
    return (
        <main className='watchers-app-main-container'>

            <div className={`watchers-modal ${hideClass}`}>
                <h2>{currWatcher !== undefined && currWatcher.fullname}</h2>
                <ul>
                    {currWatcher !== undefined && currWatcher.movies.map((movie, idx) =>
                        <li key={`${idx}-${movie}`}>{movie}</li>
                    )}
                </ul>
                <button onClick={() => setIsHide(!isHide)}>close</button>
            </div>

            <header className='header-container'>
                <h2>Watcher App</h2>
                <button onClick={() => onAddWatcher()}>Add Watcher</button>
            </header>

            <section className='watchers-container'>
                {watchers.map(watcher => <WatcherPreview
                    key={watcher.id}
                    watcher={watcher}
                    onRemove={onRemove}
                    onSelect={onSelect} />
                )}
            </section>
        </main>
    )
}
import { storageService } from "../services/async-storage.service.js"
const WATCHERS_STORAGE_KEY = "watchersDB"
const { useState, useEffect} = React

export function WatcherApp() {
    const [watchers, setWatchers] = useState([])
    const [currWatcher, setCurrWatcher] = useState()
    const [isHide, setisHide] = useState(true)
    const hideClass = isHide ? 'hide' : ''
            
    useEffect(() => { 
        console.log('mounted')
        storageService.query(WATCHERS_STORAGE_KEY)
            .then(storageWatchers => {
                setWatchers(watchers => storageWatchers)
            })
    }, [])
    

    function onRemove(id) {
        storageService.remove(WATCHERS_STORAGE_KEY, id)
        setWatchers(prevWatchers => prevWatchers.filter(watcher => watcher.id !== id))
    }

    function onSelect(id) {
        const watcher = watchers.find(watcher => watcher.id === id)
        setCurrWatcher(watcher)
        setisHide(!isHide)
    }

    function onAddWatcher() {
        let movies = []

        const watcherName = prompt('Please insert name')
        while (true) {
            let movie = prompt('Please insert a movie title (or press Cancel to finish)')
            if (!movie) {
                break
            }
            movies.push(movie)
        }

        const newWatcher = {
            fullname: watcherName,
            movies: movies
        }

        const updateWatchers = watchers.slice()
        updateWatchers.push(newWatcher)

        storageService.post(WATCHERS_STORAGE_KEY, newWatcher)
        setWatchers(updateWatchers)
    }

    console.log('render')
    return (
        <main className='watchers-app-main-container'>

            <div className={`watchers-modal ${hideClass}`}>
                <h2>{currWatcher !== undefined && currWatcher.fullname}</h2>
                <ul>
                    {currWatcher !== undefined && currWatcher.movies.map(movie => 
                        <li>{movie}</li>
                    )}
                </ul>
                <button onClick={() => setisHide(!isHide)}>close</button>
            </div>

            <header className='header-container'>
                <h2>Watcher App</h2>
                <button onClick={() => onAddWatcher()}>Add Watcher</button>
            </header>

            <section className='watchers-container'>
                {watchers.map(watcher =>
                    <div key={watcher.id} className='watcher-card'>
                        <img src="assets/img/avatar.png" alt="" />
                        {watcher.fullname}
                        <footer></footer>
                        <p>
                            <button onClick={() => onRemove(watcher.id)}>x</button>
                            <button onClick={() => onSelect(watcher.id)}>select</button>
                        </p>
                    </div>
                )}
            </section>
        </main>
    )
}
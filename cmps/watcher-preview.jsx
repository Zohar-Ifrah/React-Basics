export function WatcherPreview({ watcher, onRemove, onSelect }) {
    const { id, fullname } = watcher
    return (
     <div key={id} className='watcher-card'>
        <img src="assets/img/avatar.png" alt="" />
        {fullname}
        <footer></footer>
        <p>
            <button onClick={() => onRemove(id)}>x</button>
            <button onClick={() => onSelect(id)}>select</button>
        </p>
    </div>
    )
}
const { useState, useEffect} = React

export function MouseMonitorApp() {
    const [isOn, setIsOn] = useState(true)
    const [pos, setPos] = useState({ x: 0, y: 0 })

    const updatePos = (ev) => {
        setPos({ x: ev.clientX, y: ev.clientY })
    }

    const addMouseListener = () => {
        document.addEventListener('mousemove', updatePos)
        setIsOn(true)
    }

    const removeMouseListener = () => {
        document.removeEventListener('mousemove', updatePos)
        setIsOn(false)
    }

    useEffect(() => {
        addMouseListener()
    }, []) 

    useEffect(() => {
        removeMouseListener()
    }, [])

    return (
        <main className='mouse-monitor-app'>
            <p>Mouse Position: {isOn && (pos.x)+','}{isOn &&  (pos.y)}</p>
            
            {<button onClick={() => addMouseListener()}>Resume</button>}
            {<button onClick={() => removeMouseListener()}>Pause</button>}
        </main>
    )
}

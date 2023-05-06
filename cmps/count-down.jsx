const { useState, useEffect, useRef } = React

export function CountDownApp({ startFrom, onDone }) {
    const [time, setTime] = useState(startFrom || 8)
    const timeoutIdRef = useRef(0)

    useEffect(() => {
        if (time > 0) {
            timeoutIdRef.current = setTimeout(() => {
                setTime(time - 1)
            }, 1000)
        } else {
            onDone()
        }
    })

    const color = time <= 6 ? 'red-color' : ''
    
    return (
        <div className={`count-down ${color}`}>
            {time}
        </div>
    )
}
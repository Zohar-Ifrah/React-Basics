import { utilService } from "../services/util.service.js"

const { useState, useEffect, useRef } = React

export function SeasonClockApp() {
    const [date, setDate] = useState(new Date())
    const intervalIdRef = useRef(0)
    const monthNum = useRef(date.getMonth())
    const [month, setMonth] = useState(() =>
        utilService.getMonthName(date),
        [])
    const [day, setDay] = useState(() =>
        utilService.getDayName(date, 'en-US'),
        [])
    const [season, setSeason] = useState(utilService.getSeasonName(month))
    const [isDark, setIsDark] = useState(false)

    const darkClass = isDark ? 'dark' : ''

    useEffect(() => {
        console.log('mounted')
        intervalIdRef.current = setInterval(() => {
            monthNum.current++
            if (monthNum.current > 12) monthNum.current = 1
            setMonth(utilService.getMonthName(new Date(2022, monthNum.current)))
            setSeason(utilService.getSeasonName(monthNum.current))
        }, 1000)
        return () => {
            console.log('Timer stop')
            clearInterval(intervalIdRef.current)
        }

    }, [])

    console.log('render')
    return (
        <div className={`${darkClass}`} onClick={() => setIsDark(!isDark)}>
            Cuurent season: {season}
            <img src={`seasons/${season}.png`} alt="" />
            <br />
            month: {month}
            <br />
            day: {day}
        </div>
    )
}

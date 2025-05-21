export default function Stats({ time, countRolls, bestTime, fewestRolls }) {

    return (
        
        <div className="stats">
            <h1>Your Time: {time}s</h1>
            <h1>Rolls Count: {countRolls}</h1>
            <div className="line"></div>
            <h1>Time Record: {bestTime}s</h1>
            <h1>Rolls Record: {fewestRolls}</h1>
        </div>
    )
}
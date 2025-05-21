export default function Stats({ time, countRolls }) {

    return (
        <div className="stats">
            <h1>Time: {time}s</h1>
            <h1>Rolls count: {countRolls}</h1>
        </div>
    )
}
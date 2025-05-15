export default function Die({ value, isHeld, hold}) {

    const styles = {
        backgroundColor: isHeld ? "#59E391" : "#FFFFFF"
    }

    return (

        <button className="die-btn" style={styles} onClick={hold}>
            {value}
        </button>
    
    )
}
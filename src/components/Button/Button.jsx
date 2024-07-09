import styles from './button.module.css'

function Button({children, buttonID, onClick}) {
	return <button onClick={onClick} className={styles.button} id={buttonID}>{children}</button>
}

export default Button
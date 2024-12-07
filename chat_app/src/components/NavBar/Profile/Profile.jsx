import styles from "./Profile.module.css";


const Profile = ({name, email, messages}) => {
    return (
        <div style={styles.profile}>
            <p style={styles.name}>{name}</p>
            <p style={styles.email}>{email}</p>
            <ul style={styles.list}>{messages.map((message, index)=>(
                <li key={index}>{message}</li>
            ))}</ul>
        </div>
    )
}

export default Profile

export const UserPreview = ({ user }) => {
    return (
        <article className="user-preview">
            <h4>{user.fullname}</h4>
            <p>Score: <span>{user.score}</span></p>
        </article>
    )
}

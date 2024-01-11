export const Anecdote = ({title, anecdote, vote}) => {

    return (
        <>
             <h1>{title}</h1>
             <div>
                {anecdote}
                <br/>
                has {vote} votes
            </div>
        </>
    );

}
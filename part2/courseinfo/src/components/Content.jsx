import { useState } from "react"
import Part from "./Part"

const Content = ({parts}) => {
    
    let total = 0;
    parts.forEach( part => total += part.exercises )

    return (
        <> 
        {
            parts.map(
                part => 
                <Part key={part.id} part={part} />
            )
        }        
        <strong>total of {total} exercises</strong>            
        </>
    )
}

export default Content
import React from 'react'
import {Button} from "@mui/material"
interface NoteProps {
    text: string;
    onDelete: () => void;
}

const Note = (props: NoteProps) => {
    return (
        <div className='note'>
            <h3>{props.text}</h3>
            <Button 
                onClick = {props.onDelete}
                color="error"
                variant="contained"
                >Delete</Button>
        </div>
    )
}

export default Note
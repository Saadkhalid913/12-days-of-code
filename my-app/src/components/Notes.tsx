import React, { Component } from 'react'
import axios from "axios"
import { toast } from 'react-toastify'
import Note from "./Note"

interface NoteSchema {
    id: number 
    text: string
}

interface NoteState {
    notes: NoteSchema[]
}

export default class Notes extends Component {

    state: NoteState = {
        notes: []
    }
    render() {
        return (
            <div>
                {this.state.notes.map(n => <Note onDelete={() => this.DeleteNote(n.id)} text={n.text + n.id}/>)}
            </div>
        )
    }
    
    async componentDidMount() {
        await this.GetNotes()
    }

    GetNotes = async () => {
        let response : any 
        response = await axios.get("http://localhost:3000/api/data")
                                         .catch(err => toast.error("Could not fetch notes"))
        this.setState({notes: response.data})
    }

    DeleteNote = async (id: number) => {
        let response: any 
        try {
            response = await axios.delete("http://localhost:3000/api/data/" + id)
            const deletedID = response.data[0].id
            const oldState = [...this.state.notes];
            const deletedIndex = oldState.findIndex((note) => note.id === deletedID)
            oldState.splice(deletedIndex, 1)
            this.setState({notes: oldState})
        }
        catch(err) {
            toast.error("There was an error deleting this item")
        }
    }
}
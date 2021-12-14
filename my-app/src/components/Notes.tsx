import React, { Component } from 'react'
import axios from "axios"
import { toast } from 'react-toastify'
import Note from "./Note"
import { Input, Button } from "@mui/material"

interface NoteSchema {
    id: number 
    text: string
}

interface NoteState {
    notes: NoteSchema[];
    text:string
}

export default class Notes extends Component {

    state: NoteState = {
        notes: [],
        text: ""
    }
    render() {
        return (
            <div className='main-content-wrapper'>
                <div className='content'>
                <div className="main-input-wrapper">
                    <Input 
                        placeholder='Start typing...'
                        value = {this.state.text}
                        color="primary"
                        onChange = {(e: any) => this.setState({text: e.target.value})}
                        />
                    <Button 
                        className = "submit-button"
                        variant='contained'
                        color="primary"
                        onClick = {this.CreateNote}>Create Item</Button>
                </div>
                <div className = "notes">
                    {this.state.notes.map(n => <Note onDelete={() => this.DeleteNote(n.id)} text={n.text}/>)}
                </div>
                </div>
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

    CreateNote = async () => {
        if (!this.state.text) return
        let response: any 
        try {
            response = await axios.post("http://localhost:3000/api/data", {text: this.state.text})
            const NewNote = response.data[0]
            const oldState = [...this.state.notes, NewNote];
            this.setState({notes: oldState, text: ""})
        }
        catch(err) {
            toast.error("There was an error creating this item")
        }
    }
}
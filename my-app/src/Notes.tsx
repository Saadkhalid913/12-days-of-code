import React, { Component } from 'react'
import axios, {AxiosResponse} from "axios"
import { toast } from 'react-toastify'

interface Note {
    id: number 
    text: string
}

interface NoteState {
    notes: Note[]
}

export default class Notes extends Component {

    state: NoteState = {
        notes: []
    }
    render() {
        return (
            <div>
                {this.state.notes.map(n => <div key = {n.id}>{n.text}-{n.id}</div>)}
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
}
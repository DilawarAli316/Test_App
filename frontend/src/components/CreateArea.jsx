import React, { useState } from 'react'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'
import Fab from '@material-ui/core/Fab'
import Zoom from '@material-ui/core/Zoom'

function CreateArea(props) {
  const [note, setNote] = useState({
    title: '',
  })

  function handleChange(event) {
    const { name, value } = event.target

    console.log(name, value)

    setNote((prevNote) => {
      return {
        ...prevNote,
        [name]: value,
      }
    })
  }

  function submitNote(event) {
    props.onAdd(note)
    setNote({
      title: '',
    })
    event.preventDefault()
  }

  return (
    <div>
      <form className='create-note'>
        <input
          name='title'
          onChange={handleChange}
          value={note.title}
          placeholder='Title'
          autoComplete='off'
        />

        <Zoom in={true}>
          <Fab onClick={submitNote}>
            <AddCircleOutlineIcon />
          </Fab>
        </Zoom>
      </form>
    </div>
  )
}

export default CreateArea

import React, { useState } from 'react'
import { Button, TextField } from '@material-ui/core'

const CreateSubTask = (props) => {
  const [text, setText] = useState('')

  const SubmitButton = (task) => {
    console.log(task, text)
    return (
      <Button
        id={task.id}
        variant='text'
        onClick={() => props.onAddSub(task.task.id, text)}
      >
        Submit
      </Button>
    )
  }
  return (
    <TextField
      id={props.note.id}
      label='What are the steps?'
      value={text}
      onChange={(e) => setText(e.target.value)}
      InputProps={{ endAdornment: <SubmitButton task={props.note} /> }}
    />
  )
}

export default CreateSubTask

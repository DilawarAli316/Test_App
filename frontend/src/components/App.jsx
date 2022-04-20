import React, { useState, useEffect } from 'react'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Checkbox from '@mui/material/Checkbox'
import Header from './Header'
import Footer from './Footer'
import CreateArea from './CreateArea'
import axios from 'axios'
import CreateSubTask from './CreateSubTask'

function App() {
  const [notes, setNotes] = useState([])

  useEffect(() => {
    axios.get('http://localhost:5000/api/task/').then((res) => {
      setNotes(res.data)
    })
  }, [])

  function addNote(newNote) {
    let sendData = () => {
      axios
        .post('http://localhost:5000/api/task/', newNote)
        .then((res) =>
          axios.get('http://localhost:5000/api/task/').then((response) => {
            setNotes(response.data)
          })
        )
        .catch((err) => console.log(err.data))
    }
    sendData(function (err) {
      if (!err) {
        console.log('Success')
      }
    })
  }

  const addSubTask = (todo_id, title) => {
    let sendData = () => {
      axios
        .post('http://localhost:5000/api/task/subtask', { todo_id, title })
        .then((res) =>
          axios.get('http://localhost:5000/api/task/').then((response) => {
            setNotes(response.data)
          })
        )
        .catch((err) => console.log(err.data))
    }
    sendData(function (err) {
      if (!err) {
        console.log('Success')
      }
    })
  }

  const handleChange = (id, status, url) => {
    url = url + `${id}`

    status = status === 1 ? 0 : 1

    axios
      .put(url, {
        status,
      })
      .then((res) =>
        axios.get('http://localhost:5000/api/task/').then((response) => {
          setNotes(response.data)
        })
      )
      .catch((err) => console.log(err))
  }

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {notes.map((note) => (
        <Accordion
          style={{ width: '486px', margin: '30px auto 0px auto' }}
          key={note.id}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls='panel1a-content'
            id='panel1a-header'
          >
            <Checkbox
              edge='start'
              checked={note.status === 1 ? true : false}
              onChange={() =>
                handleChange(
                  note.id,
                  note.status,
                  `http://localhost:5000/api/task/`
                )
              }
              tabIndex={-1}
              disableRipple
              inputProps={{ 'aria-labelledby': note.id }}
            />
            <Typography alignSelf={'center'}>{note.title}</Typography>
            <p
              style={{
                alignSelf: 'flex-end',
                textAlign: 'right',
                width: '85%',
              }}
            >
              3 out of {note.sTasks.length} completed
            </p>
          </AccordionSummary>
          <AccordionDetails>
            <List
              sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
            >
              {note.sTasks.map((value) => {
                const labelId = value.id

                return (
                  <ListItem key={value.id} disablePadding>
                    <ListItemButton role={undefined} dense>
                      <ListItemIcon>
                        <Checkbox
                          edge='start'
                          checked={value.status === 1 ? true : false}
                          onChange={() =>
                            handleChange(
                              value.id,
                              value.status,
                              `http://localhost:5000/api/task/subtask/`
                            )
                          }
                          tabIndex={-1}
                          disableRipple
                          inputProps={{ 'aria-labelledby': labelId }}
                        />
                      </ListItemIcon>
                      <ListItemText id={labelId} primary={value.title} />
                    </ListItemButton>
                  </ListItem>
                )
              })}
              <CreateSubTask note={note} onAddSub={addSubTask} />
            </List>
          </AccordionDetails>
        </Accordion>
      ))}

      <Footer />
    </div>
  )
}

export default App

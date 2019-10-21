import React, { useState, useEffect } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { withAuthenticator } from 'aws-amplify-react';
import { createNote, deleteNote, updateNote } from './graphql/mutations';
import { listNotes } from './graphql/queries';
import { onCreateNote, onDeleteNote, onUpdateNote } from './graphql/subscriptions';

const App: React.FC = () => {
  const [id, setId] = useState('');
  const [note, setNote] = useState('');
  const [notes, setNotes] = useState<any>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    handleGetNoteList();
  }, []);

  useEffect(() => {
    const onCreateNoteListener = API.graphql(graphqlOperation(onCreateNote)).subscribe({
      next: (noteData: any) => {
        const newNote = noteData.value.data.onCreateNote;
        const prevNotes = notes.filter((item: any) => item.id !== newNote.id);

        const updateNotes = [...prevNotes, newNote];
        setNotes(updateNotes);
      }
    });

    return () => onCreateNoteListener.unsubscribe();
  }, [notes]);

  useEffect(() => {
    const onDeleteNoteListener = API.graphql(graphqlOperation(onDeleteNote)).subscribe({
      next: (noteData: any) => {
        const deletedNote = noteData.value.data.onDeleteNote;
        const updateNotes = notes.filter((item: any) => item.id !== deletedNote.id);
        setNotes(updateNotes);
        setLoading(false);
      }
    });

    return () => onDeleteNoteListener.unsubscribe();
  }, [notes]);

  useEffect(() => {
    const onUpdateNoteListener = API.graphql(graphqlOperation(onUpdateNote)).subscribe({
      next: (noteData: any) => {
        const updatedNote = noteData.value.data.onUpdateNote;
        const updatedNotes = notes.map((item: any) => {
          if (item.id === updatedNote.id) {
            return updatedNote;
          }

          return item;
        });

        setNotes(updatedNotes);
      }
    });

    return () => onUpdateNoteListener.unsubscribe();
  }, [notes]);

  const handleGetNoteList = async () => {
    setLoading(true);
    await API.graphql(graphqlOperation(listNotes)).then((result: any) => {
      const list = result.data.listNotes.items;
      setNotes(list);
      setLoading(false);
    });
  };

  const handleChangeNote = (event: React.BaseSyntheticEvent) => {
    const { value } = event.currentTarget;
    setNote(value);
  };

  const hasExistingNote = () => {
    if (id) {
      const isNote = notes.findIndex((note: any) => note.id === id) > -1;

      return isNote;
    }

    return false;
  };

  const handleAddNote = async (event: React.FormEvent) => {
    const input = { note };
    event.preventDefault();

    // check if we have an existing notes, if so update it
    if (hasExistingNote()) {
      handleUpdateNote();
    } else {
      await API.graphql(
        graphqlOperation(createNote, {
          input
        })
      );

      // const newNote = result.data.createNote;

      // setNotes((prevNotes: any) => {
      //   return [newNote, ...prevNotes];
      // });
    }

    setNote('');
  };

  const handleDeleteNote = (id: any) => async () => {
    setLoading(true);

    await API.graphql(
      graphqlOperation(deleteNote, {
        input: { id }
      })
    ).then((result: any) => {
      // const deleteNoteId = result.data.deleteNote.id;
      // const updateNote = notes.filter((item: any) => item.id !== deleteNoteId);
      // setNotes(updateNote);
    });
  };

  const handleSetNote = (note: any) => () => {
    setNote(note.note);
    setId(note.id);
  };

  const handleUpdateNote = async () => {
    const input = {
      id,
      note
    };

    const result = await API.graphql(graphqlOperation(updateNote, { input }));

    // const updatedNote = result.data.updateNote;

    // const updatedNotes = notes.map((item: any) => {
    //   if (item.id === updatedNote.id) {
    //     return updatedNote;
    //   }

    //   return item;
    // });

    // setNotes(updatedNotes);
    setNote('');
    setId('');
  };

  return (
    <div className="flex flex-column items-center justify-center pa3 bg-washed-red">
      <h1 className="code f2-l">Amplify Notetaker</h1>

      {/* Note form */}

      <form className="mb3" onSubmit={handleAddNote}>
        <input
          type="text"
          className="pa2 f4"
          placeholder="Write your note"
          value={note}
          onChange={handleChangeNote}
        />
        <button className="pa2 f4" type="submit">
          {id ? ' Update Note' : ' Add Note'}
        </button>
      </form>

      {/* Notes list */}
      {loading && <h2>Loading...</h2>}

      <div>
        {!loading &&
          notes.map((item: any) => (
            <div key={item.id} className="flex items-center">
              <li onClick={handleSetNote(item)} className="list pa1 f3">
                {item.note}
              </li>
              <button
                onClick={handleDeleteNote(item.id)}
                className="bg-transparent bn f4"
              >
                <span>&times;</span>
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default withAuthenticator(App, true);

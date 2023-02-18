import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import { collection, getDocs, deleteDoc, doc, setDoc, serverTimestamp, where, query } from "firebase/firestore/lite";
import { firestore } from '../../../config/firebase';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import { async } from '@firebase/util';

const initialState = {
  title: '',
  description: '',
  location: '',
}


export default function Todos() {

  const { user } = useContext(AuthContext)

  const [Documents, setDocuments] = useState([]);
  const [todo, setTodo] = useState({})
  const [isProcessing, setIsprocessing] = useState(false)
  const [isProcessingDelete, setIsprocessingDelete] = useState(false)
  const [isLoading, setIsLoading] = useState(true);

  const [state, setState] = useState(initialState);

  const handleChange = e => {
    setTodo(s => ({ ...s, [e.target.name]: e.target.value }))
  }

  const fetchDocuments = async () => {

    let array = []
    // jis user ky todos hy usi ko nazar ay nichy vali 1 line is lia hy 
   const q = query(collection(firestore, "todos"), where("createdBy.uid", "==", user.uid))
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      let data = doc.data()
      // doc.data() is never undefined for query doc snapshots
      // console.log(data);
      array.push(data)
    });
    setDocuments(array)
    setIsLoading(false)
  }

  useEffect(() => {
    fetchDocuments()
  }, [user])


 const handleUpdate =async () =>{
  // console.log(todo)
    let formData = {...todo}
    formData.dateCreated = formData.dateCreated
    formData.dateModified = serverTimestamp()

    formData.modifiedBy = {
      email: user.email,
      uid: user.uid
    }
    
    setIsprocessing(true)
    try{
      await setDoc(doc(firestore, "todos", formData.id), formData, {merge: true});
      window.notify("Todo has been Successfuly Updated", "success")
      let newDocuments = Documents.map((doc)=>{
       if(doc.id === todo.id)
       return todo
       return doc
      })

      setDocuments(newDocuments)
  }catch(err){
 console.error(err)
 window.notify("Something went wrong", "error")
  }
  setIsprocessing(false)
 }

  const handleDelete = async (todo) => {
    // console.log(todo)
    setIsprocessingDelete(true)

    try {
      await deleteDoc(doc(firestore, "todos", todo.id));
      window.notify('Todo has been Deleted', 'success')
      let newDocuments = Documents.filter((doc) => {
        return doc.id !== todo.id
      })
      setDocuments(newDocuments)

    } catch (err) {
      console.error(err)
      window.notify('Something went wrong', 'error')
    }

    setIsprocessingDelete(false)
  }

  return (
     <>
    <div className="py-5 home">
      <div className="container">
        <div className="row">
          <div className="col text-center">
            <h2 className='mb-4'>My Todos</h2>
          </div>
        </div>
        <div className="row">
          <div className="col text-center">
            <div className="card p-3 p-md-4 p-lg-5">
              {!isLoading ?
              <Table>
                <Thead>
                  <Tr>
                    <Th>Sr.NO</Th>
                    <Th>Title</Th>
                    <Th>Location</Th>
                    <Th>Status</Th>
                    <Th>Description</Th>
                    <Th>Action</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {Documents.map((todo, i) => {
                    return <Tr key={i} className='m-2'>
                      <Td>{i + 1 + '*'}</Td>
                      <Td>{todo.title}</Td>
                      <Td>{todo.location}</Td>
                      <Td>{todo.status}</Td>
                      <Td>{todo.description}</Td>
                      <Td><button type='button' className='btn btn-info btn-sm 'data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => { setTodo(todo) }}>
                        {!isProcessing ?"Edit"
                        : <div className='spinner-border spinner-border-sm'></div>
                              }

                      </button>
                        <button className='btn btn-danger btn-sm m-2' disabled={isProcessingDelete} onClick={() => { handleDelete(todo) }}>
                        {!isProcessingDelete
                          ? "Delete"
                          : <div className='spinner-border spinner-border-sm'></div>
                        }
                      </button></Td>
                    </Tr>
                  })}

                </Tbody>
              </Table>
              : <div className="text-center"><div className='spinner-grow'></div></div>
            }
            </div>
          </div>
        </div>
      </div>
    </div>
    
<div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog modal-dialog-centered">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Todo</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
                
                <div className="row">
                  <div className="col-12 col-md-6 mb-3">
                    <input type="text" className='form-control' name='title' value={todo.title} placeholder='Enter Title' onChange={handleChange} />
                  </div>
                  <div className="col-12 col-md-6 mb-3">
                    <input type="text" className='form-control' name='location' value={todo.location}  placeholder='Enter Location' onChange={handleChange} />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col">
                    <textarea name="description" id="" className='form-control' value={todo.description}  placeholder='Enter Description' rows="4" onChange={handleChange}></textarea>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <select name='status' className='form-control' value={todo.status} onChange={handleChange}>
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>
                </div>
              
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={handleUpdate}>
          {!isProcessing? "Save Changes" : <div className='spinner-border spinner-border-sm'></div>}
        </button>
      </div>
    </div>
  </div>
</div>
  </>
  )
}

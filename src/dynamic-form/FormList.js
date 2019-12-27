import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DynamicForm from './DynamicForm';



export default function FormList(props) {

    const PAGE_STATE_LOADING = "LOADING"
    const PAGE_STATE_ERROR = "ERROR"
    const PAGE_STATE_LOADED = "LOADED"

    const [formList, setFormList] = useState()
    const [pageState, setPageState] = useState(PAGE_STATE_LOADING)
    const [count, setCount] = useState(0)

    useEffect(() => {
        fetchList()
    }, [count])
    return renderList();

    function fetchList() {
        setPageState(PAGE_STATE_LOADING)
        console.log('loading')
        fetch('http://localhost:4020/api/forms')
            .then(res => res.json())
            .then((result => {
                setFormList(result)
                setPageState(PAGE_STATE_LOADED)
            }))
    }

    function handleFormClick(id) {
        ReactDOM.render(<DynamicForm formId={id} />, document.getElementById('root'));
    }
    function renderList() {

        switch (pageState) {
            case PAGE_STATE_LOADED:
                return (
                    <List component="nav" aria-label="secondary mailbox folders">
                        {
                            formList.map(form => {
                                return (
                                    <ListItem button key={form.id}>
                                        <ListItemText primary={form.title} onClick={handleFormClick.bind("id", form.id)} />
                                    </ListItem>)
                            })
                        }
                    </List>
                )

            case PAGE_STATE_LOADING:
                return (
                    <p>loading</p>
                )

            case PAGE_STATE_ERROR:
                return (
                    <p>error</p>
                )

            default:

        }

    }
}
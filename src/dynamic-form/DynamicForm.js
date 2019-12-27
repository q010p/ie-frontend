import React, { useEffect, useState, useRef } from 'react'
import LocationTypeField from './location-type-field/LocationTypeField'
import './dynamic-form.css'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    formControl: {
        width: '100%',
        margin: theme.spacing(1),
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    formTextField: {
        margin: theme.spacing(1),
        width: '100%',
        height: '100%',
    },
    formMapElement: {
        width: '100%',
        height: '100%'
    }
}));


function DynamicForm(props) {
    

    const PAGE_STATE_LOADING = "LOADING"
    const PAGE_STATE_ERROR = "ERROR"
    const PAGE_STATE_LOADED = "LOADED"


    const classes = useStyles()
    const [apiCallCount, setApiCallCount] = useState(0)
    const [state, setState] = React.useState({})
    const [pageState, setPageState] = useState(PAGE_STATE_LOADING)
    const [resultForm, setResultForm] = useState()
    useEffect(() => {
        setPageState(PAGE_STATE_LOADING)
        fetch(`http://localhost:4020/api/forms/${props.formId}`)
            .then(res => res.json())
            .then((result => {
                setResultForm(result)
                setPageState(PAGE_STATE_LOADED)
            }))
    }, [apiCallCount])
    const initialPosition = { lat: 35.717752, lng: 51.370039 }


    function renderFormSwitch(field) {
        if (field.options !== undefined) {
            if (pageState === PAGE_STATE_LOADED)
                return (
                    <div>
                        <FormControl className={classes.formControl} variant="outlined" >
                            <InputLabel htmlFor={field.name + 'Select'}>
                                {field.title}
                            </InputLabel>
                            <Select
                                required={true}
                                labelWidth={field.title.length*9}
                                inputProps={{
                                    name: field.name,
                                    id: field.name + "Select"
                                }}
                            >
                                {
                                    field.options.map(option => {
                                        return <MenuItem key={option.value} value={JSON.stringify(option.value)}>{option.label}</MenuItem>
                                    })
                                }
                            </Select>
                        </FormControl>
                    </div>
                )
        } else
            switch (field.type) {
                case 'Text':
                    return <TextField variant="outlined" required={field.required} className={classes.formTextField} label={field.title} name={field.name} type="text" />
                case 'Number':
                    return <TextField variant="outlined" className={classes.formTextField} label={field.title} name={field.name} type="number" />
                case 'Location':
                    if (state[getMarkerPositionKeyState(field.name)] === undefined)
                        state[getMarkerPositionKeyState(field.name)] = initialPosition
                    return <div>
                        <p>{field.title}</p>
                        <div className={classes.formMapElement}>
                            <input name={field.name} value={JSON.stringify(state[getMarkerPositionKeyState(field.name)])} hidden></input>
                            <LocationTypeField
                                onMarkerChanged={(newPosition) => {
                                    setState(prevState => {
                                        return {
                                            ...prevState,
                                            [getMarkerPositionKeyState(field.name)]: newPosition
                                        }
                                    })
                                    console.log(state)
                                }} initialCenter={initialPosition} />
                        </div>
                    </div>
                case 'Date':
                    return <TextField variant="outlined" className={classes.formTextField} label={field.title} name={field.name} type="date" />
                default:
                    return <p>type {field.type} not supported</p>
            }
    }
    function getMarkerPositionKeyState(fieldName) {
        return `${fieldName}MarkerPosition`
    }

    if (pageState === PAGE_STATE_LOADING)
        return <div>loading</div>
    else if (pageState === PAGE_STATE_ERROR)
        return <div>error</div>
    else
        if (pageState === PAGE_STATE_LOADED)
            return (
                React.createElement('div', { className: 'DynamicForm' },
                    <div className='DynamicForm'>
                        <h1>{resultForm.title}</h1>
                        <form method='post'>
                            {
                                resultForm.fields.map((field) => {
                                    return <div key={field.name}>
                                        {
                                            renderFormSwitch(field)
                                        }
                                    </div>
                                })
                            }
                            <Button style={{ margin: '8px', width: '100%' }} type='submit' variant="contained" color="primary">
                                submit
                        </Button>
                        </form>
                    </div>
                )

            );
}



export default DynamicForm;
import React from 'react'
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
    formMapElement:{
        width:'100%',
        height:'100%'
    }
}));


function DynamicForm() {
    const classes = useStyles()

    const formSelectInputLabel = React.useRef(null);
    const [labelWidth, setLabelWidth] = React.useState(0);
    React.useEffect(() => {
        setLabelWidth(formSelectInputLabel.current.offsetWidth);
    }, []);


    const [state, setState] = React.useState({
        isLoaded: false,
        resultForm: {
            "title": "A smaple form",
            "id": "1234",
            "fields": [
                {
                    "name": "First_Name",
                    "title": "First Name",
                    "type": "Text",
                    "required": true
                },
                {
                    "name": "Loc",
                    "title": "Your Location",
                    "type": "Location",
                    "required": false
                },

                {
                    "name": "Request_Type",
                    "title": "Request Type",
                    "type": "Number",
                    "options": [
                        { "label": "Help", "value": "Help" },
                        { "label": "Info", "value": "Information" }
                    ]
                },
                {
                    "name": "Base_Location",
                    "title": "Base Location",
                    "type": "Location",
                    "options": [
                        { "label": "Base1", "value": { "lat": "1.2", "long": "3.2" } },
                        { "label": "Base2", "value": { "lat": "2.3", "long": "1.434" } }
                    ]
                }
            ]
        }
    });




    return (
        React.createElement('div', { className: 'DynamicForm' },
            <div class='DynamicForm'>
                <h1>{state.resultForm.title}</h1>
                <form method='post'>
                    {
                        state.resultForm.fields.map((field) => {
                            return <div>
                                {
                                    renderFormSwitch(field, classes, labelWidth, formSelectInputLabel)
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

function renderFormSwitch(field, classes, formSelectLabelWidth, formSelectInputLabel) {
    if (field.options !== undefined) {
        return (
            <div>
                <FormControl className={classes.formControl} variant="outlined" >
                    <InputLabel ref={formSelectInputLabel} htmlFor="outlined-age-native-simple">
                        {field.title}
                    </InputLabel>
                    <Select
                        required={true}
                        labelWidth={formSelectLabelWidth}
                        inputProps={{
                            name: field.name,
                            id: "outlined-age-native-simple"
                        }}
                    >
                        {
                            field.options.map(option => {
                                return <MenuItem value={JSON.stringify(option.value)}>{option.label}</MenuItem>
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
                return <div>
                    <p>{field.title}</p>
                    <div className={classes.formMapElement}>
                    <LocationTypeField  />
                    </div>
                </div>
            case 'Date':
                return <TextField variant="outlined" className={classes.formTextField} label={field.title} name={field.name} type="date" />
            default:
                return <p>type {field.type} not supported</p>
        }
}

export default DynamicForm;
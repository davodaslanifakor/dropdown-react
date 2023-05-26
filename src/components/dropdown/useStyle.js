import {createUseStyles} from 'react-jss'
import {placeholder, scroll} from "../../share-styles/index.js";
const activeMode =  {
    backgroundColor: '#f2f4ff',
    cursor: 'pointer',
    '& i': {
        display: 'inline-block',
    }
}
export default createUseStyles({
    parent: {
        position: 'relative'
    },

    input: {
        ...placeholder,
        width: '100%',
        border: '1px solid #38bdf8',
        borderRadius: '6px',
        padding: '0 5px',
        height: '30px',
        '&:focus': {
            outlineColor: '#38bdf8',
            outlineOffset: 2,
        }
    },
    list: {
        ...scroll,
        position: 'absolute',
        top: '100%',
        left: 0,
        right: 0,
        borderRadius: '4px',
        textAlign: 'left',
        'list-style-type': 'none',
        'margin-block-start': '5px',
        'margin-block-end': 0,
        'margin-inline-start': 0,
        'margin-inline-end': 0,
        'padding-inline-start': '0',
        backgroundColor: '#fff',
        boxShadow: '0px 0px 1px rgba(0,0,0,0.5)',
        overflow: 'auto',
        maxHeight: '150px',
    },
    listItem:{
        display: 'flex',
        padding: '5px',
        height: '32px',
        verticalAlign:'middle',
        '&:hover': activeMode
    },
    activeItem : activeMode,
    listItemText: {
        display: 'inline-block',
    },
    listItemIcon: {
        display: 'none',
        color: '#38bdf8',
        marginLeft: 'auto',
        marginRight: '6px'
    }
})

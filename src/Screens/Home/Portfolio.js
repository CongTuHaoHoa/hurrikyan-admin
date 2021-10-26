import React, {createRef, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@mui/styles'
import API from '../../Config/api'
import * as UI from '@mui/material'
import * as Icon from '@mui/icons-material'
import * as actionTitle from "../../Redux/actions/title";
import * as actionLoader from "../../Redux/actions/loader";
import { connect } from "react-redux";

const descendingComparator = (a, b, orderBy) => b[orderBy] < a[orderBy] ? -1 : b[orderBy] > a[orderBy] ? 1 : 0

const getComparator = (order, orderBy) => order === 'desc' ?
    (a, b) => descendingComparator(a, b, orderBy) :
    (a, b) => -descendingComparator(a, b, orderBy)

function stableSort(array, comparator)
{
    const stabilizedThis = array.map((el, index) => [el, index])
    stabilizedThis.sort((a, b) =>
    {
        const order = comparator(a[0], b[0])
        return (order !== 0) ? order : a[1] - b[1]
    })
    return stabilizedThis.map(el => el[0])
}

const headCells = [
    { id: 'title', numeric: false, disablePadding: false, label: 'Tên' },
    { id: 'publish', numeric: false, disablePadding: false, label: 'Ngày release' },
    { id: 'view', numeric: true, disablePadding: false, label: 'Lượt xem' },
    { id: 'share', numeric: true, disablePadding: false, label: 'Chia sẻ' },
]

function EnhancedTableHead(props)
{
    const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props
    const createSortHandler = (property) => (event) => onRequestSort(event, property)

    return <UI.TableHead>
        <UI.TableRow>
            <UI.TableCell padding="checkbox">
                <UI.Checkbox indeterminate={ numSelected > 0 && numSelected < rowCount } checked={ rowCount > 0 && numSelected === rowCount } onChange={ onSelectAllClick } inputProps={{ 'aria-label': 'select all desserts' }}/>
            </UI.TableCell>
            <UI.TableCell/>
            <UI.TableCell align='left' padding='none'>
                Hình ảnh
            </UI.TableCell>
            { headCells.map(headCell => (
                <UI.TableCell key={ headCell.id } align={ headCell.numeric ? 'right' : 'left' } padding={ headCell.disablePadding ? 'none' : 'normal' } sortDirection={ orderBy === headCell.id ? order : false }>
                    <UI.TableSortLabel active={ orderBy === headCell.id } direction={ orderBy === headCell.id ? order : 'asc' } onClick={ createSortHandler(headCell.id) }>
                        { headCell.label }
                        { orderBy === headCell.id ?
                            <span className={classes.visuallyHidden}>
                            { order === 'desc' ? 'sorted descending' : 'sorted ascending' }
                        </span>
                            : null}
                    </UI.TableSortLabel>
                </UI.TableCell>
            ))}
        </UI.TableRow>
    </UI.TableHead>
}

EnhancedTableHead.propTypes =
    {
        classes: PropTypes.object.isRequired,
        numSelected: PropTypes.number.isRequired,
        onRequestSort: PropTypes.func.isRequired,
        onSelectAllClick: PropTypes.func.isRequired,
        order: PropTypes.oneOf(['asc', 'desc']).isRequired,
        orderBy: PropTypes.string.isRequired,
        rowCount: PropTypes.number.isRequired,
    }

const useToolbarStyles = makeStyles((theme) => ({
    root:
    {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1),
    },
    highlight:
    {
        color: theme.palette.secondary.main,
        // backgroundColor: lighten(theme.palette.secondary.light, 0.85),
    },
    title:
    {
        flex: '1 1 100%',
    },
}))

const EnhancedTableToolbar = (props) =>
{
    const classes = useToolbarStyles()
    const { numSelected } = props

    const renderToolbox = () =>
    {
        if (numSelected === 1)
            return <>
                <UI.Tooltip title="Sửa">
                    <UI.IconButton aria-label="edit" color="warning" style={{ marginRight : 10}}>
                        <Icon.Edit/>
                    </UI.IconButton>
                </UI.Tooltip>
                <UI.Tooltip title="Xóa">
                    <UI.IconButton aria-label="delete" color="error">
                        <Icon.Delete/>
                    </UI.IconButton>
                </UI.Tooltip>
            </>
        else if (numSelected > 1)
            return <>
                <UI.Tooltip title="Xóa">
                    <UI.IconButton aria-label="delete" color="error">
                        <Icon.Delete/>
                    </UI.IconButton>
                </UI.Tooltip>
            </>
        else return null
    }

    return <UI.Toolbar className={ clsx(classes.root, { [classes.highlight]: numSelected > 0 }) }>
        { numSelected > 0 ?
            <UI.Typography className={classes.title} color="secondary" variant="subtitle1" component="div">
                Đã chọn { numSelected }
            </UI.Typography>
            :
            <UI.Typography className={classes.title} variant="h6" id="tableTitle" component="div">
                Công việc
            </UI.Typography>
        }
        { renderToolbox() }
    </UI.Toolbar>
}

EnhancedTableToolbar.propTypes =
    {
        numSelected: PropTypes.number.isRequired,
    }

const useStyles = makeStyles((theme) => ({
    root:
        {
            width: '100%',
        },
    paper:
        {
            width: '100%',
            marginBottom: theme.spacing(2),
        },
    table:
        {
            minWidth: 800,
        },
    visuallyHidden:
        {
            border: 0,
            clip: 'rect(0 0 0 0)',
            height: 1,
            margin: -1,
            overflow: 'hidden',
            padding: 0,
            position: 'absolute',
            top: 20,
            width: 1,
        },
}))

const Rows = (props) =>
{
    const { row, index, selected, setSelected } = props

    const isSelected = (name) => selected.indexOf(name) !== -1
    const isItemSelected = isSelected(row._id)
    const labelId = `enhanced-table-checkbox-${ index }`
    const [collaspse, setCollaspse] = useState(false)

    const ref = createRef()

    const handleClick = (event, id) =>
    {
        const selectedIndex = selected.indexOf(id)

        const newSelected =
            selectedIndex === -1 ? [].concat(selected, id) :
                selectedIndex === 0 ? [].concat(selected.slice(1)) :
                    selectedIndex === selected.length - 1 ? [].concat(selected.slice(0, -1)) :
                        selectedIndex > 0 ? [].concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1)) :
                            []

        setSelected(newSelected)
    }

    const renderDate = () =>
    {
        const date = new Date(row.publish)
        const d = date.getDay()
        const m = date.getMonth() + 1
        const y = date.getFullYear()

        return `${ d > 9 ? d : `0${ d }` }/${ m > 9 ? m : `0${ m }` }/${y}`
    }

    const onMouseDown = (event) =>
    {
        if (!ref.current?.contains(event.target)) setCollaspse(false)
    }

    useEffect(() =>
    {
        document.addEventListener('mousedown', onMouseDown)
        return () => document.removeEventListener('mousedown', onMouseDown)
    })

    return <React.Fragment ref={ ref }>
        <UI.TableRow hover role="checkbox" aria-checked={isItemSelected} selected={isItemSelected}>
            <UI.TableCell padding="checkbox">
                <UI.Checkbox checked={ isItemSelected } inputProps={{ 'aria-labelledby': labelId }} onChange={  event => handleClick(event, row._id)}/>
            </UI.TableCell>
            <UI.TableCell padding="checkbox">
                <UI.Tooltip title={ collaspse ? 'Thu gọn' : 'Xem mô tả' }>
                    <UI.IconButton onClick={ () => setCollaspse(!collaspse) }>
                        { collaspse ? <Icon.ExpandLess/> :<Icon.ExpandMore/> }
                    </UI.IconButton>
                </UI.Tooltip>
            </UI.TableCell>
            <UI.TableCell component="th" id={labelId} scope="row" padding="none">
                <img src={ row.img } alt={ row.title } style={ { height: 50, marginTop: 5 } }/>
            </UI.TableCell>
            <UI.TableCell align="left">{ row.title }</UI.TableCell>
            <UI.TableCell align="left">{ renderDate() }</UI.TableCell>
            <UI.TableCell align="right">{ 5 }</UI.TableCell>
            <UI.TableCell align="right">{ 10 }</UI.TableCell>

        </UI.TableRow>
        <UI.TableRow hover role="checkbox" aria-checked={isItemSelected} selected={isItemSelected}>
            <UI.TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
                <UI.Collapse in={collaspse} timeout="auto" unmountOnExit>
                    <UI.Box margin={ 1 }>
                        { row.description }
                    </UI.Box>
                </UI.Collapse>
            </UI.TableCell>
        </UI.TableRow>
    </React.Fragment>
}

const EnhancedTable = props =>
{
    const classes = useStyles()
    const [order, setOrder] = useState('asc')
    const [orderBy, setOrderBy] = useState('title')
    const [selected, setSelected] = useState([])
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(5)
    const [rows, setRows] = useState([])
    const [open, setOpen] = useState(false)




    const handleRequestSort = (event, property) =>
    {
        const isAsc = orderBy === property && order === 'asc'
        setOrder(isAsc ? 'desc' : 'asc')
        setOrderBy(property)
    }

    const handleSelectAllClick = (event) =>
    {
        if (event.target.checked)
        {
            const newSelecteds = rows.map(n => n._id)
            setSelected(newSelecteds)
        }
        else setSelected([])
    }

    const handleChangePage = (event, newPage) => setPage(newPage)

    const handleChangeRowsPerPage = (event) =>
    {
        setRowsPerPage(parseInt(event.target.value, 10))
        setPage(0)
    }

    useEffect(() =>
    {
        props.setTitle({ title : 'Công việc', path : '/portfolio', icon: <Icon.Work/> })
        API.GET('portfolio').then(r => setRows(r))

        // eslint-disable-next-line
    }, [])

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage)

    return <div className={ classes.root }>
        <UI.Dialog open={ open }>
            <UI.DialogTitle>Chỉnh sửa</UI.DialogTitle>
            <UI.DialogContent style={{ display: "flex", flexDirection: 'column' }}>
                <div style={{ display : 'flex' }}>
                    <div>
                        <UI.TextField style={{ width: 200, marginTop: 10, marginRight: 10 }} type='text' name='name' label='Tên công việc' InputProps={{ startAdornment: <Icon.Work className='tf-icon' color='primary'/>,}}/><br/>
                        <UI.TextField
                            style={{ width: 200, marginTop: 10, marginRight: 10 }}
                            label="Ngày release"
                            type="date"
                            sx={{ width: 200 }}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <img style={{ width: 225 }} src={'https://firebasestorage.googleapis.com/v0/b/hurrikyan-portfolio.appspot.com/o/portfolio%2F404-page-not-found.png?alt=media&token=c3324615-6871-48cc-a931-a74580a3819a'} alt={'Ok em'}/>
                        <UI.Button component="span" color='primary'>
                            Chọn ảnh
                            <input
                                type="file"
                                hidden
                            />
                            <Icon.Upload style={ { marginLeft : 10 } }/>
                        </UI.Button>
                    </div>
                </div>
                <UI.TextField multiline maxRows={4} type='text' name='name' label='Mô tả' InputProps={{ startAdornment: <Icon.Description className='tf-icon' color='primary'/>,}}/><br/>
                <div>
                    <UI.Button variant='contained' component="span" color='success' style={{ float: 'right', marginLeft: 10 }}>
                        Lưu
                        <Icon.Save style={ { marginLeft : 10 } }/>
                    </UI.Button>
                    <UI.Button variant='contained' component="span" color='error' style={{ float: 'right' }} onClick={ () => { setOpen(false) } }>
                        Hủy
                        <Icon.Clear style={ { marginLeft : 10 } }/>
                    </UI.Button>
                </div>
            </UI.DialogContent>
        </UI.Dialog>
        <UI.Tooltip title="Thêm">
            <UI.IconButton color='success' endIcon={<Icon.AddBoxRounded/>} style={{ margin: 10, float: 'right', marginLeft: 0 }} onClick={ () => { setOpen(!open) } }><Icon.Add/></UI.IconButton>
        </UI.Tooltip>
        <UI.Paper className={ classes.paper }>
            <EnhancedTableToolbar numSelected={ selected.length } />
            <UI.TableContainer>
                <UI.Table className={ classes.table } aria-labelledby="tableTitle" size='medium' aria-label="enhanced table">
                    <EnhancedTableHead classes={ classes } numSelected={ selected.length } order={ order } orderBy={ orderBy } onSelectAllClick={ handleSelectAllClick } onRequestSort={ handleRequestSort } rowCount={ rows.length }/>
                    <UI.TableBody>
                        { stableSort(rows, getComparator(order, orderBy))
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row, index) => <Rows key={ index } index={ index } row = { row } selected = { selected } setSelected={ setSelected }/>)}
                        {emptyRows > 0 && (
                            <UI.TableRow style={{ height: 62 * emptyRows }}>
                                <UI.TableCell colSpan={7} />
                            </UI.TableRow>
                        )}
                    </UI.TableBody>
                </UI.Table>
            </UI.TableContainer>
            <UI.TablePagination rowsPerPageOptions={ 5 } component="div" count={ rows.length } rowsPerPage={ rowsPerPage } page={ page } onPageChange={ handleChangePage } onRowsPerPageChange={ handleChangeRowsPerPage }/>
        </UI.Paper>
    </div>
}

const mapDispatchToProps = (dispatch) =>
{
    return {
        setTitle : (value) => { dispatch(actionTitle.setTitle(value)) },
        setLoader : (value) => { dispatch(actionLoader.setLoaded(value)) }
    }
}

export default connect(null, mapDispatchToProps)(EnhancedTable)

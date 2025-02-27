import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import { connect } from 'react-redux';
import axios from 'axios';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { deleteMenu } from '../actions/menus';
import $ from 'jquery';


const useStyles1 = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));

function TablePaginationActions(props) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};


const useStyles2 = makeStyles({
  table: {
    minWidth: 500,
  },
  centered: {
    textAlign: 'center', 
    justifyContent: 'center'
  },
});

function SMTable(props) {
  const classes = useStyles2();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, (props.data.length === 0 ? 3 : props.data.length) - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const lang = props.menus.lang
  const text = {
    en: {
      viewFile: 'View File',
      link: 'File Name',
      qr: 'QR',
      uploaded: 'Uploaded on',
      delete: 'Delete'
    },
    ru: {
      viewFile: 'Открыть Файл',
      link: 'Имя Файла',
      qr: 'QR код',
      uploaded: 'Дата загрузки',
      delete: 'Удалить'
    }
  }

  const handleDate = (dateFromDB) => {
    if (dateFromDB){
      let getDate = dateFromDB.split('T');
      let fullDate = getDate[0].split('-')
      return (lang === 'en') ? `${fullDate[1]}/${fullDate[2]}/${fullDate[0]}` : `${fullDate[2]}/${fullDate[1]}/${fullDate[0]}`;
    } else {
      return 'unknown'
    }
  }

  const handleDelete = (e, row) => {
    if (window.confirm('Are you sure you want to delete?')){
      $('#loader').show(0)
      axios.post(`${process.env.REACT_APP_BASE_URL}/api/v1/menus/${row.id}`, {token: JSON.parse(localStorage.getItem('token'))})
      .then(response => props.dispatch(deleteMenu(response)))
      .then(response => $('#loader').hide(0))
      .catch(err => alert(err))
    }
  }

  return (
    <TableContainer component={Paper} >
      <Table className={classes.table} aria-label="custom pagination table" >
        <TableBody >
              <TableCell component="th" scope="row" className={classes.centered}>
                {text[lang].link}
              </TableCell>
              <TableCell style={{ width: 160 }} align="right" className={classes.centered}>
                {text[lang].qr}
              </TableCell>
              <TableCell style={{ width: 160 }} align="right" className={classes.centered}>
                {text[lang].uploaded}
              </TableCell>
              <TableCell style={{ width: 160 }} align="right" className={classes.centered}>
                {text[lang].delete}
              </TableCell>
          {(rowsPerPage > 0
            ? props.data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : props.data
          ).slice(0).reverse().map((row) => (
            <TableRow key={row.address} >
              <TableCell component="th" scope="row" className={classes.centered}>
                <a href={row.link} target="_blank">{(row.file_name === 'null' || row.file_name === '') ? text[lang].viewFile : row.file_name}</a>
              </TableCell>
              <TableCell style={{ width: 160 }} align="right" className={classes.centered}>
                <a href={row.qr_code_link} target="_blank"><img src={row.qr_code_link} style={{width:'40px', height:'40px'}}/></a>
              </TableCell>
              <TableCell style={{ width: 160 }} align="right" className={classes.centered}>
                {handleDate(row.updated_at)}
              </TableCell>
              <TableCell style={{ width: 160 }} align="right" className={classes.centered}>
              <IconButton color="primary" aria-label="upload picture" component="span" onClick={(e) => handleDelete(e, row)}>
                <HighlightOffIcon />
              </IconButton>
              </TableCell>
            </TableRow>
          ))}

          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={3}
              count={props.data.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: { 'aria-label': 'rows per page' },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}

const mapStateToProps = function(state) {
  return state
}

export default connect(mapStateToProps)(SMTable);
